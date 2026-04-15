import { Icon } from '../ui/Icon';
import { useCountdown } from '../../hooks/useCountdown';
import { useWallet } from '../../contexts/WalletContext';
import { showToast } from '../ui/Toast';

export const DailyBonusCard = () => {
  const { claimDailyBonus, canClaimBonus, nextBonusTime } = useWallet();
  const countdown = useCountdown(nextBonusTime ?? new Date());

  return (
    <div className="rounded-3xl border border-stake-border bg-stake-card p-6">
      <div className="flex items-center gap-3">
        <div className="rounded-2xl bg-stake-purple/15 p-3">
          <Icon name="card_giftcard" className="h-5 w-5 text-stake-purple" fill={true} />
        </div>
        <div>
          <h3 className="font-semibold text-stake-textPrimary">Daily bonus</h3>
          <p className="text-sm text-stake-textSecondary">Claim 500 virtual coins every 24 hours.</p>
        </div>
      </div>
      <button
        onClick={async () => {
          const claimed = await claimDailyBonus();
          showToast({
            title: claimed ? 'Daily bonus claimed' : 'Bonus unavailable',
            description: claimed
              ? '500 coins added to your wallet.'
              : 'You can claim the next bonus after the countdown expires.',
            tone: claimed ? 'success' : 'error',
          });
        }}
        disabled={!canClaimBonus}
        className="mt-6 w-full rounded-2xl bg-stake-purple px-4 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:bg-stake-border disabled:text-stake-textMuted"
      >
        {canClaimBonus
          ? 'Claim 500 Coins'
          : `Next in ${String(countdown.hours).padStart(2, '0')}:${String(countdown.minutes).padStart(2, '0')}:${String(countdown.seconds).padStart(2, '0')}`}
      </button>
    </div>
  );
};
