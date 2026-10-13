// Builds responsive image URLs for the Unsplash CDN.
// Pure functions only: this file is also imported by the build plugin so that
// the <link rel="preload"> tags it writes match the URLs the app requests.

const UNSPLASH_HOST = 'https://images.unsplash.com/';

export function isRemoteImage(image) {
  return typeof image?.src === 'string' && image.src.startsWith(UNSPLASH_HOST);
}

const heightFor = (width, ratio) => Math.round((width * ratio[1]) / ratio[0]);

export function imageUrl(image, { w, ratio, fm = 'webp', q, blur } = {}) {
  if (!isRemoteImage(image)) return image.src;

  const params = new URLSearchParams();
  params.set('w', String(w));
  if (ratio) {
    params.set('h', String(heightFor(w, ratio)));
    params.set('fit', 'crop');
    if (image.focal) {
      params.set('crop', 'focalpoint');
      params.set('fp-x', String(image.focal[0]));
      params.set('fp-y', String(image.focal[1]));
    }
  }
  // AVIF reaches the same visual quality at a lower setting than WebP.
  params.set('q', String(q ?? (fm === 'avif' ? 60 : 80)));
  params.set('fm', fm);
  if (blur) params.set('blur', String(blur));
  return `${image.src}?${params.toString()}`;
}

export function buildSrcSet(image, { widths, ratio, fm }) {
  return widths.map((w) => `${imageUrl(image, { w, ratio, fm })} ${w}w`).join(', ');
}

// Tiny blurred version shown while the real photo loads.
export function lqipUrl(image, ratio) {
  if (!isRemoteImage(image)) return null;
  return imageUrl(image, { w: 24, ratio, fm: 'webp', q: 20, blur: 60 });
}

// <source> descriptors for a <picture>: AVIF first, then WebP, with an optional
// separate crop for narrow screens.
export function pictureSources(image, picture) {
  if (!isRemoteImage(image)) return [];
  const { ratio, widths, mobileRatio, mobileWidths, mobileMedia, sizes } = picture;
  const sources = [];

  const add = (media, r, ws) => {
    ['avif', 'webp'].forEach((fm) => {
      sources.push({
        media,
        type: `image/${fm}`,
        srcSet: buildSrcSet(image, { widths: ws, ratio: r, fm }),
        sizes,
        width: ws[ws.length - 1],
        height: r ? heightFor(ws[ws.length - 1], r) : undefined,
      });
    });
  };

  if (mobileRatio) add(mobileMedia || '(max-width: 640px)', mobileRatio, mobileWidths || widths);
  add(undefined, ratio, widths);
  return sources;
}

// JPEG fallback for browsers without AVIF or WebP.
export function fallbackSrc(image, picture) {
  const w = picture.widths[Math.min(1, picture.widths.length - 1)];
  return {
    src: imageUrl(image, { w, ratio: picture.ratio, fm: 'jpg' }),
    width: w,
    height: picture.ratio ? heightFor(w, picture.ratio) : undefined,
  };
}
