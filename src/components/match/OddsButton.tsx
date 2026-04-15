import { motion } from 'framer-motion';
import { useBetSlip } from '../../contexts/BetSlipContext';
import { useLiveOdds } from '../../hooks/useLiveOdds';
import { cn, formatOdds } from '../../lib/utils';
import { Icon } from '../ui/Icon';
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
        'flex min-w-0 flex-1 items-center justify-between rounded-2xl border px-3 py-3 transition-all',
        isSelected
          ? 'border-stake-green bg-stake-green text-black'
          : 'border-stake-border bg-stake-bg/50 text-stake-textPrimary hover:neon-border-green',
        direction === 'up' && !isSelected && 'ring-1 ring-stake-green/60',
        direction === 'down' && !isSelected && 'ring-1 ring-stake-red/60',
      )}
    >
      <span className="truncate text-left text-xs font-bold">{label}</span>
      <span className="flex items-center gap-1 font-mono text-sm font-bold">
        {direction === 'up' ? <Icon name="trending_up" className="h-4 w-4 text-stake-green" /> : null}
        {direction === 'down' ? <Icon name="trending_down" className="h-4 w-4 text-stake-red" /> : null}
        {formatOdds(odds)}
      </span>
    </motion.button>
  );
};
