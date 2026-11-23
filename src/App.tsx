import React, { useState, useEffect } from 'react';
import { UserProfile, Complaint } from './types';
import { authService } from './services/authService';

// Common Components
import { EducationalBanner } from './components/common/EducationalBanner';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { AuthModal } from './components/auth/AuthModal';

// Views
import { HomePage } from './components/home/HomePage';
import { ComplaintForm } from './components/complaint/ComplaintForm';
import { ComplaintTracker } from './components/complaint/ComplaintTracker';
import { StationDirectory } from './components/directory/StationDirectory';
import { CyberSafetyCenter } from './components/cyber/CyberSafetyCenter';
import { AiAssistant } from './components/ai/AiAssistant';
import { CitizenDashboard } from './components/citizen/CitizenDashboard';
import { AdminDashboard } from './components/admin/AdminDashboard';

export const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalRole, setAuthModalRole] = useState<'citizen' | 'admin'>('citizen');
  const [trackToken, setTrackToken] = useState<string>('');

  // Check initial active session
  useEffect(() => {
    const user = authService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const handleOpenAuth = (role: 'citizen' | 'admin' = 'citizen') => {
    setAuthModalRole(role);
    setAuthModalOpen(true);
  };

  const handleLogout = async () => {
    await authService.logout();
    setCurrentUser(null);
    if (currentTab === 'citizen-dashboard' || currentTab === 'admin-dashboard') {
      setCurrentTab('home');
    }
  };

  const handleAuthSuccess = (user: UserProfile) => {
    setCurrentUser(user);
    setAuthModalOpen(false);
    if (user.role === 'admin') {
      setCurrentTab('admin-dashboard');
    } else {
      setCurrentTab('citizen-dashboard');
    }
  };

  const handleNavigateToTrack = (id: string) => {
    setTrackToken(id);
    setCurrentTab('track');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleComplaintSuccess = (complaint: Complaint) => {
    // When a complaint is lodged, we can update trackToken
    setTrackToken(complaint.id);
  };

  return (
    <div className="min-h-screen bg-[#050D1A] text-slate-100 flex flex-col font-sans selection:bg-red-600 selection:text-white">
      {/* 1. Academic Disclaimer & Emergency Ticker */}
      <EducationalBanner />

      {/* 2. Main Navigation Bar */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        currentUser={currentUser}
        onOpenAuth={handleOpenAuth}
        onLogout={handleLogout}
      />

      {/* 3. Main Active Content View */}
      <main className="flex-1">
        {currentTab === 'home' && (
          <HomePage
            onNavigate={(tab) => {
              setCurrentTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenAuth={handleOpenAuth}
            onSelectSampleToken={handleNavigateToTrack}
          />
        )}

        {currentTab === 'file-complaint' && (
          <ComplaintForm
            currentUser={currentUser}
            onOpenAuth={() => handleOpenAuth('citizen')}
            onSuccess={handleComplaintSuccess}
            onTrack={handleNavigateToTrack}
          />
        )}

        {currentTab === 'track' && (
          <ComplaintTracker
            initialSearchId={trackToken}
            onNavigateToFile={() => setCurrentTab('file-complaint')}
          />
        )}

        {currentTab === 'stations' && (
          <StationDirectory
            onSelectStationForComplaint={(stationName) => {
              setCurrentTab('file-complaint');
            }}
          />
        )}

        {currentTab === 'cyber-safety' && (
          <CyberSafetyCenter />
        )}

        {currentTab === 'ai-assistant' && (
          <AiAssistant
            onFileComplaint={() => setCurrentTab('file-complaint')}
            onTrackComplaint={() => setCurrentTab('track')}
          />
        )}

        {currentTab === 'citizen-dashboard' && (
          currentUser ? (
            <CitizenDashboard
              currentUser={currentUser}
              onFileComplaint={() => setCurrentTab('file-complaint')}
              onTrackComplaint={handleNavigateToTrack}
            />
          ) : (
            <div className="max-w-md mx-auto my-20 p-8 rounded-2xl bg-[#0A192F] border border-blue-900/60 text-center space-y-4">
              <h2 className="text-xl font-bold font-['Rajdhani'] text-white">Citizen Authentication Required</h2>
              <p className="text-xs text-slate-400">Please sign in to access your personal complaint dockets and notification timeline.</p>
              <button
                onClick={() => handleOpenAuth('citizen')}
                className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-colors"
              >
                Sign In to Citizen Desk
              </button>
            </div>
          )
        )}

        {currentTab === 'admin-dashboard' && (
          currentUser && currentUser.role === 'admin' ? (
            <AdminDashboard
              currentUser={currentUser}
              onTrackComplaint={handleNavigateToTrack}
            />
          ) : (
            <div className="max-w-md mx-auto my-20 p-8 rounded-2xl bg-[#0A192F] border border-amber-500/50 text-center space-y-4">
              <h2 className="text-xl font-bold font-['Rajdhani'] text-white">Police Officer Authorization Required</h2>
              <p className="text-xs text-slate-400">Access to the grievance control room and status triage is restricted to verified police department personnel.</p>
              <button
                onClick={() => handleOpenAuth('admin')}
                className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold text-xs transition-colors"
              >
                Sign In with Officer Credentials
              </button>
            </div>
          )
        )}
      </main>

      {/* 4. Global Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        defaultRole={authModalRole}
        onSuccess={handleAuthSuccess}
      />

      {/* 5. Footer */}
      <Footer
        onNavigate={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </div>
  );
};

export default App;
