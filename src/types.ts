export type PageId = 'home' | 'rentals' | 'packages' | 'about-contact';

export interface RentalCategory {
  id: string;
  name: string;
  placeholderLabel: string;
  description: string;
  iconName: 'inflatables' | 'tents' | 'tables' | 'concessions' | 'packages';
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
