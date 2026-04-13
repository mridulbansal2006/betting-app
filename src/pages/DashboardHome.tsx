import { motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { MatchCard } from '../components/match/MatchCard';
import { EmptyState } from '../components/ui/EmptyState';
import { Skeleton } from '../components/ui/Skeleton';
import { useMatches } from '../hooks/useMatches';

const filterByQuery = (value: string, query: string) =>
  value.toLowerCase().includes(query.toLowerCase());

export const DashboardHome = () => {
  const { matches, isLoading, error } = useMatches();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') ?? '';
  const filtered = matches.filter((match) =>
    !query
      ? true
      : [match.homeTeam.name, match.awayTeam.name, match.league].some((value) =>
          filterByQuery(value, query),
        ),
  );

  const live = filtered.filter((match) => match.status === 'live');
  const upcoming = filtered.filter((match) => match.status === 'upcoming');
  const completed = filtered.filter((match) => match.status === 'completed');

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-10">
      {isLoading ? (
        <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} className="h-72" />
          ))}
        </div>
      ) : error ? (
        <EmptyState title="Unable to load matches" description={error} />
      ) : (
        <>
          <section>
            <h1 className="text-3xl font-semibold">Live now</h1>
            <div className="mt-6 grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
              {live.length ? live.map((match, index) => <MatchCard key={match.id} match={match} index={index} />) : <EmptyState title="No live matches" description="Try a different search query or check upcoming fixtures." />}
            </div>
          </section>
          <section>
            <h2 className="text-2xl font-semibold">Upcoming</h2>
            <div className="mt-6 grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
              {upcoming.length ? upcoming.map((match, index) => (
                <MatchCard key={match.id} match={match} index={index} />
              )) : <EmptyState title="No upcoming matches" description="Upcoming fixtures will appear here once available." />}
            </div>
          </section>
          <section>
            <h2 className="text-2xl font-semibold">Recent results</h2>
            <div className="mt-6 grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
              {completed.length ? completed.map((match, index) => (
                <MatchCard key={match.id} match={match} compact index={index} />
              )) : <EmptyState title="No completed results" description="Completed fixtures will populate after matches finish." />}
            </div>
          </section>
        </>
      )}
    </motion.div>
  );
};
