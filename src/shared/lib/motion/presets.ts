import { gsap } from '@/shared/lib/gsap';

import type { MotionCtx, Side } from './tokens';
import { motionTokens as t } from './tokens';

type Target = gsap.TweenTarget;

/** Simple opacity fade — the safest default, used as the reduced-motion fallback everywhere. */
export function fadeIn(
  target: Target,
  {
    reduced,
    duration = t.duration.base,
    delay = 0,
  }: MotionCtx & {
    duration?: number;
    delay?: number;
  }
) {
  if (reduced) {
    return gsap.fromTo(
      target,
      { opacity: 0 },
      { opacity: 1, duration: t.duration.fast, delay, ease: t.ease.standard }
    );
  }
  return gsap.fromTo(
    target,
    { opacity: 0 },
    { opacity: 1, duration, delay, ease: t.ease.decelerate }
  );
}

export function fadeOut(
  target: Target,
  { reduced, duration = t.duration.fast }: MotionCtx & { duration?: number }
) {
  return gsap.to(target, {
    opacity: 0,
    duration: reduced ? t.duration.instant : duration,
    ease: t.ease.accelerate,
  });
}

/** Opacity + upward translate — the workhorse entrance for cards, list rows, sections. */
export function fadeUp(
  target: Target,
  {
    reduced,
    y = t.distance.sm,
    duration = t.duration.base,
    delay = 0,
  }: MotionCtx & { y?: number; duration?: number; delay?: number }
) {
  if (reduced) {
    return gsap.fromTo(
      target,
      { opacity: 0 },
      { opacity: 1, duration: t.duration.fast, delay, ease: t.ease.standard }
    );
  }
  return gsap.fromTo(
    target,
    { opacity: 0, y },
    { opacity: 1, y: 0, duration, delay, ease: t.ease.decelerate }
  );
}

/** Opacity + subtle scale — used for popovers, dialogs, badges appearing in place. */
export function scaleIn(
  target: Target,
  {
    reduced,
    duration = t.duration.base,
    delay = 0,
    scale = t.scale.in,
  }: MotionCtx & { duration?: number; delay?: number; scale?: number }
) {
  if (reduced) {
    return gsap.fromTo(
      target,
      { opacity: 0 },
      { opacity: 1, duration: t.duration.fast, delay, ease: t.ease.standard }
    );
  }
  return gsap.fromTo(
    target,
    { opacity: 0, scale },
    { opacity: 1, scale: 1, duration, delay, ease: t.ease.decelerate }
  );
}

/** Animates the direct children of a container in with a gentle stagger. */
export function staggerChildren(
  container: HTMLElement,
  {
    reduced,
    y = t.distance.sm,
    duration = t.duration.base,
    stagger = t.stagger.base,
    delay = 0,
  }: MotionCtx & {
    y?: number;
    duration?: number;
    stagger?: number;
    delay?: number;
  }
) {
  const children = Array.from(container.children);
  if (children.length === 0) return gsap.timeline();

  if (reduced) {
    return gsap.fromTo(
      children,
      { opacity: 0 },
      { opacity: 1, duration: t.duration.fast, delay, ease: t.ease.standard }
    );
  }

  return gsap.fromTo(
    children,
    { opacity: 0, y },
    {
      opacity: 1,
      y: 0,
      duration,
      delay,
      stagger,
      ease: t.ease.decelerate,
    }
  );
}

/** Dialog panel enter/exit — opacity + subtle scale + lift, no bounce. */
export function dialogEnter(el: Element, { reduced }: MotionCtx) {
  if (reduced) {
    return gsap.fromTo(
      el,
      { opacity: 0 },
      { opacity: 1, duration: t.duration.fast, ease: t.ease.standard }
    );
  }
  return gsap.fromTo(
    el,
    { opacity: 0, scale: t.scale.in, y: t.distance.xs },
    {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: t.duration.base,
      ease: t.ease.decelerate,
    }
  );
}

export function dialogExit(el: Element, { reduced }: MotionCtx) {
  if (reduced) {
    return gsap.to(el, {
      opacity: 0,
      duration: t.duration.instant,
      ease: t.ease.accelerate,
    });
  }
  return gsap.to(el, {
    opacity: 0,
    scale: t.scale.in,
    y: t.distance.xs,
    duration: t.duration.fast,
    ease: t.ease.accelerate,
  });
}

