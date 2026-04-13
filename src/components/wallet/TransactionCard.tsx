import { format } from 'date-fns';
import { formatBalance } from '../../lib/utils';
import type { Transaction } from '../../types';

export const TransactionCard = ({ transaction }: { transaction: Transaction }) => (
  <article className="rounded-2xl border border-stake-border bg-stake-card p-4">
    <div className="flex items-start justify-between gap-4">
      <div>
        <p className="font-medium text-stake-textPrimary">{transaction.description}</p>
        <p className="mt-1 text-xs text-stake-textMuted">{format(new Date(transaction.createdAt), 'MMM d, yyyy • h:mm a')}</p>
      </div>
      <div className="text-right">
        <p className={`font-mono text-sm font-semibold ${transaction.amount >= 0 ? 'text-stake-green' : 'text-stake-red'}`}>
          {transaction.amount >= 0 ? '+' : ''}
          {formatBalance(transaction.amount)}
        </p>
        <p className="mt-1 text-xs text-stake-textMuted">Bal {formatBalance(transaction.balanceAfter)}</p>
      </div>
    </div>
  </article>
);
