import React from 'react';
import { ChevronLeft, User, MapPin, Calendar, ShieldCheck, Check, Sparkles } from 'lucide-react';
import { SwapItem } from '../../types';
import {
  BookIsometricGraphic,
  HoodieGraphic,
  NotebooksGraphic,
  CalculatorGraphic,
  StudyLampGraphic,
} from '../common/EcoGraphics';
import { sound } from '../../utils/sound';

interface ItemDetailScreenProps {
  item: SwapItem;
  onBack: () => void;
  onTakeItem: (item: SwapItem) => void;
}

export const ItemDetailScreen: React.FC<ItemDetailScreenProps> = ({
  item,
  onBack,
  onTakeItem,
}) => {
  const renderBigGraphic = () => {
    switch (item.itemTypeIcon) {
      case 'book':
        return <BookIsometricGraphic size={140} />;
      case 'hoodie':
        return <HoodieGraphic size={110} />;
      case 'notebook':
        return <NotebooksGraphic size={110} />;
      case 'calculator':
        return <CalculatorGraphic size={110} />;
      case 'lamp':
        return <StudyLampGraphic size={110} />;
      default:
        return <BookIsometricGraphic size={130} />;
    }
  };

  return (
    <div className="p-4 space-y-5 pb-16">
      {/* Big Visual Showcase Card (Screen 9 in Storyboard) */}
      <div className="w-full bg-[#FAF7F0] border border-[#E9DFCE] rounded-3xl p-6 flex items-center justify-center shadow-xs relative overflow-hidden">
        {/* Soft background glow */}
        <div className="absolute w-40 h-40 bg-emerald-100/50 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10 py-3 transition-transform hover:scale-105 duration-300">
          {renderBigGraphic()}
        </div>
      </div>

      {/* Item Title & Unboxed Metadata (Screen 9 in Storyboard) */}
      <div className="space-y-2">
        <h2 className="text-xl font-bold text-slate-900 font-display">
          {item.name}
        </h2>

        {/* Unboxed metadata tags: Book · Good condition (Frontend design zero-pill compliant) */}
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800">
          <span className="capitalize">{item.category}</span>
          <span aria-hidden="true" className="text-slate-400">·</span>
          <span>{item.condition}</span>
          <span aria-hidden="true" className="text-slate-400">·</span>
          <span className="text-slate-600 font-normal">{item.isFree ? 'Free Campus Swap' : 'Exchange'}</span>
        </div>
      </div>

      {/* Description Text (Screen 9: "Useful for 1st year students. No torn pages.") */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs space-y-2">
        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
          Description
        </h4>
        <p className="text-sm text-slate-700 leading-relaxed">
          {item.description}
        </p>
      </div>

      {/* Posted By & Location (Screen 9: "Posted by: Ananya (2nd Year)") */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-800 font-bold text-sm">
              {item.postedBy.name[0]}
            </div>
            <div>
              <span className="text-xs text-slate-500 block">Posted by:</span>
              <span className="text-sm font-bold text-slate-900">
                {item.postedBy.name} ({item.postedBy.year} · {item.postedBy.department})
              </span>
            </div>
          </div>
          <span className="text-xs text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md font-medium flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            Verified
          </span>
        </div>

        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
          <div className="flex items-center gap-1.5 truncate">
            <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
            <span className="truncate">{item.location}</span>
          </div>
          <span className="text-slate-400 shrink-0 ml-2">{item.datePosted}</span>
        </div>
      </div>

      {/* Bottom Sticky Action: "Take Item" CTA Button (Screen 9 in Storyboard) */}
      <div className="pt-2">
        {item.status === 'claimed' ? (
          <div className="w-full py-3.5 px-4 rounded-2xl bg-slate-100 text-slate-500 font-semibold text-sm text-center border border-slate-200">
            This item has already been claimed
          </div>
        ) : item.isMyItem ? (
          <div className="w-full py-3.5 px-4 rounded-2xl bg-emerald-50 text-emerald-800 font-semibold text-sm text-center border border-emerald-200">
            This is your active swap listing
          </div>
        ) : (
          <button
            onClick={() => {
              sound.tap();
              onTakeItem(item);
            }}
            className="w-full py-4 px-6 rounded-2xl bg-[#2E7D4F] hover:bg-[#256640] active:scale-[0.98] text-white font-semibold text-base shadow-md shadow-emerald-900/15 flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <span>Take Item</span>
          </button>
        )}
      </div>
    </div>
  );
};
