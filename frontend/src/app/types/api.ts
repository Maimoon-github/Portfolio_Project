// // shared TypeScript interfaces representing the API payloads

// export interface Paginated<T> {
//   count: number;
//   next: string | null;
//   previous: string | null;
//   results: T[];
// }

// // projects
// export interface Project {
//   id: string;
//   title: string;
//   tagline: string;
//   description?: string;
//   image: string;
//   category: string;
//   tags: string[];
//   year: number;
//   role: string;
//   timeline: string;
//   github: string | null;
//   demo: string | null;
//   featured: boolean;
//   overview?: string;
//   challenge?: string;
//   solution?: string;
//   results?: string[];
// }

// // blog
// export interface BlogPost {
//   id: string;
//   title: string;
//   excerpt: string;
//   body: string;
//   category: string;
//   tags: string[];
//   featured: boolean;
//   read_time: string;
//   created_at: string;
// }

// // resume related
// export interface Skill {
//   id: number;
//   name: string;
//   proficiency: number;
//   icon: string;
//   order: number;
// }

// export interface SkillCategory {
//   id: number;
//   name: string;
//   description: string;
//   order: number;
//   skills: Skill[];
// }

// export interface Experience {
//   id: number;
//   title: string;
//   company: string;
//   location: string;
//   start_date: string; // ISO
//   end_date: string | null;
//   current: boolean;
//   description: string;
//   achievements: string;
//   order: number;
// }

// export interface Education {
//   id: number;
//   degree: string;
//   institution: string;
//   location: string;
//   start_date: string;
//   end_date: string | null;
//   description: string;
//   order: number;
// }

// export interface Certification {
//   id: number;
//   name: string;
//   issuing_organization: string;
//   issue_date: string;
//   expiration_date: string | null;
//   credential_id: string;
//   credential_url: string;
//   order: number;
// }

// export interface ResumeData {
//   skills: SkillCategory[];
//   experience: Experience[];
//   education: Education[];
//   certifications: Certification[];
// }

// // knowledge/courses
// export interface Lesson {
//   id: string;
//   title: string;
//   content: string;
//   video_url: string | null;
//   order: number;
// }

// export interface Course {
//   id: string;
//   title: string;
//   slug: string;
//   description?: string;
//   difficulty: string;
//   estimated_hours: number;
//   featured: boolean;
//   lesson_count?: number; // returned on list
//   lessons?: Lesson[]; // returned on detail
// }

// // tools / knowledge
// export interface Tool {
//   id: string;
//   name: string;
//   slug: string;
//   description: string;
//   website_url: string;
//   logo: string | null;
//   featured: boolean;
//   order: number;
//   category_name: string;
// }

// export interface KnowledgeData {
//   courses: Course[];
//   tools: Tool[];
// }
























// Re-export types from generated OpenAPI schema
export type { components, paths } from './generated';

// Convenience aliases for commonly used types
export type Paginated<T = any> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};

// Project types
export type ProjectList = components['schemas']['ProjectList'];
export type ProjectDetail = components['schemas']['ProjectDetail'];
// Use ProjectDetail for full project data (as in detail view)
export type Project = ProjectDetail;

// Blog types
export type PostList = components['schemas']['PostList'];
export type PostDetail = components['schemas']['PostDetail'];
// For blog listing we use PostList; for a single post we use PostDetail
export type BlogPost = PostList;      // used in listing
export type BlogPostDetail = PostDetail;

// Resume types – these will be available once the OpenAPI schema is fixed.
// For now, you can keep the handwritten types (see note below).
export type Skill = components['schemas']['Skill'];
export type SkillCategory = components['schemas']['SkillCategory'];
export type Experience = components['schemas']['Experience'];
export type Education = components['schemas']['Education'];
export type Certification = components['schemas']['Certification'];
export type ResumeData = components['schemas']['Resume'];

// Knowledge types
export type Lesson = components['schemas']['Lesson'];
export type CourseList = components['schemas']['CourseList'];
export type CourseDetail = components['schemas']['CourseDetail'];
export type Course = CourseList;          // used in listing
export type Tool = components['schemas']['Tool'];
export type KnowledgeData = components['schemas']['Knowledge'];

// Contact
export type Contact = components['schemas']['Contact'];