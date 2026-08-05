/**
 * Shared motion tokens for the app's GSAP-driven animation system.
 * Keep values restrained and consistent with an "Apple-inspired" feel:
 * natural deceleration, small distances, no exaggerated bounce.
 */

export const motionTokens = {
  duration: {
    /** Micro feedback (press states, indicator nudges). */
    instant: 0.12,
    /** Popovers, dropdowns, small exits. */
    fast: 0.18,
    /** Default enter transitions (cards, dialogs). */
    base: 0.28,
    /** Sheets, collapse/expand, larger surfaces. */
    moderate: 0.4,
    /** Page transitions, large scroll reveals. */
    slow: 0.6,
  },
  ease: {
    standard: 'power2.out',
    standardIn: 'power2.in',
    standardInOut: 'power2.inOut',
    /** Natural deceleration for entrances. */
    decelerate: 'power3.out',
    /** Natural acceleration for exits. */
    accelerate: 'power3.in',
    /** Restrained spring — a hint of overshoot, never a bounce. */
    spring: 'back.out(1.2)',
  },
  stagger: {
    tight: 0.03,
    base: 0.06,
    loose: 0.09,
  },
  distance: {
    xs: 8,
    sm: 16,
    md: 24,
    lg: 40,
  },
  scale: {
    /** Starting scale for scale-in entrances (subtle, not a "pop"). */
    in: 0.96,
  },
} as const;

export type Side = 'top' | 'right' | 'bottom' | 'left';

export type MotionCtx = { reduced: boolean };