const sheetAxis: Record<Side, { prop: 'xPercent' | 'yPercent'; from: number }> =
  {
    right: { prop: 'xPercent', from: 100 },
    left: { prop: 'xPercent', from: -100 },
    top: { prop: 'yPercent', from: -100 },
    bottom: { prop: 'yPercent', from: 100 },
  };

/** Sheet/drawer enter — slides fully in from its docked edge, direction picked by `side`. */
export function sheetEnter(side: Side) {
  return (el: Element, { reduced }: MotionCtx) => {
    const { prop, from } = sheetAxis[side];
    if (reduced) {
      return gsap.fromTo(
        el,
        { opacity: 0 },
        { opacity: 1, duration: t.duration.fast, ease: t.ease.standard }
      );
    }
    return gsap.fromTo(
      el,
      { opacity: 0, [prop]: from },
      {
        opacity: 1,
        [prop]: 0,
        duration: t.duration.moderate,
        ease: t.ease.decelerate,
      }
    );
  };
}

export function sheetExit(side: Side) {
  return (el: Element, { reduced }: MotionCtx) => {
    const { prop, from } = sheetAxis[side];
    if (reduced) {
      return gsap.to(el, {
        opacity: 0,
        duration: t.duration.instant,
        ease: t.ease.accelerate,
      });
    }
    return gsap.to(el, {
      opacity: 0,
      [prop]: from,
      duration: t.duration.fast,
      ease: t.ease.accelerate,
    });
  };
}

/** Popover-scale enter/exit for dropdowns, menus, tooltips — respects the panel's transform-origin. */
export function popoverEnter(el: Element, { reduced }: MotionCtx) {
  if (reduced) {
    return gsap.fromTo(
      el,
      { opacity: 0 },
      { opacity: 1, duration: t.duration.fast, ease: t.ease.standard }
    );
  }
  return gsap.fromTo(
    el,
    { opacity: 0, scale: t.scale.in, y: -4 },
    {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: t.duration.fast,
      ease: t.ease.spring,
    }
  );
}

export function popoverExit(el: Element, { reduced }: MotionCtx) {
  if (reduced) {
    return gsap.to(el, {
      opacity: 0,
      duration: t.duration.instant,
      ease: t.ease.accelerate,
    });
  }
  return gsap.to(el, {
    opacity: 0,
    scale: t.scale.in,
    duration: t.duration.instant,
    ease: t.ease.accelerate,
  });
}

/** Moves a sliding "active tab" pill indicator to a new position/size. */
export function activeIndicatorMove(
  el: Element,
  { reduced, x, width }: MotionCtx & { x: number; width: number }
) {
  if (reduced) {
    return gsap.set(el, { x, width });
  }
  return gsap.to(el, {
    x,
    width,
    duration: t.duration.base,
    ease: t.ease.decelerate,
  });
}

/** Accordion-style height expand/collapse, ready for use wherever a collapsible panel is added. */
export function collapseEnter(el: HTMLElement, { reduced }: MotionCtx) {
  const height = el.scrollHeight;
  if (reduced) {
    return gsap.fromTo(
      el,
      { height: 0, opacity: 0 },
      {
        height,
        opacity: 1,
        duration: t.duration.fast,
        ease: t.ease.standard,
        onComplete: () => gsap.set(el, { height: 'auto' }),
      }
    );
  }
  return gsap.fromTo(
    el,
    { height: 0, opacity: 0 },
    {
      height,
      opacity: 1,
      duration: t.duration.moderate,
      ease: t.ease.standardInOut,
      onComplete: () => gsap.set(el, { height: 'auto' }),
    }
  );
}

export function collapseExit(el: HTMLElement, { reduced }: MotionCtx) {
  const height = el.scrollHeight;
  return gsap.fromTo(
    el,
    { height, opacity: 1 },
    {
      height: 0,
      opacity: 0,
      duration: reduced ? t.duration.instant : t.duration.base,
      ease: t.ease.standardInOut,
    }
  );
}
