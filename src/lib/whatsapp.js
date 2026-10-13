import { site } from '../data/site.js';

// https://wa.me/<number>?text=<prefilled message>
export function whatsappLink(text) {
  const base = `https://wa.me/${site.whatsapp}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}
