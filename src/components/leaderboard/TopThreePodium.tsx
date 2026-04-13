import { motion } from 'framer-motion';
import { formatBalance } from '../../lib/utils';
import type { LeaderboardEntry } from '../../types';

export const TopThreePodium = ({ entries }: { entries: LeaderboardEntry[] }) => (
  <div className="grid gap-4 lg:grid-cols-3">
    {entries.map((entry, index) => (
      <motion.div
        key={entry.id}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.08 }}
        className="rounded-[28px] border border-stake-border bg-stake-card p-6"
      >
        <p className="text-sm text-stake-textSecondary">Rank #{entry.rank}</p>
        <h3 className="mt-3 text-2xl font-semibold text-stake-textPrimary">{entry.name}</h3>
        <p className="mt-4 font-mono text-3xl font-bold text-stake-green">{formatBalance(entry.profit)}</p>
        <p className="mt-2 text-sm text-stake-textMuted">{entry.winRate.toFixed(1)}% win rate</p>
      </motion.div>
    ))}
  </div>
);
