import { useCallback, useEffect, useMemo, useState } from 'react';
import { mockApi } from '../lib/api';
import type { Match, MatchStatus, Sport } from '../types';

export const useMatches = (sport?: Sport, status?: MatchStatus) => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMatches = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await mockApi.get<Match[]>('/matches');
      setMatches(response.data);
    } catch (err) {
      setError('Unable to fetch matches right now.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchMatches();
  }, [fetchMatches]);

  useEffect(() => {
    const shouldPoll = status === 'live' || !status;

    if (!shouldPoll) {
      return undefined;
    }

    const interval = window.setInterval(() => {
      void fetchMatches();
    }, 30000);

    return () => window.clearInterval(interval);
  }, [fetchMatches, status]);

  const filteredMatches = useMemo(() => {
    return matches.filter((match) => {
      const sportMatches = sport ? match.sport === sport : true;
      const statusMatches = status ? match.status === status : true;
      return sportMatches && statusMatches;
    });
  }, [matches, sport, status]);

  return { matches: filteredMatches, isLoading, error, refetch: fetchMatches };
};
