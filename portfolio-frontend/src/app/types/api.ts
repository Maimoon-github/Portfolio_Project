export interface Post {
  id: number;
  slug: string;
  title: string;
  body?: string;
  excerpt?: string;
}

export interface PostListResponse {
  results: Post[];
  count: number;
}

export interface Project {
  slug: string;
  title: string;
  description?: string;
  thumbnail?: string;
}

export interface ProjectListResponse {
  results: Project[];
  count: number;
}

export interface Skill { name: string; proficiency?: number; }
export interface Experience { company: string; role: string; start_date: string; end_date?: string; }
export interface Testimonial { quote: string; authorName: string; authorRole: string; authorCompany: string; avatar?: string; }

export interface Tool { slug: string; title: string; description?: string; }
export interface ToolListResponse { results: Tool[]; }
export interface ToolCategory { slug: string; name: string; }