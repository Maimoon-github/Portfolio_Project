# Home Page — Complete Implementation
> **Approach:** Server Component shell (`page.tsx`) orchestrates four Client Component sections.
> Data flows from `src/data/projects.ts` → `FeaturedProjects` as typed props.  
> Motion layer is fully isolated in `components/animations/*`; 3D isolated in `components/3d/*`.  
> Every visual value references a CSS custom property from the Design Truth Layer.

---

## Dependency Order

```
types/index.ts
  └─ data/projects.ts
hooks/useReducedMotion.ts
hooks/useMousePosition.ts
hooks/useMediaQuery.ts
components/animations/variants.ts
components/animations/FadeUp.tsx
components/animations/FadeIn.tsx
components/animations/TextReveal.tsx
components/animations/StaggerChildren.tsx
components/animations/MagneticButton.tsx
components/animations/CountUp.tsx
components/ui/Skeleton.tsx
components/ui/Badge.tsx
components/ui/Button.tsx
components/ui/SectionHeader.tsx
components/3d/HeroScene.tsx
components/3d/FloatingOrb.tsx
components/sections/home/HeroSection.tsx
components/sections/home/FeaturedProjects.tsx
components/sections/home/SkillsSnapshot.tsx
components/sections/home/CtaBanner.tsx
app/page.tsx
```

---

## `src/types/index.ts`

```typescript
// src/types/index.ts

export type ProjectStatus = 'live' | 'in-dev' | 'archived';
export type ProjectCategory =
  | 'Machine Learning'
  | 'MLOps'
  | 'Data Engineering'
  | 'AI Agents'
  | 'NLP'
  | 'Computer Vision'
  | 'Analytics';

export interface ProjectItem {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  category: ProjectCategory;
  status: ProjectStatus;
  techStack: string[];
  coverImage: string;
  githubUrl?: string;
  liveUrl?: string;
  year: number;
  featured: boolean;
  complexity: 1 | 2 | 3 | 4 | 5;
}

export type SkillLevel = 'Expert' | 'Advanced' | 'Proficient';
export type SkillCategory =
  | 'Machine Learning'
  | 'MLOps'
  | 'Data Engineering'
  | 'Agent Systems'
  | 'Cloud & Infra'
  | 'Backend';

export interface SkillItem {
  name: string;
  proficiency: number;
  level: SkillLevel;
  tools: string[];
  category: SkillCategory;
}

export interface TechIcon {
  name: string;
  svg: string;
  label: string;
}

export type JourneyEntryType = 'work' | 'education' | 'award' | 'project';

export interface JourneyEntry {
  id: string;
  type: JourneyEntryType;
  title: string;
  organisation: string;
  dateStart: string;
  dateEnd: string | 'Present';
  description: string;
  achievements: string[];
  techStack?: string[];
  location?: string;
  url?: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  ariaLabel: string;
}

export interface PostMeta {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  updatedAt?: string;
  category: string;
  tags: string[];
  coverImage: string;
  author: { name: string; avatar: string };
  featured?: boolean;
  draft?: boolean;
  readingTime?: number;
}
```

---

## `src/data/projects.ts`

```typescript
// src/data/projects.ts
import type { ProjectItem } from '@/types';

export const PROJECTS: ProjectItem[] = [
  {
    slug: 'ai-agent-orchestrator',
    title: 'AI Agent Orchestrator',
    description:
      'Multi-agent LLM framework with tool use, memory, and autonomous task decomposition for enterprise workflows.',
    longDescription: '',
    category: 'AI Agents',
    status: 'live',
    techStack: ['Python', 'LangChain', 'FastAPI', 'Redis', 'PostgreSQL'],
    coverImage: '/images/projects/ai-agent-orchestrator.webp',
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com',
    year: 2025,
    featured: true,
    complexity: 5,
  },
  {
    slug: 'mlops-pipeline',
    title: 'MLOps Pipeline Platform',
    description:
      'End-to-end ML lifecycle management with automated retraining, drift detection, and one-click model promotion.',
    longDescription: '',
    category: 'MLOps',
    status: 'live',
    techStack: ['Airflow', 'MLflow', 'Docker', 'Kubernetes', 'GCP'],
    coverImage: '/images/projects/mlops-pipeline.webp',
    githubUrl: 'https://github.com',
    year: 2024,
    featured: true,
    complexity: 5,
  },
  {
    slug: 'rag-knowledge-engine',
    title: 'RAG Knowledge Engine',
    description:
      'Retrieval-Augmented Generation system for enterprise document intelligence with hybrid vector search.',
    longDescription: '',
    category: 'NLP',
    status: 'live',
    techStack: ['Python', 'LangChain', 'Pinecone', 'OpenAI', 'FastAPI'],
    coverImage: '/images/projects/rag-knowledge-engine.webp',
    githubUrl: 'https://github.com',
    year: 2024,
    featured: true,
    complexity: 4,
  },
];

export const FEATURED_PROJECTS: ProjectItem[] = PROJECTS.filter((p) => p.featured);
```

---

## `src/hooks/useReducedMotion.ts`

```typescript
// src/hooks/useReducedMotion.ts
'use client';

import { useEffect, useState } from 'react';

export function useReducedMotion(): boolean {
  const [prefersReduced, setPrefersReduced] = useState<boolean>(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReduced(mq.matches);

    const handler = (e: MediaQueryListEvent): void => {
      setPrefersReduced(e.matches);
    };

    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return prefersReduced;
}
```

---

## `src/hooks/useMousePosition.ts`

```typescript
// src/hooks/useMousePosition.ts
'use client';

import { useEffect, useRef, useState } from 'react';

export interface MousePosition {
  x: number;
  y: number;
}

export function useMousePosition(
  elementRef?: React.RefObject<HTMLElement | null>,
): MousePosition {
  const [position, setPosition] = useState<MousePosition>({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const target = elementRef?.current ?? window;

    const handleMove = (e: Event): void => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const mouseEvent = e as MouseEvent;
        if (elementRef?.current) {
          const rect = elementRef.current.getBoundingClientRect();
          setPosition({
            x: (mouseEvent.clientX - rect.left) / rect.width,
            y: (mouseEvent.clientY - rect.top) / rect.height,
          });
        } else {
          setPosition({
            x: mouseEvent.clientX / window.innerWidth,
            y: mouseEvent.clientY / window.innerHeight,
          });
        }
      });
    };

    target.addEventListener('mousemove', handleMove);
    return () => {
      target.removeEventListener('mousemove', handleMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, [elementRef]);

  return position;
}
```

---

## `src/hooks/useMediaQuery.ts`

