// specialist-portfolio/src/services/contact.service.ts

/**
 * contact.service.ts
 * Contact form submission logic with retry, abort, and structured error handling.
 * Uses import.meta.env.VITE_API_URL as the endpoint.
 */

import type { ContactFormData } from '@/types/contact.types';

// ----------------------------------------------------------------------
// Types
// ----------------------------------------------------------------------

/**
 * Response shape from the contact API.
 */
export interface ContactResponse {
  success: boolean;
  message: string;
  ticketId?: string;
}

/**
 * Custom error class for API errors.
 * Extends native Error with status code and response data.
 */
export class ApiError extends Error {
  public readonly status: number;
  public readonly data?: unknown;
  public readonly url: string;
  public readonly method: string;

  constructor(
    url: string,
    method: string,
    status: number,
    message: string,
    data?: unknown
  ) {
    super(message);
    this.name = 'ApiError';
    this.url = url;
    this.method = method;
    this.status = status;
    this.data = data;

    // Maintains proper stack trace for where error was thrown
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiError);
    }
  }
}

// ----------------------------------------------------------------------
// Configuration
// ----------------------------------------------------------------------

const API_URL = import.meta.env.VITE_API_URL;
const DEFAULT_TIMEOUT = 10000; // 10 seconds
const MAX_RETRIES = 3;

// ----------------------------------------------------------------------
// Helper: exponential backoff with jitter
// ----------------------------------------------------------------------

/**
 * Calculate delay for retry attempt using exponential backoff + jitter.
 * @param attempt - Current attempt number (0‑based)
 * @returns Delay in milliseconds
 */
const getRetryDelay = (attempt: number): number => {
  const baseDelay = 2 ** attempt * 1000; // 1s, 2s, 4s
  const jitter = Math.random() * 200; // up to 200ms jitter
  return baseDelay + jitter;
};

// ----------------------------------------------------------------------
// Helper: sanitize input strings
// ----------------------------------------------------------------------

/**
 * Basic sanitisation of form input strings.
 * @param str - Raw input string
 * @returns Trimmed string with any dangerous characters escaped
 */
const sanitizeString = (str: string): string => {
  return str.trim().replace(/[<>]/g, ''); // simple XSS prevention
};

// ----------------------------------------------------------------------
// Helper: wait with AbortSignal support
// ----------------------------------------------------------------------

const sleep = (ms: number, signal?: AbortSignal): Promise<void> =>
  new Promise((resolve, reject) => {
    const timeoutId = setTimeout(resolve, ms);
    if (signal) {
      signal.addEventListener('abort', () => {
        clearTimeout(timeoutId);
        reject(new DOMException('Aborted', 'AbortError'));
      });
    }
  });

// ----------------------------------------------------------------------
// Main function: submitContactForm
// ----------------------------------------------------------------------

/**
 * Submit the contact form to the backend API.
 *
 * @param data - Form data (ContactFormData)
 * @returns Promise resolving to ContactResponse
 * @throws {ApiError} When the API returns a non‑2xx status
 * @throws {AbortError} When the request is aborted
 * @throws {Error} On network failure after retries
 */
export async function submitContactForm(
  data: ContactFormData
): Promise<ContactResponse> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT);

  // Sanitise input
  const payload = {
    name: sanitizeString(data.name),
    email: sanitizeString(data.email),
    inquiryType: sanitizeString(data.inquiryType),
    message: sanitizeString(data.message),
  };

  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      const response = await fetch(`${API_URL}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      let responseData: unknown;
      const contentType = response.headers.get('content-type');
      if (contentType?.includes('application/json')) {
        responseData = await response.json();
      } else {
        responseData = await response.text();
      }

      if (!response.ok) {
        throw new ApiError(
          `${API_URL}/contact`,
          'POST',
          response.status,
          response.statusText,
          responseData
        );
      }

      // Success – clear timeout and return
      clearTimeout(timeoutId);
      return responseData as ContactResponse;
    } catch (error) {
      lastError = error as Error;

      // Don't retry on abort or certain 4xx errors
      if (error instanceof DOMException && error.name === 'AbortError') {
        clearTimeout(timeoutId);
        throw error; // abort – no retry
      }

      if (error instanceof ApiError) {
        // Do not retry client errors (except 429 Too Many Requests)
        if (error.status >= 400 && error.status < 500 && error.status !== 429) {
          clearTimeout(timeoutId);
          throw error;
        }
      }

      // If this was the last attempt, throw
      if (attempt === MAX_RETRIES) {
        clearTimeout(timeoutId);
        throw new Error(
          `Failed after ${MAX_RETRIES + 1} attempts. Last error: ${lastError.message}`
        );
      }

      // Wait before retrying (with backoff)
      const delay = getRetryDelay(attempt);
      await sleep(delay, controller.signal);
    }
  }

  // Unreachable, but TypeScript needs a return
  throw new Error('Unexpected error in submitContactForm');
}