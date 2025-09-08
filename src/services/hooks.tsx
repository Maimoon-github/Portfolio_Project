/**
 * React Hooks for API Integration
 * 
 * These hooks provide easy-to-use React integration with the Django backend,
 * including automatic state management, loading states, and error handling.
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { apiClient, ApiResponse, ApiError, BlogPost, Project, NewsItem, Course, realTimeSync } from './api';

// Generic hook for API calls with loading and error states
export function useApiCall<T>(
  apiCall: () => Promise<ApiResponse<T>>,
  dependencies: any[] = []
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ApiError | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiCall();
      setData(response.data);
      setLastUpdated(new Date());
    } catch (err) {
      setError(err as ApiError);
    } finally {
      setLoading(false);
    }
  }, dependencies);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
    lastUpdated,
  };
}

// Blog Posts Hook
export function useBlogPosts(params?: {
  page?: number;
  featured?: boolean;
  search?: string;
  category?: string;
  realTime?: boolean;
}) {
  const { realTime = false, ...apiParams } = params || {};
  
  const result = useApiCall(
    () => apiClient.getBlogPosts({ status: 'published', ...apiParams }),
    [JSON.stringify(apiParams)]
  );

  // Real-time updates
  useEffect(() => {
    if (realTime) {
      const handleUpdate = (data: any) => {
        // Refetch on any content update or periodic sync snapshots
        result.refetch();
      };

      realTimeSync.subscribe('content_updates', handleUpdate);
      realTimeSync.subscribe('sync_status', handleUpdate);
      return () => {
        realTimeSync.unsubscribe('content_updates', handleUpdate);
        realTimeSync.unsubscribe('sync_status', handleUpdate);
      };
    }
  }, [realTime, result.refetch]);

  return result;
}

// Single Blog Post Hook
export function useBlogPost(id: string, realTime: boolean = false) {
  const result = useApiCall(
    () => apiClient.getBlogPost(id),
    [id]
  );

  useEffect(() => {
    if (realTime) {
      const handleUpdate = (data: any) => {
        result.refetch();
      };

      realTimeSync.subscribe('content_updates', handleUpdate);
      realTimeSync.subscribe('sync_status', handleUpdate);
      return () => {
        realTimeSync.unsubscribe('content_updates', handleUpdate);
        realTimeSync.unsubscribe('sync_status', handleUpdate);
      };
    }
  }, [realTime, id, result.refetch]);

  return result;
}

// Projects Hook
export function useProjects(params?: {
  featured?: boolean;
  project_type?: string;
  realTime?: boolean;
}) {
  const { realTime = false, ...apiParams } = params || {};
  
  const result = useApiCall(
    () => apiClient.getProjects(apiParams),
    [JSON.stringify(apiParams)]
  );

  useEffect(() => {
    if (realTime) {
      const handleUpdate = (data: any) => {
        result.refetch();
      };

      realTimeSync.subscribe('content_updates', handleUpdate);
      realTimeSync.subscribe('sync_status', handleUpdate);
      return () => {
        realTimeSync.unsubscribe('content_updates', handleUpdate);
        realTimeSync.unsubscribe('sync_status', handleUpdate);
      };
    }
  }, [realTime, result.refetch]);

  return result;
}

// News Hook
export function useNews(params?: {
  priority?: 'urgent' | 'high' | 'normal' | 'low';
  featured?: boolean;
  realTime?: boolean;
}) {
  const { realTime = false, ...apiParams } = params || {};
  
  const result = useApiCall(
    () => apiClient.getNews(apiParams),
    [JSON.stringify(apiParams)]
  );

  useEffect(() => {
    if (realTime) {
      const handleUpdate = (data: any) => {
        result.refetch();
      };

      realTimeSync.subscribe('content_updates', handleUpdate);
      realTimeSync.subscribe('sync_status', handleUpdate);
      return () => {
        realTimeSync.unsubscribe('content_updates', handleUpdate);
        realTimeSync.unsubscribe('sync_status', handleUpdate);
      };
    }
  }, [realTime, result.refetch]);

  return result;
}

// Courses Hook
export function useCourses(params?: {
  featured?: boolean;
  level?: 'beginner' | 'intermediate' | 'advanced';
  realTime?: boolean;
}) {
  const { realTime = false, ...apiParams } = params || {};
  
  const result = useApiCall(
    () => apiClient.getCourses(apiParams),
    [JSON.stringify(apiParams)]
  );

  useEffect(() => {
    if (realTime) {
      const handleUpdate = (data: any) => {
        result.refetch();
      };

      realTimeSync.subscribe('content_updates', handleUpdate);
      realTimeSync.subscribe('sync_status', handleUpdate);
      return () => {
        realTimeSync.unsubscribe('content_updates', handleUpdate);
        realTimeSync.unsubscribe('sync_status', handleUpdate);
      };
    }
  }, [realTime, result.refetch]);

  return result;
}

// Content Sync Status Hook (for admin dashboards)
export function useContentSyncStatus() {
  const [syncStatus, setSyncStatus] = useState<any>(null);
  const [isOnline, setIsOnline] = useState(true);
  const lastSyncRef = useRef<Date>(new Date());

  useEffect(() => {
    const checkSyncStatus = async () => {
      try {
        const response = await apiClient.getContentSyncStatus();
        setSyncStatus(response.data);
        setIsOnline(true);
        lastSyncRef.current = new Date();
      } catch (error) {
        setIsOnline(false);
        console.warn('Sync status check failed:', error);
      }
    };

    // Initial check
    checkSyncStatus();

    // Set up periodic checking
    const interval = setInterval(checkSyncStatus, 10000); // Every 10 seconds

    return () => clearInterval(interval);
  }, []);

  // Subscribe to real-time sync updates
  useEffect(() => {
    const handleSyncUpdate = (data: any) => {
      setSyncStatus(data);
      lastSyncRef.current = new Date();
    };

    realTimeSync.subscribe('sync_status', handleSyncUpdate);
    return () => realTimeSync.unsubscribe('sync_status', handleSyncUpdate);
  }, []);

  return {
    syncStatus,
    isOnline,
    lastSync: lastSyncRef.current,
  };
}

// Event Logging Hook
export function useEventLogger() {
  const logEvent = useCallback((eventType: string, eventData: any) => {
    // Log to backend
    apiClient.logEvent(eventType, eventData);
    
    // Also log to console for development
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Event] ${eventType}:`, eventData);
    }
  }, []);

  return { logEvent };
}

// User Interaction Tracking Hook
export function useUserTracking() {
  const { logEvent } = useEventLogger();

  const trackPageView = useCallback((page: string) => {
    logEvent('page_view', {
      page,
      timestamp: new Date().toISOString(),
      user_agent: navigator.userAgent,
    });
  }, [logEvent]);

  const trackClick = useCallback((element: string, context?: any) => {
    logEvent('click', {
      element,
      context,
      timestamp: new Date().toISOString(),
    });
  }, [logEvent]);

  const trackContentView = useCallback((contentType: string, contentId: string) => {
    logEvent('content_view', {
      content_type: contentType,
      content_id: contentId,
      timestamp: new Date().toISOString(),
    });
  }, [logEvent]);

  const trackSearch = useCallback((query: string, results: number) => {
    logEvent('search', {
      query,
      results_count: results,
      timestamp: new Date().toISOString(),
    });
  }, [logEvent]);

  return {
    trackPageView,
    trackClick,
    trackContentView,
    trackSearch,
  };
}

// Health Check Hook
export function useHealthCheck() {
  const [healthStatus, setHealthStatus] = useState<{
    status: 'healthy' | 'degraded' | 'down';
    lastCheck: Date;
    details?: any;
  }>({
    status: 'healthy',
    lastCheck: new Date(),
  });

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const response = await apiClient.healthCheck();
        setHealthStatus({
          status: response.data && (response.data as any).status === 'ok' ? 'healthy' : 'degraded',
          lastCheck: new Date(),
          details: response.data ?? undefined,
        });
      } catch (error) {
        setHealthStatus({
          status: 'down',
          lastCheck: new Date(),
          details: error,
        });
      }
    };

    // Initial check
    checkHealth();

    // Periodic health checks
    const interval = setInterval(checkHealth, 30000); // Every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return healthStatus;
}

// Authentication Hook Integration
export function useAuthSync() {
  const [authStatus, setAuthStatus] = useState<{
    isAuthenticated: boolean;
    user: any;
    lastCheck: Date;
  }>({
    isAuthenticated: false,
    user: null,
    lastCheck: new Date(),
  });

  const checkAuthStatus = useCallback(async () => {
    try {
      const response = await apiClient.getCurrentUser();
      setAuthStatus({
        isAuthenticated: true,
        user: response.data,
        lastCheck: new Date(),
      });
    } catch (error) {
      setAuthStatus({
        isAuthenticated: false,
        user: null,
        lastCheck: new Date(),
      });
    }
  }, []);

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  return {
    ...authStatus,
    refreshAuth: checkAuthStatus,
  };
}

// Data Mutation Hook (for create/update operations)
export function useApiMutation<TData, TVariables>(
  mutationFn: (variables: TVariables) => Promise<ApiResponse<TData>>
) {
  const [data, setData] = useState<TData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);

  const mutate = useCallback(async (variables: TVariables) => {
    try {
      setLoading(true);
      setError(null);
      const response = await mutationFn(variables);
      setData(response.data);
      return response;
    } catch (err) {
      const error = err as ApiError;
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [mutationFn]);

  return {
    mutate,
    data,
    loading,
    error,
  };
}

// Optimistic Updates Hook
export function useOptimisticUpdate<T>(
  initialData: T[],
  updateFn: (data: T[], optimisticData: T) => T[]
) {
  const [optimisticData, setOptimisticData] = useState<T[]>(initialData);
  const [pendingUpdates, setPendingUpdates] = useState<Set<string>>(new Set());

  const addOptimisticUpdate = useCallback((
    id: string,
    data: T,
    apiCall: () => Promise<any>
  ) => {
    // Add optimistic update immediately
    setOptimisticData(current => updateFn(current, data));
    setPendingUpdates(current => new Set(current).add(id));

    // Execute actual API call
    apiCall()
      .then(() => {
        // Remove from pending updates on success
        setPendingUpdates(current => {
          const newSet = new Set(current);
          newSet.delete(id);
          return newSet;
        });
      })
      .catch(() => {
        // Revert optimistic update on failure
        setOptimisticData(initialData);
        setPendingUpdates(current => {
          const newSet = new Set(current);
          newSet.delete(id);
          return newSet;
        });
      });
  }, [initialData, updateFn]);

  return {
    data: optimisticData,
    isPending: (id: string) => pendingUpdates.has(id),
    addOptimisticUpdate,
  };
}
