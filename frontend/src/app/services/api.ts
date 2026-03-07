// centralized API helper functions and types
import { API_BASE } from "../config";
import {
  Project,
  Paginated,
  BlogPost,
  ResumeData,
} from "../types/api";

// we store tokens in localStorage for simplicity
export interface TokenPair {
  access: string;
  refresh: string;
}

export function saveTokens(tokens: TokenPair) {
  localStorage.setItem("token_pair", JSON.stringify(tokens));
}

export function getTokens(): TokenPair | null {
  const s = localStorage.getItem("token_pair");
  if (!s) return null;
  try {
    return JSON.parse(s);
  } catch {
    return null;
  }
}

export function clearTokens() {
  localStorage.removeItem("token_pair");
}

// wrapper around fetch that adds authorization header if we have a token
async function apiFetch(input: RequestInfo, init: RequestInit = {}) {
  const tokens = getTokens();
  const headers: HeadersInit = init.headers || {};
  if (tokens?.access) {
    headers["Authorization"] = `Bearer ${tokens.access}`;
  }
  const res = await fetch(input, { ...init, headers });
  if (res.status === 401 && tokens?.refresh) {
    // try refresh token
    const refreshRes = await fetch(`${API_BASE}/auth/token/refresh/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh: tokens.refresh }),
    });
    if (refreshRes.ok) {
      const data = await refreshRes.json();
      saveTokens({ access: data.access, refresh: tokens.refresh });
      headers["Authorization"] = `Bearer ${data.access}`;
      return fetch(input, { ...init, headers });
    } else {
      clearTokens();
    }
  }
  return res;
}

// helper to build query strings
function qs(params: Record<string, string | undefined>) {
  const s = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== "") s.append(k, v);
  });
  return s.toString();
}

export async function login(username: string, password: string): Promise<void> {
  const res = await fetch(`${API_BASE}/auth/token/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) throw new Error("Login failed");
  const data = await res.json();
  saveTokens({ access: data.access, refresh: data.refresh });
}

export function logout() {
  clearTokens();
}

export async function getProjects(category?: string): Promise<Paginated<Project>> {
  const query = qs({ category });
  const res = await apiFetch(`${API_BASE}/projects/${query ? `?${query}` : ""}`);
  if (!res.ok) throw new Error(`Failed to load projects (${res.status})`);
  return res.json();
}

export async function getProject(id: string): Promise<Project> {
  const res = await apiFetch(`${API_BASE}/projects/${id}/`);
  if (!res.ok) throw new Error(`Failed to load project ${id}`);
  return res.json();
}

export async function getBlogPosts(category?: string): Promise<Paginated<BlogPost>> {
  const query = qs({ category });
  const res = await apiFetch(`${API_BASE}/blog/${query ? `?${query}` : ""}`);
  if (!res.ok) throw new Error(`Failed to load blog posts (${res.status})`);
  return res.json();
}

export async function getBlogPost(id: string): Promise<BlogPost> {
  const res = await apiFetch(`${API_BASE}/blog/${id}/`);
  if (!res.ok) throw new Error(`Failed to load blog post ${id}`);
  return res.json();
}

export async function getResume(): Promise<ResumeData> {
  const res = await apiFetch(`${API_BASE}/resume/`);
  if (!res.ok) throw new Error(`Failed to load resume`);
  return res.json();
}
