import React from 'react';
import { Wifi, BatteryMedium, Signal } from 'lucide-react';

interface MobileFrameProps {
  children: React.ReactNode;
  isPhoneFrame: boolean;
}

export const MobileFrame: React.FC<MobileFrameProps> = ({ children, isPhoneFrame }) => {
  if (!isPhoneFrame) {
    return (
      <div className="min-h-screen bg-[#F4F6F0] flex flex-col">
        <main className="flex-1 max-w-xl w-full mx-auto bg-[#FBFDFB] shadow-sm min-h-screen flex flex-col">
          {children}
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1E3024] via-[#243B2C] to-[#17261C] py-6 px-3 sm:px-6 flex items-center justify-center">
      {/* Phone Hardware Mockup Frame */}
      <div className="w-full max-w-[400px] h-[844px] max-h-[92vh] bg-black rounded-[48px] p-3 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7),0_0_0_1px_rgba(255,255,255,0.15)] ring-1 ring-black/40 flex flex-col relative overflow-hidden">
        {/* Dynamic Island / Speaker Pill */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-full z-50 flex items-center justify-between px-3 pointer-events-none">
          <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-800" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-950/60 ring-1 ring-emerald-500/20" />
        </div>

        {/* Screen Bezel & Display Viewport */}
        <div className="w-full h-full bg-[#FAFBF7] rounded-[38px] overflow-hidden flex flex-col relative">
          {/* iOS Status Bar matching storyboard (9:41, signal, wifi, battery) */}
          <div className="h-10 pt-2 px-6 bg-transparent flex items-center justify-between text-slate-800 text-xs font-semibold select-none z-40 shrink-0">
            <span className="tracking-tight text-[13px] font-bold">9:41</span>
            <div className="flex items-center gap-1.5 text-slate-700">
              <Signal className="w-3.5 h-3.5" />
              <Wifi className="w-3.5 h-3.5" />
              <div className="w-5 h-2.5 border border-slate-700 rounded-[3px] p-[1px] flex items-center">
                <div className="w-3.5 h-full bg-slate-800 rounded-[1px]" />
              </div>
            </div>
          </div>

          {/* Scrollable Screen Content Container */}
          <div className="flex-1 overflow-y-auto no-scrollbar flex flex-col">
            {children}
          </div>

          {/* Home indicator bar at bottom */}
          <div className="h-4 bg-transparent flex items-center justify-center shrink-0 z-40">
            <div className="w-32 h-1 bg-slate-300 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};
