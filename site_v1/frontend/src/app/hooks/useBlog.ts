// src/app/hooks/useBlog.ts

import { useState, useEffect, useCallback } from 'react';
import {
  fetchCmsBlogPosts,
  fetchCmsBlogPost,
  fetchCmsBlogCategories,
  fetchCmsBlogTags,
} from '../services/api';
import type {
  CmsBlogPost,
  CmsBlogPostSummary,
  CmsBlogQueryParams,
} from '../types/api';

// ─── useWagtailBlogPosts ───────────────────────────────────────────
export function useWagtailBlogPosts(params: CmsBlogQueryParams = {}) {
  const [posts, setPosts] = useState<CmsBlogPostSummary[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const paramsKey = JSON.stringify(params);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    fetchCmsBlogPosts(params)
      .then((data) => {
        if (!cancelled) {
          setPosts(data.items);
          setTotalCount(data.meta.total_count);
          setLoading(false);
        }
      })
      .catch((err: Error) => {
        if (!cancelled) {
          setError(err.message);
          setLoading(false);
        }
      });

    return () => { cancelled = true; };
  }, [paramsKey]); // eslint-disable-line react-hooks/exhaustive-deps

  return { posts, totalCount, loading, error };
}

// ─── useWagtailBlogPost ────────────────────────────────────────────
export function useWagtailBlogPost(slug: string | undefined) {
  const [post, setPost] = useState<CmsBlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    let cancelled = false;
    setLoading(true);
    setError(null);

    fetchCmsBlogPost(slug)
      .then((data) => {
        if (!cancelled) {
          setPost(data);
          setLoading(false);
        }
      })
      .catch((err: Error) => {
        if (!cancelled) {
          setError(err.message);
          setLoading(false);
        }
      });

    return () => { cancelled = true; };
  }, [slug]);

  return { post, loading, error };
}

// ─── useWagtailBlogFilters ─────────────────────────────────────────
export function useWagtailBlogFilters() {
  const [categories, setCategories] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch a large set of posts to extract categories and tags
    fetchCmsBlogPosts({ limit: 20 })
      .then((data) => {
        const cats = data.items.map(p => p.category).filter(Boolean);
        const allTags = data.items.flatMap(p => p.tags);
        setCategories([...new Set(cats)].sort());
        setTags([...new Set(allTags)].sort());
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return { categories, tags, loading };
}