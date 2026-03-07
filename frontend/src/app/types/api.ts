// shared TypeScript interfaces representing the API payloads

export interface Paginated<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

// projects
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

// blog
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

// resume related
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
  start_date: string; // ISO
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
