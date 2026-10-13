import { useEffect, useRef } from 'react';
import { m, useReducedMotion } from 'framer-motion';
import styles from './PageTransition.module.css';

const EASE = [0.76, 0, 0.24, 1];

// Leaving: two panels rise from the bottom and cover the page.
const cover = (delay) => ({
  initial: { scaleY: 0 },
  enter: { scaleY: 0, transition: { duration: 0 } },
  exit: { scaleY: 1, transition: { duration: 0.45, ease: EASE, delay } },
});

// Arriving: the same two panels lift away through the top.
const reveal = (delay) => ({
  initial: { scaleY: 1 },
  enter: { scaleY: 0, transition: { duration: 0.55, ease: EASE, delay } },
  exit: { scaleY: 0, transition: { duration: 0 } },
});

const fade = {
  initial: { opacity: 0 },
  enter: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};

// Wraps each routed page. An amber-edged steel curtain sweeps up between
// routes; with reduced motion it becomes a short cross-fade.
export default function PageTransition({ focusOnMount, children }) {
  const reduced = useReducedMotion();
  const mainRef = useRef(null);

  // After a navigation, move keyboard and screen-reader focus to the new page.
  useEffect(() => {
    if (focusOnMount) mainRef.current?.focus({ preventScroll: true });
  }, [focusOnMount]);

  return (
    <m.div initial="initial" animate="enter" exit="exit" variants={reduced ? fade : undefined}>
      <main id="main" ref={mainRef} tabIndex={-1}>
        {children}
      </main>
      {!reduced && (
        <>
          <m.div className={`${styles.panel} ${styles.amber} ${styles.fromBottom}`} variants={cover(0)} aria-hidden="true" />
          <m.div className={`${styles.panel} ${styles.fromBottom}`} variants={cover(0.08)} aria-hidden="true" />
          <m.div className={`${styles.panel} ${styles.amber} ${styles.fromTop}`} variants={reveal(0.12)} aria-hidden="true" />
          <m.div className={`${styles.panel} ${styles.fromTop}`} variants={reveal(0.02)} aria-hidden="true" />
        </>
      )}
    </m.div>
  );
}
