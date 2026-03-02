// specialist-portfolio/src/pages/Documentation/Documentation.types.ts

export type TutorialCategory = 'llms' | 'python' | 'workflows' | 'automation';
export type TutorialDifficulty = 'Beginner' | 'Intermediate' | 'Advanced';
export type TutorialFormat = 'Tutorial' | 'Reference' | 'Blueprint';

export interface Tutorial {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: TutorialCategory;
  difficulty: TutorialDifficulty;
  format: TutorialFormat;
  lastUpdated: string;
  duration?: string; // optional, e.g., "2h"
}