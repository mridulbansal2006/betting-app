import { motion } from 'framer-motion';
import { Clock3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getStatusLabel, statusTone } from '../../lib/utils';
import { Badge } from '../ui/Badge';
import { LiveScore } from './LiveScore';
import { OddsButton } from './OddsButton';
import type { Match } from '../../types';

interface MatchCardProps {
  match: Match;
  index?: number;
  compact?: boolean;
}

export const MatchCard = ({ match, index = 0, compact = false }: MatchCardProps) => {
  const navigate = useNavigate();
  const primaryMarket = match.markets[0];

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="cursor-pointer rounded-[28px] border border-stake-border bg-stake-card p-5 transition hover:border-stake-green/50 hover:bg-stake-hover"
      onClick={() => navigate(`/match/${match.id}`)}
    >
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-medium text-stake-textSecondary">
          {match.leagueIcon} {match.league}
        </p>
        <Badge
          className={statusTone[match.status]}
          tone={match.status === 'live' ? 'danger' : match.status === 'upcoming' ? 'warning' : 'neutral'}
        >
          {match.status === 'upcoming' ? <Clock3 className="h-3.5 w-3.5" /> : null}
          {getStatusLabel(match)}
        </Badge>
      </div>

      <div className="mt-5">
        <LiveScore match={match} />
      </div>

      {match.status === 'completed' && match.result ? (
        <p className="mt-4 rounded-2xl bg-stake-bg/60 px-4 py-3 text-sm text-stake-textSecondary">
          {match.result}
        </p>
      ) : null}

      {!compact && primaryMarket ? (
        <div className="mt-5 flex flex-wrap gap-3">
          {primaryMarket.options.map((option) => (
            <OddsButton
              key={`${primaryMarket.id}-${option.label}`}
              match={match}
              marketName={primaryMarket.name}
              label={option.label}
              initialOdds={option.odds}
            />
          ))}
        </div>
      ) : null}
    </motion.article>
  );
};
