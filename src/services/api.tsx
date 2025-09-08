/**
 * Comprehensive API Service for React-Django Integration
 * 
 * This service provides real-time synchronization between the React frontend
 * and Django backend, with automatic token management, error handling, and
 * type-safe API calls.
 */

// API Configuration
const API_BASE_URL = (import.meta as any).env?.VITE_API_BASE_URL || 'http://localhost:8000';
const API_VERSION = 'v1';
const API_URL = `${API_BASE_URL}/api/${API_VERSION}`;

// Type Definitions for API Responses
export interface ApiResponse<T = any> {
  results?: T; // Django REST framework pagination
  data?: T;    // Direct data response
  count?: number;
  next?: string | null;
  previous?: string | null;
  status: number;
  message?: string;
  pagination?: {
    count: number;
    next: string | null;
    previous: string | null;
    page_size: number;
  };
}

export interface ApiError {
  error: string;
  detail?: string;
  code?: string;
  status: number;
}

// Content Models matching Django backend
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  status: 'draft' | 'published';
  featured: boolean;
  meta_title?: string;
  meta_description?: string;
  author: {
    id: string;
    name: string;
    email: string;
  };
  category: {
    id: string;
    name: string;
    slug: string;
  };
  tags: Array<{
    id: string;
    name: string;
    slug: string;
  }>;
  reading_time?: number;
  view_count: number;
  created_at: string;
  updated_at: string;
  published_at?: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  content: string;
  description?: string;
  status: 'draft' | 'published';
  featured: boolean;
  project_type: string;
  technologies: Array<{
    id: string;
    name: string;
    category: string;
  }>;
  github_url?: string;
  live_demo_url?: string;
  start_date?: string;
  end_date?: string;
  created_at: string;
  updated_at: string;
}

export interface NewsItem {
  id: string;
  title: string;
  slug: string;
  // Backend provides body/excerpt; map to content-like for UI reuse
  body?: string;
  excerpt?: string;
  status: 'draft' | 'published' | 'archived';
  featured: boolean;
  // Backend priority choices use 'medium' instead of 'normal'
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: {
    id: string;
    name: string;
    slug: string;
  };
  expiry_date?: string;
  created_at: string;
  updated_at: string;
}

export interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  status: 'draft' | 'published';
  featured: boolean;
  level: 'beginner' | 'intermediate' | 'advanced';
  duration_hours: number;
  price: number;
  instructor: {
    id: string;
    name: string;
    email: string;
  };
  enrollment_count: number;
  rating: number;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  role: 'student' | 'instructor' | 'admin';
  bio?: string;
  avatar_url?: string;
  is_active: boolean;
  date_joined: string;
}

// Basic Page model for CMS pages
export interface Page {
  id: string;
  title: string;
  slug: string;
  content?: string;
  template?: string;
  meta_title?: string;
  meta_description?: string;
  published_at?: string;
}

// Authentication Types
export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}

export interface AuthTokens {
  access: string;
  refresh: string;
}

// API Client Class
class ApiClient {
  private accessToken: string | null = null;
  private refreshToken: string | null = null;

  constructor() {
    // Load tokens from localStorage on initialization
    this.accessToken = localStorage.getItem('access_token');
    this.refreshToken = localStorage.getItem('refresh_token');
  }

  // Token Management
  setTokens(tokens: AuthTokens) {
    this.accessToken = tokens.access;
    this.refreshToken = tokens.refresh;
    localStorage.setItem('access_token', tokens.access);
    localStorage.setItem('refresh_token', tokens.refresh);
  }

  clearTokens() {
    this.accessToken = null;
    this.refreshToken = null;
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }

