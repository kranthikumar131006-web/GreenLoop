import React, { useState } from 'react';
import { ScreenId } from '../types';
import { Smartphone, Monitor, Volume2, VolumeX, Layers, ChevronDown } from 'lucide-react';
import { sound } from '../utils/sound';

interface StoryboardNavigatorProps {
  currentScreen: ScreenId;
  onSelectScreen: (screen: ScreenId) => void;
  isPhoneFrame: boolean;
  onTogglePhoneFrame: () => void;
  isSoundEnabled: boolean;
  onToggleSound: () => void;
}

export const StoryboardNavigator: React.FC<StoryboardNavigatorProps> = ({
  currentScreen,
  onSelectScreen,
  isPhoneFrame,
  onTogglePhoneFrame,
  isSoundEnabled,
  onToggleSound,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const screens: { id: ScreenId; num: number; label: string }[] = [
    { id: 'splash', num: 1, label: 'Splash Screen' },
    { id: 'home', num: 2, label: 'Home / Dashboard' },
    { id: 'streak', num: 3, label: 'Green Streak - Daily Action' },
    { id: 'swap', num: 4, label: 'Campus Swap Box - Browse' },
    { id: 'donate', num: 5, label: 'Campus Swap Box - Donate Item' },
    { id: 'credits', num: 6, label: 'Reverse Rewards - Credits' },
    { id: 'rewards', num: 7, label: 'Rewards Redemption' },
    { id: 'impact', num: 8, label: 'Progress & Impact' },
    { id: 'item_detail', num: 9, label: 'Swap Box - Item Detail' },
    { id: 'profile', num: 10, label: 'Profile / Settings' },
  ];

  const currentMeta = screens.find((s) => s.id === currentScreen) || screens[1];

  return (
    <div className="bg-[#1C3B28] text-white border-b border-[#2B543B] px-4 py-2 flex flex-wrap items-center justify-between gap-3 text-xs z-50 sticky top-0 shadow-md">
      {/* Left: Brand & Storyboard Quick Jump dropdown */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5 font-bold tracking-tight text-emerald-300">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-display text-sm tracking-normal text-white">GreenLoop</span>
          <span className="text-[10px] text-emerald-300/80 font-normal">Storyboard</span>
        </div>

        {/* Screen Picker Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              sound.tap();
              setIsOpen(!isOpen);
            }}
            className="flex items-center gap-2 bg-[#2B543B] hover:bg-[#346648] px-3 py-1.5 rounded-lg font-medium transition-colors border border-emerald-500/30"
          >
            <span className="w-5 h-5 rounded-full bg-emerald-500 text-[#0E2818] font-bold text-[11px] flex items-center justify-center">
              {currentMeta.num}
            </span>
            <span className="max-w-[150px] sm:max-w-[220px] truncate">
              {currentMeta.label}
            </span>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </button>

          {isOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setIsOpen(false)}
              />
              <div className="absolute left-0 mt-1.5 w-72 bg-[#1A3324] border border-[#356145] rounded-xl shadow-2xl py-1 z-50 max-h-80 overflow-y-auto">
                <div className="px-3 py-1.5 text-[10px] font-bold text-emerald-400 uppercase tracking-wider border-b border-emerald-900/60">
                  Select Storyboard Screen
                </div>
                {screens.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => {
                      sound.tap();
                      onSelectScreen(s.id);
                      setIsOpen(false);
                    }}
                    className={`w-full px-3 py-2 text-left flex items-center gap-2.5 text-xs hover:bg-[#254A34] transition-colors ${
                      currentScreen === s.id
                        ? 'bg-[#2E5C41] text-emerald-200 font-semibold'
                        : 'text-slate-200'
                    }`}
                  >
                    <span className="w-5 h-5 rounded-full bg-emerald-900/80 text-emerald-300 border border-emerald-700/60 text-[10px] font-bold flex items-center justify-center shrink-0">
                      {s.num}
                    </span>
                    <span className="truncate">{s.label}</span>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Right: Viewport Mode Switcher & Sound Toggle */}
      <div className="flex items-center gap-2">
        {/* Device frame toggle */}
        <button
          onClick={() => {
            sound.tap();
            onTogglePhoneFrame();
          }}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg font-medium transition-all ${
            isPhoneFrame
              ? 'bg-emerald-500 text-[#0F2819] font-bold shadow-xs'
              : 'bg-[#2B543B] text-slate-300 hover:text-white'
          }`}
          title={isPhoneFrame ? 'Switch to Full Width View' : 'Switch to Mobile Phone Simulator'}
        >
          {isPhoneFrame ? <Smartphone className="w-3.5 h-3.5" /> : <Monitor className="w-3.5 h-3.5" />}
          <span className="hidden sm:inline">
            {isPhoneFrame ? 'Mobile Frame' : 'Full Width'}
          </span>
        </button>

        {/* Audio feedback toggle */}
        <button
          onClick={() => {
            onToggleSound();
          }}
          className="p-1.5 bg-[#2B543B] hover:bg-[#346648] text-slate-300 hover:text-white rounded-lg transition-colors"
          title={isSoundEnabled ? 'Mute Sound Effects' : 'Enable Sound Effects'}
        >
          {isSoundEnabled ? <Volume2 className="w-4 h-4 text-emerald-300" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
        </button>
      </div>
    </div>
  );
};
