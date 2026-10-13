import { useTranslation } from 'react-i18next';
import cx from '../lib/cx.js';
import styles from './PhotoTag.module.css';

// Small "Stock photo · photographer" label shown on stock photographs, so that
// they are never mistaken for the firm's own site photos.
export default function PhotoTag({ image, className }) {
  const { t } = useTranslation();
  if (!image?.stock) return null;

  return (
    <span className={cx(styles.tag, className)}>
      {t('common.stockTag')}
      {image.credit && (
        <>
          {' · '}
          <a href={image.credit.page} target="_blank" rel="noopener noreferrer" lang="en">
            {image.credit.name}
          </a>
        </>
      )}
    </span>
  );
}
