// src/app/services/api.ts

import { API_BASE } from "../config";
import {
  Project,
  Paginated,
  BlogPost,
  ResumeData,
  Course,
  Tool,
  KnowledgeData,
  Contact,
} from "../types/api";

// ─── Token handling ───────────────────────────────────────────────
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

export type ApiHeaders = Record<string, string>;

// ─── Core fetch wrapper with token refresh ────────────────────────
async function apiFetch(input: RequestInfo, init: RequestInit = {}) {
  const tokens = getTokens();
  const headers = (init.headers as ApiHeaders) || {};
  if (tokens?.access) {
    headers.Authorization = `Bearer ${tokens.access}`;
  }
  const res = await fetch(input, { ...init, headers });
  if (res.status === 401 && tokens?.refresh) {
    const refreshRes = await fetch(`${API_BASE}/auth/token/refresh/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh: tokens.refresh }),
    });
    if (refreshRes.ok) {
      const data = await refreshRes.json();
      saveTokens({ access: data.access, refresh: tokens.refresh });
      headers.Authorization = `Bearer ${data.access}`;
      return fetch(input, { ...init, headers });
    } else {
      clearTokens();
    }
  }
  return res;
}

function qs(params: Record<string, string | undefined>) {
  const s = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== "") s.append(k, v);
  });
  return s.toString();
}

// ─── Authentication ────────────────────────────────────────────────
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

// ─── Projects ─────────────────────────────────────────────────────
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

// ─── Blog (DRF) ────────────────────────────────────────────────────
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

// ─── Resume ────────────────────────────────────────────────────────
export async function getResume(): Promise<ResumeData> {
  const res = await apiFetch(`${API_BASE}/resume/`);
  if (!res.ok) throw new Error(`Failed to load resume`);
  return res.json();
}

// ─── Knowledge / Courses / Tools ───────────────────────────────────
export async function getCourses(): Promise<Paginated<Course>> {
  const res = await apiFetch(`${API_BASE}/knowledge/courses/`);
  if (!res.ok) throw new Error(`Failed to load courses`);
  return res.json();
}

export async function getCourse(slug: string): Promise<Course> {
  const res = await apiFetch(`${API_BASE}/knowledge/courses/${slug}/`);
  if (!res.ok) throw new Error(`Failed to load course ${slug}`);
  return res.json();
}

export async function getTools(): Promise<Tool[]> {
  const res = await apiFetch(`${API_BASE}/knowledge/tools/`);
  if (!res.ok) throw new Error(`Failed to load tools`);
  return res.json();
}

export async function getKnowledge(): Promise<KnowledgeData> {
  const res = await apiFetch(`${API_BASE}/knowledge/`);
  if (!res.ok) throw new Error(`Failed to load knowledge overview`);
  return res.json();
}

// ─── Contact ───────────────────────────────────────────────────────
export async function submitContact(data: Contact): Promise<Contact> {
  const res = await apiFetch(`${API_BASE}/contact/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to send message');
  return res.json();
}

// ──────────────────────────────────────────────────────────────────
// Wagtail CMS API functions (headless)
// ──────────────────────────────────────────────────────────────────

import { CMS_API_BASE_URL } from '../config';
import type {
  CmsBlogPost,
  CmsBlogPostSummary,
  CmsBlogQueryParams,
  WagtailListResponse,
} from '../types/api';

const LIST_FIELDS = [
  'title',
  'slug',
  'date_published',
  'excerpt',
  'category',
  'tags',                    // ← corrected from 'tags_list'
  'featured_image',          // ← corrected from 'featured_image_url'
  'author',
  'reading_time_minutes',
].join(',');

export async function fetchCmsBlogPosts(
  params: CmsBlogQueryParams = {}
): Promise<WagtailListResponse<CmsBlogPostSummary>> {
  const {
    page = 1,
    limit = 10,
    category,
    tags,
    search,
    order = '-date_published',
  } = params;

  const offset = (page - 1) * limit;

  const query = new URLSearchParams({
    type: 'cms.BlogPage',
    fields: LIST_FIELDS,
    order,
    limit: String(limit),
    offset: String(offset),
  });

  if (category) query.set('category', category);
  if (tags) query.set('tags', tags);
  if (search) query.set('search', search);

  const res = await fetch(`${CMS_API_BASE_URL}/pages/?${query}`);
  if (!res.ok) throw new Error(`CMS API error: ${res.status}`);
  return res.json();
}

export async function fetchCmsBlogPost(slug: string): Promise<CmsBlogPost> {
  const findRes = await fetch(
    `${CMS_API_BASE_URL}/pages/?type=cms.BlogPage&slug=${slug}&fields=*`
  );
  if (!findRes.ok) throw new Error(`CMS API error: ${findRes.status}`);
  const data = await findRes.json();

  if (!data.items?.length) {
    throw new Error(`Blog post not found: ${slug}`);
  }

  const post = data.items[0];
  const detailRes = await fetch(
    `${CMS_API_BASE_URL}/pages/${post.id}/?fields=*`
  );
  if (!detailRes.ok) throw new Error(`CMS API error: ${detailRes.status}`);
  return detailRes.json();
}

export async function fetchCmsBlogCategories(): Promise<string[]> {
  const res = await fetch(
    `${CMS_API_BASE_URL}/pages/?type=cms.BlogPage&fields=category&limit=100`
  );
  if (!res.ok) throw new Error(`CMS API error: ${res.status}`);
  const data = await res.json();
  const cats = data.items
    .map((p: { category: string }) => p.category)
    .filter(Boolean);
  return [...new Set<string>(cats)].sort();
}

export async function fetchCmsBlogTags(): Promise<string[]> {
  const res = await fetch(
    `${CMS_API_BASE_URL}/pages/?type=cms.BlogPage&fields=tags&limit=100`
  );
  if (!res.ok) throw new Error(`CMS API error: ${res.status}`);
  const data = await res.json();
  const allTags = data.items.flatMap(
    (p: { tags_list: string[] }) => p.tags_list
  );
  return [...new Set<string>(allTags)].sort();
}