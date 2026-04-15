import { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useMatches } from '../hooks/useMatches';
import { DISCLAIMER, SPORT_CONFIG } from '../lib/constants';
import { MatchCard } from '../components/match/MatchCard';
import { Icon } from '../components/ui/Icon';

export const LandingPage = () => {
  const { matches } = useMatches();
  const liveMatches = matches.filter((match) => match.status === 'live');
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Entrance Timeline
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      tl.from('.hero-badge', { opacity: 0, y: 20, duration: 0.8 })
        .from('.hero-title span', { 
          opacity: 0, 
          y: 60, 
          rotationX: -45, 
          stagger: 0.2, 
          duration: 1.2, 
          transformOrigin: '0% 50% -50' 
        }, '-=0.6')
        .from('.hero-p', { opacity: 0, y: 20, duration: 0.8 }, '-=0.8')
        .from('.hero-btns', { opacity: 0, y: 20, duration: 0.8 }, '-=0.6');

      // Parallax Glows
      gsap.to('.glow-1', {
        y: -100,
        scrollTrigger: {
          trigger: '.hero-section',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        }
      });

      gsap.to('.glow-2', {
        y: 100,
        scrollTrigger: {
          trigger: '.hero-section',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        }
      });

      // Section Reveals
      const revealSections = ['.sports-section', '.matches-section'];
      revealSections.forEach((section) => {
        gsap.fromTo(`${section} .reveal-item`, 
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 1,
            scrollTrigger: {
              trigger: section,
              start: 'top bottom-=100',
              toggleActions: 'play none none reverse',
            }
          }
        );
      });

      // Recalculate ScrollTrigger positions after layout settles
      const refreshID = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 500);

      const resizeListener = () => ScrollTrigger.refresh();
      window.addEventListener('resize', resizeListener);

      return () => {
        clearTimeout(refreshID);
        window.removeEventListener('resize', resizeListener);
      };
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-stake-bg text-stake-textPrimary selection:bg-stake-green/30"
    >
      <section className="relative overflow-hidden hero-section">
        {/* Glow Effects */}
        <div className="absolute left-[-10%] top-[-10%] h-[50%] w-[50%] rounded-full bg-stake-green/10 blur-[120px] glow-1" />
        <div className="absolute right-[-10%] bottom-[-10%] h-[50%] w-[50%] rounded-full bg-stake-blue/10 blur-[120px] glow-2" />
        
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:py-32 lg:px-8">
          <div>
            <span className="inline-block rounded-full border border-stake-green/20 bg-stake-green/5 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-stake-green hero-badge">
              Virtual Sports Betting
            </span>
            <h1 className="mt-8 max-w-4xl text-5xl font-bold leading-[1.1] tracking-tight sm:text-7xl lg:text-8xl hero-title perspective-[1000px]">
              <span className="inline-block">Precision </span>
              <span className="inline-block">Predicts. </span>
              <span className="block bg-gradient-to-r from-stake-green to-stake-blue bg-clip-text text-transparent">
                Victory Awaits.
              </span>
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-stake-textSecondary sm:text-xl hero-p">
              Experience the future of virtual betting. Predict live matches, track real-time odds, and climb the leaderboard using zero-risk virtual coins.
            </p>
            <div className="mt-12 flex flex-wrap gap-5 hero-btns">
              <Link
                to="/login"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-2xl bg-stake-green px-8 py-4 font-bold text-black transition-all hover:scale-105 active:scale-95"
              >
                <div className="absolute inset-0 bg-white/20 opacity-0 transition-opacity group-hover:opacity-100" />
                Get Started
                <Icon name="arrow_forward" className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <a
                href="#how-it-works"
                className="glass inline-flex items-center gap-2 rounded-2xl px-8 py-4 font-bold text-stake-textPrimary transition-all hover:glass-hover active:scale-95"
              >
                <Icon name="play_circle" className="h-5 w-5" />
                Explore Markets
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="mx-auto max-w-7xl px-4 py-24 lg:px-8 sports-section">
        <div className="mb-16 reveal-item">
          <h2 className="text-3xl font-bold sm:text-4xl">Available Sports</h2>
          <p className="mt-4 text-stake-textSecondary">Real-time markets updated every second.</p>
        </div>
        <div className="grid gap-8 lg:grid-cols-3">
          {Object.entries(SPORT_CONFIG).map(([key, sport]) => (
            <div
              key={key}
              className="glass group relative overflow-hidden rounded-[32px] p-8 transition-all hover:glass-hover hover:neon-border-green reveal-item"
            >
              <div className="relative z-10">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 text-4xl transition-transform group-hover:scale-110">
                  {sport.icon}
                </div>
                <h3 className="mt-6 text-2xl font-bold">{sport.label}</h3>
                <p className="mt-3 leading-relaxed text-stake-textSecondary">{sport.description}</p>
                <div className="mt-8 flex items-center gap-2 text-sm font-bold text-stake-green">
                  <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-stake-green" />
                  {liveMatches.filter((match) => match.sport === key).length} LIVE NOW
                </div>
              </div>
              <div className="absolute right-[-10%] top-[-10%] h-32 w-32 rounded-full bg-stake-green/5 blur-3xl transition-all group-hover:bg-stake-green/10" />
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-32 lg:px-8 matches-section">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end reveal-item">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-stake-green">Hot Market</span>
            <h2 className="mt-2 text-3xl font-bold sm:text-4xl">Featured Live Action</h2>
          </div>
          <Link to="/dashboard" className="text-sm font-bold text-stake-textSecondary hover:text-stake-green">
            View all matches →
          </Link>
        </div>
        <div className="mt-12 grid gap-6 lg:grid-cols-2 xl:grid-cols-3 reveal-item">
          {liveMatches.slice(0, 3).map((match, index) => (
            <MatchCard key={match.id} match={match} index={index} />
          ))}
        </div>
      </section>

      <footer className="border-t border-stake-border/50 px-4 py-12 text-center lg:px-8">
        <div className="mx-auto max-w-2xl">
          <p className="text-sm font-medium text-stake-textSecondary">
            This is a simulation project for entertainment purposes only. No real money can be wagered or won.
          </p>
          <p className="mt-4 text-xs text-stake-textMuted leading-relaxed">{DISCLAIMER}</p>
          <div className="mt-8 flex justify-center gap-6">
            <span className="text-xs font-bold text-stake-textMuted uppercase tracking-widest">© 2026 StakeZone</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
