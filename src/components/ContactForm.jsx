import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, m, useReducedMotion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Button from './Button.jsx';
import { WhatsAppIcon } from './Icons.jsx';
import { services } from '../data/services.js';
import { whatsappLink } from '../lib/whatsapp.js';
import cx from '../lib/cx.js';
import styles from './ContactForm.module.css';

const EMPTY = { name: '', phone: '', org: '', service: 'general', message: '' };
const REQUIRED = ['name', 'phone', 'message'];

// "+91 98163 35541", "098163-35541" and "9816335541" all become "9816335541".
function normalisePhone(value) {
  let digits = value.replace(/\D/g, '');
  if (digits.length === 12 && digits.startsWith('91')) digits = digits.slice(2);
  if (digits.length === 11 && digits.startsWith('0')) digits = digits.slice(1);
  return digits;
}

function validate(values) {
  const errors = {};
  if (values.name.trim().length < 2) errors.name = true;
  if (!/^[6-9]\d{9}$/.test(normalisePhone(values.phone))) errors.phone = true;
  if (values.message.trim().length < 10) errors.message = true;
  return errors;
}

// The success heading takes focus when it appears, so screen-reader and
// keyboard users land on the confirmation.
function SuccessTitle({ className, children }) {
  const ref = useRef(null);
  useEffect(() => {
    ref.current?.focus();
  }, []);
  return (
    <h3 ref={ref} tabIndex={-1} className={className}>
      {children}
    </h3>
  );
}

