export type PageId = 'home' | 'rentals' | 'packages' | 'estimator' | 'about-contact';

export interface RentalCategory {
  id: string;
  name: string;
  placeholderLabel: string;
  description: string;
  iconName: 'inflatables' | 'tents' | 'tables' | 'concessions' | 'packages';
}

export interface BookableItem {
  id: string;
  name: string;
  /** A Rentals page section id (e.g. 'bounce-houses') or 'packages'. */
  category: string;
  /** null = not confirmed yet; shown as $XXX. */
  price: number | null;
  /** The price is a "starting at" price. */
  priceFrom?: boolean;
  unit: string;
  placeholderLabel: string;
  description: string;
  image?: { src: string; alt: string };
}

export interface SelectedCartItem {
  item: BookableItem;
  quantity: number;
  /** For a deal: the specific slide, bounce house or combo the customer picked. */
  choice?: string;
}

export interface BookingDetails {
  fullName: string;
  phone: string;
  email: string;
  eventDate: string;
  startTime: string;
  endTime: string;
  streetAddress: string;
  city: string;
  surfaceType: 'grass' | 'concrete' | 'indoor';
  duration: 'single-day' | 'overnight' | 'weekend';
  notes: string;
}

export interface BookingConfirmation {
  referenceNumber: string;
  customerDetails: BookingDetails;
  items: SelectedCartItem[];
  /** null = includes a price that isn't confirmed yet ($XXX). */
  subtotal: number | null;
  subtotalFrom: boolean;
  deliveryFee: number | null;
  surfaceFee: number | null;
  durationFee: number | null;
  total: number | null;
  dateCreated: string;
}

export interface PackageItem {
  id: string;
  badge: string;
  title: string;
  tagline: string;
  items: string[];
  placeholderLabel: string;
  priceNote: string;
}

export interface QuoteFormData {
  fullName: string;
  phone: string;
  email: string;
  eventDate: string;
  eventType: string;
  message: string;
}

