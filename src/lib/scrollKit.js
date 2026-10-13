// Scroll effects (GSAP + ScrollTrigger + Lenis) are not needed for the first
// paint. They live in their own chunk, which loads the moment the visitor
// first scrolls, moves the pointer, touches or presses a key, or after a few
// idle seconds, whichever comes first. Everything that uses them goes through
// loadScrollKit().

let kitPromise = null;
let lenis = null;
let lenisTick = null;
let smoothWanted = false;
let locks = 0;

const WAKE_EVENTS = ['scroll', 'wheel', 'pointerdown', 'pointermove', 'touchstart', 'keydown'];
const WAKE_TIMEOUT = 6000;

function whenNeeded() {
  return new Promise((resolve) => {
    let timer = 0;
    const wake = () => {
      window.clearTimeout(timer);
      WAKE_EVENTS.forEach((type) => window.removeEventListener(type, wake));
      resolve();
    };
    WAKE_EVENTS.forEach((type) => window.addEventListener(type, wake, { passive: true }));
    timer = window.setTimeout(wake, WAKE_TIMEOUT);
  });
}

export function loadScrollKit() {
  if (!kitPromise) {
    kitPromise = whenNeeded()
      .then(() => import('./scrollKit.impl.js'))
      .then((kit) => {
        // Web fonts change text heights; re-measure trigger positions once they arrive.
        document.fonts?.ready.then(() => kit.ScrollTrigger.refresh());
        return kit;
      });
  }
  return kitPromise;
}

// Lenis smooth scrolling, driven by GSAP's ticker so that ScrollTrigger and
// Lenis stay in step.
export function enableSmoothScroll() {
  smoothWanted = true;
  loadScrollKit().then(({ gsap, ScrollTrigger, Lenis }) => {
    if (!smoothWanted || lenis) return;
    lenis = new Lenis({ duration: 1.05, smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    lenisTick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(lenisTick);
    gsap.ticker.lagSmoothing(0);
    if (locks > 0) lenis.stop();
  });
}

export function disableSmoothScroll() {
  smoothWanted = false;
  if (!lenis) return;
  const instance = lenis;
  const tick = lenisTick;
  lenis = null;
  lenisTick = null;
  kitPromise.then(({ gsap }) => {
    gsap.ticker.remove(tick);
    instance.destroy();
  });
}

export function scrollToTop() {
  if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
  window.scrollTo(0, 0);
}

export function refreshScrollTriggers() {
  if (!kitPromise) return;
  kitPromise.then(({ ScrollTrigger }) => ScrollTrigger.refresh());
}

// Page scroll lock for the mobile menu and the lightbox. Counted, so two
// overlays can hold it at once.
export function lockScroll() {
  locks += 1;
  if (locks === 1) {
    document.documentElement.classList.add('scroll-locked');
    lenis?.stop();
  }
}

export function unlockScroll() {
  locks = Math.max(0, locks - 1);
  if (locks === 0) {
    document.documentElement.classList.remove('scroll-locked');
    lenis?.start();
  }
}
