/**
 * Central list of every photo slot on the site.
 *
 * To add a real photo, drop the file into `public/images/` using the exact
 * filename below (or change the path here). Until a file exists, each slot
 * keeps showing its original placeholder.
 *
 * Recommended sizes:
 *  - hero: 2400x1400 landscape
 *  - rentals / packages: 1600x1000 landscape
 *  - logo: 512x512 square (PNG with transparency works best)
 */

export interface SiteImage {
  src: string;
  alt: string;
}

export const LOGO: SiteImage = {
  src: '/images/logo.png',
  alt: 'By Grace Party Rentals logo',
};

export const HERO: SiteImage = {
  src: '/images/hero.jpg',
  alt: 'Water slide, bounce house and party tent set up in a Central Florida backyard',
};

export const RENTAL_IMAGES: Record<string, SiteImage> = {
  'water-slides': { src: '/images/rentals/water-slides.jpg', alt: 'Inflatable water slide' },
  'bounce-houses': { src: '/images/rentals/bounce-houses.jpg', alt: 'Bounce house' },
  combos: { src: '/images/rentals/combos.jpg', alt: 'Bounce house and slide combo' },
  tents: { src: '/images/rentals/tents.jpg', alt: 'Event tent' },
  'tables-chairs': { src: '/images/rentals/tables-chairs.jpg', alt: 'Tables and chairs set up for a party' },
  concessions: { src: '/images/rentals/concessions.jpg', alt: 'Popcorn and cotton candy machines' },
};

export const PACKAGE_IMAGES: Record<string, SiteImage> = {
  'pkg-01': { src: '/images/packages/package-01.jpg', alt: 'Backyard birthday bundle' },
  'pkg-02': { src: '/images/packages/package-02.jpg', alt: 'Summer splash combo bundle' },
  'pkg-03': { src: '/images/packages/package-03.jpg', alt: 'Community celebration setup' },
};

/** Picks the best photo for a bookable item in the estimator (by its id prefix). */
export function imageForItem(itemId: string): SiteImage {
  if (itemId.startsWith('ws-')) return RENTAL_IMAGES['water-slides'];
  if (itemId.startsWith('bh-')) return RENTAL_IMAGES['bounce-houses'];
  if (itemId.startsWith('combo-')) return RENTAL_IMAGES.combos;
  if (itemId.startsWith('tent-')) return RENTAL_IMAGES.tents;
  if (itemId.startsWith('conc-')) return RENTAL_IMAGES.concessions;
  const pkg = itemId.match(/^pkg-bundle-(\d+)$/);
  if (pkg) return PACKAGE_IMAGES[`pkg-${pkg[1]}`] ?? PACKAGE_IMAGES['pkg-01'];
  return RENTAL_IMAGES['tables-chairs'];
}
