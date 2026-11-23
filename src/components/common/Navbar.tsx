import React, { useState } from 'react';
import { 
  Shield, 
  Menu, 
  X, 
  User, 
  LogOut, 
  FileText, 
  Search, 
  MapPin, 
  Lock, 
  Bot, 
  LayoutDashboard, 
  PhoneCall,
  ChevronDown,
  Sparkles
} from 'lucide-react';
import { UserProfile } from '../../types';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  currentUser: UserProfile | null;
  onOpenAuth: (role?: 'citizen' | 'admin') => void;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  currentUser,
  onOpenAuth,
  onLogout
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: Shield },
    { id: 'file-complaint', label: 'File Complaint', icon: FileText, highlight: true },
    { id: 'track', label: 'Track Status', icon: Search },
    { id: 'stations', label: 'Police Stations', icon: MapPin },
    { id: 'cyber-safety', label: 'Cyber Safety', icon: Lock },
    { id: 'ai-assistant', label: 'AI Sahayak', icon: Bot, badge: 'AI' },
  ];

  const handleNavClick = (id: string) => {
    setCurrentTab(id);
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="sticky top-0 z-50 bg-[#0A192F]/95 backdrop-blur-md border-b border-blue-900/40 shadow-xl shadow-black/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo / Branding */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="relative flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-blue-700 via-indigo-900 to-red-900 p-0.5 shadow-lg shadow-blue-900/40 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#071326] rounded-[10px] flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-red-600/20 to-blue-600/20 opacity-50"></div>
                <Shield className="w-7 h-7 text-blue-400 group-hover:text-red-400 transition-colors drop-shadow" />
                <span className="absolute bottom-1 w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
              </div>
            </div>
            
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight text-white font-['Rajdhani']">
                  SMART<span className="text-red-500">POLICE</span>
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-400/30">
                  INDIA
                </span>
              </div>
              <span className="text-[11px] text-slate-400 font-medium tracking-wide">
                स्मार्ट पुलिस और नागरिक सेवा मंच
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive 
                      ? 'bg-blue-600/20 text-white border border-blue-500/30 shadow-sm shadow-blue-500/10' 
                      : item.highlight
                      ? 'text-red-300 bg-red-950/40 hover:bg-red-900/40 border border-red-500/30'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-blue-400' : item.highlight ? 'text-red-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="text-[10px] font-bold px-1 rounded bg-gradient-to-r from-red-500 to-amber-500 text-white flex items-center gap-0.5">
                      <Sparkles className="w-2.5 h-2.5" />
                      {item.badge}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-gradient-to-r from-blue-500 via-sky-400 to-red-500 rounded-full"></span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Action buttons / User Controls */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Quick SOS Trigger */}
            <a
              href="tel:112"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-600/20 text-red-300 hover:bg-red-600 hover:text-white border border-red-500/40 text-xs font-bold transition-all shadow-sm shadow-red-900/20"
              title="Call Real National Emergency Helpline 112"
            >
              <PhoneCall className="w-3.5 h-3.5 animate-bounce" />
              <span>SOS 112</span>
            </a>

            {/* Authenticated user vs Login buttons */}
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-sm transition-all"
                >
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs ${
                    currentUser.role === 'admin' 
                      ? 'bg-amber-500 text-slate-950 font-mono' 
                      : 'bg-blue-600 text-white'
                  }`}>
                    {currentUser.role === 'admin' ? 'POL' : currentUser.fullName.charAt(0)}
                  </div>
                  <div className="text-left hidden md:block">
                    <div className="text-xs font-semibold text-white leading-tight truncate max-w-[120px]">
                      {currentUser.fullName}
                    </div>
                    <div className="text-[10px] text-slate-400 capitalize">
                      {currentUser.role === 'admin' ? 'Officer / Admin' : 'Citizen'}
                    </div>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-xl bg-[#0F2444] border border-blue-900/60 shadow-2xl py-2 z-50 text-sm">
                    <div className="px-4 py-2 border-b border-blue-900/40">
                      <p className="text-xs text-slate-400">Signed in as</p>
                      <p className="font-semibold text-white truncate">{currentUser.email}</p>
                      <span className={`inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        currentUser.role === 'admin' 
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' 
                          : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                      }`}>
                        {currentUser.role === 'admin' ? 'Verified Officer Portal' : 'Citizen Account'}
                      </span>
                    </div>

                    <button
                      onClick={() => {
                        handleNavClick(currentUser.role === 'admin' ? 'admin-dashboard' : 'citizen-dashboard');
                      }}
                      className="w-full text-left px-4 py-2.5 text-slate-200 hover:bg-blue-900/30 flex items-center gap-2"
                    >
                      <LayoutDashboard className="w-4 h-4 text-blue-400" />
                      <span>{currentUser.role === 'admin' ? 'Officer Dashboard' : 'Citizen Dashboard'}</span>
                    </button>

                    <button
                      onClick={() => {
                        handleNavClick('file-complaint');
                      }}
                      className="w-full text-left px-4 py-2.5 text-slate-200 hover:bg-blue-900/30 flex items-center gap-2"
                    >
                      <FileText className="w-4 h-4 text-red-400" />
                      <span>File New Grievance</span>
                    </button>

                    <div className="border-t border-blue-900/40 my-1"></div>

                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        onLogout();
                      }}
                      className="w-full text-left px-4 py-2 text-red-400 hover:bg-red-950/40 flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onOpenAuth('citizen')}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-all shadow-md shadow-blue-900/30"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Citizen Login</span>
                </button>
                <button
                  onClick={() => onOpenAuth('admin')}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-all"
                  title="Police Officer & Department Portal"
                >
                  <Shield className="w-3.5 h-3.5 text-amber-400" />
                  <span>Officer Portal</span>
                </button>
              </div>
            )}
          </div>

          {/* Mobile hamburger button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#071326] border-b border-blue-900/60 px-4 pt-3 pb-6 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-200 hover:bg-slate-800/80'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-blue-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-500 text-slate-950">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-4 border-t border-slate-800 space-y-2">
            {currentUser ? (
              <>
                <button
                  onClick={() => handleNavClick(currentUser.role === 'admin' ? 'admin-dashboard' : 'citizen-dashboard')}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-blue-900/30 text-white font-medium text-sm"
                >
                  <LayoutDashboard className="w-5 h-5 text-blue-400" />
                  <span>{currentUser.role === 'admin' ? 'Police Admin Dashboard' : 'Citizen Dashboard'}</span>
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onLogout();
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-red-950/30 text-red-300 font-medium text-sm"
                >
                  <LogOut className="w-5 h-5 text-red-400" />
                  <span>Log Out ({currentUser.fullName})</span>
                </button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-2 pt-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuth('citizen');
                  }}
                  className="w-full py-2.5 rounded-xl bg-blue-600 text-white font-semibold text-xs"
                >
                  Citizen Login
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuth('admin');
                  }}
                  className="w-full py-2.5 rounded-xl bg-slate-800 text-slate-200 border border-slate-700 font-semibold text-xs"
                >
                  Officer Portal
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
