import { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ExperienceSection } from './components/ExperienceSection';
import { BlogSection } from './components/BlogSection';
import { NewsSection } from './components/NewsSection';
import { CoursesSection } from './components/courses/CoursesSection';
import { AuthPage } from './components/auth/AuthPage';
import { InstructorDashboard } from './components/dashboard/InstructorDashboard';
import { AdminDashboard } from './components/dashboard/AdminDashboard';
import IntegrationTestDashboard from './components/IntegrationTestDashboard';
import { AuthProvider } from './components/auth/AuthContext';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { motion, AnimatePresence } from 'motion/react';
import { useUserTracking } from './services/hooks';
import { BlogDetail } from './components/blog/BlogDetail';
import { ProjectDetail } from './components/projects/ProjectDetail';
import { NewsDetail } from './components/news/NewsDetail';
import { CourseDetail } from './components/courses/CourseDetail';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [detailRoute, setDetailRoute] = useState<{ type: 'blog' | 'project' | 'news' | 'course'; slug: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { trackPageView } = useUserTracking();

  useEffect(() => {
    // Simulate loading time for the modern theme to load
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handler = (e: any) => {
      setDetailRoute(e.detail);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    window.addEventListener('navigate-detail', handler);
    return () => window.removeEventListener('navigate-detail', handler);
  }, []);

  // Track page views when section changes
  useEffect(() => {
    trackPageView(activeSection);
  }, [activeSection, trackPageView]);

  // Ultra-modern loading screen
  if (isLoading) {
    return (
      <div 
        className="fixed inset-0 flex items-center justify-center z-50"
        style={{ backgroundColor: 'var(--background-primary)' }}
      >
        <motion.div
          className="text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className="relative w-20 h-20 mx-auto mb-6"
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            <div 
              className="w-full h-full rounded-2xl flex items-center justify-center glow-orange"
              style={{ 
                background: 'linear-gradient(135deg, var(--orange-600), var(--warm-100))'
              }}
            >
              <span className="text-white font-bold text-2xl font-mono">DS</span>
            </div>
            <div 
              className="absolute -inset-2 rounded-2xl opacity-30 blur-md"
              style={{ background: 'linear-gradient(135deg, var(--orange-600), var(--warm-100))' }}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h2 
              className="text-2xl font-semibold mb-2"
              style={{ color: 'var(--text-primary)' }}
            >
              Data Scientist Portfolio
            </h2>
            <motion.p 
              className="text-sm font-medium"
              style={{ color: 'var(--text-accent)' }}
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              Initializing AI-Powered Experience...
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  const renderSection = () => {
    if (detailRoute) {
      const back = () => setDetailRoute(null);
      switch (detailRoute.type) {
        case 'blog':
          return <BlogDetail slug={detailRoute.slug} onBack={back} />;
        case 'project':
          return <ProjectDetail slug={detailRoute.slug} onBack={back} />;
        case 'news':
          return <NewsDetail slug={detailRoute.slug} onBack={back} />;
        case 'course':
          return <CourseDetail slug={detailRoute.slug} onBack={back} />;
      }
    }
    switch (activeSection) {
      case 'home':
        return <HeroSection key="hero" />;
      case 'projects':
  return <ProjectsSection key="projects" />;
      case 'experience':
        return <ExperienceSection key="experience" />;
      case 'blog':
  return <BlogSection key="blog" />;
      case 'news':
  return <NewsSection key="news" />;
      case 'courses':
  return <CoursesSection key="courses" />;
      case 'auth':
        return (
          <AuthPage 
            onBack={() => setActiveSection('home')}
            onSuccess={() => setActiveSection('home')}
          />
        );
      case 'dashboard':
        return (
          <ProtectedRoute 
            requiredRole={['instructor', 'admin']}
            onUnauthorized={() => setActiveSection('auth')}
          >
            <InstructorDashboard />
          </ProtectedRoute>
        );
      case 'admin':
        return (
          <ProtectedRoute 
            requiredRole={['admin']}
            onUnauthorized={() => setActiveSection('auth')}
          >
            <AdminDashboard />
          </ProtectedRoute>
        );
      case 'test':
        return <IntegrationTestDashboard />;
      default:
        return <HeroSection />;
    }
  };

  return (
    <AuthProvider>
      <div 
        className="min-h-screen"
        style={{ backgroundColor: 'var(--background-primary)' }}
      >
        {/* Navigation */}
        <Navigation 
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />

        {/* Main Content with Enhanced Page Transitions */}
        <main className={activeSection === 'auth' ? '' : 'pt-16'}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -30, filter: "blur(8px)" }}
              transition={{ 
                duration: 0.6, 
                ease: "easeInOut",
                filter: { duration: 0.4 }
              }}
            >
              {renderSection()}
            </motion.div>
          </AnimatePresence>
        </main>

      {/* Ultra-Modern Footer */}
      <motion.footer 
        className="py-20 px-6 sm:px-8 lg:px-12 border-t glass-card backdrop-blur-lg"
        style={{ 
          backgroundColor: 'var(--background-surface)', 
          borderColor: 'var(--border)',
          background: 'linear-gradient(135deg, var(--background-surface), var(--background-glass))'
        }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
            {/* Brand Section */}
            <div className="text-center md:text-left space-y-4">
              <div className="flex items-center justify-center md:justify-start mb-6">
                <div className="relative mr-4">
                  <div 
                    className="w-12 h-12 rounded-2xl flex items-center justify-center glow-orange shadow-xl"
                    style={{ 
                      background: 'linear-gradient(135deg, var(--orange-600), var(--warm-100))'
                    }}
                  >
                    <span className="text-white font-bold text-xl font-mono">DS</span>
                  </div>
                  <div 
                    className="absolute -inset-1 rounded-2xl opacity-40 blur-md"
                    style={{ background: 'linear-gradient(135deg, var(--orange-600), var(--warm-100))' }}
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-xl mb-1" style={{ color: 'var(--text-primary)' }}>
                    Data Scientist
                  </h3>
                  <p className="text-sm font-medium" style={{ color: 'var(--text-accent)' }}>
                    AI & Machine Learning Expert
                  </p>
                </div>
              </div>
              <p className="text-base leading-relaxed max-w-xs mx-auto md:mx-0" style={{ color: 'var(--text-secondary)' }}>
                Transforming complex data into intelligent solutions that drive innovation and business growth.
              </p>
            </div>
            
            {/* Contact Info */}
            <div className="text-center space-y-4">
              <h4 className="font-semibold text-lg mb-4" style={{ color: 'var(--text-primary)' }}>
                Get In Touch
              </h4>
              <div className="space-y-3">
                <motion.a
                  href="mailto:contact@datascientist.com"
                  className="inline-block text-base font-medium transition-all duration-300 hover:underline glass-card px-4 py-2 rounded-lg"
                  style={{ color: 'var(--text-accent)' }}
                  whileHover={{ 
                    color: 'var(--accent-primary)',
                    scale: 1.02,
                    y: -1
                  }}
                >
                  contact@datascientist.com
                </motion.a>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  Available for consulting & collaborations
                </p>
              </div>
            </div>
            
            {/* Copyright & Links */}
            <div className="text-center md:text-right space-y-4">
              <div className="space-y-2">
                <motion.p
                  className="text-base font-medium"
                  style={{ color: 'var(--text-secondary)' }}
                  whileHover={{ color: 'var(--text-primary)' }}
                  transition={{ duration: 0.2 }}
                >
                  © 2025 Data Scientist Portfolio
                </motion.p>
                <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                  All rights reserved
                </p>
              </div>
              <div className="pt-2">
                <p className="text-xs font-medium tracking-wide" style={{ color: 'var(--text-muted)' }}>
                  Built with React & Modern Design
                </p>
              </div>
            </div>
          </div>
          
          {/* Elegant accent line with enhanced design */}
          <motion.div 
            className="mt-16 relative"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <motion.div 
              className="h-px rounded-full"
              style={{ 
                background: 'linear-gradient(90deg, transparent, var(--accent-primary), var(--orange-600), transparent)'
              }}
              initial={{ scaleX: 0, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
            <div className="absolute inset-0 flex justify-center">
              <div 
                className="w-2 h-2 rounded-full -mt-1 opacity-80"
                style={{ background: 'var(--accent-primary)' }}
              />
            </div>
          </motion.div>
        </div>
      </motion.footer>

        {/* Ultra-modern scroll to top button */}
        {activeSection !== 'auth' && (
          <motion.button
            className="fixed bottom-8 right-8 w-14 h-14 rounded-2xl flex items-center justify-center glass-card glow-orange-hover transition-all duration-300 z-40 group"
            style={{ 
              background: 'linear-gradient(135deg, var(--orange-600), var(--warm-100))',
              boxShadow: '0 8px 24px rgba(192, 78, 1, 0.3)'
            }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            initial={{ opacity: 0, scale: 0, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.6, ease: "easeOut" }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="text-white font-bold text-lg"
              animate={{ y: [0, -2, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              ↑
            </motion.div>
          </motion.button>
        )}
      </div>
    </AuthProvider>
  );
}