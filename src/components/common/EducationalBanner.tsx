import React from 'react';
import { AlertTriangle, PhoneCall, ShieldAlert } from 'lucide-react';

export const EducationalBanner: React.FC = () => {
  return (
    <div className="w-full bg-slate-900 border-b border-amber-500/30 text-xs">
      {/* Simulation Notice Bar */}
      <div className="bg-gradient-to-r from-red-950/90 via-slate-900 to-amber-950/80 px-4 py-1.5 flex items-center justify-between text-amber-200 border-b border-red-500/20">
        <div className="flex items-center gap-2 mx-auto sm:mx-0">
          <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0 animate-pulse" />
          <span className="font-semibold text-white">ACADEMIC SIMULATION:</span>
          <span className="hidden sm:inline">This is an independent educational student prototype. Not an official government or police website. Submissions do NOT file real FIRs.</span>
          <span className="sm:hidden">Educational demo - not a real police portal.</span>
        </div>
        <div className="hidden lg:flex items-center gap-2 text-slate-300 font-mono text-[11px]">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
          <span>Simulated Portal v2.6.4</span>
        </div>
      </div>

      {/* Emergency Helpline Ticker */}
      <div className="bg-[#071326] px-4 py-1 text-slate-300 flex items-center overflow-hidden border-b border-blue-900/40">
        <div className="flex items-center gap-1.5 text-red-400 font-bold uppercase text-[11px] tracking-wider shrink-0 mr-4 pr-3 border-r border-slate-700">
          <PhoneCall className="w-3.5 h-3.5 animate-bounce" />
          <span>Real Emergency Helplines:</span>
        </div>

        <div className="overflow-hidden relative w-full">
          <div className="animate-ticker flex items-center gap-8 text-[12px]">
            <span className="inline-flex items-center gap-1.5">
              <span className="font-bold text-white bg-red-600/30 px-1.5 py-0.5 rounded text-red-300 border border-red-500/30">112</span>
              <span>National Emergency Response (All India)</span>
            </span>
            <span className="text-slate-600">•</span>
            <span className="inline-flex items-center gap-1.5">
              <span className="font-bold text-white bg-amber-600/30 px-1.5 py-0.5 rounded text-amber-300 border border-amber-500/30">1930</span>
              <span>National Cyber Financial Crime Reporting</span>
            </span>
            <span className="text-slate-600">•</span>
            <span className="inline-flex items-center gap-1.5">
              <span className="font-bold text-white bg-pink-600/30 px-1.5 py-0.5 rounded text-pink-300 border border-pink-500/30">1090 / 1091</span>
              <span>Women in Distress Helpline</span>
            </span>
            <span className="text-slate-600">•</span>
            <span className="inline-flex items-center gap-1.5">
              <span className="font-bold text-white bg-blue-600/30 px-1.5 py-0.5 rounded text-blue-300 border border-blue-500/30">1098</span>
              <span>Childline India</span>
            </span>
            <span className="text-slate-600">•</span>
            <span className="inline-flex items-center gap-1.5">
              <span className="font-bold text-white bg-emerald-600/30 px-1.5 py-0.5 rounded text-emerald-300 border border-emerald-500/30">1076</span>
              <span>Citizen Grievance Support</span>
            </span>
            <span className="text-slate-600">•</span>
            <span className="inline-flex items-center gap-1.5 text-amber-200">
              <ShieldAlert className="w-3 h-3" />
              <span>For real cyber incidents, visit official cybercrime.gov.in</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
