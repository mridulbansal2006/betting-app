import { Component, type ErrorInfo, type ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = {
    hasError: false,
  };

  public static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  public componentDidCatch(_error: Error, _errorInfo: ErrorInfo) {}

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-stake-bg p-6">
          <div className="max-w-md rounded-3xl border border-stake-border bg-stake-card p-8 text-center">
            <h1 className="text-2xl font-semibold text-stake-textPrimary">Something went wrong.</h1>
            <p className="mt-3 text-sm text-stake-textSecondary">
              Refresh the page to recover the demo state and continue the presentation.
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
