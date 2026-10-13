import { startTransition, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Seo from '../components/Seo.jsx';
import Hero from '../components/Hero.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import Reveal from '../components/Reveal.jsx';
import ServiceCard from '../components/ServiceCard.jsx';
import Counter from '../components/Counter.jsx';
import ProjectSchematic from '../components/ProjectSchematic.jsx';
import ParallaxPhoto from '../components/ParallaxPhoto.jsx';
import CtaBand from '../components/CtaBand.jsx';
import Button from '../components/Button.jsx';
import { ArrowRightIcon, MapPinIcon, WhatsAppIcon } from '../components/Icons.jsx';
import { services } from '../data/services.js';
import { featuredProject } from '../data/projects.js';
import { images } from '../data/images.js';
import { site } from '../data/site.js';
import { whatsappLink } from '../lib/whatsapp.js';
import styles from './Home.module.css';

// The hero paints first. Everything below the fold is rendered straight
// afterwards as a low-priority update, which React splits into small slices,
// so the first screen appears sooner and the page stays responsive.
export default function Home() {
  const [showRest, setShowRest] = useState(false);

  useEffect(() => {
    startTransition(() => setShowRest(true));
  }, []);

  return (
    <>
      <Seo page="home" />
      <Hero />
      {showRest && <BelowTheFold />}
    </>
  );
}

function BelowTheFold() {
  const { t } = useTranslation();

  return (
    <>
      {/* Registration details, straight under the hero */}
      <section className={styles.facts} aria-labelledby="facts-title">
        <div className="container">
          <h2 id="facts-title" className="sr-only">
            {t('home.facts.title')}
          </h2>
          <Reveal as="dl" className={styles.factList} stagger>
            <div className={styles.fact}>
              <dt>{t('home.facts.class')}</dt>
              <dd>{t('home.facts.classValue')}</dd>
            </div>
            <div className={styles.fact}>
              <dt>{t('home.facts.licence')}</dt>
              <dd className="code">{site.licenceNo}</dd>
            </div>
            <div className={styles.fact}>
              <dt>{t('home.facts.gstin')}</dt>
              <dd className="code">{site.gstin}</dd>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Services */}
      <section className={styles.services} aria-labelledby="home-services-title">
        <div className="container">
          <div className={styles.servicesHead}>
            <SectionHeading
              id="home-services-title"
              eyebrow={t('home.services.eyebrow')}
              title={t('home.services.title')}
              lede={t('home.services.lede')}
            />
            <Button to="/services" variant="dark" iconEnd={<ArrowRightIcon />}>
              {t('common.allServices')}
            </Button>
          </div>

          <Reveal as="ul" className={styles.serviceGrid} stagger>
            {services.map((service, index) => (
              <li key={service.id}>
                <ServiceCard service={service} index={index} />
              </li>
            ))}
            <li>
              <div className={styles.ask}>
                <h3 className={styles.askTitle}>{t('home.services.askTitle')}</h3>
                <p className={styles.askBody}>{t('home.services.askBody')}</p>
                <Button
                  href={whatsappLink(t('common.waGreeting'))}
                  external
                  variant="primary"
                  iconStart={<WhatsAppIcon />}
                  className={styles.askButton}
                >
                  {t('common.whatsappUs')}
                </Button>
              </div>
            </li>
          </Reveal>
        </div>
      </section>

      {/* Featured project, with counters for its real quantities */}
      <section className={styles.project} aria-labelledby="home-project-title">
        <div className={`container ${styles.projectInner}`}>
          <div className={styles.projectIntro}>
            <SectionHeading
              id="home-project-title"
              tone="dark"
              eyebrow={t('home.project.eyebrow')}
              title={t('home.project.title')}
              lede={t('home.project.body')}
            />
            <Button to="/projects" variant="light" iconEnd={<ArrowRightIcon />}>
              {t('home.project.cta')}
            </Button>
          </div>

          <Reveal className={styles.schematic}>
            <ProjectSchematic />
          </Reveal>

          <Reveal as="dl" className={styles.stats} stagger>
            {featuredProject.stats.map((stat) => (
              <div key={stat.key} className={styles.stat}>
                <dt>{t(`home.project.stats.${stat.key}`)}</dt>
                <dd>
                  <Counter value={stat.value} decimals={stat.decimals} className={styles.statNumber} />
                  <span className={styles.statUnit}>{t(`home.project.units.${stat.unit}`)}</span>
                </dd>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Where the firm is based */}
      <section className={styles.region} aria-labelledby="home-region-title">
        <div className={`container ${styles.regionInner}`}>
          <div className={styles.regionText}>
            <SectionHeading
              id="home-region-title"
              eyebrow={t('home.region.eyebrow')}
              title={t('home.region.title')}
              lede={t('home.region.body')}
            />
            <Reveal className={styles.address}>
              <MapPinIcon />
              <div>
                <p className={styles.addressLabel}>{t('home.region.addressLabel')}</p>
                <address lang="en">
                  {site.address.line1},<br />
                  {site.address.line2}
                </address>
              </div>
            </Reveal>
            <Button to="/about" variant="dark" iconEnd={<ArrowRightIcon />}>
              {t('home.region.cta')}
            </Button>
          </div>
          <Reveal>
            <ParallaxPhoto image={images.hillsGreen} />
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
