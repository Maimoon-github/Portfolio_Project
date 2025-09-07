import { useState } from 'react';
import { Menu, X, User, Briefcase, BookOpen, Newspaper, Home, GraduationCap, LogIn, LogOut, Settings, Users, ChevronDown } from 'lucide-react';
import { useAuth } from './auth/AuthContext';
import { motion, AnimatePresence } from 'motion/react';

interface NavigationProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export function Navigation({ activeSection, setActiveSection }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'projects', label: 'Projects', icon: Briefcase },
    { id: 'experience', label: 'Experience', icon: User },
    { id: 'blog', label: 'Blog', icon: BookOpen },
    { id: 'news', label: 'News', icon: Newspaper },
    { id: 'courses', label: 'Courses', icon: GraduationCap },
  ];

  const handleLogout = () => {
    logout();
    setActiveSection('home');
    setIsUserMenuOpen(false);
  };

  return (
    <motion.nav 
      className="fixed top-0 left-0 right-0 z-50 glass-nav"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo - Ultra-modern redesign */}
          <motion.div 
            className="flex items-center"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex-shrink-0">
              <div className="relative">
                <div 
                  className="w-10 h-10 rounded-xl flex items-center justify-center glow-orange"
                  style={{ 
                    background: 'linear-gradient(135deg, var(--orange-600), var(--warm-100))',
                    boxShadow: '0 4px 12px rgba(192, 78, 1, 0.25)'
                  }}
                >
                  <span className="text-white font-bold text-lg font-mono">DS</span>
                </div>
                <div 
                  className="absolute -inset-1 rounded-xl opacity-30 blur-sm"
                  style={{ background: 'linear-gradient(135deg, var(--orange-600), var(--warm-100))' }}
                />
              </div>
            </div>
            <div className="ml-4 hidden sm:block">
              <h1 className="text-lg font-semibold tracking-tight" style={{ color: 'var(--text-primary)' }}>
                Data Scientist
              </h1>
              <p className="text-sm font-medium" style={{ color: 'var(--text-accent)' }}>
                AI & Machine Learning Expert
              </p>
            </div>
          </motion.div>

          {/* Desktop Navigation - Ultra-modern design */}
          <div className="hidden lg:block">
            <div className="flex items-center space-x-1">
              {navItems.map((item, index) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <motion.button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 flex items-center space-x-2 group ${
                      isActive ? 'glow-orange' : ''
                    }`}
                    style={{
                      backgroundColor: isActive 
                        ? 'var(--accent-primary)' 
                        : 'transparent',
                      color: isActive 
                        ? 'var(--neutral-50)' 
                        : 'var(--text-secondary)',
                    }}
                    whileHover={{ 
                      scale: 1.02,
                      backgroundColor: isActive 
                        ? 'var(--accent-primary)' 
                        : 'var(--background-glass)'
                    }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                  >
                    <Icon size={16} className={isActive ? 'text-white' : 'text-current group-hover:scale-110 transition-transform'} />
                    <span>{item.label}</span>
                    {!isActive && (
                      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
                           style={{ background: 'var(--orange-10)' }} />
                    )}
                  </motion.button>
                );
              })}
              
              {/* Auth Section - Redesigned */}
              <div className="flex items-center space-x-3 ml-6 pl-6 border-l border-border">
                {isAuthenticated ? (
                  <div className="relative">
                    <motion.button
                      onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                      className="flex items-center space-x-3 px-4 py-2 rounded-xl transition-all duration-300 glass-card"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div 
                        className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{ 
                          background: 'linear-gradient(135deg, var(--teal-900), var(--accent-primary))'
                        }}
                      >
                        <span className="text-white text-sm font-semibold">
                          {user?.name?.charAt(0) || 'U'}
                        </span>
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                          {user?.name}
                        </p>
                        <p className="text-xs font-medium" style={{ color: 'var(--text-accent)' }}>
                          {user?.role}
                        </p>
                      </div>
                      <ChevronDown size={16} className={`transition-transform duration-200 ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                    </motion.button>
                    
                    <AnimatePresence>
                      {isUserMenuOpen && (
                        <motion.div
                          className="absolute right-0 mt-2 w-56 glass-card rounded-xl shadow-xl py-2"
                          initial={{ opacity: 0, scale: 0.95, y: -10 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95, y: -10 }}
                          transition={{ duration: 0.2 }}
                        >
                          {(user?.role === 'instructor' || user?.role === 'admin') && (
                            <button
                              onClick={() => {
                                setActiveSection('dashboard');
                                setIsUserMenuOpen(false);
                              }}
                              className="w-full text-left px-4 py-2 hover:bg-background-glass transition-colors flex items-center space-x-3"
                            >
                              <Settings size={16} style={{ color: 'var(--accent-primary)' }} />
                              <span style={{ color: 'var(--text-primary)' }}>Dashboard</span>
                            </button>
                          )}
                          
                          {user?.role === 'admin' && (
                            <button
                              onClick={() => {
                                setActiveSection('admin');
                                setIsUserMenuOpen(false);
                              }}
                              className="w-full text-left px-4 py-2 hover:bg-background-glass transition-colors flex items-center space-x-3"
                            >
                              <Users size={16} style={{ color: 'var(--accent-primary)' }} />
                              <span style={{ color: 'var(--text-primary)' }}>Admin Panel</span>
                            </button>
                          )}
                          
                          <div className="border-t border-border my-1" />
                          
                          <button
                            onClick={handleLogout}
                            className="w-full text-left px-4 py-2 hover:bg-background-glass transition-colors flex items-center space-x-3"
                          >
                            <LogOut size={16} style={{ color: 'var(--text-secondary)' }} />
                            <span style={{ color: 'var(--text-secondary)' }}>Sign Out</span>
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <motion.button
                    onClick={() => setActiveSection('auth')}
                    className="px-6 py-2 rounded-xl font-medium transition-all duration-300 flex items-center space-x-2 glow-orange-hover"
                    style={{ 
                      background: 'linear-gradient(135deg, var(--orange-600), var(--warm-100))',
                      color: 'white',
                      boxShadow: '0 4px 12px rgba(192, 78, 1, 0.25)'
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <LogIn size={16} />
                    <span>Sign In</span>
                  </motion.button>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Controls */}
          <div className="lg:hidden flex items-center space-x-3">
            {isAuthenticated ? (
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ 
                  background: 'linear-gradient(135deg, var(--teal-900), var(--accent-primary))'
                }}
              >
                <span className="text-white text-sm font-semibold">
                  {user?.name?.charAt(0) || 'U'}
                </span>
              </div>
            ) : (
              <motion.button
                onClick={() => setActiveSection('auth')}
                className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300"
                style={{ 
                  background: 'linear-gradient(135deg, var(--orange-600), var(--warm-100))',
                  color: 'white'
                }}
                whileTap={{ scale: 0.95 }}
              >
                Sign In
              </motion.button>
            )}
            
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg glass-card transition-all duration-300"
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={{ rotate: isMenuOpen ? 90 : 0 }}
                transition={{ duration: 0.2 }}
              >
                {isMenuOpen ? 
                  <X size={24} style={{ color: 'var(--text-primary)' }} /> : 
                  <Menu size={24} style={{ color: 'var(--text-primary)' }} />
                }
              </motion.div>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="lg:hidden border-t border-border glass-card"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-4 py-4 space-y-2">
              {navItems.map((item, index) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <motion.button
                    key={item.id}
                    onClick={() => {
                      setActiveSection(item.id);
                      setIsMenuOpen(false);
                    }}
                    className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-all duration-300 flex items-center space-x-3 ${
                      isActive ? 'glow-orange' : ''
                    }`}
                    style={{
                      backgroundColor: isActive 
                        ? 'var(--accent-primary)' 
                        : 'transparent',
                      color: isActive 
                        ? 'white' 
                        : 'var(--text-primary)',
                    }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Icon size={18} />
                    <span>{item.label}</span>
                  </motion.button>
                );
              })}
              
              {/* Mobile Auth Section */}
              {isAuthenticated && (
                <motion.div 
                  className="border-t border-border pt-3 mt-3 space-y-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.3 }}
                >
                  {(user?.role === 'instructor' || user?.role === 'admin') && (
                    <button
                      onClick={() => {
                        setActiveSection('dashboard');
                        setIsMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-3 rounded-xl font-medium transition-all duration-300 flex items-center space-x-3 hover:bg-background-glass"
                    >
                      <Settings size={18} style={{ color: 'var(--accent-primary)' }} />
                      <span style={{ color: 'var(--text-primary)' }}>Dashboard</span>
                    </button>
                  )}
                  
                  {user?.role === 'admin' && (
                    <button
                      onClick={() => {
                        setActiveSection('admin');
                        setIsMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-3 rounded-xl font-medium transition-all duration-300 flex items-center space-x-3 hover:bg-background-glass"
                    >
                      <Users size={18} style={{ color: 'var(--accent-primary)' }} />
                      <span style={{ color: 'var(--text-primary)' }}>Admin Panel</span>
                    </button>
                  )}
                  
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-3 rounded-xl font-medium transition-all duration-300 flex items-center space-x-3 hover:bg-background-glass"
                  >
                    <LogOut size={18} style={{ color: 'var(--text-secondary)' }} />
                    <span style={{ color: 'var(--text-secondary)' }}>Sign Out</span>
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}