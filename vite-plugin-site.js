// Build-time SEO for the site.
//
// A client-rendered React app normally ships one index.html with one set of
// meta tags. Link previews (WhatsApp, Facebook) and some crawlers never run
// JavaScript, so they would see the same title on every page. This plugin fixes
// that by writing one HTML file per route, each with its own:
//   - <title>, meta description and canonical link
//   - Open Graph and Twitter tags
//   - preload for that page's header photo
//   - LocalBusiness JSON-LD
// It also writes sitemap.xml, robots.txt and 404.html, and puts a static copy
// of the hero (photo and headline) into the home page so it paints before the
// app starts.
//
// Text comes from src/i18n/locales/en.json ("seo"), routes from
// src/data/routes.js and the domain from VITE_SITE_URL (see .env.example).

import fs from 'node:fs';
import path from 'node:path';
import { loadEnv } from 'vite';
import { routes, NOT_FOUND_KEY } from './src/data/routes.js';
import { images } from './src/data/images.js';
import { HERO_PICTURE, PAGE_HEADER_PICTURE } from './src/data/picture.js';
import { pictureSources, fallbackSrc } from './src/lib/imageUrl.js';
import { buildJsonLd } from './src/data/schema.js';
import { site } from './src/data/site.js';

const HEAD_TOKEN = '<!--SITE:HEAD-->';
const SHELL_TOKEN = '<!--SITE:SHELL-->';
const PLACEHOLDER_URL = 'https://www.example.com';

const esc = (value) =>
  String(value).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function resolveSiteUrl(env) {
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : '';
  // process.env.URL is set by Netlify to the site's main address.
  const url = env.VITE_SITE_URL || process.env.URL || vercel || PLACEHOLDER_URL;
  return url.replace(/\/+$/, '');
}

function preloadLinks(image, picture) {
  return pictureSources(image, picture)
    .filter((source) => source.type === 'image/avif')
    .map((source) => {
      const media = source.media || (picture.mobileRatio ? `not all and ${picture.mobileMedia}` : '');
      return (
        `<link rel="preload" as="image" type="image/avif" imagesrcset="${esc(source.srcSet)}" ` +
        `imagesizes="${esc(source.sizes)}"${media ? ` media="${esc(media)}"` : ''} fetchpriority="high" />`
      );
    });
}

// Static hero for the home page. It must match the markup and crop used by
// src/components/Hero.jsx so the swap to the live app is invisible.
function heroShell(image, copy) {
  const sources = pictureSources(image, HERO_PICTURE)
    .map(
      (source) =>
        `<source${source.media ? ` media="${esc(source.media)}"` : ''} type="${source.type}" ` +
        `srcset="${esc(source.srcSet)}" sizes="${esc(source.sizes)}" width="${source.width}" height="${source.height}" />`
    )
    .join('');
  const fallback = fallbackSrc(image, HERO_PICTURE);
  return (
    `<div class="shell" aria-hidden="true"><picture>${sources}` +
    `<img src="${esc(fallback.src)}" alt="" width="${fallback.width}" height="${fallback.height}" ` +
    `fetchpriority="high" decoding="sync" /></picture>` +
    // Same classes as Hero.jsx (see "Home hero text" in src/styles/global.css).
    `<div class="container hero-content"><p class="eyebrow hero-eyebrow"><span>${esc(copy.eyebrow)}</span>` +
    `<span class="code hero-licence">${esc(copy.licence)}</span></p><p class="hero-title">` +
    [copy.line1, copy.line2, copy.line3]
      .map((line, i) => `<span class="hero-line"><span style="--i:${i}">${esc(line)}</span></span>`)
      .join('') +
    `</p><p class="hero-lede">${esc(copy.lede)}</p><div class="hero-actions"></div></div></div>` +
    '<script>window.__heroShellStart=performance.now()</script>'
  );
}

