import React from 'react';
import { CheckCircle2, MapPin, QrCode, Copy, Check } from 'lucide-react';
import { SwapItem } from '../../types';
import { sound } from '../../utils/sound';

interface ClaimSuccessModalProps {
  item: SwapItem;
  claimCode: string;
  onClose: () => void;
}

export const ClaimSuccessModal: React.FC<ClaimSuccessModalProps> = ({
  item,
  claimCode,
  onClose,
}) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    sound.tap();
    navigator.clipboard?.writeText(claimCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-emerald-100 text-center space-y-4">
        {/* Success Icon */}
        <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-inner">
          <CheckCircle2 className="w-8 h-8 stroke-[2.2]" />
        </div>

        <div>
          <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
            Item Reserved!
          </span>
          <h3 className="text-lg font-bold text-slate-900 font-display mt-0.5">
            {item.name}
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Keep campus waste zero! Pickup instructions have been generated.
          </p>
        </div>

        {/* Pickup Code Ticket Box */}
        <div className="bg-[#FAF7F0] p-4 rounded-2xl border border-dashed border-emerald-400 space-y-2">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            Your Campus Pickup Code
          </span>
          <div className="flex items-center justify-center gap-2">
            <span className="font-mono text-xl font-bold tracking-widest text-[#1E5C3B]">
              {claimCode}
            </span>
            <button
              onClick={handleCopy}
              className="p-1 text-slate-500 hover:text-emerald-700 rounded-md"
              title="Copy code"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
          <p className="text-[11px] text-slate-500">
            Show this code or collect from the designated shelf box.
          </p>
        </div>

        {/* Pickup spot */}
        <div className="p-3 bg-slate-50 rounded-xl text-left flex items-start gap-2.5 text-xs text-slate-700">
          <MapPin className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <strong className="block text-slate-900">Pickup Location:</strong>
            <span>{item.location}</span>
          </div>
        </div>

        <button
          onClick={() => {
            sound.tap();
            onClose();
          }}
          className="w-full py-3 px-4 bg-[#2E7D4F] hover:bg-[#256640] active:scale-[0.98] text-white font-semibold text-sm rounded-xl shadow-md transition-all cursor-pointer"
        >
          Got It, Done
        </button>
      </div>
    </div>
  );
};
