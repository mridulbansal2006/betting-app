import { useEffect, useState } from 'react';
import { mockApi } from '../lib/api';
import type { LeaderboardEntry } from '../types';

export const useLeaderboard = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await mockApi.get<LeaderboardEntry[]>('/leaderboard', {
          params: { _sort: 'rank', _order: 'asc' },
        });
        setLeaderboard(response.data);
      } catch (err) {
        setError('Leaderboard data is unavailable right now.');
      } finally {
        setIsLoading(false);
      }
    };

    void fetchLeaderboard();
  }, []);

  return { leaderboard, isLoading, error };
};
