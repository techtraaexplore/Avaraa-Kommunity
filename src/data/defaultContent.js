// Everything the public website shows lives here as data.
// The admin panel edits a copy of this object and the server stores it in server/data/content.json.
// If nothing has been saved yet, the site falls back to exactly this.
//
// In goa.included / goa.notIncluded / goa.steps you can use {nights}, {days} and {dates}.
// They are filled in from the Goa start and end dates, so you never type the numbers twice.

const img = (k) => `/images/${k}.webp`;
const st = (k) => `/stickers/${k}.webp`;

const defaultContent = {
  site: {
    title: 'Avaraa Kommunity · Find your tribe',
    whatsapp: '917411765832', // country code + number, digits only. Powers every WhatsApp button on the site.
    whatsappMessage: "Hi Avaraa Kommunity! I'd like to know more about your trips.", // typed into the chat for the visitor
    whatsappLabel: 'Chat on WhatsApp', // text next to the floating button (desktop)
    instagram: '',
    privacyUrl: '',
    termsUrl: '',
    marquee: 'GOA IS ONNN ✺ COORG ✺ VARKALA ✺ KASHMIR ✺ COME SOLO ✺ LEAVE WITH FRIENDS ✺ ',
    footerNote: 'Goa is onnn!!!',
  },

  hero: {
    kicker: 'Avaraa Kommunity',
    titleLine1: 'FIND YOUR',
    titleLine2: 'TRIBE.',
    lead: 'Hosted trips for 18–30 year-olds. Come solo, leave with friends and a very full camera roll.',
    primaryCta: 'See upcoming trips',
    secondaryCta: 'Chat on WhatsApp',
    polaroids: [
      { image: img('p1'), caption: 'Pool party', alt: 'Friends toasting in a pool at night' },
      { image: img('p8'), caption: 'Yacht sunset', alt: 'Friends on a private yacht' },
      { image: img('p2'), caption: 'Beach days', alt: 'Girl petting a dog on the beach at sunset' },
    ],
  },

  trips: {
    heading: 'Upcoming trips',
    subheading: "choose your vibe, we'll sort the tribe",
    filters: [
      { label: 'All', key: 'all' },
      { label: 'Beach', key: 'beach' },
      { label: 'Hills', key: 'hills' },
      { label: 'Party', key: 'party' },
      { label: 'Slow', key: 'slow' },
    ],
    items: [
      {
        name: 'Goa',
        status: 'booking',
        badge: 'Now booking',
        image: img('p8'),
        imageAlt: 'Friends on a private yacht in Goa',
        tags: ['beach', 'party'],
        linkedToPlan: true,
        duration: '',
        dates: '',
        description: 'Offbeat Goa: pool party, mangroves, feni cocktails and a private yacht sunset.',
        priceLabel: '₹9,999',
        ctaLabel: 'See the plan',
        ctaTarget: 'plan',
      },
      {
        name: 'Coorg',
        status: 'soon',
        badge: '',
        image: img('p12'),
        imageAlt: 'Misty green hills of Coorg',
        tags: ['hills', 'slow'],
        linkedToPlan: false,
        duration: '2 Nights, 3 Days',
        dates: 'Dates TBA',
        description: 'Coffee estates, misty hills, a waterfall most people never find.',
        priceLabel: 'Coming soon',
        ctaLabel: 'Tell me first',
        ctaTarget: 'form',
      },
      {
        name: 'Varkala',
        status: 'soon',
        badge: '',
        image: img('p13'),
        imageAlt: 'Varkala beach and cliffs',
        tags: ['beach', 'slow'],
        linkedToPlan: false,
        duration: '2 Nights, 3 Days',
        dates: 'Dates TBA',
        description: 'Cliffside cafes, sunset yoga, backwaters, slow evenings.',
        priceLabel: 'Coming soon',
        ctaLabel: 'Tell me first',
        ctaTarget: 'form',
      },
      {
        name: 'Kashmir',
        status: 'soon',
        badge: '',
        image: img('p11'),
        imageAlt: 'Snowy road in Kashmir',
        tags: ['hills'],
        linkedToPlan: false,
        duration: '4 Nights, 5 Days',
        dates: 'Dates TBA',
        description: 'The one trip on the calendar worth taking a few extra days for.',
        priceLabel: 'Coming soon',
        ctaLabel: 'Tell me first',
        ctaTarget: 'form',
      },
    ],
  },

  goa: {
    name: 'Goa',
    kicker: 'offbeat · now booking',
    startDate: '2026-10-17',
    endDate: '2026-10-19',
    host: 'Aishwarya',
    days: [
      {
        title: 'Check-in & pool party',
        bullets: [
          'Check-in at the hotel',
          'Pool party, 2 hours (4 PM – 6 PM)',
          'Jamming session: guitars, beats, bad singing, and surprisingly good chemistry',
          'One pool, zero awkward silence',
        ],
        chips: [],
        note: '',
        photos: [
          { image: img('p1'), caption: 'Pool party', alt: 'Friends toasting in the pool', sticker: 'thali' },
          { image: img('p5'), caption: 'Uno, but wet', alt: 'Uno cards played in a pool', sticker: '' },
          { image: img('p10'), caption: 'Jamming session', alt: 'Friends jamming with a guitar at night', sticker: '' },
        ],
      },
      {
        title: 'Chorão Island & yacht',
        bullets: ['Breakfast', 'Chorão Island visit, the quieter side of Goa', 'Lunch at Chorão'],
        chips: ['Mangrove boat ride', 'Trek', 'Feni tasting', 'Feni cocktail class'],
        note: 'Then: a private yacht experience with a sunset evening.',
        photos: [
          { image: img('p9'), caption: 'Mangrove kayaking', alt: 'Friends kayaking through mangroves', sticker: '' },
          { image: img('f7'), caption: 'Chorão ferry', alt: 'Friends on the Chorão ferry', sticker: '' },
          { image: img('trek'), caption: 'Chorão trek', alt: 'Friends trekking through a green forest', sticker: '' },
          { image: img('f2'), caption: 'Feni tasting', alt: 'Friends toasting with copper cups at a feni tasting', sticker: 'feni' },
          { image: img('f8'), caption: 'Private yacht', alt: 'Friends on a private yacht', sticker: '' },
        ],
      },
      {
        title: 'Beach & departure',
        bullets: ['Beach time: no agenda, just people', 'Check-out', 'Departure'],
        chips: [],
        note: '',
        photos: [
          { image: img('f3'), caption: 'Beach time', alt: 'Friends relaxing on beach towels', sticker: 'hat' },
          { image: img('p3'), caption: 'No agenda, just people', alt: 'Friends chatting on the beach', sticker: '' },
          { image: img('f6'), caption: "Sunset o'clock", alt: 'Friends toasting at a beach shack at sunset', sticker: '' },
        ],
      },
    ],
    included: [
      '{nights} nights accommodation',
      'Breakfasts as per itinerary',
      'Lunch at Chorão',
      'Pool party & jamming session',
      'Chorão Island experience',
      'Yacht experience',
      'Beach & curated group activities',
      'Trip hosting & coordination',
    ],
    notIncluded: [
      'Travel to and from Goa (Goa-to-Goa package)',
      'All dinners and other meals',
      'Alcohol and drinks, unless mentioned as included',
      'Shopping & personal expenses',
      'Activities not in the itinerary',
      'Extras from personal requirements',
    ],
    price: { amount: '₹9,999', note: 'per person, incl. GST', tag: 'Goa → Goa' },
    steps: [
      { title: 'Save your spot.', text: 'Fill the form below or message us on WhatsApp.' },
      { title: 'Pay the ₹5,000 advance.', text: "We'll send payment details on WhatsApp. This blocks your slot." },
      { title: 'Pay the balance before the deadline.', text: 'Booking is confirmed only after full payment.' },
    ],
    warnings: [
      'Girls travelling solo: your host Aishwarya is with the group all trip, groups stay small, and you can message her on WhatsApp before you book.',
      'The advance is non-refundable in case of cancellation.',
    ],
  },

  reels: {
    enabled: true,
    kicker: 'goa, in motion',
    heading: 'Watch the trip first',
    lede: 'Tap a reel and see how the days actually feel.',
    // To make a reel playable, set a video link (mp4) or a YouTube Shorts ID. Until then it shows "Reel soon".
    items: [
      { title: 'Pool party + jamming', subtitle: 'Day 1', image: img('p1'), alt: 'Friends toasting in the pool', videoUrl: '', youtubeId: '' },
      { title: 'Chorão Island', subtitle: 'Day 2', image: img('p9'), alt: 'Friends kayaking through mangroves', videoUrl: '', youtubeId: '' },
      { title: 'Yacht sunset', subtitle: 'Day 2', image: img('f8'), alt: 'Friends on a private yacht', videoUrl: '', youtubeId: '' },
      { title: 'Beach, no agenda', subtitle: 'Day 3', image: img('m3'), alt: 'Girl standing in the waves at sunset', videoUrl: '', youtubeId: '' },
      { title: 'Thali time', subtitle: 'Goa on a plate', image: img('m2'), alt: 'Crumb-fried fish thali on a steel plate', videoUrl: '', youtubeId: '' },
    ],
  },

  host: {
    greeting: 'Hiiiiiiii,',
    name: "I'm Aishwarya",
    photo: img('aish'),
    photoAlt: 'Aishwarya Prabhu smiling with her arms stretched out on a rooftop at night, city lights behind her',
    paragraphs: [
      "This trip is hosted by Aishwarya Prabhu, someone who's spent years travelling, hosting, and living between trips to Goa, figuring out what actually makes a trip good.",
      "We organise trips for 18 to 30 year-olds who want more than a checklist. If you love to party, you'll fit right in. If you're happiest outdoors or by the water, same thing. And if you're travelling solo and hoping to make real friends along the way, you'll love it here.",
      "Great for anyone who just wants good people, good places, and a few days that don't feel like a routine.",
    ],
    chips: ['Hosts the Goa trip', 'With the group all trip', 'Message her before you book'],
  },

  faces: {
    enabled: true,
    kicker: 'come solo, leave with friends',
    heading: 'Happy faces',
    items: [
      { image: img('p1'), caption: 'Pool party' },
      { image: img('p4'), caption: "Feni o'clock" },
      { image: img('f5'), caption: 'Dusk squad' },
      { image: img('f2'), caption: 'Feni tasting' },
      { image: img('p10'), caption: 'Jamming session' },
      { image: img('f6'), caption: "Sunset o'clock" },
      { image: img('p3'), caption: 'No agenda' },
      { image: img('f8'), caption: 'Private yacht' },
      { image: img('p9'), caption: 'Mangrove kayaking' },
      { image: img('p2'), caption: 'Beach days' },
    ],
  },

  reviews: {
    enabled: true,
    kicker: 'what people say',
    heading: 'Real talk from the Kommunity',
    lede: 'Straight from travellers who came, mingled and left with new friends.',
    ctaQuote: 'Your story could be right here.',
    ctaLabel: 'Join the next trip',
    // Placeholders: replace each with a real traveller's words, name and photo.
    items: [
      { published: true, quote: 'Placeholder: what made you sign up, especially if you came solo?', name: 'Traveller name', trip: 'Goa trip', stars: 5 },
      { published: true, quote: 'Placeholder: your favourite moment of the trip (yacht, pool party, jamming...).', name: 'Traveller name', trip: 'Goa trip', stars: 5 },
      { published: true, quote: 'Placeholder: how did the group feel by the end of the trip?', name: 'Traveller name', trip: 'Goa trip', stars: 5 },
      { published: true, quote: 'Placeholder: would you go again, and why?', name: 'Traveller name', trip: 'Goa trip', stars: 5 },
    ],
  },

  payment: {
    enabled: true,
    kicker: 'ready to book?',
    heading: 'Payment details',
    lede: 'Pay the advance to block your slot. Your booking is confirmed only after full payment.',
    // UPI: the ID is tappable and the app buttons open that app with the ID, name, amount and note filled in.
    upiTitle: 'Pay with UPI',
    upiId: 'rajatsaranaxis@ybl',
    upiName: 'Traaexplore Private Limited', // name shown in the UPI app
    upiAmount: '5000', // pre-filled amount (the advance). Leave empty to let people type it.
    upiNote: 'Avaraa Kommunity advance', // remark shown in the UPI app
    upiHint: 'On your phone, tap an app. It opens with the UPI ID and ₹5,000 already filled in.',
    tiles: [
      { label: 'Advance', amount: '₹5,000', text: 'to confirm your slot' },
      { label: 'Balance', amount: '₹4,999', text: 'the rest, paid before the deadline for your trip' },
    ],
    bankTitle: 'Bank transfer details (IMPS / RTGS)',
    rows: [
      { label: 'Account holder name', value: 'Traaexplore Private Limited', copy: true },
      { label: 'Account number', value: '029905005021', copy: true },
      { label: 'Account type', value: 'Current Account', copy: false },
      { label: 'Branch name', value: 'Jayanagar 9th Block', copy: false },
      { label: 'IFSC code', value: 'ICIC0000299', copy: true },
      { label: 'Swift code', value: 'ICICINBBCTS', copy: true },
      { label: 'Branch address', value: '148/751, 26th Main Road, Jayanagar 9th Block, Bangalore-560069, Karnataka', copy: false },
    ],
    qrTitle: 'Scan to pay',
    qrImage: '/images/payment-qr.webp',
    qrAlt: 'UPI QR code to pay Traaexplore Private Limited',
    qrNote: 'Scan with any UPI app and enter ₹5,000 for the advance.',
    notes: [
      'Paying the advance blocks your slot and makes you part of the journey.',
      'Booking is confirmed only after full payment.',
      'The advance is non-refundable in case of cancellation.',
    ],
    ctaLabel: 'Save my spot first',
  },

  why: {
    kicker: 'the short version',
    heading: 'Why choose Avaraa?',
    cta: 'Save my spot',
    items: [
      { icon: st('why-1'), title: 'Small groups, not a crowd', text: 'A curated, invite-only batch, so everyone actually gets to know everyone.' },
      { icon: st('why-2'), title: 'A real host, not a faceless agency', text: 'Aishwarya is with the group from check-in to goodbye.' },
      { icon: st('why-3'), title: 'Built for solo travellers', text: 'Come alone. Strangers become friends by the first evening.' },
      { icon: st('why-4'), title: 'Safe and comfortable for women', text: 'A woman host on the ground, handpicked groups, and stays arranged with your safety in mind.' },
      { icon: st('why-5'), title: 'No hidden costs', text: 'One clear price incl. GST, with inclusions and exclusions listed upfront.' },
      { icon: st('why-6'), title: 'Not a one-trip thing', text: 'Goa now, then Coorg, Varkala, Kashmir and more on the way.' },
    ],
  },

  who: {
    heading: 'Who is this for?',
    subheading: "You've been wanting to go, but…",
    closing: "If even one of these sounds like you, you're exactly who we plan for.",
    items: [
      "You don't really have anyone free to go with right now.",
      'You want to travel solo, but doing everything alone still feels a little scary.',
      'You have no idea where to stay or how to plan any of it.',
      'You want people around you, just not an overwhelming crowd.',
      "You're just tired, and need a few genuinely good days away.",
      'You want the trip to feel like an experience, not something you had to figure out alone.',
    ],
  },

  moments: {
    enabled: true,
    heading: 'Moments wall',
    footnote: 'Real photos from every trip will live here.',
    items: [
      { image: img('p7'), caption: 'Goa on two wheels', alt: 'Two friends on scooters in Goa' },
      { image: img('f4'), caption: 'Eat like a local', alt: 'Beach cafe plate with fries and drinks above the sea' },
      { image: img('p4'), caption: "Feni o'clock", alt: 'Girl sipping feni on the beach' },
      { image: img('f1'), caption: 'Wish you were here', alt: 'Friends sitting on a cliff watching the sunset' },
      { image: img('m1'), caption: 'Thali time', alt: 'Goan fish thali on a clay plate with small bowls of sides, rice and curry' },
      { image: img('p5'), caption: 'Uno, but wet', alt: 'Uno cards in a pool' },
      { image: img('f5'), caption: 'Dusk squad', alt: 'Friends posing on the beach at dusk' },
      { image: img('m3'), caption: 'Sun, sand, soul', alt: 'Girl standing in the waves at sunset on a Goa beach' },
      { image: img('m2'), caption: 'Fish thali, obviously', alt: 'Crumb-fried fish thali on a steel plate with rice, sides and mint coolers' },
    ],
  },

  faq: {
    heading: 'Questions, answered',
    items: [
      { q: 'Is this safe, especially for girls travelling solo?', a: 'Trips are hosted by Aishwarya, who is with the group the whole time. Groups stay small, and stays and activities are arranged by us. You can message her on WhatsApp before you book, with any question at all.' },
      { q: 'Can I come alone, or do I need to bring someone?', a: 'Come alone. Trips are designed so strangers become friends by the first evening.' },
      { q: 'How does payment work?', a: 'Pay ₹5,000 to block your slot, then the balance before the deadline. Booking is confirmed only after full payment.' },
      { q: "What's the cancellation policy?", a: 'The advance is non-refundable in case of cancellation.' },
      { q: 'Do I need to pick a trip now, or can I just join the community?', a: 'You can just join. Pick "Not sure yet" in the form and we\'ll tell you first when new dates drop.' },
    ],
  },

  cta: {
    tag: 'THIS TRIP IS INVITE-ONLY',
    heading: 'Should I save you a spot? 👀',
    text: 'Fill this in and it opens WhatsApp with your details ready to send.',
    button: 'Save my spot',
  },
};

export default defaultContent;
