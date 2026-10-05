import React, { useState, useEffect } from 'react';
import { ScreenId, SwapItem, RewardItem, RedeemedVoucher, DailyAction, UserProfile } from './types';
import { INITIAL_USER, INITIAL_PAST_ACTIONS, INITIAL_SWAP_ITEMS, INITIAL_REWARDS } from './data/mockData';
import { sound } from './utils/sound';

// Components
import { StoryboardNavigator } from './components/StoryboardNavigator';
import { MobileFrame } from './components/MobileFrame';
import { HeaderBar } from './components/HeaderBar';
import { BottomNav } from './components/BottomNav';

// Screens
import { SplashScreen } from './components/screens/SplashScreen';
import { HomeScreen } from './components/screens/HomeScreen';
import { StreakScreen } from './components/screens/StreakScreen';
import { SwapBrowseScreen } from './components/screens/SwapBrowseScreen';
import { SwapDonateScreen } from './components/screens/SwapDonateScreen';
import { CreditsScreen } from './components/screens/CreditsScreen';
import { RewardsScreen } from './components/screens/RewardsScreen';
import { ImpactScreen } from './components/screens/ImpactScreen';
import { ItemDetailScreen } from './components/screens/ItemDetailScreen';
import { ProfileScreen } from './components/screens/ProfileScreen';

// Modals
import { ClaimSuccessModal } from './components/modals/ClaimSuccessModal';
import { RedeemVoucherModal } from './components/modals/RedeemVoucherModal';
import { DrawerMenuModal } from './components/modals/DrawerMenuModal';
import { CampusLockerMapModal } from './components/modals/CampusLockerMapModal';

