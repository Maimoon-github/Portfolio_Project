import { ReactNode } from 'react';
import { useAuth, UserRole } from './AuthContext';
import { motion } from 'motion/react';
import { Lock, UserX, AlertCircle } from 'lucide-react';
import { Button } from '../ui/button';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: UserRole[];
  fallback?: ReactNode;
  onUnauthorized?: () => void;
}

export function ProtectedRoute({ 
  children, 
  requiredRole, 
  fallback, 
  onUnauthorized 
}: ProtectedRouteProps) {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: 'var(--primary-dark)' }}
      >
        <motion.div
          className="text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
            style={{ backgroundColor: 'var(--accent-purple)' }}
            animate={{ 
              rotate: 360,
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              rotate: { duration: 2, repeat: Infinity, ease: "linear" },
              scale: { duration: 1, repeat: Infinity, ease: "easeInOut" }
            }}
          >
            <Lock className="w-6 h-6 text-white" />
          </motion.div>
          <p style={{ color: 'var(--light-text)' }}>Checking permissions...</p>
        </motion.div>
      </div>
    );
  }

  // Not authenticated
  if (!isAuthenticated) {
    if (fallback) return <>{fallback}</>;
    
    return (
      <div 
        className="min-h-screen flex items-center justify-center px-4"
        style={{ backgroundColor: 'var(--primary-dark)' }}
      >
        <motion.div
          className="max-w-md w-full text-center p-8 rounded-xl"
          style={{ backgroundColor: 'var(--secondary-dark)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-6">
            <div 
              className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
              style={{ backgroundColor: 'var(--accent-purple)' }}
            >
              <UserX className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-xl font-semibold mb-2" style={{ color: 'var(--light-text)' }}>
              Authentication Required
            </h2>
            <p style={{ color: 'var(--light-text-60)' }}>
              You need to be logged in to access this page.
            </p>
          </div>
          
          <Button 
            onClick={() => onUnauthorized?.()}
            className="w-full purple-glow-hover"
            style={{ backgroundColor: 'var(--accent-purple)' }}
          >
            Sign In
          </Button>
        </motion.div>
      </div>
    );
  }

  // Check role-based access
  if (requiredRole && requiredRole.length > 0 && !requiredRole.includes(user!.role)) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center px-4"
        style={{ backgroundColor: 'var(--primary-dark)' }}
      >
        <motion.div
          className="max-w-md w-full text-center p-8 rounded-xl"
          style={{ backgroundColor: 'var(--secondary-dark)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-6">
            <div 
              className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
              style={{ backgroundColor: 'var(--destructive)' }}
            >
              <AlertCircle className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-xl font-semibold mb-2" style={{ color: 'var(--light-text)' }}>
              Access Denied
            </h2>
            <p style={{ color: 'var(--light-text-60)' }}>
              You don't have permission to access this page.
            </p>
            <div className="mt-4 p-3 rounded-lg" style={{ backgroundColor: 'var(--purple-10)' }}>
              <p className="text-sm" style={{ color: 'var(--light-text-60)' }}>
                Your role: <span style={{ color: 'var(--accent-purple)' }}>{user!.role}</span>
              </p>
              <p className="text-sm" style={{ color: 'var(--light-text-60)' }}>
                Required: {requiredRole.join(' or ')}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return <>{children}</>;
}