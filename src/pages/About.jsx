import { useTranslation } from 'react-i18next';
import Seo from '../components/Seo.jsx';
import PageHeader from '../components/PageHeader.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import Reveal from '../components/Reveal.jsx';
import ParallaxPhoto from '../components/ParallaxPhoto.jsx';
import CopyButton from '../components/CopyButton.jsx';
import Placeholder from '../components/Placeholder.jsx';
import CtaBand from '../components/CtaBand.jsx';
import { DocumentIcon } from '../components/Icons.jsx';
import { images } from '../data/images.js';
import { SHOW_PLACEHOLDERS, site } from '../data/site.js';
import styles from './About.module.css';

export default function About() {
  const { t } = useTranslation();
  const pending = t('about.pending.items', { returnObjects: true });

  const registration = [
    { key: 'firm', value: site.name, lang: 'en' },
    { key: 'class', value: t('about.registration.classValue') },
    { key: 'licence', value: site.licenceNo, code: true, copy: true },
    { key: 'gstin', value: site.gstin, code: true, copy: true },
    { key: 'pan', value: site.pan, code: true, copy: true },
    { key: 'address', value: site.address.full, lang: 'en' },
  ];

  return (
    <>
      <Seo page="about" />
      <PageHeader
        image={images.valleyVillage}
        eyebrow={t('about.header.eyebrow')}
        title={t('about.header.title')}
        lede={t('about.header.lede')}
      />

      <section className={styles.intro} aria-labelledby="about-intro-title">
        <div className={`container ${styles.introInner}`}>
          <div className={styles.introText}>
            <SectionHeading
              id="about-intro-title"
              eyebrow={t('about.intro.eyebrow')}
              title={t('about.intro.title')}
            />
            <Reveal className={styles.prose} stagger>
              <p>{t('about.intro.p1')}</p>
              <p>{t('about.intro.p2')}</p>
            </Reveal>
          </div>
          <Reveal>
            <ParallaxPhoto image={images.hillVillage} />
          </Reveal>
        </div>
      </section>

      <section className={styles.registration} aria-labelledby="registration-title">
        <div className={`container ${styles.registrationInner}`}>
          <SectionHeading
            id="registration-title"
            eyebrow={t('about.registration.eyebrow')}
            title={t('about.registration.title')}
          />
          <Reveal as="dl" className={styles.table}>
            {registration.map((row) => (
              <div key={row.key} className={styles.row}>
                <dt>{t(`about.registration.${row.key}`)}</dt>
                <dd>
                  <span className={row.code ? `code ${styles.codeValue}` : undefined} lang={row.lang}>
                    {row.value}
                  </span>
                  {row.copy && <CopyButton value={row.value} label={t(`about.registration.${row.key}`)} />}
                </dd>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Document scans: put the files in /public/documents/ and replace these slots */}
      {SHOW_PLACEHOLDERS && (
        <section className={styles.documents} aria-labelledby="documents-title">
          <div className="container">
            <SectionHeading
              id="documents-title"
              eyebrow={t('about.documents.eyebrow')}
              title={t('about.documents.title')}
              lede={t('about.documents.lede')}
            />
            <Reveal as="ul" className={styles.docList} stagger>
              {['licence', 'gst'].map((key) => (
                <li key={key}>
                  <Placeholder className={styles.doc}>
                    <DocumentIcon className={styles.docIcon} />
                    {t(`about.documents.${key}`)}
                    <span className={styles.docSlot}>{t('about.documents.slot')}</span>
                  </Placeholder>
                </li>
              ))}
            </Reveal>
          </div>
        </section>
      )}

      <section className={styles.clients} aria-labelledby="clients-title">
        <div className={`container ${styles.clientsInner}`}>
          <SectionHeading
            id="clients-title"
            tone="dark"
            eyebrow={t('about.clients.eyebrow')}
            title={t('about.clients.title')}
            lede={t('about.clients.body')}
          />
          <Reveal className={styles.clientsSide}>
            <Placeholder tone="dark">{t('about.clients.placeholder')}</Placeholder>
            <Placeholder tone="dark">
              <strong>{t('about.pending.title')}</strong>
              <ul className={styles.pendingList}>
                {pending.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Placeholder>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
