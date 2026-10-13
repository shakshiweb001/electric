import { useTranslation } from 'react-i18next';
import ServiceIcon from './ServiceIcon.jsx';
import styles from './ServiceCard.module.css';

// One service. On hover or keyboard focus the card lifts, an amber underline
// runs under the title and the icon plays its animation.
export default function ServiceCard({ service, index, heading: Heading = 'h3' }) {
  const { t } = useTranslation();
  const base = `services.items.${service.id}`;
  const specs = t(`${base}.specs`, { returnObjects: true });

  return (
    <article className={styles.card} data-hover-root>
      <div className={styles.top}>
        <ServiceIcon name={service.icon} className={styles.icon} />
        <span className={styles.index} aria-hidden="true">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>
      <Heading className={styles.title}>{t(`${base}.title`)}</Heading>
      <p className={styles.desc}>{t(`${base}.desc`)}</p>
      <ul className={styles.specs}>
        {specs.map((spec) => (
          <li key={spec}>{spec}</li>
        ))}
      </ul>
    </article>
  );
}
