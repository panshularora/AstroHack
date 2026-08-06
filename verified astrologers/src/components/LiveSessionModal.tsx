import React, { useState, useEffect, useRef } from 'react';
import { Practitioner, SessionMode, UserBirthDetails, ChatMessage } from '../types';
import { X, Mic, MicOff, Video, VideoOff, PhoneOff, Send, Compass, User, Calendar, MapPin, Sparkles, AlertCircle, FileText, CheckCircle2 } from 'lucide-react';

interface LiveSessionModalProps {
  practitioner: Practitioner;
  mode: SessionMode;
  userBirthDetails: UserBirthDetails;
  onUpdateBirthDetails: (details: UserBirthDetails) => void;
  onClose: () => void;
}

export const LiveSessionModal: React.FC<LiveSessionModalProps> = ({
  practitioner,
  mode,
  userBirthDetails,
  onUpdateBirthDetails,
  onClose,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [sessionSeconds, setSessionSeconds] = useState(0);
  const [showBirthDetailsForm, setShowBirthDetailsForm] = useState(false);
  const [birthForm, setBirthForm] = useState<UserBirthDetails>(userBirthDetails);
  const [activeTab, setActiveTab] = useState<'session' | 'birthchart'>('session');
  
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Session timer
  useEffect(() => {
    const timer = setInterval(() => {
      setSessionSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Initial welcome message from practitioner
  useEffect(() => {
    const initialGreeting = `Welcome to your live ${mode.toUpperCase()} session with ${practitioner.name} (${practitioner.tag} - ${practitioner.specialty}). I have calibrated my chart for your arrival. What cosmic inquiry or planetary direction brings you here today?`;
    
    setMessages([
      {
        id: '1',
        sender: 'practitioner',
        text: initialGreeting,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  }, [practitioner, mode]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const formatTimer = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputText;
    if (!query.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/consultation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          practitionerName: practitioner.name,
          specialty: practitioner.specialty,
          tag: practitioner.tag,
          userBirthDetails,
          userMessage: query,
          mode,
        }),
      });

      const data = await response.json();
      const replyText = data.reply || "The current transits indicate an favorable period of clarity and realignment.";

      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'practitioner',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error('Session API call failed:', err);
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'practitioner',
        text: `[${practitioner.name}]: I sense the energetic alignment connecting. Your natal chart shows key activation in your primary houses. Focus on disciplined intention.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveBirthDetails = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateBirthDetails(birthForm);
    setShowBirthDetailsForm(false);
    
    // Add system notification in chat
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        sender: 'system',
        text: `Birth chart details updated: ${birthForm.name || 'Seeker'} (${birthForm.dob}, ${birthForm.timeOfBirth}, ${birthForm.location}). Chart recalculated.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl h-[92vh] max-h-[850px] bg-[#121316] border border-neutral-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-neutral-100">
        
        {/* Top Header Bar */}
        <div className="px-4 py-3 bg-[#181a1e] border-b border-neutral-800 flex items-center justify-between gap-3">
          {/* Practitioner Badge */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="relative w-10 h-10 rounded-full overflow-hidden border border-amber-500/40 shrink-0">
              <img
                src={practitioner.imageUrl}
                alt={practitioner.name}
                className="w-full h-full object-cover grayscale contrast-125"
              />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="font-serif text-sm sm:text-base font-medium text-neutral-100 truncate">
                  {practitioner.name}
                </h2>
                <span className="font-mono text-[10px] text-amber-300 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/30 uppercase">
                  {practitioner.tag}
                </span>
              </div>
              <p className="text-xs text-neutral-400 font-light truncate">
                {practitioner.specialty} • {mode.toUpperCase()} SESSION
              </p>
            </div>
          </div>

          {/* Session Timer & Controls */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="flex items-center gap-2 px-3 py-1 bg-black/60 rounded-full border border-neutral-800 text-xs font-mono text-amber-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>{formatTimer(sessionSeconds)}</span>
              <span className="text-neutral-500 text-[10px]">(${practitioner.ratePerMin}/m)</span>
            </div>

            <button
              onClick={() => setShowBirthDetailsForm(!showBirthDetailsForm)}
              className="px-2.5 py-1 bg-neutral-800 hover:bg-neutral-700 rounded-lg text-xs font-mono text-neutral-300 border border-neutral-700 flex items-center gap-1 transition-colors"
              title="Edit Birth Chart Info"
            >
              <FileText className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Birth Info</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 hover:bg-red-950/50 hover:text-red-300 text-neutral-400 rounded-lg transition-colors border border-transparent hover:border-red-800/40"
              title="End Session"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Session Canvas */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative">
          
          {/* Birth Details Drawer Overlay if Toggled */}
          {showBirthDetailsForm && (
            <div className="absolute inset-0 z-30 bg-black/90 backdrop-blur-md p-6 flex flex-col items-center justify-center animate-in fade-in duration-200">
              <div className="w-full max-w-md bg-[#18191c] border border-neutral-800 rounded-xl p-6 shadow-2xl">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-serif text-lg text-amber-100 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    Natal Chart Calibration
                  </h3>
                  <button
                    onClick={() => setShowBirthDetailsForm(false)}
                    className="text-neutral-400 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                
                <form onSubmit={handleSaveBirthDetails} className="space-y-4 text-xs">
                  <div>
                    <label className="block text-neutral-400 font-mono mb-1">Full Name</label>
                    <input
                      type="text"
                      value={birthForm.name}
                      onChange={(e) => setBirthForm({ ...birthForm, name: e.target.value })}
                      placeholder="e.g. Alexandra Vance"
                      className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded text-neutral-200 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-neutral-400 font-mono mb-1">Date of Birth</label>
                      <input
                        type="date"
                        value={birthForm.dob}
                        onChange={(e) => setBirthForm({ ...birthForm, dob: e.target.value })}
                        className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded text-neutral-200 focus:outline-none focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-neutral-400 font-mono mb-1">Exact Time</label>
                      <input
                        type="time"
                        value={birthForm.timeOfBirth}
                        onChange={(e) => setBirthForm({ ...birthForm, timeOfBirth: e.target.value })}
                        className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded text-neutral-200 focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-neutral-400 font-mono mb-1">Place of Birth (City, Country)</label>
                    <input
                      type="text"
                      value={birthForm.location}
                      onChange={(e) => setBirthForm({ ...birthForm, location: e.target.value })}
                      placeholder="e.g. London, United Kingdom"
                      className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded text-neutral-200 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-black font-mono font-medium rounded transition-colors flex items-center justify-center gap-2 mt-2"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Calibrate Chart
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* Left / Top Viewport depending on mode */}
          {(mode === 'audio' || mode === 'video') && (
            <div className="w-full md:w-1/2 h-48 md:h-full bg-neutral-950 border-b md:border-b-0 md:border-r border-neutral-800 flex flex-col items-center justify-center p-6 relative overflow-hidden">
              
              {/* Background ambient lighting */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-amber-950/10 to-transparent pointer-events-none" />

              {/* Mode Visualizer */}
              <div className="relative z-10 flex flex-col items-center text-center">
                
                {/* Large Portrait Frame */}
                <div className="relative w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden border-2 border-amber-500/40 shadow-2xl mb-4 group">
                  <img
                    src={practitioner.imageUrl}
                    alt={practitioner.name}
                    className={`w-full h-full object-cover grayscale contrast-125 transition-all ${
                      isVideoOff && mode === 'video' ? 'opacity-20 blur-sm' : ''
                    }`}
                  />
                  
                  {/* Waveform Animation for Audio */}
                  {mode === 'audio' && (
                    <div className="absolute inset-0 flex items-center justify-center gap-1 bg-black/40 backdrop-blur-[2px]">
                      <span className="w-1 h-8 bg-amber-400 rounded-full animate-pulse" style={{ animationDelay: '0ms' }} />
                      <span className="w-1 h-12 bg-amber-300 rounded-full animate-pulse" style={{ animationDelay: '150ms' }} />
                      <span className="w-1 h-6 bg-amber-500 rounded-full animate-pulse" style={{ animationDelay: '300ms' }} />
                      <span className="w-1 h-10 bg-amber-400 rounded-full animate-pulse" style={{ animationDelay: '450ms' }} />
                    </div>
                  )}
                </div>

                <h3 className="font-serif text-lg font-medium text-neutral-100 mb-1">
                  {practitioner.name}
                </h3>
                <p className="text-xs font-mono text-amber-300/80 mb-4">
                  {mode === 'audio' ? 'Live Encrypted Audio Stream' : 'HD Encrypted Video Stream'}
                </p>

                {/* Call Control Buttons */}
                <div className="flex items-center gap-3 mt-2">
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className={`p-3 rounded-full border transition-colors ${
                      isMuted 
                        ? 'bg-red-950/80 text-red-300 border-red-800' 
                        : 'bg-neutral-800 text-neutral-200 border-neutral-700 hover:bg-neutral-700'
                    }`}
                    title={isMuted ? 'Unmute Microphone' : 'Mute Microphone'}
                  >
                    {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  </button>

                  {mode === 'video' && (
                    <button
                      onClick={() => setIsVideoOff(!isVideoOff)}
                      className={`p-3 rounded-full border transition-colors ${
                        isVideoOff 
                          ? 'bg-red-950/80 text-red-300 border-red-800' 
                          : 'bg-neutral-800 text-neutral-200 border-neutral-700 hover:bg-neutral-700'
                      }`}
                      title={isVideoOff ? 'Enable Video' : 'Disable Video'}
                    >
                      {isVideoOff ? <VideoOff className="w-4 h-4" /> : <Video className="w-4 h-4" />}
                    </button>
                  )}

                  <button
                    onClick={onClose}
                    className="p-3 bg-red-600 hover:bg-red-500 text-white rounded-full transition-colors shadow-lg"
                    title="End Call"
                  >
                    <PhoneOff className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Chat Stream Viewport */}
          <div className="flex-1 flex flex-col h-full bg-[#121316] overflow-hidden">
            
            {/* Quick Birth Info Banner */}
            <div className="px-4 py-2 bg-neutral-900/80 border-b border-neutral-800 text-[11px] font-mono text-neutral-400 flex items-center justify-between">
              <span className="truncate">
                Chart: <strong className="text-amber-200">{userBirthDetails.name || 'Seeker'}</strong> ({userBirthDetails.dob || '1995-08-15'}, {userBirthDetails.location || 'New York'})
              </span>
              <button
                onClick={() => setShowBirthDetailsForm(true)}
                className="text-amber-400 hover:underline shrink-0 ml-2"
              >
                Change
              </button>
            </div>

            {/* Messages Feed */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${
                    msg.sender === 'user'
                      ? 'items-end'
                      : msg.sender === 'system'
                      ? 'items-center'
                      : 'items-start'
                  }`}
                >
                  {msg.sender === 'system' ? (
                    <div className="px-3 py-1.5 rounded-full bg-amber-950/30 border border-amber-800/40 text-[11px] font-mono text-amber-300/90 max-w-md text-center my-1">
                      {msg.text}
                    </div>
                  ) : (
                    <div
                      className={`max-w-[85%] sm:max-w-[75%] rounded-2xl px-4 py-3 text-xs sm:text-sm font-light leading-relaxed shadow-md ${
                        msg.sender === 'user'
                          ? 'bg-amber-600/90 text-white rounded-br-none'
                          : 'bg-[#1a1c20] text-neutral-200 border border-neutral-800 rounded-bl-none'
                      }`}
                    >
                      {msg.sender === 'practitioner' && (
                        <span className="block text-[10px] font-mono text-amber-300 mb-1">
                          {practitioner.name}
                        </span>
                      )}
                      <p className="whitespace-pre-wrap">{msg.text}</p>
                      <span className="block text-[9px] font-mono text-neutral-400 text-right mt-1.5">
                        {msg.timestamp}
                      </span>
                    </div>
                  )}
                </div>
              ))}

              {isLoading && (
                <div className="flex items-center gap-2 text-xs font-mono text-amber-300/80 bg-[#1a1c20] p-3 rounded-xl border border-neutral-800 w-fit">
                  <Sparkles className="w-3.5 h-3.5 animate-spin text-amber-400" />
                  <span>{practitioner.name} is calculating planetary transits...</span>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Quick Suggestion Chips */}
            <div className="px-4 py-2 border-t border-neutral-800/60 bg-neutral-900/30 flex items-center gap-2 overflow-x-auto text-[11px] font-mono text-neutral-400 no-scrollbar">
              <span className="shrink-0 text-neutral-500">Quick Prompts:</span>
              <button
                onClick={() => handleSendMessage("What do my current 10th and 11th house transits reveal for career growth?")}
                className="shrink-0 px-2.5 py-1 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded border border-neutral-700 transition-colors"
              >
                Career Transits
              </button>
              <button
                onClick={() => handleSendMessage("Can you analyze my Venus placement and relationship synastry timing?")}
                className="shrink-0 px-2.5 py-1 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded border border-neutral-700 transition-colors"
              >
                Relationship Sync
              </button>
              <button
                onClick={() => handleSendMessage("When is my upcoming favorable Dasha period for wealth expansion?")}
                className="shrink-0 px-2.5 py-1 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded border border-neutral-700 transition-colors"
              >
                Dasha Forecast
              </button>
            </div>

            {/* Input Bar */}
            <div className="p-3 bg-[#181a1e] border-t border-neutral-800 flex items-center gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder={`Ask ${practitioner.name} anything about your chart...`}
                className="flex-1 bg-neutral-900 border border-neutral-700/80 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-neutral-100 focus:outline-none focus:border-amber-500/80 placeholder:text-neutral-500"
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={isLoading || !inputText.trim()}
                className="p-2.5 bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-black rounded-xl transition-colors font-medium shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
