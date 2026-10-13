import { useTranslation } from 'react-i18next';
import { SHOW_PLACEHOLDERS } from '../data/site.js';
import cx from '../lib/cx.js';
import styles from './Placeholder.module.css';

// A clearly marked block for information the client has not supplied yet.
// Every use of this component is something to replace before launch; search
// the project for "<Placeholder" to find them all. Setting SHOW_PLACEHOLDERS
// to false in src/data/site.js hides them.
export default function Placeholder({ as: Tag = 'div', tone = 'light', className, children }) {
  const { t } = useTranslation();
  if (!SHOW_PLACEHOLDERS) return null;

  return (
    <Tag className={cx(styles.box, styles[tone], className)} data-placeholder>
      <span className={styles.tag}>{t('common.placeholderTag')}</span>
      <span className={styles.body}>{children}</span>
      <span className={styles.note}>{t('common.placeholderNote')}</span>
    </Tag>
  );
}
