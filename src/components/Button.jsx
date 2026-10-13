import { Link } from 'react-router-dom';
import cx from '../lib/cx.js';
import styles from './Button.module.css';

// One button style for router links (to), plain links (href) and buttons.
// variant: 'primary' (amber) | 'pine' | 'light' (outline on dark) | 'dark' (outline on light)
export default function Button({
  to,
  href,
  external = false,
  variant = 'primary',
  iconStart,
  iconEnd,
  className,
  children,
  ...rest
}) {
  const classes = cx(styles.btn, styles[variant], className);
  const content = (
    <>
      {iconStart && <span className={styles.iconStart}>{iconStart}</span>}
      <span className={styles.label}>{children}</span>
      {iconEnd && <span className={styles.iconEnd}>{iconEnd}</span>}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {content}
      </Link>
    );
  }
  if (href) {
    const target = external ? { target: '_blank', rel: 'noopener noreferrer' } : {};
    return (
      <a href={href} className={classes} {...target} {...rest}>
        {content}
      </a>
    );
  }
  return (
    <button type="button" className={classes} {...rest}>
      {content}
    </button>
  );
}
