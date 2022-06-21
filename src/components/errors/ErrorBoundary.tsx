import { Component, ErrorInfo, ReactNode } from 'react';

import { ErrorBoundaryProps, ErrorBoundaryState } from './types';

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // TODO. Handle error
  }

  render(): ReactNode {
    const { hasError } = this.state;
    const { children } = this.props;

    return hasError ? <div style={{ border: '1px solid red' }} /> : children;
  }
}