export default function sitePlugin() {
  let config;
  let siteUrl;
  let seo;
  let heroCopy;

  function headFor(key) {
    const route = routes.find((item) => item.key === key);
    const noindex = !route;
    const { title, description } = seo[key];
    const url = route ? `${siteUrl}${route.path === '/' ? '/' : route.path}` : siteUrl;
    const ogImage = `${siteUrl}/og-image.jpg`;

    const tags = [
      `<title>${esc(title)}</title>`,
      `<meta name="description" content="${esc(description)}" />`,
      `<meta name="robots" content="${noindex ? 'noindex, follow' : 'index, follow'}" />`,
      noindex ? '' : `<link rel="canonical" href="${esc(url)}" />`,
      '<meta property="og:type" content="website" />',
      `<meta property="og:site_name" content="${esc(site.name)}" />`,
      '<meta property="og:locale" content="en_IN" />',
      '<meta property="og:locale:alternate" content="hi_IN" />',
      `<meta property="og:title" content="${esc(title)}" />`,
      `<meta property="og:description" content="${esc(description)}" />`,
      `<meta property="og:url" content="${esc(url)}" />`,
      `<meta property="og:image" content="${esc(ogImage)}" />`,
      '<meta property="og:image:width" content="1200" />',
      '<meta property="og:image:height" content="630" />',
      `<meta property="og:image:alt" content="${esc(`${site.name}, A-Class government electrical contractor, Hamirpur (H.P.)`)}" />`,
      '<meta name="twitter:card" content="summary_large_image" />',
      `<meta name="twitter:title" content="${esc(title)}" />`,
      `<meta name="twitter:description" content="${esc(description)}" />`,
      `<meta name="twitter:image" content="${esc(ogImage)}" />`,
      // The home page carries the hero photo in its static shell instead.
      ...(route && route.key !== 'home' ? preloadLinks(images[route.image], PAGE_HEADER_PICTURE) : []),
      `<script type="application/ld+json">${JSON.stringify(buildJsonLd(siteUrl)).replace(/</g, '\\u003c')}</script>`,
    ];
    return tags.filter(Boolean).join('\n    ');
  }

  function render(template, key) {
    const shell = key === 'home' ? heroShell(images.hero, heroCopy) : '';
    return template.replace(HEAD_TOKEN, () => headFor(key)).replace(SHELL_TOKEN, () => shell);
  }

  function sitemap() {
    const today = new Date().toISOString().slice(0, 10);
    const urls = routes
      .map(
        (route) =>
          `  <url>\n    <loc>${siteUrl}${route.path === '/' ? '/' : route.path}</loc>\n` +
          `    <lastmod>${today}</lastmod>\n    <priority>${route.path === '/' ? '1.0' : '0.8'}</priority>\n  </url>`
      )
      .join('\n');
    return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  }

  function robots() {
    return `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`;
  }

  return {
    name: 'rk-site',

    configResolved(resolved) {
      config = resolved;
      siteUrl = resolveSiteUrl(loadEnv(resolved.mode, resolved.root, ''));
      const locale = path.resolve(resolved.root, 'src/i18n/locales/en.json');
      const en = JSON.parse(fs.readFileSync(locale, 'utf8'));
      seo = en.seo;
      heroCopy = { ...en.home.hero, licence: en.brand.licence };

      if (resolved.command === 'build' && siteUrl === PLACEHOLDER_URL) {
        resolved.logger.warn(
          `\n[rk-site] VITE_SITE_URL is not set. Using the placeholder ${PLACEHOLDER_URL} for canonical ` +
            'URLs, Open Graph tags, sitemap.xml and robots.txt. Set it in .env before going live.\n'
        );
      }
    },

    // Dev server: fill the tokens for whichever route was requested.
    // Build: leave them in place; writeBundle() below fills them once per route.
    transformIndexHtml(html, ctx) {
      if (!ctx.server) return html;
      const pathname = (ctx.originalUrl || '/').split(/[?#]/)[0].replace(/(.)\/$/, '$1');
      const route = routes.find((item) => item.path === pathname);
      return render(html, route ? route.key : NOT_FOUND_KEY);
    },

    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url === '/sitemap.xml') {
          res.setHeader('Content-Type', 'application/xml');
          res.end(sitemap());
        } else if (req.url === '/robots.txt') {
          res.setHeader('Content-Type', 'text/plain');
          res.end(robots());
        } else {
          next();
        }
      });
    },

    writeBundle(options) {
      const outDir = options.dir || path.resolve(config.root, config.build.outDir);
      const indexFile = path.join(outDir, 'index.html');
      let template = fs.readFileSync(indexFile, 'utf8');

      // Inline the entry stylesheets (about 11 KB gzipped in total). Nothing can
      // paint until they arrive, so this saves a network round trip before the
      // first paint. Page-specific CSS chunks stay as separate cached files.
      template = template.replace(/<link rel="stylesheet"[^>]*href="([^"]+\.css)"[^>]*>/g, (tag, href) => {
        const file = path.join(outDir, href.replace(config.base, ''));
        if (!fs.existsSync(file)) return tag;
        return `<style>${fs.readFileSync(file, 'utf8').trim()}</style>`;
      });
      if (!template.includes(HEAD_TOKEN) || !template.includes(SHELL_TOKEN)) {
        this.error('[rk-site] index.html is missing the <!--SITE:HEAD--> or <!--SITE:SHELL--> marker.');
      }

      routes.forEach((route) => {
        const file = route.path === '/' ? 'index.html' : `${route.path.slice(1)}.html`;
        fs.writeFileSync(path.join(outDir, file), render(template, route.key));
      });
      fs.writeFileSync(path.join(outDir, '404.html'), render(template, NOT_FOUND_KEY));
      fs.writeFileSync(path.join(outDir, 'sitemap.xml'), sitemap());
      fs.writeFileSync(path.join(outDir, 'robots.txt'), robots());
    },
  };
}
