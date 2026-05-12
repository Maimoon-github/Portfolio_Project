// src/constants/index.ts
import { NavItem, SocialLink, Skill, ContactInfo } from '@/types';

/**
 * Site-wide metadata constants
 */
export const SITE_CONFIG = {
  name: 'Alex Kern',
  title: 'AI Agent Architect & Data Scientist',
  description: 'Designing intelligent agentic workflows and production ML systems.',
  url: 'https://alexkern.dev',
  github: 'https://github.com/alexkern',
  linkedin: 'https://linkedin.com/in/alexkern',
  twitter: 'https://twitter.com/alexkern',
  email: 'hello@alexkern.dev',
} as const;

/**
 * Navigation links (used in Navbar)
 */
export const NAVIGATION_ITEMS: readonly NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Expertise', href: '/expertise' },
  { label: 'Projects', href: '/projects' },
  { label: 'Journey', href: '/journey' },
  { label: 'Lab', href: '/lab' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
] as const;

/**
 * Social media links (footer, contact)
 */
export const SOCIAL_LINKS: readonly SocialLink[] = [
  { platform: 'github', url: SITE_CONFIG.github, label: 'GitHub' },
  { platform: 'linkedin', url: SITE_CONFIG.linkedin, label: 'LinkedIn' },
  { platform: 'twitter', url: SITE_CONFIG.twitter, label: 'X (Twitter)' },
  { platform: 'email', url: `mailto:${SITE_CONFIG.email}`, label: 'Email' },
] as const;

/**
 * Core skills (frontend display, categories based on AI/ML focus)
 */
export const SKILLS: readonly Skill[] = [
  { name: 'Python', category: 'language', level: 'expert', yearsOfExperience: 7 },
  { name: 'TypeScript', category: 'language', level: 'advanced', yearsOfExperience: 5 },
  { name: 'PyTorch', category: 'ml', level: 'advanced', yearsOfExperience: 4 },
  { name: 'TensorFlow', category: 'ml', level: 'intermediate', yearsOfExperience: 3 },
  { name: 'LangChain', category: 'framework', level: 'advanced', yearsOfExperience: 2 },
  { name: 'Next.js', category: 'framework', level: 'advanced', yearsOfExperience: 4 },
  { name: 'Three.js', category: 'tool', level: 'intermediate', yearsOfExperience: 2 },
  { name: 'Docker', category: 'tool', level: 'advanced', yearsOfExperience: 5 },
  { name: 'Kubernetes', category: 'platform', level: 'intermediate', yearsOfExperience: 3 },
  { name: 'MLflow', category: 'tool', level: 'advanced', yearsOfExperience: 3 },
] as const;

/**
 * Contact information (used in Contact section)
 */
export const CONTACT_INFO: ContactInfo = {
  email: SITE_CONFIG.email,
  location: 'San Francisco, CA',
  availability: 'open',
} as const;

/**
 * Animation presets (match TLS motion tokens)
 * Used for Framer Motion variants – reference src/lib/motion.ts
 */
export const ANIMATION_DEFAULTS = {
  fadeUp: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  },
  staggerContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  },
  staggerItem: {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  },
} as const;

/**
 * Project filter options (for /projects page)
 */
export const PROJECT_CATEGORIES = {
  'agentic-ai': 'Agentic AI',
  'data-science': 'Data Science',
  'mlops': 'MLOps',
  'web3': 'Web3',
  'other': 'Other',
} as const;

export type ProjectCategoryKey = keyof typeof PROJECT_CATEGORIES;

/**
 * Breakpoint constants (matching Tailwind defaults)
 */
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

/**
 * Glass effect configuration (derived from TLS, but kept for JS logic)
 */
export const GLASS_CONFIG = {
  blur: {
    desktop: 40,
    mobile: 20,
  },
  borderColor: 'rgba(139, 101, 191, 0.25)', // stop 3
  shadowColor: 'rgba(95, 45, 166, 0.15)',   // primary glow
} as const;