```typescript
// src/hooks/useMediaQuery.ts
'use client';

import { useEffect, useState } from 'react';

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    const mq = window.matchMedia(query);
    setMatches(mq.matches);

    const handler = (e: MediaQueryListEvent): void => setMatches(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [query]);

  return matches;
}

export const BREAKPOINTS = {
  mobile: '(max-width: 767px)',
  tablet: '(max-width: 1023px)',
  desktop: '(min-width: 1024px)',
} as const;
```

---

## `src/components/animations/variants.ts`

```typescript
// src/components/animations/variants.ts
import type { Variants } from 'framer-motion';

export const FADE_UP_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export const FADE_IN_VARIANTS: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

export const SCALE_IN_VARIANTS: Variants = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] },
  },
};

export const SLIDE_IN_LEFT_VARIANTS: Variants = {
  hidden: { opacity: 0, x: -32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.34, 1.56, 0.64, 1] },
  },
};

export const SLIDE_IN_RIGHT_VARIANTS: Variants = {
  hidden: { opacity: 0, x: 32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.34, 1.56, 0.64, 1] },
  },
};

export const STAGGER_CONTAINER_VARIANTS: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

export const PAGE_TRANSITION_VARIANTS: Variants = {
  initial: { opacity: 0, y: 16 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: 0.25, ease: 'easeIn' },
  },
};

export const REDUCED_MOTION_VARIANTS: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
};
```

---

## `src/components/animations/FadeUp.tsx`

```typescript
// src/components/animations/FadeUp.tsx
'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { FADE_UP_VARIANTS, REDUCED_MOTION_VARIANTS } from './variants';

interface FadeUpProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  once?: boolean;
  amount?: number;
}

export function FadeUp({
  children,
  delay = 0,
  className,
  once = true,
  amount = 0.15,
}: FadeUpProps): JSX.Element {
  const prefersReduced = useReducedMotion();
  const variants = prefersReduced ? REDUCED_MOTION_VARIANTS : FADE_UP_VARIANTS;

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={variants}
      transition={delay ? { delay } : undefined}
    >
      {children}
    </motion.div>
  );
}
```

---

## `src/components/animations/FadeIn.tsx`

```typescript
// src/components/animations/FadeIn.tsx
'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { FADE_IN_VARIANTS, REDUCED_MOTION_VARIANTS } from './variants';

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  once?: boolean;
}

export function FadeIn({
  children,
  delay = 0,
  className,
  once = true,
}: FadeInProps): JSX.Element {
  const prefersReduced = useReducedMotion();
  const variants = prefersReduced ? REDUCED_MOTION_VARIANTS : FADE_IN_VARIANTS;

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once }}
      variants={variants}
      transition={delay ? { delay } : undefined}
    >
      {children}
    </motion.div>
  );
}
```

---

## `src/components/animations/StaggerChildren.tsx`

```typescript
// src/components/animations/StaggerChildren.tsx
'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import {
  FADE_UP_VARIANTS,
  REDUCED_MOTION_VARIANTS,
  STAGGER_CONTAINER_VARIANTS,
} from './variants';

interface StaggerChildrenProps {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  once?: boolean;
  amount?: number;
}

export function StaggerChildren({
  children,
  className,
  stagger = 0.12,
  delay = 0.1,
  once = true,
  amount = 0.1,
}: StaggerChildrenProps): JSX.Element {
  const prefersReduced = useReducedMotion();

  const containerVariants = prefersReduced
    ? {}
    : {
        hidden: {},
        visible: {
          transition: { staggerChildren: stagger, delayChildren: delay },
        },
      };

  const itemVariants = prefersReduced ? REDUCED_MOTION_VARIANTS : FADE_UP_VARIANTS;

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={containerVariants}
    >
      {Array.isArray(children)
        ? children.map((child, i) => (
            <motion.div key={i} variants={itemVariants}>
              {child}
            </motion.div>
          ))
        : <motion.div variants={itemVariants}>{children}</motion.div>}
    </motion.div>
  );
}
```

---

## `src/components/animations/TextReveal.tsx`

```typescript
// src/components/animations/TextReveal.tsx
'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface TextRevealProps {
  children: string;
  className?: string;
  delay?: number;
  stagger?: number;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
}

export function TextReveal({
  children,
  className,
  delay = 0,
  stagger = 0.06,
  as: Tag = 'span',
}: TextRevealProps): JSX.Element {
  const prefersReduced = useReducedMotion();
  const words = children.split(' ');

  if (prefersReduced) {
    const MotionTag = motion[Tag] as typeof motion.span;
    return (
      <MotionTag
        className={className}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay }}
      >
        {children}
      </MotionTag>
    );
  }

  const MotionTag = motion[Tag] as typeof motion.span;

  return (
    <MotionTag
      className={className}
      style={{ display: 'block' }}
      initial="hidden"
      animate="visible"
      variants={{
        visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
      aria-label={children}
    >
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          style={{ display: 'inline-block', marginRight: '0.25em' }}
          variants={{
            hidden: { opacity: 0, y: 28, rotateX: -15 },
            visible: {
              opacity: 1,
              y: 0,
              rotateX: 0,
              transition: {
                duration: 0.55,
                ease: [0.25, 0.46, 0.45, 0.94],
              },
            },
          }}
        >
          {word}
        </motion.span>
      ))}
    </MotionTag>
  );
}
```

---

## `src/components/animations/MagneticButton.tsx`

```typescript
// src/components/animations/MagneticButton.tsx
'use client';

import { motion, useSpring, useTransform } from 'framer-motion';
import type { ReactNode } from 'react';
import { useRef } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { BREAKPOINTS, useMediaQuery } from '@/hooks/useMediaQuery';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  strength?: number;
}

export function MagneticButton({
  children,
  className,
  strength = 0.35,
}: MagneticButtonProps): JSX.Element {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const isMobile = useMediaQuery(BREAKPOINTS.mobile);

  const x = useSpring(0, { stiffness: 200, damping: 20, mass: 0.5 });
  const y = useSpring(0, { stiffness: 200, damping: 20, mass: 0.5 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (prefersReduced || isMobile || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * strength);
    y.set((e.clientY - cy) * strength);
  };

  const handleMouseLeave = (): void => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x, y, display: 'inline-block' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  );
}
```

---

## `src/components/animations/CountUp.tsx`

