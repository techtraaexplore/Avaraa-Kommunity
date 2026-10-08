// Everything the public website shows lives here as data.
// The admin panel edits a copy of this object and the server stores it in server/data/content.json.
// If nothing has been saved yet, the site falls back to exactly this.
//
// In goa.included / goa.notIncluded / goa.steps you can use {nights}, {days} and {dates}.
// They are filled in from the Goa start and end dates, so you never type the numbers twice.

import { privacy, terms } from './legalContent.js';

const img = (k) => `/images/${k}.webp`;
const st = (k) => `/stickers/${k}.webp`;

const defaultContent = {
  site: {
    title: 'Avaraa Kommunity · Find your tribe',
    whatsapp: '917411765832', // country code + number, digits only. Powers every WhatsApp button on the site.
    whatsappMessage: "Hi Avaraa Kommunity! I'd like to know more about your trips.", // typed into the chat for the visitor
    whatsappLabel: 'Chat on WhatsApp', // text next to the floating button (desktop)
    instagram: 'https://www.instagram.com/avaraakommunity/',
    instagramHandle: '@avaraakommunity',
    // Paste the WhatsApp Community invite link here (https://chat.whatsapp.com/...). Until then the hero button opens a chat asking to join.
    whatsappCommunityUrl: '',
    whatsappCommunityMessage: "Hi Avaraa Kommunity! I'd like to join the WhatsApp community.",
    marquee: 'GOA IS ONNN ✺ COORG ✺ VARKALA ✺ KASHMIR ✺ COME SOLO ✺ LEAVE WITH FRIENDS ✺ ',
    footerNote: 'Goa is onnn!!!',
  },

  hero: {
    // Soft looping video behind the hero (muted). Leave both empty to hide it.
    bgVideo: '/videos/hero.mp4',
    bgPoster: '/videos/hero-poster.jpg',
    kicker: 'Avaraa Kommunity',
    titleLine1: 'FIND YOUR',
    titleLine2: 'TRIBE.',
    lead: 'Hosted trips for 18–30 year-olds. Come solo, leave with friends and a very full camera roll.',
    primaryCta: 'See upcoming trips',
    secondaryCta: 'Chat on WhatsApp',
    communityCta: 'Join WhatsApp community',
    polaroids: [
      { image: img('p1'), caption: 'Pool party', alt: 'Friends toasting in a pool at night' },
      { image: img('p8'), caption: 'Yacht sunset', alt: 'Friends on a private yacht' },
      { image: img('p2'), caption: 'Beach days', alt: 'Girl petting a dog on the beach at sunset' },
      { image: img('p10'), caption: 'Late nights', alt: 'Friends sitting together with a guitar at night' },
      { image: img('f5'), caption: 'Dusk squad', alt: 'Friends posing on the beach at dusk' },
    ],
  },

  trips: {
    enabled: true,
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
        description: 'Offbeat Goa: pool party, pub crawl, Chorão Island and a Private Yacht Sunset Party.',
        priceLabel: '₹9,999 + GST',
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
        dates: 'Nov 2026',
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
        dates: 'Nov 2026',
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
        dates: 'Dec 2026',
        description: 'The one trip on the calendar worth taking a few extra days for.',
        priceLabel: 'Coming soon',
        ctaLabel: 'Tell me first',
        ctaTarget: 'form',
      },
    ],
  },

  goa: {
    enabled: true,
    name: 'Goa',
    kicker: 'offbeat · now booking',
    startDate: '2026-10-17',
    endDate: '2026-10-19',
    host: 'Aishwarya',
    days: [
      {
        title: 'Check-in, pool party & pub crawl',
        bullets: [
          '3 PM – Check-in at the Villa/Hotel',
          '4 PM – 6 PM – Pool Party at the Hotel (Drinks & Food on own arrangement)',
          '8 PM – 11 PM – Pub Crawling',
        ],
        chips: [],
        note: '',
        photos: [
          { image: img('p1'), caption: 'Pool party', alt: 'Friends toasting in the pool', sticker: 'thali' },
          { image: img('p5'), caption: 'Uno, but wet', alt: 'Uno cards played in a pool', sticker: '' },
          { image: img('p4'), caption: 'Cheers!', alt: 'Girl sipping a drink on the beach', sticker: '' },
        ],
      },
      {
        title: 'Chorão Island & private yacht sunset party',
        bullets: [
          '8 AM – Breakfast',
          '10 AM – 1 PM – Chorão Island Tour',
          '2 PM – Head back to the hotel for lunch and rest for a while',
          '5:30 PM – 7:30 PM – Private Yacht Sunset Party',
        ],
        chips: [],
        note: '',
        photos: [
          { image: img('f7'), caption: 'Chorão ferry', alt: 'Friends on the Chorão ferry', sticker: '' },
          { image: img('p8'), caption: 'Private Yacht Sunset Party', alt: 'Friends on a private yacht', sticker: '' },
          { image: img('f8'), caption: 'Golden hour on the water', alt: 'Friends on a private yacht', sticker: '' },
        ],
      },
      {
        title: 'Breakfast, check-out & drop',
        bullets: [
          '8 AM – Breakfast',
          '11 AM – Check-out',
          '12 PM – Drop to Railway Station / Bus Station / Airport',
        ],
        chips: [],
        note: '',
        photos: [
          { image: img('f3'), caption: 'Last-day chill', alt: 'Friends relaxing on beach towels', sticker: 'hat' },
          { image: img('p3'), caption: 'New friends', alt: 'Friends chatting on the beach', sticker: '' },
          { image: img('f6'), caption: 'Until next time', alt: 'Friends toasting at a beach shack at sunset', sticker: '' },
        ],
      },
    ],
    included: [
      '{nights} nights accommodation',
      'Breakfasts as per itinerary',
      'Day 2 lunch at the hotel',
      'Pool party at the hotel',
      'Hosted pub crawl',
      'Chorão Island tour',
      'Private Yacht Sunset Party',
      'Drop to Railway Station / Bus Station / Airport on Day 3',
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
    price: { amount: '₹9,999', note: '+ GST on the full amount, per person', tag: 'Goa → Goa' },
    steps: [
      { title: 'Save your spot.', text: 'Fill the form below or message us on WhatsApp.' },
      { title: 'Pay the ₹5,000 advance.', text: "We'll send payment details on WhatsApp. This blocks your slot." },
      { title: 'Pay the balance before the deadline.', text: 'Total minus your advance, GST included on the full amount. Booking is confirmed only after full payment.' },
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
    lede: 'See how the days actually feel. Tap a reel to pause it.',
    // Upload videos in the admin (Reels page). A reel with a video autoplays (muted) when scrolled into view; tap to pause.
    items: [
      { title: 'Pool party', subtitle: '', image: img('p1'), alt: 'Friends toasting in the pool', videoUrl: '', youtubeId: '' },
      { title: 'Chorão Island', subtitle: '', image: img('f7'), alt: 'Friends on the Chorão ferry', videoUrl: '', youtubeId: '' },
      { title: 'Private Yacht Sunset Party', subtitle: '', image: img('f8'), alt: 'Friends on a private yacht', videoUrl: '', youtubeId: '' },
      { title: 'Beach, no agenda', subtitle: '', image: img('m3'), alt: 'Girl standing in the waves at sunset', videoUrl: '', youtubeId: '' },
      { title: 'Thali time', subtitle: '', image: img('m2'), alt: 'Crumb-fried fish thali on a steel plate', videoUrl: '', youtubeId: '' },
    ],
  },

  host: {
    enabled: true,
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
    instagramUrl: 'https://www.instagram.com/aishwarya._.prabhu/',
    instagramHandle: '@aishwarya._.prabhu',
    instagramLabel: 'Follow on Instagram',
  },

  faces: {
    enabled: true,
    kicker: 'come solo, leave with friends',
    heading: 'Happy faces',
    items: [
      { image: img('h1'), caption: 'Group on the snow gondola' },
      { image: img('p1'), caption: 'Pool party' },
      { image: img('p4'), caption: "Feni o'clock" },
      { image: img('h2'), caption: 'Group photo' },
      { image: img('f5'), caption: 'Dusk squad' },
      { image: img('h3'), caption: 'Group photo' },
      { image: img('f2'), caption: 'Feni tasting' },
      { image: img('h4'), caption: 'Group photo' },
      { image: img('p10'), caption: 'Late nights' },
      { image: img('h5'), caption: 'Group photo' },
      { image: img('f6'), caption: "Sunset o'clock" },
      { image: img('h6'), caption: 'Group photo' },
      { image: img('p3'), caption: 'No agenda' },
      { image: img('h7'), caption: 'Group photo' },
      { image: img('f8'), caption: 'Private yacht' },
      { image: img('h8'), caption: 'Group photo' },
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
    items: [
      { published: true, quote: "Honestly didnt expect ki strangers ke saath itna acha vibe ban jayega 😂", name: "Rohan M.", trip: 'Goa trip', stars: 5 },
      { published: true, quote: "Avaraa was such a good experience. Everything felt very chill and not over planned.", name: "Priya S.", trip: 'Varkala trip', stars: 5 },
      { published: true, quote: "Pehle thoda awkward tha but 1st day ke baad sab apne hi log lag rahe the lol.", name: "Kunal R.", trip: 'Goa trip', stars: 5 },
      { published: true, quote: "Met some really cool people here. Trip khatam hone ke baad bhi group active hai 😂", name: "Ananya K.", trip: 'Coorg trip', stars: 5 },
      { published: true, quote: "The concept is actually crazyyy. Going with complete strangers and coming back with so many memories.", name: "Arjun P.", trip: 'Kashmir trip', stars: 5 },
      { published: true, quote: "Mujhe laga tha awkward hoga but honestly bilkul nahi hua. Everyone was super friendly.", name: "Sneha R.", trip: 'Goa trip', stars: 5 },
      { published: true, quote: "Best part was definitely the people. Places were great but the random conversations >>>>", name: "Aditya N.", trip: 'Varkala trip', stars: 5 },
      { published: true, quote: "Avaraa ke saath jana was honestly a very different experience. Would love to do it again.", name: "Mehak S.", trip: 'Coorg trip', stars: 5 },
      { published: true, quote: "Came alone, knew nobody and somehow left with a whole new gang 😭", name: "Rahul V.", trip: 'Goa trip', stars: 5 },
      { published: true, quote: "Trip was sooo much fun yaar. Specially the random plans and late night bakchodi 😂", name: "Ishita M.", trip: 'Kashmir trip', stars: 5 },
      { published: true, quote: "I was little nervous before the trip but everything turned out way better than expected.", name: "Vivek A.", trip: 'Goa trip', stars: 5 },
      { published: true, quote: "Sach bolu toh strangers ke saath travel karna itna fun hoga didnt expect this at all.", name: "Nidhi P.", trip: 'Varkala trip', stars: 5 },
      { published: true, quote: "The vibe was really nice. No fake formal introductions, everyone just started talking naturally.", name: "Sarthak J.", trip: 'Coorg trip', stars: 5 },
      { published: true, quote: "Acha trip tha, but the people made it better. Already missing the whole group :(", name: "Kavya R.", trip: 'Goa trip', stars: 5 },
      { published: true, quote: "Avaraa ka concept mujhe pehle thoda weird laga tha but ab I get it 😂 definitely worth trying.", name: "Manav T.", trip: 'Kashmir trip', stars: 5 },
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
      { label: 'Advance', amount: '₹5,000', text: 'to confirm your slot. It is adjusted against the total.' },
      { label: 'Total price', amount: '₹9,999 + GST', text: 'GST is charged on the full amount. Pay the balance before the deadline.' },
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
    enabled: true,
    kicker: 'the short version',
    heading: 'Why choose Avaraa?',
    cta: 'Save my spot',
    items: [
      { icon: st('why-1'), title: 'Small groups, not a crowd', text: 'A curated, invite-only batch, so everyone actually gets to know everyone.' },
      { icon: st('why-2'), title: 'A real host, not a faceless agency', text: 'Aishwarya is with the group from check-in to goodbye.' },
      { icon: st('why-3'), title: 'Built for solo travellers', text: 'Come alone. Strangers become friends by the first evening.' },
      { icon: st('why-4'), title: 'Safe and comfortable for women', text: 'A woman host on the ground, handpicked groups, and stays arranged with your safety in mind.' },
      { icon: st('why-5'), title: 'No hidden costs', text: 'One clear price (₹9,999 + GST), with inclusions and exclusions listed upfront.' },
      { icon: st('why-6'), title: 'Not a one-trip thing', text: 'Goa now, then Coorg, Varkala, Kashmir and more on the way.' },
    ],
  },

  who: {
    enabled: true,
    heading: 'Who is this for?',
    subheading: 'Travel only if you are…',
    closing: "If even one of these sounds like you, you're exactly who we plan for.",
    items: ['Burnout', 'Solo & Curious', 'A First Timer', 'Feeling Lost & Stuck in Life', 'No Social Circle', 'A Lonely Relocator'],
  },

  moments: {
    enabled: true,
    heading: 'Moments wall',
    footnote: '',
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

  terms,
  privacy,

  faq: {
    enabled: true,
    heading: 'Questions, answered',
    items: [
      { q: 'Is this safe, especially for girls travelling solo?', a: "Yes, safety is a big part of how we plan. Aishwarya, a woman host, is with the group from check-in to goodbye. Groups are small and curated, and we arrange all the stays ourselves. If you have any specific safety questions, message us on WhatsApp and we'll answer them directly before you book." },
      { q: 'Can I come alone, or do I need to bring someone?', a: "Come alone, or bring a friend, both work. Most people join solo and end up with a new group by the first evening. If you're bringing someone, just mention it when you apply." },
      { q: 'How does payment work?', a: 'Pay a ₹5,000 advance to lock your spot. The rest is due before the deadline we share for your trip. The Goa trip is ₹9,999 + GST per person, and GST is charged on the full amount. Your ₹5,000 advance is adjusted against the total. Payment details are on this page and shared on WhatsApp once your spot is confirmed.' },
      { q: "What's the cancellation policy?", a: "The ₹5,000 advance is non-refundable in case of cancellation. Any other refund request after full payment is reviewed case by case. If something changes, tell us as early as you can and we'll work with you where possible." },
      { q: 'Do I need to pick a trip now, or can I just join the community?', a: "No pressure to pick a trip. You can join the Avaraa Kommunity on WhatsApp first, see how we do things, and be the first to know when dates drop for Goa, Coorg, Varkala and Kashmir." },
    ],
  },

  labels: {
    navTrips: 'Trips', navGoa: 'Goa plan', navWhy: 'Why Avaraa', navMoments: 'Moments', navReviews: 'Reviews', navFaq: 'FAQ', navButton: 'Save my spot',
    tripsSwipe: 'swipe for more →',
    hostedBy: 'hosted by',
    included: 'Included', notIncluded: 'Not included',
    dayHint: "Tap a day, or use the arrows, to see each day's plan",
    formName: 'Name', formPhone: 'Phone', formCity: 'City', formGroup: 'Solo or group?', formTrip: 'Which trip?',
    formAgree: 'By booking you agree to our', formAnd: 'and',
    footerFollow: 'Follow us on Instagram', footerInstagram: 'Instagram', footerWhatsapp: 'WhatsApp',
    privacyLink: 'Privacy Policy', termsLink: 'Terms & Conditions',
  },

  cta: {
    tag: 'THIS TRIP IS INVITE-ONLY',
    heading: 'Should I save you a spot? 👀',
    text: 'Fill this in and it opens WhatsApp with your details ready to send.',
    button: 'Save my spot',
  },
};

export default defaultContent;
