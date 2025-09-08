import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { apiClient, User as ApiUser } from '../../services/api';
import { useEventLogger } from '../../services/hooks';

export type UserRole = 'guest' | 'student' | 'instructor' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  bio?: string;
  avatar_url?: string;
  created_at: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, remember?: boolean) => Promise<{ success: boolean; error?: string }>;
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  resetPassword: (email: string) => Promise<{ success: boolean; error?: string }>;
  updateProfile: (updates: Partial<User>) => Promise<{ success: boolean; error?: string }>;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Transform API user to local user format
const transformApiUser = (apiUser: ApiUser): User => ({
  id: apiUser.id,
  name: `${apiUser.first_name} ${apiUser.last_name}`.trim() || apiUser.username,
  email: apiUser.email,
  role: apiUser.role as UserRole,
  bio: apiUser.bio,
  avatar_url: apiUser.avatar_url,
  created_at: apiUser.date_joined,
});

// Mock user data for demonstration (fallback when API is not available)
const mockUsers = [
  {
    id: '1',
    name: 'Dr. Alex Morgan',
    email: 'alex@example.com',
    password: 'instructor123',
    role: 'instructor' as UserRole,
    bio: 'Senior Data Scientist with 10+ years experience in AI/ML',
    avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'admin123',
    role: 'admin' as UserRole,
    bio: 'Platform Administrator',
    created_at: '2024-01-01T00:00:00Z'
  }
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { logEvent } = useEventLogger();

  // Initialize auth state from API or localStorage
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Try to get current user from API (if token exists)
        const response = await apiClient.getCurrentUser();
        const transformedUser = transformApiUser(response.data);
        setUser(transformedUser);
        logEvent('auth_restored', { user_id: transformedUser.id });
      } catch (error) {
        // Fallback to localStorage for mock users
        const storedUser = localStorage.getItem('auth_user');
        if (storedUser) {
          try {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
          } catch (error) {
            localStorage.removeItem('auth_user');
          }
        }
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, [logEvent]);

  const login = async (email: string, password: string, remember = false): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    
    try {
      // Try real API login first
      const response = await apiClient.login({
        username: email,
        password: password,
      });
      
      const transformedUser = transformApiUser(response.data.user);
      setUser(transformedUser);
      
      if (remember) {
        localStorage.setItem('auth_user', JSON.stringify(transformedUser));
      }
      
      logEvent('login_success', { 
        user_id: transformedUser.id, 
        method: 'api',
        remember 
      });
      
      setIsLoading(false);
      return { success: true };
      
    } catch (apiError) {
      // Fallback to mock users for development
      console.warn('API login failed, using mock authentication:', apiError);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Check mock users
      const mockUser = mockUsers.find(u => u.email === email && u.password === password);
      
      if (mockUser) {
        const { password: _, ...userWithoutPassword } = mockUser;
        setUser(userWithoutPassword);
        
        if (remember) {
          localStorage.setItem('auth_user', JSON.stringify(userWithoutPassword));
        }
        
        logEvent('login_success', { 
          user_id: userWithoutPassword.id, 
          method: 'mock',
          remember 
        });
        
        setIsLoading(false);
        return { success: true };
      } else {
        // For any other email, create a new student user (mock)
        if (email && password) {
          const newUser = {
            id: Date.now().toString(),
            name: email.split('@')[0].replace(/[^a-zA-Z]/g, ''),
            email,
            role: 'student' as UserRole,
            created_at: new Date().toISOString()
          };
          
          setUser(newUser);
          
          if (remember) {
            localStorage.setItem('auth_user', JSON.stringify(newUser));
          }
          
          logEvent('login_success', { 
            user_id: newUser.id, 
            method: 'mock_auto_create',
            remember 
          });
          
          setIsLoading(false);
          return { success: true };
        }
      }
    }
    
    logEvent('login_failed', { email, method: 'both' });
    setIsLoading(false);
    return { success: false, error: 'Invalid email or password' };
  };

  const register = async (name: string, email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    
    try {
      // Try real API registration
      const [firstName, ...lastNameParts] = name.split(' ');
      const lastName = lastNameParts.join(' ');
      
      const response = await apiClient.register({
        username: email,
        email,
        password,
        first_name: firstName,
        last_name: lastName,
      });
      
      const transformedUser = transformApiUser(response.data);
      setUser(transformedUser);
      
      logEvent('register_success', { 
        user_id: transformedUser.id, 
        method: 'api' 
      });
      
      setIsLoading(false);
      return { success: true };
      
    } catch (apiError) {
      // Fallback to mock registration
      console.warn('API registration failed, using mock registration:', apiError);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if email already exists in mock users
      const existingUser = mockUsers.find(u => u.email === email);
      if (existingUser) {
        setIsLoading(false);
        return { success: false, error: 'Email already exists' };
      }
      
      // Create new mock user
      const newUser = {
        id: Date.now().toString(),
        name,
        email,
        role: 'student' as UserRole,
        created_at: new Date().toISOString()
      };
      
      setUser(newUser);
      localStorage.setItem('auth_user', JSON.stringify(newUser));
      
      logEvent('register_success', { 
        user_id: newUser.id, 
        method: 'mock' 
      });
      
      setIsLoading(false);
      return { success: true };
    }
  };

  const logout = async () => {
    try {
      // Try API logout
      await apiClient.logout();
    } catch (error) {
      console.warn('API logout failed:', error);
    }
    
    // Clear local state regardless
    setUser(null);
    localStorage.removeItem('auth_user');
    
    logEvent('logout', { timestamp: new Date().toISOString() });
  };

  const resetPassword = async (email: string): Promise<{ success: boolean; error?: string }> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    logEvent('password_reset_requested', { email });
    
    return { success: true };
  };

  const updateProfile = async (updates: Partial<User>): Promise<{ success: boolean; error?: string }> => {
    if (!user) return { success: false, error: 'Not authenticated' };
    
    try {
      // Try API update (would need to implement API endpoint)
      // const response = await apiClient.updateProfile(updates);
      
      // For now, update local state
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem('auth_user', JSON.stringify(updatedUser));
      
      logEvent('profile_updated', { 
        user_id: user.id, 
        updated_fields: Object.keys(updates) 
      });
      
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Failed to update profile' };
    }
  };

  const contextValue: AuthContextType = {
    user,
    login,
    register,
    logout,
    resetPassword,
    updateProfile,
    isAuthenticated: !!user,
    isLoading
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
