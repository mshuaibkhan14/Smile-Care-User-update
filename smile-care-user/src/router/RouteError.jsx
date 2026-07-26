import { useNavigate } from 'react-router-dom';
import { useRouteError } from 'react-router-dom';
import { Button, Result } from 'antd';

// Route-level error handling — separate from the class-based ErrorBoundary.
// This catches errors thrown inside a specific route's loader/element
// (e.g. a bad route param) without tearing down the whole app shell.
export default function RouteError() {
  const error = useRouteError();
  const navigate = useNavigate();
  console.error('Route error:', error);

  return (
    <Result
      status="500"
      title="Page failed to load"
      subTitle={error?.statusText || error?.message || 'Something went wrong on this page.'}
      extra={
        <Button type="primary" onClick={() => navigate('/')}>
          Back to Home
        </Button>
      }
    />
  );
}
