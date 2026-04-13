import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useWallet } from '../contexts/WalletContext';
import { StatCard } from '../components/ui/StatCard';
import { formatBalance, formatRelativeJoined, getWinRate } from '../lib/utils';

export const ProfilePage = () => {
  const { user } = useAuth();
  const { transactions } = useWallet();

  if (!user) {
    return null;
  }

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
      <section className="rounded-[28px] border border-stake-border bg-stake-card p-6">
        <div className="flex flex-wrap items-center gap-4">
          <img src={user.avatar} alt={user.name} className="h-20 w-20 rounded-full bg-stake-bg" />
          <div>
            <h1 className="text-3xl font-semibold">{user.name}</h1>
            <p className="mt-2 text-stake-textSecondary">Member {formatRelativeJoined(user.joinedAt)}</p>
            <div className="mt-3 inline-flex rounded-full bg-stake-hover px-4 py-2 text-sm text-stake-green">
              Favorite sport: {user.favoriteSport}
            </div>
          </div>
        </div>
      </section>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Bets" value={String(user.totalBets)} />
        <StatCard label="Win Rate" value={`${getWinRate(user.totalWins, user.totalBets).toFixed(1)}%`} accent="from-stake-blue/20 to-transparent" />
        <StatCard label="Profit" value={`${user.profit >= 0 ? '+' : ''}${formatBalance(user.profit)}`} accent="from-stake-yellow/20 to-transparent" />
        <StatCard label="Win Streak" value={String(user.winStreak)} accent="from-stake-red/20 to-transparent" />
      </div>
      <section>
        <h2 className="text-2xl font-semibold">Recent activity</h2>
        <div className="mt-6 space-y-3">
          {transactions.slice(0, 6).map((transaction) => (
            <div key={transaction.id} className="rounded-2xl border border-stake-border bg-stake-card p-4">
              <p className="font-medium text-stake-textPrimary">{transaction.description}</p>
              <p className="mt-1 text-sm text-stake-textSecondary">{new Date(transaction.createdAt).toLocaleString()}</p>
            </div>
          ))}
        </div>
      </section>
    </motion.div>
  );
};
