/**
 * API response types — mirrors Django/DRF serializers + Wagtail API fields.
 * Keep in sync with backend serializers.
 * Future: generate automatically with `pnpm gen:types` via openapi-typescript.
 */

// ─── Pagination ────────────────────────────────────────────────────────
export interface PaginatedResponse<T> {
  count: number;
  total_pages: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

// ─── Wagtail base ──────────────────────────────────────────────────────
export interface WagtailPage {
  id: number;
  title: string;
  slug: string;
  full_url: string;
  meta: {
    type: string;
    detail_url: string;
    html_url: string;
    slug: string;
    first_published_at: string | null;
  };
}

export interface WagtailImage {
  id: number;
  title: string;
  url: string;
  width: number;
  height: number;
}

// ─── Blog ──────────────────────────────────────────────────────────────
export interface BlogPost extends WagtailPage {
  subtitle: string;
  reading_time: number;
  category: string;
  hero_image_thumbnail: WagtailImage | null;
  hero_image_og: WagtailImage | null;
  body: StreamFieldBlock[];
  tags: Tag[];
}

export interface Tag {
  id: number;
  name: string;
  slug: string;
}

// ─── Stream Field ──────────────────────────────────────────────────────
export type StreamFieldBlock =
  | { type: "heading"; value: string; id: string }
  | { type: "paragraph"; value: string; id: string }
  | { type: "image"; value: WagtailImage; id: string }
  | { type: "code"; value: { language: string; code: string }; id: string }
  | { type: "callout"; value: { type: "info" | "warning" | "tip"; text: string }; id: string }
  | { type: "embed"; value: { url: string; html: string }; id: string };

// ─── Tools ─────────────────────────────────────────────────────────────
export type ToolCategory =
  | "financial"
  | "health"
  | "scientific"
  | "productivity"
  | "other";

export interface Tool extends WagtailPage {
  id: number;
  title: string;
  meta: { slug: string };
  category: ToolCategory;
  calculator_slug: string;
  icon: string;
  is_featured: boolean;
  body: StreamFieldBlock[];
  hero_image_thumbnail: WagtailImage | null;
}

// ─── Auth ──────────────────────────────────────────────────────────────
export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  full_name: string;
  bio: string;
  avatar: string | null;
  date_joined: string;
}

// ─── Calculator ────────────────────────────────────────────────────────
export interface CalculatorResponse<T = Record<string, number | string>> {
  result: T;
  calculator: string;
}

export interface CompoundInterestResult {
  final_amount: number;
  interest_earned: number;
  effective_annual_rate: number;
}

export interface MortgageResult {
  monthly_payment: number;
  total_paid: number;
  total_interest: number;
}
