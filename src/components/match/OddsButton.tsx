import { motion } from 'framer-motion';
import { TrendingDown, TrendingUp } from 'lucide-react';
import { useBetSlip } from '../../contexts/BetSlipContext';
import { useLiveOdds } from '../../hooks/useLiveOdds';
import { cn, formatOdds } from '../../lib/utils';
import type { Match } from '../../types';

interface OddsButtonProps {
  match: Match;
  marketName: string;
  label: string;
  initialOdds: number;
}

export const OddsButton = ({ match, marketName, label, initialOdds }: OddsButtonProps) => {
  const { addSelection, selections } = useBetSlip();
  const { odds, direction } = useLiveOdds(initialOdds, match.status === 'live');
  const isSelected = selections.some(
    (selection) =>
      selection.matchId === match.id &&
      selection.marketName === marketName &&
      selection.selection === label,
  );

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={(event) => {
        event.stopPropagation();
        addSelection({
          matchId: match.id,
          matchTitle: `${match.homeTeam.shortName} vs ${match.awayTeam.shortName}`,
          league: match.league,
          sport: match.sport,
          marketName,
          selection: label,
          odds,
        });
      }}
      className={cn(
        'flex min-w-0 flex-1 items-center justify-between rounded-2xl border px-3 py-3 transition',
        isSelected
          ? 'border-stake-green bg-stake-green text-black'
          : 'border-stake-border bg-stake-hover text-stake-textPrimary hover:border-stake-green',
        direction === 'up' && !isSelected && 'ring-1 ring-stake-green/60',
        direction === 'down' && !isSelected && 'ring-1 ring-stake-red/60',
      )}
    >
      <span className="truncate text-left text-xs font-medium">{label}</span>
      <span className="flex items-center gap-1 font-mono text-sm font-bold">
        {direction === 'up' ? <TrendingUp className="h-3.5 w-3.5" /> : null}
        {direction === 'down' ? <TrendingDown className="h-3.5 w-3.5" /> : null}
        {formatOdds(odds)}
      </span>
    </motion.button>
  );
};
