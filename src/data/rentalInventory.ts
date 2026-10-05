/**
 * Every product By Grace shows on Instagram (@by_grace_party), grouped by the
 * category cards on the Rentals page. Photos live in `public/images/items/`.
 * Items without a photo yet leave `image` out and show a styled placeholder.
 */

import { SiteImage } from './siteImages';

const ITEMS = `${import.meta.env.BASE_URL}images/items/`;

export interface InventoryItem {
  id: string;
  name: string;
  description: string;
  image?: SiteImage;
}

export interface InventorySection {
  /** Matches the category card id, so the card can scroll to `rentals-<id>`. */
  id: string;
  name: string;
  blurb: string;
  items: InventoryItem[];
}

const photo = (id: string, alt: string): SiteImage => ({ src: `${ITEMS}${id}.jpg`, alt });

export const RENTAL_INVENTORY: InventorySection[] = [
  {
    id: 'water-slides',
    name: 'Water Slides',
    blurb: 'Tall, colorful water slides with splash pools to keep everyone cool all afternoon.',
    items: [
      {
        id: 'blue-palm-18ft-slide',
        name: '18ft Blue Palm Water Slide',
        description: 'Our 18 foot tropical slide with palm trees up top and a big splash pool at the bottom.',
        image: photo('blue-palm-18ft-slide', '18 foot blue tropical water slide with palm trees'),
      },
      {
        id: 'sun-palm-dual-lane-slide',
        name: 'Sun & Palm Dual Lane Slide',
        description: 'Orange and green dual lane slide so two riders can race side by side into the pool.',
        image: photo('sun-palm-dual-lane-slide', 'Orange and green dual lane water slide in a backyard under a rainbow'),
      },
      {
        id: 'teal-wave-slide',
        name: 'Teal Wave Water Slide',
        description: 'Ocean wave themed slide with a long curved landing pool. A crowd favorite for summer parties.',
        image: photo('teal-wave-slide', 'Teal wave themed water slide with splash pool'),
      },
    ],
  },
  {
    id: 'bounce-houses',
    name: 'Bounce Houses',
    blurb: 'Clean, bright castle bouncers for birthdays, school events and backyard parties.',
    items: [
      {
        id: 'obstacle-castle-bounce',
        name: 'Obstacle Castle Bounce House',
        description: 'Castle bouncer with pop-up obstacles and a basketball hoop inside for extra play.',
        image: photo('obstacle-castle-bounce', 'Colorful castle bounce house with obstacles inside'),
      },
      {
        id: 'rainbow-castle-bounce',
        name: 'Rainbow Castle Bounce House',
        description: 'Classic red, yellow and blue castle with blue turrets. Fits any theme.',
        image: photo('rainbow-castle-bounce', 'Red, yellow and blue castle bounce house'),
      },
      {
        id: 'white-red-castle-bounce',
        name: 'White & Red Castle Bounce House',
        description: 'Marble white castle with red trim, great for weddings, showers and elegant parties.',
        image: photo('white-red-castle-bounce', 'White and red castle bounce house'),
      },
      {
        id: 'pink-purple-castle-bounce',
        name: 'Pink & Purple Castle Bounce House',
        description: 'Pink and purple princess castle, a favorite for girls birthday parties.',
        image: photo('pink-purple-castle-bounce', 'Pink and purple castle bounce house on grass'),
      },
      {
        id: 'toddler-pink-castle',
        name: 'Toddler Pink Castle with Slide',
        description: 'Smaller pink castle with a built-in slide, sized just right for little ones.',
        image: photo('toddler-pink-castle', 'Small pink and purple toddler bounce house with slide'),
      },
    ],
  },
  {
    id: 'combos',
    name: 'Combos',
    blurb: 'Bounce house and slide in one. Use them wet with the pool or dry all year long.',
    items: [
      {
        id: 'marble-castle-combo',
        name: 'Marble Castle Wet/Dry Combo',
        description: 'Bounce area, climb-up slide and splash pool in one unit. Runs wet or dry.',
        image: photo('marble-castle-combo', 'Marble castle combo bounce house with slide and pool'),
      },
      {
        id: 'rainbow-castle-combo',
        name: 'Rainbow Castle Combo with Slide',
        description: 'Rainbow castle bouncer with an attached slide for nonstop jumping and sliding.',
        image: photo('rainbow-castle-combo', 'Rainbow castle combo bounce house with slide'),
      },
    ],
  },
  {
    id: 'tents',
    name: 'Tents',
    blurb: 'Shade and rain cover for any crowd size, set up by our team.',
    items: [
      {
        id: 'white-party-tent',
        name: 'White Party Tent with Sidewalls',
        description: 'Frame tent with window sidewalls for a clean, finished look in any weather.',
        image: photo('white-party-tent', 'White party tent with window sidewalls'),
      },
      {
        id: 'large-canopy-tent',
        name: 'Large Canopy Tent',
        description: 'Wide open canopy that shades long rows of tables and chairs.',
        image: photo('large-canopy-tent', 'Large canopy tent shading rows of white chairs'),
      },
      {
        id: 'blue-canopy-tents',
        name: 'Blue Pop-Up Canopies',
        description: 'Quick pop-up canopies for food tables, gift tables and extra shade spots.',
        image: photo('blue-canopy-tents', 'Blue pop-up canopy tent'),
      },
    ],
  },
  {
    id: 'tables-chairs',
    name: 'Tables & Chairs',
    blurb: 'Clean white tables and chairs, plus linens and covers for a dressed-up setup.',
    items: [
      {
        id: 'white-folding-chairs',
        name: 'White Folding Chairs',
        description: 'Sturdy white folding chairs, cleaned before every rental.',
        image: photo('white-folding-chairs', 'Rows of white folding chairs'),
      },
      {
        id: 'tables-chairs-setup',
        name: 'Tables & Chairs Setup',
        description: 'Folding tables with matching chairs, set up under the tent or wherever you need them.',
        image: photo('tables-chairs-setup', 'Tables and white chairs set up under canopy tents'),
      },
      {
        id: 'linens-elegant-setups',
        name: 'Linens, Covers & Elegant Setups',
        description: 'Table linens, chair covers and runners for weddings, quinceañeras and showers.',
        image: photo('linens-elegant-setups', 'Long tables with white linens, green runners and gold chargers'),
      },
    ],
  },
  {
    id: 'concessions',
    name: 'Concessions',
    blurb: 'Classic party treats that kids and grown-ups both love.',
    items: [
      {
        id: 'popcorn-machine',
        name: 'Popcorn Machine',
        description: 'Hot and fresh popcorn right at your party. Great for movie nights and school events.',
        image: photo('popcorn-machine', 'Hot and Fresh popcorn machine'),
      },
      {
        id: 'cotton-candy',
        name: 'Cotton Candy Machine',
        description: 'Fluffy cotton candy spun on the spot for a sweet party favorite.',
      },
      {
        id: 'snow-cone',
        name: 'Snow Cone Machine',
        description: 'Icy snow cones with colorful syrups to beat the Florida heat.',
      },
    ],
  },
  {
    id: 'decor-more',
    name: 'Decor & More',
    blurb: 'Finishing touches that make the party feel complete.',
    items: [
      {
        id: 'balloon-decor',
        name: 'Balloon & Event Decor',
        description: 'Balloon garlands, backdrops and themed decor styled to match your party.',
        image: photo('balloon-decor', 'Black and white balloon decor with a themed backdrop'),
      },
      {
        id: 'dj-service',
        name: 'DJ Service',
        description: 'Music and a DJ to keep the party going. Ask us about adding one to your booking.',
      },
    ],
  },
];
