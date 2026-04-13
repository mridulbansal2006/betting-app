import { Badge } from '../ui/Badge';
import { EmptyState } from '../ui/EmptyState';
import type { FootballEventItem } from '../../types';

export const MatchEvents = ({ events }: { events: FootballEventItem[] }) => {
  if (!events.length) {
    return (
      <EmptyState
        title="No match events"
        description="Event timelines appear for live football fixtures."
      />
    );
  }

  return (
    <div className="space-y-4">
      {events.map((event) => (
        <div key={`${event.minute}-${event.player}`} className="rounded-2xl border border-stake-border bg-stake-card p-4">
          <div className="flex items-center justify-between gap-3">
            <span className="font-mono text-sm font-semibold text-stake-textPrimary">{event.minute}'</span>
            <Badge tone={event.type === 'goal' ? 'success' : 'warning'}>
              {event.type.replace('_', ' ')}
            </Badge>
          </div>
          <p className="mt-3 font-semibold text-stake-textPrimary">{event.player}</p>
          <p className="mt-1 text-sm text-stake-textSecondary">
            {event.team === 'home' ? 'Home' : 'Away'} team
            {event.detail ? ` • ${event.detail}` : ''}
          </p>
        </div>
      ))}
    </div>
  );
};
