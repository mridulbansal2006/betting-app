import { useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useClickOutside } from '../../hooks/useClickOutside';
import { cn, formatBalance } from '../../lib/utils';
import { SearchBar } from '../ui/SearchBar';
import { Icon } from '../ui/Icon';

export const Topbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  useClickOutside(dropdownRef, () => setOpen(false));

  return (
    <header className="sticky top-0 z-20 flex flex-wrap items-center gap-4 border-b border-stake-border bg-stake-bg/60 px-4 py-5 backdrop-blur-xl lg:px-8">
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
      <button className="glass rounded-[18px] p-3 text-stake-textSecondary transition-all hover:text-stake-green hover:neon-border-green">
        <Icon name="notifications" className="h-6 w-6" />
      </button>
      <div className="glass flex items-center gap-2 rounded-[18px] px-5 py-3 font-mono text-sm font-bold text-stake-green shadow-inner">
        <span className="text-stake-textMuted uppercase tracking-widest text-[10px]">Balance</span>
        {formatBalance(user?.balance ?? 0)}
      </div>
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setOpen((current) => !current)}
          className="glass flex items-center gap-3 rounded-[18px] px-3 py-2 text-sm font-bold text-stake-textPrimary transition-all hover:bg-white/5"
        >
          <div className="h-9 w-9 overflow-hidden rounded-xl border border-stake-border bg-stake-bg shadow-lg">
            <img src={user?.avatar} alt={user?.name} className="h-full w-full object-cover" />
          </div>
          <span className="hidden sm:inline">{user?.name}</span>
          <Icon
            name="expand_more"
            className={cn('h-5 w-5 text-stake-textMuted transition-transform', open && 'rotate-180')}
          />
        </button>
        {open ? (
          <div className="glass absolute right-0 top-full mt-3 w-60 overflow-hidden rounded-2xl p-1.5 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
            <button
              onClick={async () => {
                await logout();
                navigate('/');
              }}
              className="group flex w-full items-center gap-3 rounded-xl px-4 py-3.5 text-left text-sm font-bold text-stake-textSecondary transition-all hover:bg-stake-red/10 hover:text-stake-red"
            >
              <Icon name="logout" className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
              Sign Out
            </button>
          </div>
        ) : null}
      </div>
    </header>
  );
};