// Enquiry form. There is no server: submitting opens WhatsApp with the
// message already written, addressed to the firm's number.
export default function ContactForm() {
  const { t } = useTranslation();
  const reduced = useReducedMotion();
  const [values, setValues] = useState(EMPTY);
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [sentLink, setSentLink] = useState(null);
  const fields = useRef({});

  const errors = validate(values);
  const showError = (name) => Boolean(touched[name] && errors[name]);
  const hasErrors = REQUIRED.some((name) => errors[name]);

  const onChange = (event) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
  };

  const onBlur = (event) => {
    const { name } = event.target;
    setTouched((current) => ({ ...current, [name]: true }));
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
    setTouched({ name: true, phone: true, message: true });

    const firstInvalid = REQUIRED.find((name) => errors[name]);
    if (firstInvalid) {
      fields.current[firstInvalid]?.focus();
      return;
    }

    const serviceLabel =
      values.service === 'general'
        ? t('contact.form.serviceGeneral')
        : t(`services.items.${values.service}.title`);

    const lines = [
      `*${t('contact.form.wa.intro')}*`,
      `${t('contact.form.wa.name')}: ${values.name.trim()}`,
      `${t('contact.form.wa.phone')}: ${normalisePhone(values.phone)}`,
    ];
    if (values.org.trim()) lines.push(`${t('contact.form.wa.org')}: ${values.org.trim()}`);
    lines.push(
      `${t('contact.form.wa.service')}: ${serviceLabel}`,
      '',
      `${t('contact.form.wa.message')}:`,
      values.message.trim()
    );

    const link = whatsappLink(lines.join('\n'));
    window.open(link, '_blank', 'noopener');
    setSentLink(link);
  };

  const reset = () => {
    setValues(EMPTY);
    setTouched({});
    setSubmitted(false);
    setSentLink(null);
  };

  const fieldProps = (name) => ({
    id: `field-${name}`,
    name,
    value: values[name],
    onChange,
    onBlur,
    ref: (node) => {
      fields.current[name] = node;
    },
    className: cx(styles.input, showError(name) && styles.invalid),
  });

  const requiredProps = (name, hintId) => ({
    required: true,
    'aria-required': true,
    'aria-invalid': showError(name),
    'aria-describedby': cx(showError(name) && `error-${name}`, hintId) || undefined,
  });

  const error = (name) =>
    showError(name) && (
      <p id={`error-${name}`} className={styles.error}>
        {t(`contact.form.errors.${name}`)}
      </p>
    );

  const swap = {
    initial: { opacity: 0, y: reduced ? 0 : 16 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: reduced ? 0 : -12 },
    transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
  };

  return (
    <div className={styles.wrap}>
      <AnimatePresence mode="wait" initial={false}>
        {sentLink ? (
          <m.div key="success" className={styles.success} role="status" {...swap}>
            <svg className={styles.tick} viewBox="0 0 72 72" aria-hidden="true" focusable="false">
              <m.circle
                cx="36"
                cy="36"
                r="32"
                initial={{ pathLength: reduced ? 1 : 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
              />
              <m.path
                d="M22 37.5l9.5 9.5L51 27"
                initial={{ pathLength: reduced ? 1 : 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.45, ease: 'easeOut', delay: 0.7 }}
              />
            </svg>
            <SuccessTitle className={styles.successTitle}>{t('contact.form.success.title')}</SuccessTitle>
            <p className={styles.successBody}>{t('contact.form.success.body')}</p>
            <div className={styles.successActions}>
              <Button href={sentLink} external variant="pine" iconStart={<WhatsAppIcon />}>
                {t('contact.form.success.reopen')}
              </Button>
              <Button variant="dark" onClick={reset}>
                {t('contact.form.success.another')}
              </Button>
            </div>
          </m.div>
        ) : (
          <m.form key="form" className={styles.form} onSubmit={onSubmit} noValidate {...swap}>
            <p className={styles.requiredNote}>{t('contact.form.requiredNote')}</p>

            <div className={styles.field}>
              <label htmlFor="field-name" className={styles.label}>
                {t('contact.form.name')} <span aria-hidden="true">*</span>
              </label>
              <input type="text" autoComplete="name" {...fieldProps('name')} {...requiredProps('name')} />
              {error('name')}
            </div>

            <div className={styles.field}>
              <label htmlFor="field-phone" className={styles.label}>
                {t('contact.form.phone')} <span aria-hidden="true">*</span>
              </label>
              <input
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                {...fieldProps('phone')}
                {...requiredProps('phone', 'hint-phone')}
              />
              <p id="hint-phone" className={styles.hint}>
                {t('contact.form.phoneHint')}
              </p>
              {error('phone')}
            </div>

            <div className={styles.field}>
              <label htmlFor="field-org" className={styles.label}>
                {t('contact.form.org')} <span className={styles.optional}>({t('contact.form.optional')})</span>
              </label>
              <input type="text" autoComplete="organization" {...fieldProps('org')} />
            </div>

            <div className={styles.field}>
              <label htmlFor="field-service" className={styles.label}>
                {t('contact.form.service')}
              </label>
              <select {...fieldProps('service')} className={cx(styles.input, styles.select)}>
                <option value="general">{t('contact.form.serviceGeneral')}</option>
                {services.map((service) => (
                  <option key={service.id} value={service.id}>
                    {t(`services.items.${service.id}.title`)}
                  </option>
                ))}
              </select>
            </div>

            <div className={cx(styles.field, styles.wide)}>
              <label htmlFor="field-message" className={styles.label}>
                {t('contact.form.message')} <span aria-hidden="true">*</span>
              </label>
              <textarea rows={5} {...fieldProps('message')} {...requiredProps('message', 'hint-message')} />
              <p id="hint-message" className={styles.hint}>
                {t('contact.form.messageHint')}
              </p>
              {error('message')}
            </div>

            <div className={cx(styles.wide, styles.submitRow)}>
              <Button type="submit" variant="pine" iconStart={<WhatsAppIcon />}>
                {t('contact.form.submit')}
              </Button>
              <p className={styles.summary} role="alert">
                {submitted && hasErrors ? t('contact.form.errors.summary') : ''}
              </p>
            </div>
          </m.form>
        )}
      </AnimatePresence>
    </div>
  );
}
