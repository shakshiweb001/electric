import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';
import { loadScrollKit } from '../lib/scrollKit.js';

// Fades content up as it scrolls into view (GSAP ScrollTrigger).
// With "stagger", the direct children animate one after another.
//
// Content is visible by default and is only hidden once GSAP is ready and the
// element is still below the fold, so nothing can get stuck invisible.
export default function Reveal({ as: Tag = 'div', stagger = false, delay = 0, children, ...rest }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return undefined;
    const el = ref.current;
    if (!el) return undefined;

    let ctx;
    let cancelled = false;

    loadScrollKit().then(({ gsap }) => {
      if (cancelled || !el.isConnected) return;
      if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return;

      const targets = stagger ? Array.from(el.children) : el;
      ctx = gsap.context(() => {
        gsap.fromTo(
          targets,
          { autoAlpha: 0, y: 28 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.9,
            delay,
            ease: 'power3.out',
            stagger: stagger ? 0.08 : 0,
            clearProps: 'opacity,visibility,transform',
            scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          }
        );
      });
    });

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, [reduced, stagger, delay]);

  return (
    <Tag ref={ref} {...rest}>
      {children}
    </Tag>
  );
}
