import { NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { NAV_ITEMS } from '../../lib/constants';
import { cn, formatBalance } from '../../lib/utils';
import { Icon } from '../ui/Icon';

export const Sidebar = () => {
  const { user } = useAuth();

  return (
    <aside className="hidden h-screen w-72 shrink-0 border-r border-stake-border bg-stake-bg/50 p-6 backdrop-blur-xl lg:block">
      <div className="glass rounded-[24px] px-5 py-4">
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-stake-textMuted">StakeZone</p>
        <p className="mt-3 font-mono text-2xl font-bold tracking-tight text-stake-green decoration-stake-green/30 decoration-2">
          {formatBalance(user?.balance ?? 0)}
          <span className="ml-2 text-sm text-stake-textMuted">Coins</span>
        </p>
      </div>
      <nav className="mt-10 space-y-1.5">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              cn(
                'group flex items-center gap-3 rounded-2xl px-4 py-3.5 text-sm font-bold transition-all',
                isActive
                  ? 'bg-stake-green/10 text-stake-green neon-border-green'
                  : 'text-stake-textSecondary hover:bg-white/5 hover:text-stake-textPrimary',
              )
            }
          >
            <Icon
              name={item.icon}
              className={cn('h-6 w-6 transition-transform group-hover:scale-110')}
              fill={true}
            />
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};
