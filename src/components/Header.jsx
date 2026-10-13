import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, m, useMotionValueEvent, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Logo from './Logo.jsx';
import LanguageToggle from './LanguageToggle.jsx';
import { PhoneIcon, WhatsAppIcon } from './Icons.jsx';
import { routes } from '../data/routes.js';
import { formatPhone, site, telHref } from '../data/site.js';
import { whatsappLink } from '../lib/whatsapp.js';
import useScrollLock from '../hooks/useScrollLock.js';
import useFocusTrap from '../hooks/useFocusTrap.js';
import cx from '../lib/cx.js';
import styles from './Header.module.css';

const menuVariants = {
  closed: { opacity: 0, transition: { duration: 0.25 } },
  open: { opacity: 1, transition: { duration: 0.3, staggerChildren: 0.06, delayChildren: 0.08 } },
};

const itemVariants = {
  closed: { opacity: 0, y: 24 },
  open: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

// Sticky header: transparent over the hero, then shrinks to a solid bar with a
// reading-progress line once the page is scrolled.
export default function Header() {
  const { t } = useTranslation();
  const location = useLocation();
  const reduced = useReducedMotion();
  const headerRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const { scrollY, scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 160, damping: 28, mass: 0.4 });
  useMotionValueEvent(scrollY, 'change', (value) => setScrolled(value > 24));

  const close = useCallback(() => setOpen(false), []);
  useScrollLock(open);
  useFocusTrap(headerRef, open, close);

  // Close the menu after navigating, and if the window grows to desktop width.
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 1024px)');
    const onChange = (event) => event.matches && setOpen(false);
    desktop.addEventListener('change', onChange);
    return () => desktop.removeEventListener('change', onChange);
  }, []);

  const primary = site.phones.primary;

  return (
    <header ref={headerRef} className={cx(styles.header, scrolled && styles.scrolled, open && styles.open)}>
      <div className={styles.bar}>
        <Link to="/" className={styles.brand}>
          <Logo className={styles.mark} />
          <span className={styles.brandText}>
            <span className={styles.brandName} lang="en">
              R.K. Govt. Contractor
            </span>
            <span className={styles.brandSub}>{t('brand.descriptor')}</span>
          </span>
        </Link>

        <nav className={styles.nav} aria-label={t('nav.label')}>
          <ul className={styles.navList}>
            {routes.map((route) => (
              <li key={route.key}>
                <NavLink
                  to={route.path}
                  end={route.path === '/'}
                  className={({ isActive }) => cx(styles.link, isActive && styles.active)}
                >
                  {t(`nav.${route.key}`)}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.tools}>
          <LanguageToggle />
          <a className={styles.call} href={telHref(primary)} aria-label={t('common.callNumber', { number: formatPhone(primary) })}>
            <PhoneIcon />
            <span className="code">{formatPhone(primary)}</span>
          </a>
          <button
            type="button"
            className={styles.burger}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t('nav.closeMenu') : t('nav.openMenu')}
            onClick={() => setOpen((value) => !value)}
          >
            <span className={styles.burgerLine} />
            <span className={styles.burgerLine} />
          </button>
        </div>
      </div>

      <m.div
        className={styles.progress}
        style={{ scaleX: reduced ? scrollYProgress : smoothProgress }}
        aria-hidden="true"
      />

      <AnimatePresence>
        {open && (
          <m.div
            id="mobile-menu"
            className={styles.menu}
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            data-lenis-prevent
          >
            <nav aria-label={t('nav.menu')}>
              <ul className={styles.menuList}>
                {routes.map((route, index) => (
                  <m.li key={route.key} variants={itemVariants}>
                    <NavLink
                      to={route.path}
                      end={route.path === '/'}
                      className={({ isActive }) => cx(styles.menuLink, isActive && styles.menuActive)}
                      onClick={close}
                    >
                      <span className={styles.menuIndex} aria-hidden="true">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      {t(`nav.${route.key}`)}
                    </NavLink>
                  </m.li>
                ))}
              </ul>
            </nav>

            <m.div className={styles.menuContact} variants={itemVariants}>
              <a className={styles.menuAction} href={telHref(primary)}>
                <PhoneIcon />
                <span>
                  <span className={styles.menuActionLabel}>{t('common.call')}</span>
                  <span className="code">{formatPhone(primary)}</span>
                </span>
              </a>
              <a
                className={styles.menuAction}
                href={whatsappLink(t('common.waGreeting'))}
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsAppIcon />
                <span>
                  <span className={styles.menuActionLabel}>{t('common.whatsapp')}</span>
                  <span className="code">{formatPhone(primary)}</span>
                </span>
              </a>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  );
}