```typescript
// src/components/animations/CountUp.tsx
'use client';

import { motion, useInView, useSpring, useTransform } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface CountUpProps {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

export function CountUp({
  value,
  suffix = '',
  prefix = '',
  duration = 1.8,
  className,
}: CountUpProps): JSX.Element {
  const prefersReduced = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  const springValue = useSpring(0, {
    stiffness: 60,
    damping: 22,
    mass: 0.8,
  });

  const display = useTransform(springValue, (v) => Math.round(v).toString());

  useEffect(() => {
    if (isInView) {
      springValue.set(prefersReduced ? value : value);
    }
  }, [isInView, value, springValue, prefersReduced]);

  if (prefersReduced) {
    return (
      <span ref={ref} className={className}>
        {prefix}{value}{suffix}
      </span>
    );
  }

  return (
    <span ref={ref} className={className} aria-live="polite" aria-label={`${prefix}${value}${suffix}`}>
      {prefix}
      <motion.span>{display}</motion.span>
      {suffix}
    </span>
  );
}
```

---

## `src/components/ui/Skeleton.tsx`

```typescript
// src/components/ui/Skeleton.tsx
import { cn } from '@/lib/cn';

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps): JSX.Element {
  return (
    <div
      className={cn('skeleton-pulse', className)}
      style={{
        background: 'var(--skeleton-base)',
        borderRadius: 'var(--skeleton-radius)',
        position: 'relative',
        overflow: 'hidden',
      }}
      aria-hidden="true"
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'var(--skeleton-shimmer)',
          backgroundSize: '200% 100%',
          animation: 'var(--animate-shimmer)',
        }}
      />
    </div>
  );
}
```

---

## `src/lib/cn.ts`

```typescript
// src/lib/cn.ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
```

---

## `src/components/ui/Badge.tsx`

```typescript
// src/components/ui/Badge.tsx
import { cn } from '@/lib/cn';

type BadgeVariant = 'default' | 'accent' | 'success' | 'warning' | 'error';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const VARIANT_STYLES: Record<BadgeVariant, React.CSSProperties> = {
  default: {
    background: 'var(--tag-bg)',
    border: '1px solid var(--tag-border)',
    color: 'var(--tag-text)',
  },
  accent: {
    background: 'var(--tag-bg-accent)',
    border: '1px solid var(--tag-border-accent)',
    color: 'var(--tag-text-accent)',
  },
  success: {
    background: 'rgba(110, 231, 183, 0.12)',
    border: '1px solid rgba(110, 231, 183, 0.30)',
    color: 'var(--color-success)',
  },
  warning: {
    background: 'rgba(252, 211, 77, 0.10)',
    border: '1px solid rgba(252, 211, 77, 0.25)',
    color: 'var(--color-warning)',
  },
  error: {
    background: 'rgba(255, 180, 171, 0.10)',
    border: '1px solid rgba(255, 180, 171, 0.25)',
    color: 'var(--color-error)',
  },
};

export function Badge({
  children,
  variant = 'default',
  className,
}: BadgeProps): JSX.Element {
  return (
    <span
      className={cn('badge', className)}
      style={{
        ...VARIANT_STYLES[variant],
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: '3px 10px',
        borderRadius: 'var(--radius-full)',
        fontSize: 'var(--text-label-caps)',
        fontFamily: 'var(--font-mono)',
        fontWeight: 500,
        letterSpacing: 'var(--tracking-wide)',
        whiteSpace: 'nowrap',
      }}
    >
      {children}
    </span>
  );
}
```

---

## `src/components/ui/Button.tsx`

```typescript
// src/components/ui/Button.tsx
'use client';

import { cn } from '@/lib/cn';
import type { ReactNode } from 'react';

type ButtonVariant = 'primary' | 'accent' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  isLoading?: boolean;
  asChild?: boolean;
  href?: string;
}

const SIZE_STYLES: Record<ButtonSize, React.CSSProperties> = {
  sm: { padding: '8px 20px', fontSize: 'var(--text-body-sm)' },
  md: {
    padding: 'var(--btn-padding-y) var(--btn-padding-x)',
    fontSize: 'var(--btn-font-size)',
  },
  lg: { padding: '16px 36px', fontSize: 'var(--text-body-lg)' },
};

const VARIANT_STYLES: Record<ButtonVariant, React.CSSProperties> = {
  primary: {
    background: 'var(--btn-primary-bg)',
    color: 'var(--btn-primary-text)',
    border: '1px solid transparent',
  },
  accent: {
    background: 'var(--btn-accent-bg)',
    color: 'var(--btn-accent-text)',
    border: '1px solid transparent',
  },
  ghost: {
    background: 'transparent',
    color: 'var(--color-on-background)',
    border: '1px solid var(--btn-ghost-border)',
  },
};

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  leftIcon,
  rightIcon,
  isLoading = false,
  className,
  disabled,
  ...props
}: ButtonProps): JSX.Element {
  return (
    <button
      className={cn('btn-base', className)}
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      style={{
        ...VARIANT_STYLES[variant],
        ...SIZE_STYLES[size],
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        borderRadius: 'var(--btn-radius)',
        fontFamily: 'var(--font-sans)',
        fontWeight: 'var(--btn-font-weight)' as React.CSSProperties['fontWeight'],
        letterSpacing: 'var(--btn-letter-spacing)',
        cursor: disabled || isLoading ? 'not-allowed' : 'pointer',
        opacity: disabled || isLoading ? 0.6 : 1,
        transition: 'all var(--transition-spring)',
        outline: 'none',
        userSelect: 'none',
        textDecoration: 'none',
        whiteSpace: 'nowrap',
      }}
      onMouseEnter={(e) => {
        if (disabled || isLoading) return;
        const el = e.currentTarget;
        if (variant === 'primary') {
          el.style.background = 'var(--btn-primary-hover)';
          el.style.boxShadow = 'var(--shadow-glow-primary)';
          el.style.transform = 'translateY(-2px) scale(1.02)';
        } else if (variant === 'accent') {
          el.style.background = 'var(--btn-accent-hover)';
          el.style.boxShadow = 'var(--shadow-glow-accent)';
          el.style.transform = 'translateY(-2px) scale(1.02)';
        } else {
          el.style.borderColor = 'var(--btn-ghost-hover-border)';
          el.style.color = 'var(--btn-ghost-hover-text)';
          el.style.transform = 'translateY(-2px)';
        }
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget;
        el.style.background = VARIANT_STYLES[variant].background as string;
        el.style.boxShadow = 'none';
        el.style.transform = 'none';
        if (variant !== 'ghost') {
          el.style.borderColor = 'transparent';
        } else {
          el.style.borderColor = 'var(--btn-ghost-border)';
          el.style.color = 'var(--color-on-background)';
        }
      }}
      onMouseDown={(e) => {
        e.currentTarget.style.transform = 'translateY(0) scale(0.98)';
      }}
      onMouseUp={(e) => {
        if (variant === 'ghost') {
          e.currentTarget.style.transform = 'translateY(-2px)';
        } else {
          e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
        }
      }}
      {...props}
    >
      {isLoading ? (
        <span
          style={{
            width: '16px',
            height: '16px',
            border: '2px solid currentColor',
            borderTopColor: 'transparent',
            borderRadius: '50%',
            animation: 'spin-slow 0.7s linear infinite',
            display: 'inline-block',
          }}
          aria-hidden="true"
        />
      ) : (
        leftIcon
      )}
      {children}
      {!isLoading && rightIcon}
    </button>
  );
}
```

