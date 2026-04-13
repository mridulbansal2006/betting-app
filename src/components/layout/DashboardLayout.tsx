import { Outlet } from 'react-router-dom';
import { DISCLAIMER } from '../../lib/constants';
import { BetSlipDrawer } from '../betting/BetSlipDrawer';
import { MobileBottomNav } from './MobileBottomNav';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';

export const DashboardLayout = () => (
  <div className="min-h-screen bg-stake-bg text-stake-textPrimary">
    <div className="mx-auto flex max-w-[1600px]">
      <Sidebar />
      <div className="min-w-0 flex-1">
        <Topbar />
        <main className="min-h-[calc(100vh-73px)] px-4 pb-28 pt-6 lg:px-8">
          <Outlet />
        </main>
        <footer className="border-t border-stake-border px-4 py-6 text-sm text-stake-textMuted lg:px-8">
          {DISCLAIMER}
        </footer>
      </div>
      <div className="hidden xl:block xl:w-[360px]">
        <BetSlipDrawer desktop />
      </div>
    </div>
    <div className="xl:hidden">
      <BetSlipDrawer />
    </div>
    <MobileBottomNav />
  </div>
);
