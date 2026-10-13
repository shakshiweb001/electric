import { useTranslation } from 'react-i18next';
import Seo from '../components/Seo.jsx';
import PageHeader from '../components/PageHeader.jsx';
import Reveal from '../components/Reveal.jsx';
import ContactForm from '../components/ContactForm.jsx';
import Placeholder from '../components/Placeholder.jsx';
import { ArrowUpRightIcon, MapPinIcon, PhoneIcon, WhatsAppIcon } from '../components/Icons.jsx';
import { images } from '../data/images.js';
import { formatPhone, mapsHref, site, telHref } from '../data/site.js';
import { whatsappLink } from '../lib/whatsapp.js';
import styles from './Contact.module.css';

export default function Contact() {
  const { t } = useTranslation();
  const { primary, alternate } = site.phones;

  return (
    <>
      <Seo page="contact" />
      <PageHeader
        image={images.hillSilhouette}
        eyebrow={t('contact.header.eyebrow')}
        title={t('contact.header.title')}
        lede={t('contact.header.lede')}
      />

      <section className={styles.section}>
        <div className={`container ${styles.inner}`}>
          <Reveal className={styles.details}>
            <h2 id="details-title" className={styles.title}>
              {t('contact.details.title')}
            </h2>

            <ul className={styles.list}>
              <li className={styles.item}>
                <PhoneIcon />
                <div>
                  <p className={styles.label}>{t('contact.details.phone')}</p>
                  <a className={`code ${styles.number}`} href={telHref(primary)}>
                    +91 {formatPhone(primary)}
                  </a>
                  <div className={styles.inline}>
                    <a className={styles.action} href={telHref(primary)}>
                      <PhoneIcon />
                      {t('common.call')}
                    </a>
                    <a
                      className={styles.action}
                      href={whatsappLink(t('common.waGreeting'))}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <WhatsAppIcon />
                      {t('common.whatsapp')}
                    </a>
                  </div>
                </div>
              </li>

              <li className={styles.item}>
                <PhoneIcon />
                <div>
                  <p className={styles.label}>{t('contact.details.alternate')}</p>
                  <a className={`code ${styles.number}`} href={telHref(alternate)}>
                    +91 {formatPhone(alternate)}
                  </a>
                </div>
              </li>

              <li className={styles.item}>
                <MapPinIcon />
                <div>
                  <p className={styles.label}>{t('contact.details.address')}</p>
                  <address className={styles.address} lang="en">
                    {site.name}
                    <br />
                    {site.address.line1},<br />
                    {site.address.line2}
                  </address>
                  <a className={styles.mapLink} href={mapsHref} target="_blank" rel="noopener noreferrer">
                    {t('contact.details.map')}
                    <ArrowUpRightIcon />
                  </a>
                </div>
              </li>
            </ul>

            <div className={styles.placeholders}>
              <Placeholder>
                <strong>{t('contact.details.email')}:</strong> {t('contact.details.emailPlaceholder')}
              </Placeholder>
              <Placeholder>
                <strong>{t('contact.details.hours')}:</strong> {t('contact.details.hoursPlaceholder')}
              </Placeholder>
            </div>
          </Reveal>

          <Reveal className={styles.formCard}>
            <h2 id="form-title" className={styles.title}>
              {t('contact.form.title')}
            </h2>
            <p className={styles.formIntro}>{t('contact.form.intro')}</p>
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
