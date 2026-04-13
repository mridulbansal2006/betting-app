import type { FormEvent } from 'react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { showToast } from '../components/ui/Toast';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const RegisterPage = () => {
  const navigate = useNavigate();
  const { register, isLoading } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError('');

    if (form.name.trim().length < 2) {
      setError('Name must be at least 2 characters.');
      return;
    }

    if (!emailPattern.test(form.email)) {
      setError('Enter a valid email address.');
      return;
    }

    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const result = await register(form.name, form.email, form.password);

      if (result.emailConfirmationRequired) {
        showToast({
          title: 'Check your email',
          description: 'Your account was created. Confirm the email from Supabase, then sign in.',
          tone: 'success',
        });
        navigate(`/check-email?email=${encodeURIComponent(form.email)}`);
      } else {
        showToast({
          title: 'Account created',
          description: 'Your welcome bonus is already in the wallet.',
          tone: 'success',
        });
        navigate('/dashboard');
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to register';
      setError(message);
      showToast({
        title: 'Registration failed',
        description: message,
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
        <h1 className="text-3xl font-semibold text-stake-textPrimary">Create account</h1>
        <p className="mt-3 text-sm text-stake-textSecondary">
          Register with Supabase authentication and start with 10,000 virtual coins.
        </p>
        <div className="mt-6 space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-stake-textSecondary">Full name</label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
              className="w-full rounded-2xl border border-stake-border bg-stake-input px-4 py-3 text-stake-textPrimary outline-none"
              placeholder="Enter your full name"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-stake-textSecondary">Email address</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
              className="w-full rounded-2xl border border-stake-border bg-stake-input px-4 py-3 text-stake-textPrimary outline-none"
              placeholder="you@example.com"
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
              placeholder="Minimum 6 characters"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-stake-textSecondary">Confirm password</label>
            <input
              type="password"
              required
              minLength={6}
              value={form.confirmPassword}
              onChange={(event) =>
                setForm((current) => ({ ...current, confirmPassword: event.target.value }))
              }
              className="w-full rounded-2xl border border-stake-border bg-stake-input px-4 py-3 text-stake-textPrimary outline-none"
              placeholder="Retype your password"
            />
          </div>
        </div>
        {error ? <p className="mt-4 text-sm text-stake-red">{error}</p> : null}
        <button
          disabled={isLoading}
          className="mt-6 w-full rounded-2xl bg-stake-green px-4 py-3 font-semibold text-black disabled:opacity-70"
        >
          {isLoading ? 'Creating...' : 'Create Account'}
        </button>
        <p className="mt-4 text-sm text-stake-textSecondary">
          Already registered?{' '}
          <Link to="/login" className="text-stake-blue">
            Sign in
          </Link>
        </p>
      </form>
    </motion.div>
  );
};
