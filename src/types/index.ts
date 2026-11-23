export type UserRole = 'citizen' | 'admin';

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  phone?: string;
  role: UserRole;
  badgeNumber?: string;
  department?: string;
  state?: string;
  createdAt: string;
}

export type ComplaintStatus = 
  | 'Submitted'
  | 'Under Review'
  | 'Officer Assigned'
  | 'In Progress'
  | 'Resolved'
  | 'Rejected';

export type ComplaintCategory =
  | 'Cyber Crime & Online Fraud'
  | 'Theft & Burglary'
  | 'Women Safety & Harassment'
  | 'Missing Person / Property'
  | 'Public Nuisance & Traffic'
  | 'Corruption & Bribery'
  | 'Economic Offense'
  | 'Other Grievance';

export type PriorityLevel = 'Standard' | 'Urgent' | 'High Emergency';

export interface TimelineEvent {
  id: string;
  complaintId: string;
  title: string;
  description: string;
  status: ComplaintStatus;
  officerName?: string;
  officerBadge?: string;
  timestamp: string;
  stageNumber: number; // 1 to 5
}

export interface Complaint {
  id: string; // e.g. SPI-2026-CYB-74892
  citizenId: string;
  citizenName: string;
  citizenEmail: string;
  citizenPhone: string;
  category: ComplaintCategory;
  subCategory?: string;
  title: string;
  description: string;
  incidentDate: string;
  incidentTime: string;
  state: string;
  district: string;
  policeStation: string;
  locationAddress: string;
  priority: PriorityLevel;
  status: ComplaintStatus;
  assignedOfficer?: string;
  assignedOfficerBadge?: string;
  assignedOfficerPhone?: string;
  evidenceFiles?: string[];
  disclaimerAccepted: boolean;
  createdAt: string;
  updatedAt: string;
  resolutionRemarks?: string;
  timeline: TimelineEvent[];
}

export interface PoliceStation {
  id: string;
  name: string;
  code: string;
  state: string;
  district: string;
  city: string;
  pincode: string;
  address: string;
  phone: string;
  emergencyPhone: string;
  inChargeOfficer: string;
  type: 'General Station' | 'Cyber Crime Cell' | 'Women Police Station' | 'Traffic HQ' | 'Control Room';
  operatingHours: string;
  email: string;
}

export interface CyberArticle {
  id: string;
  title: string;
  category: 'Banking & UPI' | 'Social Media' | 'Identity Theft' | 'Job Scams' | 'Malware' | 'Child Safety';
  severity: 'Critical' | 'High' | 'Medium';
  summary: string;
  description: string;
  redFlags: string[];
  preventionSteps: string[];
  emergencyAction: string;
  iconName: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  suggestions?: string[];
}
