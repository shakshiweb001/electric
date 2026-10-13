import { useMemo, useState } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Seo from '../components/Seo.jsx';
import PageHeader from '../components/PageHeader.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import Reveal from '../components/Reveal.jsx';
import SmartImage from '../components/SmartImage.jsx';
import ProjectSchematic from '../components/ProjectSchematic.jsx';
import Lightbox from '../components/Lightbox.jsx';
import Placeholder from '../components/Placeholder.jsx';
import CtaBand from '../components/CtaBand.jsx';
import { CameraIcon, ZoomInIcon } from '../components/Icons.jsx';
import { altFor, images } from '../data/images.js';
import { featuredProject, gallery, galleryCategories } from '../data/projects.js';
import { TILE_PICTURE } from '../data/picture.js';
import { buildSrcSet, imageUrl } from '../lib/imageUrl.js';
import cx from '../lib/cx.js';
import styles from './Projects.module.css';

const FILTERS = ['all', ...galleryCategories];
const LIGHTBOX_WIDTHS = [800, 1200, 1600, 2400];

// The photo behind a gallery entry: a stock image from images.js, the firm's
// own site photo, or null while a site photo has not been supplied.
function photoOf(entry) {
  if (entry.type === 'stock') return images[entry.image];
  return entry.src ? entry : null;
}

function lightboxItem(entry, lang) {
  const photo = photoOf(entry);
  if (entry.type === 'stock') {
    return {
      id: entry.id,
      src: imageUrl(photo, { w: 1600 }),
      srcSet: buildSrcSet(photo, { widths: LIGHTBOX_WIDTHS, fm: 'webp' }),
      width: 1600,
      height: Math.round((1600 * photo.height) / photo.width),
      alt: altFor(photo, lang),
      color: photo.color,
      stock: true,
      credit: photo.credit,
    };
  }
  return {
    id: entry.id,
    src: photo.src,
    width: photo.width,
    height: photo.height,
    alt: altFor(photo, lang),
    stock: false,
  };
}

