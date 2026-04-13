import { useEffect, useState } from 'react';
import { mockApi } from '../lib/api';
import type { Match } from '../types';

export const useMatch = (matchId: string) => {
  const [match, setMatch] = useState<Match | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMatch = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await mockApi.get<Match>(`/matches/${matchId}`);
        setMatch(response.data);
      } catch (err) {
        setError('Match details are unavailable.');
      } finally {
        setIsLoading(false);
      }
    };

    void fetchMatch();
  }, [matchId]);

  return { match, isLoading, error };
};
