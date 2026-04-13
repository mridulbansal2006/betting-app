import type { ReactNode } from 'react';
import confetti from 'canvas-confetti';
import { createContext, useContext, useEffect, useMemo, useReducer } from 'react';
import { mockApi } from '../lib/api';
import { createId } from '../lib/utils';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useAuth } from './AuthContext';
import { useWallet } from './WalletContext';
import { showToast } from '../components/ui/Toast';
import type { BetSelection } from '../types';

interface BetSlipState {
  selections: BetSelection[];
  isOpen: boolean;
  isPlacing: boolean;
}

interface BetSlipContextType extends BetSlipState {
  totalStake: number;
  totalPayout: number;
  addSelection: (selection: Omit<BetSelection, 'stake'>) => void;
  removeSelection: (matchId: string, marketName: string) => void;
  updateStake: (matchId: string, marketName: string, stake: number) => void;
  clearSlip: () => void;
  toggleSlip: () => void;
  placeBets: () => Promise<void>;
}

type BetSlipAction =
  | { type: 'ADD'; payload: BetSelection }
  | { type: 'REMOVE'; payload: { matchId: string; marketName: string } }
  | { type: 'UPDATE_STAKE'; payload: { matchId: string; marketName: string; stake: number } }
  | { type: 'CLEAR' }
  | { type: 'TOGGLE' }
  | { type: 'SET_PLACING'; payload: boolean };

const reducer = (state: BetSlipState, action: BetSlipAction): BetSlipState => {
  switch (action.type) {
    case 'ADD': {
      const exists = state.selections.some(
        (selection) =>
          selection.matchId === action.payload.matchId &&
          selection.marketName === action.payload.marketName,
      );

      if (exists) {
        return {
          ...state,
          selections: state.selections.filter(
            (selection) =>
              !(
                selection.matchId === action.payload.matchId &&
                selection.marketName === action.payload.marketName
              ),
          ),
        };
      }

      return {
        ...state,
        isOpen: true,
        selections: [...state.selections, action.payload],
      };
    }
    case 'REMOVE':
      return {
        ...state,
        selections: state.selections.filter(
          (selection) =>
            !(
              selection.matchId === action.payload.matchId &&
              selection.marketName === action.payload.marketName
            ),
        ),
      };
    case 'UPDATE_STAKE':
      return {
        ...state,
        selections: state.selections.map((selection) =>
          selection.matchId === action.payload.matchId &&
          selection.marketName === action.payload.marketName
            ? { ...selection, stake: action.payload.stake }
            : selection,
        ),
      };
    case 'CLEAR':
      return { ...state, selections: [] };
    case 'TOGGLE':
      return { ...state, isOpen: !state.isOpen };
    case 'SET_PLACING':
      return { ...state, isPlacing: action.payload };
    default:
      return state;
  }
};

const BetSlipContext = createContext<BetSlipContextType | undefined>(undefined);

