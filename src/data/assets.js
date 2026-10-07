// Built-in photos and stickers (files live in /public). Admin pickers list these.
const photo = (key, label) => ({ url: `/images/${key}.webp`, label });

export const PHOTOS = {
  p1: photo('p1', 'Pool party'),
  p2: photo('p2', 'Beach dog at sunset'),
  p3: photo('p3', 'Chatting on the beach'),
  p4: photo('p4', 'Feni on the beach'),
  p5: photo('p5', 'Uno in the pool'),
  p7: photo('p7', 'Scooters in Goa'),
  p8: photo('p8', 'Private yacht'),
  p9: photo('p9', 'Mangrove kayaking'),
  p10: photo('p10', 'Jamming session'),
  p11: photo('p11', 'Snowy road, Kashmir'),
  p12: photo('p12', 'Misty hills, Coorg'),
  p13: photo('p13', 'Varkala cliffs'),
  f1: photo('f1', 'Cliff sunset'),
  f2: photo('f2', 'Feni tasting'),
  f3: photo('f3', 'Beach towels'),
  f4: photo('f4', 'Beach cafe'),
  f5: photo('f5', 'Dusk squad'),
  f6: photo('f6', 'Beach shack sunset'),
  f7: photo('f7', 'Chorão ferry'),
  f8: photo('f8', 'Yacht (friends)'),
  m1: photo('m1', 'Fish thali (clay plate)'),
  m2: photo('m2', 'Fish thali (steel plate)'),
  m3: photo('m3', 'Sunset in the waves'),
  trek: photo('trek', 'Chorão trek'),
  aish: photo('aish', 'Aishwarya (host)'),
};

const sticker = (key, label) => ({ url: `/stickers/${key}.webp`, label });

export const STICKERS = {
  thali: sticker('thali', 'Fish thali'),
  feni: sticker('feni', 'Feni cocktail'),
  hat: sticker('hat', 'Straw hat'),
};

export const STICKER_OPTIONS = [
  { value: '', label: 'None' },
  ...Object.entries(STICKERS).map(([value, s]) => ({ value, label: s.label })),
];

export const BUILTIN_IMAGES = [
  ...Object.values(PHOTOS).map((p) => ({ ...p, group: 'Photos' })),
  ...['why-1', 'why-2', 'why-3', 'why-4', 'why-5', 'why-6', 'thali', 'feni', 'hat'].map((k) => ({
    url: `/stickers/${k}.webp`,
    label: k,
    group: 'Icons & stickers',
  })),
];

// Decorative floating stickers in the hero (design, not content).
export const HERO_STICKERS = [
  { src: '/stickers/hero-1.webp', style: { '--r': '-8deg', left: '-1%', top: '70px', width: 'clamp(70px,13vw,130px)' }, hide: false },
  { src: '/stickers/hero-2.webp', style: { '--r': '10deg', right: '2%', top: '60px', width: 'clamp(46px,7vw,70px)', animationDelay: '-2s' }, hide: false },
  { src: '/stickers/hero-3.webp', style: { '--r': '-10deg', left: '12%', top: '36%', width: '60px', animationDelay: '-1s' }, hide: true },
  { src: '/stickers/hero-4.webp', style: { '--r': '-6deg', left: '3%', bottom: '26px', width: 'clamp(70px,13vw,120px)', animationDelay: '-3s' }, hide: false },
  { src: '/stickers/hero-5.webp', style: { '--r': '6deg', right: '1%', bottom: '12px', width: 'clamp(110px,21vw,200px)', animationDelay: '-1.5s' }, hide: false },
  { src: '/stickers/hero-6.webp', style: { '--r': '8deg', right: '16%', top: '34%', width: '46px', animationDelay: '-4s' }, hide: true },
];
