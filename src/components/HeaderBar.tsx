import React from 'react';
import { ChevronLeft, Menu, Settings, User } from 'lucide-react';
import { ScreenId } from '../types';
import { sound } from '../utils/sound';

interface HeaderBarProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  onOpenDrawer?: () => void;
  titleOverride?: string;
  showBack?: boolean;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({
  currentScreen,
  onNavigate,
  onOpenDrawer,
  titleOverride,
  showBack,
}) => {
  // Screen title mapping from storyboard
  const getTitle = () => {
    if (titleOverride) return titleOverride;
    switch (currentScreen) {
      case 'home':
        return 'GreenLoop';
      case 'streak':
        return 'Green Streak';
      case 'swap':
        return 'Campus Swap Box';
      case 'donate':
        return 'Donate Item';
      case 'credits':
        return 'Green Credits';
      case 'rewards':
        return 'Rewards';
      case 'impact':
        return 'Your Impact';
      case 'item_detail':
        return 'Item Details';
      case 'profile':
        return 'Profile';
      default:
        return 'GreenLoop';
    }
  };

  const isHome = currentScreen === 'home';
  const shouldShowBack = showBack !== undefined ? showBack : !isHome;

  return (
    <header className="sticky top-0 z-30 bg-[#FFFFFF]/90 backdrop-blur-md border-b border-[#E5EADF] px-4 py-3 flex items-center justify-between transition-all">
      {/* Left zone */}
      <div className="flex items-center min-w-[44px]">
        {shouldShowBack ? (
          <button
            onClick={() => {
              sound.tap();
              if (currentScreen === 'donate' || currentScreen === 'item_detail') {
                onNavigate('swap');
              } else if (currentScreen === 'credits') {
                onNavigate('rewards');
              } else {
                onNavigate('home');
              }
            }}
            className="flex items-center gap-1 text-slate-700 hover:text-slate-900 font-medium text-sm -ml-1 p-1.5 rounded-lg active:bg-slate-100 min-h-[44px] min-w-[44px]"
            aria-label="Back"
          >
            <ChevronLeft className="w-5 h-5 stroke-[2.2]" />
            {currentScreen === 'item_detail' && <span className="text-xs">Back</span>}
          </button>
        ) : (
          <button
            onClick={() => {
              sound.tap();
              if (onOpenDrawer) onOpenDrawer();
            }}
            className="p-2 text-slate-700 hover:text-slate-900 rounded-lg active:bg-slate-100 min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Campus Menu"
          >
            <Menu className="w-5 h-5 stroke-[2.2]" />
          </button>
        )}
      </div>

      {/* Center zone */}
      <div className="flex-1 text-center">
        <h1
          className={`font-semibold tracking-tight text-slate-800 truncate px-2 ${
            isHome ? 'text-lg font-display text-[#1C5333]' : 'text-base'
          }`}
        >
          {getTitle()}
        </h1>
      </div>

      {/* Right zone */}
      <div className="flex items-center justify-end min-w-[44px]">
        {currentScreen === 'profile' ? (
          <button
            onClick={() => {
              sound.tap();
              alert('Settings: Preferences saved. Notifications are active.');
            }}
            className="p-2 text-slate-700 hover:text-slate-900 rounded-lg active:bg-slate-100 min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Settings"
          >
            <Settings className="w-5 h-5 stroke-[2]" />
          </button>
        ) : isHome ? (
          <button
            onClick={() => {
              sound.tap();
              onNavigate('profile');
            }}
            className="p-1 rounded-full border border-emerald-200 hover:border-emerald-400 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="View Profile"
          >
            <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">
              K
            </div>
          </button>
        ) : (
          <button
            onClick={() => {
              sound.tap();
              onNavigate('profile');
            }}
            className="p-2 text-slate-600 hover:text-slate-900 rounded-lg min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="User Profile"
          >
            <User className="w-5 h-5 stroke-[2]" />
          </button>
        )}
      </div>
    </header>
  );
};
