import React from 'react';
import { X, MapPin, Navigation, CheckCircle2 } from 'lucide-react';
import { sound } from '../../utils/sound';

interface CampusLockerMapModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CampusLockerMapModal: React.FC<CampusLockerMapModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const locations = [
    {
      name: 'Central Library Swap Shelf #3',
      zone: 'Academic Block 1 · Ground Floor',
      items: 'Books, study guides, engineering calculators',
      hours: '8:30 AM – 8:00 PM',
      color: 'bg-emerald-500',
    },
    {
      name: 'Student Activity Center (SAC) Drop Box',
      zone: 'SAC Building · Room 104',
      items: 'Eco swag redemption, general items, stationery',
      hours: '9:00 AM – 6:00 PM',
      color: 'bg-blue-500',
    },
    {
      name: 'Girls Hostel Block B Lounge',
      zone: 'Hostel Quad · 1st Floor Common Area',
      items: 'Study lamps, room decor, apparel swap rack',
      hours: '24/7 for residents',
      color: 'bg-purple-500',
    },
    {
      name: 'Boys Hostel Block A Common Room',
      zone: 'Hostel Quad · Ground Floor',
      items: 'Hoodies, sportswear, kettle & mini appliances',
      hours: '24/7 for residents',
      color: 'bg-amber-500',
    },
    {
      name: 'Mechanical Workshop Notice Desk',
      zone: 'Workshop Complex · Desk B',
      items: 'Drafting tools, lab coats, mechanical charts',
      hours: '9:00 AM – 5:00 PM',
      color: 'bg-rose-500',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 text-left space-y-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <MapPin className="w-4 h-4 stroke-[2.2]" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base font-display">
                Campus Swap &amp; Eco Spots
              </h3>
              <p className="text-[11px] text-slate-500">
                MVGR College of Engineering Verified Hubs
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              sound.tap();
              onClose();
            }}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Visual stylized campus schematic mini map */}
        <div className="h-32 w-full rounded-2xl bg-[#EAF2E8] border border-[#CCDDC8] relative overflow-hidden p-3 flex items-center justify-center">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#2E7D4F_1px,transparent_1px)] [background-size:12px_12px]" />
          {/* Stylized buildings & pin dots */}
          <div className="absolute top-4 left-6 px-2 py-1 bg-white/90 rounded-md text-[10px] font-bold text-emerald-900 shadow-2xs border border-emerald-200 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-600" />
            Central Library
          </div>
          <div className="absolute top-16 right-8 px-2 py-1 bg-white/90 rounded-md text-[10px] font-bold text-blue-900 shadow-2xs border border-blue-200 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-blue-600" />
            SAC Hub
          </div>
          <div className="absolute bottom-3 left-10 px-2 py-1 bg-white/90 rounded-md text-[10px] font-bold text-amber-900 shadow-2xs border border-amber-200 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-amber-600" />
            Hostels
          </div>
          <span className="text-xs font-semibold text-emerald-950/60 z-10">
            Interactive Campus Eco Mesh
          </span>
        </div>

        {/* Spot listings */}
        <div className="space-y-2.5">
          {locations.map((loc) => (
            <div
              key={loc.name}
              className="p-3 bg-slate-50/80 rounded-2xl border border-slate-200 hover:border-emerald-300 transition-colors"
            >
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-xs text-slate-900 flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${loc.color}`} />
                  {loc.name}
                </h4>
                <span className="text-[10px] text-slate-500 font-medium">{loc.hours}</span>
              </div>
              <p className="text-[11px] text-emerald-800 font-medium mt-1">
                📍 {loc.zone}
              </p>
              <p className="text-[11px] text-slate-600 mt-0.5">
                {loc.items}
              </p>
            </div>
          ))}
        </div>

        <button
          onClick={() => {
            sound.tap();
            onClose();
          }}
          className="w-full py-2.5 px-4 bg-[#2E7D4F] hover:bg-[#256640] text-white font-semibold text-xs rounded-xl shadow-xs"
        >
          Close Map
        </button>
      </div>
    </div>
  );
};
