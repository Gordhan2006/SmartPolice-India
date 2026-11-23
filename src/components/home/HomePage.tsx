import React from 'react';
import { 
  Shield, 
  FileText, 
  Search, 
  MapPin, 
  Lock, 
  Bot, 
  PhoneCall, 
  CheckCircle, 
  ArrowRight, 
  Building2, 
  Clock, 
  Sparkles,
  AlertTriangle,
  ExternalLink,
  ChevronRight,
  Award,
  Zap,
  Users
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (tab: string) => void;
  onOpenAuth: (role?: 'citizen' | 'admin') => void;
  onSelectSampleToken: (token: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onOpenAuth,
  onSelectSampleToken
}) => {
  return (
    <div className="space-y-16 animate-fadeIn">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-8 pb-16 lg:py-20 px-4 sm:px-6 lg:px-8 border-b border-blue-900/40">
        
        {/* Background glow effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-blue-700/20 via-indigo-600/15 to-red-600/10 blur-[120px] pointer-events-none rounded-full"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            
            {/* National Civic Tech Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/80 border border-blue-500/30 text-blue-300 text-xs font-semibold shadow-lg shadow-blue-950/40">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
              <span>SMART POLICING & DIGITAL CITIZEN INTERFACE • 2026</span>
              <span className="text-slate-500">•</span>
              <span className="text-amber-400 font-mono text-[11px]">Academic Demo</span>
            </div>

            {/* Main Title */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white font-['Rajdhani'] leading-tight">
              SMART POLICE <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-white to-blue-400">INDIA</span>
              <span className="block text-xl sm:text-2xl lg:text-3xl font-medium text-slate-300 mt-2 font-sans">
                Next-Gen Police & Citizen Service Platform
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto">
              Empowering citizens with transparent electronic grievance registration, automatic unique ID generation, real-time stage tracking, verified station directories, and AI legal awareness.
            </p>

            {/* Primary Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => onNavigate('file-complaint')}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-red-600 via-red-700 to-blue-700 hover:from-red-500 hover:to-blue-600 text-white font-bold text-sm shadow-xl shadow-red-900/30 flex items-center justify-center gap-2 group transition-all"
              >
                <FileText className="w-4 h-4" />
                <span>File e-Complaint (Simulated)</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => onNavigate('track')}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700 hover:border-blue-500/50 font-semibold text-sm transition-all flex items-center justify-center gap-2"
              >
                <Search className="w-4 h-4 text-blue-400" />
                <span>Track Complaint Token</span>
              </button>

              <button
                onClick={() => onNavigate('ai-assistant')}
                className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-purple-950/40 hover:bg-purple-900/50 text-purple-300 border border-purple-500/40 font-semibold text-sm transition-all flex items-center justify-center gap-2"
              >
                <Bot className="w-4 h-4 text-purple-400" />
                <span>Rakshak AI</span>
              </button>
            </div>

            {/* Quick Testing helper */}
            <div className="pt-2 text-xs text-slate-400 flex items-center justify-center gap-2">
              <span>Try tracking live sample:</span>
              <button
                onClick={() => onSelectSampleToken('SPI-2026-CYB-88412')}
                className="font-mono text-amber-400 hover:underline bg-amber-950/40 px-2 py-0.5 rounded border border-amber-800/40"
              >
                SPI-2026-CYB-88412
              </button>
            </div>

          </div>

          {/* Statistics Bar */}
          <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-[#0A192F]/80 border border-blue-900/40 text-center shadow-lg">
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-['Rajdhani']">
                100% Digital
              </div>
              <p className="text-xs text-slate-400 mt-1">Paperless Triage Process</p>
            </div>

            <div className="p-5 rounded-2xl bg-[#0A192F]/80 border border-red-900/40 text-center shadow-lg">
              <div className="text-2xl sm:text-3xl font-extrabold text-red-400 font-['Rajdhani']">
                112 / 1930
              </div>
              <p className="text-xs text-slate-400 mt-1">Integrated Emergency Helplines</p>
            </div>

            <div className="p-5 rounded-2xl bg-[#0A192F]/80 border border-amber-900/40 text-center shadow-lg">
              <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-['Rajdhani']">
                5-Stage
              </div>
              <p className="text-xs text-slate-400 mt-1">Transparent Milestones</p>
            </div>

            <div className="p-5 rounded-2xl bg-[#0A192F]/80 border border-emerald-900/40 text-center shadow-lg">
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-['Rajdhani']">
                All-India
              </div>
              <p className="text-xs text-slate-400 mt-1">Multi-State Jurisdictions</p>
            </div>
          </div>
        </div>
      </section>

      {/* CORE SERVICES CARDS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold font-['Rajdhani'] text-white">
            Comprehensive Citizen & Police Services
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Access core police assistance portals designed for quick response and civic transparency.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Card 1: File Complaint */}
          <div 
            onClick={() => onNavigate('file-complaint')}
            className="p-6 rounded-2xl bg-[#0A192F] border border-blue-900/40 hover:border-red-500/60 transition-all hover:-translate-y-1 cursor-pointer group shadow-xl"
          >
            <div className="w-12 h-12 rounded-xl bg-red-600/20 text-red-400 flex items-center justify-center mb-4 group-hover:bg-red-600 group-hover:text-white transition-colors">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white font-['Rajdhani'] group-hover:text-red-400 transition-colors">
              File e-Complaint (Docket)
            </h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Register simulated complaints across Cyber Crime, Theft, Women Safety, Missing Person, and Economic Offense with automatic token generation.
            </p>
            <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-red-400 group-hover:translate-x-1 transition-transform">
              <span>Start Lodging</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>

          {/* Card 2: Track Status */}
          <div 
            onClick={() => onNavigate('track')}
            className="p-6 rounded-2xl bg-[#0A192F] border border-blue-900/40 hover:border-blue-500/60 transition-all hover:-translate-y-1 cursor-pointer group shadow-xl"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white font-['Rajdhani'] group-hover:text-blue-400 transition-colors">
              Track Grievance Timeline
            </h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Enter your tracking ID to see real-time updates: scrutiny status, investigating officer deployment, and official closure remarks.
            </p>
            <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-blue-400 group-hover:translate-x-1 transition-transform">
              <span>Track Now</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>

          {/* Card 3: Cyber Safety */}
          <div 
            onClick={() => onNavigate('cyber-safety')}
            className="p-6 rounded-2xl bg-[#0A192F] border border-blue-900/40 hover:border-amber-500/60 transition-all hover:-translate-y-1 cursor-pointer group shadow-xl"
          >
            <div className="w-12 h-12 rounded-xl bg-amber-600/20 text-amber-400 flex items-center justify-center mb-4 group-hover:bg-amber-600 group-hover:text-white transition-colors">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white font-['Rajdhani'] group-hover:text-amber-400 transition-colors">
              Cyber Fraud Safety Desk
            </h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Guard against UPI QR deception, fake electricity APK malware, Digital Arrest video call scams, and take the Cyber Readiness Quiz.
            </p>
            <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-amber-400 group-hover:translate-x-1 transition-transform">
              <span>View Safety Guides</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>

          {/* Card 4: Station Directory */}
          <div 
            onClick={() => onNavigate('stations')}
            className="p-6 rounded-2xl bg-[#0A192F] border border-blue-900/40 hover:border-emerald-500/60 transition-all hover:-translate-y-1 cursor-pointer group shadow-xl"
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center mb-4 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <Building2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white font-['Rajdhani'] group-hover:text-emerald-400 transition-colors">
              Police Station Directory
            </h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Locate jurisdictional police stations, cyber crime cells, and women safety desks across Indian states with contact numbers and officer in-charges.
            </p>
            <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-emerald-400 group-hover:translate-x-1 transition-transform">
              <span>Find Stations</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>

          {/* Card 5: AI Citizen Sahayak */}
          <div 
            onClick={() => onNavigate('ai-assistant')}
            className="p-6 rounded-2xl bg-[#0A192F] border border-blue-900/40 hover:border-purple-500/60 transition-all hover:-translate-y-1 cursor-pointer group shadow-xl"
          >
            <div className="w-12 h-12 rounded-xl bg-purple-600/20 text-purple-400 flex items-center justify-center mb-4 group-hover:bg-purple-600 group-hover:text-white transition-colors">
              <Bot className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white font-['Rajdhani'] group-hover:text-purple-400 transition-colors">
              Rakshak AI Legal Sahayak
            </h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Ask natural language legal questions regarding Zero FIR rights, BNS provisions, IT Act, and emergency helpline recommendations.
            </p>
            <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-purple-400 group-hover:translate-x-1 transition-transform">
              <span>Talk to AI</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>

          {/* Card 6: Officer & Admin Portal */}
          <div 
            onClick={() => onOpenAuth('admin')}
            className="p-6 rounded-2xl bg-[#0A192F] border border-blue-900/40 hover:border-amber-500/60 transition-all hover:-translate-y-1 cursor-pointer group shadow-xl"
          >
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-4 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white font-['Rajdhani'] group-hover:text-amber-400 transition-colors">
              Officer Admin Control
            </h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Dedicated portal for department officers to triage dockets, assign investigating officers, append audit remarks, and export reports.
            </p>
            <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-amber-400 group-hover:translate-x-1 transition-transform">
              <span>Access Portal</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>

        </div>
      </section>

      {/* HOW IT WORKS: 4-STEP VISUAL TIMELINE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="rounded-3xl bg-gradient-to-b from-[#0F2444]/60 via-[#0A192F] to-[#050D1A] border border-blue-900/60 p-8 sm:p-12 shadow-2xl">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase font-bold tracking-wider text-blue-400">
              Procedural Transparency
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-['Rajdhani'] text-white mt-1">
              How the SmartPolice Grievance Lifecycle Works
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            {[
              {
                step: '01',
                title: 'Citizen Submits e-Docket',
                desc: 'Fill incident facts, upload simulated evidence files, and designate local jurisdiction.'
              },
              {
                step: '02',
                title: 'Instant Unique Token',
                desc: 'Automated generation of reference code (e.g. SPI-2026-CYB-88412) with verifiable digital docket.'
              },
              {
                step: '03',
                title: 'Department Triage & IO',
                desc: 'Control room screens complaint and assigns an Investigating Officer with badge credentials.'
              },
              {
                step: '04',
                title: 'Live Citizen Milestones',
                desc: 'Every investigation note, bank freeze request, or closure summary is published on citizen timeline.'
              }
            ].map((item, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 text-center relative group hover:border-blue-500/50 transition-all">
                <span className="text-2xl font-extrabold font-mono text-red-500/80 mb-2 block font-['Rajdhani']">
                  {item.step}
                </span>
                <h4 className="text-sm font-bold text-white mb-2">{item.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CITIZEN LEGAL RIGHTS & BNS AWARENESS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-[#0A192F] border border-blue-900/50 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              Legal Education & Citizen Empowerment
            </span>
            <h3 className="text-xl font-bold font-['Rajdhani'] text-white">
              Know Your Rights: Zero FIR & Electronic Reporting
            </h3>
            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
              Under Indian jurisprudence and Section 173 of the Bharatiya Nagarik Suraksha Sanhita (BNSS), citizens can report cognizable offenses at any police station regardless of territory. Police cannot turn away victims without recording an initial report.
            </p>
          </div>

          <button
            onClick={() => onNavigate('ai-assistant')}
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-all shadow-md shrink-0 flex items-center gap-2"
          >
            <Bot className="w-4 h-4" />
            <span>Consult Rakshak AI on BNS</span>
          </button>
        </div>
      </section>

      {/* ACADEMIC DISCLAIMER CALLOUT */}
      <section className="max-w-5xl mx-auto px-4 pb-8">
        <div className="p-6 rounded-2xl bg-red-950/40 border border-red-500/40 text-center space-y-3">
          <div className="inline-flex items-center gap-2 text-red-400 font-bold text-xs uppercase tracking-wider">
            <AlertTriangle className="w-4 h-4 text-red-400" />
            <span>Academic Demonstration & Educational Scope</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed max-w-3xl mx-auto">
            This web application is built strictly as an independent academic engineering prototype for civic-tech demonstration. No actual police officers are dispatched, and records created are simulated educational samples. For actual crime reporting or emergencies, dial <strong>112</strong> or <strong>1930</strong>.
          </p>
        </div>
      </section>
    </div>
  );
};
