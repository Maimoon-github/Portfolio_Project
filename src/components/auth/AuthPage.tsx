import { useState } from 'react';
import { motion } from 'motion/react';
import { AuthForm } from './AuthForm';
import { ArrowLeft } from 'lucide-react';

interface AuthPageProps {
  onBack?: () => void;
  onSuccess?: () => void;
}

export function AuthPage({ onBack, onSuccess }: AuthPageProps) {
  const [mode, setMode] = useState<'login' | 'register' | 'reset'>('login');

  return (
    <div 
      className="min-h-screen flex items-center justify-center px-4 py-16"
      style={{ backgroundColor: 'var(--primary-dark)' }}
    >
      {/* Background gradient overlay */}
      <div className="absolute inset-0 gradient-overlay opacity-30" />
      
      {/* Back button */}
      {onBack && (
        <motion.button
          onClick={onBack}
          className="fixed top-20 left-6 z-50 p-3 rounded-lg purple-bg-hover transition-all duration-300 flex items-center gap-2"
          style={{ color: 'var(--light-text)' }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Back</span>
        </motion.button>
      )}

      {/* Main content */}
      <div className="relative z-10 w-full max-w-md">
        <AuthForm 
          mode={mode} 
          onSuccess={onSuccess}
          onModeChange={setMode}
        />
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 left-20 w-32 h-32 rounded-full opacity-20 purple-glow animate-pulse" style={{ backgroundColor: 'var(--accent-purple)' }} />
      <div className="absolute bottom-20 right-20 w-24 h-24 rounded-full opacity-30 purple-glow animate-pulse" style={{ backgroundColor: 'var(--purple-60)' }} />
      <div className="absolute top-1/2 right-10 w-16 h-16 rounded-full opacity-25 purple-glow animate-pulse" style={{ backgroundColor: 'var(--purple-40)' }} />
    </div>
  );
}