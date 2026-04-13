import { motion } from 'framer-motion';
import { formatBalance } from '../../lib/utils';

export const BalanceDisplay = ({ balance }: { balance: number }) => (
  <div className="rounded-[28px] border border-stake-border bg-[radial-gradient(circle_at_top_right,_rgba(0,231,1,0.25),transparent_35%),linear-gradient(135deg,#1A2C38,#0F1923)] p-6">
    <p className="text-sm uppercase tracking-[0.2em] text-stake-textSecondary">Available Balance</p>
    <motion.span
      key={balance}
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="mt-4 block font-mono text-5xl font-bold text-stake-textPrimary"
    >
      {formatBalance(balance)} 🪙
    </motion.span>
  </div>
);
