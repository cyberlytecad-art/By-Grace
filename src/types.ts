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
  category: 'inflatables' | 'tents' | 'tables-chairs' | 'concessions' | 'packages';
  price: number;
  unit: string;
  placeholderLabel: string;
  description: string;
}

export interface SelectedCartItem {
  item: BookableItem;
  quantity: number;
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
  subtotal: number;
  deliveryFee: number;
  surfaceFee: number;
  durationFee: number;
  total: number;
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

