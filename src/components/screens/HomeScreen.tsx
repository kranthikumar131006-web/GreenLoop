import React from 'react';
import { Flame, ChevronRight, RefreshCw, Gift, Sprout, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { ScreenId, UserProfile } from '../../types';
import { sound } from '../../utils/sound';

interface HomeScreenProps {
  user: UserProfile;
  onNavigate: (screen: ScreenId) => void;
  onOpenEcoTipModal?: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  user,
  onNavigate,
  onOpenEcoTipModal,
}) => {
  return (
    <div className="p-4 space-y-4 pb-8">
      {/* Greeting block (Screen 2: "Hi Kavya! 👋 / Let's make your campus greener!") */}
      <div className="pt-1">
        <div className="flex items-center gap-1.5">
          <h2 className="text-xl font-bold tracking-tight text-slate-900 font-display">
            Hi {user.name}!
          </h2>
          <span className="text-xl" role="img" aria-label="wave">👋</span>
        </div>
        <p className="text-sm text-slate-600 mt-0.5 font-medium">
          Let's make your campus greener!
        </p>
      </div>

      {/* Green Streak Card (Screen 2 in Storyboard) */}
      <div
        role="button"
        tabIndex={0}
        onClick={() => {
          sound.tap();
          onNavigate('streak');
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            sound.tap();
            onNavigate('streak');
          }
        }}
        className="w-full text-left bg-gradient-to-br from-[#EBF7EE] to-[#DEF1E2] p-4 rounded-2xl border border-[#C6E6CD] shadow-sm hover:shadow-md transition-all active:scale-[0.99] group cursor-pointer"
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/90 shadow-sm flex items-center justify-center text-amber-500 border border-amber-200/50">
              <Flame className="w-7 h-7 fill-amber-500 stroke-amber-600 animate-pulse" />
            </div>
            <div>
              <span className="text-xs font-semibold text-emerald-800 tracking-wide uppercase">
                Green Streak
              </span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-bold text-slate-900 font-display tabular-nums">
                  {user.streakDays} days
                </span>
                {user.todayActionDone && (
                  <span className="inline-flex items-center text-xs font-semibold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full">
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    Done today
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="w-8 h-8 rounded-full bg-white/60 flex items-center justify-center text-slate-600 group-hover:text-emerald-700 group-hover:bg-white transition-colors">
            <ChevronRight className="w-5 h-5 stroke-[2.2]" />
          </div>
        </div>

        {/* Keep going! text and dot progress track matching storyboard */}
        <div className="mt-3 pt-2.5 border-t border-emerald-200/60 flex items-center justify-between">
          <span className="text-xs font-medium text-emerald-900">
            {user.todayActionDone ? 'Great job! Day completed' : 'Keep going! 1 action pending'}
          </span>
          <div className="flex items-center gap-1.5">
            {[1, 2, 3, 4, 5, 6, 7].map((dayIndex) => {
              const isFilled = dayIndex <= user.streakDays;
              return (
                <span
                  key={dayIndex}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    isFilled
                      ? 'bg-[#2E7D4F] ring-1 ring-emerald-600'
                      : 'bg-emerald-200/80'
                  }`}
                  title={`Day ${dayIndex}`}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* Two side-by-side cards: Campus Swap Box & Green Credits (Screen 2 in Storyboard) */}
      <div className="grid grid-cols-2 gap-3">
        {/* Campus Swap Box Card */}
        <button
          onClick={() => {
            sound.tap();
            onNavigate('swap');
          }}
          className="bg-[#EFF8FF] p-4 rounded-2xl border border-[#CDE5FE] text-left shadow-sm hover:shadow-md transition-all active:scale-[0.98] group flex flex-col justify-between min-h-[128px]"
        >
          <div className="flex items-start justify-between">
            <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-blue-600 border border-blue-100">
              <RefreshCw className="w-5 h-5 stroke-[2.2] group-hover:rotate-45 transition-transform duration-300" />
            </div>
            <ArrowUpRight className="w-4 h-4 text-blue-400 group-hover:text-blue-700 transition-colors" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800 text-sm font-display mt-2">
              Campus Swap Box
            </h3>
            <p className="text-xs text-blue-800/80 font-medium">Browse / Donate</p>
          </div>
        </button>

        {/* Green Credits Card */}
        <button
          onClick={() => {
            sound.tap();
            onNavigate('credits');
          }}
          className="bg-[#FFF8E6] p-4 rounded-2xl border border-[#FEE3A2] text-left shadow-sm hover:shadow-md transition-all active:scale-[0.98] group flex flex-col justify-between min-h-[128px]"
        >
          <div className="flex items-start justify-between">
            <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-amber-600 border border-amber-100">
              <Gift className="w-5 h-5 stroke-[2.2]" />
            </div>
            <ChevronRight className="w-4 h-4 text-amber-400 group-hover:text-amber-700 transition-colors" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800 text-sm font-display mt-2">
              Green Credits
            </h3>
            <p className="text-xs text-amber-900 font-semibold tabular-nums">
              {user.credits} credits &gt;
            </p>
          </div>
        </button>
      </div>

      {/* "Together for a Greener Campus 🌱" Banner card (Screen 2 in Storyboard) */}
      <div
        role="button"
        tabIndex={0}
        onClick={() => {
          sound.tap();
          if (onOpenEcoTipModal) {
            onOpenEcoTipModal();
          } else {
            onNavigate('impact');
          }
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            sound.tap();
            onNavigate('impact');
          }
        }}
        className="w-full bg-[#FAF5E9] hover:bg-[#F5EED9] p-4 rounded-2xl border border-[#E9DFBF] text-left flex items-center justify-between transition-colors shadow-sm cursor-pointer"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center">
            <Sprout className="w-5 h-5 stroke-[2.2]" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-800">
              Together for a Greener Campus
            </h3>
            <p className="text-xs text-slate-600">
              MVGR College: 1,420 kg CO₂ avoided this month
            </p>
          </div>
        </div>
        <span className="text-lg" role="img" aria-label="plant">🌱</span>
      </div>

      {/* Quick shortcuts row */}
      <div className="pt-1">
        <div className="flex items-center justify-between mb-2 px-1">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Quick Actions
          </span>
          <button
            onClick={() => onNavigate('impact')}
            className="text-xs font-semibold text-emerald-700 hover:text-emerald-800"
          >
            View Your Impact &gt;
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <button
            onClick={() => {
              sound.tap();
              onNavigate('donate');
            }}
            className="p-3 bg-white rounded-xl border border-slate-200/80 hover:border-emerald-300 text-left flex items-center gap-2.5 transition-colors"
          >
            <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
              +
            </div>
            <div>
              <span className="font-semibold text-slate-800 block">List an Item</span>
              <span className="text-[11px] text-slate-500">+20 Credits</span>
            </div>
          </button>

          <button
            onClick={() => {
              sound.tap();
              onNavigate('rewards');
            }}
            className="p-3 bg-white rounded-xl border border-slate-200/80 hover:border-amber-300 text-left flex items-center gap-2.5 transition-colors"
          >
            <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
              🎁
            </div>
            <div>
              <span className="font-semibold text-slate-800 block">Redeem Vouchers</span>
              <span className="text-[11px] text-slate-500">Canteen, merch & more</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
