import { useEffect, useMemo, useRef, useState } from 'react';
import { animate, useInView, useReducedMotion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

// Counts up from zero to "value" the first time it scrolls into view.
// Only ever used with real quantities from the featured project.
export default function Counter({ value, decimals = 0, duration = 1.8, className }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduced = useReducedMotion();
  const { i18n } = useTranslation();
  const [shown, setShown] = useState(reduced ? value : 0);

  const format = useMemo(() => {
    const formatter = new Intl.NumberFormat(i18n.language === 'hi' ? 'hi-IN' : 'en-IN', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
    return (number) => formatter.format(number);
  }, [i18n.language, decimals]);

  useEffect(() => {
    if (!inView) return undefined;
    if (reduced) {
      setShown(value);
      return undefined;
    }
    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: setShown,
    });
    return () => controls.stop();
  }, [inView, reduced, value, duration]);

  return (
    <span ref={ref} className={className}>
      {/* Screen readers get the final figure, not every frame of the count. */}
      <span className="sr-only">{format(value)}</span>
      <span aria-hidden="true">{format(shown)}</span>
    </span>
  );
}
