import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Send, 
  User, 
  Sparkles, 
  ShieldAlert, 
  PhoneCall, 
  FileText, 
  Search, 
  AlertTriangle,
  Copy,
  Check,
  RotateCcw
} from 'lucide-react';
import { ChatMessage } from '../../types';

interface AiAssistantProps {
  onFileComplaint?: () => void;
  onTrackComplaint?: () => void;
}

export const AiAssistant: React.FC<AiAssistantProps> = ({
  onFileComplaint,
  onTrackComplaint
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'bot',
      text: 'Namaste! I am Rakshak AI (रक्षक एआई) — your SmartPolice India Citizen Legal & Safety Assistant. I can guide you on legal awareness under the Bharatiya Nyaya Sanhita (BNS) & IT Act, emergency helplines, how to track grievances, and how to guard against cyber frauds.\n\nHow may I assist you today?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestions: [
        'How to report unauthorized UPI fraud?',
        'What is a "Zero FIR" and can police refuse it?',
        'I received a "Digital Arrest" video call',
        'How do I file a lost passport complaint?',
        'What are the key emergency helpline numbers?'
      ]
    }
  ]);

  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const generateBotReply = (userQuery: string): { text: string; suggestions?: string[] } => {
    const q = userQuery.toLowerCase();

    if (q.includes('upi') || q.includes('bank') || q.includes('fraud') || q.includes('money') || q.includes('scam')) {
      return {
        text: `🚨 **Immediate Action Protocol for Cyber Financial Fraud:**\n\n1. **Golden Hour Rule (Call 1930):** Dial National Cyber Crime Helpline **1930** immediately. Provide your transaction UTR / Reference ID, bank name, and victim mobile number so authorities can freeze funds before cash-out.\n2. **Bank Notification:** Call your bank's 24/7 emergency toll-free number to freeze net banking & debit cards.\n3. **Lodging Formal Complaint:** File a report on the official portal [cybercrime.gov.in](https://cybercrime.gov.in) or simulate lodging a docket right here via our "File Complaint" desk.\n\n⚠️ *Remember: Scanning a QR code or entering your UPI PIN is NEVER required to receive money.*`,
        suggestions: ['File a simulated cyber complaint', 'What are fake electricity bill scams?', 'How does 1930 freeze money?']
      };
    }

    if (q.includes('digital arrest') || q.includes('skype') || q.includes('cbi') || q.includes('video call') || q.includes('parcel')) {
      return {
        text: `🛑 **CRITICAL ALERT: "Digital Arrest" is 100% FRAUDULENT!**\n\n• There is **NO concept of "Digital Arrest"** under Indian law (BNSS / CrPC).\n• Neither Police officers, the CBI, ED, Narcotics Control Bureau (NCB), nor Supreme Court judges ever conduct trials, interrogations, or demand bail bond deposits over Skype or WhatsApp video calls.\n• **Action:** Disconnect the call immediately. Do NOT transfer any money to so-called "RBI verification accounts". Report the phone number to **1930** and state police cyber wing immediately.`,
        suggestions: ['Report to Cyber Cell', 'What if I already sent money?', 'What is AI Voice Cloning scam?']
      };
    }

    if (q.includes('zero fir') || q.includes('refuse') || q.includes('station') || q.includes('jurisdiction')) {
      return {
        text: `⚖️ **Citizen Legal Rights: Zero FIR**\n\n• **What is Zero FIR?** A Zero FIR allows any police station in India to register a cognizable crime report regardless of territorial jurisdiction where the incident occurred.\n• **Police Duty:** A police officer cannot refuse to lodge a First Information Report citing lack of local jurisdiction. Once registered under "0 FIR", it is transferred to the competent jurisdiction station.\n• Under Section 173 of the Bharatiya Nagarik Suraksha Sanhita (BNSS), electronic e-FIRs are also legally recognized for specified offenses.`,
        suggestions: ['Find jurisdictional police stations', 'File e-Complaint now', 'Women safety laws']
      };
    }

    if (q.includes('lost') || q.includes('passport') || q.includes('wallet') || q.includes('aadhaar') || q.includes('document')) {
      return {
        text: `📄 **Lost Article & Document Replacement Guide:**\n\n1. In India, lost passports, SIM cards, driving licenses, and wallets are usually classified as **Lost Article Reports (Non-Cognizable)**.\n2. Most state police portals provide an automated online Lost Report Certificate (LRC) without requiring a physical station visit.\n3. You can generate a simulated tracking report in our "File Complaint" tab under the **"Missing Person / Property"** category to keep an organized record for passport or Aadhaar re-issuance!`,
        suggestions: ['File Lost Property Report', 'Find nearest police station', 'Check my complaint status']
      };
    }

    if (q.includes('helpline') || q.includes('emergency') || q.includes('contact') || q.includes('number')) {
      return {
        text: `📞 **National All-India Emergency Helplines:**\n\n• **112** — All-in-one Emergency (Police, Fire, Ambulance, Disaster)\n• **1930** — National Cyber Financial Crime Reporting Desk\n• **1090 / 1091** — Women in Distress Helpline\n• **1098** — Childline India (Child Protection)\n• **14567** — Elderline (Senior Citizen National Helpline)\n• **1076** — Chief Minister / Citizen Grievance Portal\n• **1073** — National Highway Traffic Emergency Assistance`,
        suggestions: ['Nearest Police Stations', 'How to file complaint', 'Cyber fraud safety tips']
      };
    }

    if (q.includes('track') || q.includes('status') || q.includes('token') || q.includes('id')) {
      return {
        text: `🔍 **Tracking Your Grievance:**\n\nTo track any complaint:\n1. Click on the **"Track Status"** tab in the top navigation.\n2. Enter your unique token (e.g. \`SPI-2026-CYB-88412\`).\n3. You will see the 5-stage chronological audit timeline including Preliminary Screening, Investigating Officer (IO) deployment, and resolution remarks.`,
        suggestions: ['Go to Track Status', 'File a new grievance', 'Help with UPI fraud']
      };
    }

    // Default Fallback
    return {
      text: `Thank you for your inquiry regarding "${userQuery}".\n\nAs an educational legal assistant for SmartPolice India:\n• If this is an **emergency**, please immediately dial **112** or contact your local police station.\n• If this concerns an **online financial fraud**, dial **1930** right now.\n• You can use the top navigation to file a simulated complaint, track existing tokens, or search the verified all-India police station directory.`,
      suggestions: [
        'How to report unauthorized UPI fraud?',
        'Nearest Police Stations',
        'What is a Zero FIR?',
        'Emergency Helpline Numbers'
      ]
    };
  };

  const handleSendMessage = (textToSend?: string) => {
    const query = (textToSend || inputText).trim();
    if (!query) return;

    const userMsg: ChatMessage = {
      id: 'msg-' + Date.now(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      const replyData = generateBotReply(query);
      const botMsg: ChatMessage = {
        id: 'bot-' + Date.now(),
        sender: 'bot',
        text: replyData.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestions: replyData.suggestions
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 600);
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: 'msg-init',
        sender: 'bot',
        text: 'Chat history reset. How can Rakshak AI assist your civic safety inquiries today?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestions: [
          'How to report unauthorized UPI fraud?',
          'What is a "Zero FIR"?',
          'What are key emergency helpline numbers?'
        ]
      }
    ]);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-fadeIn">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-600/20 text-purple-300 border border-purple-500/30 text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Intelligent Civic Assistant</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold font-['Rajdhani'] text-white">
          Rakshak AI — Citizen Legal Sahayak
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Ask questions about Indian police procedures, cyber safety steps, citizen rights under BNS, and emergency reporting.
        </p>
      </div>

      {/* Main Chat Container */}
      <div className="rounded-2xl bg-[#0A192F] border border-blue-900/60 shadow-2xl flex flex-col h-[650px] overflow-hidden">
        
        {/* Chat Top Bar */}
        <div className="px-6 py-3.5 bg-slate-900/90 border-b border-blue-900/40 flex items-center justify-between text-xs">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white shadow-md">
                <Bot className="w-5 h-5" />
              </div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-slate-900"></span>
            </div>
            <div>
              <h3 className="font-bold text-white text-sm">Rakshak AI (रक्षक)</h3>
              <p className="text-[10px] text-emerald-400">Online • Civic Assistant</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleResetChat}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
              title="Reset conversation"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Chat Message Feed */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'bot' && (
                <div className="w-8 h-8 rounded-lg bg-purple-600/30 text-purple-300 border border-purple-500/30 flex items-center justify-center shrink-0 mt-1">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-slate-900/90 border border-slate-800 text-slate-200'
              }`}>
                {/* Render Markdown-like bold / lists */}
                <div className="whitespace-pre-line space-y-1">
                  {msg.text.split('\n\n').map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>

                <div className="mt-2 pt-1 flex items-center justify-between text-[10px] text-slate-400 border-t border-slate-800/40">
                  <span>{msg.timestamp}</span>
                  {msg.sender === 'bot' && (
                    <button
                      onClick={() => handleCopy(msg.id, msg.text)}
                      className="hover:text-white flex items-center gap-1"
                    >
                      {copiedId === msg.id ? (
                        <Check className="w-3 h-3 text-emerald-400" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                      <span>{copiedId === msg.id ? 'Copied' : 'Copy'}</span>
                    </button>
                  )}
                </div>

                {/* Suggestions Chips inside message */}
                {msg.suggestions && msg.suggestions.length > 0 && (
                  <div className="mt-3 pt-2 border-t border-slate-800/60 flex flex-wrap gap-1.5">
                    {msg.suggestions.map((sug, sIdx) => (
                      <button
                        key={sIdx}
                        onClick={() => handleSendMessage(sug)}
                        className="text-[11px] px-2.5 py-1 rounded-full bg-blue-950/80 hover:bg-blue-900 text-blue-300 border border-blue-800/80 transition-colors text-left"
                      >
                        {sug}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {msg.sender === 'user' && (
                <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0 mt-1">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3 items-center text-slate-400 text-xs">
              <div className="w-8 h-8 rounded-lg bg-purple-600/30 text-purple-300 border border-purple-500/30 flex items-center justify-center">
                <Bot className="w-4 h-4" />
              </div>
              <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-bounce"></span>
                <span className="w-2 h-2 rounded-full bg-purple-400 animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-2 h-2 rounded-full bg-pink-400 animate-bounce [animation-delay:0.4s]"></span>
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-slate-900/90 border-t border-blue-900/40">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask a legal or safety question (e.g. How to freeze money after UPI fraud?)..."
              className="flex-1 px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className={`px-5 py-2.5 rounded-xl bg-purple-600 text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-md ${
                !inputText.trim() ? 'opacity-50 cursor-not-allowed' : 'hover:bg-purple-500 shadow-purple-900/30'
              }`}
            >
              <span>Send</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>

          <p className="mt-2 text-[10px] text-slate-500 text-center">
            Educational AI Assistant. Does not replace professional legal counsel or official police recording.
          </p>
        </div>

      </div>
    </div>
  );
};
