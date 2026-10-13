import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CheckIcon, CopyIcon } from './Icons.jsx';
import styles from './CopyButton.module.css';

// Copies a registration number (GSTIN, PAN, licence) to the clipboard.
export default function CopyButton({ value, label }) {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);
  const timer = useRef(null);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard access can be refused; the value is on screen to copy by hand.
    }
  };

  return (
    <button type="button" className={styles.copy} onClick={copy} aria-label={t('common.copyValue', { label })}>
      {copied ? <CheckIcon /> : <CopyIcon />}
      <span aria-live="polite">{copied ? t('common.copied') : t('common.copy')}</span>
    </button>
  );
}
