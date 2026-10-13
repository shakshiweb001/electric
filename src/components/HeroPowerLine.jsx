import cx from '../lib/cx.js';
import styles from './HeroPowerLine.module.css';

// Decorative line drawing along the bottom of the hero: three poles on a
// ridge, with a two-wire line that draws itself and then carries a repeating
// amber pulse. Pure SVG and CSS, so it runs before any animation library loads.

const WIRE = 'M-40 148 Q 120 190 260 122 Q 480 200 700 96 Q 920 192 1140 110 Q 1320 178 1480 136';
const WIRE_LOW = 'M-40 162 Q 120 204 260 136 Q 480 214 700 110 Q 920 206 1140 124 Q 1320 192 1480 150';

// x, wire height and ground height of each pole. The wires above pass through (x, top).
const POLES = [
  { x: 260, top: 122, base: 215, stay: -1 },
  { x: 700, top: 96, base: 190, stay: 0 },
  { x: 1140, top: 110, base: 205, stay: 1 },
];

export default function HeroPowerLine({ className }) {
  return (
    <svg
      className={cx(styles.svg, className)}
      viewBox="0 60 1440 200"
      preserveAspectRatio="xMidYMax slice"
      aria-hidden="true"
      focusable="false"
    >
      <path
        className={styles.hillBack}
        d="M0 196 C 170 150 320 172 480 150 C 660 126 800 162 960 140 C 1120 120 1290 150 1440 126 L1440 320 L0 320 Z"
      />

      <path className={styles.wireLow} d={WIRE_LOW} pathLength="1" />
      <path className={styles.wire} d={WIRE} pathLength="1" />
      <path className={styles.pulseGlow} d={WIRE} pathLength="1" />
      <path className={styles.pulse} d={WIRE} pathLength="1" />

      {POLES.map((pole, index) => (
        <g key={pole.x} className={styles.pole} style={{ '--i': index }}>
          {pole.stay !== 0 && (
            <path
              className={styles.stay}
              d={`M${pole.x} ${pole.top + 22} L${pole.x + pole.stay * 50} ${pole.base + 14}`}
            />
          )}
          <path d={`M${pole.x} ${pole.top - 8} V${pole.base + 12}`} />
          <path
            className={styles.fitting}
            d={`M${pole.x - 7} ${pole.top} h14 M${pole.x - 7} ${pole.top + 14} h14`}
          />
        </g>
      ))}

      <path
        className={styles.hillFront}
        d="M0 240 C 120 226 200 212 260 215 C 380 222 520 196 700 190 C 860 186 1000 212 1140 205 C 1260 198 1360 214 1440 222 L1440 320 L0 320 Z"
      />
    </svg>
  );
}
