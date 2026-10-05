export type ScreenId =
  | 'splash'
  | 'home'
  | 'streak'
  | 'swap'
  | 'donate'
  | 'credits'
  | 'rewards'
  | 'impact'
  | 'item_detail'
  | 'profile';

export type SwapCategory = 'all' | 'books' | 'clothes' | 'stationery' | 'hostel' | 'electronics';

export interface SwapItem {
  id: string;
  name: string;
  category: 'books' | 'clothes' | 'stationery' | 'hostel' | 'electronics';
  condition: 'Brand New' | 'Like New' | 'Good condition' | 'Fair';
  subtitle: string; // e.g. "Good condition · 2nd year" or "Size M · Good condition"
  description: string;
  postedBy: {
    name: string;
    year: string;
    department: string;
    rating: number;
    avatarSeed: string;
  };
  location: string;
  datePosted: string;
  isFree: boolean;
  status: 'available' | 'claimed' | 'pending';
  isMyItem?: boolean;
  itemTypeIcon: 'book' | 'hoodie' | 'notebook' | 'labcoat' | 'calculator' | 'bottle' | 'lamp';
  claimCode?: string;
  claimedAt?: string;
}

export interface DailyAction {
  day: number;
  dayLabel: string;
  title: string;
  description: string;
  icon: 'recycle' | 'leaf' | 'bike' | 'bottle' | 'sun' | 'coffee';
  completed: boolean;
  date: string;
}

export interface RewardItem {
  id: string;
  title: string;
  creditsCost: number;
  perkDescription: string;
  category: 'canteen' | 'merch' | 'event' | 'sustainability' | 'cafe';
  iconType: 'canteen' | 'shirt' | 'ticket' | 'tree' | 'coffee';
  tag: string;
  campusPartner: string;
  terms: string;
}

export interface RedeemedVoucher {
  id: string;
  rewardId: string;
  title: string;
  creditsSpent: number;
  code: string;
  redeemedDate: string;
  expiryDate: string;
  status: 'active' | 'used';
  pickupLocation: string;
}

export interface UserProfile {
  name: string;
  role: string;
  year: string;
  department: string;
  college: string;
  streakDays: number;
  nextBadgeDays: number;
  credits: number;
  co2SavedKg: number;
  itemsSwappedCount: number;
  actionsCompletedCount: number;
  todayActionDone: boolean;
}
