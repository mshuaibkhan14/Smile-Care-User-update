import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { ThemeProvider } from './theme/ThemeContext';
import ErrorBoundary from './router/ErrorBoundary';
import { router } from './router/router';

function App() {
  return (
    // Provider order: Redux store -> Theme/ConfigProvider -> class Error
    // Boundary (catches any render error below) -> RouterProvider.
    <Provider store={store}>
      <ThemeProvider>
        <ErrorBoundary>
          <RouterProvider router={router} />
        </ErrorBoundary>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
