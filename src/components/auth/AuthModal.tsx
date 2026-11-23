import React, { useState } from 'react';
import { 
  X, 
  Shield, 
  User, 
  Mail, 
  Phone, 
  Lock, 
  AlertCircle, 
  KeyRound,
  CheckCircle,
  HelpCircle
} from 'lucide-react';
import { UserRole, UserProfile } from '../../types';
import { authService } from '../../services/authService';
import { STATES_LIST } from '../../data/mockData';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultRole?: UserRole;
  onSuccess: (user: UserProfile) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  defaultRole = 'citizen',
  onSuccess
}) => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [role, setRole] = useState<UserRole>(defaultRole);
  
  // Form fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [state, setState] = useState('Delhi');

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    try {
      if (mode === 'login') {
        const res = await authService.login(email, password, role);
        if (res.error || !res.user) {
          setErrorMessage(res.error || 'Failed to sign in. Please verify credentials.');
        } else {
          onSuccess(res.user);
          onClose();
        }
      } else {
        if (!fullName.trim() || !email.trim() || !phone.trim()) {
          setErrorMessage('Please fill in all required fields.');
          setLoading(false);
          return;
        }
        const res = await authService.register(fullName, email, phone, password, state);
        if (res.error || !res.user) {
          setErrorMessage(res.error || 'Registration failed.');
        } else {
          onSuccess(res.user);
          onClose();
        }
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemo = (demoType: 'citizen' | 'admin') => {
    if (demoType === 'citizen') {
      setEmail('citizen@example.com');
      setPassword('CitizenPass123!');
      setRole('citizen');
      setMode('login');
    } else {
      setEmail('admin@smartpolice.in');
      setPassword('PoliceAdmin2026!');
      setRole('admin');
      setMode('login');
    }
    setErrorMessage('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md rounded-2xl bg-[#0A192F] border border-blue-900/60 shadow-2xl p-6 sm:p-8 text-white overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Branding */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 via-indigo-900 to-red-800 p-0.5 mb-3 shadow-lg">
            <div className="w-full h-full bg-[#071326] rounded-[10px] flex items-center justify-center">
              <Shield className="w-6 h-6 text-blue-400" />
            </div>
          </div>
          <h2 className="text-xl font-bold tracking-tight text-white font-['Rajdhani']">
            {role === 'admin' ? 'POLICE OFFICER & ADMIN PORTAL' : 'CITIZEN ACCESS DESK'}
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            {mode === 'login' ? 'Sign in to file, manage & track grievances' : 'Register your digital citizen profile'}
          </p>
        </div>

        {/* Role Switcher Tabs */}
        <div className="grid grid-cols-2 gap-2 p-1 bg-slate-900/90 rounded-xl mb-5 border border-slate-800">
          <button
            type="button"
            onClick={() => { setRole('citizen'); setErrorMessage(''); }}
            className={`py-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-2 transition-all ${
              role === 'citizen'
                ? 'bg-blue-600 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Citizen Portal</span>
          </button>

          <button
            type="button"
            onClick={() => { setRole('admin'); setMode('login'); setErrorMessage(''); }}
            className={`py-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-2 transition-all ${
              role === 'admin'
                ? 'bg-amber-600 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Officer Portal</span>
          </button>
        </div>

        {/* Quick Demo Fill Pills for Testing */}
        <div className="mb-5 p-3 rounded-xl bg-blue-950/40 border border-blue-800/40 text-xs">
          <div className="flex items-center justify-between mb-2 text-slate-300">
            <span className="font-semibold flex items-center gap-1.5 text-blue-300">
              <KeyRound className="w-3.5 h-3.5" />
              Quick Test Credentials:
            </span>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => handleQuickDemo('citizen')}
              className="flex-1 py-1.5 px-2 rounded-lg bg-blue-900/50 hover:bg-blue-800 text-blue-200 border border-blue-700/50 text-[11px] font-medium transition-colors"
            >
              Demo Citizen
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemo('admin')}
              className="flex-1 py-1.5 px-2 rounded-lg bg-amber-950/50 hover:bg-amber-900 text-amber-200 border border-amber-700/50 text-[11px] font-medium transition-colors"
            >
              Demo Police Admin
            </button>
          </div>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="mb-4 p-3 rounded-lg bg-red-950/70 border border-red-500/50 text-red-200 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Main Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' && (
            <>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Full Name (as per ID) *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Aarav Sharma"
                    className="w-full pl-9 pr-3 py-2 bg-slate-900/80 border border-slate-700 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Mobile Number (Simulated) *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full pl-9 pr-3 py-2 bg-slate-900/80 border border-slate-700 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  State / UT
                </label>
                <select
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900/80 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-blue-500"
                >
                  {STATES_LIST.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </>
          )}

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Email Address *
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={role === 'admin' ? 'admin@smartpolice.in' : 'citizen@example.com'}
                className="w-full pl-9 pr-3 py-2 bg-slate-900/80 border border-slate-700 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2 bg-slate-900/80 border border-slate-700 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {role === 'admin' && (
            <p className="text-[11px] text-amber-400/90 bg-amber-950/30 p-2 rounded border border-amber-900/40">
              Department credentials: Use <strong>admin@smartpolice.in</strong> with password <strong>PoliceAdmin2026!</strong> or click the quick demo button.
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-all shadow-lg flex items-center justify-center gap-2 ${
              role === 'admin'
                ? 'bg-amber-600 hover:bg-amber-500 text-white shadow-amber-900/30'
                : 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-900/40'
            } ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                Processing...
              </span>
            ) : mode === 'login' ? (
              role === 'admin' ? 'Access Police Control Dashboard' : 'Sign In to Citizen Desk'
            ) : (
              'Create Citizen Profile'
            )}
          </button>
        </form>

        {/* Toggle Mode */}
        {role === 'citizen' && (
          <div className="mt-5 text-center text-xs text-slate-400">
            {mode === 'login' ? (
              <p>
                Don't have an account yet?{' '}
                <button
                  type="button"
                  onClick={() => { setMode('register'); setErrorMessage(''); }}
                  className="text-blue-400 font-semibold hover:underline"
                >
                  Register here
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => { setMode('login'); setErrorMessage(''); }}
                  className="text-blue-400 font-semibold hover:underline"
                >
                  Sign in
                </button>
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
