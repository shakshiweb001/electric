import { useEffect } from 'react';
import { useReducedMotion } from 'framer-motion';
import { loadScrollKit } from '../lib/scrollKit.js';

// Moves "targetRef" vertically as "triggerRef" scrolls through the viewport
// (GSAP ScrollTrigger, scrubbed). from / to are percentages of the target's height.
export default function useParallax(
  targetRef,
  { triggerRef, from = -8, to = 8, start = 'top bottom', end = 'bottom top' } = {}
) {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return undefined;
    const target = targetRef.current;
    if (!target) return undefined;

    let ctx;
    let cancelled = false;

    loadScrollKit().then(({ gsap }) => {
      if (cancelled || !target.isConnected) return;
      ctx = gsap.context(() => {
        gsap.fromTo(
          target,
          { yPercent: from },
          {
            yPercent: to,
            ease: 'none',
            scrollTrigger: {
              trigger: triggerRef?.current || target.parentElement,
              start,
              end,
              scrub: true,
            },
          }
        );
      });
    });

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, [reduced, targetRef, triggerRef, from, to, start, end]);
}
