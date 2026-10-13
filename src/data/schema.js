import { site } from './site.js';

// LocalBusiness structured data, written into every HTML file at build time.
// Only verified details are included: no opening hours, coordinates or ratings.
export function buildJsonLd(siteUrl) {
  const services = [
    'Steel tubular pole erection (9/8 m)',
    'LT line extension',
    'ACSR conductor stringing (30 mm²)',
    'LT stay sets and stay wire',
    'Earthing (GI wire 8 SWG, earthing set, earth knob)',
    'RCC muff pipe supply (ISI, IS 458-1988)',
    'Electrical material supply (shackle insulators, D-iron, nuts and bolts, aluminium paint)',
  ];

  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${siteUrl}/#business`,
    name: site.name,
    description:
      'A-Class government electrical contractor in Hamirpur, Himachal Pradesh (Lic. No. A-1578): steel tubular pole erection, LT line extension, ACSR conductor stringing, stay sets, earthing and line material supply.',
    url: `${siteUrl}/`,
    image: `${siteUrl}/og-image.jpg`,
    telephone: `+91-${site.phones.primary}`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Vill. Doh, P.O. Badhani, Teh. Bhoranj',
      addressLocality: site.address.district,
      addressRegion: site.address.region,
      addressCountry: site.address.country,
    },
    areaServed: { '@type': 'State', name: site.address.region },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: `+91-${site.phones.primary}`,
        contactType: 'customer service',
        availableLanguage: ['en', 'hi'],
      },
      {
        '@type': 'ContactPoint',
        telephone: `+91-${site.phones.alternate}`,
        contactType: 'customer service',
        availableLanguage: ['en', 'hi'],
      },
    ],
    taxID: site.gstin,
    identifier: [
      {
        '@type': 'PropertyValue',
        name: 'Electrical contractor licence (A-Class)',
        value: site.licenceNo,
      },
      { '@type': 'PropertyValue', name: 'GSTIN', value: site.gstin },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Electrical contracting services',
      itemListElement: services.map((name) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name },
      })),
    },
  };
}