  // HTTP Request Helper
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
  const url = endpoint.startsWith('http') ? endpoint : `${API_URL}${endpoint}`;
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    // Add authentication header if token exists
    if (this.accessToken) {
      headers['Authorization'] = `Bearer ${this.accessToken}`;
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      // Handle token refresh for 401 errors
      if (response.status === 401 && this.refreshToken) {
        const refreshSuccess = await this.refreshAccessToken();
        if (refreshSuccess) {
          // Retry the original request with new token
          headers['Authorization'] = `Bearer ${this.accessToken}`;
          const retryResponse = await fetch(url, {
            ...options,
            headers,
          });
          return this.handleResponse<T>(retryResponse);
        }
      }

      return this.handleResponse<T>(response);
    } catch (error) {
      throw {
        error: 'Network error',
        detail: error instanceof Error ? error.message : 'Unknown error',
        status: 0,
      } as ApiError;
    }
  }

  private async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    const contentType = response.headers.get('content-type');
    const isJson = contentType?.includes('application/json');

    if (!response.ok) {
      const errorData = isJson ? await response.json() : { error: response.statusText };
      throw {
        ...errorData,
        status: response.status,
      } as ApiError;
    }

    const data = isJson ? await response.json() : null;
    
    // Handle Django REST framework pagination format
    const isDRFPaginated = data && 'results' in data;
    
    return {
      data: isDRFPaginated ? data.results : data,
      results: isDRFPaginated ? data.results : undefined,
      count: isDRFPaginated ? data.count : undefined,
      next: isDRFPaginated ? data.next : undefined,
      previous: isDRFPaginated ? data.previous : undefined,
      status: response.status,
      pagination: isDRFPaginated ? {
        count: data.count,
        next: data.next,
        previous: data.previous,
        page_size: data.results?.length || 0,
      } : undefined,
    };
  }

  // Token Refresh
  private async refreshAccessToken(): Promise<boolean> {
    if (!this.refreshToken) return false;

    try {
      const response = await fetch(`${API_BASE_URL}/api/token/refresh/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh: this.refreshToken }),
      });

      if (response.ok) {
        const tokens = await response.json();
        this.setTokens(tokens);
        return true;
      }
    } catch (error) {
      console.error('Token refresh failed:', error);
    }

    this.clearTokens();
    return false;
  }

  // Authentication Methods
  async login(credentials: LoginCredentials): Promise<ApiResponse<{ user: User; tokens: AuthTokens }>> {
  const response = await this.request<AuthTokens>('/auth/login/', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });

    if (response.data) {
      this.setTokens(response.data);
      const userResponse = await this.getCurrentUser();
      if (userResponse.data) {
        return {
          data: {
            user: userResponse.data,
            tokens: response.data,
          },
          status: response.status,
        };
      }
    }

    throw new Error('Login failed');
  }

  async register(userData: RegisterData): Promise<ApiResponse<User>> {
    return this.request<User>('/auth/register/', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async logout(): Promise<void> {
    if (this.refreshToken) {
      try {
        await this.request('/auth/logout/', {
          method: 'POST',
          body: JSON.stringify({ refresh: this.refreshToken }),
        });
      } catch (error) {
        // Continue with logout even if API call fails
        console.warn('Logout API call failed:', error);
      }
    }
    this.clearTokens();
  }

  async getCurrentUser(): Promise<ApiResponse<User>> {
    return this.request<User>('/users/profile/');
  }

  // Content API Methods
  async getBlogPosts(params?: {
    page?: number;
    page_size?: number;
    status?: 'published' | 'draft';
    featured?: boolean;
    search?: string;
    category?: string;
    ordering?: string;
  }): Promise<ApiResponse<BlogPost[]>> {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString());
        }
      });
    }
  // Backend lists posts under /api/v1/blog/posts/
  const endpoint = `/blog/posts/${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
    return this.request<BlogPost[]>(endpoint);
  }

  async getBlogPost(id: string): Promise<ApiResponse<BlogPost>> {
  // Backend uses slug under /blog/posts/{slug}/
  return this.request<BlogPost>(`/blog/posts/${id}/`);
  }

  async createBlogPost(postData: Partial<BlogPost>): Promise<ApiResponse<BlogPost>> {
    return this.request<BlogPost>('/blog/', {
      method: 'POST',
      body: JSON.stringify(postData),
    });
  }

  async updateBlogPost(id: string, postData: Partial<BlogPost>): Promise<ApiResponse<BlogPost>> {
    return this.request<BlogPost>(`/blog/${id}/`, {
      method: 'PUT',
      body: JSON.stringify(postData),
    });
  }

  async getProjects(params?: {
    page?: number;
    featured?: boolean;
    project_type?: string;
    ordering?: string;
  }): Promise<ApiResponse<Project[]>> {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString());
        }
      });
    }
    
  const endpoint = `/projects/${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
    return this.request<Project[]>(endpoint);
  }

  async getProject(id: string): Promise<ApiResponse<Project>> {
  // Uses slug
  return this.request<Project>(`/projects/${id}/`);
  }

  async getNews(params?: {
    page?: number;
    priority?: 'urgent' | 'high' | 'normal' | 'low';
    featured?: boolean;
    ordering?: string;
  }): Promise<ApiResponse<NewsItem[]>> {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString());
        }
      });
    }
    
  const endpoint = `/news/${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
    return this.request<NewsItem[]>(endpoint);
  }

  async getNewsItem(id: string): Promise<ApiResponse<NewsItem>> {
    // Uses slug for detail
    return this.request<NewsItem>(`/news/${id}/`);
  }

  async getCourses(params?: {
    page?: number;
    featured?: boolean;
    level?: 'beginner' | 'intermediate' | 'advanced';
    ordering?: string;
  }): Promise<ApiResponse<Course[]>> {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString());
        }
      });
    }
    
    const endpoint = `/courses/${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
    return this.request<Course[]>(endpoint);
  }

  async getCourse(id: string): Promise<ApiResponse<Course>> {
    // Uses slug for detail
    return this.request<Course>(`/courses/${id}/`);
  }

  // Dashboard and Admin Methods
  async getContentSyncStatus(): Promise<ApiResponse<any>> {
    // Admin-only endpoint; name is dashed by DRF actions
    return this.request('/dashboard/content-sync-status/');
  }

  async getAnalyticsSummary(): Promise<ApiResponse<any>> {
    // Admin-only endpoint
    return this.request('/dashboard/analytics-summary/');
  }

  // Public Health endpoints (no auth required)
  // Public snapshot via public endpoints (no auth required)
  async getPublicContentSyncStatus(): Promise<ApiResponse<any>> {
    try {
      const fallback = { data: [], status: 200 } as ApiResponse<any[]>;
      const [blogs, projects, news, courses] = await Promise.all([
        this.getBlogPosts({ page_size: 1 }).catch(() => fallback),
        this.getProjects({}).catch(() => fallback),
        this.getNews({}).catch(() => fallback),
        this.getCourses({}).catch(() => fallback),
      ]);

      const toCount = (res: ApiResponse<any[]>) => (res.count ?? res.data?.length ?? 0);
      const data = {
        status: 'healthy',
        published_content: {
          blog_posts: toCount(blogs),
          projects: toCount(projects),
          news_items: toCount(news),
          courses: toCount(courses),
        },
        timestamp: new Date().toISOString(),
      };
      return { data, status: 200 } as ApiResponse<any>;
    } catch (e) {
      return { data: { status: 'degraded' }, status: 200 } as ApiResponse<any>;
    }
  }

  // Health Check
  async healthCheck(): Promise<ApiResponse<{ status: string }>> {
    // Probe a public list endpoint instead of admin-only health
    const res = await this.request<any[]>(`/projects/`);
    return { data: { status: res.status === 200 ? 'ok' : 'degraded' }, status: res.status };
  }

  // Pages (CMS)
  async getPages(params?: {
    page?: number;
    template?: string;
    show_in_menu?: boolean;
    ordering?: string;
  }): Promise<ApiResponse<Page[]>> {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString());
        }
      });
    }
    const endpoint = `/pages/${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
    return this.request<Page[]>(endpoint);
  }

  async getPage(slug: string): Promise<ApiResponse<Page>> {
    return this.request<Page>(`/pages/${slug}/`);
  }

  // Real-time Event Logging
  async logEvent(eventType: string, eventData: any): Promise<void> {
    try {
      await this.request('/events/log/', {
        method: 'POST',
        body: JSON.stringify({
          event_type: eventType,
          event_data: eventData,
          timestamp: new Date().toISOString(),
        }),
      });
    } catch (error) {
      console.warn('Event logging failed:', error);
    }
  }
}

