import { Icon } from '../ui/Icon';
import { useBetSlip } from '../../contexts/BetSlipContext';
import { formatBalance, formatOdds } from '../../lib/utils';
import { StakeInput } from './StakeInput';
import type { BetSelection } from '../../types';

export const BetSelectionCard = ({ selection }: { selection: BetSelection }) => {
  const { removeSelection, updateStake } = useBetSlip();

  return (
    <div className="rounded-2xl border border-stake-border bg-stake-bg/60 p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-stake-textPrimary">{selection.matchTitle}</p>
          <p className="mt-1 text-xs text-stake-textSecondary">{selection.marketName}</p>
          <p className="mt-2 text-sm text-stake-green">{selection.selection}</p>
        </div>
        <button
          onClick={() => removeSelection(selection.matchId, selection.marketName)}
          className="rounded-full p-1 text-stake-textMuted transition hover:bg-stake-hover hover:text-stake-textPrimary"
        >
          <Icon name="close" className="h-4 w-4" />
        </button>
      </div>
      <div className="mt-4 grid gap-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-stake-textSecondary">Odds</span>
          <span className="font-mono font-semibold text-stake-textPrimary">
            {formatOdds(selection.odds)}
          </span>
        </div>
        <StakeInput
          value={selection.stake}
          onChange={(value) => updateStake(selection.matchId, selection.marketName, value)}
        />
        <div className="flex items-center justify-between text-sm">
          <span className="text-stake-textSecondary">Potential payout</span>
          <span className="font-mono font-semibold text-stake-green">
            {formatBalance(selection.stake * selection.odds)}
          </span>
        </div>
      </div>
    </div>
  );
};
