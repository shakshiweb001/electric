import { useRef } from 'react';
import SmartImage from './SmartImage.jsx';
import PhotoTag from './PhotoTag.jsx';
import { PAGE_HEADER_PICTURE } from '../data/picture.js';
import useParallax from '../hooks/useParallax.js';
import styles from './PageHeader.module.css';

// Dark banner at the top of the inner pages, with a parallax photo.
export default function PageHeader({ image, eyebrow, title, lede }) {
  const sectionRef = useRef(null);
  const mediaRef = useRef(null);
  useParallax(mediaRef, { triggerRef: sectionRef, from: 0, to: 18, start: 'top top', end: 'bottom top' });

  return (
    <section ref={sectionRef} className={styles.header} aria-labelledby="page-title">
      <div ref={mediaRef} className={styles.media}>
        <SmartImage image={image} picture={PAGE_HEADER_PICTURE} priority fill />
      </div>
      <div className={styles.overlay} aria-hidden="true" />

      <div className={`container ${styles.content}`}>
        <p className={`eyebrow ${styles.eyebrow}`}>{eyebrow}</p>
        <h1 id="page-title" className={styles.title}>
          <span className={styles.mask}>
            <span className={styles.maskInner}>{title}</span>
          </span>
        </h1>
        {lede && <p className={styles.lede}>{lede}</p>}
      </div>

      <PhotoTag image={image} className={styles.photoTag} />
    </section>
  );
}
