import React from 'react';
import { QrCode, CheckCircle, Clock, MapPin, X } from 'lucide-react';
import { RedeemedVoucher } from '../../types';
import { sound } from '../../utils/sound';

interface RedeemVoucherModalProps {
  voucher: RedeemedVoucher;
  onClose: () => void;
  onMarkAsUsed?: (voucherId: string) => void;
}

export const RedeemVoucherModal: React.FC<RedeemVoucherModalProps> = ({
  voucher,
  onClose,
  onMarkAsUsed,
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-amber-100 text-center space-y-4 relative">
        <button
          onClick={() => {
            sound.tap();
            onClose();
          }}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="pt-2">
          <span className="text-[11px] font-bold text-amber-800 bg-amber-100/80 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
            GreenLoop Campus Voucher
          </span>
          <h3 className="text-lg font-bold text-slate-900 font-display mt-2">
            {voucher.title}
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Present this voucher QR at the campus checkout counter.
          </p>
        </div>

        {/* QR Code Container */}
        <div className="p-5 bg-white rounded-2xl border-2 border-dashed border-amber-300 flex flex-col items-center justify-center shadow-inner space-y-3">
          {/* Stylized QR Code SVG */}
          <div className="p-3 bg-white rounded-xl shadow-xs border border-slate-200">
            <svg
              width="140"
              height="140"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-slate-900"
            >
              {/* Corner position markers */}
              <rect x="5" y="5" width="26" height="26" rx="2" stroke="currentColor" strokeWidth="5" />
              <rect x="11" y="11" width="14" height="14" fill="currentColor" />

              <rect x="69" y="5" width="26" height="26" rx="2" stroke="currentColor" strokeWidth="5" />
              <rect x="75" y="11" width="14" height="14" fill="currentColor" />

              <rect x="5" y="69" width="26" height="26" rx="2" stroke="currentColor" strokeWidth="5" />
              <rect x="11" y="75" width="14" height="14" fill="currentColor" />

              {/* Data modules pattern */}
              <rect x="38" y="8" width="6" height="6" fill="currentColor" />
              <rect x="48" y="8" width="6" height="14" fill="currentColor" />
              <rect x="58" y="12" width="6" height="8" fill="currentColor" />

              <rect x="8" y="38" width="6" height="6" fill="currentColor" />
              <rect x="18" y="38" width="6" height="12" fill="currentColor" />
              <rect x="28" y="44" width="6" height="6" fill="currentColor" />

              <rect x="38" y="38" width="8" height="8" fill="#2E7D4F" />
              <rect x="52" y="38" width="6" height="18" fill="currentColor" />
              <rect x="44" y="50" width="14" height="6" fill="currentColor" />

              <rect x="68" y="38" width="8" height="6" fill="currentColor" />
              <rect x="82" y="44" width="10" height="6" fill="currentColor" />

              <rect x="38" y="68" width="6" height="14" fill="currentColor" />
              <rect x="48" y="76" width="14" height="6" fill="currentColor" />
              <rect x="68" y="68" width="14" height="14" fill="currentColor" />
              <rect x="86" y="86" width="6" height="6" fill="currentColor" />
            </svg>
          </div>

          <div className="space-y-0.5">
            <span className="text-[10px] text-slate-400 uppercase tracking-widest block">
              Voucher Code
            </span>
            <span className="font-mono text-base font-extrabold text-slate-900 tracking-wider">
              {voucher.code}
            </span>
          </div>
        </div>

        {/* Expiry & Location Info */}
        <div className="bg-slate-50 p-3 rounded-xl text-left space-y-1.5 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-amber-600" />
            <span>Valid until: <strong>{voucher.expiryDate}</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-emerald-600" />
            <span>Location: <strong>{voucher.pickupLocation}</strong></span>
          </div>
        </div>

        <button
          onClick={() => {
            sound.tap();
            onClose();
          }}
          className="w-full py-3 px-4 bg-[#2E7D4F] hover:bg-[#256640] active:scale-[0.98] text-white font-semibold text-sm rounded-xl shadow-md transition-all cursor-pointer"
        >
          Close Voucher
        </button>
      </div>
    </div>
  );
};
