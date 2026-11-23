import { Complaint, ComplaintStatus, TimelineEvent } from '../types';
import { INITIAL_COMPLAINTS } from '../data/mockData';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

const STORAGE_KEY_COMPLAINTS = 'smartpolice_complaints_v1';

// Helper to get local stored complaints
const getStoredComplaints = (): Complaint[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_COMPLAINTS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY_COMPLAINTS, JSON.stringify(INITIAL_COMPLAINTS));
      return INITIAL_COMPLAINTS;
    }
    return JSON.parse(raw);
  } catch (err) {
    return INITIAL_COMPLAINTS;
  }
};

const saveStoredComplaints = (complaints: Complaint[]) => {
  localStorage.setItem(STORAGE_KEY_COMPLAINTS, JSON.stringify(complaints));
};

export const complaintService = {
  // Generate fallback unique complaint ID
  generateComplaintId: (category: string): string => {
    const year = new Date().getFullYear();
    let catCode = 'GEN';
    if (category.toLowerCase().includes('cyber')) catCode = 'CYB';
    else if (category.toLowerCase().includes('theft')) catCode = 'THF';
    else if (category.toLowerCase().includes('women')) catCode = 'WOM';
    else if (category.toLowerCase().includes('missing')) catCode = 'MIS';
    else if (category.toLowerCase().includes('traffic')) catCode = 'TRF';
    else if (category.toLowerCase().includes('corruption')) catCode = 'COR';
    else if (category.toLowerCase().includes('economic')) catCode = 'ECO';

    const randomHex = Math.random().toString(36).substring(2, 10).toUpperCase();
    return `SPI-${year}-${catCode}-${randomHex}`;
  },

  getAllComplaints: async (): Promise<Complaint[]> => {
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase
          .from('complaints')
          .select('*, timeline:timeline_events(*)')
          .order('created_at', { ascending: false });

        if (!error && data && data.length > 0) {
          return data.map((item: any) => ({
            id: item.id,
            citizenId: item.citizen_id,
            citizenName: item.citizen_name,
            citizenEmail: item.citizen_email,
            citizenPhone: item.citizen_phone,
            category: item.category,
            subCategory: item.sub_category,
            title: item.title,
            description: item.description,
            incidentDate: item.incident_date,
            incidentTime: item.incident_time,
            state: item.state,
            district: item.district,
            policeStation: item.police_station,
            locationAddress: item.location_address,
            priority: item.priority,
            status: item.status,
            assignedOfficer: item.assigned_officer,
            assignedOfficerBadge: item.assigned_officer_badge,
            assignedOfficerPhone: item.assigned_officer_phone,
            evidenceFiles: item.evidence_files || [],
            disclaimerAccepted: item.disclaimer_accepted,
            createdAt: item.created_at,
            updatedAt: item.updated_at,
            resolutionRemarks: item.resolution_remarks,
            timeline: (item.timeline || []).sort(
              (a: any, b: any) => a.stage_number - b.stage_number
            ).map((t: any) => ({
              id: t.id,
              complaintId: t.complaint_id,
              title: t.title,
              description: t.description,
              status: t.status,
              officerName: t.officer_name,
              officerBadge: t.officer_badge,
              timestamp: t.created_at || t.timestamp,
              stageNumber: t.stage_number,
            }))
          }));
        }
      } catch (err) {
        console.warn('Supabase fetch failed, falling back to local data store:', err);
      }
    }

    return getStoredComplaints();
  },

  getComplaintsByCitizen: async (citizenId: string, email?: string): Promise<Complaint[]> => {
    if (isSupabaseConfigured()) {
      try {
        const { data: sessionData } = await supabase.auth.getSession();
        if (sessionData?.session?.user) {
          const { data, error } = await supabase
            .from('complaints')
            .select('*, timeline:timeline_events(*)')
            .eq('citizen_id', sessionData.session.user.id)
            .order('created_at', { ascending: false });

          if (!error && data) {
            return data.map((item: any) => ({
              id: item.id,
              citizenId: item.citizen_id,
              citizenName: item.citizen_name,
              citizenEmail: item.citizen_email,
              citizenPhone: item.citizen_phone,
              category: item.category,
              subCategory: item.sub_category,
              title: item.title,
              description: item.description,
              incidentDate: item.incident_date,
              incidentTime: item.incident_time,
              state: item.state,
              district: item.district,
              policeStation: item.police_station,
              locationAddress: item.location_address,
              priority: item.priority,
              status: item.status,
              assignedOfficer: item.assigned_officer,
              assignedOfficerBadge: item.assigned_officer_badge,
              assignedOfficerPhone: item.assigned_officer_phone,
              evidenceFiles: item.evidence_files || [],
              disclaimerAccepted: item.disclaimer_accepted,
              createdAt: item.created_at,
              updatedAt: item.updated_at,
              resolutionRemarks: item.resolution_remarks,
              timeline: (item.timeline || []).sort(
                (a: any, b: any) => a.stage_number - b.stage_number
              ).map((t: any) => ({
                id: t.id,
                complaintId: t.complaint_id,
                title: t.title,
                description: t.description,
                status: t.status,
                officerName: t.officer_name,
                officerBadge: t.officer_badge,
                timestamp: t.created_at || t.timestamp,
                stageNumber: t.stage_number,
              }))
            }));
          }
        }
      } catch (err) {
        console.warn('Supabase fetch for citizen complaints failed:', err);
      }
    }

    const all = await complaintService.getAllComplaints();
    return all.filter(c => 
      c.citizenId === citizenId || 
      (email && c.citizenEmail.toLowerCase() === email.toLowerCase())
    );
  },

  getComplaintById: async (id: string): Promise<Complaint | null> => {
    const normalized = id.trim().toUpperCase();

    if (isSupabaseConfigured()) {
      try {
        // 1. If user is authenticated, try fetching full complaint as owner or admin
        const { data: sessionData } = await supabase.auth.getSession();
        if (sessionData?.session?.user) {
          const { data: fullRecord, error: fullErr } = await supabase
            .from('complaints')
            .select('*, timeline:timeline_events(*)')
            .eq('id', normalized)
            .maybeSingle();

          if (!fullErr && fullRecord) {
            return {
              id: fullRecord.id,
              citizenId: fullRecord.citizen_id,
              citizenName: fullRecord.citizen_name,
              citizenEmail: fullRecord.citizen_email,
              citizenPhone: fullRecord.citizen_phone,
              category: fullRecord.category,
              subCategory: fullRecord.sub_category,
              title: fullRecord.title,
              description: fullRecord.description,
              incidentDate: fullRecord.incident_date,
              incidentTime: fullRecord.incident_time,
              state: fullRecord.state,
              district: fullRecord.district,
              policeStation: fullRecord.police_station,
              locationAddress: fullRecord.location_address,
              priority: fullRecord.priority,
              status: fullRecord.status,
              assignedOfficer: fullRecord.assigned_officer,
              assignedOfficerBadge: fullRecord.assigned_officer_badge,
              assignedOfficerPhone: fullRecord.assigned_officer_phone,
              evidenceFiles: fullRecord.evidence_files || [],
              disclaimerAccepted: fullRecord.disclaimer_accepted,
              createdAt: fullRecord.created_at,
              updatedAt: fullRecord.updated_at,
              resolutionRemarks: fullRecord.resolution_remarks,
              timeline: (fullRecord.timeline || []).sort(
                (a: any, b: any) => a.stage_number - b.stage_number
              ).map((t: any) => ({
                id: t.id,
                complaintId: t.complaint_id,
                title: t.title,
                description: t.description,
                status: t.status,
                officerName: t.officer_name,
                officerBadge: t.officer_badge,
                timestamp: t.created_at || t.timestamp,
                stageNumber: t.stage_number,
              }))
            };
          }
        }

        // 2. Public / Guest tracking via sanitized RPC (Zero PII disclosure)
        const { data: complaintData, error: rpcErr } = await supabase
          .rpc('track_complaint_by_token', { token_id: normalized });

        if (!rpcErr && complaintData && complaintData.length > 0) {
          const item = complaintData[0];
          const { data: timelineData } = await supabase
            .rpc('get_timeline_by_token', { token_id: normalized });

          return {
            id: item.id,
            citizenId: 'protected',
            citizenName: 'Complainant (Protected Docket)',
            citizenEmail: 'protected@civic.internal',
            citizenPhone: 'Protected',
            category: item.category,
            subCategory: item.sub_category,
            title: `${item.category} Incident Docket`,
            description: 'Detailed incident statement and attached evidence files are protected under citizen privacy protocols and visible only to the complaint owner and investigating officer.',
            incidentDate: item.incident_date,
            incidentTime: item.incident_time,
            state: item.state,
            district: item.district,
            policeStation: item.police_station,
            locationAddress: `${item.district}, ${item.state}`,
            priority: item.priority,
            status: item.status,
            assignedOfficer: item.assigned_officer_display,
            assignedOfficerBadge: undefined,
            assignedOfficerPhone: undefined,
            evidenceFiles: [],
            disclaimerAccepted: true,
            createdAt: item.created_at,
            updatedAt: item.updated_at,
            resolutionRemarks: undefined,
            timeline: (timelineData || []).map((t: any) => ({
              id: 'tl-' + t.stage_number,
              complaintId: item.id,
              title: t.title,
              description: `Stage ${t.stage_number} status: ${t.status}`,
              status: t.status,
              timestamp: t.created_at,
              stageNumber: t.stage_number,
            }))
          };
        }
      } catch (err) {
        console.warn('Supabase token tracking failed, checking local store:', err);
      }
    }

    const all = await complaintService.getAllComplaints();
    const found = all.find(c => c.id.toUpperCase() === normalized);
    return found || null;
  },

  createComplaint: async (newComplaint: Omit<Complaint, 'id' | 'createdAt' | 'updatedAt' | 'timeline' | 'status'>): Promise<Complaint> => {
    const now = new Date().toISOString();
    let assignedToken = complaintService.generateComplaintId(newComplaint.category);

    if (isSupabaseConfigured()) {
      try {
        const { data: sessionData } = await supabase.auth.getSession();
        const isAuthenticated = Boolean(sessionData?.session?.user);

        if (isAuthenticated) {
          // 1. Authenticated submission: uses verified JWT session claims
          const { data, error } = await supabase
            .from('complaints')
            .insert({
              citizen_name: newComplaint.citizenName,
              citizen_phone: newComplaint.citizenPhone,
              category: newComplaint.category,
              sub_category: newComplaint.subCategory,
              title: newComplaint.title,
              description: newComplaint.description,
              incident_date: newComplaint.incidentDate,
              incident_time: newComplaint.incidentTime,
              state: newComplaint.state,
              district: newComplaint.district,
              police_station: newComplaint.policeStation,
              location_address: newComplaint.locationAddress,
              priority: newComplaint.priority,
              evidence_files: newComplaint.evidenceFiles || [],
              disclaimer_accepted: newComplaint.disclaimerAccepted,
            })
            .select('id')
            .single();

          if (!error && data?.id) {
            assignedToken = data.id;
          }
        } else {
          // 2. Anonymous guest submission: uses the hardened submit_anonymous_complaint RPC
          const { data: tokenId, error: rpcError } = await supabase.rpc('submit_anonymous_complaint', {
            p_category: newComplaint.category,
            p_sub_category: newComplaint.subCategory || '',
            p_title: newComplaint.title,
            p_description: newComplaint.description,
            p_incident_date: newComplaint.incidentDate,
            p_incident_time: newComplaint.incidentTime,
            p_state: newComplaint.state,
            p_district: newComplaint.district,
            p_police_station: newComplaint.policeStation,
            p_location_address: newComplaint.locationAddress,
            p_citizen_name: newComplaint.citizenName,
            p_citizen_phone: newComplaint.citizenPhone,
            p_citizen_email: newComplaint.citizenEmail,
            p_priority: newComplaint.priority || 'Standard',
            p_evidence_files: newComplaint.evidenceFiles || [],
            p_disclaimer_accepted: Boolean(newComplaint.disclaimerAccepted)
          });

          if (!rpcError && tokenId) {
            assignedToken = tokenId;
          } else if (rpcError) {
            console.warn('submit_anonymous_complaint RPC returned error:', rpcError);
          }
        }
      } catch (err) {
        console.warn('Supabase submission failed, using local mode:', err);
      }
    }

    // Build the local complaint model with the assigned token
    const complaint: Complaint = {
      ...newComplaint,
      id: assignedToken,
      status: 'Submitted',
      createdAt: now,
      updatedAt: now,
      timeline: [
        {
          id: 'tl-' + Date.now(),
          complaintId: assignedToken,
          title: 'Complaint Registered',
          description: 'Simulated e-complaint received in central portal. Unique tracking token activated.',
          status: 'Submitted',
          timestamp: now,
          stageNumber: 1
        }
      ]
    };

    // Keep local storage synchronized
    const localList = getStoredComplaints();
    saveStoredComplaints([complaint, ...localList]);

    return complaint;
  },

  updateComplaintStatus: async (
    id: string,
    status: ComplaintStatus,
    officerName?: string,
    officerBadge?: string,
    remarks?: string,
    internalNotes?: string
  ): Promise<Complaint | null> => {
    const all = getStoredComplaints();
    const index = all.findIndex(c => c.id.toUpperCase() === id.toUpperCase());
    if (index === -1) return null;

    const current = all[index];
    const now = new Date().toISOString();

    let stageNumber = 2;
    if (status === 'Submitted') stageNumber = 1;
    else if (status === 'Under Review') stageNumber = 2;
    else if (status === 'Officer Assigned') stageNumber = 3;
    else if (status === 'In Progress') stageNumber = 4;
    else if (status === 'Resolved' || status === 'Rejected') stageNumber = 5;

    const newEvent: TimelineEvent = {
      id: 'tl-' + Date.now(),
      complaintId: current.id,
      title: `Status updated to ${status}`,
      description: remarks || `Simulated status changed by police control room. Status: ${status}`,
      status,
      officerName: officerName || current.assignedOfficer,
      officerBadge: officerBadge || current.assignedOfficerBadge,
      timestamp: now,
      stageNumber
    };

    const updatedComplaint: Complaint = {
      ...current,
      status,
      assignedOfficer: officerName || current.assignedOfficer,
      assignedOfficerBadge: officerBadge || current.assignedOfficerBadge,
      updatedAt: now,
      resolutionRemarks: status === 'Resolved' || status === 'Rejected' ? remarks : current.resolutionRemarks,
      timeline: [...current.timeline, newEvent]
    };

    all[index] = updatedComplaint;
    saveStoredComplaints(all);

    // If Supabase is configured
    if (isSupabaseConfigured()) {
      try {
        await supabase
          .from('complaints')
          .update({
            status,
            assigned_officer: updatedComplaint.assignedOfficer,
            assigned_officer_badge: updatedComplaint.assignedOfficerBadge,
            updated_at: now,
            resolution_remarks: updatedComplaint.resolutionRemarks,
          })
          .eq('id', id);

        await supabase.from('timeline_events').insert({
          complaint_id: id,
          title: newEvent.title,
          description: newEvent.description,
          status: newEvent.status,
          officer_name: newEvent.officerName,
          officer_badge: newEvent.officerBadge,
          stage_number: stageNumber,
          created_at: now
        });
      } catch (err) {
        console.warn('Supabase status update failed, local store updated:', err);
      }
    }

    return updatedComplaint;
  }
};
