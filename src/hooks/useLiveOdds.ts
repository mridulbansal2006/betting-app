import { useEffect, useState } from 'react';

export function useLiveOdds(initialOdds: number, isLive: boolean) {
  const [odds, setOdds] = useState(initialOdds);
  const [direction, setDirection] = useState<'up' | 'down' | null>(null);

  useEffect(() => {
    setOdds(initialOdds);
  }, [initialOdds]);

  useEffect(() => {
    if (!isLive) {
      return undefined;
    }

    const interval = window.setInterval(() => {
      setOdds((currentOdds) => {
        const change = (Math.random() - 0.5) * 0.1;
        const nextOdds = Math.max(1.01, Number((currentOdds + change).toFixed(2)));
        setDirection(nextOdds > currentOdds ? 'up' : 'down');
        window.setTimeout(() => setDirection(null), 2000);
        return nextOdds;
      });
    }, 5000 + Math.random() * 5000);

    return () => window.clearInterval(interval);
  }, [isLive]);

  return { odds, direction };
}
