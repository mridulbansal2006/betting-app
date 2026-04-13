import { clsx, type ClassValue } from 'clsx';
import { format, formatDistanceToNow, isToday, isTomorrow } from 'date-fns';
import { twMerge } from 'tailwind-merge';
import type { Match, MatchStatus } from '../types';

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const formatBalance = (value: number) =>
  new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: 0,
  }).format(value);

export const formatOdds = (value: number) => value.toFixed(2);

export const formatMatchTime = (date: string) => {
  const matchDate = new Date(date);

  if (isToday(matchDate)) {
    return `Today, ${format(matchDate, 'h:mm a')}`;
  }

  if (isTomorrow(matchDate)) {
    return `Tomorrow, ${format(matchDate, 'h:mm a')}`;
  }

  return format(matchDate, 'MMM d, h:mm a');
};

export const formatRelativeJoined = (date: string) => formatDistanceToNow(new Date(date), { addSuffix: true });

export const getStatusLabel = (match: Match): string => {
  if (match.status === 'live') {
    return match.sport === 'football' && match.minute ? `${match.minute}'` : 'LIVE';
  }

  if (match.status === 'completed') {
    return 'FT';
  }

  return formatMatchTime(match.startTime);
};

export const statusTone: Record<MatchStatus, string> = {
  live: 'text-stake-red border-stake-red/40 bg-stake-red/10',
  upcoming: 'text-stake-yellow border-stake-yellow/30 bg-stake-yellow/10',
  completed: 'text-stake-textSecondary border-stake-border bg-stake-hover/60',
};

export const getMatchTitle = (match: Match) =>
  `${match.homeTeam.shortName} vs ${match.awayTeam.shortName}`;

export const getWinRate = (wins: number, total: number) => (total === 0 ? 0 : (wins / total) * 100);

export const createId = (prefix: string) =>
  `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
