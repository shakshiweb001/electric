// Crop and size presets for <SmartImage>. Shared with the build plugin, which
// preloads the hero and page-header photos using exactly these settings.

export const HERO_PICTURE = {
  ratio: [16, 9],
  widths: [960, 1280, 1600, 1920, 2400],
  mobileRatio: [2, 3],
  mobileWidths: [480, 640, 828, 1080],
  mobileMedia: '(max-width: 640px)',
  sizes: '100vw',
};

export const PAGE_HEADER_PICTURE = {
  ratio: [16, 7],
  widths: [960, 1280, 1600, 1920, 2400],
  mobileRatio: [1, 1],
  mobileWidths: [480, 640, 828, 1080],
  mobileMedia: '(max-width: 640px)',
  sizes: '100vw',
};

// Full-width section backgrounds further down the page.
export const BAND_PICTURE = {
  ratio: [16, 9],
  widths: [768, 1080, 1440, 1920],
  mobileRatio: [4, 5],
  mobileWidths: [480, 640, 828],
  mobileMedia: '(max-width: 640px)',
  sizes: '100vw',
};

// Gallery tiles.
export const TILE_PICTURE = {
  ratio: [4, 3],
  widths: [320, 480, 640, 960],
  sizes: '(max-width: 600px) 100vw, (max-width: 1000px) 50vw, 33vw',
};

// Photos placed beside text: portrait on wide screens, landscape once the
// layout stacks (matches the 899px breakpoint in ParallaxPhoto.module.css).
export const INLINE_PICTURE = {
  ratio: [4, 5],
  widths: [400, 600, 800, 1200],
  mobileRatio: [4, 3],
  mobileWidths: [480, 640, 828, 1080],
  mobileMedia: '(max-width: 899px)',
  sizes: '(max-width: 899px) 100vw, 42vw',
};
