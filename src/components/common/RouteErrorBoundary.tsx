import { Component, type ErrorInfo, type ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallbackTitle?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class RouteErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('RouteErrorBoundary caught an error:', error, errorInfo);
  }

  public handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 sm:p-12 my-8 rounded-2xl border border-[#E11D48]/30 bg-[#E11D48]/5 text-[#171717] space-y-4 max-w-2xl mx-auto text-center">
          <div className="w-12 h-12 rounded-xl bg-[#E11D48]/10 text-[#E11D48] flex items-center justify-center mx-auto">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h2 className="font-serif text-2xl font-bold text-[#171717]">
              {this.props.fallbackTitle || 'Archive View Encountered an Issue'}
            </h2>
            <p className="text-xs text-[#77736C] font-mono">
              {this.state.error?.message || 'An unexpected rendering error occurred in this view.'}
            </p>
          </div>
          <button
            onClick={this.handleReset}
            className="px-5 py-2 rounded-xl bg-[#171717] text-[#F7F4EE] hover:bg-[#333] text-xs font-mono font-bold inline-flex items-center space-x-2 transition-all shadow-sm"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Try Recovering View</span>
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
