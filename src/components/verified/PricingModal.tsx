import React, { useState } from 'react';
import { X, CreditCard, Wallet } from 'lucide-react';

interface PricingModalProps {
  onClose: () => void;
}

const CREDIT_PACKAGES = [
  { id: 'starter', name: 'Seeker Pack', credits: 250, price: '₹250', bonus: '₹0 Bonus', totalMins: '~10 Mins Live' },
  { id: 'pro', name: 'Celestial Pass', credits: 500, price: '₹500', bonus: '₹100 Extra Bonus', totalMins: '~25 Mins Live', popular: true },
  { id: 'vip', name: 'Master Oracle', credits: 1000, price: '₹1,000', bonus: '₹300 Extra Bonus', totalMins: '~50 Mins Live' },
];

export const PricingModal: React.FC<PricingModalProps> = ({ onClose }) => {
  const [walletBalance, setWalletBalance] = useState(500.00);
  const [selectedPkg, setSelectedPkg] = useState('pro');
  const [addedSuccess, setAddedSuccess] = useState(false);

  const handleAddFunds = (amount: number) => {
    setWalletBalance((prev) => prev + amount);
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md font-sans">
      <div className="relative w-full max-w-xl bg-[#141518] border border-neutral-800 rounded-2xl p-6 sm:p-8 shadow-2xl text-neutral-100 max-h-[85vh] overflow-y-auto">
        
        <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <CreditCard className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-serif text-lg font-medium text-amber-100">
                Transparent Per-Minute Rates & Credit Bundles
              </h2>
              <p className="text-xs text-neutral-400 font-light">
                Pay only for exact session time in INR with no hidden fees
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wallet Balance Display */}
        <div className="mt-6 p-4 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-amber-500/10 text-amber-400">
              <Wallet className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider block">
                Your Current Wallet Balance
              </span>
              <span className="font-serif text-xl font-normal text-amber-200">
                ₹{walletBalance.toFixed(2)} INR
              </span>
            </div>
          </div>
          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/30">
            Active Account
          </span>
        </div>

        {addedSuccess && (
          <div className="mt-3 p-3 bg-emerald-950/60 border border-emerald-800 rounded-lg text-emerald-200 text-xs text-center font-mono">
            ✓ Credits loaded successfully into your AstroLive wallet!
          </div>
        )}

        {/* Credit Packages */}
        <div className="mt-6 space-y-3">
          <h3 className="text-xs font-mono text-neutral-400 uppercase tracking-wider">
            Select Credit Refill Package:
          </h3>

          {CREDIT_PACKAGES.map((pkg) => {
            const isSelected = selectedPkg === pkg.id;
            const pkgAmount = pkg.id === 'starter' ? 250 : pkg.id === 'pro' ? 500 : 1000;

            return (
              <div
                key={pkg.id}
                onClick={() => setSelectedPkg(pkg.id)}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between relative ${
                  isSelected
                    ? 'bg-amber-950/40 border-amber-500/80'
                    : 'bg-neutral-900/60 hover:bg-neutral-800/80 border-neutral-800'
                }`}
              >
                {pkg.popular && (
                  <span className="absolute -top-2.5 right-4 text-[9px] font-mono bg-amber-500 text-black px-2 py-0.5 rounded-full font-bold">
                    MOST POPULAR
                  </span>
                )}

                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-serif text-sm text-neutral-100 font-medium">
                      {pkg.name}
                    </h4>
                    <span className="text-xs text-amber-300 font-mono">
                      {pkg.bonus}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-400 font-light mt-0.5">
                    {pkg.totalMins} of live Audio, Video, or Chat
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="font-serif text-lg text-neutral-100">
                    {pkg.price}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddFunds(pkgAmount);
                    }}
                    className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-black text-xs font-mono font-medium rounded-lg transition-colors cursor-pointer"
                  >
                    Add ₹{pkgAmount}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
