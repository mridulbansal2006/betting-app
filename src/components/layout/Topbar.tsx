import { Bell, ChevronDown, LogOut } from 'lucide-react';
import { useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useClickOutside } from '../../hooks/useClickOutside';
import { formatBalance } from '../../lib/utils';
import { SearchBar } from '../ui/SearchBar';

export const Topbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  useClickOutside(dropdownRef, () => setOpen(false));

  return (
    <header className="sticky top-0 z-20 flex flex-wrap items-center gap-4 border-b border-stake-border bg-stake-bg/90 px-4 py-4 backdrop-blur lg:px-8">
      <div className="min-w-[220px] flex-1">
        <SearchBar
          value={searchParams.get('q') ?? ''}
          onSearch={(value) => {
            const next = new URLSearchParams(searchParams);

            if (value) {
              next.set('q', value);
            } else {
              next.delete('q');
            }

            setSearchParams(next, { replace: true });
          }}
        />
      </div>
      <button className="rounded-2xl border border-stake-border bg-stake-card p-3 text-stake-textSecondary transition hover:text-stake-textPrimary">
        <Bell className="h-4 w-4" />
      </button>
      <div className="rounded-2xl border border-stake-border bg-stake-card px-4 py-3 font-mono text-sm text-stake-textPrimary">
        {formatBalance(user?.balance ?? 0)} 🪙
      </div>
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setOpen((current) => !current)}
          className="flex items-center gap-3 rounded-2xl border border-stake-border bg-stake-card px-4 py-2 text-sm text-stake-textPrimary"
        >
          <img src={user?.avatar} alt={user?.name} className="h-8 w-8 rounded-full bg-stake-bg" />
          <span className="hidden sm:inline">{user?.name}</span>
          <ChevronDown className="h-4 w-4 text-stake-textMuted" />
        </button>
        {open ? (
          <div className="absolute right-0 top-full mt-3 w-56 rounded-2xl border border-stake-border bg-stake-card p-2 shadow-2xl">
            <button
              onClick={async () => {
                await logout();
                navigate('/');
              }}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm text-stake-textSecondary transition hover:bg-stake-hover hover:text-stake-textPrimary"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        ) : null}
      </div>
    </header>
  );
};
