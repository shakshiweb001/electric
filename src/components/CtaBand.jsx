import { useTranslation } from 'react-i18next';
import ParallaxBand from './ParallaxBand.jsx';
import Reveal from './Reveal.jsx';
import Button from './Button.jsx';
import { PhoneIcon, WhatsAppIcon } from './Icons.jsx';
import { images } from '../data/images.js';
import { formatPhone, site, telHref } from '../data/site.js';
import { whatsappLink } from '../lib/whatsapp.js';
import styles from './CtaBand.module.css';

// Closing call-to-action shown at the end of every page.
export default function CtaBand() {
  const { t } = useTranslation();
  const { primary, alternate } = site.phones;

  return (
    <ParallaxBand image={images.duskLine} aria-labelledby="cta-title">
      <Reveal className={`container ${styles.inner}`} stagger>
        <p className={`eyebrow ${styles.eyebrow}`}>{t('cta.eyebrow')}</p>
        <h2 id="cta-title" className={styles.title}>
          {t('cta.title')}
        </h2>
        <p className={styles.body}>{t('cta.body')}</p>
        <div className={styles.actions}>
          <Button href={telHref(primary)} variant="primary" iconStart={<PhoneIcon />}>
            <span className="sr-only">{t('common.call')} </span>
            <span className="code">{formatPhone(primary)}</span>
          </Button>
          <Button href={whatsappLink(t('common.waGreeting'))} external variant="light" iconStart={<WhatsAppIcon />}>
            {t('common.whatsappUs')}
          </Button>
        </div>
        <p className={styles.alt}>
          {t('common.alternate')}:{' '}
          <a className="code" href={telHref(alternate)}>
            {formatPhone(alternate)}
          </a>
        </p>
      </Reveal>
    </ParallaxBand>
  );
}
