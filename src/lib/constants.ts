import { Trophy, BadgeIndianRupee, CircleUserRound, LayoutDashboard, ListOrdered, Shield, Volleyball } from 'lucide-react';
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
};

export const NAV_ITEMS = [
  { to: '/dashboard', label: 'Home', icon: LayoutDashboard },
  { to: '/sports/cricket', label: 'Cricket', icon: Shield },
  { to: '/sports/football', label: 'Football', icon: Volleyball },
  { to: '/sports/tennis', label: 'Tennis', icon: Trophy },
  { to: '/my-bets', label: 'My Bets', icon: ListOrdered },
  { to: '/leaderboard', label: 'Leaderboard', icon: Trophy },
  { to: '/wallet', label: 'Wallet', icon: BadgeIndianRupee },
  { to: '/profile', label: 'Profile', icon: CircleUserRound },
];

export const DISCLAIMER =
  'StakeZone is a simulation project built for educational purposes. No real money is involved. All bets use virtual coins. Built as a WAP Group Project at Newton School of Technology.';

export const LEADERBOARD_PERIODS = [
  { id: 'daily', label: 'Daily' },
  { id: 'weekly', label: 'Weekly' },
  { id: 'all-time', label: 'All Time' },
] as const;
