import type { FormEvent } from 'react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { showToast } from '../components/ui/Toast';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { login, isLoading } = useAuth();
  const [form, setForm] = useState({
    email: searchParams.get('checkEmail') ?? '',
    password: '',
  });
  const [error, setError] = useState('');
  const checkEmail = searchParams.get('checkEmail');

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError('');

    if (!emailPattern.test(form.email)) {
      setError('Enter a valid email address.');
      return;
    }

    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    try {
      await login(form.email, form.password);
      showToast({
        title: 'Welcome back',
        description: 'Your StakeZone session is ready.',
        tone: 'success',
      });
      navigate(location.state?.from ?? '/dashboard');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Invalid credentials';
      const nextMessage =
        message.toLowerCase().includes('email not confirmed')
          ? 'Your email is not confirmed yet. Open the verification link from Supabase and try again.'
          : message;
      setError(nextMessage);
      showToast({
        title: 'Login failed',
        description: nextMessage,
        tone: 'error',
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex min-h-screen items-center justify-center bg-stake-bg p-4"
    >
      <form onSubmit={handleSubmit} className="w-full max-w-md rounded-[32px] border border-stake-border bg-stake-card p-8">
        <h1 className="text-3xl font-semibold text-stake-textPrimary">Login</h1>
        <p className="mt-3 text-sm text-stake-textSecondary">
          Sign in with your Supabase-backed StakeZone account.
        </p>
        {checkEmail ? (
          <div className="mt-5 rounded-2xl border border-stake-blue/30 bg-stake-blue/10 p-4 text-sm text-stake-textSecondary">
            <p className="font-semibold text-stake-textPrimary">Verify your email first</p>
            <p className="mt-2">
              A confirmation link was sent to <span className="text-stake-textPrimary">{checkEmail}</span>.
              Open that email, verify the account, then come back and sign in.
            </p>
          </div>
        ) : null}
        <div className="mt-6 space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-stake-textSecondary">Email address</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
              className="w-full rounded-2xl border border-stake-border bg-stake-input px-4 py-3 text-stake-textPrimary outline-none"
              placeholder="mridul@stakezone.com"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-stake-textSecondary">Password</label>
            <input
              type="password"
              required
              minLength={6}
              value={form.password}
              onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
              className="w-full rounded-2xl border border-stake-border bg-stake-input px-4 py-3 text-stake-textPrimary outline-none"
              placeholder="Enter your password"
            />
          </div>
        </div>
        {error ? <p className="mt-4 text-sm text-stake-red">{error}</p> : null}
        <button
          disabled={isLoading}
          className="mt-6 w-full rounded-2xl bg-stake-green px-4 py-3 font-semibold text-black disabled:opacity-70"
        >
          {isLoading ? 'Signing in...' : 'Sign In'}
        </button>
        <p className="mt-4 text-sm text-stake-textSecondary">
          No account yet?{' '}
          <Link to="/register" className="text-stake-blue">
            Create one
          </Link>
        </p>
      </form>
    </motion.div>
  );
};
