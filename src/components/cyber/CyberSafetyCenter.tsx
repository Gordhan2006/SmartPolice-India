import React, { useState } from 'react';
import { 
  Lock, 
  ShieldAlert, 
  CreditCard, 
  Smartphone, 
  Briefcase, 
  UserX, 
  AlertTriangle, 
  CheckCircle2, 
  PhoneCall, 
  HelpCircle, 
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Award
} from 'lucide-react';
import { CYBER_ARTICLES } from '../../data/mockData';
import { CyberArticle } from '../../types';

export const CyberSafetyCenter: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<CyberArticle | null>(null);
  const [activeTab, setActiveTab] = useState<'guides' | 'quiz' | 'golden-hour'>('guides');

  // Interactive Cyber Safety Quiz State
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const quizQuestions = [
    {
      id: 1,
      scenario: 'You are selling an item on OLX. A buyer says "I have sent you a payment QR code. Just scan it and enter your UPI PIN to receive the money."',
      options: [
        'Scan the QR and enter my PIN right away so I receive payment.',
        'Never scan it: UPI PIN is ONLY entered to deduct money, NEVER to receive money.',
        'Ask the buyer to send 50% first, then scan.',
      ],
      correct: 1,
      explanation: 'Golden Rule: Entering a UPI PIN ALWAYS transfers money out of your bank account. You never need to enter a PIN to receive funds.'
    },
    {
      id: 2,
      scenario: 'You receive an urgent SMS: "Your electricity connection will be suspended tonight at 9:30 PM due to unpaid bill. Call officer at 98xxxxxx or download APK to update."',
      options: [
        'Download the APK immediately from the WhatsApp link.',
        'Call the number in the SMS and share my bank OTP to verify billing.',
        'Ignore the SMS and check my actual electricity bill status only on the official state DISCOM portal / app.',
      ],
      correct: 2,
      explanation: 'Electricity boards never send disconnection notices via random personal mobile numbers or ask users to install APKs.'
    },
    {
      id: 3,
      scenario: 'A person on a Skype video call wearing a police uniform claims your Aadhaar card is implicated in money laundering and places you under "Digital Arrest". What should you do?',
      options: [
        'Transfer all my savings to the "RBI security verification account" they specify.',
        'Stay on the call for 24 hours without telling family.',
        'Disconnect immediately: Indian law does not have "Digital Arrest" and police never conduct bail or interrogations over video call. Dial 1930 & 112.',
      ],
      correct: 2,
      explanation: '"Digital Arrest" is an illegal cyber fraud scam. Law enforcement agencies never arrest or demand fund transfers over video calls.'
    },
    {
      id: 4,
      scenario: 'You discover an unauthorized debit of ₹50,000 from your bank account right now. What is the most critical first step?',
      options: [
        'Call the National Cyber Financial Fraud Helpline 1930 immediately within the Golden Hour (1-2 hours) to freeze the funds.',
        'Wait 48 hours for the bank to automatically refund.',
        'Post on social media asking for hackers to recover it.',
      ],
      correct: 0,
      explanation: 'Calling 1930 immediately triggers automated bank API interdiction, freezing stolen funds before scammers withdraw from ATMs.'
    },
    {
      id: 5,
      scenario: 'Which method provides the strongest security against account takeover on WhatsApp and Gmail?',
      options: [
        'Using "Password123" and keeping the same password on all sites.',
        'Enabling Two-Factor Authentication (2FA) using an Authenticator app (like Google Authenticator) and setting a WhatsApp 6-digit PIN.',
        'Giving my phone to friends to manage my security.',
      ],
      correct: 1,
      explanation: 'Hardware or app-based 2FA blocks attackers even if they manage to compromise your primary password or SIM card.'
    }
  ];

  const handleSelectQuizOption = (questionIndex: number, optionIndex: number) => {
    setQuizAnswers({
      ...quizAnswers,
      [questionIndex]: optionIndex
    });
  };

  const calculateScore = () => {
    let score = 0;
    quizQuestions.forEach((q, i) => {
      if (quizAnswers[i] === q.correct) {
        score += 1;
      }
    });
    return score;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
      {/* Title Header */}
      <div className="text-center max-w-3xl mx-auto mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-600/20 text-amber-300 border border-amber-500/30 text-xs font-semibold mb-3">
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>Cyber Crime Prevention & Citizen Safety Desk</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold font-['Rajdhani'] text-white">
          National Cyber Safety Center
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-2">
          Protect yourself and your family against online banking fraud, UPI deception, fake APK malware, digital arrest scams, and social media hijacking.
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex p-1 bg-slate-900 border border-slate-800 rounded-xl text-xs sm:text-sm">
          <button
            onClick={() => setActiveTab('guides')}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              activeTab === 'guides' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Fraud Awareness Guides
          </button>
          <button
            onClick={() => setActiveTab('golden-hour')}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              activeTab === 'golden-hour' ? 'bg-red-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Emergency 1930 Golden Hour
          </button>
          <button
            onClick={() => setActiveTab('quiz')}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              activeTab === 'quiz' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Cyber Readiness Quiz
          </button>
        </div>
      </div>

      {/* TAB 1: GUIDES */}
      {activeTab === 'guides' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CYBER_ARTICLES.map((article) => (
              <div
                key={article.id}
                className="rounded-2xl bg-[#0A192F] border border-blue-900/40 hover:border-blue-600/60 p-6 flex flex-col justify-between shadow-xl transition-all hover:-translate-y-1"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 uppercase">
                      {article.category}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      article.severity === 'Critical'
                        ? 'bg-red-500/20 text-red-300 border border-red-500/40'
                        : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    }`}>
                      {article.severity} Threat
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white font-['Rajdhani'] leading-snug">
                    {article.title}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {article.summary}
                  </p>

                  {/* Red flags snippet */}
                  <div className="pt-2 border-t border-slate-800 text-xs">
                    <span className="font-semibold text-red-400 block mb-1 text-[11px] uppercase tracking-wide">
                      Key Warning Signs:
                    </span>
                    <ul className="space-y-1 text-slate-400 text-[11px]">
                      {article.redFlags.slice(0, 2).map((rf, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-red-400">•</span>
                          <span>{rf}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedArticle(article)}
                  className="mt-5 w-full py-2 rounded-xl bg-blue-900/30 hover:bg-blue-600 text-blue-300 hover:text-white text-xs font-semibold border border-blue-800/60 transition-all flex items-center justify-center gap-1.5"
                >
                  <span>Read Full Safety Protocol</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: GOLDEN HOUR EMERGENCY GUIDE */}
      {activeTab === 'golden-hour' && (
        <div className="max-w-4xl mx-auto rounded-2xl bg-gradient-to-br from-red-950/60 via-[#0A192F] to-slate-900 border border-red-500/40 p-6 sm:p-10 shadow-2xl animate-fadeIn space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-red-600/20 text-red-400 border border-red-500/40">
              <PhoneCall className="w-8 h-8 animate-bounce" />
            </div>
            <div>
              <span className="text-xs uppercase font-bold text-red-400 tracking-wider">Immediate Incident Response</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-['Rajdhani'] text-white">
                The Cyber Financial "Golden Hour" Protocol
              </h2>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            If you have lost money in a UPI scam, net banking hack, credit card theft, or OTP fraud, the first <strong>1 to 2 hours</strong> are critical. Rapid intervention can freeze the money before the fraudster transfers it through mule accounts or withdraws it at an ATM.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="p-5 rounded-xl bg-slate-900/80 border border-red-900/50 space-y-2">
              <span className="w-6 h-6 rounded-full bg-red-600 text-white font-bold text-xs flex items-center justify-center">1</span>
              <h4 className="text-sm font-bold text-white">Call 1930 Immediately</h4>
              <p className="text-xs text-slate-400">
                Dial National Cyber Financial Fraud Helpline <strong>1930</strong>. Keep your bank account number, debit card last 4 digits, transaction reference UTR, and mobile number ready.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-900/80 border border-amber-900/50 space-y-2">
              <span className="w-6 h-6 rounded-full bg-amber-600 text-white font-bold text-xs flex items-center justify-center">2</span>
              <h4 className="text-sm font-bold text-white">Inform Your Bank</h4>
              <p className="text-xs text-slate-400">
                Call your bank's 24/7 fraud helpline to block net banking, UPI, and debit cards. Request an immediate stop-payment or lien marking on the beneficiary account.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-900/80 border border-blue-900/50 space-y-2">
              <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center">3</span>
              <h4 className="text-sm font-bold text-white">File Formal Complaint</h4>
              <p className="text-xs text-slate-400">
                Visit the official Government of India portal <a href="https://cybercrime.gov.in" target="_blank" rel="noreferrer" className="text-blue-400 underline">cybercrime.gov.in</a> and lodge an acknowledgment within 24 hours.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span>For all non-financial cyber harassment or child safety issues, report on:</span>
            <a
              href="https://cybercrime.gov.in"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-500 transition-colors flex items-center gap-1.5 shrink-0"
            >
              <span>Visit cybercrime.gov.in</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}

      {/* TAB 3: READINESS QUIZ */}
      {activeTab === 'quiz' && (
        <div className="max-w-3xl mx-auto rounded-2xl bg-[#0A192F] border border-blue-900/60 p-6 sm:p-8 shadow-2xl animate-fadeIn space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-emerald-600/20 text-emerald-400 border border-emerald-500/40">
              <HelpCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold font-['Rajdhani'] text-white">
                Citizen Cyber Security Readiness Test
              </h3>
              <p className="text-xs text-slate-400">
                Evaluate how well you can detect real-world Indian cyber crime traps.
              </p>
            </div>
          </div>

          {!quizSubmitted ? (
            <div className="space-y-6">
              {quizQuestions.map((q, qIndex) => (
                <div key={q.id} className="p-4 sm:p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
                  <h4 className="text-xs sm:text-sm font-semibold text-white">
                    Question {qIndex + 1}: {q.scenario}
                  </h4>
                  <div className="space-y-2">
                    {q.options.map((opt, optIndex) => (
                      <label
                        key={optIndex}
                        onClick={() => handleSelectQuizOption(qIndex, optIndex)}
                        className={`flex items-start gap-3 p-3 rounded-lg border text-xs cursor-pointer transition-all ${
                          quizAnswers[qIndex] === optIndex
                            ? 'bg-blue-900/40 border-blue-500 text-white'
                            : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:bg-slate-800/60'
                        }`}
                      >
                        <input
                          type="radio"
                          name={`question-${qIndex}`}
                          checked={quizAnswers[qIndex] === optIndex}
                          onChange={() => {}}
                          className="mt-0.5 text-blue-600"
                        />
                        <span>{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}

              <button
                onClick={() => setQuizSubmitted(true)}
                disabled={Object.keys(quizAnswers).length < quizQuestions.length}
                className={`w-full py-3 rounded-xl bg-emerald-600 text-white font-semibold text-sm transition-all shadow-lg ${
                  Object.keys(quizAnswers).length < quizQuestions.length
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:bg-emerald-500 shadow-emerald-900/30'
                }`}
              >
                Submit Answers & View Score ({Object.keys(quizAnswers).length}/{quizQuestions.length} Answered)
              </button>
            </div>
          ) : (
            <div className="text-center py-6 space-y-6 animate-fadeIn">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                <Award className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs text-slate-400 uppercase font-mono">Your Score</span>
                <h4 className="text-3xl font-extrabold text-white font-['Rajdhani']">
                  {calculateScore()} / {quizQuestions.length}
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 mt-1">
                  {calculateScore() >= 4
                    ? 'Excellent! You possess strong cyber safety vigilance.'
                    : 'Room for improvement! Review the explanations below to guard against digital frauds.'}
                </p>
              </div>

              <div className="text-left space-y-4">
                {quizQuestions.map((q, i) => {
                  const isCorrect = quizAnswers[i] === q.correct;
                  return (
                    <div key={q.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-2">
                      <div className="flex items-center gap-2">
                        {isCorrect ? (
                          <span className="text-emerald-400 font-bold flex items-center gap-1">
                            <CheckCircle2 className="w-4 h-4" /> Correct
                          </span>
                        ) : (
                          <span className="text-red-400 font-bold flex items-center gap-1">
                            <AlertTriangle className="w-4 h-4" /> Incorrect
                          </span>
                        )}
                        <span className="text-slate-400 font-semibold">Q{i + 1}</span>
                      </div>
                      <p className="text-white font-medium">{q.scenario}</p>
                      <p className="text-emerald-300 bg-emerald-950/40 p-2 rounded border border-emerald-900/50">
                        {q.explanation}
                      </p>
                    </div>
                  );
                })}
              </div>

              <button
                onClick={() => {
                  setQuizAnswers({});
                  setQuizSubmitted(false);
                }}
                className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-colors"
              >
                Retake Quiz
              </button>
            </div>
          )}
        </div>
      )}

      {/* ARTICLE DETAIL MODAL */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="max-w-2xl w-full rounded-2xl bg-[#0A192F] border border-blue-900/60 p-6 sm:p-8 text-white shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">
                  {selectedArticle.category} • {selectedArticle.severity} Severity
                </span>
                <h3 className="text-lg sm:text-xl font-bold font-['Rajdhani'] mt-1">
                  {selectedArticle.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedArticle(null)}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="py-4 space-y-4 text-xs sm:text-sm text-slate-300">
              <p className="leading-relaxed">{selectedArticle.description}</p>

              <div>
                <h4 className="font-bold text-red-400 uppercase text-xs tracking-wider mb-2">
                  Red Flags to Watch For:
                </h4>
                <ul className="space-y-1.5 pl-4 list-disc text-slate-400">
                  {selectedArticle.redFlags.map((rf, i) => (
                    <li key={i}>{rf}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-emerald-400 uppercase text-xs tracking-wider mb-2">
                  Step-by-Step Prevention Protocol:
                </h4>
                <ul className="space-y-1.5 pl-4 list-decimal text-slate-300">
                  {selectedArticle.preventionSteps.map((step, i) => (
                    <li key={i}>{step}</li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-red-950/40 border border-red-500/40 text-red-200">
                <span className="font-bold block text-xs uppercase mb-1">What to do if duped:</span>
                <p className="text-xs leading-relaxed">{selectedArticle.emergencyAction}</p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setSelectedArticle(null)}
                className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold"
              >
                Close Safety Guide
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
