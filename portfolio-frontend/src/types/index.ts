// src/types/index.ts
export type * from './project';
export * from './three';

// Common types used across the portfolio
export interface NavItem {
  label: string;
  href: string;
  isExternal?: boolean;
}

export interface SocialLink {
  platform: 'github' | 'linkedin' | 'twitter' | 'email' | 'other';
  url: string;
  label?: string;
}

export interface Skill {
  name: string;
  category: 'language' | 'framework' | 'tool' | 'platform' | 'ml' | 'data';
  level?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  yearsOfExperience?: number;
  icon?: string; // Icon name or URL
}

export interface ContactInfo {
  email: string;
  location?: string;
  availability?: 'open' | 'limited' | 'unavailable';
}

export interface SeoProps {
  title?: string;
  description?: string;
  image?: string;
  noIndex?: boolean;
}