import { lazy, Suspense, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, LazyMotion, MotionConfig, useReducedMotion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import FloatingActions from './components/FloatingActions.jsx';
import PageTransition from './components/PageTransition.jsx';
import Home from './pages/Home.jsx';
import { disableSmoothScroll, enableSmoothScroll, refreshScrollTriggers, scrollToTop } from './lib/scrollKit.js';
import styles from './App.module.css';

// Home ships in the main bundle, since it is where most visits start.
// Every other page is its own chunk.
const pageLoaders = {
  services: () => import('./pages/Services.jsx'),
  projects: () => import('./pages/Projects.jsx'),
  about: () => import('./pages/About.jsx'),
  contact: () => import('./pages/Contact.jsx'),
  notFound: () => import('./pages/NotFound.jsx'),
};
const Services = lazy(pageLoaders.services);
const Projects = lazy(pageLoaders.projects);
const About = lazy(pageLoaders.about);
const Contact = lazy(pageLoaders.contact);
const NotFound = lazy(pageLoaders.notFound);

// Framer Motion's animation features load on demand (see lib/motionFeatures.js).
const loadMotionFeatures = () => import('./lib/motionFeatures.js').then((module) => module.default);

export default function App() {
  const location = useLocation();
  const reduced = useReducedMotion();
  const { t } = useTranslation();

  // Lenis smooth scrolling, unless the visitor prefers reduced motion.
  useEffect(() => {
    if (reduced) return undefined;
    enableSmoothScroll();
    return disableSmoothScroll;
  }, [reduced]);

  // Each page starts at the top; the scroll position is reset between pages.
  useEffect(() => {
    if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual';
  }, []);

  // Fetch the other pages in the background, so navigation never waits on the network.
  useEffect(() => {
    const timer = window.setTimeout(() => {
      Object.values(pageLoaders).forEach((load) => load().catch(() => {}));
    }, 3000);
    return () => window.clearTimeout(timer);
  }, []);

  // Re-measure scroll-triggered effects once a new page has settled.
  useEffect(() => {
    const timer = window.setTimeout(refreshScrollTriggers, 900);
    return () => window.clearTimeout(timer);
  }, [location.pathname]);

  return (
    <LazyMotion features={loadMotionFeatures} strict>
      <MotionConfig reducedMotion="user">
        <a className="skip-link" href="#main">
          {t('nav.skip')}
        </a>
        <Header />

        <div className={styles.pages}>
          <AnimatePresence mode="wait" initial={false} onExitComplete={scrollToTop}>
            <PageTransition key={location.pathname} focusOnMount={location.key !== 'default'}>
              <Suspense fallback={<div className={styles.fallback} />}>
                <Routes location={location}>
                  <Route path="/" element={<Home />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </PageTransition>
          </AnimatePresence>
        </div>

        <Footer />
        <FloatingActions />
      </MotionConfig>
    </LazyMotion>
  );
}