export default function App() {
  // App State
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('home');
  const [isPhoneFrame, setIsPhoneFrame] = useState(true);
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);

  // Data State with LocalStorage resilience
  const [user, setUser] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('greenloop_user');
      return saved ? JSON.parse(saved) : INITIAL_USER;
    } catch {
      return INITIAL_USER;
    }
  });

  const [swapItems, setSwapItems] = useState<SwapItem[]>(() => {
    try {
      const saved = localStorage.getItem('greenloop_items');
      return saved ? JSON.parse(saved) : INITIAL_SWAP_ITEMS;
    } catch {
      return INITIAL_SWAP_ITEMS;
    }
  });

  const [pastActions, setPastActions] = useState<DailyAction[]>(() => {
    try {
      const saved = localStorage.getItem('greenloop_actions');
      return saved ? JSON.parse(saved) : INITIAL_PAST_ACTIONS;
    } catch {
      return INITIAL_PAST_ACTIONS;
    }
  });

  const [vouchers, setVouchers] = useState<RedeemedVoucher[]>(() => {
    try {
      const saved = localStorage.getItem('greenloop_vouchers');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Selected item for detail view (defaults to Engineering Mathematics Book from storyboard)
  const [selectedItem, setSelectedItem] = useState<SwapItem>(() => swapItems[0]);

  // Modal states
  const [claimSuccessData, setClaimSuccessData] = useState<{ item: SwapItem; code: string } | null>(null);
  const [activeVoucherModal, setActiveVoucherModal] = useState<RedeemedVoucher | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isCampusMapOpen, setIsCampusMapOpen] = useState(false);

  // Sync state to local storage
  useEffect(() => {
    localStorage.setItem('greenloop_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('greenloop_items', JSON.stringify(swapItems));
  }, [swapItems]);

  useEffect(() => {
    localStorage.setItem('greenloop_actions', JSON.stringify(pastActions));
  }, [pastActions]);

  useEffect(() => {
    localStorage.setItem('greenloop_vouchers', JSON.stringify(vouchers));
  }, [vouchers]);

  // Sound sync
  const toggleSound = () => {
    const next = !isSoundEnabled;
    setIsSoundEnabled(next);
    sound.enabled = next;
    if (next) sound.tap();
  };

  // 1. Complete Today's Eco Action (Screen 3)
  const handleCompleteTodayAction = () => {
    if (user.todayActionDone) return;

    setUser((prev) => ({
      ...prev,
      streakDays: prev.streakDays + 1,
      credits: prev.credits + 10,
      todayActionDone: true,
      actionsCompletedCount: prev.actionsCompletedCount + 1,
      co2SavedKg: Number((prev.co2SavedKg + 0.3).toFixed(1)),
    }));

    setPastActions((prev) => [
      {
        day: prev.length + 1,
        dayLabel: `Day ${prev.length + 1}`,
        title: 'Reusable bottle',
        description: 'Refilled water at campus RO station, zero plastic waste.',
        icon: 'bottle',
        completed: true,
        date: 'Today',
      },
      ...prev,
    ]);
  };

  // 2. Donate / List an item (Screen 5)
  const handleAddItem = (newItemData: Omit<SwapItem, 'id'>) => {
    const newItem: SwapItem = {
      ...newItemData,
      id: `swap-${Date.now()}`,
    };

    setSwapItems((prev) => [newItem, ...prev]);

    setUser((prev) => ({
      ...prev,
      credits: prev.credits + 20,
      itemsSwappedCount: prev.itemsSwappedCount + 1,
      co2SavedKg: Number((prev.co2SavedKg + 0.8).toFixed(1)),
    }));

    setCurrentScreen('swap');
  };

  // 3. Take / Claim an item (Screen 4 & Screen 9)
  const handleTakeItem = (item: SwapItem) => {
    const code = `GL-SWAP-${Math.floor(1000 + Math.random() * 9000)}`;

    setSwapItems((prev) =>
      prev.map((i) =>
        i.id === item.id ? { ...i, status: 'claimed' as const, claimCode: code } : i
      )
    );

    setUser((prev) => ({
      ...prev,
      credits: prev.credits + 5, // Eco reuse bonus
      co2SavedKg: Number((prev.co2SavedKg + 0.5).toFixed(1)),
    }));

    setClaimSuccessData({ item, code });
  };

  // 4. Redeem a Reward (Screen 7)
  const handleRedeemReward = (reward: RewardItem) => {
    if (user.credits < reward.creditsCost) return;

    const voucherCode = `MVGR-${reward.category.slice(0, 3).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const newVoucher: RedeemedVoucher = {
      id: `vouch-${Date.now()}`,
      rewardId: reward.id,
      title: reward.title,
      creditsSpent: reward.creditsCost,
      code: voucherCode,
      redeemedDate: 'Today',
      expiryDate: 'In 30 days',
      status: 'active',
      pickupLocation: reward.campusPartner,
    };

    setUser((prev) => ({
      ...prev,
      credits: prev.credits - reward.creditsCost,
    }));

    setVouchers((prev) => [newVoucher, ...prev]);
    setActiveVoucherModal(newVoucher);
  };

  // 5. Earn quick credits (Screen 6)
  const handleEarnQuickCredits = (amount: number) => {
    setUser((prev) => ({
      ...prev,
      credits: prev.credits + amount,
      co2SavedKg: Number((prev.co2SavedKg + 0.1).toFixed(1)),
    }));
  };

  // Reset demo data to match storyboard state exactly
  const handleResetData = () => {
    setUser(INITIAL_USER);
    setSwapItems(INITIAL_SWAP_ITEMS);
    setPastActions(INITIAL_PAST_ACTIONS);
    setVouchers([]);
    localStorage.removeItem('greenloop_user');
    localStorage.removeItem('greenloop_items');
    localStorage.removeItem('greenloop_actions');
    localStorage.removeItem('greenloop_vouchers');
    sound.tap();
  };

  // Render current active screen
  const renderScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return <SplashScreen onEnter={() => setCurrentScreen('home')} />;
      case 'home':
        return (
          <HomeScreen
            user={user}
            onNavigate={setCurrentScreen}
            onOpenEcoTipModal={() => setIsCampusMapOpen(true)}
          />
        );
      case 'streak':
        return (
          <StreakScreen
            user={user}
            pastActions={pastActions}
            onCompleteTodayAction={handleCompleteTodayAction}
            onViewAllPastActions={() => setCurrentScreen('impact')}
          />
        );
      case 'swap':
        return (
          <SwapBrowseScreen
            items={swapItems}
            onSelectItem={(item) => {
              setSelectedItem(item);
              setCurrentScreen('item_detail');
            }}
            onTakeItem={handleTakeItem}
            onNavigateToDonate={() => setCurrentScreen('donate')}
          />
        );
      case 'donate':
        return (
          <SwapDonateScreen
            onAddItem={handleAddItem}
            onCancel={() => setCurrentScreen('swap')}
          />
        );
      case 'credits':
        return (
          <CreditsScreen
            user={user}
            onNavigate={setCurrentScreen}
            onEarnQuickCredits={handleEarnQuickCredits}
          />
        );
      case 'rewards':
        return (
          <RewardsScreen
            user={user}
            rewards={INITIAL_REWARDS}
            vouchers={vouchers}
            onRedeemReward={handleRedeemReward}
            onViewVoucher={setActiveVoucherModal}
          />
        );
      case 'impact':
        return <ImpactScreen user={user} />;
      case 'item_detail':
        return (
          <ItemDetailScreen
            item={selectedItem}
            onBack={() => setCurrentScreen('swap')}
            onTakeItem={handleTakeItem}
          />
        );
      case 'profile':
        return (
          <ProfileScreen
            user={user}
            onNavigate={setCurrentScreen}
            onResetData={handleResetData}
          />
        );
      default:
        return (
          <HomeScreen
            user={user}
            onNavigate={setCurrentScreen}
            onOpenEcoTipModal={() => setIsCampusMapOpen(true)}
          />
        );
    }
  };

  const isSplash = currentScreen === 'splash';

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#F4F6F0]">
      {/* Storyboard Navigation Header & View Switcher */}
      <StoryboardNavigator
        currentScreen={currentScreen}
        onSelectScreen={setCurrentScreen}
        isPhoneFrame={isPhoneFrame}
        onTogglePhoneFrame={() => setIsPhoneFrame(!isPhoneFrame)}
        isSoundEnabled={isSoundEnabled}
        onToggleSound={toggleSound}
      />

      {/* Main Container (Mobile simulator or full viewport) */}
      <MobileFrame isPhoneFrame={isPhoneFrame}>
        {/* Top Header Bar (hidden on Splash screen) */}
        {!isSplash && (
          <HeaderBar
            currentScreen={currentScreen}
            onNavigate={setCurrentScreen}
            onOpenDrawer={() => setIsDrawerOpen(true)}
          />
        )}

        {/* Active Screen View */}
        <div className="flex-1 flex flex-col overflow-y-auto">
          {renderScreen()}
        </div>

        {/* Bottom Tab Bar (hidden on Splash screen) */}
        {!isSplash && (
          <BottomNav
            currentScreen={currentScreen}
            onNavigate={setCurrentScreen}
          />
        )}
      </MobileFrame>

      {/* Item Claim Confirmation Modal */}
      {claimSuccessData && (
        <ClaimSuccessModal
          item={claimSuccessData.item}
          claimCode={claimSuccessData.code}
          onClose={() => setClaimSuccessData(null)}
        />
      )}

      {/* Voucher QR Redemption Modal */}
      {activeVoucherModal && (
        <RedeemVoucherModal
          voucher={activeVoucherModal}
          onClose={() => setActiveVoucherModal(null)}
        />
      )}

      {/* Slide-out Navigation Drawer */}
      <DrawerMenuModal
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onNavigate={setCurrentScreen}
        user={user}
        onOpenCampusMap={() => setIsCampusMapOpen(true)}
      />

      {/* Campus Map & Swap Lockers Modal */}
      <CampusLockerMapModal
        isOpen={isCampusMapOpen}
        onClose={() => setIsCampusMapOpen(false)}
      />
    </div>
  );
}