---

## `src/components/ui/SectionHeader.tsx`

```typescript
// src/components/ui/SectionHeader.tsx
import { cn } from '@/lib/cn';
import { FadeUp } from '@/components/animations/FadeUp';

interface SectionHeaderProps {
  eyebrow: string;
  heading: string;
  subheading?: string;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeader({
  eyebrow,
  heading,
  subheading,
  align = 'center',
  className,
}: SectionHeaderProps): JSX.Element {
  const isCenter = align === 'center';

  return (
    <div
      className={cn('section-header', className)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        textAlign: isCenter ? 'center' : 'left',
        alignItems: isCenter ? 'center' : 'flex-start',
        maxWidth: isCenter ? '640px' : undefined,
        margin: isCenter ? '0 auto' : undefined,
      }}
    >
      <FadeUp delay={0}>
        <span className="eyebrow-label">{eyebrow}</span>
      </FadeUp>
      <FadeUp delay={0.1}>
        <h2
          style={{
            fontSize: 'var(--text-h2)',
            fontWeight: 700,
            letterSpacing: 'var(--tracking-tight)',
            lineHeight: 'var(--leading-heading)',
            color: 'var(--color-on-background)',
          }}
        >
          {heading}
        </h2>
      </FadeUp>
      {subheading && (
        <FadeUp delay={0.2}>
          <p
            style={{
              fontSize: 'var(--text-body-md)',
              lineHeight: 'var(--leading-relaxed)',
              color: 'var(--color-outline)',
              maxWidth: '52ch',
            }}
          >
            {subheading}
          </p>
        </FadeUp>
      )}
    </div>
  );
}
```

---

## `src/components/3d/HeroScene.tsx`

```typescript
// src/components/3d/HeroScene.tsx
'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useMousePosition } from '@/hooks/useMousePosition';
import { BREAKPOINTS, useMediaQuery } from '@/hooks/useMediaQuery';

/* ─── Palette constants matching CSS vars (R3F requires raw values) ─── */
const VIOLET_CORE  = '#5F2DA6';
const ETHEREAL_PUR = '#8B65BF';
const ACCENT_TEAL  = '#2DD4BF';
const PARTICLE_CLR = '#D6BAFF';

/* ─── Particle cluster ──────────────────────────────────────────────── */
interface ParticleClusterProps {
  count: number;
  radius: number;
  orbitRadius: number;
  phase: number;
  speed: number;
}

function ParticleCluster({
  count,
  radius,
  orbitRadius,
  phase,
  speed,
}: ParticleClusterProps): JSX.Element {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const positions = useMemo<Float32Array>(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = radius * (0.6 + Math.random() * 0.4);
      pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, [count, radius]);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime() * speed + phase;
    const ox = orbitRadius * Math.cos(t);
    const oz = orbitRadius * Math.sin(t * 0.7);

    for (let i = 0; i < count; i++) {
      dummy.position.set(
        positions[i * 3]     + ox,
        positions[i * 3 + 1] + Math.sin(t + i * 0.3) * 0.15,
        positions[i * 3 + 2] + oz,
      );
      dummy.scale.setScalar(0.8 + Math.sin(t + i * 0.5) * 0.2);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.018, 6, 6]} />
      <meshBasicMaterial color={PARTICLE_CLR} transparent opacity={0.7} />
    </instancedMesh>
  );
}

/* ─── Core icosahedron mesh ─────────────────────────────────────────── */
interface IcosahedronMeshProps {
  mouseX: number;
  mouseY: number;
  reduced: boolean;
}

function IcosahedronMesh({ mouseX, mouseY, reduced }: IcosahedronMeshProps): JSX.Element {
  const solidRef = useRef<THREE.Mesh>(null);
  const wireRef  = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!solidRef.current || !wireRef.current) return;
    const t = clock.getElapsedTime();

    const targetY = reduced ? t * 0.003 : t * 0.003 + (mouseX - 0.5) * 0.4;
    const targetX = reduced ? 0        : (mouseY - 0.5) * 0.2;

    solidRef.current.rotation.y += (targetY - solidRef.current.rotation.y) * 0.06;
    solidRef.current.rotation.x += (targetX - solidRef.current.rotation.x) * 0.06;
    wireRef.current.rotation.y  = solidRef.current.rotation.y + 0.5;
    wireRef.current.rotation.x  = solidRef.current.rotation.x;

    const scale = 1 + Math.sin(t * 0.8) * 0.015;
    solidRef.current.scale.setScalar(scale);
    wireRef.current.scale.setScalar(scale * 1.04);
  });

  return (
    <>
      {/* Solid filled icosahedron */}
      <mesh ref={solidRef}>
        <icosahedronGeometry args={[1.1, 1]} />
        <meshStandardMaterial
          color={VIOLET_CORE}
          emissive={VIOLET_CORE}
          emissiveIntensity={0.35}
          roughness={0.25}
          metalness={0.6}
          transparent
          opacity={0.82}
        />
      </mesh>

      {/* Wireframe overlay */}
      <mesh ref={wireRef}>
        <icosahedronGeometry args={[1.1, 1]} />
        <meshBasicMaterial
          color={ETHEREAL_PUR}
          wireframe
          transparent
          opacity={0.45}
        />
      </mesh>
    </>
  );
}

/* ─── Scene inner (needs Canvas context) ───────────────────────────── */
interface SceneInnerProps {
  mouseX: number;
  mouseY: number;
  reduced: boolean;
  isMobile: boolean;
}

function SceneInner({ mouseX, mouseY, reduced, isMobile }: SceneInnerProps): JSX.Element {
  const particleCount = isMobile ? 15 : 30;

  return (
    <>
      {/* Lights */}
      <ambientLight intensity={0.15} />
      <pointLight color={VIOLET_CORE}  intensity={1.5} position={[2, 2, 2]} />
      <pointLight color={ACCENT_TEAL}  intensity={0.8} position={[-2, -1, 1]} />
      <pointLight color={ETHEREAL_PUR} intensity={0.5} position={[0, -2, -2]} />

      {/* Core mesh */}
      <IcosahedronMesh mouseX={mouseX} mouseY={mouseY} reduced={reduced} />

      {/* Particle clusters — 3 orbiting groups */}
      <ParticleCluster count={particleCount} radius={0.5} orbitRadius={1.8} phase={0}           speed={0.25} />
      <ParticleCluster count={particleCount} radius={0.4} orbitRadius={2.1} phase={2.09}        speed={0.18} />
      <ParticleCluster count={particleCount} radius={0.45} orbitRadius={1.6} phase={4.18}       speed={0.32} />
    </>
  );
}

/* ─── Public export ─────────────────────────────────────────────────── */
export function HeroScene(): JSX.Element {
  const reduced  = useReducedMotion();
  const isMobile = useMediaQuery(BREAKPOINTS.mobile);
  const mouse    = useMousePosition();

  return (
    <div
      aria-hidden="true"
      role="presentation"
      style={{
        width: '100%',
        height: '100%',
        minHeight: isMobile ? '50vh' : '100%',
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
        style={{ background: 'transparent' }}
        frameloop={reduced ? 'demand' : 'always'}
      >
        <SceneInner
          mouseX={mouse.x}
          mouseY={mouse.y}
          reduced={reduced}
          isMobile={isMobile}
        />
      </Canvas>
    </div>
  );
}
```

