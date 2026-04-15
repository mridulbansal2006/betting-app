import { motion } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import { Icon } from '../components/ui/Icon';

export const CheckEmailPage = () => {
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email');

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex min-h-screen items-center justify-center bg-stake-bg p-4"
    >
      <div className="w-full max-w-xl rounded-[32px] border border-stake-border bg-stake-card p-8">
        <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-stake-blue/10">
          <Icon name="mark_email_read" className="h-8 w-8 text-stake-blue" fill={true} />
        </div>
        <h1 className="mt-6 text-3xl font-semibold text-stake-textPrimary">Check your email</h1>
        <p className="mt-3 text-sm leading-6 text-stake-textSecondary">
          Your StakeZone account has been created. Supabase needs you to verify the email address
          before the first login.
        </p>
        {email ? (
          <div className="mt-5 rounded-2xl border border-stake-blue/30 bg-stake-blue/10 px-4 py-3 text-sm text-stake-textSecondary">
            Confirmation email sent to <span className="font-semibold text-stake-textPrimary">{email}</span>
          </div>
        ) : null}
        <div className="mt-6 space-y-3 rounded-2xl bg-stake-input/80 p-5 text-sm text-stake-textSecondary">
          <p>1. Open the confirmation email from Supabase.</p>
          <p>2. Click the verification link.</p>
          <p>3. Return here and sign in to start using StakeZone.</p>
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            to={email ? `/login?checkEmail=${encodeURIComponent(email)}` : '/login'}
            className="rounded-2xl bg-stake-green px-5 py-3 font-semibold text-black"
          >
            Go to Login
          </Link>
          <Link
            to="/register"
            className="rounded-2xl border border-stake-border px-5 py-3 font-semibold text-stake-textPrimary"
          >
            Use another email
          </Link>
        </div>
      </div>
    </motion.div>
  );
};
