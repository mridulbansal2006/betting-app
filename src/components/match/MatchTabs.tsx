import { useState } from 'react';
import { Tabs } from '../ui/Tabs';
import { Commentary } from './Commentary';
import { MarketSection } from './MarketSection';
import { MatchEvents } from './MatchEvents';
import type { Match } from '../../types';

type TabValue = 'markets' | 'timeline' | 'info';

export const MatchTabs = ({ match }: { match: Match }) => {
  const [activeTab, setActiveTab] = useState<TabValue>('markets');

  return (
    <section className="space-y-5">
      <Tabs
        tabs={[
          { value: 'markets', label: 'Markets' },
          { value: 'timeline', label: match.sport === 'football' ? 'Events' : 'Commentary' },
          { value: 'info', label: 'Info' },
        ]}
        value={activeTab}
        onChange={setActiveTab}
      />
      {activeTab === 'markets' ? (
        <div className="space-y-4">
          {match.markets.map((market) => (
            <MarketSection key={market.id} match={match} market={market} />
          ))}
        </div>
      ) : null}
      {activeTab === 'timeline'
        ? match.sport === 'football'
          ? <MatchEvents events={match.events ?? []} />
          : <Commentary items={match.commentary} />
        : null}
      {activeTab === 'info' ? (
        <div className="rounded-3xl border border-stake-border bg-stake-card p-6">
          <dl className="grid gap-4 md:grid-cols-2">
            <div>
              <dt className="text-sm text-stake-textMuted">League</dt>
              <dd className="mt-1 text-stake-textPrimary">{match.league}</dd>
            </div>
            <div>
              <dt className="text-sm text-stake-textMuted">Kickoff</dt>
              <dd className="mt-1 text-stake-textPrimary">{new Date(match.startTime).toLocaleString()}</dd>
            </div>
            <div>
              <dt className="text-sm text-stake-textMuted">Venue</dt>
              <dd className="mt-1 text-stake-textPrimary">{match.venue}</dd>
            </div>
            <div>
              <dt className="text-sm text-stake-textMuted">Status</dt>
              <dd className="mt-1 capitalize text-stake-textPrimary">{match.status}</dd>
            </div>
          </dl>
        </div>
      ) : null}
    </section>
  );
};
