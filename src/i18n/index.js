import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import hi from './locales/hi.json';

export const LANGUAGES = ['en', 'hi'];
const STORAGE_KEY = 'rk-lang';

// Saved choice first, then the browser language, then English.
function initialLanguage() {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (LANGUAGES.includes(saved)) return saved;
  } catch {
    // localStorage can be blocked (private mode); fall through.
  }
  return (navigator.language || '').toLowerCase().startsWith('hi') ? 'hi' : 'en';
}

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    hi: { translation: hi },
  },
  lng: initialLanguage(),
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
  react: { useSuspense: false },
});

document.documentElement.lang = i18n.language;

i18n.on('languageChanged', (lng) => {
  document.documentElement.lang = lng;
  try {
    window.localStorage.setItem(STORAGE_KEY, lng);
  } catch {
    // Ignore: the choice just will not persist.
  }
});

export default i18n;
