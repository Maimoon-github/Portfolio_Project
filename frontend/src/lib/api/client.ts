/**
 * Base API client for all Django/Wagtail requests.
 *
 * Design decisions:
 * - INTERNAL_API_URL used for server-side fetches (no network hop via browser)
 * - NEXT_PUBLIC_API_URL used client-side (goes through browser network)
 * - next.revalidate + next.tags enable fine-grained ISR cache invalidation
 * - All errors throw ApiError with status code — callers can handle 404 vs 500 differently
 */

export class ApiError extends Error {
  constructor(
    public status: number,
    public statusText: string,
    public data?: unknown
  ) {
    super(`API Error ${status}: ${statusText}`);
    this.name = "ApiError";
  }
}

type FetchOptions = RequestInit & {
  /** ISR revalidation in seconds. 0 = no cache. false = cache forever. */
  revalidate?: number | false;
  /** Cache tags for on-demand revalidation via /api/revalidate */
  tags?: string[];
};

function getBaseUrl(): string {
  // Server-side: use internal Docker network URL (fast, no public internet hop)
  if (typeof window === "undefined") {
    return process.env.INTERNAL_API_URL ?? "http://localhost:8000";
  }
  // Client-side: use public URL
  return process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";
}

export async function apiFetch<T = unknown>(
  path: string,
  options: FetchOptions = {}
): Promise<T> {
  const { revalidate, tags, ...fetchOptions } = options;

  const url = `${getBaseUrl()}/api/v1${path}`;

  const nextOptions: RequestInit["next"] = {};
  if (revalidate !== undefined) nextOptions.revalidate = revalidate;
  if (tags?.length) nextOptions.tags = tags;

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...fetchOptions.headers,
    },
    ...fetchOptions,
    ...(Object.keys(nextOptions).length ? { next: nextOptions } : {}),
  });

  if (!response.ok) {
    let data: unknown;
    try {
      data = await response.json();
    } catch {
      data = null;
    }
    throw new ApiError(response.status, response.statusText, data);
  }

  // 204 No Content
  if (response.status === 204) return null as T;

  return response.json() as Promise<T>;
}

/** Wagtail Pages API base fetcher */
export async function wagtailFetch<T = unknown>(
  path: string,
  options: FetchOptions = {}
): Promise<T> {
  const { revalidate, tags, ...fetchOptions } = options;
  const baseUrl = typeof window === "undefined"
    ? (process.env.INTERNAL_API_URL ?? "http://localhost:8000")
    : (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000");

  const url = `${baseUrl}${path}`;

  const nextOptions: RequestInit["next"] = {};
  if (revalidate !== undefined) nextOptions.revalidate = revalidate;
  if (tags?.length) nextOptions.tags = tags;

  const response = await fetch(url, {
    headers: { Accept: "application/json", ...fetchOptions.headers },
    ...fetchOptions,
    ...(Object.keys(nextOptions).length ? { next: nextOptions } : {}),
  });

  if (!response.ok) {
    throw new ApiError(response.status, response.statusText);
  }

  return response.json() as Promise<T>;
}
