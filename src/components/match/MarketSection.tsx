import { OddsButton } from './OddsButton';
import type { Market, Match } from '../../types';

export const MarketSection = ({ match, market }: { match: Match; market: Market }) => (
  <section className="rounded-3xl border border-stake-border bg-stake-card p-5">
    <div className="flex items-center justify-between gap-3">
      <h3 className="text-lg font-semibold text-stake-textPrimary">{market.name}</h3>
      <span className="text-xs uppercase tracking-[0.2em] text-stake-textMuted">Market</span>
    </div>
    <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
      {market.options.map((option) => (
        <OddsButton
          key={`${market.id}-${option.label}`}
          match={match}
          marketName={market.name}
          label={option.label}
          initialOdds={option.odds}
        />
      ))}
    </div>
  </section>
);
