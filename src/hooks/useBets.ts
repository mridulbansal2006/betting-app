import { useEffect, useMemo, useState } from 'react';
import { mockApi } from '../lib/api';
import type { Bet, BetStatus } from '../types';

export const useBets = (userId: string, status?: BetStatus) => {
  const [bets, setBets] = useState<Bet[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBets = async () => {
      if (!userId) {
        setBets([]);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const response = await mockApi.get<Bet[]>('/bets', {
          params: {
            userId,
            _sort: 'createdAt',
            _order: 'desc',
          },
        });
        setBets(response.data);
      } catch (err) {
        setError('Unable to load your bets.');
      } finally {
        setIsLoading(false);
      }
    };

    void fetchBets();
  }, [userId]);

  const filteredBets = useMemo(() => {
    return status ? bets.filter((bet) => bet.status === status) : bets;
  }, [bets, status]);

  return { bets: filteredBets, isLoading, error };
};
