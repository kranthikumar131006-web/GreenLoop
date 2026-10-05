import React, { useState } from 'react';
import { Flame, Coins, Package, Gift, BarChart3, Settings, ChevronRight, ShieldCheck, Award, LogOut, RotateCcw } from 'lucide-react';
import { ScreenId, UserProfile } from '../../types';
import { KavyaAvatar } from '../common/EcoGraphics';
import { sound } from '../../utils/sound';

interface ProfileScreenProps {
  user: UserProfile;
  onNavigate: (screen: ScreenId) => void;
  onResetData: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  user,
  onNavigate,
  onResetData,
}) => {
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  const menuItems = [
    {
      id: 'items',
      label: 'My Items',
      icon: Package,
      action: () => {
        sound.tap();
        onNavigate('swap');
      },
    },
    {
      id: 'rewards',
      label: 'My Rewards',
      icon: Gift,
      action: () => {
        sound.tap();
        onNavigate('rewards');
      },
    },
    {
      id: 'impact',
      label: 'Impact Report',
      icon: BarChart3,
      action: () => {
        sound.tap();
        onNavigate('impact');
      },
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      action: () => {
        sound.tap();
        setShowSettingsModal(true);
      },
    },
  ];

  return (
    <div className="p-4 space-y-5 pb-12">
      {/* Profile Header Block (Screen 10 in Storyboard) */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-2xs text-center flex flex-col items-center">
        {/* Avatar */}
        <div className="relative mb-3">
          <KavyaAvatar size={76} />
          <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center border-2 border-white shadow-2xs">
            <ShieldCheck className="w-3 h-3" />
          </span>
        </div>

        {/* Name & Academic info */}
        <h2 className="text-xl font-bold text-slate-900 font-display">
          {user.name}
        </h2>
        <p className="text-xs text-slate-500 font-medium mt-0.5">
          {user.year} · {user.department}
        </p>
        <p className="text-[11px] text-slate-400">
          {user.college}
        </p>

        {/* Member Status Badge */}
        <div className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
          <span className="text-sm" role="img" aria-label="sprout">🌱</span>
          <span>Green Loop Member</span>
        </div>
      </div>

      {/* Stats Row: 4 Day Streak | 120 Credits (Screen 10 in Storyboard) */}
      <div className="grid grid-cols-2 gap-3">
        {/* Day Streak */}
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
          className="bg-white p-3.5 rounded-2xl border border-slate-200/90 shadow-2xs flex items-center gap-3 cursor-pointer hover:border-amber-300 transition-colors"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center">
            <Flame className="w-5 h-5 fill-amber-500" />
          </div>
          <div>
            <span className="text-xl font-bold text-slate-900 block font-display tabular-nums">
              {user.streakDays}
            </span>
            <span className="text-xs text-slate-500 font-medium">Day Streak</span>
          </div>
        </div>

        {/* Credits */}
        <div
          role="button"
          tabIndex={0}
          onClick={() => {
            sound.tap();
            onNavigate('credits');
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              sound.tap();
              onNavigate('credits');
            }
          }}
          className="bg-white p-3.5 rounded-2xl border border-slate-200/90 shadow-2xs flex items-center gap-3 cursor-pointer hover:border-amber-300 transition-colors"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Coins className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xl font-bold text-slate-900 block font-display tabular-nums">
              {user.credits}
            </span>
            <span className="text-xs text-slate-500 font-medium">Credits</span>
          </div>
        </div>
      </div>

      {/* Profile Menu List (Screen 10 in Storyboard) */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs divide-y divide-slate-100 overflow-hidden">
        {menuItems.map((item) => {
          const IconComp = item.icon;
          return (
            <button
              key={item.id}
              onClick={item.action}
              className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-50/80 transition-colors group active:bg-slate-100 min-h-[56px]"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-slate-50 text-slate-700 flex items-center justify-center group-hover:bg-emerald-50 group-hover:text-emerald-700 transition-colors">
                  <IconComp className="w-4 h-4" />
                </div>
                <span className="text-sm font-semibold text-slate-800">
                  {item.label}
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-700 transition-colors" />
            </button>
          );
        })}
      </div>

      {/* College Campus Info Card */}
      <div className="p-3 bg-[#F4F8F4] rounded-2xl border border-[#D9EADB] flex items-center justify-between text-xs text-slate-600">
        <div>
          <span className="font-semibold text-emerald-950 block">Campus Chapter</span>
          <span className="text-[11px] text-emerald-800">MVGR College of Engineering Eco Club</span>
        </div>
        <span className="text-[10px] font-bold text-emerald-800 bg-white px-2 py-1 rounded-md border border-emerald-200">
          Rank #14 CSE
        </span>
      </div>

      {/* Settings Modal */}
      {showSettingsModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-base font-display">
                App Settings
              </h3>
              <button
                onClick={() => setShowSettingsModal(false)}
                className="text-xs font-semibold text-slate-500 hover:text-slate-800"
              >
                Close
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-600">
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                <span>Daily Eco Reminder</span>
                <span className="font-semibold text-emerald-700">9:00 AM</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                <span>Sound Feedback</span>
                <span className="font-semibold text-emerald-700">Enabled</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                <span>Campus Department</span>
                <span className="font-semibold text-slate-800">CSE (2nd Year)</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex gap-2">
              <button
                onClick={() => {
                  sound.tap();
                  onResetData();
                  setShowSettingsModal(false);
                }}
                className="flex-1 py-2.5 px-3 rounded-xl border border-rose-200 text-rose-700 hover:bg-rose-50 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Demo Data</span>
              </button>
              <button
                onClick={() => setShowSettingsModal(false)}
                className="flex-1 py-2.5 px-3 rounded-xl bg-[#2E7D4F] text-white text-xs font-semibold hover:bg-[#256640] transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
