import React, { useState, useEffect, useRef } from 'react';
import type { Practitioner, SessionMode, UserBirthDetails } from '@/types/verified';
import { X, Mic, MicOff, Video, VideoOff, PhoneOff, Send, Compass, User, Calendar, MapPin, Sparkles } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'practitioner';
  text: string;
  timestamp: string;
}

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

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setSessionSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

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
      await new Promise(r => setTimeout(r, 1000));
      const replies = [
        `Based on your natal positions and current ${practitioner.specialty} transits, this period presents significant opportunities for alignment. Focus on Saturn and Jupiter transits in your 10th house.`,
        `Analyzing your birth chart (${userBirthDetails.dob} at ${userBirthDetails.timeOfBirth}): Your Dasha period currently activates favorable career and relationship houses. Proceed with confidence.`,
        `The current Rahu-Ketu nodal shift directly impacts your chart axis. I recommend grounding remedies and daily morning intention setting.`,
      ];
      const replyText = replies[Math.floor(Math.random() * replies.length)];

      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'practitioner',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch {
      // Fallback
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveBirthDetails = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateBirthDetails(birthForm);
    setShowBirthDetailsForm(false);
    
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        sender: 'practitioner',
        text: `Updated natal chart received: ${birthForm.name} (DOB: ${birthForm.dob}, Time: ${birthForm.timeOfBirth}, Location: ${birthForm.location}). Chart recalibrated!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-hidden font-sans">
      <div className="bg-[#121316] border border-neutral-800 rounded-2xl w-full max-w-5xl h-[92vh] max-h-[850px] flex flex-col overflow-hidden shadow-2xl relative">
        
        <div className="px-4 py-3 bg-neutral-950/80 border-b border-neutral-800/80 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={practitioner.imageUrl}
                alt={practitioner.name}
                className="w-10 h-10 rounded-full object-cover grayscale contrast-125 border border-neutral-700"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border border-black" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-sm sm:text-base font-normal text-white">{practitioner.name}</h3>
                <span className="font-mono text-[10px] text-amber-300 bg-amber-950/50 border border-amber-800/60 px-1.5 py-0.2 rounded uppercase">
                  {practitioner.tag}
                </span>
              </div>
              <p className="text-[11px] text-neutral-400 font-mono">
                {mode.toUpperCase()} Session • ₹{practitioner.ratePerMin}/min
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-neutral-900 border border-neutral-800 px-3 py-1 rounded-full font-mono text-xs text-amber-400">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              <span>{formatTimer(sessionSeconds)}</span>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative">
          <div className="md:w-5/12 bg-black/60 border-r border-neutral-800/80 p-4 flex flex-col justify-between overflow-y-auto">
            <div className="relative w-full aspect-video sm:aspect-square bg-neutral-900 rounded-xl overflow-hidden border border-neutral-800 flex items-center justify-center group mb-4">
              {mode === 'video' && !isVideoOff ? (
                <div className="relative w-full h-full">
                  <img
                    src={practitioner.imageUrl}
                    alt={practitioner.name}
                    className="w-full h-full object-cover grayscale contrast-125"
                  />
                  <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-md border border-neutral-800 text-[10px] font-mono text-white flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    {practitioner.name} (Live Video Feed)
                  </div>
                </div>
              ) : (
                <div className="text-center p-6 space-y-3">
                  <div className="w-20 h-20 rounded-full bg-neutral-800 border border-neutral-700 mx-auto overflow-hidden flex items-center justify-center">
                    <img
                      src={practitioner.imageUrl}
                      alt={practitioner.name}
                      className="w-full h-full object-cover grayscale contrast-125"
                    />
                  </div>
                  <div>
                    <p className="font-serif text-base text-white">{practitioner.name}</p>
                    <p className="text-xs text-neutral-400 font-mono">{practitioner.specialty}</p>
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-800 text-[11px] font-mono text-neutral-300 border border-neutral-700">
                    <Mic className="w-3 h-3 text-amber-400" />
                    <span>{mode.toUpperCase()} Connected</span>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-neutral-900/80 border border-neutral-800 rounded-xl p-3.5 space-y-2 mb-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-amber-300 font-bold uppercase flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-amber-400" /> User Natal Profile
                </span>
                <button
                  onClick={() => setShowBirthDetailsForm(!showBirthDetailsForm)}
                  className="text-[11px] font-mono text-neutral-400 hover:text-white underline cursor-pointer"
                >
                  {showBirthDetailsForm ? 'Cancel' : 'Edit Details'}
                </button>
              </div>

              {showBirthDetailsForm ? (
                <form onSubmit={handleSaveBirthDetails} className="space-y-2 pt-2">
                  <input
                    type="text"
                    value={birthForm.name}
                    onChange={(e) => setBirthForm({ ...birthForm, name: e.target.value })}
                    placeholder="Full Name"
                    className="w-full bg-black/60 border border-neutral-700 rounded px-2.5 py-1 text-xs text-white"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="date"
                      value={birthForm.dob}
                      onChange={(e) => setBirthForm({ ...birthForm, dob: e.target.value })}
                      className="bg-black/60 border border-neutral-700 rounded px-2.5 py-1 text-xs text-white [color-scheme:dark]"
                    />
                    <input
                      type="time"
                      value={birthForm.timeOfBirth}
                      onChange={(e) => setBirthForm({ ...birthForm, timeOfBirth: e.target.value })}
                      className="bg-black/60 border border-neutral-700 rounded px-2.5 py-1 text-xs text-white [color-scheme:dark]"
                    />
                  </div>
                  <input
                    type="text"
                    value={birthForm.location}
                    onChange={(e) => setBirthForm({ ...birthForm, location: e.target.value })}
                    placeholder="Birth City, Country"
                    className="w-full bg-black/60 border border-neutral-700 rounded px-2.5 py-1 text-xs text-white"
                  />
                  <button
                    type="submit"
                    className="w-full bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs py-1.5 rounded cursor-pointer transition-colors"
                  >
                    Save & Recalibrate Chart
                  </button>
                </form>
              ) : (
                <div className="text-xs text-neutral-300 font-mono space-y-1 pt-1">
                  <p className="flex items-center gap-2">
                    <User className="w-3 h-3 text-neutral-500" /> {userBirthDetails.name}
                  </p>
                  <p className="flex items-center gap-2">
                    <Calendar className="w-3 h-3 text-neutral-500" /> {userBirthDetails.dob} at {userBirthDetails.timeOfBirth}
                  </p>
                  <p className="flex items-center gap-2">
                    <MapPin className="w-3 h-3 text-neutral-500" /> {userBirthDetails.location}
                  </p>
                </div>
              )}
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all cursor-pointer ${
                  isMuted ? 'bg-red-950/80 border-red-800 text-red-400' : 'bg-neutral-800 border-neutral-700 text-neutral-300 hover:text-white'
                }`}
                title={isMuted ? 'Unmute Microphone' : 'Mute Microphone'}
              >
                {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>

              {mode === 'video' && (
                <button
                  onClick={() => setIsVideoOff(!isVideoOff)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all cursor-pointer ${
                    isVideoOff ? 'bg-red-950/80 border-red-800 text-red-400' : 'bg-neutral-800 border-neutral-700 text-neutral-300 hover:text-white'
                  }`}
                  title={isVideoOff ? 'Turn Camera On' : 'Turn Camera Off'}
                >
                  {isVideoOff ? <VideoOff className="w-4 h-4" /> : <Video className="w-4 h-4" />}
                </button>
              )}

              <button
                onClick={onClose}
                className="px-5 h-10 rounded-full bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg transition-colors cursor-pointer"
              >
                <PhoneOff className="w-4 h-4" />
                <span>End Session</span>
              </button>
            </div>
          </div>

          <div className="md:w-7/12 flex flex-col h-full bg-[#121316]">
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-amber-500/20 border border-amber-500/30 text-amber-100 rounded-br-none'
                        : 'bg-neutral-900 border border-neutral-800 text-neutral-200 rounded-bl-none font-sans'
                    }`}
                  >
                    {msg.sender === 'practitioner' && (
                      <div className="flex items-center gap-1.5 mb-1 text-[10px] font-mono text-amber-400 font-bold">
                        <Sparkles className="w-3 h-3" />
                        <span>{practitioner.name}</span>
                      </div>
                    )}
                    <p className="whitespace-pre-wrap">{msg.text}</p>
                  </div>
                  <span className="text-[10px] font-mono text-neutral-500 mt-1 px-1">{msg.timestamp}</span>
                </div>
              ))}
              {isLoading && (
                <div className="flex items-center gap-2 text-xs font-mono text-amber-400 p-2">
                  <Sparkles className="w-3.5 h-3.5 animate-spin" />
                  <span>{practitioner.name} is calculating planetary positions...</span>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            <div className="p-3 bg-neutral-950 border-t border-neutral-800/80 shrink-0">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder={`Ask ${practitioner.name} anything about your transits...`}
                  className="flex-1 bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-amber-500/50"
                />
                <button
                  type="submit"
                  disabled={!inputText.trim() || isLoading}
                  className="w-10 h-10 rounded-xl bg-amber-500 hover:bg-amber-400 text-black flex items-center justify-center transition-colors disabled:opacity-50 cursor-pointer shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
