import cx from '../lib/cx.js';
import styles from './ServiceIcon.module.css';

// Line icons for the services. Parts marked draw / rise / spin / turn / tense /
// step / ring animate when an ancestor with [data-hover-root] is hovered or
// focused (see ServiceIcon.module.css).

const ICONS = {
  // Steel tubular pole with cross arm and conductors
  pole: (
    <>
      <g className={styles.rise}>
        <path d="M28 8v38M19 15h18M21 15v-4M35 15v-4" />
      </g>
      <path className={cx(styles.accent, styles.draw)} pathLength="1" d="M3 15c7 4 12 3 18-4" />
      <path className={cx(styles.accent, styles.draw)} pathLength="1" d="M35 11c6 7 11 8 18 4" />
      <path d="M17 46h22" />
      <path className={styles.soft} d="M22 51h12" />
    </>
  ),

  // Existing line extended on to a house
  line: (
    <>
      <path d="M11 17v29M29 13v33M5 46h31" />
      <path className={styles.accent} d="M11 19c5 5 12 4 18-4" />
      <path className={cx(styles.accent, styles.draw)} pathLength="1" d="M29 15c5 8 10 11 15 12" />
      <path d="M39 46V33l6.5-5.5L52 33v13z" />
      <path className={cx(styles.accent, styles.glow)} d="M45.5 37.5v4" />
    </>
  ),

  // Conductor drum paying out
  reel: (
    <>
      <g className={styles.spin}>
        <circle cx="23" cy="30" r="15" />
        <circle cx="23" cy="30" r="5" />
        <path d="M23 15v10M23 35v10M8 30h10M28 30h10" />
      </g>
      <path className={cx(styles.accent, styles.draw)} pathLength="1" d="M23 15c12-1 21-4 30-9" />
      <path d="M10 50h26" />
    </>
  ),

  // Pole held by a stay wire and ground anchor
  stay: (
    <>
      <g className={styles.tense}>
        <path d="M35 8v38M28 14h14" />
      </g>
      <path className={cx(styles.accent, styles.draw)} pathLength="1" d="M35 17 13 45" />
      <circle className={styles.accentFill} cx="24" cy="31" r="2.4" />
      <path d="M7 46h36M13 45v6M9.5 51h7" />
    </>
  ),

  // Earthing symbol
  earth: (
    <>
      <path d="M28 7v24" />
      <path className={cx(styles.step, styles.s1)} d="M13 31h30" />
      <path className={cx(styles.accent, styles.step, styles.s2)} d="M18.5 38.5h19" />
      <path className={cx(styles.accent, styles.step, styles.s3)} d="M24 46h8" />
    </>
  ),

  // RCC muff pipe
  pipe: (
    <g className={styles.bob}>
      <ellipse cx="28" cy="16" rx="15" ry="6.5" />
      <ellipse className={cx(styles.accent, styles.ring)} cx="28" cy="16" rx="8.5" ry="3.5" />
      <path d="M13 16v24c0 3.6 6.7 6.5 15 6.5s15-2.9 15-6.5V16" />
      <path className={styles.soft} d="M13 28c0 3.6 6.7 6.5 15 6.5s15-2.9 15-6.5" />
    </g>
  ),

  // Shackle insulator and a hex nut
  material: (
    <>
      <path d="M20 5v5M20 33v6" />
      <rect x="12" y="10" width="16" height="6.5" rx="3.25" />
      <rect x="9" y="18" width="22" height="7.5" rx="3.75" />
      <rect x="12" y="27" width="16" height="6.5" rx="3.25" />
      <g className={styles.turn}>
        <path className={styles.accent} d="M41 30.5l8.2 4.75v9.5L41 49.5l-8.2-4.75v-9.5z" />
        <circle className={styles.accent} cx="41" cy="40" r="3.4" />
      </g>
    </>
  ),
};

export default function ServiceIcon({ name, className }) {
  return (
    <svg
      className={cx(styles.icon, className)}
      viewBox="0 0 56 56"
      width="56"
      height="56"
      aria-hidden="true"
      focusable="false"
    >
      {ICONS[name]}
    </svg>
  );
}
