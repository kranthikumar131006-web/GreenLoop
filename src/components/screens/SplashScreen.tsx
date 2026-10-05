import React from 'react';
import { GreenLoopLogo } from '../common/EcoGraphics';
import { sound } from '../../utils/sound';
import { ArrowRight, Sparkles } from 'lucide-react';

interface SplashScreenProps {
  onEnter: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onEnter }) => {
  return (
    <div className="relative min-h-[580px] h-full flex flex-col justify-between items-center bg-gradient-to-b from-[#F7FAF6] via-[#EDF5EE] to-[#D5EAD9] p-6 text-center select-none overflow-hidden">
      {/* Subtle organic background foliage accents */}
      <div className="absolute top-10 -left-12 w-36 h-36 bg-emerald-200/40 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute top-48 -right-10 w-44 h-44 bg-green-200/30 rounded-full blur-2xl pointer-events-none" />

      {/* Campus tag */}
      <div className="pt-6">
        <span className="text-xs font-semibold tracking-wider text-emerald-800 uppercase">
          MVGR Campus Circular Eco-System
        </span>
      </div>

      {/* Main Logo & Typography (Screen 1 in Storyboard) */}
      <div className="flex flex-col items-center my-auto">
        <div className="relative mb-6">
          <div className="w-28 h-28 rounded-full bg-white shadow-md flex items-center justify-center border border-emerald-100">
            <GreenLoopLogo size={80} />
          </div>
          <span className="absolute -bottom-2 -right-1 bg-emerald-600 text-white p-1 rounded-full shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
          </span>
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-[#143B23] font-display mb-2">
          GreenLoop
        </h1>

        <p className="text-slate-600 text-base max-w-xs leading-relaxed font-medium">
          Small actions.
          <br />
          <span className="text-[#2E7D4F] font-semibold">Big impact.</span>
        </p>

        <p className="text-xs text-slate-500 mt-4 max-w-[240px]">
          Join your college peers in building a zero-waste campus habits loop.
        </p>
      </div>

      {/* Bottom organic hills & CTA */}
      <div className="w-full max-w-xs pb-4 z-10">
        <button
          onClick={() => {
            sound.success();
            onEnter();
          }}
          className="w-full py-3.5 px-6 rounded-2xl bg-[#2E7D4F] hover:bg-[#256640] active:scale-[0.98] text-white font-semibold text-sm shadow-md shadow-emerald-900/15 flex items-center justify-center gap-2 transition-all"
        >
          <span>Enter GreenLoop</span>
          <ArrowRight className="w-4 h-4 stroke-[2.2]" />
        </button>

        <div className="mt-4 flex items-center justify-center gap-2 text-[11px] text-emerald-800/80">
          <span>Student Habit Tracker</span>
          <span aria-hidden="true">·</span>
          <span>Swap Box</span>
          <span aria-hidden="true">·</span>
          <span>Rewards</span>
        </div>
      </div>

      {/* Gentle decorative rolling hills at bottom */}
      <svg
        className="absolute bottom-0 left-0 right-0 w-full pointer-events-none"
        viewBox="0 0 375 140"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 70 C 90 40, 180 90, 270 50 C 320 30, 360 45, 375 48 L 375 140 L 0 140 Z"
          fill="#BBDDBF"
          opacity="0.5"
        />
        <path
          d="M0 90 C 70 70, 150 110, 230 85 C 300 65, 345 80, 375 75 L 375 140 L 0 140 Z"
          fill="#94C89B"
          opacity="0.7"
        />
      </svg>
    </div>
  );
};
