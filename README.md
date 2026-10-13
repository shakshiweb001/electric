# M/s R.K. Govt. Contractor: website

Website for M/s R.K. Govt. Contractor, A-Class government electrical contractor, Hamirpur (H.P.), Lic. No. A-1578.

React 18 + Vite, plain JavaScript. English and Hindi. Five pages (Home, Services, Projects, About, Contact) plus a 404 page.

## Run it

Needs Node.js 20.19 or newer (22 recommended).

```bash
npm install
npm run dev        # development server at http://localhost:5173
npm run build      # production build into dist/
npm run preview    # serve the production build at http://localhost:4173
```

## Before going live: what to replace

Everything below is either a stand-in or missing, and is marked in the code.

| What | Where | How to find it |
| --- | --- | --- |
| **Domain name** | `.env` (copy `.env.example`) | Set `VITE_SITE_URL`. Until then canonical URLs, share tags, `sitemap.xml` and `robots.txt` use `https://www.example.com`, and the build prints a warning. |
| **All photographs** (18 stock photos) | `src/data/images.js` | Each entry is marked `// REPLACE with real project photo from client`. Put real photos in `public/photos/` and point the entry at the file. |
| **Site photos of the featured project** | `src/data/projects.js`, `public/projects/khuddi-gehra-1/` | Three gallery tiles show "Site photos coming soon". Fill in `src`, `width`, `height` and `alt` on the `type: 'site'` entries; a worked example is at the top of the file. |
| **Logo** | `src/components/Logo.jsx`, `public/favicon.svg`, `public/apple-touch-icon.png`, `public/og-image.jpg` | The pole-on-amber mark is a placeholder drawn for this build. |
| **Licence and GST certificate scans** | `src/pages/About.jsx`, `public/documents/` | Two placeholder slots in the "Documents" section. Check with the client before publishing: these carry personal details. |
| **Email address, office hours** | `src/pages/Contact.jsx` | Placeholder blocks. |
| **Proprietor name, year of establishment, team details, client list, other works** | `src/pages/About.jsx`, `src/pages/Projects.jsx` | Placeholder blocks. |
| **Hindi spellings of place names** | `src/i18n/locales/hi.json` | Doh, Badhani, Bhaderwar, Khuddi-Gehra and Chandesh are left in English, because their correct Devanagari spellings were not supplied. The postal address is also kept in English. |

To list every placeholder: search the project for `<Placeholder`. They show on the site as dashed amber boxes labelled "PLACEHOLDER". To hide them all at once, set `SHOW_PLACEHOLDERS = false` in `src/data/site.js`.

Nothing on the site is invented: no years of experience, project counts, client names, testimonials or awards. The only animated numbers are the real quantities of the featured project (3 poles, 3 stay sets, 0.56 km ACSR, 0.28 km GI wire).

## Where things live

```
index.html                 Page skeleton. Meta tags are generated, see below.
vite-plugin-site.js        Build step: per-route HTML and meta tags, JSON-LD, sitemap, robots, 404
src/
  data/site.js             Firm details (name, licence, GSTIN, PAN, address, phones). Edit here only.
  data/images.js           Every photo: URL, alt text (EN + HI), photographer credit
  data/services.js         The seven services
  data/projects.js         Featured project quantities and the gallery
  data/routes.js           Route list (also drives the sitemap)
  i18n/locales/en.json     All English text, including page titles and descriptions ("seo")
  i18n/locales/hi.json     All Hindi text
  styles/global.css        Colours, type scale, spacing
  components/              Header, Hero, Lightbox, ContactForm, ...
  pages/                   One file per page
public/                    Favicon, share image, and folders for real photos and documents
```

Styling uses CSS Modules (`*.module.css` beside each component) with shared tokens in `src/styles/global.css`.

### Changing text

All copy is in the two locale files. Keep the same keys in both. The language switch is in the header and the choice is remembered in `localStorage` (`rk-lang`).

### Changing page titles and descriptions

Edit the `seo` block at the top of `src/i18n/locales/en.json` (and `hi.json`). The build writes them into each page's HTML.

## Photographs and credits

All current photos are stock photographs from [Unsplash](https://unsplash.com/license), loaded from the Unsplash CDN as AVIF or WebP with responsive sizes and a blurred placeholder. They are labelled "Stock photo" wherever they appear, the lightbox states that they do not show the firm's sites, and every photographer is credited in the footer ("Photo credits").

Three of them (`hillsGreen`, `hillVillage`, `valleyVillage`) were photographed in Himachal Pradesh; the rest are from elsewhere and are illustrative only.

When a stock photo is replaced with the firm's own, remove `credit` and `stock` from its entry and the label and credit disappear.

## SEO

- One HTML file per route with its own title, description, canonical link, Open Graph and Twitter tags, so WhatsApp and Facebook link previews are correct for every page.
- `LocalBusiness` JSON-LD with the address, phone numbers, licence number and GSTIN (`src/data/schema.js`).
- `sitemap.xml` and `robots.txt` are generated at build time from `VITE_SITE_URL`.
- Unknown URLs get `404.html` with `noindex`.

## Deploy

### Netlify

1. Push the project to GitHub, GitLab or Bitbucket.
2. In Netlify: **Add new site > Import an existing project**, pick the repository.
3. Build command `npm run build`, publish directory `dist` (both already set in `netlify.toml`).
4. **Site configuration > Environment variables**: add `VITE_SITE_URL` with the final address, for example `https://www.yourdomain.in`. If it is not set, the Netlify site address is used.
5. Deploy, then add the custom domain under **Domain management**.

Without Git: run `npm run build` and drag the `dist` folder onto https://app.netlify.com/drop.

### Vercel

1. Push the project to a Git repository.
2. In Vercel: **Add New > Project**, import the repository. The Vite preset is detected (build `npm run build`, output `dist`).
3. **Settings > Environment Variables**: add `VITE_SITE_URL`.
4. Deploy, then add the domain under **Settings > Domains**.

`vercel.json` turns on clean URLs so `/services` serves `services.html`.

### Other static hosts

Upload the contents of `dist`. The host must serve `services.html` for `/services` (and likewise for the other pages) and `404.html` for unknown paths.

## What was tested

Against the production build in Chrome:

- Language switch and persistence, page transitions, gallery filter, lightbox (keyboard, zoom, focus trap), contact form validation and the WhatsApp hand-off, mobile menu, 404 page, reduced-motion mode. No console errors.
- Lighthouse, run locally with the default mobile profile (slow 4G, 4x CPU slowdown): accessibility, best practices and SEO scored 100 on every page. Performance scored 99 on desktop. On mobile the home page scored between 74 and 93 over five runs (median 89) and the other pages 87 to 88. Mobile performance varies from run to run and should be measured again on the live domain.
