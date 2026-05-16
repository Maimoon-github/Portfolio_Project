// src/lib/api/portfolio.ts
// ─────────────────────────────────────────────────────────────────────────────
// Portfolio data layer.  Fetches from a remote API when available; the
// caller is responsible for the try/catch — see page.tsx usage.
// ─────────────────────────────────────────────────────────────────────────────

export interface Project {
  slug: string;
  title: string;
  description: string;
  thumbnail: string;
  tech_tags: string[];
  live_url?: string;
  repo_url?: string;
  featured?: boolean;
}

export interface Skill {
  category: string;
  items: string[];
  proficiency?: number; // 0–100
}

// ── Remote fetch ──────────────────────────────────────────────────────────────

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ?? '';

/**
 * Fetch featured projects from the portfolio API.
 * Throws on non-OK response so the caller can fall back to static data.
 */
export async function fetchFeaturedProjects(): Promise<Project[]> {
  if (!API_BASE) throw new Error('API_BASE not configured');

  const res = await fetch(`${API_BASE}/api/projects?featured=true`, {
    next: { revalidate: 3600 }, // ISR: revalidate every hour
  });

  if (!res.ok) throw new Error(`fetchFeaturedProjects: ${res.status}`);
  return res.json();
}

/**
 * Fetch all projects.
 */
export async function fetchAllProjects(): Promise<Project[]> {
  if (!API_BASE) throw new Error('API_BASE not configured');

  const res = await fetch(`${API_BASE}/api/projects`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) throw new Error(`fetchAllProjects: ${res.status}`);
  return res.json();
}

/**
 * Fetch skills data.
 */
export async function fetchSkills(): Promise<Skill[]> {
  if (!API_BASE) throw new Error('API_BASE not configured');

  const res = await fetch(`${API_BASE}/api/skills`, {
    next: { revalidate: 86400 },
  });

  if (!res.ok) throw new Error(`fetchSkills: ${res.status}`);
  return res.json();
}