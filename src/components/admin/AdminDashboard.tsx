import React, { useState, useEffect } from 'react';
import { 
  Complaint, 
  ComplaintStatus, 
  UserProfile 
} from '../../types';
import { complaintService } from '../../services/complaintService';
import { StatusBadge } from '../common/StatusBadge';
import { 
  Shield, 
  Search, 
  Filter, 
  Clock, 
  UserCheck, 
  CheckCircle2, 
  AlertTriangle, 
  Download, 
  FileText, 
  Calendar, 
  MapPin, 
  Edit3, 
  Eye, 
  X,
  Phone,
  RefreshCw
} from 'lucide-react';

interface AdminDashboardProps {
  currentUser: UserProfile;
  onTrackComplaint: (id: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  currentUser,
  onTrackComplaint
}) => {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [filterPriority, setFilterPriority] = useState<string>('All');
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);

  // Status update modal state
  const [newStatus, setNewStatus] = useState<ComplaintStatus>('In Progress');
  const [officerName, setOfficerName] = useState(currentUser.fullName);
  const [officerBadge, setOfficerBadge] = useState(currentUser.badgeNumber || 'DL-IPS-7842');
  const [timelineRemarks, setTimelineRemarks] = useState('');
  const [updating, setUpdating] = useState(false);
  const [updateMessage, setUpdateMessage] = useState('');

  const loadAllComplaints = async () => {
    setLoading(true);
    try {
      const data = await complaintService.getAllComplaints();
      setComplaints(data);
    } catch (err) {
      console.error('Failed to load admin complaints:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllComplaints();
  }, []);

  // Filter complaints
  const filtered = complaints.filter((c) => {
    const matchesSearch = 
      c.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.citizenName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.citizenPhone.includes(searchQuery) ||
      c.policeStation.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = filterStatus === 'All' || c.status === filterStatus;
    const matchesPriority = filterPriority === 'All' || c.priority === filterPriority;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  // Analytics Metrics
  const totalCount = complaints.length;
  const submittedCount = complaints.filter(c => c.status === 'Submitted').length;
  const reviewCount = complaints.filter(c => c.status === 'Under Review' || c.status === 'Officer Assigned').length;
  const inProgressCount = complaints.filter(c => c.status === 'In Progress').length;
  const resolvedCount = complaints.filter(c => c.status === 'Resolved').length;

  const handleOpenActionModal = (complaint: Complaint) => {
    setSelectedComplaint(complaint);
    setNewStatus(complaint.status);
    setOfficerName(complaint.assignedOfficer || currentUser.fullName);
    setOfficerBadge(complaint.assignedOfficerBadge || currentUser.badgeNumber || 'DL-IPS-7842');
    setTimelineRemarks('');
    setUpdateMessage('');
  };

  const handleUpdateStatus = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedComplaint) return;

    setUpdating(true);
    try {
      const updated = await complaintService.updateComplaintStatus(
        selectedComplaint.id,
        newStatus,
        officerName,
        officerBadge,
        timelineRemarks.trim() || `Departmental action logged by ${officerName}. Status moved to ${newStatus}.`
      );

      if (updated) {
        setUpdateMessage('Complaint status updated successfully!');
        setSelectedComplaint(updated);
        await loadAllComplaints();
        setTimeout(() => {
          setSelectedComplaint(null);
        }, 1500);
      }
    } catch (err) {
      console.error('Update status failed:', err);
    } finally {
      setUpdating(false);
    }
  };

  const exportCSV = () => {
    const headers = ['Token', 'Citizen', 'Phone', 'Category', 'Station', 'Priority', 'Status', 'Date'];
    const rows = filtered.map(c => [
      c.id,
      `"${c.citizenName}"`,
      c.citizenPhone,
      `"${c.category}"`,
      `"${c.policeStation}"`,
      c.priority,
      c.status,
      c.createdAt
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `smartpolice_complaints_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
      {/* Officer Header */}
      <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-[#0A192F] to-amber-950/40 border border-amber-500/40 p-6 sm:p-8 shadow-2xl mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-slate-950 font-bold text-2xl shadow-xl">
            <Shield className="w-9 h-9" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold font-['Rajdhani'] text-white">
                Police Grievance Control Room
              </h1>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                Departmental Admin
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-1">
              Officer: <strong>{currentUser.fullName}</strong> • Badge: <span className="font-mono text-amber-400">{currentUser.badgeNumber || 'DL-IPS-7842'}</span> • {currentUser.department || 'Central Cyber & Grievance Cell'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={loadAllComplaints}
            className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            title="Refresh records"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>

          <button
            onClick={exportCSV}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-colors shadow-lg shadow-blue-900/30"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <div className="p-4 rounded-xl bg-[#0A192F] border border-blue-900/40 shadow-lg">
          <span className="text-[11px] font-medium text-slate-400">Total Dockets</span>
          <p className="text-2xl font-bold font-['Rajdhani'] text-white mt-1">{totalCount}</p>
        </div>

        <div className="p-4 rounded-xl bg-[#0A192F] border border-amber-900/40 shadow-lg">
          <span className="text-[11px] font-medium text-amber-300">Pending Triage</span>
          <p className="text-2xl font-bold font-['Rajdhani'] text-amber-200 mt-1">{submittedCount}</p>
        </div>

        <div className="p-4 rounded-xl bg-[#0A192F] border border-sky-900/40 shadow-lg">
          <span className="text-[11px] font-medium text-sky-300">Under Review</span>
          <p className="text-2xl font-bold font-['Rajdhani'] text-sky-200 mt-1">{reviewCount}</p>
        </div>

        <div className="p-4 rounded-xl bg-[#0A192F] border border-purple-900/40 shadow-lg">
          <span className="text-[11px] font-medium text-purple-300">Under Investigation</span>
          <p className="text-2xl font-bold font-['Rajdhani'] text-purple-200 mt-1">{inProgressCount}</p>
        </div>

        <div className="p-4 rounded-xl bg-[#0A192F] border border-emerald-900/40 shadow-lg col-span-2 lg:col-span-1">
          <span className="text-[11px] font-medium text-emerald-300">Resolved / Closed</span>
          <p className="text-2xl font-bold font-['Rajdhani'] text-emerald-200 mt-1">{resolvedCount}</p>
        </div>
      </div>

      {/* Filters & Complaint Management Table */}
      <div className="rounded-2xl bg-[#0A192F] border border-blue-900/60 shadow-2xl p-6">
        
        {/* Search & Filters */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by token, citizen name, phone, police station, or category..."
              className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Status Filter */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
            >
              <option value="All">All Statuses</option>
              <option value="Submitted">Submitted</option>
              <option value="Under Review">Under Review</option>
              <option value="Officer Assigned">Officer Assigned</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
              <option value="Rejected">Dismissed</option>
            </select>

            {/* Priority Filter */}
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
            >
              <option value="All">All Priorities</option>
              <option value="Standard">Standard</option>
              <option value="Urgent">Urgent</option>
              <option value="High Emergency">High Emergency</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/90 text-slate-400 uppercase font-mono tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Token ID</th>
                <th className="py-3 px-4">Complainant</th>
                <th className="py-3 px-4">Category & Station</th>
                <th className="py-3 px-4">Priority</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Assigned Officer</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-slate-900/40 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-amber-400">
                    {item.id}
                  </td>
                  <td className="py-3.5 px-4">
                    <p className="font-semibold text-white">{item.citizenName}</p>
                    <p className="text-[11px] text-slate-400">{item.citizenPhone}</p>
                  </td>
                  <td className="py-3.5 px-4">
                    <p className="font-medium text-slate-200">{item.category}</p>
                    <p className="text-[11px] text-slate-400 truncate max-w-[200px]">{item.policeStation}</p>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                      item.priority === 'High Emergency'
                        ? 'bg-red-500/20 text-red-300 border border-red-500/40'
                        : item.priority === 'Urgent'
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                        : 'bg-slate-800 text-slate-400'
                    }`}>
                      {item.priority}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <StatusBadge status={item.status} size="sm" />
                  </td>
                  <td className="py-3.5 px-4 text-slate-300">
                    {item.assignedOfficer ? (
                      <div>
                        <p className="font-medium">{item.assignedOfficer}</p>
                        <p className="text-[10px] text-slate-400 font-mono">{item.assignedOfficerBadge}</p>
                      </div>
                    ) : (
                      <span className="text-slate-500 italic">Unassigned</span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleOpenActionModal(item)}
                        className="px-2.5 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500 text-amber-300 hover:text-slate-950 font-semibold transition-all flex items-center gap-1"
                        title="Update Status / Assign Officer"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Action</span>
                      </button>

                      <button
                        onClick={() => onTrackComplaint(item.id)}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white"
                        title="View Public Timeline"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filtered.length === 0 && (
            <div className="py-12 text-center text-slate-400">
              <FileText className="w-8 h-8 text-slate-600 mx-auto mb-2" />
              <p>No complaints matching filter criteria.</p>
            </div>
          )}
        </div>
      </div>

      {/* OFFICER ACTION & STATUS UPDATE MODAL */}
      {selectedComplaint && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="max-w-2xl w-full rounded-2xl bg-[#0A192F] border border-amber-500/50 p-6 sm:p-8 text-white shadow-2xl relative max-h-[90vh] overflow-y-auto">
            
            <button
              onClick={() => setSelectedComplaint(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-xs text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800">
                  {selectedComplaint.id}
                </span>
                <span className="text-xs text-slate-400">Triage & Investigation Action Desk</span>
              </div>
              <h3 className="text-lg font-bold font-['Rajdhani'] mt-1">
                {selectedComplaint.title}
              </h3>
            </div>

            {/* Alert Message */}
            {updateMessage && (
              <div className="my-4 p-3 rounded-lg bg-emerald-950/60 border border-emerald-500/50 text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{updateMessage}</span>
              </div>
            )}

            {/* Incident Summary */}
            <div className="my-4 p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-2">
              <div className="grid grid-cols-2 gap-2 text-slate-400">
                <div>Complainant: <strong className="text-white">{selectedComplaint.citizenName}</strong> ({selectedComplaint.citizenPhone})</div>
                <div>Station: <strong className="text-white">{selectedComplaint.policeStation}</strong></div>
              </div>
              <p className="text-slate-300 pt-1 leading-relaxed border-t border-slate-800">
                "{selectedComplaint.description}"
              </p>
            </div>

            {/* Action Form */}
            <form onSubmit={handleUpdateStatus} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Change Investigation Status *
                </label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value as ComplaintStatus)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-amber-500"
                >
                  <option value="Submitted">Submitted (Under Triage)</option>
                  <option value="Under Review">Under Review (Scrutiny)</option>
                  <option value="Officer Assigned">Officer Assigned</option>
                  <option value="In Progress">In Progress (Active Investigation)</option>
                  <option value="Resolved">Resolved / Closed (Final Report)</option>
                  <option value="Rejected">Rejected / Dismissed</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Assigned Investigating Officer (IO)
                  </label>
                  <input
                    type="text"
                    required
                    value={officerName}
                    onChange={(e) => setOfficerName(e.target.value)}
                    placeholder="e.g. SI Neha Deshmukh"
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Officer Badge / Service ID
                  </label>
                  <input
                    type="text"
                    required
                    value={officerBadge}
                    onChange={(e) => setOfficerBadge(e.target.value)}
                    placeholder="e.g. DL-CYB-4091"
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Timeline Remarks / Citizen Notice *
                </label>
                <textarea
                  rows={3}
                  required
                  value={timelineRemarks}
                  onChange={(e) => setTimelineRemarks(e.target.value)}
                  placeholder="Enter remarks visible to the citizen on their tracking timeline (e.g. Notice issued to bank gateway, CCTV footage requisitioned, or final resolution summary)..."
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 leading-relaxed"
                />
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedComplaint(null)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={updating || !timelineRemarks.trim()}
                  className={`px-6 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all ${
                    updating || !timelineRemarks.trim() ? 'opacity-60 cursor-not-allowed' : ''
                  }`}
                >
                  {updating ? 'Saving Status...' : 'Apply Status Update'}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}
    </div>
  );
};
