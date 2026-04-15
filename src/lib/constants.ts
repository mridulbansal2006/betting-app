import type { Sport } from '../types';

export const SPORT_CONFIG: Record<
  Sport,
  { label: string; icon: string; accent: string; description: string }
> = {
  cricket: {
    label: 'Cricket',
    icon: '🏏',
    accent: 'from-stake-green/20 to-stake-green/5',
    description: 'IPL markets, player props, and live innings commentary.',
  },
  football: {
    label: 'Football',
    icon: '⚽',
    accent: 'from-stake-blue/20 to-stake-blue/5',
    description: 'Premier League, La Liga, and UCL 1X2 plus totals.',
  },
  tennis: {
    label: 'Tennis',
    icon: '🎾',
    accent: 'from-stake-yellow/20 to-stake-yellow/5',
    description: 'ATP and WTA match winner, set winner, and totals.',
  },
  f1: {
    label: 'Formula 1',
    icon: '🏎️',
    accent: 'from-stake-red/20 to-stake-red/5',
    description: 'Grand Prix winners, podium finishes, and fastest lap markets.',
  },
};

export const NAV_ITEMS = [
  { to: '/dashboard', label: 'Home', icon: 'dashboard' },
  { to: '/sports/cricket', label: 'Cricket', icon: 'shield' },
  { to: '/sports/football', label: 'Football', icon: 'sports_volleyball' },
  { to: '/sports/tennis', label: 'Tennis', icon: 'emoji_events' },
  { to: '/sports/f1', label: 'Formula 1', icon: 'speed' },
  { to: '/my-bets', label: 'My Bets', icon: 'format_list_bulleted' },
  { to: '/leaderboard', label: 'Leaderboard', icon: 'leaderboard' },
  { to: '/wallet', label: 'Wallet', icon: 'account_balance_wallet' },
  { to: '/profile', label: 'Profile', icon: 'person' },
];

export const DISCLAIMER =
  'StakeZone is a simulation project built for educational purposes. No real money is involved. All bets use virtual coins. Built as a WAP Group Project at Newton School of Technology.';

export const LEADERBOARD_PERIODS = [
  { id: 'daily', label: 'Daily' },
  { id: 'weekly', label: 'Weekly' },
  { id: 'all-time', label: 'All Time' },
] as const;
