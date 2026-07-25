import { Component } from 'react';
import { Button, Result } from 'antd';

// Class component — the one place class-based React is still the right tool:
// catching render-time JS errors anywhere below it in the tree.
// Function components can't do this (no getDerivedStateFromError equivalent
// as a Hook), so this stays a class per what was taught in class.
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // In production this would report to a logging service.
    console.error('ErrorBoundary caught:', error, info);
  }

  handleReset = () => {
    this.setState({ hasError: false });
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <Result
          status="error"
          title="Something went wrong"
          subTitle="An unexpected error occurred while rendering this page."
          extra={
            <Button type="primary" onClick={this.handleReset}>
              Back to Home
            </Button>
          }
        />
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
