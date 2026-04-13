import { motion } from 'framer-motion';
import { BalanceDisplay } from '../components/wallet/BalanceDisplay';
import { DailyBonusCard } from '../components/wallet/DailyBonusCard';
import { TransactionCard } from '../components/wallet/TransactionCard';
import { StatCard } from '../components/ui/StatCard';
import { useAuth } from '../contexts/AuthContext';
import { useWallet } from '../contexts/WalletContext';
import { formatBalance, getWinRate } from '../lib/utils';

export const WalletPage = () => {
  const { user } = useAuth();
  const { balance, transactions } = useWallet();

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
      <div className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
        <BalanceDisplay balance={balance} />
        <DailyBonusCard />
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard label="Total Bets" value={String(user?.totalBets ?? 0)} />
        <StatCard label="Win Rate" value={`${getWinRate(user?.totalWins ?? 0, user?.totalBets ?? 0).toFixed(1)}%`} accent="from-stake-blue/20 to-transparent" />
        <StatCard label="Profit" value={`${user && user.profit >= 0 ? '+' : ''}${formatBalance(user?.profit ?? 0)}`} accent="from-stake-yellow/20 to-transparent" />
      </div>
      <section>
        <h2 className="text-2xl font-semibold">Transactions</h2>
        <div className="mt-6 space-y-3">
          {transactions.map((transaction) => (
            <TransactionCard key={transaction.id} transaction={transaction} />
          ))}
        </div>
      </section>
    </motion.div>
  );
};
