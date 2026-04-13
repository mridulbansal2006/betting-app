import { Badge } from '../ui/Badge';
import { EmptyState } from '../ui/EmptyState';
import type { CricketCommentaryItem } from '../../types';

export const Commentary = ({ items }: { items: CricketCommentaryItem[] }) => {
  if (!items.length) {
    return (
      <EmptyState
        title="No live commentary"
        description="Commentary becomes available during active cricket matches."
      />
    );
  }

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div key={`${item.over}-${item.text}`} className="rounded-2xl border border-stake-border bg-stake-card p-4">
          <div className="flex items-center justify-between gap-3">
            <span className="font-mono text-sm font-semibold text-stake-textPrimary">{item.over}</span>
            <Badge
              tone={
                item.type === 'boundary'
                  ? 'success'
                  : item.type === 'wicket'
                    ? 'danger'
                    : 'neutral'
              }
            >
              {item.type.replace('_', ' ')}
            </Badge>
          </div>
          <p className="mt-3 text-sm text-stake-textSecondary">{item.text}</p>
        </div>
      ))}
    </div>
  );
};
