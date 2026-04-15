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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-stake-bg p-4"
    >
      {/* Background Glows */}
      <div className="absolute left-[-10%] top-[-10%] h-[40%] w-[40%] rounded-full bg-stake-green/5 blur-[120px]" />
      <div className="absolute right-[-10%] bottom-[-10%] h-[40%] w-[40%] rounded-full bg-stake-blue/5 blur-[120px]" />

      <form onSubmit={handleSubmit} className="glass relative w-full max-w-md rounded-[32px] p-10 shadow-2xl">
        <div className="mb-8">
          <Link to="/" className="text-[10px] font-bold uppercase tracking-[0.3em] text-stake-green hover:underline">
            ← Back to Home
          </Link>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-stake-textPrimary">Welcome back</h1>
          <p className="mt-2 text-stake-textSecondary">
            Sign in to your StakeZone account.
          </p>
        </div>

        {checkEmail ? (
          <div className="mb-6 rounded-2xl border border-stake-blue/20 bg-stake-blue/5 p-4 text-sm leading-relaxed text-stake-textSecondary">
            <p className="font-bold text-stake-blue">Verification Required</p>
            <p className="mt-1">
              Check <span className="text-stake-textPrimary">{checkEmail}</span> for a confirmation link.
            </p>
          </div>
        ) : null}

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-stake-textMuted">Email Address</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
              className="w-full rounded-2xl border border-stake-border bg-stake-bg/50 px-5 py-4 text-stake-textPrimary outline-none transition-all focus:neon-border-green focus:bg-stake-bg/80"
              placeholder="e.g., alex@stakezone.com"
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-widest text-stake-textMuted">Password</label>
            </div>
            <input
              type="password"
              required
              minLength={6}
              value={form.password}
              onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
              className="w-full rounded-2xl border border-stake-border bg-stake-bg/50 px-5 py-4 text-stake-textPrimary outline-none transition-all focus:neon-border-green focus:bg-stake-bg/80"
              placeholder="••••••••"
            />
          </div>
        </div>

        {error ? (
          <motion.p
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="mt-6 text-sm font-medium text-stake-red"
          >
            {error}
          </motion.p>
        ) : null}

        <button
          disabled={isLoading}
          className="group relative mt-8 flex w-full items-center justify-center overflow-hidden rounded-2xl bg-stake-green py-4 font-bold text-black transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
        >
          <div className="absolute inset-0 bg-white/20 opacity-0 transition-opacity group-hover:opacity-100" />
          {isLoading ? (
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-black/30 border-t-black" />
          ) : (
            'Sign In to Dashboard'
          )}
        </button>

        <p className="mt-8 text-center text-sm font-medium text-stake-textSecondary">
          New to StakeZone?{' '}
          <Link to="/register" className="font-bold text-stake-blue hover:text-stake-blue/80">
            Create an Account
          </Link>
        </p>
      </form>
    </motion.div>

  );
};
