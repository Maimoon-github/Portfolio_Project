// specialist-portfolio/src/App.tsx

import { Suspense, Component, useEffect } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import { RouterProvider, createBrowserRouter, Outlet, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { routes } from './config/routes';
import { trackPageView } from './services/analytics.service';
import { useTheme } from './hooks/useTheme';
import './styles/globals.css'; // Imports all global styles and design tokens

// ----------------------------------------------------------------------
// Loading fallback with design system styling
// ----------------------------------------------------------------------
const LoadingFallback = () => (
  <div
    style={ {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: 'var(--color-bg, #141A26)',
      color: 'var(--color-accent, #D9AE89)',
      fontFamily: 'var(--font-ui, Inter, system-ui, sans-serif)',
      fontSize: 'var(--text-lg, 1.125rem)',
    } }
  >
    <div
      style={ {
        animation: 'pulse 1.5s ease-in-out infinite',
      } }
    >
      Loading...
    </div>
    <style>{ `
      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
      }
    `}</style>
  </div>
);

// ----------------------------------------------------------------------
// Error boundary to catch rendering errors
// ----------------------------------------------------------------------
interface ErrorBoundaryProps {
  children: ReactNode;
}
interface ErrorBoundaryState {
  hasError: boolean;
}
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  override componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Error caught by boundary:', error, errorInfo);
    // Optionally track error in analytics
    // trackError({ error, context: 'App' });
  }

  override render() {
    if (this.state.hasError) {
      return (
        <div
          style={ {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            backgroundColor: 'var(--color-bg, #141A26)',
            color: 'var(--color-accent, #D9AE89)',
            fontFamily: 'var(--font-ui, Inter, system-ui, sans-serif)',
            padding: '2rem',
            textAlign: 'center',
          } }
        >
          <h1 style={ { fontSize: 'var(--text-4xl, 2rem)', marginBottom: '1rem' } }>
            Something went wrong
          </h1>
          <p style={ { fontSize: 'var(--text-lg, 1.125rem)', color: 'var(--color-text, #FFFFFF)' } }>
            Please try refreshing the page
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}

// ----------------------------------------------------------------------
// Analytics tracker – listens to route changes and sends page views
// ----------------------------------------------------------------------
const AnalyticsTracker = () => {
  const location = useLocation();
  useEffect(() => {
    // Map path to page name (simplified – could be enhanced with route meta)
    const path = location.pathname;
    let page: Parameters<typeof trackPageView>[0] = 'home';
    if (path === '/') page = 'home';
    else if (path.startsWith('/about')) page = 'about';
    else if (path.startsWith('/resume')) page = 'resume';
    else if (path.startsWith('/work/portfolio')) page = 'portfolio';
    else if (path.startsWith('/work/projects')) page = 'projects';
    else if (path.startsWith('/capabilities/tools')) page = 'tools';
    else if (path.startsWith('/mind/blog')) {
      if (path.split('/').length > 3) page = 'blog_post';
      else page = 'blog';
    } else if (path.startsWith('/mind/docs')) {
      if (path.split('/').length > 3) page = 'tutorial';
      else page = 'documentation';
    } else if (path.startsWith('/connect')) page = 'contact';
    // Send page view
    trackPageView(page, document.title);
  }, [location]);
  return null;
};

// ----------------------------------------------------------------------
// Theme initializer – calls useTheme to set up data-theme attribute
// ----------------------------------------------------------------------
const ThemeInitializer = () => {
  useTheme(); // hook already syncs data-theme and localStorage
  return null;
};

// ----------------------------------------------------------------------
// Root layout rendered INSIDE the router – safe to use router hooks here
// ----------------------------------------------------------------------
const RootLayout = () => (
  <>
    <ThemeInitializer />
    <AnalyticsTracker />
    <Outlet />
  </>
);

// ----------------------------------------------------------------------
// Main App component
// ----------------------------------------------------------------------
const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: routes,
  },
]);

function App() {
  return (
    <HelmetProvider>
      <ErrorBoundary>
        <Suspense fallback={ <LoadingFallback /> }>
          <RouterProvider router={ router } />
        </Suspense>
      </ErrorBoundary>
    </HelmetProvider>
  );
}

export default App;