export const BetSlipProvider = ({ children }: { children: ReactNode }) => {
  const { user, updateUser } = useAuth();
  const { balance, deductBalance, fetchTransactions } = useWallet();
  const [persistedSelections, setPersistedSelections] = useLocalStorage<BetSelection[]>(
    'stakezone-betslip',
    [],
  );
  const [state, dispatch] = useReducer(reducer, {
    selections: persistedSelections,
    isOpen: false,
    isPlacing: false,
  });

  useEffect(() => {
    if (!user && state.selections.length) {
      syncSelections([]);
      dispatch({ type: 'CLEAR' });
    }
  }, [state.selections.length, user]);

  const syncSelections = (nextSelections: BetSelection[]) => {
    setPersistedSelections(nextSelections);
  };

  const addSelection = (selection: Omit<BetSelection, 'stake'>) => {
    const candidate = { ...selection, stake: 100 };
    const exists = state.selections.some(
      (item) => item.matchId === candidate.matchId && item.marketName === candidate.marketName,
    );
    const nextSelections = exists
      ? state.selections.filter(
          (item) => !(item.matchId === candidate.matchId && item.marketName === candidate.marketName),
        )
      : [...state.selections, candidate];

    syncSelections(nextSelections);
    dispatch({ type: 'ADD', payload: candidate });
  };

  const removeSelection = (matchId: string, marketName: string) => {
    const nextSelections = state.selections.filter(
      (selection) => !(selection.matchId === matchId && selection.marketName === marketName),
    );
    syncSelections(nextSelections);
    dispatch({ type: 'REMOVE', payload: { matchId, marketName } });
  };

  const updateStake = (matchId: string, marketName: string, stake: number) => {
    const clampedStake = Math.min(5000, Math.max(10, Number.isNaN(stake) ? 10 : stake));
    const nextSelections = state.selections.map((selection) =>
      selection.matchId === matchId && selection.marketName === marketName
        ? { ...selection, stake: clampedStake }
        : selection,
    );
    syncSelections(nextSelections);
    dispatch({ type: 'UPDATE_STAKE', payload: { matchId, marketName, stake: clampedStake } });
  };

  const clearSlip = () => {
    syncSelections([]);
    dispatch({ type: 'CLEAR' });
  };

  const toggleSlip = () => dispatch({ type: 'TOGGLE' });

  const totalStake = useMemo(
    () => state.selections.reduce((sum, selection) => sum + selection.stake, 0),
    [state.selections],
  );

  const totalPayout = useMemo(
    () =>
      state.selections.reduce(
        (sum, selection) => sum + selection.stake * selection.odds,
        0,
      ),
    [state.selections],
  );

  const placeBets = async () => {
    if (!user || !state.selections.length) {
      return;
    }

    if (totalStake > balance) {
      showToast({
        title: 'Insufficient balance',
        description: 'Reduce your stake or claim the daily bonus first.',
        tone: 'error',
      });
      return;
    }

    dispatch({ type: 'SET_PLACING', payload: true });

    try {
      const timestamp = new Date().toISOString();
      let runningBalance = balance;
      const selectionsWithBalance = state.selections.map((selection) => {
        runningBalance = Math.max(0, runningBalance - selection.stake);
        return {
          selection,
          balanceAfter: runningBalance,
        };
      });

      await Promise.all(
        selectionsWithBalance.map(async ({ selection, balanceAfter }) => {
          const betId = createId('b');

          await mockApi.post('/bets', {
            id: betId,
            userId: user.id,
            matchId: selection.matchId,
            sport: selection.sport,
            matchTitle: selection.matchTitle,
            league: selection.league,
            marketName: selection.marketName,
            selection: selection.selection,
            odds: selection.odds,
            stake: selection.stake,
            potentialPayout: selection.stake * selection.odds,
            status: 'pending',
            profit: null,
            createdAt: timestamp,
            settledAt: null,
          });

          await mockApi.post('/transactions', {
            id: createId('t'),
            userId: user.id,
            type: 'bet_placed',
            amount: -selection.stake,
            balanceAfter,
            betId,
            description: `Bet on ${selection.matchTitle} — ${selection.selection}`,
            createdAt: timestamp,
          });
        }),
      );

      await deductBalance(totalStake);
      await updateUser({
        totalBets: user.totalBets + state.selections.length,
      });
      await fetchTransactions();
      clearSlip();
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.8 } });
      showToast({
        title: 'Bet placed successfully',
        description: 'Your selections have been added as pending bets.',
        tone: 'success',
      });
    } finally {
      dispatch({ type: 'SET_PLACING', payload: false });
    }
  };

  const value = useMemo<BetSlipContextType>(
    () => ({
      ...state,
      totalStake,
      totalPayout,
      addSelection,
      removeSelection,
      updateStake,
      clearSlip,
      toggleSlip,
      placeBets,
    }),
    [state, totalStake, totalPayout, balance],
  );

  return <BetSlipContext.Provider value={value}>{children}</BetSlipContext.Provider>;
};

export const useBetSlip = () => {
  const context = useContext(BetSlipContext);

  if (!context) {
    throw new Error('useBetSlip must be used within BetSlipProvider');
  }

  return context;
};