---

## `src/components/3d/FloatingOrb.tsx`

```typescript
// src/components/3d/FloatingOrb.tsx
'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const VIOLET_CORE = '#5F2DA6';

function OrbMesh(): JSX.Element {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    meshRef.current.position.y = Math.sin(t * 0.6) * 0.2;
    meshRef.current.rotation.y = t * 0.15;
    meshRef.current.rotation.z = t * 0.08;
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1.6, 32, 32]} />
      <meshStandardMaterial
        color={VIOLET_CORE}
        emissive={VIOLET_CORE}
        emissiveIntensity={0.45}
        roughness={0.05}
        metalness={0.8}
        transparent
        opacity={0.22}
        side={THREE.FrontSide}
      />
    </mesh>
  );
}

export function FloatingOrb(): JSX.Element {
  const reduced = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      role="presentation"
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 4], fov: 50 }}
        dpr={[1, 1.2]}
        gl={{ alpha: true, antialias: false }}
        style={{ background: 'transparent' }}
        frameloop={reduced ? 'demand' : 'always'}
      >
        <ambientLight intensity={0.1} />
        <pointLight color={VIOLET_CORE} intensity={2} position={[2, 1, 2]} />
        <OrbMesh />
      </Canvas>
    </div>
  );
}
```

---

## `src/components/sections/home/HeroSection.tsx`

```typescript
// src/components/sections/home/HeroSection.tsx
'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Suspense, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Mail, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Skeleton } from '@/components/ui/Skeleton';
import { TextReveal } from '@/components/animations/TextReveal';
import { FadeUp } from '@/components/animations/FadeUp';
import { CountUp } from '@/components/animations/CountUp';
import { MagneticButton } from '@/components/animations/MagneticButton';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const HeroScene = dynamic(
  () => import('@/components/3d/HeroScene').then((m) => ({ default: m.HeroScene })),
  {
    ssr: false,
    loading: () => (
      <Skeleton
        style={{ width: '100%', height: '100%', minHeight: '400px', borderRadius: 'var(--radius-xl)' }}
      />
    ),
  },
);

interface Stat {
  value: number;
  suffix: string;
  label: string;
}

const STATS: Stat[] = [
  { value: 5, suffix: '+', label: 'Years Experience' },
  { value: 30, suffix: '+', label: 'Projects Delivered' },
  { value: 15, suffix: '+', label: 'Models in Production' },
];

export function HeroSection(): JSX.Element {
  const reduced = useReducedMotion();
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handler = (): void => setScrolled(window.scrollY > window.innerHeight * 0.2);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <section
      id="hero"
      aria-label="Hero — Introduction"
      className="noise-overlay"
      style={{
        position: 'relative',
        minHeight: '100svh',
        display: 'flex',
        alignItems: 'center',
        background: 'var(--color-background)',
        overflow: 'hidden',
      }}
    >
      {/* Radial gradient hero bloom */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'var(--gradient-hero)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Content grid */}
      <div
        className="section-container"
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 480px), 1fr))',
          gap: 'clamp(48px, 8vw, 80px)',
          alignItems: 'center',
          paddingTop: 'calc(var(--header-height) + 48px)',
          paddingBottom: '80px',
        }}
      >
        {/* ── Left: Text block ── */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0',
          }}
        >
          {/* Eyebrow */}
          <FadeUp delay={0}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                marginBottom: '24px',
              }}
            >
              <span className="glow-dot" aria-hidden="true" />
              <span
                className="eyebrow-label"
                style={{ color: 'var(--color-accent)' }}
              >
                Available for Work — 2025
              </span>
            </div>
          </FadeUp>

          {/* H1 Display Headline */}
          <h1
            style={{
              fontSize: 'clamp(44px, 7vw, var(--text-display))',
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: 'var(--tracking-tight)',
              marginBottom: '28px',
            }}
          >
            <TextReveal
              as="span"
              delay={0.1}
              stagger={0.08}
              style={{ display: 'block', color: 'var(--color-on-background)' }}
            >
              I Build
            </TextReveal>
            <TextReveal
              as="span"
              delay={0.22}
              stagger={0.08}
              style={{ display: 'block' }}
            >
              <span className="gradient-text">Intelligent</span>
            </TextReveal>
            <TextReveal
              as="span"
              delay={0.34}
              stagger={0.08}
              style={{ display: 'block', color: 'var(--color-on-background)' }}
            >
              Systems.
            </TextReveal>
          </h1>

          {/* Subheadline */}
          <FadeUp delay={0.5}>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'var(--text-body-lg)',
                color: 'var(--color-outline)',
                lineHeight: 'var(--leading-relaxed)',
                maxWidth: '52ch',
                marginBottom: '40px',
              }}
            >
              Data Scientist · AI Agent Architect · MLOps Engineer
              <br />
              Building autonomous pipelines and production-grade AI at the
              intersection of machine learning and systems engineering.
            </p>
          </FadeUp>

          {/* CTA buttons */}
          <FadeUp delay={0.65}>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '16px',
                marginBottom: '56px',
              }}
            >
              <MagneticButton>
                <Button
                  variant="primary"
                  size="lg"
                  rightIcon={<ArrowRight size={18} />}
                  aria-label="View my portfolio projects"
                  onClick={() => {
                    document.getElementById('featured-projects')?.scrollIntoView({
                      behavior: 'smooth',
                    });
                  }}
                >
                  View My Work
                </Button>
              </MagneticButton>

              <MagneticButton>
                <Link href="/contact" aria-label="Get in touch with me">
                  <Button
                    variant="ghost"
                    size="lg"
                    leftIcon={<Mail size={18} />}
                    as="span"
                  >
                    Get In Touch
                  </Button>
                </Link>
              </MagneticButton>
            </div>
          </FadeUp>

          {/* Social proof stats */}
          <FadeUp delay={0.8}>
            <div
              role="list"
              aria-label="Career statistics"
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0',
              }}
            >
              {STATS.map((stat, i) => (
                <div
                  key={stat.label}
                  role="listitem"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
                    paddingRight: i < STATS.length - 1 ? '28px' : '0',
                    marginRight: i < STATS.length - 1 ? '28px' : '0',
                    borderRight:
                      i < STATS.length - 1
                        ? '1px solid var(--color-outline-variant)'
                        : 'none',
                  }}
                >
                  <span
                    style={{
                      fontSize: 'var(--text-h3)',
                      fontWeight: 700,
                      color: 'var(--color-accent)',
                      lineHeight: 1,
                      fontFamily: 'var(--font-sans)',
                    }}
                  >
                    <CountUp value={stat.value} suffix={stat.suffix} />
                  </span>
                  <span
                    style={{
                      fontSize: 'var(--text-body-sm)',
                      color: 'var(--color-outline)',
                      fontFamily: 'var(--font-mono)',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>

        {/* ── Right: 3D scene ── */}
        <FadeUp delay={0.2}>
          <div
            style={{
              width: '100%',
              aspectRatio: '1 / 1',
              maxWidth: '520px',
              margin: '0 auto',
            }}
          >
            <Suspense
              fallback={
                <Skeleton
                  style={{
                    width: '100%',
                    height: '100%',
                    minHeight: '400px',
                    borderRadius: 'var(--radius-xl)',
                  }}
                />
              }
            >
              <HeroScene />
            </Suspense>
          </div>
        </FadeUp>
      </div>

      {/* Scroll indicator */}
      <AnimatePresence>
        {!scrolled && (
          <motion.div
            key="scroll-indicator"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 0.6, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.4 }}
            aria-hidden="true"
            style={{
              position: 'absolute',
              bottom: '32px',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '6px',
              zIndex: 1,
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-label-caps)',
                letterSpacing: 'var(--tracking-caps)',
                color: 'var(--color-outline)',
                textTransform: 'uppercase',
              }}
            >
              Scroll
            </span>
            <motion.div
              animate={reduced ? {} : { y: [0, 6, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ChevronDown
                size={20}
                color="var(--color-outline)"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
```

