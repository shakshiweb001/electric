// Route table shared by the app and by the build plugin (vite-plugin-site.js),
// which uses it for sitemap.xml and the per-route HTML files.
// "key" matches the "seo.<key>" entries in the locale files.
// "image" is the page-header photo from images.js, preloaded in that route's HTML.

export const routes = [
  { key: 'home', path: '/', image: 'hero' },
  { key: 'services', path: '/services', image: 'pylonHills' },
  { key: 'projects', path: '/projects', image: 'polesPine' },
  { key: 'about', path: '/about', image: 'valleyVillage' },
  { key: 'contact', path: '/contact', image: 'hillSilhouette' },
];

export const NOT_FOUND_KEY = 'notFound';
