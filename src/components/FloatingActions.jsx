import { useTranslation } from 'react-i18next';
import { PhoneIcon, WhatsAppIcon } from './Icons.jsx';
import { site, telHref } from '../data/site.js';
import { whatsappLink } from '../lib/whatsapp.js';
import styles from './FloatingActions.module.css';

// Always-reachable contact actions:
//  - tablet and desktop: a floating WhatsApp button with a gentle pulse
//  - phones: a bottom bar with Call and WhatsApp
export default function FloatingActions() {
  const { t } = useTranslation();
  const whatsapp = whatsappLink(t('common.waGreeting'));

  return (
    <>
      <a
        className={styles.fab}
        href={whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t('common.whatsappChat')}
      >
        <span className={styles.pulse} aria-hidden="true" />
        <WhatsAppIcon />
      </a>

      <nav className={styles.bar} aria-label={t('common.quickActions')}>
        <a className={styles.barCall} href={telHref(site.phones.primary)}>
          <PhoneIcon />
          {t('common.call')}
        </a>
        <a className={styles.barWhatsapp} href={whatsapp} target="_blank" rel="noopener noreferrer">
          <WhatsAppIcon />
          {t('common.whatsapp')}
        </a>
      </nav>
    </>
  );
}