// Create and export singleton instance
export const apiClient = new ApiClient();

// Convenience hooks for React components
export const useApi = () => {
  return {
    client: apiClient,
    // Add event logging wrapper
    logEvent: (eventType: string, eventData: any) => {
      apiClient.logEvent(eventType, eventData);
    },
  };
};

// Real-time synchronization utilities
export class RealTimeSync {
  private static instance: RealTimeSync;
  private eventListeners: Map<string, Array<(data: any) => void>> = new Map();
  private pollInterval: number = 5000; // 5 seconds
  private pollingEnabled: boolean = false;

  static getInstance(): RealTimeSync {
    if (!RealTimeSync.instance) {
      RealTimeSync.instance = new RealTimeSync();
    }
    return RealTimeSync.instance;
  }

  // Subscribe to content changes
  subscribe(contentType: string, callback: (data: any) => void) {
    if (!this.eventListeners.has(contentType)) {
      this.eventListeners.set(contentType, []);
    }
    this.eventListeners.get(contentType)!.push(callback);

    // Start polling if not already started
    if (!this.pollingEnabled) {
      this.startPolling();
    }
  }

  // Unsubscribe from content changes
  unsubscribe(contentType: string, callback: (data: any) => void) {
    const listeners = this.eventListeners.get(contentType);
    if (listeners) {
      const index = listeners.indexOf(callback);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    }
  }

  private async startPolling() {
    this.pollingEnabled = true;
    
    const poll = async () => {
      if (!this.pollingEnabled) return;

      try {
  // Check for content sync status (public endpoint to avoid auth requirements)
  const syncStatus = await apiClient.getPublicContentSyncStatus();
        this.notifyListeners('sync_status', syncStatus.data);
        
        // Schedule next poll
        setTimeout(poll, this.pollInterval);
      } catch (error) {
        console.warn('Polling failed:', error);
        setTimeout(poll, this.pollInterval * 2); // Back off on error
      }
    };

    poll();
  }

  private notifyListeners(eventType: string, data: any) {
    const listeners = this.eventListeners.get(eventType);
    if (listeners) {
      listeners.forEach(callback => callback(data));
    }
  }

  stopPolling() {
    this.pollingEnabled = false;
  }
}

export const realTimeSync = RealTimeSync.getInstance();

// Export default instance
export default apiClient;
