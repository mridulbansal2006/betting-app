import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { MatchHeader } from '../components/match/MatchHeader';
import { MatchTabs } from '../components/match/MatchTabs';
import { MatchCard } from '../components/match/MatchCard';
import { EmptyState } from '../components/ui/EmptyState';
import { useMatch } from '../hooks/useMatch';
import { useMatches } from '../hooks/useMatches';

export const MatchDetailPage = () => {
  const { id = '' } = useParams();
  const { match, isLoading, error } = useMatch(id);
  const { matches } = useMatches(match?.sport);

  if (isLoading) {
    return <div className="min-h-[50vh]" />;
  }

  if (error || !match) {
    return <EmptyState title="Match unavailable" description="This fixture could not be loaded." />;
  }

  const relatedMatches = matches.filter((candidate) => candidate.id !== match.id).slice(0, 3);

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
      <MatchHeader match={match} />
      <MatchTabs match={match} />
      <section>
        <h2 className="text-2xl font-semibold">Related matches</h2>
        <div className="mt-6 grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
          {relatedMatches.map((relatedMatch, index) => (
            <MatchCard key={relatedMatch.id} match={relatedMatch} index={index} />
          ))}
        </div>
      </section>
    </motion.div>
  );
};
