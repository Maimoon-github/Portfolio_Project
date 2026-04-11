// central configuration values
// export const API_BASE = "/api/v1";

export const API_BASE = "https://portfolio-project-l49w.onrender.com/api";   // your actual Render URL


// src/app/config.ts

// Your existing API base
export const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:8000/api/cms/v2/';

// NEW: Wagtail CMS headless API
export const CMS_API_BASE_URL =
  import.meta.env.VITE_CMS_API_URL || 'http://localhost:8000/api/cms/v2';  // ← no trailing slash

// Wagtail image rendition helper
export const getCmsImageUrl = (
  path: string | null | undefined
): string | null => {
  if (!path) return null;
  if (path.startsWith('http')) return path;
  return `${import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:8000'}${path}`;
};