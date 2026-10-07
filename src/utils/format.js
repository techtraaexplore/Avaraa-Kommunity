// Small helpers shared by the site and the admin.

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function parseDate(value) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value || '');
  if (!m) return null;
  const [y, mo, d] = [Number(m[1]), Number(m[2]), Number(m[3])];
  if (mo < 1 || mo > 12 || d < 1 || d > 31) return null;
  return { y, mo, d, time: Date.UTC(y, mo - 1, d) };
}

/**
 * Work out everything the site prints about the Goa dates from just a start and end date:
 *  long "17 Oct – 19 Oct", short "17–19 Oct", "2 Nights, 3 Days", and the numbers {nights} {days}.
 */
export function planInfo(plan) {
  const a = parseDate(plan?.startDate);
  const b = parseDate(plan?.endDate);
  if (!a || !b || b.time < a.time) {
    return { valid: false, long: 'Dates TBA', short: 'Dates TBA', duration: '', nights: 0, days: 0 };
  }
  const nights = Math.round((b.time - a.time) / 86400000);
  const days = nights + 1;
  const sameMonth = a.mo === b.mo && a.y === b.y;
  const long = `${a.d} ${MONTHS[a.mo - 1]} – ${b.d} ${MONTHS[b.mo - 1]}`;
  const short = sameMonth
    ? `${a.d}–${b.d} ${MONTHS[a.mo - 1]}`
    : `${a.d} ${MONTHS[a.mo - 1]}–${b.d} ${MONTHS[b.mo - 1]}`;
  const duration = `${nights} Night${nights === 1 ? '' : 's'}, ${days} Day${days === 1 ? '' : 's'}`;
  return { valid: true, long, short, duration, nights, days };
}

/** Replace {nights}, {days}, {dates} in a string. */
export function fill(text, info) {
  return String(text ?? '')
    .replaceAll('{nights}', info.nights)
    .replaceAll('{days}', info.days)
    .replaceAll('{dates}', info.short);
}

/** Only allow links that are safe to put in an href/src. Returns '' for anything else. */
export function safeUrl(url) {
  const v = String(url ?? '').trim();
  if (!v) return '';
  if (v.startsWith('/') || v.startsWith('#')) return v;
  try {
    const u = new URL(v);
    return ['http:', 'https:', 'mailto:', 'tel:'].includes(u.protocol) ? v : '';
  } catch {
    return '';
  }
}

export const safeYoutubeId = (id) => (/^[\w-]{6,20}$/.test(String(id ?? '').trim()) ? String(id).trim() : '');

export const digits = (v) => String(v ?? '').replace(/\D/g, '');

export function isPlainObject(v) {
  return v !== null && typeof v === 'object' && !Array.isArray(v);
}

/** Fill gaps in saved content with the defaults (arrays and values from `saved` always win). */
export function mergeDefaults(defaults, saved) {
  if (!isPlainObject(defaults) || !isPlainObject(saved)) return saved === undefined ? defaults : saved;
  const out = { ...defaults };
  for (const key of Object.keys(saved)) {
    out[key] = key in defaults ? mergeDefaults(defaults[key], saved[key]) : saved[key];
  }
  return out;
}

export const clone = (v) => JSON.parse(JSON.stringify(v));

/** True once a real WhatsApp number (not the 91XXXXXXXXXX placeholder) is saved in Site settings. */
export const hasWhatsApp = (site) => digits(site?.whatsapp).length >= 10;

/**
 * wa.me link that opens a chat with the community number and a ready-typed message.
 * Returns "#spot" (the sign-up form) until a real number is set, so buttons never point at a dead link.
 */
export function whatsappLink(site, message) {
  if (!hasWhatsApp(site)) return '#spot';
  const text = message ?? site.whatsappMessage ?? '';
  return `https://wa.me/${digits(site.whatsapp)}${text ? `?text=${encodeURIComponent(text)}` : ''}`;
}
