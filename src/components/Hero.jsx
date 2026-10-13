import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import SmartImage from './SmartImage.jsx';
import HeroPowerLine from './HeroPowerLine.jsx';
import PhotoTag from './PhotoTag.jsx';
import Button from './Button.jsx';
import { ArrowRightIcon, WhatsAppIcon } from './Icons.jsx';
import { images } from '../data/images.js';
import { HERO_PICTURE } from '../data/picture.js';
import { whatsappLink } from '../lib/whatsapp.js';
import useParallax from '../hooks/useParallax.js';
import styles from './Hero.module.css';

// When the page was opened on the home route, index.html already showed a static
// copy of this hero and started its reveal animation. window.__heroShellStart
// is the time it appeared; the live hero shifts its own animations back by the
// time elapsed since then, so the reveal carries on instead of restarting.
let shellStart = typeof window !== 'undefined' ? window.__heroShellStart : undefined;

function useIntroShift() {
  const [shift] = useState(() => (shellStart == null ? 0 : -Math.round(performance.now() - shellStart)));
  useEffect(() => {
    shellStart = undefined;
  }, []);
  return shift;
}

// Full-screen home hero.
//  - photo with a slow Ken Burns zoom (CSS) and scroll parallax (GSAP)
//  - headline revealed line by line from behind a mask (CSS)
//  - SVG power line that draws itself and carries an amber pulse
// The photo, crop, overlay and text markup match the static shell that vite-plugin-site.js
// writes into index.html, so the page does not flash when the app starts.
export default function Hero() {
  const { t } = useTranslation();
  const sectionRef = useRef(null);
  const mediaRef = useRef(null);
  const introShift = useIntroShift();
  useParallax(mediaRef, { triggerRef: sectionRef, from: 0, to: 16, start: 'top top', end: 'bottom top' });

  return (
    <section
      ref={sectionRef}
      className={styles.hero}
      style={{ '--intro-shift': `${introShift}ms` }}
      aria-labelledby="hero-title"
    >
      <div ref={mediaRef} className={styles.media}>
        <SmartImage image={images.hero} picture={HERO_PICTURE} priority fill className={styles.kenBurns} />
      </div>
      <div className={styles.overlay} aria-hidden="true" />
      <HeroPowerLine className={styles.powerLine} />

      <div className="container hero-content">
        <p className="eyebrow hero-eyebrow">
          <span>{t('home.hero.eyebrow')}</span>
          <span className="code hero-licence">{t('brand.licence')}</span>
        </p>

        <h1 id="hero-title" className="hero-title">
          {[1, 2, 3].map((n) => (
            <span key={n} className="hero-line">
              <span style={{ '--i': n - 1 }}>
                {t(`home.hero.line${n}`)}
              </span>
            </span>
          ))}
        </h1>

        <p className="hero-lede">{t('home.hero.lede')}</p>

        <div className={`hero-actions ${styles.actions}`}>
          <Button
            href={whatsappLink(t('common.waGreeting'))}
            external
            variant="primary"
            iconStart={<WhatsAppIcon />}
          >
            {t('common.whatsappUs')}
          </Button>
          <Button to="/services" variant="light" iconEnd={<ArrowRightIcon />}>
            {t('common.allServices')}
          </Button>
        </div>
      </div>

      <PhotoTag image={images.hero} className={styles.photoTag} />
    </section>
  );
}
