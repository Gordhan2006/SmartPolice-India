# Supabase Integration & Backend Setup Guide
## SmartPolice India Platform

This guide outlines how to connect your Supabase project to the **SmartPolice India** platform.

---

### Step 1: Create a Free Supabase Project

1. Visit [supabase.com](https://supabase.com) and sign in or sign up.
2. Click **"New Project"**.
3. Choose an organization, enter a name (e.g. `smartpolice-india`), set a strong database password, and select your preferred region (e.g., `ap-south-1` Mumbai).
4. Wait 1-2 minutes for the database to provision.

---

### Step 2: Run the SQL Schema

1. In your Supabase Dashboard, open the **SQL Editor** from the left sidebar.
2. Click **"New Query"**.
3. Open the file [`supabase-schema.sql`](file:///c:/Users/Owner/Downloads/smartpolice%20india/supabase-schema.sql) from this project.
4. Copy the entire contents and paste them into the SQL Editor.
5. Click **"Run"**.

This script automatically creates:
- `profiles` table (linked to `auth.users` with automatic trigger on signup).
- `complaints` table (stores simulated grievances, category, location, priority, status, officer assignments).
- `timeline_events` table (stores chronological audit milestones for live tracking).
- `police_stations` table (pre-seeded station directory).
- Row Level Security (RLS) policies allowing secure reading and writing.

---

### Step 3: Configure Environment Variables

1. In the Supabase Dashboard, go to **Project Settings** > **API**.
2. Locate:
   - **Project URL** (e.g. `https://xyzcompany.supabase.co`)
   - **Project API Anon Key** (`anon` `public` key)
3. In the root directory of this project, create a file named `.env`:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

4. Restart the Vite development server:
```bash
npm run dev
```

---

### Step 4: Verify Supabase Connectivity

When the application loads:
- If `.env` is configured with valid Supabase keys, all signups, logins, complaint lodgings, and status triage updates write directly to your Supabase PostgreSQL database in real-time.
- If `.env` is absent or holds placeholder values, the application automatically functions in **High-Fidelity Demo Mode** using local storage persistence so that testing is never blocked.
