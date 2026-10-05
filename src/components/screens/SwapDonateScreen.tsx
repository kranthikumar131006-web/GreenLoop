import React, { useState } from 'react';
import { Camera, Image as ImageIcon, Sparkles, CheckCircle2 } from 'lucide-react';
import { SwapCategory, SwapItem } from '../../types';
import { sound } from '../../utils/sound';
import confetti from 'canvas-confetti';

interface SwapDonateScreenProps {
  onAddItem: (newItem: Omit<SwapItem, 'id'>) => void;
  onCancel: () => void;
}

export const SwapDonateScreen: React.FC<SwapDonateScreenProps> = ({
  onAddItem,
  onCancel,
}) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState<SwapCategory>('books');
  const [condition, setCondition] = useState<'Brand New' | 'Like New' | 'Good condition' | 'Fair'>('Good condition');
  const [extraDetails, setExtraDetails] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('Central Library Swap Shelf #3');
  const [photoSelected, setPhotoSelected] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert('Please enter an item name');
      return;
    }

    setIsSubmitting(true);
    sound.success();
    try {
      confetti({
        particleCount: 50,
        spread: 50,
        origin: { y: 0.6 },
        colors: ['#2E7D4F', '#43A047', '#F59E0B'],
      });
    } catch {
      // Ignore
    }

    // Determine icon based on category
    let itemTypeIcon: SwapItem['itemTypeIcon'] = 'book';
    if (category === 'clothes') itemTypeIcon = 'hoodie';
    else if (category === 'stationery') itemTypeIcon = 'notebook';
    else if (category === 'electronics') itemTypeIcon = 'calculator';
    else if (category === 'hostel') itemTypeIcon = 'lamp';

    const subtitle = extraDetails.trim()
      ? `${condition} · ${extraDetails.trim()}`
      : `${condition} · Free for campus peers`;

    onAddItem({
      name: name.trim(),
      category: category === 'all' ? 'books' : category,
      condition,
      subtitle,
      description: description.trim() || 'Listed for reuse by campus peers. Feel free to claim and pickup!',
      postedBy: {
        name: 'Kavya',
        year: '2nd Year',
        department: 'CSE',
        rating: 5.0,
        avatarSeed: 'kavya',
      },
      location,
      datePosted: 'Just now',
      isFree: true,
      status: 'available',
      isMyItem: true,
      itemTypeIcon,
    });
  };

  return (
    <div className="p-4 space-y-4 pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900 font-display">
            Donate to Swap Box
          </h2>
          <p className="text-xs text-slate-500">
            Pass on items you no longer use &amp; earn +20 Green Credits!
          </p>
        </div>
        <span className="text-xs font-semibold text-emerald-800 bg-emerald-100/80 px-2.5 py-1 rounded-full flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
          <span>+20 Credits</span>
        </span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Photo Container (Screen 5 in Storyboard) */}
        <div>
          <button
            type="button"
            onClick={() => {
              sound.tap();
              setPhotoSelected(photoSelected ? null : 'photo_attached');
            }}
            className={`w-full h-36 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center transition-all ${
              photoSelected
                ? 'border-emerald-500 bg-emerald-50/60 text-emerald-800'
                : 'border-slate-300 hover:border-emerald-400 bg-slate-50/80 text-slate-500'
            }`}
          >
            {photoSelected ? (
              <div className="flex flex-col items-center gap-1.5">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700">
                  <CheckCircle2 className="w-6 h-6 stroke-[2.2]" />
                </div>
                <span className="text-xs font-semibold text-emerald-800">
                  Item Photo Attached
                </span>
                <span className="text-[10px] text-emerald-600">
                  Click to remove / re-upload
                </span>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-1.5">
                <div className="w-10 h-10 rounded-full bg-white shadow-2xs flex items-center justify-center text-slate-600">
                  <Camera className="w-5 h-5" />
                </div>
                <span className="text-xs font-semibold text-slate-700">
                  Add photo
                </span>
                <span className="text-[11px] text-slate-400">(optional)</span>
              </div>
            )}
          </button>
        </div>

        {/* Item Name * (Screen 5: "e.g. Textbook, T-shirt") */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-700 block">
            Item Name <span className="text-emerald-700">*</span>
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Textbook, T-shirt, Scientific Calculator"
            className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 shadow-2xs"
          />
        </div>

        {/* Category * Dropdown */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-700 block">
            Category <span className="text-emerald-700">*</span>
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as SwapCategory)}
            className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 shadow-2xs"
          >
            <option value="books">Books &amp; Study Material</option>
            <option value="clothes">Clothes &amp; Apparel</option>
            <option value="stationery">Stationery &amp; Notebooks</option>
            <option value="hostel">Hostel &amp; Dorm Essentials</option>
            <option value="electronics">Electronics &amp; Gadgets</option>
          </select>
        </div>

        {/* Condition & Spec Tag */}
        <div className="grid grid-cols-2 gap-2.5">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 block">
              Condition
            </label>
            <select
              value={condition}
              onChange={(e) => setCondition(e.target.value as typeof condition)}
              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 shadow-2xs"
            >
              <option value="Brand New">Brand New (Unused)</option>
              <option value="Like New">Like New</option>
              <option value="Good condition">Good condition</option>
              <option value="Fair">Fair (Usable)</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 block">
              Tag / Year / Size
            </label>
            <input
              type="text"
              value={extraDetails}
              onChange={(e) => setExtraDetails(e.target.value)}
              placeholder="e.g. 2nd year, Size L"
              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 shadow-2xs"
            >
            </input>
          </div>
        </div>

        {/* Dropoff Campus Spot */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-700 block">
            Campus Drop-off Spot
          </label>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 shadow-2xs"
          >
            <option value="Central Library Swap Shelf #3">Central Library Swap Shelf #3</option>
            <option value="Student Activity Center (SAC) Drop Box">Student Activity Center (SAC) Drop Box</option>
            <option value="Hostel Block A Common Room">Hostel Block A Common Room</option>
            <option value="Girls Hostel Block B Lounge">Girls Hostel Block B Lounge</option>
            <option value="Mechanical Workshop Notice Desk">Mechanical Workshop Notice Desk</option>
          </select>
        </div>

        {/* Description (Screen 5: "Any additional details (condition, size, etc.)") */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-700 block">
            Description
          </label>
          <textarea
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Any additional details (condition, size, edition, etc.)"
            className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 shadow-2xs resize-none"
          />
        </div>

        {/* List Item CTA Button (Screen 5: "List Item") */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 px-4 bg-[#2E7D4F] hover:bg-[#256640] active:scale-[0.98] text-white font-semibold text-sm rounded-xl shadow-md shadow-emerald-900/15 flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <span>List Item (+20 Credits)</span>
          </button>

          <button
            type="button"
            onClick={onCancel}
            className="w-full py-2.5 text-xs text-slate-500 hover:text-slate-800 font-medium text-center mt-2"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
