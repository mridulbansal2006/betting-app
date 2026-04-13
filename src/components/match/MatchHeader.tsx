import { Badge } from '../ui/Badge';
import { getStatusLabel } from '../../lib/utils';
import { LiveScore } from './LiveScore';
import type { Match } from '../../types';

export const MatchHeader = ({ match }: { match: Match }) => (
  <section className="rounded-[28px] border border-stake-border bg-stake-card p-6">
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div>
        <p className="text-sm text-stake-textSecondary">
          {match.leagueIcon} {match.league}
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-stake-textPrimary">
          {match.homeTeam.name} vs {match.awayTeam.name}
        </h1>
        <p className="mt-2 text-sm text-stake-textMuted">{match.venue}</p>
      </div>
      <Badge tone={match.status === 'live' ? 'danger' : match.status === 'upcoming' ? 'warning' : 'neutral'}>
        {getStatusLabel(match)}
      </Badge>
    </div>
    <div className="mt-8">
      <LiveScore match={match} />
    </div>
  </section>
);
