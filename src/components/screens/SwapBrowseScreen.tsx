import React, { useState, useMemo } from 'react';
import { Search, BookOpen, Shirt, PenTool, Home as HomeIcon, Cpu, X, PlusCircle, ArrowRight } from 'lucide-react';
import { SwapCategory, SwapItem } from '../../types';
import { sound } from '../../utils/sound';
import {
  BookIsometricGraphic,
  HoodieGraphic,
  NotebooksGraphic,
  CalculatorGraphic,
  StudyLampGraphic,
} from '../common/EcoGraphics';

interface SwapBrowseScreenProps {
  items: SwapItem[];
  onSelectItem: (item: SwapItem) => void;
  onTakeItem: (item: SwapItem) => void;
  onNavigateToDonate: () => void;
  onNavigateToMyItems?: () => void;
}

export const SwapBrowseScreen: React.FC<SwapBrowseScreenProps> = ({
  items,
  onSelectItem,
  onTakeItem,
  onNavigateToDonate,
}) => {
  const [activeTab, setActiveTab] = useState<'browse' | 'donate' | 'my_items'>('browse');
  const [selectedCategory, setSelectedCategory] = useState<SwapCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all' as SwapCategory, label: 'All', icon: null },
    { id: 'books' as SwapCategory, label: 'Books', icon: BookOpen },
    { id: 'clothes' as SwapCategory, label: 'Clothes', icon: Shirt },
    { id: 'stationery' as SwapCategory, label: 'Stationery', icon: PenTool },
    { id: 'hostel' as SwapCategory, label: 'Hostel Items', icon: HomeIcon },
    { id: 'electronics' as SwapCategory, label: 'Tech', icon: Cpu },
  ];

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      // Tab filter
      if (activeTab === 'my_items' && !item.isMyItem && item.status !== 'claimed') {
        return false;
      }
      // Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        return (
          item.name.toLowerCase().includes(query) ||
          item.subtitle.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query)
        );
      }
      return true;
    });
  }, [items, activeTab, selectedCategory, searchQuery]);

  const renderItemGraphic = (iconType: string) => {
    switch (iconType) {
      case 'book':
        return <BookIsometricGraphic size={48} />;
      case 'hoodie':
        return <HoodieGraphic size={44} />;
      case 'notebook':
        return <NotebooksGraphic size={44} />;
      case 'calculator':
        return <CalculatorGraphic size={44} />;
      case 'lamp':
        return <StudyLampGraphic size={44} />;
      default:
        return <BookIsometricGraphic size={44} />;
    }
  };

  return (
    <div className="p-4 space-y-4 pb-12">
      {/* 3 Sub-tabs matching Storyboard: Browse | Donate | My Items */}
      <div className="flex items-center gap-1 p-1 bg-slate-200/70 rounded-xl">
        <button
          onClick={() => {
            sound.tap();
            setActiveTab('browse');
          }}
          className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
            activeTab === 'browse'
              ? 'bg-[#E2F2E4] text-[#1E5C3B] shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Browse
        </button>

        <button
          onClick={() => {
            sound.tap();
            onNavigateToDonate();
          }}
          className="flex-1 py-2 text-xs font-semibold rounded-lg transition-all text-slate-600 hover:text-slate-900 flex items-center justify-center gap-1"
        >
          <span>Donate</span>
          <PlusCircle className="w-3.5 h-3.5 text-emerald-700" />
        </button>

        <button
          onClick={() => {
            sound.tap();
            setActiveTab('my_items');
          }}
          className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
            activeTab === 'my_items'
              ? 'bg-[#E2F2E4] text-[#1E5C3B] shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          My Items
        </button>
      </div>

      {/* Search Input Bar (Screen 4 in Storyboard: "Search items...") */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
          <Search className="w-4 h-4" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search items by name, branch, condition..."
          className="w-full pl-10 pr-9 py-2.5 bg-white border border-slate-200/90 rounded-xl text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all shadow-2xs"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Category Filter Pills (Screen 4: Books, Clothes, Stationery, Hostel Items) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1.5 pt-0.5 no-scrollbar">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          const IconComp = cat.icon;
          return (
            <button
              key={cat.id}
              onClick={() => {
                sound.tap();
                setSelectedCategory(cat.id);
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all border ${
                isSelected
                  ? 'bg-[#2E7D4F] text-white border-[#2E7D4F] shadow-xs'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {IconComp && <IconComp className="w-3.5 h-3.5" />}
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Item List Cards (Matching storyboard layout with [Take] button) */}
      <div className="space-y-3">
        {filteredItems.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center border border-slate-200 space-y-3">
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
              <Search className="w-6 h-6" />
            </div>
            <h4 className="font-semibold text-slate-800 text-sm">No items found</h4>
            <p className="text-xs text-slate-500 max-w-xs mx-auto">
              {activeTab === 'my_items'
                ? "You haven't listed or claimed any items yet. Try donating an item!"
                : 'Try adjusting your search keywords or choosing another category.'}
            </p>
            {activeTab === 'my_items' && (
              <button
                onClick={onNavigateToDonate}
                className="mt-2 py-2 px-4 bg-[#2E7D4F] text-white rounded-xl text-xs font-semibold"
              >
                Donate an Item
              </button>
            )}
          </div>
        ) : (
          filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white p-3.5 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-sm transition-all flex items-center justify-between gap-3 group"
            >
              {/* Item Graphic & Info (Clickable for detail) */}
              <div
                role="button"
                tabIndex={0}
                onClick={() => {
                  sound.tap();
                  onSelectItem(item);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    sound.tap();
                    onSelectItem(item);
                  }
                }}
                className="flex items-center gap-3.5 flex-1 min-w-0 text-left cursor-pointer"
              >
                {/* Visual Thumbnail Container */}
                <div className="w-14 h-14 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 p-1 group-hover:scale-105 transition-transform">
                  {renderItemGraphic(item.itemTypeIcon)}
                </div>

                {/* Unboxed Metadata & Title */}
                <div className="min-w-0 flex-1">
                  <h4 className="font-bold text-slate-900 text-sm tracking-tight truncate group-hover:text-emerald-800 transition-colors">
                    {item.name}
                  </h4>
                  {/* Clean unboxed subtitle with dot separator */}
                  <p className="text-xs text-slate-500 mt-0.5 truncate font-medium">
                    {item.subtitle}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-1 truncate">
                    📍 {item.location}
                  </p>
                </div>
              </div>

              {/* Action Button: [Take] button matching storyboard */}
              <div className="shrink-0 flex items-center gap-2">
                {item.status === 'claimed' ? (
                  <span className="text-[11px] font-semibold text-slate-400 bg-slate-100 px-3 py-1.5 rounded-xl">
                    Claimed
                  </span>
                ) : item.isMyItem ? (
                  <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1.5 rounded-xl border border-emerald-200">
                    Your listing
                  </span>
                ) : (
                  <button
                    onClick={() => {
                      sound.tap();
                      onTakeItem(item);
                    }}
                    className="py-1.5 px-4 bg-[#2E7D4F] hover:bg-[#256640] active:scale-95 text-white font-semibold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <span>Take</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
