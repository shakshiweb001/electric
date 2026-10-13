import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Logo from './Logo.jsx';
import { ArrowUpIcon } from './Icons.jsx';
import { routes } from '../data/routes.js';
import { formatPhone, mapsHref, site, telHref } from '../data/site.js';
import { whatsappLink } from '../lib/whatsapp.js';
import { scrollToTop } from '../lib/scrollKit.js';
import styles from './Footer.module.css';

export default function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.top}`}>
        <div className={styles.brand}>
          <Link to="/" className={styles.brandLink}>
            <Logo size={44} />
            <span className={styles.brandName} lang="en">
              {site.name}
            </span>
          </Link>
          <p className={styles.tagline}>{t('footer.tagline')}</p>
        </div>

        <nav className={styles.col} aria-label={t('footer.explore')}>
          <h2 className={styles.colTitle}>{t('footer.explore')}</h2>
          <ul className={styles.list}>
            {routes.map((route) => (
              <li key={route.key}>
                <Link to={route.path} className={styles.link}>
                  {t(`nav.${route.key}`)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.col}>
          <h2 className={styles.colTitle}>{t('footer.contact')}</h2>
          <ul className={styles.list}>
            <li>
              <a className={`${styles.link} code`} href={telHref(site.phones.primary)}>
                +91 {formatPhone(site.phones.primary)}
              </a>
            </li>
            <li>
              <a className={`${styles.link} code`} href={telHref(site.phones.alternate)}>
                +91 {formatPhone(site.phones.alternate)}
              </a>{' '}
              <span className={styles.muted}>({t('common.alternate')})</span>
            </li>
            <li>
              <a
                className={styles.link}
                href={whatsappLink(t('common.waGreeting'))}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t('common.whatsapp')}
              </a>
            </li>
            <li>
              <a className={styles.link} href={mapsHref} target="_blank" rel="noopener noreferrer">
                <address className={styles.address} lang="en">
                  {site.address.line1},<br />
                  {site.address.line2}
                </address>
              </a>
            </li>
          </ul>
        </div>

        <div className={styles.col}>
          <h2 className={styles.colTitle}>{t('footer.registration')}</h2>
          <dl className={styles.reg}>
            <div>
              <dt>{t('home.facts.class')}</dt>
              <dd>{t('home.facts.classValue')}</dd>
            </div>
            <div>
              <dt>{t('home.facts.licence')}</dt>
              <dd className="code">{site.licenceNo}</dd>
            </div>
            <div>
              <dt>{t('home.facts.gstin')}</dt>
              <dd className="code">{site.gstin}</dd>
            </div>
          </dl>
        </div>
      </div>

      <div className={`container ${styles.bottom}`}>
        <p>
          © {year} <span lang="en">{site.name}</span>. {t('footer.rights')}
        </p>
        <button type="button" className={styles.toTop} onClick={scrollToTop}>
          {t('footer.backToTop')}
          <ArrowUpIcon />
        </button>
      </div>
    </footer>
  );
}
