import { NavLink } from 'react-router-dom';
import { NAV_ITEMS } from '../../lib/constants';
import { cn, formatBalance } from '../../lib/utils';
import { useAuth } from '../../contexts/AuthContext';

export const Sidebar = () => {
  const { user } = useAuth();

  return (
    <aside className="hidden h-screen w-60 shrink-0 border-r border-stake-border bg-stake-card p-5 lg:block">
      <div className="rounded-2xl bg-stake-bg px-4 py-3">
        <p className="text-xs uppercase tracking-[0.2em] text-stake-textMuted">StakeZone</p>
        <p className="mt-2 font-mono text-2xl font-bold text-stake-green">{formatBalance(user?.balance ?? 0)} 🪙</p>
      </div>
      <nav className="mt-8 space-y-2">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition',
                isActive
                  ? 'bg-stake-green text-black'
                  : 'text-stake-textSecondary hover:bg-stake-hover hover:text-stake-textPrimary',
              )
            }
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};
