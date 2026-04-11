// src/app/types/api.ts

// ============================================================
// Manual API Types (already working)
// ============================================================

export interface Paginated<T = any> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

// Project types
export interface Project {
  id: string;
  title: string;
  tagline: string;
  description?: string;
  image: string;
  category: string;
  tags: string[];
  year: number;
  role: string;
  timeline: string;
  github: string | null;
  demo: string | null;
  featured: boolean;
  overview?: string;
  challenge?: string;
  solution?: string;
  results?: string[];
}

// Blog (original DRF) types
export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  body: string;
  category: string;
  tags: string[];
  featured: boolean;
  read_time: string;
  created_at: string;
}

// Resume related
export interface Skill {
  id: number;
  name: string;
  proficiency: number;
  icon: string;
  order: number;
}

export interface SkillCategory {
  id: number;
  name: string;
  description: string;
  order: number;
  skills: Skill[];
}

export interface Experience {
  id: number;
  title: string;
  company: string;
  location: string;
  start_date: string;
  end_date: string | null;
  current: boolean;
  description: string;
  achievements: string;
  order: number;
}

export interface Education {
  id: number;
  degree: string;
  institution: string;
  location: string;
  start_date: string;
  end_date: string | null;
  description: string;
  order: number;
}

export interface Certification {
  id: number;
  name: string;
  issuing_organization: string;
  issue_date: string;
  expiration_date: string | null;
  credential_id: string;
  credential_url: string;
  order: number;
}

export interface ResumeData {
  skills: SkillCategory[];
  experience: Experience[];
  education: Education[];
  certifications: Certification[];
}

// Knowledge / Courses
export interface Lesson {
  id: string;
  title: string;
  content: string;
  video_url: string | null;
  order: number;
}

export interface Course {
  id: string;
  title: string;
  slug: string;
  description?: string;
  difficulty: string;
  estimated_hours: number;
  featured: boolean;
  lesson_count?: number;
  lessons?: Lesson[];
}

// Tools / Knowledge
export interface Tool {
  id: string;
  name: string;
  slug: string;
  description: string;
  website_url: string;
  logo: string | null;
  featured: boolean;
  order: number;
  category_name: string;
}

export interface KnowledgeData {
  courses: Course[];
  tools: Tool[];
}

// Contact
export interface Contact {
  name: string;
  email: string;
  message: string;
}

// ============================================================
// Wagtail CMS Types (Manual definitions)
// ============================================================

export interface WagtailMeta {
  type: string;
  detail_url: string;
  html_url: string;
  slug: string;
  first_published_at: string;
}

export interface WagtailListResponse<T> {
  meta: {
    total_count: number;
  };
  items: T[];
}

export interface CmsImageRenditions {
  full: string;
  thumbnail: string;
  og: string;
}

export interface CmsAuthor {
  id: number;
  name: string;
  bio: string;
  photo_url: string | null;
  twitter: string;
  linkedin: string;
  github: string;
}

export interface CmsBlogPostSummary {
  id: number;
  meta: WagtailMeta;
  title: string;
  excerpt: string;
  date_published: string;
  category: string;
  tags: string[];                     // ← changed from tags_list
  featured_image: {                   // ← changed from featured_image_url
    id: number;
    title: string;
    meta: { type: string; detail_url: string; download_url: string };
  } | null;
  author: CmsAuthor | null;
  reading_time_minutes: number;
}

export type CmsBlock =
  | { type: 'heading'; value: string; id: string }
  | { type: 'subheading'; value: string; id: string }
  | { type: 'paragraph'; value: string; id: string }
  | {
      type: 'image';
      value: {
        image: number;
        caption: string;
        alignment: 'left' | 'center' | 'right';
      };
      id: string;
    }
  | {
      type: 'quote';
      value: { text: string; attribution: string };
      id: string;
    }
  | {
      type: 'code';
      value: { language: string; code: string; filename: string };
      id: string;
    }
  | {
      type: 'callout';
      value: { type: 'info' | 'warning' | 'success' | 'danger'; text: string };
      id: string;
    }
  | { type: 'embed'; value: string; id: string };

export interface CmsBlogPost extends CmsBlogPostSummary {
  body: CmsBlock[];
}

export interface CmsBlogQueryParams {
  page?: number;
  limit?: number;
  category?: string;
  tags?: string;
  search?: string;
  order?: string;
}