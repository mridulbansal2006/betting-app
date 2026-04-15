import { Icon } from './Icon';

interface EmptyStateProps {
  title: string;
  description: string;
}

export const EmptyState = ({ title, description }: EmptyStateProps) => (
  <div className="rounded-3xl border border-dashed border-stake-border bg-stake-card/60 p-8 text-center">
    <Icon name="pending" className="mx-auto h-12 w-12 text-stake-textMuted" />
    <h3 className="mt-4 text-lg font-semibold text-stake-textPrimary">{title}</h3>
    <p className="mt-2 text-sm text-stake-textSecondary">{description}</p>
  </div>
);
