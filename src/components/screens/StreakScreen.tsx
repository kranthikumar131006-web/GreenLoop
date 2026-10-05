import React from 'react';
import { Flame, Award, Check, Sparkles, Droplets, Zap, Bike, ShoppingBag, Coffee, ChevronRight } from 'lucide-react';
import { DailyAction, UserProfile } from '../../types';
import { sound } from '../../utils/sound';
import confetti from 'canvas-confetti';

interface StreakScreenProps {
  user: UserProfile;
  pastActions: DailyAction[];
  onCompleteTodayAction: () => void;
  onViewAllPastActions?: () => void;
}

export const StreakScreen: React.FC<StreakScreenProps> = ({
  user,
  pastActions,
  onCompleteTodayAction,
  onViewAllPastActions,
}) => {
  const handleMarkAsDone = () => {
    sound.success();
    try {
      confetti({
        particleCount: 75,
        spread: 60,
        origin: { y: 0.65 },
        colors: ['#2E7D4F', '#43A047', '#F59E0B', '#60A5FA'],
      });
    } catch {
      // Ignore if canvas-confetti has restrictions
    }
    onCompleteTodayAction();
  };

  const getActionIcon = (iconName: string) => {
    switch (iconName) {
      case 'recycle':
        return <ShoppingBag className="w-5 h-5 text-emerald-700" />;
      case 'leaf':
        return <Zap className="w-5 h-5 text-amber-600" />;
      case 'bike':
        return <Bike className="w-5 h-5 text-blue-600" />;
      case 'bottle':
        return <Droplets className="w-5 h-5 text-cyan-600" />;
      case 'coffee':
        return <Coffee className="w-5 h-5 text-amber-800" />;
      default:
        return <Sparkles className="w-5 h-5 text-emerald-700" />;
    }
  };

  return (
    <div className="p-4 space-y-5 pb-10">
      {/* Top Streak & Milestone Badge Card (Screen 3 in Storyboard) */}
      <div className="bg-gradient-to-br from-[#F1FAF3] to-[#E5F5E9] p-4 rounded-2xl border border-[#CCE8D4] shadow-sm">
        <div className="grid grid-cols-2 gap-3 items-center">
          {/* Left: Current Streak */}
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-white shadow-xs flex items-center justify-center text-amber-500">
                <Flame className="w-5 h-5 fill-amber-500 stroke-amber-600 animate-pulse" />
              </div>
              <span className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                Current Streak
              </span>
            </div>
            <div className="text-2xl font-bold text-slate-900 font-display tabular-nums pl-1">
              {user.streakDays} days
            </div>
            {/* 3 mini dots matching storyboard */}
            <div className="flex items-center gap-1.5 pl-1 pt-1">
              {[1, 2, 3].map((dot) => (
                <span
                  key={dot}
                  className="w-2.5 h-2.5 rounded-full bg-[#2E7D4F]"
                />
              ))}
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-200" />
            </div>
          </div>

          {/* Right: Next Badge at 7 days! */}
          <div className="bg-white/80 backdrop-blur-xs p-3 rounded-xl border border-emerald-200/80 flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-800 shrink-0">
              <Award className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div className="text-left">
              <span className="text-xs font-bold text-slate-800 block leading-tight">
                Next badge
              </span>
              <span className="text-[11px] text-emerald-700 font-semibold block">
                at 7 days!
              </span>
              <span className="text-[10px] text-slate-500">
                {Math.max(0, 7 - user.streakDays)} days to go
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Today's Eco-Action (Screen 3 in Storyboard) */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm text-center relative overflow-hidden">
        <div className="flex items-center justify-between mb-3 text-left">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Today's Eco-Action
          </span>
          <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
            +10 Green Credits
          </span>
        </div>

        {/* Central Illustration: Reusable Bottle from storyboard */}
        <div className="my-3 flex justify-center">
          <div className="w-20 h-24 rounded-2xl bg-cyan-50 border border-cyan-100 flex items-center justify-center shadow-inner relative">
            <Droplets className="w-10 h-10 text-cyan-600 animate-bounce" />
            <span className="absolute -top-1 -right-1 text-xs">💧</span>
          </div>
        </div>

        <h3 className="text-lg font-bold text-slate-800 font-display">
          Carry your reusable bottle
        </h3>
        <p className="text-xs text-slate-600 mt-1 max-w-xs mx-auto leading-relaxed">
          Avoid single-use plastic and stay hydrated at campus RO refill stations!
        </p>

        {/* Mark as Done CTA Button */}
        <div className="mt-5">
          {user.todayActionDone ? (
            <div className="w-full py-3.5 px-4 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold text-sm flex items-center justify-center gap-2">
              <Check className="w-5 h-5 stroke-[2.5]" />
              <span>Completed Today! (+10 Credits Earned)</span>
            </div>
          ) : (
            <button
              onClick={handleMarkAsDone}
              className="w-full py-3.5 px-4 rounded-xl bg-[#2E7D4F] hover:bg-[#256640] active:scale-[0.98] text-white font-semibold text-sm shadow-md shadow-emerald-900/15 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Check className="w-4 h-4 stroke-[2.5]" />
              <span>Mark as Done</span>
            </button>
          )}
        </div>
      </div>

      {/* Past Actions (Screen 3 in Storyboard) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h3 className="font-bold text-slate-800 text-sm font-display">
            Past Actions
          </h3>
          <button
            onClick={() => {
              sound.tap();
              if (onViewAllPastActions) onViewAllPastActions();
            }}
            className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-0.5"
          >
            <span>View all</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Horizontal / Grid of past actions matching Day 1, Day 2, Day 3, Day 4 from storyboard */}
        <div className="grid grid-cols-4 gap-2">
          {pastActions.slice(0, 4).map((action) => (
            <div
              key={action.day}
              className="bg-white p-2.5 rounded-xl border border-slate-200/80 text-center flex flex-col items-center justify-between min-h-[96px] shadow-2xs hover:border-emerald-300 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center mb-1">
                {getActionIcon(action.icon)}
              </div>
              <span className="text-[10px] font-bold text-emerald-800 block">
                {action.dayLabel}
              </span>
              <span className="text-[10px] text-slate-600 line-clamp-2 leading-tight">
                {action.title}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Eco Tip Footer */}
      <div className="bg-[#FAF5E9] p-3.5 rounded-xl border border-[#E8DFBF] text-xs text-slate-700 flex items-start gap-2.5">
        <span className="text-base leading-none">💡</span>
        <p className="leading-snug">
          <strong>Campus Fact:</strong> MVGR students refilling water bottles have saved over 4,200 single-use plastic bottles this semester!
        </p>
      </div>
    </div>
  );
};
