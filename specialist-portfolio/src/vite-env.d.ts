/// <reference types="vite/client" />

/**
 * Type definitions for Vite environment variables.
 * Ensures type safety and autocomplete for import.meta.env.
 */
interface ImportMetaEnv {
  /** API base URL (required) */
  readonly VITE_API_URL: string;

  /** Application name (required) */
  readonly VITE_APP_NAME: string;

  /** Enable analytics tracking (optional, union type for safety) */
  readonly VITE_ENABLE_ANALYTICS?: 'true' | 'false';

  /** GitHub API token (optional, sensitive) */
  readonly VITE_GITHUB_TOKEN?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}