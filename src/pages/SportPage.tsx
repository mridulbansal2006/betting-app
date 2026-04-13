import { motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { MatchCard } from '../components/match/MatchCard';
import { EmptyState } from '../components/ui/EmptyState';
import { Tabs } from '../components/ui/Tabs';
import { SPORT_CONFIG } from '../lib/constants';
import { useMatches } from '../hooks/useMatches';
import type { MatchStatus, Sport } from '../types';

type StatusFilter = 'all' | MatchStatus;

export const SportPage = () => {
  const params = useParams();
  const sport = (params.sport ?? 'cricket') as Sport;
  const { matches, error, isLoading } = useMatches(sport);
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') ?? '';
  const [status, setStatus] = useState<StatusFilter>('all');
  const [league, setLeague] = useState('all');
  const config = SPORT_CONFIG[sport];

  const leagues = useMemo(
    () => ['all', ...Array.from(new Set(matches.map((match) => match.league)))],
    [matches],
  );

  const filteredMatches = useMemo(
    () =>
      matches.filter((match) => {
        const matchesStatus = status === 'all' ? true : match.status === status;
        const matchesLeague = league === 'all' ? true : match.league === league;
        const matchesQuery = query
          ? [match.homeTeam.name, match.awayTeam.name, match.league].some((value) =>
              value.toLowerCase().includes(query.toLowerCase()),
            )
          : true;
        return matchesStatus && matchesLeague && matchesQuery;
      }),
    [league, matches, query, status],
  );

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
      <div className="rounded-[28px] border border-stake-border bg-stake-card p-6">
        <p className="text-4xl">{config.icon}</p>
        <h1 className="mt-4 text-3xl font-semibold">{config.label}</h1>
        <p className="mt-2 max-w-2xl text-stake-textSecondary">{config.description}</p>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Tabs
          tabs={[
            { value: 'all', label: 'All' },
            { value: 'live', label: 'Live' },
            { value: 'upcoming', label: 'Upcoming' },
            { value: 'completed', label: 'Completed' },
          ]}
          value={status}
          onChange={setStatus}
        />
        <select
          value={league}
          onChange={(event) => setLeague(event.target.value)}
          className="rounded-2xl border border-stake-border bg-stake-input px-4 py-3 text-sm text-stake-textPrimary outline-none"
        >
          {leagues.map((entry) => (
            <option key={entry} value={entry}>
              {entry === 'all' ? 'All leagues' : entry}
            </option>
          ))}
        </select>
      </div>
      {isLoading ? (
        <div className="text-sm text-stake-textSecondary">Loading matches...</div>
      ) : error ? (
        <EmptyState title="Unable to load matches" description={error} />
      ) : filteredMatches.length ? (
        <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
          {filteredMatches.map((match, index) => (
            <MatchCard key={match.id} match={match} index={index} />
          ))}
        </div>
      ) : (
        <EmptyState title="No matches found" description="Adjust the filters to surface more fixtures." />
      )}
    </motion.div>
  );
};
