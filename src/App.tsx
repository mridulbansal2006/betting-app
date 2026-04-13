import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { ProtectedRoute } from './components/layout/ProtectedRoute';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { DashboardHome } from './pages/DashboardHome';
import { CheckEmailPage } from './pages/CheckEmailPage';
import { LandingPage } from './pages/LandingPage';
import { LeaderboardPage } from './pages/LeaderboardPage';
import { LoginPage } from './pages/LoginPage';
import { MatchDetailPage } from './pages/MatchDetailPage';
import { MyBetsPage } from './pages/MyBetsPage';
import { ProfilePage } from './pages/ProfilePage';
import { RegisterPage } from './pages/RegisterPage';
import { SportPage } from './pages/SportPage';
import { WalletPage } from './pages/WalletPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '/check-email',
    element: <CheckEmailPage />,
  },
  {
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: '/dashboard', element: <DashboardHome /> },
      { path: '/sports/:sport', element: <SportPage /> },
      { path: '/match/:id', element: <MatchDetailPage /> },
      { path: '/my-bets', element: <MyBetsPage /> },
      { path: '/leaderboard', element: <LeaderboardPage /> },
      { path: '/wallet', element: <WalletPage /> },
      { path: '/profile', element: <ProfilePage /> },
      { path: '*', element: <Navigate to="/dashboard" replace /> },
    ],
  },
]);

export const App = () => <RouterProvider router={router} />;
