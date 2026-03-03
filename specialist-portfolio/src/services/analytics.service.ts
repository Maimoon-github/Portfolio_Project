// specialist-portfolio/src/services/analytics.service.ts

/**
 * analytics.service.ts
 * Provider‑agnostic analytics abstraction.
 * Tracks page views, CTA clicks, and errors.
 * Uses import.meta.env.VITE_ANALYTICS_ID for the tracking ID.
 */

// ----------------------------------------------------------------------
// Types
// ----------------------------------------------------------------------

export type PageName =
  | 'home'
  | 'about'
  | 'resume'
  | 'portfolio'
  | 'projects'
  | 'tools'
  | 'blog'
  | 'documentation'
  | 'contact'
  | 'project_detail'
  | 'blog_post'
  | 'tutorial';

export interface CTAClickEvent {
  label: string; // e.g., "View Portfolio", "Download Resume"
  destination: string; // URL or path
}

export interface ErrorEvent {
  error: Error;
  context: string; // where the error occurred (e.g., "ContactForm")
}

// ----------------------------------------------------------------------
// Configuration
// ----------------------------------------------------------------------

const ANALYTICS_ID = import.meta.env.VITE_ANALYTICS_ID;
const isDev = import.meta.env.DEV;

// ----------------------------------------------------------------------
// Helper: debounce rapid‑fire events (e.g., multiple clicks)
// ----------------------------------------------------------------------

const debounceMap = new Map<string, number>();

function debounce(key: string, fn: () => void, delay: number = 300): void {
  const existing = debounceMap.get(key);
  if (existing) {
    window.clearTimeout(existing);
  }
  const timeoutId = window.setTimeout(() => {
    fn();
    debounceMap.delete(key);
  }, delay);
  debounceMap.set(key, timeoutId);
}

// ----------------------------------------------------------------------
// Provider implementations (pluggable)
// ----------------------------------------------------------------------

/**
 * GA4 (or any gtag‑compatible) implementation.
 * Replace with your own provider (Plausible, PostHog, etc.) as needed.
 */
const providers = {
  pageView(page: PageName, title?: string) {
    if (typeof window.gtag === 'function' && ANALYTICS_ID) {
      window.gtag('config', ANALYTICS_ID, {
        page_title: title || page,
        page_path: window.location.pathname,
      });
    }
  },

  ctaClick(event: CTAClickEvent) {
    if (typeof window.gtag === 'function' && ANALYTICS_ID) {
      window.gtag('event', 'cta_click', {
        event_category: 'engagement',
        event_label: event.label,
        value: event.destination,
      });
    }
  },

  error(error: ErrorEvent) {
    if (typeof window.gtag === 'function' && ANALYTICS_ID) {
      window.gtag('event', 'exception', {
        description: error.error.message,
        fatal: false,
        context: error.context,
      });
    }
  },
};

// ----------------------------------------------------------------------
// Public API
// ----------------------------------------------------------------------

/**
 * Track a page view.
 * @param page - The page being viewed (from the PageName union)
 * @param title - Optional custom title (defaults to the page name)
 */
export function trackPageView(page: PageName, title?: string): void {
  if (isDev) {
    console.log(`[Analytics] Page view: ${page}${title ? ` (${title})` : ''}`);
    return;
  }

  try {
    providers.pageView(page, title);
  } catch (err) {
    // Fail silently – analytics should never break the app
    console.error('Failed to track page view:', err);
  }
}

/**
 * Track a CTA click.
 * @param event - The click event (label + destination)
 */
export function trackCTAClick(event: CTAClickEvent): void {
  // Debounce to avoid duplicate events from accidental double‑clicks
  debounce(`cta-${event.label}`, () => {
    if (isDev) {
      console.log(`[Analytics] CTA click: ${event.label} → ${event.destination}`);
      return;
    }

    try {
      providers.ctaClick(event);
    } catch (err) {
      console.error('Failed to track CTA click:', err);
    }
  });
}

/**
 * Track an error.
 * @param errorEvent - The error details (error object + context)
 */
export function trackError(errorEvent: ErrorEvent): void {
  if (isDev) {
    console.error(`[Analytics] Error in ${errorEvent.context}:`, errorEvent.error);
    return;
  }

  try {
    providers.error(errorEvent);
  } catch (err) {
    // Already handling an error – just log locally
    console.error('Failed to track error:', err);
  }
}

// ----------------------------------------------------------------------
// Type augmentation for gtag (if using GA4)
// ----------------------------------------------------------------------

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}