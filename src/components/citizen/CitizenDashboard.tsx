import React, { useState, useEffect } from 'react';
import { 
  UserProfile, 
  Complaint 
} from '../../types';
import { complaintService } from '../../services/complaintService';
import { StatusBadge } from '../common/StatusBadge';
import { 
  FileText, 
  Search, 
  PlusCircle, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Calendar, 
  MapPin, 
  ArrowRight,
  Shield,
  Activity,
  Filter
} from 'lucide-react';

interface CitizenDashboardProps {
  currentUser: UserProfile;
  onFileComplaint: () => void;
  onTrackComplaint: (id: string) => void;
}

export const CitizenDashboard: React.FC<CitizenDashboardProps> = ({
  currentUser,
  onFileComplaint,
  onTrackComplaint,
}) => {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const loadComplaints = async () => {
    setLoading(true);
    try {
      const userComplaints = await complaintService.getComplaintsByCitizen(
        currentUser.id,
        currentUser.email
      );
      setComplaints(userComplaints);
    } catch (err) {
      console.error('Error fetching user complaints:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadComplaints();
  }, [currentUser]);

  // Derived Statistics
  const totalFiled = complaints.length;
  const underReview = complaints.filter(c => c.status === 'Submitted' || c.status === 'Under Review').length;
  const inProgress = complaints.filter(c => c.status === 'Officer Assigned' || c.status === 'In Progress').length;
  const resolved = complaints.filter(c => c.status === 'Resolved').length;

  const filteredList = complaints.filter(c => {
    const matchesStatus = filterStatus === 'All' || c.status === filterStatus;
    const matchesSearch = 
      c.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.policeStation.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
      {/* Welcome & Profile Header */}
      <div className="rounded-2xl bg-gradient-to-r from-[#0F2444] via-[#0A192F] to-[#1B3B6F]/40 border border-blue-900/60 p-6 sm:p-8 shadow-2xl mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-800 flex items-center justify-center text-white font-bold text-2xl shadow-xl shadow-blue-900/50">
            {currentUser.fullName.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold font-['Rajdhani'] text-white">
                Welcome, {currentUser.fullName}
              </h1>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                Verified Citizen ID
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-1">
              {currentUser.email} • {currentUser.phone || '+91 98765 43210'} • {currentUser.state || 'Delhi'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onFileComplaint}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-semibold text-xs shadow-lg shadow-red-900/40 transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            <span>File New e-Complaint</span>
          </button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="p-5 rounded-2xl bg-[#0A192F] border border-blue-900/40 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Total Grievances</span>
            <FileText className="w-4 h-4 text-blue-400" />
          </div>
          <p className="text-2xl font-bold font-['Rajdhani'] text-white mt-2">{totalFiled}</p>
          <span className="text-[11px] text-slate-500 mt-1 block">Logged in system</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#0A192F] border border-sky-900/40 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-sky-300">Under Review</span>
            <Clock className="w-4 h-4 text-sky-400" />
          </div>
          <p className="text-2xl font-bold font-['Rajdhani'] text-sky-200 mt-2">{underReview}</p>
          <span className="text-[11px] text-sky-400/70 mt-1 block">Preliminary screening</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#0A192F] border border-purple-900/40 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-purple-300">Active Investigation</span>
            <Activity className="w-4 h-4 text-purple-400" />
          </div>
          <p className="text-2xl font-bold font-['Rajdhani'] text-purple-200 mt-2">{inProgress}</p>
          <span className="text-[11px] text-purple-400/70 mt-1 block">Officer engaged</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#0A192F] border border-emerald-900/40 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-emerald-300">Resolved / Closed</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-bold font-['Rajdhani'] text-emerald-200 mt-2">{resolved}</p>
          <span className="text-[11px] text-emerald-400/70 mt-1 block">Completed cases</span>
        </div>
      </div>

      {/* Complaints List Section */}
      <div className="rounded-2xl bg-[#0A192F] border border-blue-900/60 shadow-2xl p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-lg font-bold text-white font-['Rajdhani']">
              Your Registered Complaints & Grievances
            </h2>
            <p className="text-xs text-slate-400">Track real-time status and view investigation timeline updates.</p>
          </div>

          {/* Filters & Search */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search token, category..."
                className="pl-8 pr-3 py-1.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
              <Filter className="w-3.5 h-3.5 text-slate-400 ml-1.5" />
              {['All', 'Submitted', 'In Progress', 'Resolved'].map((st) => (
                <button
                  key={st}
                  onClick={() => setFilterStatus(st)}
                  className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                    filterStatus === st
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Complaints Table / Cards */}
        {loading ? (
          <div className="py-16 text-center text-slate-400 text-xs">
            <span className="w-6 h-6 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin inline-block mb-2"></span>
            <p>Loading grievances...</p>
          </div>
        ) : filteredList.length === 0 ? (
          <div className="py-16 text-center text-slate-400 bg-slate-950/40 rounded-xl border border-slate-800/80 p-8">
            <FileText className="w-10 h-10 text-slate-600 mx-auto mb-3" />
            <h3 className="text-sm font-semibold text-white">No complaints found</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              {complaints.length === 0
                ? "You have not filed any simulated complaints yet. Use the 'File New e-Complaint' button to test."
                : "No complaints match your current filter or search criteria."}
            </p>
            {complaints.length === 0 && (
              <button
                onClick={onFileComplaint}
                className="mt-4 px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-500 transition-colors"
              >
                File Your First Complaint
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredList.map((complaint) => (
              <div
                key={complaint.id}
                className="p-5 rounded-xl bg-slate-900/60 hover:bg-slate-900/90 border border-slate-800 hover:border-blue-900/80 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 group"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono font-bold text-xs text-amber-400 bg-amber-950/40 px-2 py-0.5 rounded border border-amber-800/50">
                      {complaint.id}
                    </span>
                    <StatusBadge status={complaint.status} size="sm" />
                    <span className="text-[11px] text-slate-400 font-medium">
                      {complaint.category}
                    </span>
                  </div>

                  <h3 className="text-sm font-semibold text-white group-hover:text-blue-300 transition-colors">
                    {complaint.title}
                  </h3>

                  <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-400 pt-1">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-500" />
                      <span>{new Date(complaint.createdAt).toLocaleDateString()}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-500" />
                      <span className="truncate max-w-[200px]">{complaint.policeStation}</span>
                    </span>
                    {complaint.assignedOfficer && (
                      <span className="flex items-center gap-1 text-indigo-300">
                        <Shield className="w-3 h-3" />
                        <span>IO: {complaint.assignedOfficer}</span>
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                  <button
                    onClick={() => onTrackComplaint(complaint.id)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600/20 hover:bg-blue-600 text-blue-300 hover:text-white border border-blue-500/30 text-xs font-semibold transition-all"
                  >
                    <span>View Timeline</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
