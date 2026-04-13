import type { ReactNode } from 'react';
import { addHours, isAfter } from 'date-fns';
import { createContext, useCallback, useContext, useEffect, useMemo, useReducer } from 'react';
import { mockApi } from '../lib/api';
import { createId } from '../lib/utils';
import { useAuth } from './AuthContext';
import type { Transaction } from '../types';

interface WalletState {
  balance: number;
  transactions: Transaction[];
  isLoading: boolean;
}

interface WalletContextType extends WalletState {
  deductBalance: (amount: number) => Promise<void>;
  addBalance: (amount: number) => Promise<void>;
  claimDailyBonus: () => Promise<boolean>;
  canClaimBonus: boolean;
  nextBonusTime: Date | null;
  fetchTransactions: () => Promise<void>;
}

type WalletAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_BALANCE'; payload: number }
  | { type: 'DEDUCT'; payload: number }
  | { type: 'ADD'; payload: number }
  | { type: 'SET_TRANSACTIONS'; payload: Transaction[] };

const walletReducer = (state: WalletState, action: WalletAction): WalletState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_BALANCE':
      return { ...state, balance: action.payload };
    case 'DEDUCT':
      return { ...state, balance: state.balance - action.payload };
    case 'ADD':
      return { ...state, balance: state.balance + action.payload };
    case 'SET_TRANSACTIONS':
      return { ...state, transactions: action.payload };
    default:
      return state;
  }
};

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const { user, updateUser } = useAuth();
  const [state, dispatch] = useReducer(walletReducer, {
    balance: user?.balance ?? 0,
    transactions: [],
    isLoading: false,
  });

  useEffect(() => {
    dispatch({ type: 'SET_BALANCE', payload: user?.balance ?? 0 });
  }, [user?.balance]);

  const fetchTransactions = useCallback(async () => {
    if (!user) {
      dispatch({ type: 'SET_TRANSACTIONS', payload: [] });
      return;
    }

    dispatch({ type: 'SET_LOADING', payload: true });

    try {
      const response = await mockApi.get<Transaction[]>('/transactions', {
        params: { userId: user.id, _sort: 'createdAt', _order: 'desc' },
      });
      dispatch({ type: 'SET_TRANSACTIONS', payload: response.data });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, [user]);

  useEffect(() => {
    void fetchTransactions();
  }, [fetchTransactions]);

  const syncBalance = async (nextBalance: number) => {
    if (!user) {
      return;
    }

    await updateUser({ balance: nextBalance });
  };

  const deductBalance = async (amount: number) => {
    const nextBalance = Math.max(0, state.balance - amount);
    dispatch({ type: 'DEDUCT', payload: amount });
    await syncBalance(nextBalance);
  };

  const addBalance = async (amount: number) => {
    const nextBalance = state.balance + amount;
    dispatch({ type: 'ADD', payload: amount });
    await syncBalance(nextBalance);
  };

  const nextBonusTime = useMemo(() => {
    if (!user?.lastBonusClaimed) {
      return null;
    }

    return addHours(new Date(user.lastBonusClaimed), 24);
  }, [user?.lastBonusClaimed]);

  const canClaimBonus = useMemo(() => {
    if (!nextBonusTime) {
      return true;
    }

    return isAfter(new Date(), nextBonusTime);
  }, [nextBonusTime]);

  const claimDailyBonus = async () => {
    if (!user || !canClaimBonus) {
      return false;
    }

    const bonusAmount = 500;
    const claimedAt = new Date().toISOString();
    const nextBalance = state.balance + bonusAmount;

    await mockApi.post('/transactions', {
      id: createId('t'),
      userId: user.id,
      type: 'daily_bonus',
      amount: bonusAmount,
      balanceAfter: nextBalance,
      description: 'Daily bonus claimed',
      createdAt: claimedAt,
    });

    dispatch({ type: 'ADD', payload: bonusAmount });
    await updateUser({
      balance: nextBalance,
      lastBonusClaimed: claimedAt,
    });
    await fetchTransactions();
    return true;
  };

  const value = useMemo<WalletContextType>(
    () => ({
      ...state,
      deductBalance,
      addBalance,
      claimDailyBonus,
      canClaimBonus,
      nextBonusTime,
      fetchTransactions,
    }),
    [state, canClaimBonus, nextBonusTime, fetchTransactions],
  );

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
};

export const useWallet = () => {
  const context = useContext(WalletContext);

  if (!context) {
    throw new Error('useWallet must be used within WalletProvider');
  }

  return context;
};
