import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { altFor } from '../data/images.js';
import { fallbackSrc, isRemoteImage, lqipUrl, pictureSources } from '../lib/imageUrl.js';
import cx from '../lib/cx.js';
import styles from './SmartImage.module.css';

// Responsive photo from images.js.
//  - AVIF and WebP sources with srcset, JPEG fallback
//  - width / height always set, so nothing shifts while it loads
//  - lazy-loaded with a blurred low-res placeholder, unless "priority" is set
//  - "fill" makes it cover its positioned parent (backgrounds)
// "picture" is one of the presets in src/data/picture.js.
export default function SmartImage({ image, picture, alt, priority = false, fill = false, className }) {
  const { i18n } = useTranslation();
  const imgRef = useRef(null);
  const [loaded, setLoaded] = useState(priority);

  // The load event can fire before React attaches the handler (cached images).
  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth > 0) setLoaded(true);
  }, []);

  const remote = isRemoteImage(image);
  const sources = remote ? pictureSources(image, picture) : [];
  const fallback = remote
    ? fallbackSrc(image, picture)
    : { src: image.src, width: image.width, height: image.height };
  const lqip = remote && !priority ? lqipUrl(image, picture.ratio) : null;

  const ratio = remote ? picture.ratio : [image.width, image.height];
  const frameStyle = { backgroundColor: image.color };
  if (!fill) {
    frameStyle['--ar'] = `${ratio[0]} / ${ratio[1]}`;
    if (remote && picture.mobileRatio) {
      frameStyle['--ar-mobile'] = `${picture.mobileRatio[0]} / ${picture.mobileRatio[1]}`;
    }
  }

  return (
    <span className={cx(styles.frame, fill && styles.fill, className)} style={frameStyle}>
      {lqip && <img className={styles.lqip} src={lqip} alt="" aria-hidden="true" loading="lazy" decoding="async" />}
      <picture>
        {sources.map((source) => (
          <source
            key={`${source.media || 'all'}-${source.type}`}
            media={source.media}
            type={source.type}
            srcSet={source.srcSet}
            sizes={source.sizes}
            width={source.width}
            height={source.height}
          />
        ))}
        <img
          ref={imgRef}
          className={cx(styles.img, loaded && styles.loaded)}
          src={fallback.src}
          alt={alt ?? altFor(image, i18n.language)}
          width={fallback.width}
          height={fallback.height}
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
          fetchpriority={priority ? 'high' : undefined}
          onLoad={() => setLoaded(true)}
        />
      </picture>
    </span>
  );
}
