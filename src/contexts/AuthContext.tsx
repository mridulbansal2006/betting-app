import type { ReactNode } from 'react';
import { AxiosError } from 'axios';
import type { User as SupabaseUser } from '@supabase/supabase-js';
import { createContext, useContext, useEffect, useMemo, useReducer } from 'react';
import { mockApi } from '../lib/api';
import { createId } from '../lib/utils';
import { assertSupabaseConfigured, supabase } from '../lib/supabase';
import type { Sport, User } from '../types';

interface AuthState {
  user: User | null;
  isLoading: boolean;
}

interface AuthContextType extends AuthState {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    name: string,
    email: string,
    password: string,
  ) => Promise<{ emailConfirmationRequired: boolean }>;
  logout: () => Promise<void>;
  updateUser: (updates: Partial<User>) => Promise<void>;
}

type AuthAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'LOGIN'; payload: User }
  | { type: 'LOGOUT' }
  | { type: 'UPDATE_USER'; payload: Partial<User> };

const initialState: AuthState = {
  user: null,
  isLoading: true,
};

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'LOGIN':
      return { user: action.payload, isLoading: false };
    case 'LOGOUT':
      return { user: null, isLoading: false };
    case 'UPDATE_USER':
      return state.user
        ? { ...state, user: { ...state.user, ...action.payload } }
        : state;
    default:
      return state;
  }
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const toAppUser = (supabaseUser: SupabaseUser): User => {
  const metadata = supabaseUser.user_metadata ?? {};
  const inferredName =
    typeof metadata.name === 'string' && metadata.name
      ? metadata.name
      : supabaseUser.email?.split('@')[0] ?? 'Player';

  return {
    id: supabaseUser.id,
    name: inferredName,
    email: supabaseUser.email ?? '',
    avatar:
      typeof metadata.avatar === 'string' && metadata.avatar
        ? metadata.avatar
        : `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(inferredName)}`,
    balance: typeof metadata.balance === 'number' ? metadata.balance : 10000,
    totalBets: typeof metadata.totalBets === 'number' ? metadata.totalBets : 0,
    totalWins: typeof metadata.totalWins === 'number' ? metadata.totalWins : 0,
    totalLosses: typeof metadata.totalLosses === 'number' ? metadata.totalLosses : 0,
    profit: typeof metadata.profit === 'number' ? metadata.profit : 0,
    winStreak: typeof metadata.winStreak === 'number' ? metadata.winStreak : 0,
    favoriteSport:
      metadata.favoriteSport === 'cricket' ||
      metadata.favoriteSport === 'football' ||
      metadata.favoriteSport === 'tennis'
        ? (metadata.favoriteSport as Sport)
        : 'cricket',
    joinedAt:
      typeof metadata.joinedAt === 'string' && metadata.joinedAt
        ? metadata.joinedAt
        : supabaseUser.created_at,
    lastBonusClaimed:
      typeof metadata.lastBonusClaimed === 'string' ? metadata.lastBonusClaimed : null,
  };
};

const toMetadata = (user: User) => ({
  name: user.name,
  avatar: user.avatar,
  balance: user.balance,
  totalBets: user.totalBets,
  totalWins: user.totalWins,
  totalLosses: user.totalLosses,
  profit: user.profit,
  winStreak: user.winStreak,
  favoriteSport: user.favoriteSport,
  joinedAt: user.joinedAt,
  lastBonusClaimed: user.lastBonusClaimed,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    let isActive = true;

    const restoreSession = async () => {
      try {
        assertSupabaseConfigured();
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!isActive) {
          return;
        }

        if (session?.user) {
          dispatch({ type: 'LOGIN', payload: toAppUser(session.user) });
        } else {
          dispatch({ type: 'SET_LOADING', payload: false });
        }
      } catch {
        if (isActive) {
          dispatch({ type: 'SET_LOADING', payload: false });
        }
      }
    };

    void restoreSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        dispatch({ type: 'LOGIN', payload: toAppUser(session.user) });
      } else {
        dispatch({ type: 'LOGOUT' });
      }
    });

    return () => {
      isActive = false;
      subscription.unsubscribe();
    };
  }, []);

  const getAuthErrorMessage = (error: unknown, fallback: string) => {
    if (error instanceof AxiosError) {
      return (error.response?.data as { message?: string } | undefined)?.message ?? fallback;
    }

    if (error instanceof Error) {
      return error.message;
    }

    return fallback;
  };

  const login = async (email: string, password: string) => {
    dispatch({ type: 'SET_LOADING', payload: true });

    try {
      assertSupabaseConfigured();
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      if (!data.user) {
        throw new Error('Unable to login');
      }

      dispatch({ type: 'LOGIN', payload: toAppUser(data.user) });
    } catch (error) {
      dispatch({ type: 'SET_LOADING', payload: false });
      throw new Error(getAuthErrorMessage(error, 'Unable to login'));
    }
  };

  const register = async (name: string, email: string, password: string) => {
    dispatch({ type: 'SET_LOADING', payload: true });

    try {
      assertSupabaseConfigured();
      const joinedAt = new Date().toISOString();
      const avatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`;
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            avatar,
            balance: 10000,
            totalBets: 0,
            totalWins: 0,
            totalLosses: 0,
            profit: 0,
            winStreak: 0,
            favoriteSport: 'cricket',
            joinedAt,
            lastBonusClaimed: null,
          },
        },
      });

      if (error) {
        throw error;
      }

      if (!data.user) {
        throw new Error('Unable to register');
      }

      await mockApi.post('/transactions', {
        id: createId('t'),
        userId: data.user.id,
        type: 'signup_bonus',
        amount: 10000,
        balanceAfter: 10000,
        description: 'Welcome bonus',
        createdAt: new Date().toISOString(),
      });

      if (!data.session) {
        dispatch({ type: 'SET_LOADING', payload: false });
        return { emailConfirmationRequired: true };
      }

      dispatch({ type: 'LOGIN', payload: toAppUser(data.user) });
      return { emailConfirmationRequired: false };
    } catch (error) {
      dispatch({ type: 'SET_LOADING', payload: false });
      throw new Error(getAuthErrorMessage(error, 'Unable to register'));
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    dispatch({ type: 'LOGOUT' });
  };

  const updateUser = async (updates: Partial<User>) => {
    if (!state.user) {
      return;
    }

    const nextUser = { ...state.user, ...updates };
    dispatch({ type: 'UPDATE_USER', payload: updates });

    try {
      assertSupabaseConfigured();
      const { error } = await supabase.auth.updateUser({
        data: toMetadata(nextUser),
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      throw new Error(getAuthErrorMessage(error, 'Unable to sync user profile'));
    }
  };

  const value = useMemo<AuthContextType>(
    () => ({
      ...state,
      isAuthenticated: Boolean(state.user),
      login,
      register,
      logout,
      updateUser,
    }),
    [state],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
};
