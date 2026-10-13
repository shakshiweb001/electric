import { useEffect } from 'react';
import { lockScroll, unlockScroll } from '../lib/scrollKit.js';

// Stops the page behind an overlay from scrolling while "active" is true.
export default function useScrollLock(active) {
  useEffect(() => {
    if (!active) return undefined;
    lockScroll();
    return unlockScroll;
  }, [active]);
}
