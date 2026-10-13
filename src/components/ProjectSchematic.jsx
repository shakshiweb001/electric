import { useRef } from 'react';
import { useInView } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import cx from '../lib/cx.js';
import styles from './ProjectSchematic.module.css';

// Schematic of the featured project: the 25 KVA sub-station, the three poles
// that were erected, and the left-out houses at the end of the line. When it
// scrolls into view the line draws itself, a pulse starts to travel along it
// and the house windows light up.
// It is a diagram, not a survey: positions and distances are not to scale.

const WIRE = 'M60 58 Q125 82 190 46 Q245 72 300 46 Q355 72 410 46 Q452 68 489 99';
const POLES = [190, 300, 410];

export default function ProjectSchematic({ className }) {
  const { t } = useTranslation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const key = 'home.project.schematic';

  return (
    <figure ref={ref} className={cx(styles.figure, inView && styles.live, className)}>
      <svg className={styles.svg} viewBox="0 0 560 150" role="img" aria-label={t(`${key}.label`)}>
        <path className={styles.ground} d="M6 140H554" />

        <g className={styles.part}>
          <path d="M46 140V54M74 140V54M40 64h40" />
          <rect className={styles.transformer} x="50" y="82" width="20" height="26" rx="2" />
          <path className={styles.fins} d="M55 88v14M60 88v14M65 88v14" />
        </g>

        {POLES.map((x, index) => (
          <g key={x} className={styles.part} style={{ '--i': index + 1 }}>
            <path d={`M${x} 140V40M${x - 7} 46h14`} />
          </g>
        ))}

        <g className={styles.part} style={{ '--i': 4 }}>
          <path d="M474 140v-28l15-13 15 13v28zM510 140v-21l12-10 12 10v21z" />
          <rect className={styles.window} x="483" y="118" width="12" height="10" />
          <rect className={styles.window} x="517" y="124" width="10" height="8" />
        </g>

        <path className={styles.wire} d={WIRE} pathLength="1" />
        <path className={styles.pulseGlow} d={WIRE} pathLength="1" />
        <path className={styles.pulse} d={WIRE} pathLength="1" />
      </svg>

      <figcaption className={styles.caption}>
        <span className={styles.labels}>
          <span>
            <strong>{t(`${key}.substation`)}</strong>
            <span lang="en">{t(`${key}.substationName`)}</span>
          </span>
          <span>
            <strong>{t(`${key}.poles`)}</strong>
          </span>
          <span>
            <strong>{t(`${key}.houses`)}</strong>
          </span>
        </span>
        <span className={styles.note}>{t('common.schematicNote')}</span>
      </figcaption>
    </figure>
  );
}
