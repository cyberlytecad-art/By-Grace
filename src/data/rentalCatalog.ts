import { BookableItem } from '../types';
import { RENTAL_INVENTORY } from './rentalInventory';

export interface DeliveryCity {
  name: string;
  fee: number;
  note: string;
}

export const DELIVERY_CITIES: DeliveryCity[] = [
  { name: 'Haines City (Local)', fee: 0, note: 'Free Local Delivery!' },
  { name: 'Davenport', fee: 15, note: '$15 standard delivery' },
  { name: 'Dundee', fee: 15, note: '$15 standard delivery' },
  { name: 'Lake Hamilton', fee: 15, note: '$15 standard delivery' },
  { name: 'Winter Haven', fee: 25, note: '$25 standard delivery' },
  { name: 'Auburndale', fee: 25, note: '$25 standard delivery' },
  { name: 'Lake Wales', fee: 25, note: '$25 standard delivery' },
  { name: 'Poinciana', fee: 35, note: '$35 standard delivery' },
  { name: 'Lakeland', fee: 35, note: '$35 standard delivery' },
  { name: 'Kissimmee', fee: 45, note: '$45 standard delivery' },
  { name: 'St. Cloud', fee: 45, note: '$45 standard delivery' },
  { name: 'Orlando / Dr. Phillips', fee: 55, note: '$55 standard delivery' },
  { name: 'Other Central FL Location', fee: 50, note: 'Quote verified upon address confirmation' },
];

/**
 * Estimate prices for each Rentals page item. These are still placeholders
 * (bounce houses, the 18ft slide and combos follow Instagram flyer prices);
 * replace them with the real rate sheet. 0 = quoted by phone.
 */
const PRICES: Record<string, { price: number; unit: string }> = {
  'blue-palm-18ft-slide': { price: 295, unit: 'rental' },
  'sun-palm-dual-lane-slide': { price: 340, unit: 'rental' },
  'teal-wave-slide': { price: 349, unit: 'rental' },
  'obstacle-castle-bounce': { price: 150, unit: 'rental' },
  'rainbow-castle-bounce': { price: 150, unit: 'rental' },
  'white-red-castle-bounce': { price: 150, unit: 'rental' },
  'pink-purple-castle-bounce': { price: 150, unit: 'rental' },
  'toddler-pink-castle': { price: 150, unit: 'rental' },
  'marble-castle-combo': { price: 250, unit: 'rental' },
  'rainbow-castle-combo': { price: 200, unit: 'rental' },
  'white-party-tent': { price: 260, unit: 'rental' },
  'large-canopy-tent': { price: 140, unit: 'rental' },
  'blue-canopy-tents': { price: 50, unit: 'canopy' },
  'white-folding-chairs': { price: 15, unit: 'set of 6' },
  'tables-chairs-setup': { price: 22, unit: '1 table + 6 chairs' },
  'linens-elegant-setups': { price: 0, unit: 'quote' },
  'popcorn-machine': { price: 65, unit: 'machine' },
  'cotton-candy': { price: 65, unit: 'machine' },
  'snow-cone': { price: 65, unit: 'machine' },
  'balloon-decor': { price: 0, unit: 'quote' },
  'dj-service': { price: 0, unit: 'quote' },
  'giant-games': { price: 0, unit: 'quote' },
};

/** Every item on the Rentals page, in the same order, plus the packages. */
export const BOOKABLE_ITEMS: BookableItem[] = [
  ...RENTAL_INVENTORY.flatMap((section) =>
    section.items.map((item): BookableItem => ({
      id: item.id,
      name: item.name,
      category: section.id,
      price: PRICES[item.id]?.price ?? 0,
      unit: PRICES[item.id]?.unit ?? 'quote',
      placeholderLabel: item.name,
      description: item.description,
      image: item.image,
    })),
  ),

  // Packages (Bundles)
  {
    id: 'pkg-bundle-01',
    name: 'Package 01: Backyard Birthday Bash',
    category: 'packages',
    price: 215,
    unit: 'package',
    placeholderLabel: 'REPLACE WITH PACKAGE 01 IMAGE',
    description: 'Classic Castle Bounce House + 2 6ft Banquet Tables + 12 White Folding Chairs. (Save $25)',
  },
  {
    id: 'pkg-bundle-02',
    name: 'Package 02: Summer Splash Combo Bundle',
    category: 'packages',
    price: 450,
    unit: 'package',
    placeholderLabel: 'REPLACE WITH PACKAGE 02 IMAGE',
    description: '18ft Tropical Water Slide + 10x20 Canopy Tent + 3 Tables & 18 Chairs. (Save $50)',
  },
  {
    id: 'pkg-bundle-03',
    name: 'Package 03: Ultimate Community Celebration',
    category: 'packages',
    price: 650,
    unit: 'package',
    placeholderLabel: 'REPLACE WITH PACKAGE 03 IMAGE',
    description: 'Water Slide or Combo + 20x20 High Peak Tent + 4 Tables + 24 Chairs + Popcorn/Cotton Candy. (Save $80)',
  },
];