export default function Projects() {
  const { t, i18n } = useTranslation();
  const [filter, setFilter] = useState('all');
  const [openId, setOpenId] = useState(null);

  const visible = useMemo(
    () => (filter === 'all' ? gallery : gallery.filter((entry) => entry.category === filter)),
    [filter]
  );
  const lightboxItems = useMemo(
    () => visible.filter(photoOf).map((entry) => lightboxItem(entry, i18n.language)),
    [visible, i18n.language]
  );
  const openIndex = lightboxItems.findIndex((item) => item.id === openId);

  const countFor = (category) =>
    category === 'all' ? gallery.length : gallery.filter((entry) => entry.category === category).length;
  const labelFor = (category) =>
    category === 'all' ? t('projects.gallery.all') : t(`projects.gallery.categories.${category}`);

  const details = ['year', 'type', 'substation', 'section', 'subdivision'];

  return (
    <>
      <Seo page="projects" />
      <PageHeader
        image={images.polesPine}
        eyebrow={t('projects.header.eyebrow')}
        title={t('projects.header.title')}
        lede={t('projects.header.lede')}
      />

      {/* Featured project: every figure here was supplied by the client */}
      <section className={styles.featured} aria-labelledby="featured-title">
        <div className="container">
          <Reveal className={styles.featuredHead}>
            <p className={`eyebrow ${styles.eyebrow}`}>{t('projects.featured.eyebrow')}</p>
            <h2 id="featured-title" className={styles.featuredTitle}>
              {t('projects.featured.title')}
            </h2>
          </Reveal>

          <div className={styles.featuredGrid}>
            <Reveal className={styles.panel}>
              <h3 className={styles.panelTitle}>{t('projects.featured.detailsTitle')}</h3>
              <dl className={styles.rows}>
                {details.map((key) => (
                  <div key={key}>
                    <dt>{t(`projects.featured.${key}`)}</dt>
                    <dd>{t(`projects.featured.${key}Value`)}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal className={styles.panel}>
              <h3 className={styles.panelTitle}>{t('projects.featured.scopeTitle')}</h3>
              <dl className={cx(styles.rows, styles.quantities)}>
                {featuredProject.stats.map((stat) => (
                  <div key={stat.key}>
                    <dt>{t(`home.project.stats.${stat.key}`)}</dt>
                    <dd>
                      <span className={styles.quantity}>{stat.value.toFixed(stat.decimals)}</span>{' '}
                      {t(`home.project.units.${stat.unit}`)}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal className={styles.schematic}>
              <ProjectSchematic />
            </Reveal>
          </div>

          {/* Upload-ready photo slots for this project (see src/data/projects.js) */}
          <Reveal className={styles.slots}>
            <div className={styles.slotsText}>
              <h3 className={styles.panelTitle}>{t('projects.photos.title')}</h3>
              <p>{t('projects.photos.body')}</p>
            </div>
            <ul className={styles.slotList}>
              {[1, 2, 3].map((n) => (
                <li key={n} className={styles.slot}>
                  <CameraIcon />
                  <span>{t('projects.photos.slot', { n })}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Filterable gallery */}
      <section className={styles.gallery} aria-labelledby="gallery-title">
        <div className="container">
          <SectionHeading
            id="gallery-title"
            eyebrow={t('projects.gallery.eyebrow')}
            title={t('projects.gallery.title')}
            lede={t('projects.gallery.lede')}
          />

          <div className={styles.filters} role="group" aria-label={t('projects.gallery.filterLabel')}>
            {FILTERS.map((category) => {
              const selected = filter === category;
              return (
                <button
                  key={category}
                  type="button"
                  className={cx(styles.filter, selected && styles.filterOn)}
                  aria-pressed={selected}
                  onClick={() => setFilter(category)}
                >
                  {selected && (
                    <m.span
                      layoutId="filter-pill"
                      className={styles.pill}
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className={styles.filterLabel}>{labelFor(category)}</span>
                  <span className={styles.filterCount}>{countFor(category)}</span>
                </button>
              );
            })}
          </div>
          <p className="sr-only" aria-live="polite">
            {t('projects.gallery.count', { count: visible.length })}
          </p>

          <ul className={styles.grid}>
            <AnimatePresence mode="popLayout" initial={false}>
              {visible.map((entry) => {
                const photo = photoOf(entry);
                const alt = photo ? altFor(photo, i18n.language) : '';
                return (
                  <m.li
                    key={entry.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{
                      layout: { type: 'spring', stiffness: 320, damping: 34 },
                      opacity: { duration: 0.25 },
                      scale: { duration: 0.3 },
                    }}
                  >
                    {photo ? (
                      <button
                        type="button"
                        className={styles.tile}
                        onClick={() => setOpenId(entry.id)}
                        aria-label={t('projects.gallery.open', { alt })}
                      >
                        <span className={styles.thumb}>
                          <SmartImage image={photo} picture={TILE_PICTURE} alt="" fill className={styles.thumbImage} />
                        </span>
                        {entry.type === 'site' && (
                          <span className={cx(styles.badge, styles.badgeSite)}>{t('projects.gallery.siteTag')}</span>
                        )}
                        <span className={styles.tileFoot}>
                          <span>{labelFor(entry.category)}</span>
                          <ZoomInIcon />
                        </span>
                      </button>
                    ) : (
                      <div className={styles.soon}>
                        <CameraIcon />
                        <strong>{t('projects.gallery.comingSoon')}</strong>
                        <span>{labelFor(entry.category)}</span>
                        <span className={cx(styles.badge, styles.badgeSite)}>{t('projects.gallery.siteTag')}</span>
                      </div>
                    )}
                  </m.li>
                );
              })}
            </AnimatePresence>
          </ul>

          <Placeholder className={styles.more}>
            <strong>{t('projects.more.title')}:</strong> {t('projects.more.placeholder')}
          </Placeholder>
        </div>
      </section>

      <CtaBand />

      <AnimatePresence>
        {openIndex >= 0 && (
          <Lightbox
            key="lightbox"
            items={lightboxItems}
            index={openIndex}
            onNavigate={(next) => setOpenId(lightboxItems[next].id)}
            onClose={() => setOpenId(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
