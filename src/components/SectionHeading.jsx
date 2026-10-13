import cx from '../lib/cx.js';
import Reveal from './Reveal.jsx';
import styles from './SectionHeading.module.css';

// Eyebrow label, heading and optional intro for a page section.
// tone: 'light' (dark text on a light section) | 'dark' (light text on steel)
export default function SectionHeading({ id, eyebrow, title, lede, tone = 'light', as: Heading = 'h2', className }) {
  return (
    <Reveal className={cx(styles.heading, styles[tone], className)}>
      {eyebrow && <p className={cx('eyebrow', styles.eyebrow)}>{eyebrow}</p>}
      <Heading id={id} className={styles.title}>
        {title}
      </Heading>
      {lede && <p className={styles.lede}>{lede}</p>}
    </Reveal>
  );
}
