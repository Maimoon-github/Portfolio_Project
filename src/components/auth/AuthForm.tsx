import { useState } from 'react';
import { motion } from 'motion/react';
import { Eye, EyeOff, Mail, Lock, User, AlertCircle, CheckCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Checkbox } from '../ui/checkbox';
import { useAuth } from './AuthContext';

interface AuthFormProps {
  mode: 'login' | 'register' | 'reset';
  onSuccess?: () => void;
  onModeChange?: (mode: 'login' | 'register' | 'reset') => void;
}

export function AuthForm({ mode, onSuccess, onModeChange }: AuthFormProps) {
  const { login, register, resetPassword } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    remember: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'error' | 'success'; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      let result;
      
      if (mode === 'login') {
        result = await login(formData.email, formData.password, formData.remember);
      } else if (mode === 'register') {
        if (!formData.name.trim()) {
          setMessage({ type: 'error', text: 'Name is required' });
          setLoading(false);
          return;
        }
        result = await register(formData.name, formData.email, formData.password);
      } else {
        result = await resetPassword(formData.email);
      }

      if (result.success) {
        if (mode === 'reset') {
          setMessage({ type: 'success', text: 'Password reset email sent!' });
        } else {
          onSuccess?.();
        }
      } else {
        setMessage({ type: 'error', text: result.error || 'Something went wrong' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Network error. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const getTitle = () => {
    switch (mode) {
      case 'login': return 'Welcome Back';
      case 'register': return 'Create Account';
      case 'reset': return 'Reset Password';
    }
  };

  const getSubtitle = () => {
    switch (mode) {
      case 'login': return 'Sign in to access your courses';
      case 'register': return 'Join our learning community';
      case 'reset': return 'Enter your email to reset password';
    }
  };

  return (
    <motion.div
      className="w-full max-w-md mx-auto p-8 rounded-xl"
      style={{ backgroundColor: 'var(--secondary-dark)' }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="text-center mb-8">
        <div 
          className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center purple-glow"
          style={{ backgroundColor: 'var(--accent-purple)' }}
        >
          <Lock className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-semibold mb-2" style={{ color: 'var(--light-text)' }}>
          {getTitle()}
        </h2>
        <p style={{ color: 'var(--light-text-60)' }}>
          {getSubtitle()}
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {mode === 'register' && (
          <div>
            <Label htmlFor="name" className="flex items-center gap-2 mb-2">
              <User className="w-4 h-4" />
              Full Name
            </Label>
            <Input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter your full name"
              required
              className="purple-border-hover"
              style={{ 
                backgroundColor: 'var(--input-background)',
                borderColor: 'var(--purple-20)'
              }}
            />
          </div>
        )}

        <div>
          <Label htmlFor="email" className="flex items-center gap-2 mb-2">
            <Mail className="w-4 h-4" />
            Email
          </Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="Enter your email"
            required
            className="purple-border-hover"
            style={{ 
              backgroundColor: 'var(--input-background)',
              borderColor: 'var(--purple-20)'
            }}
          />
        </div>

        {mode !== 'reset' && (
          <div>
            <Label htmlFor="password" className="flex items-center gap-2 mb-2">
              <Lock className="w-4 h-4" />
              Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="Enter your password"
                required
                className="purple-border-hover pr-10"
                style={{ 
                  backgroundColor: 'var(--input-background)',
                  borderColor: 'var(--purple-20)'
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded transition-colors duration-200 purple-bg-hover"
                style={{ color: 'var(--light-text-60)' }}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
        )}

        {mode === 'login' && (
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                checked={formData.remember}
                onCheckedChange={(checked) => setFormData({ ...formData, remember: !!checked })}
              />
              <Label htmlFor="remember" className="text-sm" style={{ color: 'var(--light-text-60)' }}>
                Remember me
              </Label>
            </div>
            <button
              type="button"
              onClick={() => onModeChange?.('reset')}
              className="text-sm transition-colors duration-200"
              style={{ color: 'var(--accent-purple)' }}
            >
              Forgot password?
            </button>
          </div>
        )}

        {/* Message */}
        {message && (
          <motion.div
            className={`p-3 rounded-lg flex items-center gap-2 ${
              message.type === 'error' ? 'bg-red-900/20' : 'bg-green-900/20'
            }`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {message.type === 'error' ? (
              <AlertCircle className="w-4 h-4 text-red-400" />
            ) : (
              <CheckCircle className="w-4 h-4 text-green-400" />
            )}
            <span className={`text-sm ${
              message.type === 'error' ? 'text-red-400' : 'text-green-400'
            }`}>
              {message.text}
            </span>
          </motion.div>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={loading}
          className="w-full purple-glow-hover"
          style={{ backgroundColor: 'var(--accent-purple)' }}
        >
          {loading ? (
            <motion.div
              className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          ) : (
            <>
              {mode === 'login' && 'Sign In'}
              {mode === 'register' && 'Create Account'}
              {mode === 'reset' && 'Send Reset Email'}
            </>
          )}
        </Button>
      </form>

      {/* Footer */}
      <div className="mt-6 text-center text-sm" style={{ color: 'var(--light-text-60)' }}>
        {mode === 'login' ? (
          <>
            Don't have an account?{' '}
            <button
              onClick={() => onModeChange?.('register')}
              className="transition-colors duration-200"
              style={{ color: 'var(--accent-purple)' }}
            >
              Sign up
            </button>
          </>
        ) : mode === 'register' ? (
          <>
            Already have an account?{' '}
            <button
              onClick={() => onModeChange?.('login')}
              className="transition-colors duration-200"
              style={{ color: 'var(--accent-purple)' }}
            >
              Sign in
            </button>
          </>
        ) : (
          <>
            Remember your password?{' '}
            <button
              onClick={() => onModeChange?.('login')}
              className="transition-colors duration-200"
              style={{ color: 'var(--accent-purple)' }}
            >
              Sign in
            </button>
          </>
        )}
      </div>

      {/* Demo Credentials */}
      {mode === 'login' && (
        <motion.div
          className="mt-6 p-4 rounded-lg border"
          style={{ 
            backgroundColor: 'var(--purple-10)',
            borderColor: 'var(--purple-20)'
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-sm font-medium mb-2" style={{ color: 'var(--accent-purple)' }}>
            Demo Credentials:
          </p>
          <div className="space-y-1 text-xs" style={{ color: 'var(--light-text-60)' }}>
            <p><strong>Instructor:</strong> alex@example.com / instructor123</p>
            <p><strong>Admin:</strong> admin@example.com / admin123</p>
            <p><strong>Student:</strong> Any email / any password</p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}