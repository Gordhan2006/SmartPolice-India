import React, { useState } from 'react';
import { 
  FileText, 
  ShieldAlert, 
  MapPin, 
  Calendar, 
  Clock, 
  Upload, 
  CheckCircle, 
  AlertTriangle, 
  ArrowRight, 
  ArrowLeft, 
  Copy, 
  Search,
  ExternalLink,
  Printer,
  Sparkles
} from 'lucide-react';
import { triggerConfetti } from '../../utils/confetti';
import { ComplaintCategory, PriorityLevel, UserProfile, Complaint } from '../../types';
import { complaintService } from '../../services/complaintService';
import { STATES_LIST, POLICE_STATIONS } from '../../data/mockData';

interface ComplaintFormProps {
  currentUser: UserProfile | null;
  onOpenAuth: () => void;
  onSuccess: (complaint: Complaint) => void;
  onTrack: (id: string) => void;
}

export const ComplaintForm: React.FC<ComplaintFormProps> = ({
  currentUser,
  onOpenAuth,
  onSuccess,
  onTrack
}) => {
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submittedComplaint, setSubmittedComplaint] = useState<Complaint | null>(null);
  const [copied, setCopied] = useState(false);

  // Form Fields
  const [category, setCategory] = useState<ComplaintCategory>('Cyber Crime & Online Fraud');
  const [subCategory, setSubCategory] = useState('Unauthorized UPI Debit & Phishing');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [incidentDate, setIncidentDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [incidentTime, setIncidentTime] = useState('14:30');
  const [state, setState] = useState(currentUser?.state || 'Delhi');
  const [district, setDistrict] = useState('New Delhi');
  const [policeStation, setPoliceStation] = useState('Cyber Crime Police Station - Mandir Marg');
  const [locationAddress, setLocationAddress] = useState('');
  const [priority, setPriority] = useState<PriorityLevel>('Standard');

  // Contact Info
  const [citizenName, setCitizenName] = useState(currentUser?.fullName || '');
  const [citizenEmail, setCitizenEmail] = useState(currentUser?.email || '');
  const [citizenPhone, setCitizenPhone] = useState(currentUser?.phone || '');

  // Simulated evidence file uploads
  const [evidenceList, setEvidenceList] = useState<string[]>([]);
  const [disclaimerAccepted, setDisclaimerAccepted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const categorySubcategories: Record<ComplaintCategory, string[]> = {
    'Cyber Crime & Online Fraud': [
      'Unauthorized UPI Debit & Phishing',
      'Electricity / Utility Bill Scam',
      'Job & Task Investment Scam',
      'Social Media Impersonation / Hacking',
      'Fake Video Call / Digital Arrest Scam',
      'SIM Swap / OTP Theft'
    ],
    'Theft & Burglary': [
      'Two-Wheeler / Motor Vehicle Theft',
      'Mobile Phone / Laptop Snatching',
      'Residential House Burglary',
      'Commercial / Shop Theft'
    ],
    'Women Safety & Harassment': [
      'Online Cyber Stalking & Abuse',
      'Public Place Eve-Teasing / Harassment',
      'Domestic Violence',
      'Morphing & Obscene Content Distribution'
    ],
    'Missing Person / Property': [
      'Missing Adult / Elderly Citizen',
      'Missing Child',
      'Lost Passport / Driving License / Aadhaar',
      'Lost Valuables / Handbag'
    ],
    'Public Nuisance & Traffic': [
      'Reckless Driving & Hit & Run',
      'Illegal Road Obstruction / Encroachment',
      'Late Night Loudspeakers & Noise Nuisance',
      'Drunk & Disorderly Conduct'
    ],
    'Corruption & Bribery': [
      'Bribery Demand by Public Official',
      'Embezzlement of Public Funds',
      'Illegal Extortion'
    ],
    'Economic Offense': [
      'Cheque Bounce / Commercial Fraud',
      'Real Estate Builder Non-Delivery Fraud',
      'Ponzi / Multi-Level Marketing Scam'
    ],
    'Other Grievance': [
      'General Non-Cognizable Grievance',
      'Neighbor Property Dispute',
      'Noise Complaint'
    ]
  };

  const handleAddSampleFile = (fileName: string) => {
    if (!evidenceList.includes(fileName)) {
      setEvidenceList([...evidenceList, fileName]);
    }
  };

  const handleRemoveFile = (fileName: string) => {
    setEvidenceList(evidenceList.filter(f => f !== fileName));
  };

  const handleNextStep = () => {
    setErrorMessage('');
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      if (!locationAddress.trim()) {
        setErrorMessage('Please provide an approximate location / street address.');
        return;
      }
      setStep(3);
    } else if (step === 3) {
      if (!title.trim() || !description.trim()) {
        setErrorMessage('Please enter both the grievance title and detailed description.');
        return;
      }
      if (description.trim().length < 20) {
        setErrorMessage('Description should contain at least 20 characters for clear understanding.');
        return;
      }
      setStep(4);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!citizenName.trim() || !citizenEmail.trim() || !citizenPhone.trim()) {
      setErrorMessage('Please provide your name, email, and phone number.');
      return;
    }

    if (!disclaimerAccepted) {
      setErrorMessage('You must acknowledge that this is an educational simulation before submitting.');
      return;
    }

    setSubmitting(true);

    try {
      const created = await complaintService.createComplaint({
        citizenId: currentUser?.id || 'citizen-guest-' + Date.now(),
        citizenName,
        citizenEmail,
        citizenPhone,
        category,
        subCategory,
        title,
        description,
        incidentDate,
        incidentTime,
        state,
        district,
        policeStation,
        locationAddress,
        priority,
        evidenceFiles: evidenceList.length > 0 ? evidenceList : ['incident_declaration.pdf'],
        disclaimerAccepted: true
      });

      // Fire celebratory confetti!
      triggerConfetti();

      setSubmittedComplaint(created);
      onSuccess(created);
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to submit simulated complaint.');
    } finally {
      setSubmitting(false);
    }
  };

  const copyToken = (token: string) => {
    navigator.clipboard.writeText(token);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // SUCCESS SCREEN
  if (submittedComplaint) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8 animate-fadeIn">
        <div className="rounded-2xl bg-[#0A192F] border border-emerald-500/40 p-6 sm:p-10 text-white shadow-2xl relative overflow-hidden">
          
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-lg">
              <CheckCircle className="w-10 h-10" />
            </div>

            <div className="space-y-1">
              <span className="text-xs uppercase font-bold tracking-wider text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-800">
                Simulated e-Complaint Acknowledged
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-['Rajdhani'] text-white">
                Complaint Registered Successfully!
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">
                Your incident has been cataloged in the SmartPolice India simulation registry. Save your tracking token below.
              </p>
            </div>

            {/* Token Badge */}
            <div className="my-6 p-4 rounded-xl bg-slate-900/90 border border-blue-900/60 max-w-md mx-auto flex items-center justify-between shadow-inner">
              <div className="text-left">
                <span className="text-[11px] text-slate-400 uppercase font-mono block">Unique Tracking Token:</span>
                <span className="text-lg sm:text-xl font-bold font-mono text-amber-400 tracking-wider">
                  {submittedComplaint.id}
                </span>
              </div>
              <button
                onClick={() => copyToken(submittedComplaint.id)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600/30 hover:bg-blue-600/50 text-blue-300 border border-blue-500/30 text-xs font-semibold transition-all"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>

            {/* Complaint Summary Card */}
            <div className="text-left bg-slate-950/60 rounded-xl p-5 border border-slate-800 text-xs space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pb-3 border-b border-slate-800">
                <div>
                  <span className="text-slate-400">Category:</span>
                  <p className="font-semibold text-white">{submittedComplaint.category}</p>
                </div>
                <div>
                  <span className="text-slate-400">Jurisdiction Station:</span>
                  <p className="font-semibold text-white">{submittedComplaint.policeStation}</p>
                </div>
                <div>
                  <span className="text-slate-400">Complainant:</span>
                  <p className="font-semibold text-white">{submittedComplaint.citizenName} ({submittedComplaint.citizenPhone})</p>
                </div>
                <div>
                  <span className="text-slate-400">Filing Date & Time:</span>
                  <p className="font-semibold text-white">
                    {new Date(submittedComplaint.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>

              <div>
                <span className="text-slate-400">Grievance Title:</span>
                <p className="font-semibold text-white mt-0.5">{submittedComplaint.title}</p>
              </div>

              {/* Educational Reminder Box */}
              <div className="p-3 rounded-lg bg-amber-950/30 border border-amber-500/30 text-amber-200 text-[11px] flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Reminder:</strong> This is an academic test submission. No actual police investigation or emergency dispatch is dispatched from this student platform.
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => onTrack(submittedComplaint.id)}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-900/40"
              >
                <Search className="w-4 h-4" />
                <span>Track Incident Live Timeline</span>
              </button>

              <button
                onClick={() => window.print()}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-sm font-semibold flex items-center justify-center gap-2"
              >
                <Printer className="w-4 h-4" />
                <span>Print Simulated Slip</span>
              </button>

              <button
                onClick={() => {
                  setSubmittedComplaint(null);
                  setStep(1);
                  setTitle('');
                  setDescription('');
                }}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 text-sm"
              >
                File Another Grievance
              </button>
            </div>

          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8 text-center sm:text-left flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/20 text-red-300 border border-red-500/30 text-xs font-semibold mb-2">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Digital Grievance Lodging (Simulation)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-['Rajdhani'] text-white">
            Register Citizen e-Complaint
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Fill the standard 4-step digital grievance docket. An automated unique token will be generated immediately.
          </p>
        </div>

        {!currentUser && (
          <button
            onClick={onOpenAuth}
            className="self-center sm:self-auto px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-blue-300 border border-blue-900/60 text-xs font-semibold"
          >
            Sign In to Auto-Fill Profile
          </button>
        )}
      </div>

      {/* Stepper Progress Bar */}
      <div className="mb-8 grid grid-cols-4 gap-2 text-center text-xs">
        {[
          { num: 1, label: 'Category' },
          { num: 2, label: 'Location & Time' },
          { num: 3, label: 'Incident Details' },
          { num: 4, label: 'Consent & Token' },
        ].map((s) => (
          <div
            key={s.num}
            onClick={() => {
              if (s.num < step) setStep(s.num);
            }}
            className={`p-3 rounded-xl border transition-all cursor-pointer ${
              step === s.num
                ? 'bg-blue-600/20 border-blue-500 text-white font-semibold shadow-lg'
                : step > s.num
                ? 'bg-emerald-950/40 border-emerald-600/50 text-emerald-300'
                : 'bg-slate-900/50 border-slate-800 text-slate-500 cursor-not-allowed'
            }`}
          >
            <div className="flex items-center justify-center gap-1.5">
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                step === s.num ? 'bg-blue-600 text-white' : step > s.num ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'
              }`}>
                {step > s.num ? '✓' : s.num}
              </span>
              <span className="hidden sm:inline">{s.label}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Error Message */}
      {errorMessage && (
        <div className="mb-6 p-4 rounded-xl bg-red-950/80 border border-red-500/60 text-red-200 text-xs flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-red-400 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Form Container */}
      <div className="rounded-2xl bg-[#0A192F] border border-blue-900/60 p-6 sm:p-8 shadow-2xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* STEP 1: CATEGORY SELECTION */}
          {step === 1 && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <h3 className="text-base font-semibold text-white mb-1">Select Grievance Category</h3>
                <p className="text-xs text-slate-400">Classify your complaint for appropriate jurisdictional routing.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {Object.keys(categorySubcategories).map((catName) => {
                  const isSelected = category === catName;
                  return (
                    <div
                      key={catName}
                      onClick={() => {
                        setCategory(catName as ComplaintCategory);
                        setSubCategory(categorySubcategories[catName as ComplaintCategory][0]);
                      }}
                      className={`p-4 rounded-xl border text-left cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-blue-950/60 border-blue-500 text-white ring-1 ring-blue-500'
                          : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-800/80 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold">{catName}</span>
                        {isSelected && <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>}
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1">
                        {categorySubcategories[catName as ComplaintCategory].slice(0, 2).join(', ')}...
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Subcategory */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">
                  Specific Sub-classification
                </label>
                <select
                  value={subCategory}
                  onChange={(e) => setSubCategory(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500"
                >
                  {categorySubcategories[category].map((sub) => (
                    <option key={sub} value={sub}>{sub}</option>
                  ))}
                </select>
              </div>

              {/* Priority Selection */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">
                  Priority Urgency
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {(['Standard', 'Urgent', 'High Emergency'] as PriorityLevel[]).map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setPriority(p)}
                      className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all ${
                        priority === p
                          ? p === 'High Emergency'
                            ? 'bg-red-600 text-white border-red-500 shadow'
                            : p === 'Urgent'
                            ? 'bg-amber-600 text-white border-amber-500 shadow'
                            : 'bg-blue-600 text-white border-blue-500 shadow'
                          : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: INCIDENT LOCATION & TIME */}
          {step === 2 && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <h3 className="text-base font-semibold text-white mb-1">Time & Jurisdiction Location</h3>
                <p className="text-xs text-slate-400">Specify when and where the incident took place.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Date of Incident *
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                    <input
                      type="date"
                      required
                      value={incidentDate}
                      onChange={(e) => setIncidentDate(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Approximate Time *
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                    <input
                      type="time"
                      required
                      value={incidentTime}
                      onChange={(e) => setIncidentTime(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    State / Union Territory *
                  </label>
                  <select
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500"
                  >
                    {STATES_LIST.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    District / Commissionerate *
                  </label>
                  <input
                    type="text"
                    required
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    placeholder="e.g. New Delhi, Mumbai Suburban, Bengaluru Urban"
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Designated Police Station Jurisdiction
                </label>
                <select
                  value={policeStation}
                  onChange={(e) => setPoliceStation(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500"
                >
                  {POLICE_STATIONS.map((ps) => (
                    <option key={ps.id} value={ps.name}>
                      {ps.name} ({ps.city}, {ps.state})
                    </option>
                  ))}
                  <option value="Central Jurisdictional Police Station">Central Jurisdictional Police Station</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Exact Location / Street Address / Landmark *
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                  <textarea
                    rows={2}
                    required
                    value={locationAddress}
                    onChange={(e) => setLocationAddress(e.target.value)}
                    placeholder="e.g. Near Metro Station Gate 2, Connaught Place, New Delhi"
                    className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500 placeholder-slate-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: INCIDENT DESCRIPTION & EVIDENCE */}
          {step === 3 && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <h3 className="text-base font-semibold text-white mb-1">Grievance Narrative & Evidence</h3>
                <p className="text-xs text-slate-400">Provide an objective summary of facts. You can attach simulated evidence files.</p>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Subject / Grievance Summary Title *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Unauthorized fraudulent debit of ₹25,000 via fake lottery SMS"
                  className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500 placeholder-slate-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Chronological Details & Description * (Minimum 20 characters)
                </label>
                <textarea
                  rows={5}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe step-by-step: what happened, persons involved, transaction IDs, phone numbers contacted, or loss incurred..."
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500 placeholder-slate-500 leading-relaxed"
                />
              </div>

              {/* Simulated Evidence Upload Area */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-2">
                  Attach Supporting Documents (Simulated Files)
                </label>
                <div className="p-4 rounded-xl bg-slate-900/60 border border-dashed border-slate-700 text-center space-y-3">
                  <Upload className="w-6 h-6 text-slate-400 mx-auto" />
                  <p className="text-xs text-slate-300">
                    Click to add sample simulated attachments (PDF statements, chat screenshots, FIR drafts):
                  </p>

                  <div className="flex flex-wrap gap-2 justify-center">
                    {[
                      'bank_statement_nov.pdf',
                      'whatsapp_chat_evidence.png',
                      'parking_ticket_receipt.jpg',
                      'aadhaar_lost_affidavit.pdf'
                    ].map((sample) => (
                      <button
                        key={sample}
                        type="button"
                        onClick={() => handleAddSampleFile(sample)}
                        className="text-[11px] px-2.5 py-1 rounded bg-slate-800 hover:bg-blue-900/50 text-blue-300 border border-slate-700 hover:border-blue-500 transition-colors"
                      >
                        + Add {sample}
                      </button>
                    ))}
                  </div>

                  {evidenceList.length > 0 && (
                    <div className="pt-2 border-t border-slate-800 flex flex-wrap gap-2 justify-center">
                      {evidenceList.map((file) => (
                        <span
                          key={file}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-950 text-blue-300 border border-blue-800 text-xs"
                        >
                          <FileText className="w-3 h-3" />
                          <span>{file}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveFile(file)}
                            className="text-red-400 hover:text-red-300 ml-1 font-bold"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: CONTACT & SIMULATION CONSENT */}
          {step === 4 && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <h3 className="text-base font-semibold text-white mb-1">Complainant Verification & Acknowledgment</h3>
                <p className="text-xs text-slate-400">Ensure contact coordinates are accurate for tracking communications.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Citizen Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={citizenName}
                    onChange={(e) => setCitizenName(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={citizenEmail}
                    onChange={(e) => setCitizenEmail(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={citizenPhone}
                    onChange={(e) => setCitizenPhone(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Mandatory Academic Disclaimer Box */}
              <div className="p-4 rounded-xl bg-red-950/40 border border-red-500/50 space-y-3">
                <div className="flex items-center gap-2 text-red-300 font-bold text-xs uppercase tracking-wider">
                  <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
                  <span>Mandatory Academic Project Declaration</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  I understand that <strong>SmartPolice India</strong> is an independent educational engineering project designed to study civic grievance workflows. This submission creates a simulated record only. It does <strong>not</strong> constitute a legal First Information Report (FIR) under Section 173 BNSS / Section 154 CrPC, and no actual police officers are dispatched.
                </p>

                <label className="flex items-start gap-3 cursor-pointer pt-2 border-t border-red-900/60">
                  <input
                    type="checkbox"
                    checked={disclaimerAccepted}
                    onChange={(e) => setDisclaimerAccepted(e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded text-red-600 focus:ring-red-500 bg-slate-900 border-slate-700"
                  />
                  <span className="text-xs font-semibold text-white select-none">
                    I acknowledge that this is a simulated academic demonstration and accept terms.
                  </span>
                </label>
              </div>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="pt-4 flex items-center justify-between border-t border-slate-800">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            ) : <div></div>}

            {step < 4 ? (
              <button
                type="button"
                onClick={handleNextStep}
                className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-2 shadow-lg shadow-blue-900/30"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={submitting || !disclaimerAccepted}
                className={`px-8 py-3 rounded-xl bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-500 hover:to-blue-500 text-white text-sm font-bold flex items-center gap-2 shadow-xl shadow-red-900/30 transition-all ${
                  submitting || !disclaimerAccepted ? 'opacity-60 cursor-not-allowed' : ''
                }`}
              >
                {submitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    <span>Generating Unique Token...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Submit & Generate Token</span>
                  </>
                )}
              </button>
            )}
          </div>

        </form>
      </div>
    </div>
  );
};
