import React from 'react';
import { ErrorMessage } from './ErrorMessage';
export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, info) {}

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <ErrorMessage />;
    }

    return this.props.children;
  }
}
