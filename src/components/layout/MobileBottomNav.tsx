import { NavLink } from 'react-router-dom';
import { Home, ListOrdered, Shield, Trophy, Volleyball } from 'lucide-react';
import { cn } from '../../lib/utils';

const items = [
  { to: '/dashboard', label: 'Home', icon: Home },
  { to: '/sports/cricket', label: 'Cricket', icon: Shield },
  { to: '/sports/football', label: 'Football', icon: Volleyball },
  { to: '/sports/tennis', label: 'Tennis', icon: Trophy },
  { to: '/my-bets', label: 'Bets', icon: ListOrdered },
];

export const MobileBottomNav = () => (
  <nav className="fixed inset-x-4 bottom-4 z-40 grid grid-cols-5 rounded-3xl border border-stake-border bg-stake-card/95 p-2 backdrop-blur lg:hidden">
    {items.map((item) => (
      <NavLink
        key={item.to}
        to={item.to}
        className={({ isActive }) =>
          cn(
            'flex flex-col items-center gap-1 rounded-2xl px-2 py-2 text-[11px] font-medium',
            isActive ? 'bg-stake-green text-black' : 'text-stake-textSecondary',
          )
        }
      >
        <item.icon className="h-4 w-4" />
        {item.label}
      </NavLink>
    ))}
  </nav>
);
