import { useTranslation } from 'react-i18next';
import Seo from '../components/Seo.jsx';
import PageHeader from '../components/PageHeader.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import Reveal from '../components/Reveal.jsx';
import ServiceCard from '../components/ServiceCard.jsx';
import PoleAnatomy from '../components/PoleAnatomy.jsx';
import ParallaxPhoto from '../components/ParallaxPhoto.jsx';
import CtaBand from '../components/CtaBand.jsx';
import Button from '../components/Button.jsx';
import { ArrowRightIcon } from '../components/Icons.jsx';
import { services } from '../data/services.js';
import { images } from '../data/images.js';
import styles from './Services.module.css';

export default function Services() {
  const { t } = useTranslation();

  return (
    <>
      <Seo page="services" />
      <PageHeader
        image={images.pylonHills}
        eyebrow={t('services.header.eyebrow')}
        title={t('services.header.title')}
        lede={t('services.header.lede')}
      />

      <section className={styles.list} aria-labelledby="services-list-title">
        <div className="container">
          <SectionHeading
            id="services-list-title"
            eyebrow={t('services.list.eyebrow')}
            title={t('services.list.title')}
            lede={t('services.list.lede')}
            className={styles.heading}
          />
          <Reveal as="ul" className={styles.grid} stagger>
            {services.map((service, index) => (
              <li key={service.id}>
                <ServiceCard service={service} index={index} />
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      <section className={styles.anatomy} aria-labelledby="anatomy-title">
        <div className="container">
          <SectionHeading
            id="anatomy-title"
            tone="dark"
            eyebrow={t('services.anatomy.eyebrow')}
            title={t('services.anatomy.title')}
            lede={t('services.anatomy.lede')}
            className={styles.heading}
          />
          <PoleAnatomy />
        </div>
      </section>

      <section className={styles.site} aria-labelledby="site-title">
        <div className={`container ${styles.siteInner}`}>
          <Reveal>
            <ParallaxPhoto image={images.linemanClose} />
          </Reveal>
          <div className={styles.siteText}>
            <SectionHeading
              id="site-title"
              eyebrow={t('services.site.eyebrow')}
              title={t('services.site.title')}
              lede={t('services.site.body')}
            />
            <Button to="/contact" variant="dark" iconEnd={<ArrowRightIcon />}>
              {t('common.contactUs')}
            </Button>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
