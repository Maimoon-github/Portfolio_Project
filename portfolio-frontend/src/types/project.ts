// src/types/project.ts
export interface ProjectTechnology {
  name: string;
  icon?: string;
  color?: string; // Optional, but should use CSS variable references in components, not hardcoded here
}

export interface ProjectLink {
  type: 'github' | 'demo' | 'documentation' | 'caseStudy';
  url: string;
  label?: string;
}

export interface ProjectImage {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription?: string;
  technologies: ProjectTechnology[];
  images: ProjectImage[];
  links: ProjectLink[];
  featured: boolean;
  order: number;
  startDate?: Date;
  endDate?: Date;
  status: 'planned' | 'inProgress' | 'completed' | 'archived';
  category: 'agentic-ai' | 'data-science' | 'mlops' | 'web3' | 'other';
}

export interface ProjectFilters {
  category?: Project['category'];
  featuredOnly?: boolean;
  technology?: string;
}