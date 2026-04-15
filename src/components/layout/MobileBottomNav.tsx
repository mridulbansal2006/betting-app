import { NavLink } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { Icon } from '../ui/Icon';

const items = [
  { to: '/dashboard', label: 'Home', icon: 'home' },
  { to: '/sports/cricket', label: 'Cricket', icon: 'shield' },
  { to: '/sports/football', label: 'Football', icon: 'sports_volleyball' },
  { to: '/sports/tennis', label: 'Tennis', icon: 'emoji_events' },
  { to: '/my-bets', label: 'Bets', icon: 'format_list_bulleted' },
];

export const MobileBottomNav = () => (
  <nav className="fixed inset-x-4 bottom-4 z-40 grid grid-cols-5 rounded-3xl border border-stake-border bg-stake-card/95 p-2 backdrop-blur lg:hidden">
    {items.map((item) => (
      <NavLink
        key={item.to}
        to={item.to}
        className={({ isActive }) =>
          cn(
            'flex flex-col items-center gap-1 rounded-2xl px-2 py-2 text-[11px] font-bold transition-all',
            isActive ? 'bg-stake-green text-black' : 'text-stake-textSecondary',
          )
        }
      >
        <Icon name={item.icon} className="h-5 w-5" fill={true} />
        {item.label}
      </NavLink>
    ))}
  </nav>
);
