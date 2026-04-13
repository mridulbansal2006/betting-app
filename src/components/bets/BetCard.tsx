import { Badge } from '../ui/Badge';
import { formatBalance, formatOdds } from '../../lib/utils';
import type { Bet } from '../../types';

export const BetCard = ({ bet }: { bet: Bet }) => (
  <article className="rounded-3xl border border-stake-border bg-stake-card p-5">
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div>
        <p className="text-sm text-stake-textSecondary">{bet.league}</p>
        <h3 className="mt-1 text-lg font-semibold text-stake-textPrimary">{bet.matchTitle}</h3>
      </div>
      <Badge tone={bet.status === 'won' ? 'success' : bet.status === 'lost' ? 'danger' : 'warning'}>
        {bet.status}
      </Badge>
    </div>
    <div className="mt-5 grid gap-4 md:grid-cols-4">
      <div>
        <p className="text-xs uppercase tracking-[0.18em] text-stake-textMuted">Selection</p>
        <p className="mt-2 text-sm text-stake-textPrimary">{bet.selection}</p>
      </div>
      <div>
        <p className="text-xs uppercase tracking-[0.18em] text-stake-textMuted">Odds</p>
        <p className="mt-2 font-mono text-sm text-stake-textPrimary">{formatOdds(bet.odds)}</p>
      </div>
      <div>
        <p className="text-xs uppercase tracking-[0.18em] text-stake-textMuted">Stake</p>
        <p className="mt-2 font-mono text-sm text-stake-textPrimary">{formatBalance(bet.stake)}</p>
      </div>
      <div>
        <p className="text-xs uppercase tracking-[0.18em] text-stake-textMuted">Payout</p>
        <p className="mt-2 font-mono text-sm text-stake-green">{formatBalance(bet.potentialPayout)}</p>
      </div>
    </div>
  </article>
);
