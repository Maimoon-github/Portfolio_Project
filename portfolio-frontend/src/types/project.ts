// src/types/project.ts
export interface ArchitectureHighlight {
  title: string;
  description: string;
  icon?: string;
}

export interface ImplementationPhase {
  phase: string;
  title: string;
  description: string;
  duration?: string;
}

export interface ProjectMetric {
  label: string;
  value: string;
  trend?: 'up' | 'down' | 'neutral';
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  category: 'agentic-ai' | 'data-science' | 'mlops' | 'web3' | 'research';
  client?: string;
  industry?: string;
  timeline?: string;
  role?: string;
  shortDescription: string;
  fullDescription?: string;
  problemStatement?: string;
  solution?: string;
  architectureHighlights?: ArchitectureHighlight[];
  implementationPhases?: ImplementationPhase[];
  keyFeatures?: string[];
  dataFlowDescription?: string;
  results?: string[];
  metrics?: ProjectMetric[];
  technologies: ProjectTechnology[];
  images: ProjectImage[];
  links: ProjectLink[];
  featured: boolean;
  order: number;
  status: 'planned' | 'inProgress' | 'completed' | 'archived';
}