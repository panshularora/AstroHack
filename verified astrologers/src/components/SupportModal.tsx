import React, { useState } from 'react';
import { X, LifeBuoy, Send, CheckCircle2, MessageSquare } from 'lucide-react';

interface SupportModalProps {
  onClose: () => void;
}

export const SupportModal: React.FC<SupportModalProps> = ({ onClose }) => {
  const [ticketSent, setTicketSent] = useState(false);
  const [subject, setSubject] = useState('');
  const [details, setDetails] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!details.trim()) return;
    setTicketSent(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[#141518] border border-neutral-800 rounded-2xl p-6 shadow-2xl text-neutral-100">
        
        <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <LifeBuoy className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-serif text-lg font-medium text-amber-100">
                AstroLive Concierge & Support
              </h2>
              <p className="text-xs text-neutral-400 font-light">
                24/7 dedicated assistance for live sessions
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {ticketSent ? (
          <div className="py-10 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-base text-neutral-100">
              Support Ticket Dispatched
            </h3>
            <p className="text-xs text-neutral-400 font-light max-w-xs mx-auto">
              Our AstroLive concierge team has received your inquiry and will follow up with you within 15 minutes.
            </p>
            <button
              onClick={onClose}
              className="mt-4 px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-mono rounded-lg transition-colors"
            >
              Return to Directory
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-5 space-y-4 text-xs">
            <div>
              <label className="block text-neutral-400 font-mono mb-1">Issue Type</label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded text-neutral-200 focus:outline-none focus:border-amber-500"
              >
                <option value="Audio/Video Session Connection">Audio/Video Session Connection</option>
                <option value="Birth Chart Calibration Query">Birth Chart Calibration Query</option>
                <option value="Billing & Wallet Credit Refill">Billing & Wallet Credit Refill</option>
                <option value="Practitioner Verification Standards">Practitioner Verification Standards</option>
              </select>
            </div>

            <div>
              <label className="block text-neutral-400 font-mono mb-1">How can we assist you?</label>
              <textarea
                rows={4}
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="Describe your session, connection, or chart question..."
                required
                className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded text-neutral-200 focus:outline-none focus:border-amber-500 placeholder:text-neutral-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-black font-mono font-medium rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              Submit Ticket to Concierge
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
