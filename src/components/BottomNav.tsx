import React from 'react';
import { Home, Sparkles, RefreshCw, Gift } from 'lucide-react';
import { ScreenId } from '../types';
import { sound } from '../utils/sound';

interface BottomNavProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentScreen, onNavigate }) => {
  const tabs = [
    {
      id: 'home' as ScreenId,
      label: 'Home',
      icon: Home,
      isActive: currentScreen === 'home',
    },
    {
      id: 'streak' as ScreenId,
      label: 'Actions',
      icon: Sparkles,
      isActive: currentScreen === 'streak' || currentScreen === 'impact',
    },
    {
      id: 'swap' as ScreenId,
      label: 'Swap',
      icon: RefreshCw,
      isActive: currentScreen === 'swap' || currentScreen === 'donate' || currentScreen === 'item_detail',
    },
    {
      id: 'rewards' as ScreenId,
      label: 'Rewards',
      icon: Gift,
      isActive: currentScreen === 'rewards' || currentScreen === 'credits',
    },
  ];

  return (
    <nav
      aria-label="Bottom Navigation"
      className="sticky bottom-0 left-0 right-0 z-40 bg-[#FFFFFF]/95 backdrop-blur-md border-t border-[#E5EADF] px-4 py-2 flex items-center justify-around shadow-[0_-2px_12px_rgba(0,0,0,0.03)]"
    >
      {tabs.map((tab) => {
        const IconComponent = tab.icon;
        const active = tab.isActive;
        return (
          <button
            key={tab.id}
            onClick={() => {
              sound.tap();
              onNavigate(tab.id);
            }}
            className={`flex flex-col items-center justify-center min-w-[56px] min-h-[46px] transition-colors rounded-xl py-1 px-3 ${
              active
                ? 'text-[#2E7D4F] font-semibold'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <div className="relative">
              <IconComponent
                className={`w-5 h-5 transition-transform duration-200 ${
                  active ? 'scale-110 stroke-[2.4]' : 'stroke-[1.8]'
                }`}
              />
              {active && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#2E7D4F]" />
              )}
            </div>
            <span className="text-[11px] mt-1 tracking-tight">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
