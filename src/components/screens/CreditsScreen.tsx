import React, { useState } from 'react';
import { Coins, CheckCircle, ChevronRight, Sparkles, Globe, Plus, Check } from 'lucide-react';
import { ScreenId, UserProfile } from '../../types';
import { sound } from '../../utils/sound';
import confetti from 'canvas-confetti';

interface CreditsScreenProps {
  user: UserProfile;
  onNavigate: (screen: ScreenId) => void;
  onEarnQuickCredits: (amount: number, reason: string) => void;
}

export const CreditsScreen: React.FC<CreditsScreenProps> = ({
  user,
  onNavigate,
  onEarnQuickCredits,
}) => {
  const [loggedAvoidSingleUse, setLoggedAvoidSingleUse] = useState(false);

  const handleLogSingleUse = () => {
    if (loggedAvoidSingleUse) return;
    sound.coin();
    setLoggedAvoidSingleUse(true);
    try {
      confetti({
        particleCount: 40,
        spread: 45,
        origin: { y: 0.7 },
        colors: ['#F59E0B', '#10B981', '#3B82F6'],
      });
    } catch {
      // Ignore
    }
    onEarnQuickCredits(5, 'Avoided single-use packaging today');
  };

  return (
    <div className="p-4 space-y-5 pb-12">
      {/* Your Credits Top Card (Screen 6 in Storyboard) */}
      <div className="bg-gradient-to-br from-[#FCF8EC] via-[#FDF5DF] to-[#FCEEC6] p-5 rounded-2xl border border-[#F6DC9A] shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 rounded-2xl bg-amber-400/90 shadow-md flex items-center justify-center text-white border-2 border-white">
              <Coins className="w-8 h-8 stroke-[2.2]" />
            </div>
            <div>
              <span className="text-xs font-semibold text-amber-900 uppercase tracking-wide">
                Your Credits
              </span>
              <div className="text-3xl font-extrabold text-slate-900 font-display tabular-nums">
                {user.credits}
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              sound.tap();
              onNavigate('rewards');
            }}
            className="text-xs font-bold text-amber-900 hover:text-amber-950 flex items-center gap-1 bg-white/80 hover:bg-white px-3 py-2 rounded-xl border border-amber-200 shadow-2xs transition-all active:scale-95"
          >
            <span>View rewards</span>
            <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </button>
        </div>
      </div>

      {/* How to Earn Section (Screen 6 in Storyboard) */}
      <div className="space-y-3">
        <h3 className="font-bold text-slate-800 text-sm font-display px-1">
          How to Earn
        </h3>

        <div className="space-y-2.5">
          {/* Row 1: Maintain Green Streak */}
          <div className="bg-white p-3.5 rounded-2xl border border-slate-200/90 shadow-2xs flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
                🔥
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 text-xs">
                  Maintain Green Streak
                </h4>
                <p className="text-[11px] text-emerald-700 font-medium">
                  +10 per day
                </p>
              </div>
            </div>
            <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <CheckCircle className="w-4 h-4" />
            </div>
          </div>

          {/* Row 2: Swap or Reuse Items */}
          <div className="bg-white p-3.5 rounded-2xl border border-slate-200/90 shadow-2xs flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                🔄
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 text-xs">
                  Swap or Reuse Items
                </h4>
                <p className="text-[11px] text-emerald-700 font-medium">
                  +20 per item
                </p>
              </div>
            </div>
            <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <CheckCircle className="w-4 h-4" />
            </div>
          </div>

          {/* Row 3: Avoid Single-Use Products (Interactive log) */}
          <div className="bg-white p-3.5 rounded-2xl border border-slate-200/90 shadow-2xs flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                🍃
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 text-xs">
                  Avoid Single-Use Products
                </h4>
                <p className="text-[11px] text-emerald-700 font-medium">
                  +5 per action
                </p>
              </div>
            </div>
            {loggedAvoidSingleUse ? (
              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full flex items-center gap-1">
                <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                Logged!
              </span>
            ) : (
              <button
                onClick={handleLogSingleUse}
                className="py-1 px-3 bg-emerald-50 hover:bg-emerald-100 active:scale-95 text-emerald-800 text-xs font-semibold rounded-lg border border-emerald-200 flex items-center gap-1 transition-all"
                title="Tap to claim for today"
              >
                <Plus className="w-3 h-3" />
                <span>Log (+5)</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Earth message banner matching storyboard: "Your choices save the planet! 🌍" */}
      <div className="bg-[#EBF7EE] p-4 rounded-2xl border border-[#CCE8D4] flex items-center gap-3 shadow-2xs">
        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-emerald-700 shrink-0">
          <Globe className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <h4 className="font-bold text-slate-900 text-xs">
            Your choices save the planet! 🌍
          </h4>
          <p className="text-[11px] text-emerald-800/90 mt-0.5 leading-snug">
            Every 100 green credits represent approximately 1 kg of avoided campus carbon footprint.
          </p>
        </div>
      </div>
    </div>
  );
};
