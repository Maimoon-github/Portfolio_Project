const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export async function apiFetch<T>(
  path: string,
  opts: RequestInit & { tags?: string[]; revalidate?: number } = {}
): Promise<T> {
  const { tags, revalidate, ...fetchOpts } = opts;

  const res = await fetch(`${API_BASE}${path}`, {
    ...fetchOpts,
    next: { tags, revalidate },
    headers: {
      "Content-Type": "application/json",
      ...fetchOpts.headers,
    },
  });

  if (!res.ok) {
    throw new Error(`API error ${res.status}: ${path}`);
  }

  return res.json();
}