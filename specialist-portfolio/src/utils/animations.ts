// specialist-portfolio/src/utils/animations.ts

/**
 * animations.ts
 * Animation utility constants and helper functions.
 * Provides type‑safe access to animation classes defined in src/styles/animations.css.
 */

// ----------------------------------------------------------------------
// Animation class constants
// ----------------------------------------------------------------------

/** Base entrance animations */
export const ANIMATION_FADE_IN = 'animate-fade-in';
export const ANIMATION_SLIDE_UP = 'animate-slide-up';
export const ANIMATION_SLIDE_LEFT = 'animate-slide-left';
export const ANIMATION_PULSE_GOLD = 'animate-pulse-gold';
export const ANIMATION_SHIMMER = 'animate-shimmer';
export const ANIMATION_FLOAT = 'animate-float';

/** Stagger delay utilities (in milliseconds) */
export const STAGGER_100 = 'delay-100';
export const STAGGER_200 = 'delay-200';
export const STAGGER_300 = 'delay-300';
export const STAGGER_400 = 'delay-400';
export const STAGGER_500 = 'delay-500';

/** Hover state utilities */
export const HOVER_LIFT = 'hover-lift';
export const HOVER_GLOW = 'hover-glow';

// ----------------------------------------------------------------------
// Type definitions
// ----------------------------------------------------------------------

export type AnimationName =
  | typeof ANIMATION_FADE_IN
  | typeof ANIMATION_SLIDE_UP
  | typeof ANIMATION_SLIDE_LEFT
  | typeof ANIMATION_PULSE_GOLD
  | typeof ANIMATION_SHIMMER
  | typeof ANIMATION_FLOAT;

export type StaggerDelay =
  | typeof STAGGER_100
  | typeof STAGGER_200
  | typeof STAGGER_300
  | typeof STAGGER_400
  | typeof STAGGER_500;

export type HoverEffect = typeof HOVER_LIFT | typeof HOVER_GLOW;

// ----------------------------------------------------------------------
// Helper functions
// ----------------------------------------------------------------------

/**
 * Combines an animation class with an optional stagger delay.
 * @param animation - The base animation class.
 * @param delay - Optional stagger delay class.
 * @returns Space‑separated class string.
 *
 * @example
 * withStagger(ANIMATION_FADE_IN, STAGGER_200) // → 'animate-fade-in delay-200'
 */
export function withStagger(animation: AnimationName, delay?: StaggerDelay): string {
  return delay ? `${animation} ${delay}` : animation;
}

/**
 * Applies a hover effect class.
 * @param effect - The hover effect class.
 * @returns The effect class string.
 *
 * @example
 * withHover(HOVER_LIFT) // → 'hover-lift'
 */
export function withHover(effect: HoverEffect): string {
  return effect;
}

/**
 * Checks if an animation should be disabled based on reduced motion preference.
 * @param prefersReducedMotion - Boolean indicating reduced motion preference.
 * @param animation - The animation class to conditionally apply.
 * @returns The animation class if motion allowed, otherwise undefined.
 *
 * @example
 * conditionalAnimation(useReducedMotion(), ANIMATION_FADE_IN)
 */
export function conditionalAnimation(
  prefersReducedMotion: boolean,
  animation: AnimationName
): AnimationName | undefined {
  return prefersReducedMotion ? undefined : animation;
}