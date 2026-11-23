import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Clock, 
  MapPin, 
  Calendar, 
  User, 
  Phone, 
  Shield, 
  FileText, 
  Printer, 
  CheckCircle2, 
  AlertCircle, 
  ExternalLink,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { Complaint } from '../../types';
import { complaintService } from '../../services/complaintService';
import { StatusBadge } from '../common/StatusBadge';

interface ComplaintTrackerProps {
  initialSearchId?: string;
  onNavigateToFile?: () => void;
}

export const ComplaintTracker: React.FC<ComplaintTrackerProps> = ({
  initialSearchId = '',
  onNavigateToFile
}) => {
  const [searchToken, setSearchToken] = useState(initialSearchId);
  const [searchedComplaint, setSearchedComplaint] = useState<Complaint | null>(null);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const sampleTokens = [
    { id: 'SPI-2026-CYB-88412', label: 'Cyber Fraud (In Progress)' },
    { id: 'SPI-2026-THF-71209', label: 'Motorcycle Theft (Officer Assigned)' },
    { id: 'SPI-2026-WOM-45019', label: 'Women Safety (Resolved)' },
    { id: 'SPI-2026-MIS-31998', label: 'Missing Passport (Submitted)' },
  ];

  const handleSearch = async (tokenToSearch: string) => {
    if (!tokenToSearch.trim()) {
      setErrorMessage('Please enter a valid unique Complaint ID or tracking token.');
      return;
    }

    setLoading(true);
    setErrorMessage('');
    setSearched(true);

    try {
      const result = await complaintService.getComplaintById(tokenToSearch.trim());
      if (result) {
        setSearchedComplaint(result);
      } else {
        setSearchedComplaint(null);
        setErrorMessage(`No complaint record found matching token: "${tokenToSearch}".`);
      }
    } catch (err: any) {
      setErrorMessage('Error searching records. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialSearchId) {
      setSearchToken(initialSearchId);
      handleSearch(initialSearchId);
    }
  }, [initialSearchId]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 animate-fadeIn">
      {/* Title & Description */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-600/20 text-blue-300 border border-blue-500/30 text-xs font-semibold mb-3">
          <Search className="w-3.5 h-3.5" />
          <span>Real-time Status Tracking</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold font-['Rajdhani'] text-white">
          Track Grievance Status & Timeline
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-2">
          Enter your unique SmartPolice tracking token (e.g. SPI-2026-CYB-88412) to inspect stage-by-stage police procedural milestones and investigating officer logs.
        </p>
      </div>

      {/* Search Bar Container */}
      <div className="max-w-2xl mx-auto mb-6">
        <form 
          onSubmit={(e) => { e.preventDefault(); handleSearch(searchToken); }}
          className="flex flex-col sm:flex-row gap-2"
        >
          <div className="relative flex-1">
            <Search className="absolute left-4 top-3.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchToken}
              onChange={(e) => setSearchToken(e.target.value)}
              placeholder="Enter Complaint Token (e.g. SPI-2026-CYB-88412)"
              className="w-full pl-11 pr-4 py-3 bg-[#0A192F] border border-blue-900/60 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 uppercase tracking-wider font-mono shadow-inner"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs sm:text-sm transition-all shadow-lg shadow-blue-900/30 flex items-center justify-center gap-2"
          >
            {loading ? (
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            ) : (
              <span>Track Token</span>
            )}
          </button>
        </form>

        {/* Quick Sample Clickable Tokens */}
        <div className="mt-3 flex flex-wrap items-center gap-2 justify-center text-[11px] text-slate-400">
          <span className="font-semibold text-slate-300">Quick Test Cases:</span>
          {sampleTokens.map((sample) => (
            <button
              key={sample.id}
              type="button"
              onClick={() => {
                setSearchToken(sample.id);
                handleSearch(sample.id);
              }}
              className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-blue-900/40 text-blue-300 border border-slate-800 hover:border-blue-700 transition-colors font-mono"
            >
              {sample.id}
            </button>
          ))}
        </div>
      </div>

      {/* Error Message */}
      {errorMessage && (
        <div className="max-w-2xl mx-auto mb-8 p-4 rounded-xl bg-red-950/70 border border-red-500/50 text-red-200 text-xs flex items-center gap-3">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* TRACKING RESULT DETAILS */}
      {searchedComplaint && (
        <div className="space-y-8 animate-fadeIn">
          {/* Header Card */}
          <div className="rounded-2xl bg-[#0A192F] border border-blue-900/60 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
              <div>
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <span className="font-mono font-bold text-base text-amber-400 bg-amber-950/50 px-3 py-1 rounded-lg border border-amber-800/60">
                    {searchedComplaint.id}
                  </span>
                  <StatusBadge status={searchedComplaint.status} size="lg" />
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                    searchedComplaint.priority === 'High Emergency' 
                      ? 'bg-red-500/20 text-red-300 border border-red-500/40' 
                      : 'bg-slate-800 text-slate-400'
                  }`}>
                    Priority: {searchedComplaint.priority}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-white font-['Rajdhani']">
                  {searchedComplaint.title}
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Category: <strong className="text-slate-200">{searchedComplaint.category}</strong> {searchedComplaint.subCategory && `(${searchedComplaint.subCategory})`}
                </p>
              </div>

              <div className="flex items-center gap-2 self-start md:self-auto">
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center gap-2 transition-colors"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Slip</span>
                </button>
              </div>
            </div>

            {/* Core Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 py-6 border-b border-slate-800 text-xs">
              <div className="space-y-1">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-blue-400" />
                  <span>Incident Date & Time:</span>
                </span>
                <p className="font-semibold text-white">
                  {searchedComplaint.incidentDate} at {searchedComplaint.incidentTime}
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-red-400" />
                  <span>Jurisdiction Station:</span>
                </span>
                <p className="font-semibold text-white truncate">
                  {searchedComplaint.policeStation}
                </p>
                <p className="text-[11px] text-slate-400 truncate">{searchedComplaint.district}, {searchedComplaint.state}</p>
              </div>

              <div className="space-y-1">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Investigating Officer:</span>
                </span>
                <p className="font-semibold text-white">
                  {searchedComplaint.assignedOfficer || 'Pending Assignment'}
                </p>
                {searchedComplaint.assignedOfficerBadge && (
                  <p className="text-[11px] text-slate-400 font-mono">
                    Badge: {searchedComplaint.assignedOfficerBadge}
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Complainant:</span>
                </span>
                <p className="font-semibold text-white">
                  {searchedComplaint.citizenName}
                </p>
                <p className="text-[11px] text-slate-400">{searchedComplaint.citizenPhone}</p>
              </div>
            </div>

            {/* Narrative & Files */}
            <div className="pt-6 space-y-4">
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                  Incident Narrative & Description:
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                  {searchedComplaint.description}
                </p>
              </div>

              {searchedComplaint.evidenceFiles && searchedComplaint.evidenceFiles.length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                    Attached Simulated Evidence Files:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {searchedComplaint.evidenceFiles.map((f) => (
                      <span
                        key={f}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-950/60 border border-blue-900/80 text-blue-300 text-xs"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>{f}</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {searchedComplaint.resolutionRemarks && (
                <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-200 text-xs">
                  <div className="flex items-center gap-2 font-bold mb-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Official Closure & Resolution Summary:</span>
                  </div>
                  <p className="leading-relaxed">{searchedComplaint.resolutionRemarks}</p>
                </div>
              )}
            </div>
          </div>

          {/* STATUS TIMELINE SECTION */}
          <div className="rounded-2xl bg-[#0A192F] border border-blue-900/60 p-6 sm:p-8 shadow-2xl">
            <div className="mb-6">
              <h3 className="text-lg font-bold font-['Rajdhani'] text-white">
                Investigation Progress Timeline
              </h3>
              <p className="text-xs text-slate-400">
                Audited chronological log of administrative and departmental actions taken on this grievance.
              </p>
            </div>

            {/* Vertical Milestones */}
            <div className="relative pl-6 sm:pl-8 border-l-2 border-blue-900/60 space-y-8 my-4 ml-4">
              {searchedComplaint.timeline.map((event, index) => {
                const isLatest = index === searchedComplaint.timeline.length - 1;
                return (
                  <div key={event.id || index} className="relative group">
                    {/* Node Circle */}
                    <div className={`absolute -left-[31px] sm:-left-[39px] top-1 w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                      isLatest
                        ? 'bg-blue-600 border-white text-white shadow-lg shadow-blue-500/50 scale-110'
                        : 'bg-slate-900 border-blue-500/40 text-blue-400'
                    }`}>
                      <span className="text-[10px] sm:text-xs font-bold">
                        {event.stageNumber || index + 1}
                      </span>
                    </div>

                    {/* Content Box */}
                    <div className="p-4 sm:p-5 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-blue-900/80 transition-all space-y-2">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-white">
                            {event.title}
                          </h4>
                          {isLatest && (
                            <span className="text-[9px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full bg-blue-500 text-white animate-pulse">
                              Current Stage
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-slate-400 font-mono">
                          {new Date(event.timestamp).toLocaleString()}
                        </span>
                      </div>

                      <p className="text-xs text-slate-300 leading-relaxed">
                        {event.description}
                      </p>

                      {event.officerName && (
                        <div className="pt-2 flex items-center gap-2 text-[11px] text-indigo-300 font-medium">
                          <Shield className="w-3 h-3 text-indigo-400" />
                          <span>Action logged by: {event.officerName} {event.officerBadge ? `(${event.officerBadge})` : ''}</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Educational Disclaimer footer */}
            <div className="mt-8 pt-4 border-t border-slate-800/80 text-[11px] text-slate-500 text-center">
              Record verified under SmartPolice India simulated ledger. For real emergencies or filing legal FIRs, call 112 or visit your local police station in person.
            </div>
          </div>
        </div>
      )}

      {/* Fallback if no search yet */}
      {!searched && (
        <div className="mt-12 text-center p-8 rounded-2xl bg-slate-950/40 border border-slate-800/60 max-w-xl mx-auto">
          <Clock className="w-10 h-10 text-blue-400/60 mx-auto mb-3" />
          <h3 className="text-sm font-semibold text-white">No token searched yet</h3>
          <p className="text-xs text-slate-400 mt-1">
            Click one of the sample tokens above or enter a token received when filing a complaint to test the tracking engine.
          </p>
          {onNavigateToFile && (
            <button
              onClick={onNavigateToFile}
              className="mt-4 px-4 py-2 rounded-xl bg-blue-600/30 hover:bg-blue-600 text-blue-200 text-xs font-semibold border border-blue-500/40 transition-colors"
            >
              File a New Complaint to Get a Token
            </button>
          )}
        </div>
      )}
    </div>
  );
};
