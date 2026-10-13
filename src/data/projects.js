// Project data. Only the featured project below is real, supplied by the client.

export const featuredProject = {
  id: 'khuddi-gehra-1',
  // Real quantities from the work. These are the only numbers the site animates.
  stats: [
    { key: 'poles', value: 3, decimals: 0, unit: 'nos' },
    { key: 'staySets', value: 3, decimals: 0, unit: 'nos' },
    { key: 'acsr', value: 0.56, decimals: 2, unit: 'km' },
    { key: 'giWire', value: 0.28, decimals: 2, unit: 'km' },
  ],
};

export const galleryCategories = ['poles', 'lines', 'earthing', 'substation', 'terrain'];

// The gallery grid on the Projects page.
//
// type: 'site'  -> the firm's own site photo. While "src" is null the tile shows
//                  "Site photos coming soon".
// type: 'stock' -> an illustrative stock photo from images.js, always labelled.
//
// TO ADD A REAL SITE PHOTO
//   1. Save it as WebP (about 1600 px wide) in /public/projects/khuddi-gehra-1/
//   2. Fill in the matching 'site' entry, for example:
//        {
//          id: 'site-poles',
//          type: 'site',
//          category: 'poles',
//          src: '/projects/khuddi-gehra-1/poles-01.webp',
//          width: 1600,
//          height: 1200,
//          alt: { en: 'Steel tubular pole erected at Khuddi-Gehra', hi: '...' },
//        }
//   3. Add more 'site' entries as needed, then delete the stock entries.
export const gallery = [
  { id: 'site-poles', type: 'site', category: 'poles', src: null },
  { id: 'stock-pole-field', type: 'stock', category: 'poles', image: 'poleField' },
  { id: 'stock-lineman-stringing', type: 'stock', category: 'lines', image: 'linemanStringing' },
  { id: 'stock-hill-village', type: 'stock', category: 'terrain', image: 'hillVillage' },
  { id: 'site-stringing', type: 'site', category: 'lines', src: null },
  { id: 'stock-transformer-h', type: 'stock', category: 'substation', image: 'transformerH' },
  { id: 'stock-pole-top', type: 'stock', category: 'poles', image: 'poleTop' },
  { id: 'stock-lineman-close', type: 'stock', category: 'lines', image: 'linemanClose' },
  { id: 'site-earthing', type: 'site', category: 'earthing', src: null },
  { id: 'stock-hills-green', type: 'stock', category: 'terrain', image: 'hillsGreen' },
  { id: 'stock-lineman-bucket', type: 'stock', category: 'lines', image: 'linemanBucket' },
  { id: 'stock-transformer-pole', type: 'stock', category: 'substation', image: 'transformerPole' },
  { id: 'stock-tower-rural', type: 'stock', category: 'lines', image: 'towerRural' },
  { id: 'stock-sunset-towers', type: 'stock', category: 'lines', image: 'sunsetTowers' },
  { id: 'stock-towers', type: 'stock', category: 'lines', image: 'towers' },
];
