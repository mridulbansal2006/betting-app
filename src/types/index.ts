export type Sport = 'cricket' | 'football' | 'tennis' | 'f1';
export type MatchStatus = 'live' | 'upcoming' | 'completed';
export type BetStatus = 'pending' | 'won' | 'lost';
export type TransactionType = 'signup_bonus' | 'daily_bonus' | 'bet_placed' | 'bet_won' | 'bet_lost';

export interface Team {
  name: string;
  shortName: string;
  logo: string;
  color: string;
  score: string | null;
  scoreDetail: string | null;
}

export interface MarketOption {
  label: string;
  odds: number;
}

export interface Market {
  id: string;
  name: string;
  options: MarketOption[];
}

export interface CricketCommentaryItem {
  over: string;
  text: string;
  type: 'boundary' | 'normal' | 'wicket';
}

export interface FootballEventItem {
  minute: number;
  type: 'goal' | 'yellow_card' | 'red_card' | 'substitution';
  team: 'home' | 'away';
  player: string;
  detail?: string;
}

export interface TennisSet {
  set: number;
  home: number;
  away: number;
}

export interface Match {
  id: string;
  sport: Sport;
  league: string;
  leagueIcon: string;
  status: MatchStatus;
  startTime: string;
  minute?: number;
  homeTeam: Team;
  awayTeam: Team;
  venue: string;
  result?: string;
  odds: {
    home: number;
    draw: number | null;
    away: number;
  };
  markets: Market[];
  commentary: CricketCommentaryItem[];
  events?: FootballEventItem[];
  sets?: TennisSet[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  balance: number;
  totalBets: number;
  totalWins: number;
  totalLosses: number;
  profit: number;
  winStreak: number;
  favoriteSport: Sport;
  joinedAt: string;
  lastBonusClaimed: string | null;
}


export interface Bet {
  id: string;
  userId: string;
  matchId: string;
  sport: Sport;
  matchTitle: string;
  league: string;
  marketName: string;
  selection: string;
  odds: number;
  stake: number;
  potentialPayout: number;
  status: BetStatus;
  profit: number | null;
  createdAt: string;
  settledAt: string | null;
}

export interface Transaction {
  id: string;
  userId: string;
  type: TransactionType;
  amount: number;
  balanceAfter: number;
  description: string;
  createdAt: string;
  betId?: string;
}

export interface LeaderboardEntry {
  id: string;
  userId: string;
  rank: number;
  name: string;
  avatar: string;
  profit: number;
  winRate: number;
  totalBets: number;
}

export interface BetSelection {
  matchId: string;
  matchTitle: string;
  league: string;
  sport: Sport;
  marketName: string;
  selection: string;
  odds: number;
  stake: number;
}
