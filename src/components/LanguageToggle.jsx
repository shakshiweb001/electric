import { useTranslation } from 'react-i18next';
import cx from '../lib/cx.js';
import styles from './LanguageToggle.module.css';

// English / Hindi switch. The choice is saved to localStorage by src/i18n/index.js.
export default function LanguageToggle({ className }) {
  const { t, i18n } = useTranslation();
  const current = i18n.language === 'hi' ? 'hi' : 'en';

  return (
    <div className={cx(styles.toggle, className)} role="group" aria-label={t('lang.label')} data-lang={current}>
      <span className={styles.thumb} aria-hidden="true" />
      <button
        type="button"
        className={styles.option}
        lang="en"
        aria-pressed={current === 'en'}
        onClick={() => i18n.changeLanguage('en')}
      >
        <span aria-hidden="true">EN</span>
        <span className="sr-only">English</span>
      </button>
      <button
        type="button"
        className={cx(styles.option, styles.hindi)}
        lang="hi"
        aria-pressed={current === 'hi'}
        onClick={() => i18n.changeLanguage('hi')}
      >
        हिंदी
      </button>
    </div>
  );
}
