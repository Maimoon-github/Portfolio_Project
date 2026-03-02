import { lazy, Suspense, Component, ErrorInfo, ReactNode } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';

// Lazy-loaded page components
const HomePage = lazy(() => import('./pages/HomePage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ResumePage = lazy(() => import('./pages/ResumePage'));
const PortfolioPage = lazy(() => import('./pages/work/PortfolioPage'));
const ProjectsPage = lazy(() => import('./pages/work/ProjectsPage'));
const ToolsPage = lazy(() => import('./pages/capabilities/ToolsPage'));
const BlogPage = lazy(() => import('./pages/mind/BlogPage'));
const DocumentationPage = lazy(() => import('./pages/mind/DocumentationPage'));
const ContactPage = lazy(() => import('./pages/ConnectPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

// Loading fallback with design system colors
const LoadingFallback = () => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#141A26', // Midnight Shale
      color: '#D9AE89', // Gold Fleck
      fontFamily: 'Inter, system-ui, sans-serif',
      fontSize: '1.125rem',
    }}
  >
    <div
      style={{
        animation: 'pulse 1.5s ease-in-out infinite',
      }}
    >
      Loading...
    </div>
    <style>
      {`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}
    </style>
  </div>
);

// Simple error boundary component
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

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            backgroundColor: '#141A26',
            color: '#D9AE89',
            fontFamily: 'Inter, system-ui, sans-serif',
            padding: '2rem',
            textAlign: 'center',
          }}
        >
          <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>
            Something went wrong
          </h1>
          <p style={{ fontSize: '1.125rem', color: '#ffffff' }}>
            Please try refreshing the page
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}

function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="resume" element={<ResumePage />} />
            <Route path="work">
              <Route path="portfolio" element={<PortfolioPage />} />
              <Route path="projects" element={<ProjectsPage />} />
            </Route>
            <Route path="capabilities">
              <Route path="tools" element={<ToolsPage />} />
            </Route>
            <Route path="mind">
              <Route path="blog" element={<BlogPage />} />
              <Route path="docs" element={<DocumentationPage />} />
            </Route>
            <Route path="connect" element={<ContactPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;