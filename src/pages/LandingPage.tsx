import { motion } from 'framer-motion';
import { ArrowRight, PlayCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useMatches } from '../hooks/useMatches';
import { DISCLAIMER, SPORT_CONFIG } from '../lib/constants';
import { MatchCard } from '../components/match/MatchCard';

export const LandingPage = () => {
  const { matches } = useMatches();
  const liveMatches = matches.filter((match) => match.status === 'live');

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.2 }}
      className="min-h-screen bg-stake-bg text-stake-textPrimary"
    >
      <section className="relative overflow-hidden border-b border-stake-border">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(0,231,1,0.14),transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(20,117,225,0.14),transparent_25%)]" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 lg:px-8">
          <span className="rounded-full border border-stake-green/30 bg-stake-green/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-stake-green">
            WAP React Group Project
          </span>
          <h1 className="mt-6 max-w-4xl text-5xl font-semibold leading-tight lg:text-7xl">
            StakeZone
            <span className="block text-stake-textSecondary">The Ultimate Sports Betting Experience</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-stake-textSecondary">
            Predict. Bet. Win. All with virtual coins. Explore live odds, detailed match markets, a mock wallet, and a competitive leaderboard.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              to="/login"
              className="inline-flex items-center gap-2 rounded-2xl bg-stake-green px-6 py-4 font-semibold text-black transition hover:brightness-110"
            >
              Start Betting
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="#how-it-works"
              className="inline-flex items-center gap-2 rounded-2xl border border-stake-border px-6 py-4 font-semibold text-stake-textPrimary transition hover:bg-stake-card"
            >
              <PlayCircle className="h-4 w-4" />
              How It Works
            </a>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {Object.entries(SPORT_CONFIG).map(([key, sport]) => (
            <div
              key={key}
              className={`rounded-[28px] border border-stake-border bg-gradient-to-br ${sport.accent} p-6`}
            >
              <div className="text-4xl">{sport.icon}</div>
              <h2 className="mt-5 text-2xl font-semibold text-stake-textPrimary">{sport.label}</h2>
              <p className="mt-3 text-sm text-stake-textSecondary">{sport.description}</p>
              <p className="mt-6 text-sm text-stake-textMuted">
                {liveMatches.filter((match) => match.sport === key).length} live matches right now
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-stake-textMuted">Featured live matches</p>
            <h2 className="mt-2 text-3xl font-semibold">Action happening now</h2>
          </div>
        </div>
        <div className="mt-8 grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
          {liveMatches.slice(0, 3).map((match, index) => (
            <MatchCard key={match.id} match={match} index={index} />
          ))}
        </div>
      </section>

      <footer className="border-t border-stake-border px-4 py-6 text-center text-sm text-stake-textMuted">
        <p>This is a simulation project. No real money involved.</p>
        <p className="mt-2">{DISCLAIMER}</p>
      </footer>
    </motion.div>
  );
};
