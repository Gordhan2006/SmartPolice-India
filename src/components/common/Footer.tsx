import React from 'react';
import { 
  Shield, 
  Phone, 
  ExternalLink, 
  Heart, 
  AlertOctagon, 
  HelpCircle,
  FileCheck,
  Building2,
  Lock
} from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#050D1A] border-t border-blue-900/40 text-slate-400 text-sm mt-20 relative">
      {/* Disclaimer Banner */}
      <div className="bg-red-950/40 border-b border-red-500/20 py-4 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-red-200">
          <div className="flex items-center gap-3">
            <AlertOctagon className="w-5 h-5 text-red-400 shrink-0" />
            <p>
              <strong className="text-white">Academic Project Notice:</strong> SmartPolice India is an independent student educational demonstration. It is not affiliated with the Ministry of Home Affairs, State Police Departments, or National Crime Records Bureau. Submissions are simulated.
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-slate-400">Emergency? Call</span>
            <a href="tel:112" className="font-bold text-white bg-red-600 px-2 py-0.5 rounded hover:bg-red-500">
              112
            </a>
            <a href="tel:1930" className="font-bold text-white bg-amber-600 px-2 py-0.5 rounded hover:bg-amber-500">
              1930
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand & Purpose */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-700 to-red-900 flex items-center justify-center p-0.5 shadow-md">
                <div className="w-full h-full bg-[#071326] rounded-[10px] flex items-center justify-center">
                  <Shield className="w-5 h-5 text-blue-400" />
                </div>
              </div>
              <div>
                <span className="font-extrabold text-lg tracking-tight text-white font-['Rajdhani']">
                  SMART<span className="text-red-500">POLICE</span> INDIA
                </span>
                <p className="text-[11px] text-slate-400">Digital Civic-Tech Simulation Portal</p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed pr-4">
              Designed as a modern model for citizen-police partnership in India, providing automated unique complaint token tracking, cyber safety advisories, verified station directories, and AI-assisted civic legal awareness.
            </p>

            <div className="pt-2 flex items-center gap-3 text-xs text-slate-300">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded bg-slate-800/80 border border-slate-700">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Supabase Ready</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded bg-slate-800/80 border border-slate-700">
                <Lock className="w-3.5 h-3.5 text-blue-400" />
                <span>Zero Sensitive Data Retention</span>
              </div>
            </div>
          </div>

          {/* Quick Platform Services */}
          <div>
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase mb-4 text-blue-300">
              Services
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => onNavigate('file-complaint')} className="hover:text-white transition-colors flex items-center gap-1.5">
                  <FileCheck className="w-3.5 h-3.5 text-red-400" />
                  <span>File e-Complaint (Simulated)</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('track')} className="hover:text-white transition-colors flex items-center gap-1.5">
                  <HelpCircle className="w-3.5 h-3.5 text-blue-400" />
                  <span>Track Complaint Token</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('stations')} className="hover:text-white transition-colors flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Police Station Directory</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('cyber-safety')} className="hover:text-white transition-colors flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-amber-400" />
                  <span>Cyber Fraud Alerts & Quiz</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('ai-assistant')} className="hover:text-white transition-colors flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-purple-400" />
                  <span>Rakshak AI Legal Sahayak</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Real Government Portals */}
          <div>
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase mb-4 text-amber-300">
              Official Indian Portals
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a 
                  href="https://cybercrime.gov.in" 
                  target="_blank" 
                  rel="noreferrer"
                  className="hover:text-white transition-colors flex items-center justify-between"
                >
                  <span>National Cyber Crime Portal</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a 
                  href="https://112.gov.in" 
                  target="_blank" 
                  rel="noreferrer"
                  className="hover:text-white transition-colors flex items-center justify-between"
                >
                  <span>ERSS 112 India</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a 
                  href="https://ncrb.gov.in" 
                  target="_blank" 
                  rel="noreferrer"
                  className="hover:text-white transition-colors flex items-center justify-between"
                >
                  <span>National Crime Records Bureau</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a 
                  href="https://cops.mha.gov.in" 
                  target="_blank" 
                  rel="noreferrer"
                  className="hover:text-white transition-colors flex items-center justify-between"
                >
                  <span>CCTNS Citizen Portal</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
            </ul>
          </div>

          {/* Emergency Helpline Numbers */}
          <div>
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase mb-4 text-red-400">
              National Numbers
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2 rounded bg-slate-900/80 border border-slate-800">
                <span>Emergency (Police/Fire/Ambulance)</span>
                <span className="font-bold text-red-400 font-mono text-sm">112</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-slate-900/80 border border-slate-800">
                <span>Cyber Financial Fraud</span>
                <span className="font-bold text-amber-400 font-mono text-sm">1930</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-slate-900/80 border border-slate-800">
                <span>Women Helpline</span>
                <span className="font-bold text-pink-400 font-mono text-sm">1090</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-slate-900/80 border border-slate-800">
                <span>Senior Citizen Helpline</span>
                <span className="font-bold text-blue-400 font-mono text-sm">14567</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright & educational disclaimer */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 SmartPolice India. Built for educational demonstration & public civic awareness.</p>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
            <span>for Digital Safety in India</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
