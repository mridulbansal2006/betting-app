import { useBetSlip } from '../../contexts/BetSlipContext';
import { useWallet } from '../../contexts/WalletContext';
import { cn, formatBalance } from '../../lib/utils';

export const PlaceBetButton = () => {
  const { totalStake, totalPayout, placeBets, isPlacing, selections } = useBetSlip();
  const { balance } = useWallet();
  const isDisabled = !selections.length || totalStake > balance || isPlacing;

  return (
    <div className="rounded-3xl border border-stake-border bg-stake-bg/50 p-4">
      <div className="space-y-2 text-sm">
        <div className="flex items-center justify-between text-stake-textSecondary">
          <span>Total stake</span>
          <span className="font-mono text-stake-textPrimary">{formatBalance(totalStake)}</span>
        </div>
        <div className="flex items-center justify-between text-stake-textSecondary">
          <span>Total payout</span>
          <span className="font-mono text-stake-green">{formatBalance(totalPayout)}</span>
        </div>
      </div>
      <button
        disabled={isDisabled}
        onClick={() => void placeBets()}
        className={cn(
          'mt-4 w-full rounded-2xl px-4 py-3 text-sm font-semibold transition',
          isDisabled
            ? 'cursor-not-allowed bg-stake-border text-stake-textMuted'
            : 'bg-stake-green text-black hover:brightness-110',
        )}
      >
        {totalStake > balance ? 'Insufficient Balance' : isPlacing ? 'Placing Bet...' : 'PLACE BET'}
      </button>
    </div>
  );
};