---

## `src/components/sections/home/FeaturedProjects.tsx`

```typescript
// src/components/sections/home/FeaturedProjects.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Github, ExternalLink } from 'lucide-react';
import type { ProjectItem } from '@/types';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Badge } from '@/components/ui/Badge';
import { StaggerChildren } from '@/components/animations/StaggerChildren';
import { FadeUp } from '@/components/animations/FadeUp';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface ProjectCardProps {
  project: ProjectItem;
}

function ProjectCard({ project }: ProjectCardProps): JSX.Element {
  const cardRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [tilt, setTilt] = useState<{ rotateX: number; rotateY: number }>({
    rotateX: 0,
    rotateY: 0,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (reduced || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const rotateY = ((e.clientX - cx) / (rect.width / 2)) * 8;
    const rotateX = -((e.clientY - cy) / (rect.height / 2)) * 8;
    setTilt({ rotateX, rotateY });
  };

  const handleMouseLeave = (): void => setTilt({ rotateX: 0, rotateY: 0 });

  const statusVariant =
    project.status === 'live'
      ? 'success'
      : project.status === 'in-dev'
      ? 'warning'
      : 'default';

  const statusLabel =
    project.status === 'live'
      ? 'Live'
      : project.status === 'in-dev'
      ? 'In Dev'
      : 'Archived';

  return (
    <motion.div
      ref={cardRef}
      className="glass-card"
      style={{
        overflow: 'hidden',
        cursor: 'pointer',
        transformStyle: 'preserve-3d',
        perspective: 800,
      }}
      animate={
        reduced
          ? {}
          : {
              rotateX: tilt.rotateX,
              rotateY: tilt.rotateY,
            }
      }
      transition={{ type: 'spring', stiffness: 300, damping: 30, mass: 0.5 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Cover image */}
      <div
        style={{
          position: 'relative',
          aspectRatio: '16/9',
          overflow: 'hidden',
        }}
      >
        <Image
          src={project.coverImage}
          alt={`${project.title} project cover`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          style={{ objectFit: 'cover', transition: 'transform var(--transition-slow)' }}
          className="project-cover-img"
        />
        {/* Gradient overlay */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to bottom, transparent 40%, rgba(13,10,19,0.95) 100%)',
          }}
        />
        {/* Status badge */}
        <div
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
          }}
        >
          <Badge variant={statusVariant}>
            {project.status === 'live' && (
              <span
                className="glow-dot"
                style={{ width: '6px', height: '6px' }}
                aria-hidden="true"
              />
            )}
            {statusLabel}
          </Badge>
        </div>
      </div>

      {/* Card body */}
      <div
        style={{
          padding: 'var(--spacing-card-pad)',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}
      >
        {/* Category eyebrow */}
        <span className="eyebrow-label">{project.category}</span>

        {/* Title */}
        <h3
          style={{
            fontSize: 'var(--text-h3)',
            fontWeight: 700,
            color: 'var(--color-on-background)',
            letterSpacing: 'var(--tracking-tight)',
            lineHeight: 'var(--leading-heading)',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {project.title}
        </h3>

        {/* Description */}
        <p
          style={{
            fontSize: 'var(--text-body-sm)',
            color: 'var(--color-outline)',
            lineHeight: 'var(--leading-body)',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {project.description}
        </p>

        {/* Tech tags */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '6px',
          }}
        >
          {project.techStack.slice(0, 4).map((tech) => (
            <Badge key={tech} variant="default">
              {tech}
            </Badge>
          ))}
          {project.techStack.length > 4 && (
            <Badge variant="default">+{project.techStack.length - 4}</Badge>
          )}
        </div>

        {/* Footer row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: '8px',
            paddingTop: '16px',
            borderTop: '1px solid var(--color-outline-variant)',
          }}
        >
          <Link
            href={`/projects/${project.slug}`}
            className="glass-link"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: 'var(--text-body-sm)',
              fontWeight: 600,
            }}
            aria-label={`View details for ${project.title}`}
          >
            View Details
            <ArrowRight size={14} />
          </Link>

          <div style={{ display: 'flex', gap: '12px' }}>
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${project.title} on GitHub`}
                style={{
                  color: 'var(--color-outline)',
                  transition: 'color var(--transition-fast)',
                  display: 'flex',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-primary-light)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-outline)')}
              >
                <Github size={18} />
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View live demo of ${project.title}`}
                style={{
                  color: 'var(--color-outline)',
                  transition: 'color var(--transition-fast)',
                  display: 'flex',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-accent)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-outline)')}
              >
                <ExternalLink size={18} />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

interface FeaturedProjectsProps {
  projects: ProjectItem[];
}

export function FeaturedProjects({ projects }: FeaturedProjectsProps): JSX.Element {
  return (
    <section
      id="featured-projects"
      aria-labelledby="featured-projects-heading"
      style={{
        paddingTop: 'var(--spacing-section-gap)',
        paddingBottom: '40px',
      }}
    >
      <div className="section-container">
        <SectionHeader
          eyebrow="Featured Work"
          heading="Projects That Ship"
          subheading="Production-grade systems built at the intersection of data science, ML engineering, and autonomous AI."
          align="center"
        />

        <StaggerChildren
          stagger={0.15}
          delay={0.1}
          once
          amount={0.1}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
            gap: '24px',
            marginTop: '64px',
          }}
        >
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </StaggerChildren>

        {/* View all CTA */}
        <FadeUp delay={0.2}>
          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <Link
              href="/projects"
              className="glass-link"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: 'var(--text-body-md)',
                fontWeight: 600,
                color: 'var(--color-primary-light)',
              }}
              aria-label="View all projects in portfolio"
            >
              View All Projects
              <ArrowRight size={18} />
            </Link>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
```

