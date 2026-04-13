import { RankBadge } from './RankBadge';
import { formatBalance } from '../../lib/utils';
import type { LeaderboardEntry } from '../../types';

export const LeaderboardRow = ({ entry }: { entry: LeaderboardEntry }) => (
  <div className="grid grid-cols-[auto_1fr_auto_auto] items-center gap-4 rounded-2xl border border-stake-border bg-stake-card p-4">
    <RankBadge rank={entry.rank} />
    <div className="min-w-0">
      <p className="truncate font-semibold text-stake-textPrimary">{entry.name}</p>
      <p className="text-xs text-stake-textMuted">{entry.totalBets} bets placed</p>
    </div>
    <div className="text-right">
      <p className="font-mono text-sm text-stake-green">{formatBalance(entry.profit)}</p>
      <p className="text-xs text-stake-textMuted">Profit</p>
    </div>
    <div className="text-right">
      <p className="font-mono text-sm text-stake-textPrimary">{entry.winRate.toFixed(1)}%</p>
      <p className="text-xs text-stake-textMuted">Win rate</p>
    </div>
  </div>
);
