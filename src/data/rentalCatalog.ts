import { BookableItem } from '../types';
import { RENTAL_INVENTORY } from './rentalInventory';

export interface DeliveryCity {
  name: string;
  /** null = delivery fee not confirmed yet ($XXX). */
  fee: number | null;
  note: string;
}

/** Cities By Grace names on Instagram. Delivery fees aren't published anywhere yet. */
export const DELIVERY_CITIES: DeliveryCity[] = [
  { name: 'Haines City', fee: null, note: 'Delivery $XXX' },
  { name: 'Davenport', fee: null, note: 'Delivery $XXX' },
  { name: 'Kissimmee', fee: null, note: 'Delivery $XXX' },
  { name: 'Orlando', fee: null, note: 'Delivery $XXX' },
  { name: 'Other Central FL Location', fee: null, note: 'Delivery $XXX' },
];

/**
 * Only prices By Grace has published are filled in. Everything else is null
 * and shows as $XXX until they confirm it.
 *  - Bounce houses: "Starting at just $150" (Instagram post, Oct 2026) and
 *    "Brinco 15x15 $150" on the Spring Break flyer.
 */
const PRICES: Record<string, { price: number | null; unit: string; priceFrom?: boolean }> = {
  'obstacle-castle-bounce': { price: 150, unit: 'rental', priceFrom: true },
  'rainbow-castle-bounce': { price: 150, unit: 'rental', priceFrom: true },
  'white-red-castle-bounce': { price: 150, unit: 'rental', priceFrom: true },
  'pink-purple-castle-bounce': { price: 150, unit: 'rental', priceFrom: true },
  'toddler-pink-castle': { price: 150, unit: 'rental', priceFrom: true },
};

/** Every item on the Rentals page, in the same order, plus the packages. */
export const BOOKABLE_ITEMS: BookableItem[] = [
  ...RENTAL_INVENTORY.flatMap((section) =>
    section.items.map((item): BookableItem => ({
      id: item.id,
      name: item.name,
      category: section.id,
      price: PRICES[item.id]?.price ?? null,
      priceFrom: PRICES[item.id]?.priceFrom,
      unit: PRICES[item.id]?.unit ?? 'rental',
      placeholderLabel: item.name,
      description: item.description,
      image: item.image,
    })),
  ),

  // Packages: the three bundles from By Grace's "Especiales de Pascua" (Easter) flyer on Instagram.
  {
    id: 'pkg-bundle-01',
    name: 'Bounce House Package',
    category: 'packages',
    price: 225,
    unit: 'package',
    placeholderLabel: 'REPLACE WITH PACKAGE 01 IMAGE',
    description: '15x15 bounce house + 12 chairs + 2 tables + 10x10 tent.',
  },
  {
    id: 'pkg-bundle-02',
    name: 'Water Slide Package',
    category: 'packages',
    price: 380,
    unit: 'package',
    placeholderLabel: 'REPLACE WITH PACKAGE 02 IMAGE',
    description: 'Water slide + 12 chairs + 2 tables + 10x10 tent.',
  },
  {
    id: 'pkg-bundle-03',
    name: 'Combo Package',
    category: 'packages',
    price: 300,
    unit: 'package',
    placeholderLabel: 'REPLACE WITH PACKAGE 03 IMAGE',
    description: 'Bounce house and slide combo + 12 chairs + 2 tables + 10x10 tent.',
  },
];