---

## `src/components/sections/home/SkillsSnapshot.tsx`

```typescript
// src/components/sections/home/SkillsSnapshot.tsx
'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { FadeUp } from '@/components/animations/FadeUp';
import { StaggerChildren } from '@/components/animations/StaggerChildren';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface TechIconItem {
  name: string;
  label: string;
  /* Inline SVG path data — avoids external image dependency */
  color: string;
  emoji: string; /* fallback glyph for SSR / reduced motion */
}

const TECH_ICONS: TechIconItem[] = [
  { name: 'Python',     label: 'Python 3.11+',   color: '#3776AB', emoji: '🐍' },
  { name: 'PyTorch',    label: 'PyTorch 2.x',    color: '#EE4C2C', emoji: '🔥' },
  { name: 'TensorFlow', label: 'TF 2.x',         color: '#FF6F00', emoji: '🧠' },
  { name: 'LangChain',  label: 'LangChain 0.x',  color: '#1C7A4B', emoji: '⛓' },
  { name: 'Docker',     label: 'Docker / OCI',   color: '#2496ED', emoji: '🐳' },
  { name: 'Kubernetes', label: 'K8s / Helm',     color: '#326CE5', emoji: '⚙️' },
  { name: 'Airflow',    label: 'Apache Airflow',  color: '#017CEE', emoji: '🌊' },
  { name: 'dbt',        label: 'dbt Core',       color: '#FF694A', emoji: '🔧' },
  { name: 'Spark',      label: 'Apache Spark',   color: '#E25A1C', emoji: '⚡' },
  { name: 'MLflow',     label: 'MLflow 2.x',     color: '#0194E2', emoji: '📊' },
  { name: 'AWS',        label: 'AWS / SageMaker',color: '#FF9900', emoji: '☁️' },
  { name: 'GCP',        label: 'GCP / Vertex',   color: '#4285F4', emoji: '🌐' },
  { name: 'FastAPI',    label: 'FastAPI',         color: '#059669', emoji: '🚀' },
  { name: 'PostgreSQL', label: 'PostgreSQL',      color: '#336791', emoji: '🐘' },
  { name: 'Kafka',      label: 'Apache Kafka',    color: '#000000', emoji: '📨' },
  { name: 'React',      label: 'React 19',        color: '#61DAFB', emoji: '⚛️' },
];

interface TechCellProps {
  item: TechIconItem;
  index: number;
}

function TechCell({ item, index }: TechCellProps): JSX.Element {
  const [hovered, setHovered] = useState<boolean>(false);
  const reduced = useReducedMotion();

  return (
    <motion.div
      className="glass-card"
      role="listitem"
      aria-label={`${item.name}: ${item.label}`}
      style={{
        padding: '20px 12px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '10px',
        cursor: 'default',
        boxShadow: hovered
          ? `var(--shadow-md), 0 0 20px var(--color-glass-glow)`
          : 'var(--shadow-sm)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      animate={reduced ? {} : { scale: hovered ? 1.05 : 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {/* Icon area */}
      <div
        aria-hidden="true"
        style={{
          width: '40px',
          height: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '28px',
          lineHeight: 1,
          filter: hovered ? `drop-shadow(0 0 8px ${item.color}88)` : 'none',
          transition: 'filter var(--transition-base)',
          userSelect: 'none',
        }}
      >
        {item.emoji}
      </div>

      {/* Label */}
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '10px',
          letterSpacing: 'var(--tracking-wide)',
          color: hovered ? 'var(--color-on-background)' : 'var(--color-outline)',
          textAlign: 'center',
          lineHeight: 1.3,
          transition: 'color var(--transition-fast)',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          maxWidth: '72px',
        }}
      >
        {item.name}
      </span>

      {/* Tooltip */}
      {hovered && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            position: 'absolute',
            bottom: 'calc(100% + 8px)',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'var(--tooltip-bg)',
            border: '1px solid var(--tooltip-border)',
            borderRadius: 'var(--tooltip-radius)',
            padding: '4px 10px',
            fontSize: 'var(--text-label-caps)',
            fontFamily: 'var(--font-mono)',
            color: 'var(--tooltip-text)',
            whiteSpace: 'nowrap',
            zIndex: 'var(--z-overlay)',
            pointerEvents: 'none',
          }}
          role="tooltip"
        >
          {item.label}
        </motion.div>
      )}
    </motion.div>
  );
}

export function SkillsSnapshot(): JSX.Element {
  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      style={{ paddingTop: 'var(--spacing-section-gap)' }}
    >
      <div className="section-container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))',
            gap: 'clamp(48px, 8vw, 80px)',
            alignItems: 'center',
          }}
        >
          {/* ── Left: Text ── */}
          <div>
            <SectionHeader
              eyebrow="Core Capabilities"
              heading="Skills That Matter"
              subheading="From raw data to autonomous agents — the full stack of modern AI engineering."
              align="left"
            />

            <FadeUp delay={0.3}>
              <Link
                href="/expertise"
                className="glass-link"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginTop: '32px',
                  fontSize: 'var(--text-body-md)',
                  fontWeight: 600,
                  color: 'var(--color-primary-light)',
                }}
                aria-label="View full expertise and skills page"
              >
                Full Expertise
                <ArrowRight size={18} />
              </Link>
            </FadeUp>
          </div>

          {/* ── Right: Icon grid ── */}
          <div>
            <StaggerChildren
              stagger={0.06}
              delay={0.05}
              once
              amount={0.1}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '12px',
              }}
            >
              {TECH_ICONS.map((item, i) => (
                <div key={item.name} style={{ position: 'relative' }}>
                  <TechCell item={item} index={i} />
                </div>
              ))}
            </StaggerChildren>
          </div>
        </div>
      </div>
    </section>
  );
}
```

