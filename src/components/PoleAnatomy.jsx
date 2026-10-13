import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { loadScrollKit } from '../lib/scrollKit.js';
import cx from '../lib/cx.js';
import styles from './PoleAnatomy.module.css';

// Labelled schematic of an LT pole, showing where each service item sits.
// The linework draws itself as the section scrolls into view (GSAP
// ScrollTrigger, scrubbed), and the list beside it highlights the matching
// callout on hover.
// It is an explanatory diagram, not a construction drawing.

// Callout positions: (x, y) of the numbered marker and the point it refers to.
const CALLOUTS = [
  { id: 1, x: 138, y: 46, to: [196, 60] },
  { id: 2, x: 288, y: 50, to: [229, 78] },
  { id: 3, x: 322, y: 178, to: [300, 139] },
  { id: 4, x: 76, y: 246, to: [127, 295] },
  { id: 5, x: 320, y: 392, to: [294, 441] },
  { id: 6, x: 116, y: 374, to: [184, 408] },
  { id: 7, x: 270, y: 264, to: [207, 264] },
];
const MARKER_RADIUS = 14;

// Leader line from the edge of a marker to its target.
function leader({ x, y, to }) {
  const dx = to[0] - x;
  const dy = to[1] - y;
  const length = Math.hypot(dx, dy);
  const startX = x + (dx / length) * MARKER_RADIUS;
  const startY = y + (dy / length) * MARKER_RADIUS;
  return `M${startX.toFixed(1)} ${startY.toFixed(1)} L${to[0]} ${to[1]}`;
}

const HATCH = Array.from({ length: 13 }, (_, i) => `M${24 + i * 26} 420l-10 12`).join('');

export default function PoleAnatomy() {
  const { t } = useTranslation();
  const reduced = useReducedMotion();
  const svgRef = useRef(null);
  const [active, setActive] = useState(null);

  useEffect(() => {
    if (reduced) return undefined;
    const svg = svgRef.current;
    if (!svg) return undefined;

    let ctx;
    let cancelled = false;

    loadScrollKit().then(({ gsap }) => {
      if (cancelled || !svg.isConnected) return;
      if (svg.getBoundingClientRect().top < window.innerHeight * 0.85) return;

      ctx = gsap.context(() => {
        const timeline = gsap.timeline({
          scrollTrigger: { trigger: svg, start: 'top 82%', end: 'bottom 72%', scrub: 0.6 },
        });
        timeline
          .fromTo(
            svg.querySelectorAll('[data-draw]'),
            { strokeDashoffset: 1 },
            { strokeDashoffset: 0, ease: 'none', duration: 1, stagger: 0.14 }
          )
          .fromTo(
            svg.querySelectorAll('[data-fade]'),
            { autoAlpha: 0 },
            { autoAlpha: 1, ease: 'none', duration: 0.5, stagger: 0.1 },
            0.7
          );
      }, svg);
    });

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, [reduced]);

  return (
    <div className={styles.wrap}>
      <figure className={styles.figure}>
        <svg ref={svgRef} className={styles.svg} viewBox="0 0 360 520" role="img" aria-label={t('services.anatomy.label')}>
          {/* Ground */}
          <path className={styles.ground} d="M8 420H352" />
          <path className={styles.hatch} d={HATCH} />
          <text className={styles.groundLabel} x="12" y="409">
            {t('services.anatomy.ground')}
          </text>

          {/* Conductors */}
          <path className={styles.conductor} data-draw pathLength="1" d="M-6 100 Q110 113 222 79 Q300 106 366 96" />
          <path className={styles.conductor} data-draw pathLength="1" d="M-6 140 Q110 153 222 119 Q300 146 366 136" />

          {/* Stay wire, rod and anchor plate */}
          <path className={styles.stay} data-draw pathLength="1" d="M195 142 L72 420" />
          <path className={styles.buried} d="M72 420 L56 458 M44 462 h24" />
          <circle className={styles.stayInsulator} data-fade cx="133.5" cy="281" r="4.5" />

          {/* Pole */}
          <path className={styles.pole} data-draw pathLength="1" d="M195 420 V52 h10 V420" />
          <path className={styles.buried} d="M195 420 v50 h10 v-50" />

          {/* D-iron brackets with shackle insulators */}
          {[70, 110].map((y) => (
            <g key={y}>
              <path className={styles.bracket} data-draw pathLength="1" d={`M205 ${y} h15 a9 9 0 0 1 0 18 h-15`} />
              <rect className={styles.insulator} data-fade x="213" y={y + 2} width="10" height="14" rx="3.5" />
            </g>
          ))}

          {/* RCC muff */}
          <rect className={styles.muff} data-fade x="184" y="392" width="32" height="42" rx="2" />

          {/* Earthing: GI wire down the pole to an earth electrode */}
          <path className={styles.earthWire} data-draw pathLength="1" d="M208 150 V446 H294 V466" />
          <path className={styles.earthSymbol} data-fade d="M282 468 h24 M286 475 h16 M290 482 h8" />

          {/* Numbered callouts */}
          {CALLOUTS.map((callout) => (
            <g key={callout.id} data-fade className={cx(styles.callout, active === callout.id && styles.calloutActive)}>
              <path className={styles.leader} d={leader(callout)} />
              <circle className={styles.marker} cx={callout.x} cy={callout.y} r={MARKER_RADIUS} />
              <text className={styles.markerText} x={callout.x} y={callout.y} aria-hidden="true">
                {callout.id}
              </text>
            </g>
          ))}
        </svg>
        <figcaption className={styles.note}>{t('services.anatomy.note')}</figcaption>
      </figure>

      <ol className={styles.list}>
        {CALLOUTS.map(({ id }) => (
          <li
            key={id}
            className={cx(styles.item, active === id && styles.itemActive)}
            onMouseEnter={() => setActive(id)}
            onMouseLeave={() => setActive(null)}
          >
            <span className={styles.number} aria-hidden="true">
              {id}
            </span>
            <span className={styles.text}>
              <strong>{t(`services.anatomy.parts.${id}.t`)}</strong>
              <span>{t(`services.anatomy.parts.${id}.d`)}</span>
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}
