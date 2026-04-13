import { motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { LeaderboardRow } from '../components/leaderboard/LeaderboardRow';
import { TopThreePodium } from '../components/leaderboard/TopThreePodium';
import { Tabs } from '../components/ui/Tabs';
import { LEADERBOARD_PERIODS } from '../lib/constants';
import { useLeaderboard } from '../hooks/useLeaderboard';

type Period = (typeof LEADERBOARD_PERIODS)[number]['id'];

export const LeaderboardPage = () => {
  const { leaderboard, isLoading, error } = useLeaderboard();
  const [period, setPeriod] = useState<Period>('all-time');

  const sortedEntries = useMemo(() => {
    const copy = [...leaderboard];

    if (period === 'daily') {
      return copy.sort((a, b) => b.winRate - a.winRate).map((entry, index) => ({ ...entry, rank: index + 1 }));
    }

    if (period === 'weekly') {
      return copy.sort((a, b) => b.totalBets - a.totalBets).map((entry, index) => ({ ...entry, rank: index + 1 }));
    }

    return copy.sort((a, b) => a.rank - b.rank);
  }, [leaderboard, period]);

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold">Leaderboard</h1>
          <p className="mt-2 text-stake-textSecondary">See who is dominating the virtual books.</p>
        </div>
        <Tabs
          tabs={LEADERBOARD_PERIODS.map((periodItem) => ({
            value: periodItem.id,
            label: periodItem.label,
          }))}
          value={period}
          onChange={setPeriod}
        />
      </div>
      <TopThreePodium entries={sortedEntries.slice(0, 3)} />
      {isLoading ? (
        <div className="text-sm text-stake-textSecondary">Loading leaderboard...</div>
      ) : error ? (
        <div className="rounded-2xl border border-stake-border bg-stake-card p-5 text-sm text-stake-textSecondary">
          {error}
        </div>
      ) : (
        <div className="space-y-3">
          {sortedEntries.map((entry) => (
            <LeaderboardRow key={`${period}-${entry.userId}`} entry={entry} />
          ))}
        </div>
      )}
    </motion.div>
  );
};
