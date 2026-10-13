import { useTranslation } from 'react-i18next';
import Seo from '../components/Seo.jsx';
import Button from '../components/Button.jsx';
import { ArrowRightIcon } from '../components/Icons.jsx';
import styles from './NotFound.module.css';

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <>
      <Seo page="notFound" noindex />
      <section className={styles.page} aria-labelledby="not-found-title">
        <div className={`container ${styles.inner}`}>
          {/* Two poles with a line that does not reach across. */}
          <svg className={styles.art} viewBox="0 0 480 170" aria-hidden="true" focusable="false">
            <path className={styles.ground} d="M10 150H470" />
            <path className={styles.pole} d="M90 150V34M82 44h16M390 150V34M382 44h16" />
            <path className={styles.wire} d="M-10 58 Q40 70 90 40" />
            <path className={styles.wire} d="M390 40 Q440 70 490 58" />
            <path className={styles.loose} d="M90 40 Q150 84 196 118" />
            <path className={styles.loose} d="M390 40 Q332 86 292 116" />
            <path className={styles.spark} d="M232 92l10-16-4 14h12l-12 18 4-16z" />
          </svg>

          <p className={styles.code}>{t('notFound.code')}</p>
          <h1 id="not-found-title" className={styles.title}>
            {t('notFound.title')}
          </h1>
          <p className={styles.body}>{t('notFound.body')}</p>
          <div className={styles.actions}>
            <Button to="/" variant="primary" iconEnd={<ArrowRightIcon />}>
              {t('notFound.home')}
            </Button>
            <Button to="/contact" variant="light">
              {t('notFound.contact')}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
