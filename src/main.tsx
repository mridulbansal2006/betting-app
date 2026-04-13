import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import './index.css';
import { AuthProvider } from './contexts/AuthContext';
import { WalletProvider } from './contexts/WalletContext';
import { BetSlipProvider } from './contexts/BetSlipContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { ToastViewport } from './components/ui/Toast';
import { ErrorBoundary } from './components/ui/ErrorBoundary';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <AuthProvider>
        <WalletProvider>
          <BetSlipProvider>
            <ThemeProvider>
              <App />
              <ToastViewport />
            </ThemeProvider>
          </BetSlipProvider>
        </WalletProvider>
      </AuthProvider>
    </ErrorBoundary>
  </React.StrictMode>,
);
