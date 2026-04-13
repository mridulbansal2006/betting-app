import { cn } from '../../lib/utils';

interface StatCardProps {
  label: string;
  value: string;
  hint?: string;
  accent?: string;
}

export const StatCard = ({ label, value, hint, accent = 'from-stake-green/25 to-transparent' }: StatCardProps) => (
  <div className={cn('rounded-3xl border border-stake-border bg-stake-card p-5', `bg-gradient-to-br ${accent}`)}>
    <p className="text-sm text-stake-textSecondary">{label}</p>
    <p className="mt-3 font-mono text-3xl font-bold text-stake-textPrimary">{value}</p>
    {hint ? <p className="mt-2 text-xs text-stake-textMuted">{hint}</p> : null}
  </div>
);
