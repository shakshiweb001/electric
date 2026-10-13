import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, m } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ChevronLeftIcon, ChevronRightIcon, CloseIcon, ZoomInIcon, ZoomOutIcon } from './Icons.jsx';
import useScrollLock from '../hooks/useScrollLock.js';
import useFocusTrap from '../hooks/useFocusTrap.js';
import cx from '../lib/cx.js';
import styles from './Lightbox.module.css';

// Full-screen photo viewer.
//
// Keyboard:  Esc close · Left / Right previous and next · + and - zoom ·
//            arrow keys pan while zoomed · Tab stays inside the viewer
// Pointer:   double-click or the zoom button to zoom, drag to pan
// Touch:     swipe left or right to change photo, scroll to pan while zoomed
//
// items: [{ id, src, srcSet, width, height, alt, color, stock, credit }]
export default function Lightbox({ items, index, onNavigate, onClose }) {
  const { t } = useTranslation();
  const dialogRef = useRef(null);
  const stageRef = useRef(null);
  const closeRef = useRef(null);
  const drag = useRef(null);
  const swipe = useRef(null);
  const [zoomed, setZoomed] = useState(false);

  const item = items[index];
  const many = items.length > 1;

  useScrollLock(true);
  useFocusTrap(dialogRef, true, onClose);

  useEffect(() => {
    closeRef.current?.focus();
  }, []);

  useEffect(() => {
    setZoomed(false);
  }, [index]);

  // Start a zoomed photo centred in the scrollable stage.
  useLayoutEffect(() => {
    const stage = stageRef.current;
    if (!stage || !zoomed) return;
    stage.scrollLeft = (stage.scrollWidth - stage.clientWidth) / 2;
    stage.scrollTop = (stage.scrollHeight - stage.clientHeight) / 2;
  }, [zoomed]);

  const go = useCallback(
    (step) => onNavigate((index + step + items.length) % items.length),
    [index, items.length, onNavigate]
  );

  useEffect(() => {
    const pan = { ArrowLeft: [-120, 0], ArrowRight: [120, 0], ArrowUp: [0, -120], ArrowDown: [0, 120] };

    const onKeyDown = (event) => {
      if (event.key === '+' || event.key === '=') {
        setZoomed(true);
      } else if (event.key === '-' || event.key === '_' || event.key === '0') {
        setZoomed(false);
      } else if (zoomed && pan[event.key]) {
        stageRef.current?.scrollBy({ left: pan[event.key][0], top: pan[event.key][1] });
      } else if (many && event.key === 'ArrowRight') {
        go(1);
      } else if (many && event.key === 'ArrowLeft') {
        go(-1);
      } else {
        return;
      }
      event.preventDefault();
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [go, many, zoomed]);

  // Mouse drag pans a zoomed photo. Touch devices scroll the stage natively.
  const onPointerDown = (event) => {
    if (!zoomed || event.pointerType !== 'mouse') return;
    const stage = stageRef.current;
    drag.current = { x: event.clientX, y: event.clientY, left: stage.scrollLeft, top: stage.scrollTop };
    stage.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event) => {
    if (!drag.current) return;
    const stage = stageRef.current;
    stage.scrollLeft = drag.current.left - (event.clientX - drag.current.x);
    stage.scrollTop = drag.current.top - (event.clientY - drag.current.y);
  };

  const onPointerUp = () => {
    drag.current = null;
  };

  const onTouchStart = (event) => {
    const touch = event.touches[0];
    swipe.current = { x: touch.clientX, y: touch.clientY };
  };

  const onTouchEnd = (event) => {
    if (!swipe.current || zoomed || !many) return;
    const touch = event.changedTouches[0];
    const dx = touch.clientX - swipe.current.x;
    const dy = touch.clientY - swipe.current.y;
    swipe.current = null;
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) go(dx < 0 ? 1 : -1);
  };

  return createPortal(
    <m.div
      ref={dialogRef}
      className={styles.backdrop}
      role="dialog"
      aria-modal="true"
      aria-label={t('projects.lightbox.label')}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      data-lenis-prevent
    >
      <div className={styles.toolbar}>
        <span className={styles.counter} aria-live="polite">
          {t('projects.lightbox.counter', { current: index + 1, total: items.length })}
        </span>
        <button
          type="button"
          className={styles.tool}
          aria-label={zoomed ? t('projects.lightbox.zoomOut') : t('projects.lightbox.zoomIn')}
          onClick={() => setZoomed((value) => !value)}
        >
          {zoomed ? <ZoomOutIcon /> : <ZoomInIcon />}
        </button>
        <button ref={closeRef} type="button" className={styles.tool} aria-label={t('projects.lightbox.close')} onClick={onClose}>
          <CloseIcon />
        </button>
      </div>

      <div
        ref={stageRef}
        className={cx(styles.stage, zoomed && styles.stageZoomed)}
        onClick={(event) => event.target === event.currentTarget && onClose()}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <AnimatePresence mode="wait" initial={false}>
          <m.img
            key={item.id}
            className={cx(styles.photo, zoomed && styles.photoZoomed)}
            src={item.src}
            srcSet={item.srcSet}
            sizes={zoomed ? '200vw' : '100vw'}
            alt={item.alt}
            width={item.width}
            height={item.height}
            style={{ backgroundColor: item.color }}
            draggable={false}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onDoubleClick={() => setZoomed((value) => !value)}
          />
        </AnimatePresence>
      </div>

      {many && (
        <>
          <button type="button" className={cx(styles.nav, styles.prev)} aria-label={t('projects.lightbox.prev')} onClick={() => go(-1)}>
            <ChevronLeftIcon />
          </button>
          <button type="button" className={cx(styles.nav, styles.next)} aria-label={t('projects.lightbox.next')} onClick={() => go(1)}>
            <ChevronRightIcon />
          </button>
        </>
      )}

      <div className={styles.caption}>
        <p className={styles.alt}>{item.alt}</p>
        {item.stock && (
          <p className={styles.meta}>
            <span className={styles.stock}>{t('common.stockTag')}</span>
            {t('common.stockNote')}{' '}
            {item.credit && (
              <a href={item.credit.page} target="_blank" rel="noopener noreferrer">
                {t('common.photoBy', { name: item.credit.name })}
              </a>
            )}
          </p>
        )}
        <p className="sr-only">{t('projects.lightbox.hint')}</p>
      </div>
    </m.div>,
    document.body
  );
}
