// What the admin can edit. Each page has "blocks"; each block edits one top-level key of the content
// (see src/data/defaultContent.js) using the field types in components/admin/Fields.jsx.
import { STICKER_OPTIONS } from '../../data/assets.js';
import { planInfo } from '../../utils/format.js';

const trim = (s, n = 48) => (s && s.length > n ? `${s.slice(0, n)}…` : s);

const photoItem = {
  type: 'list',
  label: 'Photos',
  itemLabel: 'Photo',
  title: (p) => p.caption,
  newItem: () => ({ image: '', caption: '', alt: '' }),
  fields: [
    { key: 'image', type: 'image', label: 'Photo' },
    { key: 'caption', type: 'text', label: 'Caption' },
    { key: 'alt', type: 'text', label: 'Describe the photo (for screen readers)', help: 'Optional. Falls back to the caption.' },
  ],
};

export const PAGES = [
  {
    id: 'site',
    label: 'Site & hero',
    icon: '🏠',
    intro: 'The top of the page, the scrolling banner, the footer and the sign-up form.',
    blocks: [
      {
        title: 'Site settings',
        key: 'site',
        fields: [
          { key: 'title', type: 'text', label: 'Browser tab title' },
          { key: 'whatsapp', type: 'text', label: 'WhatsApp number', help: 'Country code + number, digits only. Example: 919876543210. Used by the floating WhatsApp button, the hero button, the footer link and the sign-up form.' },
          { key: 'whatsappMessage', type: 'textarea', label: 'WhatsApp message people start with', help: 'Already typed into the chat when someone taps a WhatsApp button. They can edit it before sending.' },
          { key: 'whatsappLabel', type: 'text', label: 'Text beside the floating WhatsApp button', help: 'Shown on computers. Phones show only the icon.' },
          { key: 'instagram', type: 'url', label: 'Instagram link', placeholder: 'https://instagram.com/…' },
          { key: 'privacyUrl', type: 'url', label: 'Privacy Policy link' },
          { key: 'termsUrl', type: 'url', label: 'Terms & Cancellation link' },
          { key: 'marquee', type: 'text', label: 'Scrolling yellow banner text' },
          { key: 'footerNote', type: 'text', label: 'Footer line' },
        ],
      },
      {
        title: 'Hero (the first screen)',
        key: 'hero',
        fields: [
          { key: 'kicker', type: 'text', label: 'Small line above the headline' },
          { key: 'titleLine1', type: 'text', label: 'Headline, line 1' },
          { key: 'titleLine2', type: 'text', label: 'Headline, line 2' },
          { key: 'lead', type: 'textarea', label: 'Intro text' },
          { key: 'primaryCta', type: 'text', label: 'Yellow button' },
          { key: 'secondaryCta', type: 'text', label: 'White button (opens WhatsApp)' },
          { ...photoItem, key: 'polaroids', label: 'Polaroid photos (3 looks best)' },
        ],
      },
      {
        title: 'Sign-up form',
        key: 'cta',
        fields: [
          { key: 'tag', type: 'text', label: 'Tag above the heading' },
          { key: 'heading', type: 'text', label: 'Heading' },
          { key: 'text', type: 'textarea', label: 'Text under the heading' },
          { key: 'button', type: 'text', label: 'Button text' },
        ],
      },
    ],
  },
  {
    id: 'trips',
    label: 'Trips',
    icon: '🧭',
    intro: 'The trip cards. The Goa card takes its dates and length from the Goa plan page.',
    blocks: [
      {
        title: 'Trips section',
        key: 'trips',
        fields: [
          { key: 'heading', type: 'text', label: 'Heading' },
          { key: 'subheading', type: 'text', label: 'Line under the heading' },
          {
            key: 'filters',
            type: 'list',
            label: 'Filter buttons',
            itemLabel: 'Filter',
            title: (f) => f.label,
            newItem: () => ({ label: '', key: '' }),
            fields: [
              { key: 'label', type: 'text', label: 'Button text' },
              { key: 'key', type: 'text', label: 'Tag it matches', help: 'Use "all" for the first button. Other buttons show trips that have this tag.' },
            ],
          },
          {
            key: 'items',
            type: 'list',
            label: 'Trips',
            itemLabel: 'Trip',
            title: (t) => `${t.name || 'New trip'}${t.status === 'booking' ? ' · now booking' : ' · coming soon'}`,
            newItem: () => ({
              name: '',
              status: 'soon',
              badge: '',
              image: '',
              imageAlt: '',
              tags: [],
              linkedToPlan: false,
              duration: '',
              dates: 'Dates TBA',
              description: '',
              priceLabel: 'Coming soon',
              ctaLabel: 'Tell me first',
              ctaTarget: 'form',
            }),
            fields: [
              { key: 'name', type: 'text', label: 'Trip name' },
              { key: 'status', type: 'select', label: 'Status', options: [{ value: 'booking', label: 'Now booking' }, { value: 'soon', label: 'Coming soon' }] },
              { key: 'badge', type: 'text', label: 'Yellow badge on the photo', help: 'Leave empty for no badge. Example: Now booking' },
              { key: 'image', type: 'image', label: 'Card photo' },
              { key: 'imageAlt', type: 'text', label: 'Describe the photo (for screen readers)' },
              { key: 'tags', type: 'tags', label: 'Tags', placeholder: 'beach, party', help: 'Comma separated. Used by the filter buttons.' },
              { key: 'description', type: 'textarea', label: 'Short description' },
              { key: 'linkedToPlan', type: 'toggle', label: 'Take dates and length from the Goa plan page', help: 'Turn this on only for Goa.' },
              { key: 'duration', type: 'text', label: 'Length', placeholder: '2 Nights, 3 Days', showIf: (t) => !t.linkedToPlan },
              { key: 'dates', type: 'text', label: 'Dates', placeholder: '17–19 Oct or Dates TBA', showIf: (t) => !t.linkedToPlan },
              { key: 'priceLabel', type: 'text', label: 'Price / status text', placeholder: '₹9,999 or Coming soon' },
              { key: 'ctaLabel', type: 'text', label: 'Button text' },
              { key: 'ctaTarget', type: 'select', label: 'Button goes to', options: [{ value: 'plan', label: 'The Goa plan section' }, { value: 'form', label: 'The sign-up form (picks this trip)' }] },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'goa',
    label: 'Goa plan',
    icon: '🌴',
    intro: 'Dates, day-by-day itinerary, what is included, price and booking steps.',
    blocks: [
      {
        title: 'Dates & host',
        key: 'goa',
        fields: [
          { key: 'name', type: 'text', label: 'Trip name' },
          { key: 'kicker', type: 'text', label: 'Small line above the dates' },
          { key: 'startDate', type: 'date', label: 'First day' },
          { key: 'endDate', type: 'date', label: 'Last day' },
          {
            type: 'info',
            render: (g) => {
              const i = planInfo(g);
              return i.valid ? `The site will show: ${i.long} · ${i.duration}` : 'Pick a first and last day (the last day can not be before the first).';
            },
          },
          { key: 'host', type: 'text', label: 'Host first name', help: 'Shown as "hosted by …".' },
        ],
      },
      {
        title: 'Day-by-day plan',
        key: 'goa',
        help: 'Each day becomes a tab (Day 1, Day 2…). Add or remove days to match the trip.',
        fields: [
          {
            key: 'days',
            type: 'list',
            label: 'Days',
            itemLabel: 'Day',
            title: (d, i) => `Day ${i + 1}: ${d.title || ''}`,
            newItem: () => ({ title: '', bullets: [], chips: [], note: '', photos: [] }),
            fields: [
              { key: 'title', type: 'text', label: 'Day title' },
              { key: 'bullets', type: 'strings', label: 'What happens', addLabel: 'Add activity' },
              { key: 'chips', type: 'strings', label: 'Highlight tags (optional)', addLabel: 'Add tag' },
              { key: 'note', type: 'text', label: 'Big closing line (optional)' },
              {
                key: 'photos',
                type: 'list',
                label: 'Photos for this day',
                itemLabel: 'Photo',
                title: (p) => p.caption,
                newItem: () => ({ image: '', caption: '', alt: '', sticker: '' }),
                fields: [
                  { key: 'image', type: 'image', label: 'Photo' },
                  { key: 'caption', type: 'text', label: 'Caption' },
                  { key: 'alt', type: 'text', label: 'Describe the photo (for screen readers)' },
                  { key: 'sticker', type: 'select', label: 'Little sticker on the corner', options: STICKER_OPTIONS },
                ],
              },
            ],
          },
        ],
      },
      {
        title: 'Included & not included',
        key: 'goa',
        help: 'You can type {nights}, {days} or {dates} in any line. They are filled in from the dates above.',
        fields: [
          { key: 'included', type: 'strings', label: 'Included', addLabel: 'Add line' },
          { key: 'notIncluded', type: 'strings', label: 'Not included', addLabel: 'Add line' },
        ],
      },
      {
        title: 'Price & booking steps',
        key: 'goa',
        fields: [
          {
            key: 'price',
            type: 'group',
            label: 'Price card',
            fields: [
              { key: 'amount', type: 'text', label: 'Price' },
              { key: 'note', type: 'text', label: 'Small text under the price' },
              { key: 'tag', type: 'text', label: 'Tag' },
            ],
          },
          {
            key: 'steps',
            type: 'list',
            label: 'Booking steps',
            itemLabel: 'Step',
            title: (s, i) => `${i + 1}. ${trim(s.title)}`,
            newItem: () => ({ title: '', text: '' }),
            fields: [
              { key: 'title', type: 'text', label: 'Bold part' },
              { key: 'text', type: 'textarea', label: 'Rest of the sentence' },
            ],
          },
          { key: 'warnings', type: 'strings', label: 'Notes at the bottom', multiline: true, addLabel: 'Add note' },
        ],
      },
    ],
  },
  {
    id: 'reels',
    label: 'Reels',
    icon: '🎬',
    intro: 'Tap-to-play reels. A reel shows "Reel soon" until you give it a video link or a YouTube Shorts ID.',
    blocks: [
      {
        title: 'Reels section',
        key: 'reels',
        fields: [
          { key: 'enabled', type: 'toggle', label: 'Show this section on the site', default: true },
          { key: 'kicker', type: 'text', label: 'Small line above the heading' },
          { key: 'heading', type: 'text', label: 'Heading' },
          { key: 'lede', type: 'text', label: 'Line under the heading' },
          {
            key: 'items',
            type: 'list',
            label: 'Reels',
            itemLabel: 'Reel',
            title: (r) => r.title,
            newItem: () => ({ title: '', subtitle: '', image: '', alt: '', videoUrl: '', youtubeId: '' }),
            fields: [
              { key: 'title', type: 'text', label: 'Title' },
              { key: 'subtitle', type: 'text', label: 'Small text under the title' },
              { key: 'image', type: 'image', label: 'Cover photo' },
              { key: 'alt', type: 'text', label: 'Describe the photo (for screen readers)' },
              { key: 'videoUrl', type: 'url', label: 'Video link (mp4)', help: 'Upload the video to your hosting and paste its link here. Or use a YouTube ID below.' },
              { key: 'youtubeId', type: 'text', label: 'YouTube Shorts ID', help: 'The part after /shorts/ in the link. Example: dQw4w9WgXcQ' },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'host',
    label: 'Host',
    icon: '👋',
    intro: 'The "Hiiii, I\'m …" card.',
    blocks: [
      {
        title: 'Host card',
        key: 'host',
        fields: [
          { key: 'greeting', type: 'text', label: 'Greeting' },
          { key: 'name', type: 'text', label: 'Name line' },
          { key: 'photo', type: 'image', label: 'Photo' },
          { key: 'photoAlt', type: 'text', label: 'Describe the photo (for screen readers)' },
          { key: 'paragraphs', type: 'strings', label: 'Paragraphs', multiline: true, addLabel: 'Add paragraph' },
          { key: 'chips', type: 'strings', label: 'Small tags', addLabel: 'Add tag' },
        ],
      },
    ],
  },
  {
    id: 'reviews',
    label: 'Reviews',
    icon: '⭐',
    intro: 'Traveller quotes. Replace the placeholder text with real reviews.',
    blocks: [
      {
        title: 'Traveller reviews',
        key: 'reviews',
        fields: [
          { key: 'enabled', type: 'toggle', label: 'Show this section on the site', default: true },
          { key: 'kicker', type: 'text', label: 'Small line above the heading' },
          { key: 'heading', type: 'text', label: 'Heading' },
          { key: 'lede', type: 'text', label: 'Line under the heading' },
          { key: 'ctaQuote', type: 'text', label: 'Last card text' },
          { key: 'ctaLabel', type: 'text', label: 'Last card button' },
          {
            key: 'items',
            type: 'list',
            label: 'Reviews',
            itemLabel: 'Review',
            title: (r) => `${r.name || 'Traveller'}: ${trim(r.quote, 36)}`,
            newItem: () => ({ published: true, quote: '', name: '', trip: 'Goa trip', stars: 5 }),
            fields: [
              { key: 'published', type: 'toggle', label: 'Show this review', default: true },
              { key: 'quote', type: 'textarea', label: 'What they said' },
              { key: 'name', type: 'text', label: 'Name' },
              { key: 'trip', type: 'text', label: 'Trip' },
              { key: 'stars', type: 'number', label: 'Stars (1 to 5)', min: 1, max: 5 },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'payment',
    label: 'Payment',
    icon: '💳',
    intro: 'Bank details and the QR code shown in the Payment section. Double-check every number before you save.',
    blocks: [
      {
        title: 'Payment section',
        key: 'payment',
        fields: [
          { key: 'enabled', type: 'toggle', label: 'Show this section on the site', default: true },
          { key: 'kicker', type: 'text', label: 'Small line above the heading' },
          { key: 'heading', type: 'text', label: 'Heading' },
          { key: 'lede', type: 'text', label: 'Line under the heading' },
          { key: 'upiTitle', type: 'text', label: 'UPI box title' },
          { key: 'upiId', type: 'text', label: 'UPI ID', placeholder: 'name@bank', help: 'People can tap it to pay, and the Google Pay / PhonePe / Paytm buttons use it. Leave empty to hide the UPI box.' },
          { key: 'upiName', type: 'text', label: 'Name shown in the UPI app' },
          { key: 'upiAmount', type: 'text', label: 'Amount pre-filled in the app', placeholder: '5000', help: 'Numbers only (no ₹). Leave empty to let people type the amount.' },
          { key: 'upiNote', type: 'text', label: 'Remark shown in the UPI app' },
          { key: 'upiHint', type: 'text', label: 'Small line under the app buttons' },
          {
            key: 'tiles',
            type: 'list',
            label: 'Amount boxes (advance, balance)',
            itemLabel: 'Box',
            title: (t) => `${t.label || 'Box'}: ${t.amount || ''}`,
            newItem: () => ({ label: '', amount: '', text: '' }),
            fields: [
              { key: 'label', type: 'text', label: 'Small label', placeholder: 'Advance' },
              { key: 'amount', type: 'text', label: 'Amount', placeholder: '₹5,000' },
              { key: 'text', type: 'text', label: 'Short line under the amount' },
            ],
          },
          { key: 'bankTitle', type: 'text', label: 'Bank details heading (opens when tapped)' },
          {
            key: 'rows',
            type: 'list',
            label: 'Bank details',
            itemLabel: 'Detail',
            title: (r) => `${r.label || 'Detail'}: ${trim(r.value, 30)}`,
            newItem: () => ({ label: '', value: '', copy: false }),
            fields: [
              { key: 'label', type: 'text', label: 'Label', placeholder: 'IFSC code' },
              { key: 'value', type: 'text', label: 'Value' },
              { key: 'copy', type: 'toggle', label: 'Show a Copy button', default: false },
            ],
          },
          { key: 'qrTitle', type: 'text', label: 'QR title' },
          { key: 'qrImage', type: 'image', label: 'QR code image' },
          { key: 'qrAlt', type: 'text', label: 'Describe the QR (for screen readers)' },
          { key: 'qrNote', type: 'text', label: 'Line under the QR' },
          { key: 'notes', type: 'strings', label: 'Notes under the card', addLabel: 'Add note' },
          { key: 'ctaLabel', type: 'text', label: 'Button text (goes to the sign-up form)' },
        ],
      },
    ],
  },
  {
    id: 'sections',
    label: 'Why, Who & FAQ',
    icon: '💬',
    intro: 'The "Why choose Avaraa?", "Who is this for?" and FAQ sections.',
    blocks: [
      {
        title: 'Why choose Avaraa?',
        key: 'why',
        fields: [
          { key: 'kicker', type: 'text', label: 'Small line above the heading' },
          { key: 'heading', type: 'text', label: 'Heading' },
          { key: 'cta', type: 'text', label: 'Button text' },
          {
            key: 'items',
            type: 'list',
            label: 'Reasons',
            itemLabel: 'Reason',
            title: (w) => w.title,
            newItem: () => ({ icon: '/stickers/why-1.webp', title: '', text: '' }),
            fields: [
              { key: 'icon', type: 'image', label: 'Icon' },
              { key: 'title', type: 'text', label: 'Title' },
              { key: 'text', type: 'textarea', label: 'Text' },
            ],
          },
        ],
      },
      {
        title: 'Who is this for?',
        key: 'who',
        fields: [
          { key: 'heading', type: 'text', label: 'Heading' },
          { key: 'subheading', type: 'text', label: 'Line under the heading' },
          { key: 'items', type: 'strings', label: 'Cards', multiline: true, addLabel: 'Add card' },
          { key: 'closing', type: 'text', label: 'Yellow line at the bottom' },
        ],
      },
      {
        title: 'FAQ',
        key: 'faq',
        fields: [
          { key: 'heading', type: 'text', label: 'Heading' },
          {
            key: 'items',
            type: 'list',
            label: 'Questions',
            itemLabel: 'Question',
            title: (q) => q.q,
            newItem: () => ({ q: '', a: '' }),
            fields: [
              { key: 'q', type: 'text', label: 'Question' },
              { key: 'a', type: 'textarea', label: 'Answer', rows: 4 },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'galleries',
    label: 'Photo galleries',
    icon: '📸',
    intro: 'The "Happy faces" strip and the "Moments wall".',
    blocks: [
      {
        title: 'Happy faces (sliding strip)',
        key: 'faces',
        fields: [
          { key: 'enabled', type: 'toggle', label: 'Show this section on the site', default: true },
          { key: 'kicker', type: 'text', label: 'Small line above the heading' },
          { key: 'heading', type: 'text', label: 'Heading' },
          {
            key: 'items',
            type: 'list',
            label: 'Photos',
            itemLabel: 'Photo',
            title: (p) => p.caption,
            newItem: () => ({ image: '', caption: '' }),
            fields: [
              { key: 'image', type: 'image', label: 'Photo' },
              { key: 'caption', type: 'text', label: 'Caption' },
            ],
          },
        ],
      },
      {
        title: 'Moments wall',
        key: 'moments',
        fields: [
          { key: 'enabled', type: 'toggle', label: 'Show this section on the site', default: true },
          { key: 'heading', type: 'text', label: 'Heading' },
          { key: 'footnote', type: 'text', label: 'Small line at the bottom' },
          { ...photoItem, key: 'items', label: 'Photos' },
        ],
      },
    ],
  },
];
