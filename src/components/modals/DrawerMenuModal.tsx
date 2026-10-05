import React from 'react';
import { X, Sparkles, Home, Flame, RefreshCw, Gift, BarChart3, User, MapPin, PlusCircle, ExternalLink } from 'lucide-react';
import { ScreenId, UserProfile } from '../../types';
import { GreenLoopLogo } from '../common/EcoGraphics';
import { sound } from '../../utils/sound';

interface DrawerMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (screen: ScreenId) => void;
  user: UserProfile;
  onOpenCampusMap: () => void;
}

export const DrawerMenuModal: React.FC<DrawerMenuModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
  user,
  onOpenCampusMap,
}) => {
  if (!isOpen) return null;

  const navLinks: { id: ScreenId; label: string; icon: React.ElementType; badge?: string }[] = [
    { id: 'home', label: 'Home / Dashboard', icon: Home },
    { id: 'streak', label: 'Daily Eco Streak', icon: Flame, badge: `${user.streakDays}d` },
    { id: 'swap', label: 'Campus Swap Box', icon: RefreshCw },
    { id: 'donate', label: 'Donate an Item', icon: PlusCircle, badge: '+20' },
    { id: 'credits', label: 'Green Credits Wallet', icon: Gift, badge: `${user.credits}` },
    { id: 'rewards', label: 'Rewards Redemption', icon: Sparkles },
    { id: 'impact', label: 'Your Impact & Stats', icon: BarChart3 },
    { id: 'profile', label: 'Student Profile', icon: User },
  ];

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div
        role="button"
        tabIndex={0}
        aria-label="Close navigation menu"
        onClick={() => {
          sound.tap();
          onClose();
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape') {
            e.preventDefault();
            sound.tap();
            onClose();
          }
        }}
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity cursor-pointer"
      />

      {/* Slide-out drawer container */}
      <div className="relative w-72 max-w-[85vw] h-full bg-[#FCFDFB] text-slate-800 shadow-2xl flex flex-col justify-between p-5 z-10 border-r border-[#E0E8DC] animate-in slide-in-from-left duration-250">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-200/80">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center">
                <GreenLoopLogo size={26} />
              </div>
              <div>
                <h3 className="font-bold text-base text-slate-900 font-display">
                  GreenLoop
                </h3>
                <span className="text-[10px] text-emerald-800 font-semibold uppercase tracking-wider block">
                  Campus Eco Loop
                </span>
              </div>
            </div>
            <button
              onClick={() => {
                sound.tap();
                onClose();
              }}
              className="p-1.5 text-slate-400 hover:text-slate-800 rounded-lg hover:bg-slate-100"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* User mini banner */}
          <div className="my-4 p-3 bg-emerald-50/80 rounded-2xl border border-emerald-200 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-sm shadow-xs">
              K
            </div>
            <div className="min-w-0">
              <span className="font-bold text-xs text-slate-900 block truncate">
                {user.name} ({user.department})
              </span>
              <span className="text-[11px] text-emerald-800 font-medium">
                {user.credits} Credits · {user.streakDays} Day Streak
              </span>
            </div>
          </div>

          {/* Nav links */}
          <nav className="space-y-1">
            {navLinks.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    sound.tap();
                    onNavigate(item.id);
                    onClose();
                  }}
                  className="w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-emerald-100/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 text-emerald-700" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}

            {/* Campus map trigger */}
            <button
              onClick={() => {
                sound.tap();
                onOpenCampusMap();
                onClose();
              }}
              className="w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-emerald-100/50 transition-colors mt-2"
            >
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-emerald-700" />
                <span>Campus Eco Map</span>
              </div>
              <span className="text-[10px] font-semibold text-slate-500">5 spots</span>
            </button>
          </nav>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-200/80 text-[11px] text-slate-500 space-y-1">
          <p className="font-semibold text-slate-700">MVGR College of Engineering</p>
          <p>Circular Economy &amp; Zero-Waste Initiative</p>
          <p className="text-[10px] text-emerald-700 font-medium">Design faithfully based on storyboard</p>
        </div>
      </div>
    </div>
  );
};
