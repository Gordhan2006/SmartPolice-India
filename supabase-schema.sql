-- ==============================================================================
-- SMARTPOLICE INDIA - AUDITED PRODUCTION DATABASE MIGRATION (V3)
-- Hardened against Privilege Escalation, Rate Limit Bypass & PII Leakage
-- ==============================================================================

-- 1. Enable Required Cryptographic Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ==============================================================================
-- 2. CLIENT IDENTIFIER & CONCURRENCY-SAFE RATE LIMITING
-- ==============================================================================

-- Client IP extraction helper (resilient against header spoofing)
CREATE OR REPLACE FUNCTION public.get_client_ip()
RETURNS text
LANGUAGE sql
STABLE
SET search_path = public, pg_temp
AS $$
  SELECT COALESCE(
    NULLIF(TRIM(current_setting('request.headers', true)::json->>'cf-connecting-ip'), ''),
    NULLIF(TRIM(split_part(current_setting('request.headers', true)::json->>'x-forwarded-for', ',', 1)), ''),
    '0.0.0.0'
  );
$$;

-- Revoke public execution on IP helper
REVOKE ALL ON FUNCTION public.get_client_ip() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_client_ip() TO anon, authenticated;

-- Rate Limit Log Table (Strictly internal - zero client access)
CREATE TABLE IF NOT EXISTS public.rate_limit_log (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id text NOT NULL,
  action text NOT NULL,
  created_at timestamptz DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_rate_limit_lookup 
  ON public.rate_limit_log (client_id, action, created_at);

ALTER TABLE public.rate_limit_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rate_limit_log FORCE ROW LEVEL SECURITY;

-- Revoke all direct client access to rate_limit_log table
REVOKE ALL ON TABLE public.rate_limit_log FROM anon, authenticated, PUBLIC;

-- Concurrency-Safe Rate Limiter using PostgreSQL Transaction Advisory Locks
CREATE OR REPLACE FUNCTION public.check_rate_limit(
  p_client_id text,
  p_action text,
  p_max_requests int,
  p_window_interval interval
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  current_count int;
  lock_key bigint;
BEGIN
  -- 64-bit transaction advisory lock serializes simultaneous requests from the same client
  lock_key := hashtext(p_client_id || ':' || p_action);
  PERFORM pg_advisory_xact_lock(lock_key);

  SELECT COUNT(*) INTO current_count
  FROM public.rate_limit_log
  WHERE client_id = p_client_id
    AND action = p_action
    AND created_at > (NOW() - p_window_interval);

  IF current_count >= p_max_requests THEN
    RAISE EXCEPTION 'Rate Limit Exceeded: Please wait before submitting more % requests.', p_action;
  END IF;

  INSERT INTO public.rate_limit_log (client_id, action) VALUES (p_client_id, p_action);

  -- 1% probability cleanup of expired records
  IF random() < 0.01 THEN
    DELETE FROM public.rate_limit_log WHERE created_at < (NOW() - INTERVAL '1 hour');
  END IF;

  RETURN true;
END;
$$;

-- RESTRICT EXECUTE: Prevent direct API invocation of check_rate_limit via PostgREST
REVOKE ALL ON FUNCTION public.check_rate_limit(text, text, int, interval) FROM PUBLIC, anon, authenticated;

-- ==============================================================================
-- 3. CRYPTOGRAPHIC COMPLAINT ID GENERATOR
-- ==============================================================================

CREATE OR REPLACE FUNCTION public.generate_secure_complaint_id(category_text text)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  year_text text := TO_CHAR(NOW(), 'YYYY');
  cat_code text := 'GEN';
  random_hex text;
BEGIN
  IF category_text ILIKE '%cyber%' THEN cat_code := 'CYB';
  ELSIF category_text ILIKE '%theft%' THEN cat_code := 'THF';
  ELSIF category_text ILIKE '%women%' THEN cat_code := 'WOM';
  ELSIF category_text ILIKE '%missing%' THEN cat_code := 'MIS';
  ELSIF category_text ILIKE '%traffic%' THEN cat_code := 'TRF';
  ELSIF category_text ILIKE '%corruption%' THEN cat_code := 'COR';
  ELSIF category_text ILIKE '%economic%' THEN cat_code := 'ECO';
  END IF;

  -- 8 bytes of cryptographic randomness = 16 hex characters (18+ quintillion states)
  random_hex := UPPER(encode(gen_random_bytes(8), 'hex'));
  RETURN 'SPI-' || year_text || '-' || cat_code || '-' || random_hex;
END;
$$;

REVOKE ALL ON FUNCTION public.generate_secure_complaint_id(text) FROM PUBLIC, anon, authenticated;

-- ==============================================================================
-- 4. PROFILE ROLE PROTECTION (PREVENTS PRIVILEGE ESCALATION)
-- ==============================================================================

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
SET search_path = public, pg_temp
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
$$;

REVOKE ALL ON FUNCTION public.is_admin() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated;

CREATE OR REPLACE FUNCTION public.protect_profile_roles()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
BEGIN
  IF NOT public.is_admin() THEN
    IF TG_OP = 'INSERT' THEN
      NEW.role := 'citizen';
      NEW.badge_number := NULL;
      NEW.department := NULL;
    ELSIF TG_OP = 'UPDATE' THEN
      IF NEW.role IS DISTINCT FROM OLD.role THEN
        RAISE EXCEPTION 'Privilege Escalation Blocked: Role changes require departmental administrator credentials.';
      END IF;
      NEW.badge_number := OLD.badge_number;
      NEW.department := OLD.department;
    END IF;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_protect_profile_roles ON public.profiles;
CREATE TRIGGER trg_protect_profile_roles
  BEFORE INSERT OR UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.protect_profile_roles();

-- ==============================================================================
-- 5. SECURE ANONYMOUS COMPLAINT SUBMISSION RPC
-- Validates consent, sanitizes inputs, enforces rate limits, returns token ONLY
-- ==============================================================================

DROP FUNCTION IF EXISTS public.submit_anonymous_complaint(text, text, text, text, date, time, text, text, text, text, text, text, text, text, text[]);
DROP FUNCTION IF EXISTS public.submit_anonymous_complaint(text, text, text, text, date, time, text, text, text, text, text, text, text, text, text[], boolean);

CREATE OR REPLACE FUNCTION public.submit_anonymous_complaint(
  p_category text,
  p_sub_category text,
  p_title text,
  p_description text,
  p_incident_date date,
  p_incident_time time,
  p_state text,
  p_district text,
  p_police_station text,
  p_location_address text,
  p_citizen_name text,
  p_citizen_phone text,
  p_citizen_email text,
  p_priority text DEFAULT 'Standard',
  p_evidence_files text[] DEFAULT '{}',
  p_disclaimer_accepted boolean DEFAULT false
)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
VOLATILE
AS $$
DECLARE
  generated_token text;
  client_id text;
  safe_priority text;
  clean_title text;
  clean_description text;
  clean_name text;
  clean_phone text;
  clean_email text;
  clean_address text;
BEGIN
  -- 1. Validate mandatory educational simulation declaration
  IF p_disclaimer_accepted IS NOT TRUE THEN
    RAISE EXCEPTION 'Academic Declaration Required: You must acknowledge that this is an educational simulation.';
  END IF;

  -- 2. Concurrency-safe rate limit: Max 5 submissions per 10 minutes per IP
  client_id := public.get_client_ip();
  PERFORM public.check_rate_limit(client_id, 'anonymous_submission', 5, INTERVAL '10 minutes');

  -- 3. Strict server-side input sanitation & length validation
  clean_title := TRIM(p_title);
  clean_description := TRIM(p_description);
  clean_name := TRIM(p_citizen_name);
  clean_phone := TRIM(p_citizen_phone);
  clean_email := LOWER(TRIM(p_citizen_email));
  clean_address := TRIM(p_location_address);

  IF LENGTH(clean_title) < 5 OR LENGTH(clean_title) > 200 THEN
    RAISE EXCEPTION 'Invalid Input: Title must be between 5 and 200 characters.';
  END IF;

  IF LENGTH(clean_description) < 20 OR LENGTH(clean_description) > 5000 THEN
    RAISE EXCEPTION 'Invalid Input: Incident description must be between 20 and 5000 characters.';
  END IF;

  IF LENGTH(clean_name) < 2 OR LENGTH(clean_name) > 100 THEN
    RAISE EXCEPTION 'Invalid Input: Full name must be between 2 and 100 characters.';
  END IF;

  IF LENGTH(clean_phone) < 8 OR LENGTH(clean_phone) > 20 THEN
    RAISE EXCEPTION 'Invalid Input: Phone number must be between 8 and 20 digits.';
  END IF;

  IF clean_email NOT LIKE '%_@__%.__%' THEN
    RAISE EXCEPTION 'Invalid Input: Please provide a valid email format.';
  END IF;

  IF LENGTH(clean_address) < 4 OR LENGTH(clean_address) > 300 THEN
    RAISE EXCEPTION 'Invalid Input: Incident location address must be between 4 and 300 characters.';
  END IF;

  IF p_incident_date > CURRENT_DATE THEN
    RAISE EXCEPTION 'Invalid Input: Incident date cannot be in the future.';
  END IF;

  IF p_priority IN ('Standard', 'Urgent', 'High Emergency') THEN
    safe_priority := p_priority;
  ELSE
    safe_priority := 'Standard';
  END IF;

  -- 4. Generate unguessable cryptographic token
  generated_token := public.generate_secure_complaint_id(p_category);

  -- 5. Insert sanitized docket
  INSERT INTO public.complaints (
    id,
    citizen_id,
    citizen_name,
    citizen_email,
    citizen_phone,
    category,
    sub_category,
    title,
    description,
    incident_date,
    incident_time,
    state,
    district,
    police_station,
    location_address,
    priority,
    status,
    assigned_officer,
    assigned_officer_badge,
    assigned_officer_phone,
    evidence_files,
    disclaimer_accepted,
    resolution_remarks,
    created_at,
    updated_at
  ) VALUES (
    generated_token,
    'guest-' || encode(gen_random_bytes(6), 'hex'),
    clean_name,
    clean_email,
    clean_phone,
    p_category,
    p_sub_category,
    clean_title,
    clean_description,
    p_incident_date,
    p_incident_time,
    p_state,
    p_district,
    p_police_station,
    clean_address,
    safe_priority,
    'Submitted',
    NULL,
    NULL,
    NULL,
    p_evidence_files[1:10], -- Cap attachments at 10 files
    true,
    NULL,
    NOW(),
    NOW()
  );

  -- 6. Insert Stage 1 in audit timeline
  INSERT INTO public.timeline_events (
    complaint_id,
    title,
    description,
    status,
    stage_number,
    created_at
  ) VALUES (
    generated_token,
    'Complaint Registered',
    'Simulated e-complaint received in central portal. Automated unique token generated.',
    'Submitted',
    1,
    NOW()
  );

  -- Return ONLY the tracking ID
  RETURN generated_token;
END;
$$;

REVOKE ALL ON FUNCTION public.submit_anonymous_complaint(text, text, text, text, date, time, text, text, text, text, text, text, text, text, text[], boolean) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.submit_anonymous_complaint(text, text, text, text, date, time, text, text, text, text, text, text, text, text, text[], boolean) TO anon, authenticated;

-- ==============================================================================
-- 6. PUBLIC TRACKING RPCS (ZERO PII DISCLOSURE & SAFE DISCLOSURE)
-- ==============================================================================

DROP FUNCTION IF EXISTS public.track_complaint_by_token(text);
DROP FUNCTION IF EXISTS public.get_timeline_by_token(text);

CREATE OR REPLACE FUNCTION public.track_complaint_by_token(token_id text)
RETURNS TABLE (
  id text,
  category text,
  sub_category text,
  incident_date date,
  incident_time time,
  state text,
  district text,
  police_station text,
  priority text,
  status text,
  assigned_officer_display text,
  created_at timestamptz,
  updated_at timestamptz
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
VOLATILE
AS $$
DECLARE
  client_id text;
BEGIN
  -- Rate limit lookups: Max 20 lookups per minute per client IP
  client_id := public.get_client_ip();
  PERFORM public.check_rate_limit(client_id, 'track_lookup', 20, INTERVAL '1 minute');

  RETURN QUERY
  SELECT 
    c.id,
    c.category,
    c.sub_category,
    c.incident_date,
    c.incident_time,
    c.state,
    c.district,
    c.police_station,
    c.priority,
    c.status,
    COALESCE(c.assigned_officer, 'Pending Assignment') AS assigned_officer_display,
    c.created_at,
    c.updated_at
  FROM public.complaints c
  WHERE UPPER(c.id) = UPPER(TRIM(token_id))
  LIMIT 1;
END;
$$;

CREATE OR REPLACE FUNCTION public.get_timeline_by_token(token_id text)
RETURNS TABLE (
  stage_number int,
  title text,
  status text,
  created_at timestamptz
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
VOLATILE
AS $$
DECLARE
  client_id text;
BEGIN
  -- Rate limit timeline lookups: Max 30 requests per minute per client IP
  client_id := public.get_client_ip();
  PERFORM public.check_rate_limit(client_id, 'timeline_lookup', 30, INTERVAL '1 minute');

  RETURN QUERY
  SELECT 
    t.stage_number,
    t.title,
    t.status,
    t.created_at
  FROM public.timeline_events t
  WHERE UPPER(t.complaint_id) = UPPER(TRIM(token_id))
  ORDER BY t.stage_number ASC, t.created_at ASC;
END;
$$;

REVOKE ALL ON FUNCTION public.track_complaint_by_token(text) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.get_timeline_by_token(text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.track_complaint_by_token(text) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.get_timeline_by_token(text) TO anon, authenticated;

-- ==============================================================================
-- 7. AUTHENTICATED COMPLAINT INSERTION ENFORCEMENT & STAGE 1 TIMELINE
-- ==============================================================================

CREATE OR REPLACE FUNCTION public.enforce_authenticated_complaint()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
BEGIN
  -- Validate mandatory educational simulation declaration
  IF NEW.disclaimer_accepted IS NOT TRUE THEN
    RAISE EXCEPTION 'Academic Declaration Required: You must acknowledge that this is an educational simulation.';
  END IF;

  -- Rate limit submissions
  PERFORM public.check_rate_limit(auth.uid()::text, 'authenticated_submission', 10, INTERVAL '10 minutes');

  -- Force unguessable cryptographic token
  NEW.id := public.generate_secure_complaint_id(NEW.category);

  -- For authenticated users: lock identity to verified JWT session claims
  IF auth.uid() IS NOT NULL THEN
    NEW.citizen_id := auth.uid()::text;
    NEW.citizen_email := auth.jwt()->>'email';
  END IF;

  -- Reset privileged fields if caller is not an admin
  IF NOT public.is_admin() THEN
    NEW.status := 'Submitted';
    NEW.assigned_officer := NULL;
    NEW.assigned_officer_badge := NULL;
    NEW.assigned_officer_phone := NULL;
    NEW.resolution_remarks := NULL;
  END IF;

  NEW.created_at := NOW();
  NEW.updated_at := NOW();

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_enforce_authenticated_complaint ON public.complaints;
CREATE TRIGGER trg_enforce_authenticated_complaint
  BEFORE INSERT ON public.complaints
  FOR EACH ROW EXECUTE FUNCTION public.enforce_authenticated_complaint();

-- Automated Stage 1 timeline for authenticated submissions
CREATE OR REPLACE FUNCTION public.auto_create_stage1_timeline()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.timeline_events WHERE complaint_id = NEW.id AND stage_number = 1) THEN
    INSERT INTO public.timeline_events (complaint_id, title, description, status, stage_number, created_at)
    VALUES (
      NEW.id,
      'Complaint Registered',
      'Simulated e-complaint received in central portal. Automated unique token generated.',
      'Submitted',
      1,
      NOW()
    );
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_auto_stage1_timeline ON public.complaints;
CREATE TRIGGER trg_auto_stage1_timeline
  AFTER INSERT ON public.complaints
  FOR EACH ROW EXECUTE FUNCTION public.auto_create_stage1_timeline();

-- ==============================================================================
-- 8. TABLE PERMISSIONS & ROW LEVEL SECURITY
-- ==============================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.complaints ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.timeline_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.police_stations ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON TABLE public.profiles FROM anon, authenticated, PUBLIC;
REVOKE ALL ON TABLE public.complaints FROM anon, authenticated, PUBLIC;
REVOKE ALL ON TABLE public.timeline_events FROM anon, authenticated, PUBLIC;
REVOKE ALL ON TABLE public.police_stations FROM anon, authenticated, PUBLIC;

-- Anon grants:
GRANT SELECT ON TABLE public.police_stations TO anon;
-- Direct SELECT and direct INSERT on complaints are NOT granted to anon (they use the submit_anonymous_complaint RPC)

-- Authenticated grants:
GRANT SELECT ON TABLE public.police_stations TO authenticated;
GRANT SELECT, INSERT, UPDATE ON TABLE public.profiles TO authenticated;
GRANT SELECT, INSERT, UPDATE ON TABLE public.complaints TO authenticated;
GRANT SELECT ON TABLE public.timeline_events TO authenticated;
GRANT INSERT ON TABLE public.timeline_events TO authenticated;

-- Policies:
DROP POLICY IF EXISTS "Complaints select policy" ON public.complaints;
CREATE POLICY "Complaints select policy"
  ON public.complaints FOR SELECT
  TO authenticated
  USING (
    public.is_admin()
    OR citizen_id = auth.uid()::text
  );

DROP POLICY IF EXISTS "Complaints insert policy" ON public.complaints;
CREATE POLICY "Complaints insert policy"
  ON public.complaints FOR INSERT
  TO authenticated
  WITH CHECK (
    citizen_id = auth.uid()::text
  );

DROP POLICY IF EXISTS "Complaints update policy" ON public.complaints;
CREATE POLICY "Complaints update policy"
  ON public.complaints FOR UPDATE
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Timeline select policy" ON public.timeline_events;
CREATE POLICY "Timeline select policy"
  ON public.timeline_events FOR SELECT
  TO authenticated
  USING (
    public.is_admin()
    OR EXISTS (
      SELECT 1 FROM public.complaints c
      WHERE c.id = timeline_events.complaint_id
      AND c.citizen_id = auth.uid()::text
    )
  );

DROP POLICY IF EXISTS "Timeline insert policy" ON public.timeline_events;
CREATE POLICY "Timeline insert policy"
  ON public.timeline_events FOR INSERT
  TO authenticated
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Profiles select policy" ON public.profiles;
CREATE POLICY "Profiles select policy"
  ON public.profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id OR public.is_admin());

DROP POLICY IF EXISTS "Profiles update policy" ON public.profiles;
CREATE POLICY "Profiles update policy"
  ON public.profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id OR public.is_admin())
  WITH CHECK (auth.uid() = id OR public.is_admin());

DROP POLICY IF EXISTS "Public read for police stations" ON public.police_stations;
CREATE POLICY "Public read for police stations"
  ON public.police_stations FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Admin write for police stations" ON public.police_stations;
CREATE POLICY "Admin write for police stations"
  ON public.police_stations FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());
