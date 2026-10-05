import React, { useState } from 'react';
import { Leaf, RefreshCw, Coins, Cloud, Flame, Award, Users, Trees } from 'lucide-react';
import { UserProfile } from '../../types';
import { sound } from '../../utils/sound';

interface ImpactScreenProps {
  user: UserProfile;
}

export const ImpactScreen: React.FC<ImpactScreenProps> = ({ user }) => {
  const [timeframe, setTimeframe] = useState<'week' | 'all'>('week');

  // Values calculated for This Week vs All Time
  const stats = timeframe === 'week'
    ? {
        actions: user.actionsCompletedCount,
        swapped: user.itemsSwappedCount,
        credits: 45,
        co2: user.co2SavedKg.toFixed(1),
        waterLiters: 18,
      }
    : {
        actions: user.actionsCompletedCount + 23,
        swapped: user.itemsSwappedCount + 9,
        credits: user.credits + 260,
        co2: (user.co2SavedKg * 8.4).toFixed(1),
        waterLiters: 142,
      };

  return (
    <div className="p-4 space-y-4 pb-12">
      {/* Timeframe Filter (Screen 8 in Storyboard: This Week | All Time) */}
      <div className="flex items-center gap-1 p-1 bg-slate-200/70 rounded-xl">
        <button
          onClick={() => {
            sound.tap();
            setTimeframe('week');
          }}
          className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
            timeframe === 'week'
              ? 'bg-[#E2F2E4] text-[#1E5C3B] shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          This Week
        </button>

        <button
          onClick={() => {
            sound.tap();
            setTimeframe('all');
          }}
          className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
            timeframe === 'all'
              ? 'bg-[#E2F2E4] text-[#1E5C3B] shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          All Time
        </button>
      </div>

      {/* 2x2 Metric Grid (Screen 8 in Storyboard) */}
      <div className="grid grid-cols-2 gap-3">
        {/* Card 1: Actions Completed */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col items-center justify-center text-center space-y-1 min-h-[120px]">
          <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <Leaf className="w-5 h-5 stroke-[2.2]" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 font-display tabular-nums">
            {stats.actions}
          </div>
          <span className="text-xs text-slate-500 font-medium">
            Actions Completed
          </span>
        </div>

        {/* Card 2: Items Swapped */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col items-center justify-center text-center space-y-1 min-h-[120px]">
          <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
            <RefreshCw className="w-5 h-5 stroke-[2.2]" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 font-display tabular-nums">
            {stats.swapped}
          </div>
          <span className="text-xs text-slate-500 font-medium">
            Items Swapped
          </span>
        </div>

        {/* Card 3: Green Credits Earned */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col items-center justify-center text-center space-y-1 min-h-[120px]">
          <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center">
            <Coins className="w-5 h-5 stroke-[2.2]" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 font-display tabular-nums">
            {stats.credits}
          </div>
          <span className="text-xs text-slate-500 font-medium">
            Green Credits Earned
          </span>
        </div>

        {/* Card 4: CO2 Saved */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col items-center justify-center text-center space-y-1 min-h-[120px]">
          <div className="w-10 h-10 rounded-full bg-cyan-50 text-cyan-700 flex items-center justify-center">
            <Cloud className="w-5 h-5 stroke-[2.2]" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 font-display tabular-nums">
            {stats.co2} kg
          </div>
          <span className="text-xs text-slate-500 font-medium">
            CO₂ Saved
          </span>
        </div>
      </div>

      {/* Your Streak Progress Track (Screen 8 in Storyboard) */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-amber-500 fill-amber-500" />
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wide">
              Your Streak
            </span>
          </div>
          <span className="text-sm font-extrabold text-slate-900 tabular-nums">
            {user.streakDays} days
          </span>
        </div>

        {/* 7-step track with milestone icon at the end */}
        <div className="flex items-center gap-1.5 py-1">
          {[1, 2, 3, 4, 5, 6].map((i) => {
            const isCompleted = i <= user.streakDays;
            return (
              <div key={i} className="flex-1 flex items-center">
                <div
                  className={`w-full h-2 rounded-full transition-all ${
                    isCompleted ? 'bg-[#2E7D4F]' : 'bg-slate-200'
                  }`}
                />
              </div>
            );
          })}
          {/* Day 7 badge target */}
          <div className="w-8 h-8 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-800 shrink-0">
            <Award className="w-4 h-4 stroke-[2.2]" />
          </div>
        </div>

        <p className="text-xs text-center text-emerald-800 font-medium">
          {Math.max(0, user.nextBadgeDays - user.streakDays)} more days for your next badge!
        </p>
      </div>

      {/* Campus Community Collective Impact Card */}
      <div className="bg-gradient-to-br from-[#F5F8F4] to-[#E9F0E7] p-4 rounded-2xl border border-[#D5E4D2] space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-emerald-800" />
            <h4 className="text-xs font-bold text-emerald-950 uppercase tracking-wider">
              MVGR College Collective
            </h4>
          </div>
          <span className="text-[11px] text-emerald-800 font-semibold">
            Campus Total
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
          <div className="bg-white/80 p-2.5 rounded-xl border border-emerald-100">
            <span className="text-slate-500 block text-[11px]">Campus CO₂ Avoided</span>
            <span className="text-base font-bold text-slate-900 tabular-nums">1,420 kg</span>
          </div>
          <div className="bg-white/80 p-2.5 rounded-xl border border-emerald-100">
            <span className="text-slate-500 block text-[11px]">Items Kept from Landfill</span>
            <span className="text-base font-bold text-slate-900 tabular-nums">854 items</span>
          </div>
        </div>
      </div>
    </div>
  );
};
