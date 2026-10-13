// Single source of truth for the firm's details.
// Everything here was supplied by the client. Do not add anything that is not verified.

export const site = {
  name: 'M/s R.K. Govt. Contractor',
  shortName: 'R.K. Govt. Contractor',
  contractorClass: 'A',
  licenceNo: 'A-1578',
  gstin: '02AKSPL4411A1ZQ',
  address: {
    line1: 'Vill. Doh, P.O. Badhani',
    line2: 'Teh. Bhoranj, Distt. Hamirpur (H.P.)',
    full: 'Vill. Doh, P.O. Badhani, Teh. Bhoranj, Distt. Hamirpur (H.P.)',
    district: 'Hamirpur',
    region: 'Himachal Pradesh',
    country: 'IN',
  },
  phones: {
    primary: '9816335541',
    alternate: '8988001395',
  },
  // WhatsApp number in international format, digits only.
  whatsapp: '919816335541',
};

// Visible "PLACEHOLDER" blocks mark every spot where real data is still missing
// (proprietor name, email, document scans, more projects...).
// Set this to false to hide them all once the site is ready to go live.
export const SHOW_PLACEHOLDERS = true;

// "9816335541" -> "98163 35541"
export function formatPhone(number) {
  return `${number.slice(0, 5)} ${number.slice(5)}`;
}

export function telHref(number) {
  return `tel:+91${number}`;
}

export const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  'Badhani, Bhoranj, Hamirpur, Himachal Pradesh'
)}`;
