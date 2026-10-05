import { BookableItem } from '../types';

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

export const BOOKABLE_ITEMS: BookableItem[] = [
  // Inflatables
  {
    id: 'ws-18-tropical',
    name: '18ft Tropical Wave Water Slide',
    category: 'inflatables',
    price: 280,
    unit: 'rental',
    placeholderLabel: 'REPLACE WITH WATER SLIDE IMAGE',
    description: '18-foot tall commercial single-lane water slide with deep splash landing pool.',
  },
  {
    id: 'ws-20-slip',
    name: '20ft Dual Lane Slip & Slide',
    category: 'inflatables',
    price: 340,
    unit: 'rental',
    placeholderLabel: 'REPLACE WITH DUAL WATER SLIDE IMAGE',
    description: 'High-speed dual lane commercial racer slide with elongated splash landing.',
  },
  {
    id: 'bh-classic-castle',
    name: 'Classic Castle Bounce House (15x15)',
    category: 'inflatables',
    price: 175,
    unit: 'rental',
    placeholderLabel: 'REPLACE WITH BOUNCE HOUSE IMAGE',
    description: 'Spacious 15ft x 15ft vibrant castle bounce house with safety netting on all 4 sides.',
  },
  {
    id: 'bh-rainbow-party',
    name: 'Rainbow Celebration Bounce House',
    category: 'inflatables',
    price: 175,
    unit: 'rental',
    placeholderLabel: 'REPLACE WITH RAINBOW BOUNCER IMAGE',
    description: 'Eye-catching colorful bounce house great for boys and girls birthday celebrations.',
  },
  {
    id: 'combo-4in1-castle',
    name: '4-in-1 Wet/Dry Castle Combo',
    category: 'inflatables',
    price: 250,
    unit: 'rental',
    placeholderLabel: 'REPLACE WITH COMBO IMAGE',
    description: 'Spacious jump area, basketball hoop, climbing wall, and attached water or dry slide.',
  },
  {
    id: 'combo-tropical-palm',
    name: 'Tropical Palm Combo with Pool',
    category: 'inflatables',
    price: 275,
    unit: 'rental',
    placeholderLabel: 'REPLACE WITH PALM COMBO IMAGE',
    description: 'Florida tropical palm themed bounce and slide combo unit with refreshing splash pool.',
  },

  // Tents
  {
    id: 'tent-10x20',
    name: '10x20 Heavy-Duty Canopy Tent',
    category: 'tents',
    price: 140,
    unit: 'rental',
    placeholderLabel: 'REPLACE WITH 10X20 TENT IMAGE',
    description: 'Commercial UV-blocking white canopy tent, seats 20–25 guests comfortably.',
  },
  {
    id: 'tent-20x20-peak',
    name: '20x20 High Peak Event Tent',
    category: 'tents',
    price: 260,
    unit: 'rental',
    placeholderLabel: 'REPLACE WITH 20X20 TENT IMAGE',
    description: 'Elegant high peak tension tent for weddings, graduations, and large parties.',
  },
  {
    id: 'tent-20x40-gala',
    name: '20x40 Grand Celebration Tent',
    category: 'tents',
    price: 480,
    unit: 'rental',
    placeholderLabel: 'REPLACE WITH 20X40 TENT IMAGE',
    description: 'Maximum coverage commercial tent accommodating up to 80-100 guests.',
  },

  // Tables & Chairs
  {
    id: 'tbl-6ft-banquet',
    name: '6ft White Banquet Folding Table',
    category: 'tables-chairs',
    price: 10,
    unit: 'table',
    placeholderLabel: 'REPLACE WITH BANQUET TABLE IMAGE',
    description: 'Heavy duty, commercial white plastic folding table (seats 6-8 guests).',
  },
  {
    id: 'tbl-60-round',
    name: '60-inch Round Dining Table',
    category: 'tables-chairs',
    price: 14,
    unit: 'table',
    placeholderLabel: 'REPLACE WITH ROUND TABLE IMAGE',
    description: 'Classic 5ft round dining table (seats 8 guests comfortably).',
  },
  {
    id: 'chr-white-folding',
    name: 'White Commercial Folding Chairs (Set of 6)',
    category: 'tables-chairs',
    price: 15,
    unit: 'set of 6',
    placeholderLabel: 'REPLACE WITH CHAIRS SET IMAGE',
    description: 'Set of 6 clean, sanitized white resin steel-frame folding chairs ($2.50/chair).',
  },
  {
    id: 'set-table-6chairs',
    name: 'Table & Chairs Bundle (1 Table + 6 Chairs)',
    category: 'tables-chairs',
    price: 22,
    unit: 'bundle',
    placeholderLabel: 'REPLACE WITH TABLE CHAIR BUNDLE IMAGE',
    description: 'One 6ft folding table plus 6 matching white chairs (Save $3 per set).',
  },

  // Concessions
  {
    id: 'conc-popcorn',
    name: 'Commercial Popcorn Machine + 30 Servings',
    category: 'concessions',
    price: 65,
    unit: 'machine',
    placeholderLabel: 'REPLACE WITH POPCORN MACHINE IMAGE',
    description: 'Theater style popper with corn kernels, movie theater buttery salt, and 30 serving bags.',
  },
  {
    id: 'conc-cotton-candy',
    name: 'Cotton Candy Machine + 30 Cones & Sugar',
    category: 'concessions',
    price: 65,
    unit: 'machine',
    placeholderLabel: 'REPLACE WITH COTTON CANDY IMAGE',
    description: 'Spun sugar cotton candy maker with pink vanilla sugar and 30 serving sticks.',
  },
  {
    id: 'conc-snow-cone',
    name: 'Snow Cone Ice Shaver + 30 Cups & Syrups',
    category: 'concessions',
    price: 65,
    unit: 'machine',
    placeholderLabel: 'REPLACE WITH SNOW CONE IMAGE',
    description: 'Commercial shaved ice maker with cherry and blue raspberry syrups and cups.',
  },

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