---

## `src/components/sections/home/CtaBanner.tsx`

```typescript
// src/components/sections/home/CtaBanner.tsx
'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Suspense } from 'react';
import { Download, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { FadeUp } from '@/components/animations/FadeUp';
import { MagneticButton } from '@/components/animations/MagneticButton';

const FloatingOrb = dynamic(
  () => import('@/components/3d/FloatingOrb').then((m) => ({ default: m.FloatingOrb })),
  { ssr: false, loading: () => null },
);

export function CtaBanner(): JSX.Element {
  return (
    <section
      aria-labelledby="cta-heading"
      style={{
        paddingTop: 'var(--spacing-section-gap)',
        paddingBottom: '80px',
      }}
    >
      <div className="section-container">
        <div
          className="glass-card"
          style={{
            position: 'relative',
            overflow: 'hidden',
            padding: 'clamp(40px, 6vw, 56px) clamp(32px, 6vw, 64px)',
            /* Animated gradient border via background trick */
            background: 'var(--card-bg)',
            borderImage: 'none',
          }}
        >
          {/* Animated gradient border overlay */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: 'inherit',
              padding: '1px',
              background: 'var(--gradient-card-border)',
              backgroundSize: '300% 300%',
              animation: 'border-flow 6s ease infinite',
              WebkitMask:
                'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude',
              pointerEvents: 'none',
            }}
          />

          {/* FloatingOrb ambient 3D */}
          <Suspense fallback={null}>
            <FloatingOrb />
          </Suspense>

          {/* Content */}
          <div
            style={{
              position: 'relative',
              zIndex: 1,
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '40px',
            }}
          >
            {/* Left: headline */}
            <div style={{ flex: '1 1 320px' }}>
              <FadeUp>
                <h2
                  id="cta-heading"
                  className="gradient-text"
                  style={{
                    fontSize: 'clamp(28px, 4vw, var(--text-h1))',
                    fontWeight: 700,
                    letterSpacing: 'var(--tracking-tight)',
                    lineHeight: 'var(--leading-heading)',
                    marginBottom: '16px',
                  }}
                >
                  Let's Build Something Remarkable.
                </h2>
              </FadeUp>
              <FadeUp delay={0.15}>
                <p
                  style={{
                    fontSize: 'var(--text-body-lg)',
                    color: 'var(--color-outline)',
                    lineHeight: 'var(--leading-body)',
                    maxWidth: '48ch',
                  }}
                >
                  Open to senior roles, consulting engagements, and research
                  collaborations in AI systems engineering.
                </p>
              </FadeUp>
            </div>

            {/* Right: CTAs */}
            <FadeUp delay={0.25}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px',
                  flexShrink: 0,
                }}
              >
                <MagneticButton>
                  <Link href="/contact" aria-label="Start a conversation about collaboration">
                    <Button
                      variant="accent"
                      size="lg"
                      leftIcon={<MessageSquare size={18} />}
                      as="span"
                    >
                      Start a Conversation
                    </Button>
                  </Link>
                </MagneticButton>

                <MagneticButton>
                  <a
                    href="/files/resume.pdf"
                    download
                    aria-label="Download resume as PDF"
                  >
                    <Button
                      variant="ghost"
                      size="lg"
                      leftIcon={<Download size={18} />}
                      as="span"
                    >
                      Download Resume
                    </Button>
                  </a>
                </MagneticButton>
              </div>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
}
```

---

## `src/app/page.tsx`

```typescript
// src/app/page.tsx
import type { Metadata } from 'next';
import { FEATURED_PROJECTS } from '@/data/projects';
import { HeroSection } from '@/components/sections/home/HeroSection';
import { FeaturedProjects } from '@/components/sections/home/FeaturedProjects';
import { SkillsSnapshot } from '@/components/sections/home/SkillsSnapshot';
import { CtaBanner } from '@/components/sections/home/CtaBanner';

export const metadata: Metadata = {
  title: 'AI Engineer & Data Scientist — Portfolio',
  description:
    'Personal portfolio of a Data Scientist, AI Agent Architect, and MLOps Engineer. Building autonomous pipelines and production-grade AI systems.',
  openGraph: {
    title: 'AI Engineer & Data Scientist — Portfolio',
    description:
      'Building autonomous pipelines and production-grade AI at the intersection of machine learning and systems engineering.',
    images: [{ url: '/images/og-image.png', width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Engineer & Data Scientist — Portfolio',
    description:
      'Building autonomous pipelines and production-grade AI systems.',
    images: ['/images/og-image.png'],
  },
};

export default function HomePage(): JSX.Element {
  return (
    <main id="main-content" tabIndex={-1}>
      <HeroSection />
      <FeaturedProjects projects={FEATURED_PROJECTS} />
      <SkillsSnapshot />
      <CtaBanner />
    </main>
  );
}
```

---

## Flags — Out-of-Scope Items

| Item | Status | Resolution |
|---|---|---|
| `src/lib/cn.ts` requires `clsx` + `tailwind-merge` | ⚠️ New deps | Justified: standard Tailwind className merging utility; zero runtime overhead |
| `HeroScene` uses `@react-three/fiber` + `three` | ⚠️ Dep check | Should already be in package.json per spec; if not, `npm i @react-three/fiber three @types/three` |
| `Button` `as="span"` pattern | 🔍 Ambiguity | Renders a `<button>` regardless; `as` prop is a placeholder for polymorphic pattern — implement with `asChild` + Slot if needed |
| `TechCell` tooltip positioning | 🔍 Mobile | `position: absolute` tooltip clips on small cells — replace with `Tooltip` component from `ui/` once built |
| `project.coverImage` paths | ⚠️ Placeholder | Images must exist at `public/images/projects/*.webp`; add to public dir before build |
| `CountUp` `useTransform` + `motion.span` | 🔍 Verify | Requires Framer Motion ≥ 10.x; confirm version in package.json |
| `SkillsSnapshot` emoji icons | 🔍 Swap | Replace emoji with proper SVG tech logos from `public/icons/` when assets are available |