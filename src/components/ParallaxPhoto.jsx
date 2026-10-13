import { useRef } from 'react';
import SmartImage from './SmartImage.jsx';
import { INLINE_PICTURE } from '../data/picture.js';
import useParallax from '../hooks/useParallax.js';
import cx from '../lib/cx.js';
import styles from './ParallaxPhoto.module.css';

// A framed photo placed beside text. The photo drifts inside its frame as the
// page scrolls.
export default function ParallaxPhoto({ image, picture = INLINE_PICTURE, className }) {
  const frameRef = useRef(null);
  const mediaRef = useRef(null);
  useParallax(mediaRef, { triggerRef: frameRef, from: -6, to: 6 });

  return (
    <figure
      ref={frameRef}
      className={cx(styles.frame, className)}
      style={{ '--ar': `${picture.ratio[0]} / ${picture.ratio[1]}` }}
    >
      <div ref={mediaRef} className={styles.media}>
        <SmartImage image={image} picture={picture} fill />
      </div>
    </figure>
  );
}
