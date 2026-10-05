import React, { useState } from 'react';
import { Coins, Utensils, Shirt, Ticket, Sprout, Coffee, Check, Clock, QrCode } from 'lucide-react';
import { RedeemedVoucher, RewardItem, UserProfile } from '../../types';
import { sound } from '../../utils/sound';
import confetti from 'canvas-confetti';

interface RewardsScreenProps {
  user: UserProfile;
  rewards: RewardItem[];
  vouchers: RedeemedVoucher[];
  onRedeemReward: (reward: RewardItem) => void;
  onViewVoucher: (voucher: RedeemedVoucher) => void;
}

export const RewardsScreen: React.FC<RewardsScreenProps> = ({
  user,
  rewards,
  vouchers,
  onRedeemReward,
  onViewVoucher,
}) => {
  const [activeTab, setActiveTab] = useState<'rewards' | 'history'>('rewards');

  const getRewardIcon = (iconType: string) => {
    switch (iconType) {
      case 'canteen':
        return <Utensils className="w-5 h-5 text-orange-600" />;
      case 'shirt':
        return <Shirt className="w-5 h-5 text-blue-600" />;
      case 'ticket':
        return <Ticket className="w-5 h-5 text-amber-600" />;
      case 'tree':
        return <Sprout className="w-5 h-5 text-emerald-700" />;
      case 'coffee':
        return <Coffee className="w-5 h-5 text-amber-800" />;
      default:
        return <Coins className="w-5 h-5 text-amber-600" />;
    }
  };

  const handleRedeem = (reward: RewardItem) => {
    if (user.credits < reward.creditsCost) {
      alert(`You need ${reward.creditsCost - user.credits} more credits to redeem this reward. Keep your streak going or donate an item!`);
      return;
    }
    sound.coin();
    try {
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#2E7D4F', '#F59E0B', '#10B981'],
      });
    } catch {
      // Ignore
    }
    onRedeemReward(reward);
  };

  return (
    <div className="p-4 space-y-4 pb-12">
      {/* Available Credits Card (Screen 7 in Storyboard) */}
      <div className="bg-gradient-to-br from-[#FCF8EC] via-[#FDF5DF] to-[#FCEEC6] p-4 rounded-2xl border border-[#F6DC9A] shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-amber-400/90 shadow-sm flex items-center justify-center text-white border border-amber-300">
            <Coins className="w-6 h-6 stroke-[2.2]" />
          </div>
          <div>
            <span className="text-xs font-semibold text-amber-900 uppercase tracking-wide">
              Available Credits
            </span>
            <div className="text-2xl font-bold text-slate-900 font-display tabular-nums">
              {user.credits}
            </div>
          </div>
        </div>

        <span className="text-xs text-amber-800 bg-white/70 px-2.5 py-1 rounded-lg border border-amber-200 font-medium">
          Reverse Rewards
        </span>
      </div>

      {/* Tabs: Rewards | History (Screen 7 in Storyboard) */}
      <div className="flex items-center gap-1 p-1 bg-slate-200/70 rounded-xl">
        <button
          onClick={() => {
            sound.tap();
            setActiveTab('rewards');
          }}
          className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
            activeTab === 'rewards'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Rewards
        </button>

        <button
          onClick={() => {
            sound.tap();
            setActiveTab('history');
          }}
          className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
            activeTab === 'history'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          History ({vouchers.length})
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'rewards' ? (
        <div className="space-y-3">
          {rewards.map((reward) => {
            const canAfford = user.credits >= reward.creditsCost;
            return (
              <div
                key={reward.id}
                className="bg-white p-3.5 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-xs transition-all flex items-center justify-between gap-3"
              >
                {/* Icon & Title info */}
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
                    {getRewardIcon(reward.iconType)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-slate-900 text-sm truncate font-display">
                        {reward.title}
                      </h4>
                    </div>
                    {/* Credits cost */}
                    <p className="text-xs font-semibold text-emerald-800 mt-0.5">
                      {reward.creditsCost} credits
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                      {reward.perkDescription}
                    </p>
                  </div>
                </div>

                {/* Redeem Button (Screen 7 in Storyboard) */}
                <div className="shrink-0">
                  <button
                    onClick={() => handleRedeem(reward)}
                    disabled={!canAfford}
                    className={`py-2 px-3.5 rounded-xl font-semibold text-xs transition-all flex items-center gap-1 active:scale-95 ${
                      canAfford
                        ? 'bg-[#2E7D4F] hover:bg-[#256640] text-white shadow-xs cursor-pointer'
                        : 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
                    }`}
                  >
                    <span>Redeem</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* History Tab */
        <div className="space-y-3">
          {vouchers.length === 0 ? (
            <div className="bg-white p-8 rounded-2xl text-center border border-slate-200 space-y-2">
              <Clock className="w-8 h-8 text-slate-400 mx-auto" />
              <h4 className="font-semibold text-slate-800 text-sm">No redemptions yet</h4>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Use your green credits from maintaining streaks or donating items to redeem canteen discounts and passes!
              </p>
            </div>
          ) : (
            vouchers.map((voucher) => (
              <div
                key={voucher.id}
                role="button"
                tabIndex={0}
                onClick={() => {
                  sound.tap();
                  onViewVoucher(voucher);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    sound.tap();
                    onViewVoucher(voucher);
                  }
                }}
                className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs hover:border-emerald-300 transition-colors text-left flex items-center justify-between cursor-pointer"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-slate-900 text-sm">
                      {voucher.title}
                    </h4>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                      ACTIVE
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Code: <strong className="font-mono text-slate-800 tracking-wider">{voucher.code}</strong>
                  </p>
                  <p className="text-[10px] text-slate-400 mt-0.5">
                    Redeemed {voucher.redeemedDate} · Expires {voucher.expiryDate}
                  </p>
                </div>

                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-700">
                  <QrCode className="w-5 h-5" />
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};
