import { useRef } from 'react';
import SmartImage from './SmartImage.jsx';
import { BAND_PICTURE } from '../data/picture.js';
import useParallax from '../hooks/useParallax.js';
import cx from '../lib/cx.js';
import styles from './ParallaxBand.module.css';

// A section with a photo background that drifts as the page scrolls.
// tint: 'steel' | 'pine' sets the colour of the overlay over the photo.
export default function ParallaxBand({ image, tint = 'steel', className, children, ...rest }) {
  const sectionRef = useRef(null);
  const mediaRef = useRef(null);
  useParallax(mediaRef, { triggerRef: sectionRef, from: -9, to: 9 });

  return (
    <section ref={sectionRef} className={cx(styles.band, className)} {...rest}>
      <div ref={mediaRef} className={styles.media}>
        <SmartImage image={image} picture={BAND_PICTURE} fill />
      </div>
      <div className={cx(styles.overlay, styles[tint])} aria-hidden="true" />
      {children}
    </section>
  );
}
