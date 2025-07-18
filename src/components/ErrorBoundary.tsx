import React, { Component, ReactNode } from 'react';
import { announceError } from '../utils/accessibility';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({ error, errorInfo });
    
    // Announce error to screen readers
    announceError(`Det oppstod en feil: ${error.message}`);
    
    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
    
    // Log error for debugging
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div 
          className="bg-red-50 border border-red-200 rounded-lg p-6 m-4"
          role="alert"
          aria-labelledby="error-title"
          aria-describedby="error-description"
        >
          <h2 id="error-title" className="text-red-800 font-bold text-lg mb-2">
            Noe gikk galt
          </h2>
          <p id="error-description" className="text-red-700 mb-4">
            Vi beklager, men det oppstod en uventet feil. Prøv å oppdatere siden eller gå tilbake til forrige side.
          </p>
          
          <div className="flex gap-4">
            <button 
              onClick={this.handleRetry}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              aria-label="Prøv på nytt"
            >
              Prøv på nytt
            </button>
            
            <button 
              onClick={() => window.location.href = '/'}
              className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              aria-label="Gå til forsiden"
            >
              Gå til forsiden
            </button>
          </div>
          
          {import.meta.env.DEV && this.state.error && (
            <details className="mt-4">
              <summary className="cursor-pointer text-red-600 font-medium">
                Tekniske detaljer (kun synlig i utviklingsmodus)
              </summary>
              <pre className="mt-2 text-sm text-red-600 bg-red-100 p-2 rounded overflow-auto">
                {this.state.error.toString()}
                {this.state.errorInfo?.componentStack}
              </pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
