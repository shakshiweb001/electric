// Every photograph used on the site, in one place.
//
// ALL of these are stock photographs from Unsplash (https://unsplash.com/license),
// loaded from the Unsplash CDN. They are illustrative only and are labelled as
// stock wherever they could be mistaken for the firm's own work.
//
// To swap one for a real photo, put the file in /public/photos/ and change the
// entry to:  { src: '/photos/my-photo.webp', width: 1600, height: 1067, alt: {...} }
// (drop "credit" and "stock"). Local files are used as they are, without resizing.
//
// width / height are the original pixel dimensions.
// color is shown while the photo loads.
// focal ([x, y], 0 to 1) keeps the subject in frame when the photo is cropped.

const unsplash = (id) => `https://images.unsplash.com/${id}`;
const credit = (name, username, photoId) => ({
  name,
  profile: `https://unsplash.com/@${username}?utm_source=rk_govt_contractor&utm_medium=referral`,
  page: `https://unsplash.com/photos/${photoId}?utm_source=rk_govt_contractor&utm_medium=referral`,
});

export const images = {
  // REPLACE with real project photo from client
  hero: {
    src: unsplash('photo-1552965734-5b9e868808b6'),
    width: 6000,
    height: 4000,
    color: '#3c4a3a',
    focal: [0.68, 0.6],
    alt: {
      en: 'Electricity pylons above a pine forest with hills on the horizon at dusk',
      hi: 'सांझ के समय चीड़ के जंगल के ऊपर बिजली के टावर और पीछे पहाड़ियां',
    },
    credit: credit('Jaël Vallée', 'jv_photographer', 'BvpTdaKbCcQ'),
    stock: true,
  },

  // REPLACE with real project photo from client
  pylonHills: {
    src: unsplash('photo-1559713299-32256f2ef561'),
    width: 4986,
    height: 3324,
    color: '#2f4a4f',
    focal: [0.5, 0.45],
    alt: {
      en: 'Transmission tower beside a gravel road with forested mountains behind',
      hi: 'बजरी की सड़क के किनारे ट्रांसमिशन टावर, पीछे जंगल से ढके पहाड़',
    },
    credit: credit('Jay Heike', 'jayrheike', '54r-UkF1XeE'),
    stock: true,
  },

  // REPLACE with real project photo from client
  duskLine: {
    src: unsplash('photo-1709065713271-fff6dd3dc292'),
    width: 7081,
    height: 4723,
    color: '#7b380c',
    focal: [0.6, 0.45],
    alt: {
      en: 'Row of electricity poles receding towards hills under an amber sunset',
      hi: 'सुनहरे सूर्यास्त में पहाड़ियों की ओर जाती बिजली के खंभों की कतार',
    },
    credit: credit('Intricate Explorer', 'intricateexplorer', 'eyKM_OKEErY'),
    stock: true,
  },

  // REPLACE with real project photo from client
  hillSilhouette: {
    src: unsplash('photo-1756859287633-251bc85450e3'),
    width: 5184,
    height: 3888,
    color: '#4f352c',
    focal: [0.5, 0.6],
    alt: {
      en: 'Power lines above the silhouette of a hill against an orange evening sky',
      hi: 'नारंगी शाम के आसमान में पहाड़ी की छाया के ऊपर बिजली की तारें',
    },
    credit: credit('Sebastian Schuster', 'sschusterphotoart', 'MKgZbfcpvPU'),
    stock: true,
  },

  // REPLACE with real project photo from client
  // Photographed at Bohar, Himachal Pradesh.
  hillsGreen: {
    src: unsplash('photo-1629648760976-27cbd84de0b7'),
    width: 4208,
    height: 3120,
    color: '#554a2d',
    focal: [0.6, 0.55],
    alt: {
      en: 'Forested hills and blue ridges under a clear sky in Himachal Pradesh',
      hi: 'हिमाचल प्रदेश में साफ़ आसमान के नीचे हरी-भरी पहाड़ियां और नीली पर्वत श्रृंखलाएं',
    },
    credit: credit('Ashwani Sharma', 'ashwaniashu47', 'g6QLIoezlD8'),
    stock: true,
  },

  // REPLACE with real project photo from client
  // Photographed at Yangthang, Himachal Pradesh.
  hillVillage: {
    src: unsplash('photo-1769426702799-276c1986b5f3'),
    width: 4096,
    height: 2730,
    color: '#4d5131',
    focal: [0.4, 0.6],
    alt: {
      en: 'Houses of a small village on a steep wooded hillside in Himachal Pradesh',
      hi: 'हिमाचल प्रदेश में खड़ी, पेड़ों से ढकी पहाड़ी पर बसे छोटे गांव के घर',
    },
    credit: credit('Harish Bharti', 'natureandmylens', 'czUL1ZMm45I'),
    stock: true,
  },

  // REPLACE with real project photo from client
  // Photographed at Deohari, Manyashi, Himachal Pradesh.
  valleyVillage: {
    src: unsplash('photo-1641878778985-adf693d9ebec'),
    width: 4000,
    height: 2250,
    color: '#584537',
    focal: [0.55, 0.55],
    alt: {
      en: 'Village in a valley surrounded by mountains in Himachal Pradesh',
      hi: 'हिमाचल प्रदेश में पहाड़ों से घिरी घाटी में बसा गांव',
    },
    credit: credit('Manas Manikoth', 'manasmanikoth', 'lrm2dh_TI0A'),
    stock: true,
  },

  // REPLACE with real project photo from client
  poleField: {
    src: unsplash('photo-1562675838-f4c755178933'),
    width: 5738,
    height: 3825,
    color: '#4c4443',
    focal: [0.75, 0.5],
    alt: {
      en: 'Line of electricity poles crossing an open field',
      hi: 'खुले खेत से गुज़रती बिजली के खंभों की लाइन',
    },
    credit: credit('Pascal Debrunner', 'debrupas', 'DCPRY4QQpM4'),
    stock: true,
  },

  // REPLACE with real project photo from client
  poleTop: {
    src: unsplash('photo-1621425776684-686415ec3a27'),
    width: 5906,
    height: 3937,
    color: '#5c4a38',
    focal: [0.5, 0.5],
    alt: {
      en: 'Top of an electricity pole with conductors and fittings against the sky',
      hi: 'आसमान की पृष्ठभूमि में बिजली के खंभे का ऊपरी हिस्सा, तारें और फिटिंग',
    },
    credit: credit('Gilbert Nathaniel Salim', 'itsoonz', 'NfiePgrwnlk'),
    stock: true,
  },

  // REPLACE with real project photo from client
  polesPine: {
    src: unsplash('photo-1672591474147-5ac5b5adfa62'),
    width: 3560,
    height: 2670,
    color: '#3a3f3d',
    focal: [0.6, 0.5],
    alt: {
      en: 'Electricity poles and a pine tree silhouetted at dusk',
      hi: 'सांझ में बिजली के खंभों और चीड़ के पेड़ की छाया',
    },
    credit: credit('Ng Sze En', 'erniepanties', 'fsi65TwT1tA'),
    stock: true,
  },

  // REPLACE with real project photo from client
  linemanStringing: {
    src: unsplash('photo-1627207278573-58ecc196e08e'),
    width: 7087,
    height: 4724,
    color: '#293653',
    focal: [0.5, 0.6],
    alt: {
      en: 'Lineman on a pole handling a conductor against a blue sky',
      hi: 'नीले आसमान के नीचे खंभे पर तार संभालता लाइनमैन',
    },
    credit: credit('Javad Esmaeili', 'javad_esmaeili', '47cortCExgo'),
    stock: true,
  },

  // REPLACE with real project photo from client
  linemanBucket: {
    src: unsplash('photo-1595856421430-76c8b3aa6c1a'),
    width: 5454,
    height: 3636,
    color: '#2c394a',
    focal: [0.6, 0.5],
    alt: {
      en: 'Line worker in a helmet and safety vest working at the top of a pole',
      hi: 'हेलमेट और सेफ़्टी जैकेट पहने खंभे के ऊपर काम करता लाइन कर्मी',
    },
    credit: credit('Антон Дмитриев', 'ehmitrich', 'j4whez6CEL0'),
    stock: true,
  },

  // REPLACE with real project photo from client
  linemanClose: {
    src: unsplash('photo-1555963966-b7ae5404b6ed'),
    width: 6000,
    height: 4000,
    color: '#394656',
    focal: [0.65, 0.45],
    alt: {
      en: 'Line worker in a red helmet fixing a steel cable',
      hi: 'लाल हेलमेट पहने स्टील केबल कसता लाइन कर्मी',
    },
    credit: credit('Anton Dmitriev', 'adamanium', 'kBKOaghy8mU'),
    stock: true,
  },

  // REPLACE with real project photo from client
  transformerH: {
    src: unsplash('photo-1759138884006-0903cf0af1b2'),
    width: 6016,
    height: 4016,
    color: '#4f4b36',
    focal: [0.5, 0.5],
    alt: {
      en: 'Distribution transformer mounted between two poles, seen from below',
      hi: 'दो खंभों के बीच लगा वितरण ट्रांसफ़ॉर्मर, नीचे से लिया गया दृश्य',
    },
    credit: credit('Gavin Allanwood', 'fp4', 'lgBZ_GIqt3I'),
    stock: true,
  },

  // REPLACE with real project photo from client
  transformerPole: {
    src: unsplash('photo-1786561159138-761c4141424d'),
    width: 4081,
    height: 3668,
    color: '#575530',
    focal: [0.5, 0.55],
    alt: {
      en: 'Two transformers mounted on a pole with insulators and conductors',
      hi: 'खंभे पर लगे दो ट्रांसफ़ॉर्मर, इंसुलेटर और तारें',
    },
    credit: credit('Kiran Naidu', 'kn3446', 'ONBqQkBk7m0'),
    stock: true,
  },

  // REPLACE with real project photo from client
  towerRural: {
    src: unsplash('photo-1640200884478-b82ca5259556'),
    width: 6000,
    height: 4000,
    color: '#4e4832',
    focal: [0.8, 0.5],
    alt: {
      en: 'Transmission tower above trees in a hazy rural landscape',
      hi: 'धुंधले ग्रामीण परिदृश्य में पेड़ों के ऊपर ट्रांसमिशन टावर',
    },
    credit: credit('Sandip Kalal', 'atomsmasher', 'kEaRqJR0B5A'),
    stock: true,
  },

  // REPLACE with real project photo from client
  sunsetTowers: {
    src: unsplash('photo-1742818355579-c6d218315096'),
    width: 6000,
    height: 4000,
    color: '#4d342c',
    focal: [0.5, 0.6],
    alt: {
      en: 'Transmission towers and lines silhouetted against a sunset',
      hi: 'सूर्यास्त की पृष्ठभूमि में ट्रांसमिशन टावर और लाइनें',
    },
    credit: credit('Geon George', 'geongeorge', 'Q4CTTc-8lGQ'),
    stock: true,
  },

  // REPLACE with real project photo from client
  towers: {
    src: unsplash('photo-1413882353314-73389f63b6fd'),
    width: 4608,
    height: 3072,
    color: '#52534b',
    focal: [0.55, 0.5],
    alt: {
      en: 'Transmission towers carrying high-voltage lines across the sky',
      hi: 'आसमान में हाई-वोल्टेज लाइनें ले जाते ट्रांसमिशन टावर',
    },
    credit: credit('Fré Sonneveld', 'fresonneveld', 'q6n8nIrDQHE'),
    stock: true,
  },
};

export function altFor(image, lang) {
  if (!image?.alt) return '';
  if (typeof image.alt === 'string') return image.alt;
  return image.alt[lang] || image.alt.en || '';
}

// One entry per photographer-credited photo, for the footer credit list.
export const creditedImages = Object.entries(images)
  .filter(([, image]) => image.credit)
  .map(([key, image]) => ({ key, ...image }));
