import { motion } from 'framer-motion';
import { useState } from 'react';
import { BetCard } from '../components/bets/BetCard';
import { BetFilters } from '../components/bets/BetFilters';
import { EmptyState } from '../components/ui/EmptyState';
import { useAuth } from '../contexts/AuthContext';
import { useBets } from '../hooks/useBets';
import type { BetStatus } from '../types';

type FilterValue = 'all' | BetStatus;

export const MyBetsPage = () => {
  const { user } = useAuth();
  const [filter, setFilter] = useState<FilterValue>('all');
  const { bets, error, isLoading } = useBets(user?.id ?? '');
  const filteredBets = filter === 'all' ? bets : bets.filter((bet) => bet.status === filter);

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold">My Bets</h1>
          <p className="mt-2 text-stake-textSecondary">Track active, won, and lost bets in one place.</p>
        </div>
        <BetFilters value={filter} onChange={setFilter} />
      </div>
      <div className="space-y-4">
        {isLoading ? (
          <div className="text-sm text-stake-textSecondary">Loading bets...</div>
        ) : error ? (
          <EmptyState title="Unable to load bets" description={error} />
        ) : filteredBets.length ? (
          filteredBets.map((bet) => <BetCard key={bet.id} bet={bet} />)
        ) : (
          <EmptyState title="No bets yet" description="Place your first selection from the dashboard or sport pages." />
        )}
      </div>
    </motion.div>
  );
};
