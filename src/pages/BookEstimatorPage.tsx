import React, { useState, useMemo, useRef } from 'react';
import { 
  Plus, 
  Minus, 
  Trash2, 
  Calendar, 
  MapPin, 
  Check, 
  ArrowRight, 
  CheckCircle2, 
  Printer, 
  Sparkles, 
  Tent, 
  Armchair, 
  Popcorn, 
  Package, 
  Layers
} from 'lucide-react';
import { BookableItem, SelectedCartItem, BookingDetails, BookingConfirmation } from '../types';
import { BOOKABLE_ITEMS, DELIVERY_CITIES } from '../data/rentalCatalog';
import { SlotImage } from '../components/SlotImage';
import { imageForItem } from '../data/siteImages';

interface BookEstimatorPageProps {
  initialItemId?: string;
  initialCategory?: string;
}

export const BookEstimatorPage: React.FC<BookEstimatorPageProps> = ({ 
  initialItemId, 
  initialCategory 
}) => {
  // Category filter for the item catalog
  const [selectedCategoryTab, setSelectedCategoryTab] = useState<string>(() => {
    if (initialCategory) {
      const lower = initialCategory.toLowerCase();
      if (lower.includes('inflatable') || lower.includes('water') || lower.includes('bounce') || lower.includes('slide')) return 'inflatables';
      if (lower.includes('tent')) return 'tents';
      if (lower.includes('table') || lower.includes('chair')) return 'tables-chairs';
      if (lower.includes('concession') || lower.includes('popcorn')) return 'concessions';
      if (lower.includes('package') || lower.includes('bundle')) return 'packages';
    }
    return 'all';
  });

  // Cart / Items in the estimate
  const [cart, setCart] = useState<SelectedCartItem[]>(() => {
    if (initialItemId) {
      const found = BOOKABLE_ITEMS.find(item => item.id === initialItemId);
      if (found) return [{ item: found, quantity: 1 }];
    }
    if (initialCategory) {
      // Find the first matching item in that category
      const found = BOOKABLE_ITEMS.find(item => 
        item.name.toLowerCase().includes(initialCategory.toLowerCase()) ||
        item.category.toLowerCase().includes(initialCategory.toLowerCase())
      );
      if (found) return [{ item: found, quantity: 1 }];
    }
    // Default starter item: popular water slide so the user immediately sees a working estimate
    const defaultItem = BOOKABLE_ITEMS.find(i => i.id === 'ws-18-tropical');
    return defaultItem ? [{ item: defaultItem, quantity: 1 }] : [];
  });

  // Booking details form state
  const [details, setDetails] = useState<BookingDetails>({
    fullName: '',
    phone: '',
    email: '',
    eventDate: '',
    startTime: '11:00 AM',
    endTime: '07:00 PM',
    streetAddress: '',
    city: 'Haines City (Local)',
    surfaceType: 'grass',
    duration: 'single-day',
    notes: '',
  });

  // Validation and Submission
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [confirmation, setConfirmation] = useState<BookingConfirmation | null>(null);

  // Independent pane refs for separate scrolling
  const leftPaneRef = useRef<HTMLDivElement>(null);
  const rightPaneRef = useRef<HTMLDivElement>(null);

  // Cart modifications
  const handleAddItem = (item: BookableItem) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.item.id === item.id);
      if (existing) {
        return prev.map((c) => 
          c.item.id === item.id ? { ...c, quantity: c.quantity + 1 } : c
        );
      }
      return [...prev, { item, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (itemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(itemId);
      return;
    }
    setCart((prev) =>
      prev.map((c) => (c.item.id === itemId ? { ...c, quantity: newQty } : c))
    );
  };

  const handleRemoveItem = (itemId: string) => {
    setCart((prev) => prev.filter((c) => c.item.id !== itemId));
  };

  // Price calculations
  const selectedCityObj = useMemo(() => {
    return DELIVERY_CITIES.find((c) => c.name === details.city) || DELIVERY_CITIES[0];
  }, [details.city]);

  const subtotal = useMemo(() => {
    return cart.reduce((acc, c) => acc + c.item.price * c.quantity, 0);
  }, [cart]);

  const deliveryFee = selectedCityObj ? selectedCityObj.fee : 0;

  const surfaceFee = useMemo(() => {
    if (details.surfaceType === 'concrete' || details.surfaceType === 'indoor') {
      const inflatablesCount = cart.filter(c => c.item.category === 'inflatables').reduce((sum, c) => sum + c.quantity, 0);
      return inflatablesCount > 0 ? 25 : 0;
    }
    return 0;
  }, [details.surfaceType, cart]);

  const durationFee = useMemo(() => {
    if (details.duration === 'overnight') return 50;
    if (details.duration === 'weekend') return Math.round(subtotal * 0.5); // 50% discount for 2nd day
    return 0;
  }, [details.duration, subtotal]);

  const grandTotal = subtotal + deliveryFee + surfaceFee + durationFee;

  // Validation
  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (cart.length === 0) errors.cart = 'Please add at least one rental item to estimate & book.';
    if (!details.fullName.trim()) errors.fullName = 'Full Name is required.';
    if (!details.phone.trim()) errors.phone = 'Phone number is required.';
    if (!details.email.trim() || !/\S+@\S+\.\S+/.test(details.email)) {
      errors.email = 'Valid email is required.';
    }
    if (!details.eventDate) errors.eventDate = 'Event date is required.';
    if (!details.streetAddress.trim()) errors.streetAddress = 'Delivery street address is required.';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      // scroll to first error in the independent left pane
      leftPaneRef.current?.scrollTo({ top: 350, behavior: 'smooth' });
      window.scrollTo({ top: 350, behavior: 'smooth' });
      return;
    }

    const refNum = `BGR-${Math.floor(10000 + Math.random() * 90000)}`;
    const newConfirmation: BookingConfirmation = {
      referenceNumber: refNum,
      customerDetails: { ...details },
      items: [...cart],
      subtotal,
      deliveryFee,
      surfaceFee,
      durationFee,
      total: grandTotal,
      dateCreated: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
    };

    setConfirmation(newConfirmation);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filter items by tab
  const filteredItems = useMemo(() => {
    if (selectedCategoryTab === 'all') return BOOKABLE_ITEMS;
    return BOOKABLE_ITEMS.filter((i) => i.category === selectedCategoryTab);
  }, [selectedCategoryTab]);

  const categories = [
    { id: 'all', label: 'All Equipment', icon: Layers },
    { id: 'inflatables', label: 'Inflatables', icon: Sparkles },
    { id: 'tents', label: 'Tents', icon: Tent },
    { id: 'tables-chairs', label: 'Tables & Chairs', icon: Armchair },
    { id: 'concessions', label: 'Concessions', icon: Popcorn },
    { id: 'packages', label: 'Packages', icon: Package },
  ];

  // If in confirmation view
  if (confirmation) {
    return (
      <div className="w-full pb-24">
        <div className="max-w-[850px] mx-auto px-4 sm:px-6 pt-12 md:pt-16">
          <div className="border border-[#CBD5E1] rounded-2xl p-6 sm:p-10 shadow-sm bg-white">
            {/* Top Success Badge */}
            <div className="text-center mb-8 pb-6 border-b border-[#E8ECF1]">
              <div className="w-16 h-16 bg-blue-50 text-[#087BF5] rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-9 h-9 stroke-[2.2]" />
              </div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#087BF5] mb-1">
                BOOKING REQUEST CONFIRMED
              </p>
              <h1 className="text-3xl sm:text-4xl font-black text-[#071326] tracking-tight">
                Thank You, {confirmation.customerDetails.fullName}!
              </h1>
              <p className="text-sm sm:text-base text-[#64748B] mt-2 max-w-lg mx-auto">
                Your reservation request and estimated quote have been recorded under reference{' '}
                <span className="font-bold text-[#071326] bg-[#F1F5F9] px-2 py-0.5 rounded">
                  #{confirmation.referenceNumber}
                </span>.
              </p>
              <div className="mt-4 inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold px-3 py-1.5 rounded-full">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
                <span>Our team will call or text {confirmation.customerDetails.phone} to lock in exact delivery times.</span>
              </div>
            </div>

            {/* Event & Customer Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 text-sm">
              <div className="bg-[#F8FAFC] border border-[#E8ECF1] rounded-xl p-4 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#087BF5]">
                  Event & Location
                </h4>
                <p className="text-[#071326]">
                  <strong>Date:</strong> {confirmation.customerDetails.eventDate}
                </p>
                <p className="text-[#071326]">
                  <strong>Times:</strong> {confirmation.customerDetails.startTime} – {confirmation.customerDetails.endTime}
                </p>
                <p className="text-[#071326]">
                  <strong>Delivery Address:</strong><br />
                  {confirmation.customerDetails.streetAddress}, {confirmation.customerDetails.city}
                </p>
                <p className="text-[#64748B] text-xs">
                  <strong>Surface:</strong> {confirmation.customerDetails.surfaceType.toUpperCase()} &bull; 
                  <strong> Duration:</strong> {confirmation.customerDetails.duration.toUpperCase()}
                </p>
              </div>

              <div className="bg-[#F8FAFC] border border-[#E8ECF1] rounded-xl p-4 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#087BF5]">
                  Customer Contact
                </h4>
                <p className="text-[#071326]">
                  <strong>Name:</strong> {confirmation.customerDetails.fullName}
                </p>
                <p className="text-[#071326]">
                  <strong>Phone:</strong> {confirmation.customerDetails.phone}
                </p>
                <p className="text-[#071326]">
                  <strong>Email:</strong> {confirmation.customerDetails.email}
                </p>
                {confirmation.customerDetails.notes && (
                  <p className="text-xs text-[#64748B]">
                    <strong>Notes:</strong> {confirmation.customerDetails.notes}
                  </p>
                )}
              </div>
            </div>

            {/* Itemized Order Receipt */}
            <div className="border border-[#E8ECF1] rounded-xl overflow-hidden mb-8">
              <div className="bg-[#F1F5F9] px-4 py-3 border-b border-[#E8ECF1] font-bold text-xs uppercase tracking-wider text-[#071326] flex justify-between">
                <span>Reserved Equipment</span>
                <span>Price</span>
              </div>
              <div className="divide-y divide-[#E8ECF1]">
                {confirmation.items.map((cartItem) => (
                  <div key={cartItem.item.id} className="p-4 flex items-center justify-between text-sm">
                    <div>
                      <span className="font-bold text-[#071326]">{cartItem.item.name}</span>
                      <span className="text-xs text-[#64748B] block mt-0.5">
                        Qty: {cartItem.quantity} &times; ${cartItem.item.price} per {cartItem.item.unit}
                      </span>
                    </div>
                    <span className="font-bold text-[#071326]">
                      ${cartItem.item.price * cartItem.quantity}
                    </span>
                  </div>
                ))}
              </div>

              {/* Total calculations */}
              <div className="bg-[#F8FAFC] p-4 border-t border-[#E8ECF1] space-y-2 text-sm">
                <div className="flex justify-between text-[#64748B]">
                  <span>Equipment Subtotal</span>
                  <span>${confirmation.subtotal}</span>
                </div>
                <div className="flex justify-between text-[#64748B]">
                  <span>Delivery ({confirmation.customerDetails.city})</span>
                  <span>{confirmation.deliveryFee === 0 ? 'FREE' : `$${confirmation.deliveryFee}`}</span>
                </div>
                {confirmation.surfaceFee > 0 && (
                  <div className="flex justify-between text-[#64748B]">
                    <span>Hard Surface Sandbag Weighting</span>
                    <span>${confirmation.surfaceFee}</span>
                  </div>
                )}
                {confirmation.durationFee > 0 && (
                  <div className="flex justify-between text-[#64748B]">
                    <span>Duration Extension Fee</span>
                    <span>${confirmation.durationFee}</span>
                  </div>
                )}
                <div className="flex justify-between items-center text-lg sm:text-xl font-black text-[#071326] pt-3 border-t border-[#E8ECF1]">
                  <span>Estimated Total</span>
                  <span className="text-[#087BF5]">${confirmation.total}</span>
                </div>
              </div>
            </div>

            {/* Actions: Print and New Booking */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              <button
                onClick={() => window.print()}
                className="w-full sm:w-auto px-5 py-2.5 border border-[#CBD5E1] hover:border-[#087BF5] text-[#071326] font-semibold text-sm rounded-lg flex items-center justify-center gap-2 transition-colors"
              >
                <Printer className="w-4 h-4 text-[#64748B]" />
                <span>Print / Save Estimate</span>
              </button>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <a
                  href="tel:8632804175"
                  className="w-full sm:w-auto px-5 py-2.5 bg-white border border-[#087BF5] text-[#087BF5] font-semibold text-sm rounded-lg flex items-center justify-center transition-colors hover:bg-blue-50"
                >
                  Call 863-280-4175
                </a>
                <button
                  onClick={() => {
                    setConfirmation(null);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="w-full sm:w-auto px-6 py-2.5 bg-[#087BF5] hover:bg-[#076edc] text-white font-bold text-sm rounded-lg transition-colors flex items-center justify-center"
                >
                  Book Another Event
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white lg:h-[calc(100vh-86px)] lg:overflow-hidden flex flex-col">
      {/* Top Header Bar */}
      <div className="border-b border-[#E8ECF1] bg-white shrink-0 py-3 sm:py-4 px-4 sm:px-6">
        <div className="max-w-[1300px] mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#087BF5]">
                ONLINE BOOKING & ESTIMATE
              </p>
              <span className="hidden sm:inline text-[#CBD5E1]">&bull;</span>
              <span className="hidden sm:inline text-xs text-[#64748B]">
                Independent Scroll Panes
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl lg:text-[25px] font-black tracking-tight leading-tight text-[#071326]">
              Book & Price Estimate <span className="party-text">All at Once</span>
            </h1>
          </div>
          <div className="hidden md:flex items-center gap-3 text-xs text-[#64748B]">
            <span>Haines City & Central FL Delivery</span>
            <span className="text-[#CBD5E1]">&bull;</span>
            <a href="tel:8632804175" className="font-bold text-[#087BF5] hover:underline">
              863-280-4175
            </a>
          </div>
        </div>
      </div>

      {/* Main Split Area with Independent Scrolling Panes */}
      <div className="flex-1 lg:overflow-hidden max-w-[1300px] w-full mx-auto px-4 sm:px-6 py-4">
        {formErrors.cart && (
          <div className="mb-4 p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs font-semibold rounded-lg flex items-center gap-2">
            <span>&bull; {formErrors.cart}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 lg:h-full items-start">
          
          {/* ================= LEFT COLUMN: EQUIPMENT SELECTOR & DETAILS (INDEPENDENT SCROLL) ================= */}
          <div 
            ref={leftPaneRef}
            className="lg:col-span-7 lg:h-full lg:overflow-y-auto lg:pr-4 independent-scroll space-y-8 pb-16 lg:pb-12"
          >

            {/* STEP 1: CHOOSE RENTAL ITEMS */}
            <div className="bg-white border border-[#E8ECF1] rounded-xl p-5 sm:p-7 shadow-xs">
              <div className="flex items-center justify-between mb-5 pb-3 border-b border-[#F1F5F9]">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#087BF5]">
                    Step 1
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-[#071326]">
                    Select Your Rentals
                  </h2>
                </div>
                <span className="text-xs font-semibold text-[#64748B] bg-[#F1F5F9] px-2.5 py-1 rounded-full">
                  {cart.reduce((total, c) => total + c.quantity, 0)} items added
                </span>
              </div>

              {/* Category Filter Tabs */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-6 scrollbar-none">
                {categories.map((cat) => {
                  const Icon = cat.icon;
                  const isActive = selectedCategoryTab === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSelectedCategoryTab(cat.id)}
                      className={`shrink-0 px-3.5 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition-all ${
                        isActive
                          ? 'bg-[#087BF5] text-white shadow-xs'
                          : 'bg-[#F8FAFC] text-[#475569] hover:bg-[#F1F5F9] border border-[#E2E8F0]'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{cat.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Items Catalog List */}
              <div className="space-y-4">
                {filteredItems.map((item) => {
                  const cartEntry = cart.find((c) => c.item.id === item.id);
                  const inCart = !!cartEntry;
                  const qty = cartEntry ? cartEntry.quantity : 0;

                  return (
                    <div
                      key={item.id}
                      className={`border rounded-xl p-4 sm:p-5 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                        inCart
                          ? 'border-[#087BF5] bg-blue-50/30'
                          : 'border-[#E8ECF1] hover:border-[#CBD5E1] bg-white'
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        {/* Compact Image Placeholder */}
                        <div className="relative w-20 h-16 rounded-[8px] image-placeholder border border-dashed border-[#CBD5E1] bg-[#E9EDF2] flex items-center justify-center text-center p-1 shrink-0">
                          <span className="text-[8px] font-bold text-[#64748B] uppercase leading-tight line-clamp-2">
                            [ {item.placeholderLabel} ]
                          </span>
                          <SlotImage image={imageForItem(item.id)} />
                        </div>

                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-extrabold text-base text-[#071326] leading-tight">
                              {item.name}
                            </h3>
                          </div>
                          <p className="text-xs text-[#64748B] mt-1 line-clamp-2 max-w-md">
                            {item.description}
                          </p>
                          <div className="mt-2 flex items-center gap-2">
                            <span className="text-sm font-black text-[#087BF5]">
                              ${item.price}
                            </span>
                            <span className="text-xs text-[#94A3B8]">
                              / {item.unit}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Add or Counter Button */}
                      <div className="w-full sm:w-auto flex items-center justify-end">
                        {inCart ? (
                          <div className="flex items-center gap-2 bg-white border border-[#CBD5E1] rounded-lg p-1">
                            <button
                              type="button"
                              onClick={() => handleUpdateQuantity(item.id, qty - 1)}
                              className="w-7 h-7 rounded bg-[#F1F5F9] hover:bg-slate-200 text-[#071326] flex items-center justify-center transition-colors"
                              title="Decrease quantity"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="w-7 text-center font-bold text-sm text-[#071326]">
                              {qty}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleUpdateQuantity(item.id, qty + 1)}
                              className="w-7 h-7 rounded bg-[#087BF5] hover:bg-[#076edc] text-white flex items-center justify-center transition-colors"
                              title="Increase quantity"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleAddItem(item)}
                            className="w-full sm:w-auto px-4 py-2 bg-white border border-[#CBD5E1] hover:border-[#087BF5] hover:text-[#087BF5] text-[#071326] font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5"
                          >
                            <Plus className="w-3.5 h-3.5 text-[#087BF5]" />
                            <span>Add to Quote</span>
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* STEP 2: EVENT & DELIVERY DETAILS */}
            <div className="bg-white border border-[#E8ECF1] rounded-xl p-5 sm:p-7 shadow-xs">
              <div className="mb-5 pb-3 border-b border-[#F1F5F9]">
                <span className="text-xs font-bold uppercase tracking-wider text-[#087BF5]">
                  Step 2
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-[#071326]">
                  Event & Delivery Setup
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                {/* Delivery City */}
                <div>
                  <label className="block text-xs font-bold text-[#071326] mb-1.5 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#087BF5]" />
                    <span>Delivery City / Location *</span>
                  </label>
                  <select
                    value={details.city}
                    onChange={(e) => setDetails({ ...details, city: e.target.value })}
                    className="w-full h-11 px-3 bg-white border border-[#E5E9EE] focus:border-[#087BF5] rounded-lg text-sm text-[#071326] focus:outline-none"
                  >
                    {DELIVERY_CITIES.map((city) => (
                      <option key={city.name} value={city.name}>
                        {city.name} — {city.note}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Event Date */}
                <div>
                  <label className="block text-xs font-bold text-[#071326] mb-1.5 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#087BF5]" />
                    <span>Event Date *</span>
                  </label>
                  <input
                    type="date"
                    value={details.eventDate}
                    onChange={(e) => setDetails({ ...details, eventDate: e.target.value })}
                    className={`w-full h-11 px-3 bg-white border ${
                      formErrors.eventDate ? 'border-red-400' : 'border-[#E5E9EE]'
                    } focus:border-[#087BF5] rounded-lg text-sm text-[#071326] focus:outline-none`}
                  />
                  {formErrors.eventDate && (
                    <p className="text-[11px] text-red-500 mt-1">{formErrors.eventDate}</p>
                  )}
                </div>
              </div>

              {/* Time Slots */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-semibold text-[#071326] mb-1">
                    Event Start Time
                  </label>
                  <select
                    value={details.startTime}
                    onChange={(e) => setDetails({ ...details, startTime: e.target.value })}
                    className="w-full h-11 px-3 bg-white border border-[#E5E9EE] focus:border-[#087BF5] rounded-lg text-sm text-[#071326]"
                  >
                    <option value="09:00 AM">9:00 AM</option>
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="11:00 AM">11:00 AM</option>
                    <option value="12:00 PM">12:00 PM (Noon)</option>
                    <option value="01:00 PM">1:00 PM</option>
                    <option value="02:00 PM">2:00 PM</option>
                    <option value="03:00 PM">3:00 PM</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#071326] mb-1">
                    Event End Time
                  </label>
                  <select
                    value={details.endTime}
                    onChange={(e) => setDetails({ ...details, endTime: e.target.value })}
                    className="w-full h-11 px-3 bg-white border border-[#E5E9EE] focus:border-[#087BF5] rounded-lg text-sm text-[#071326]"
                  >
                    <option value="04:00 PM">4:00 PM</option>
                    <option value="05:00 PM">5:00 PM</option>
                    <option value="06:00 PM">6:00 PM</option>
                    <option value="07:00 PM">7:00 PM</option>
                    <option value="08:00 PM">8:00 PM</option>
                    <option value="09:00 PM">9:00 PM</option>
                  </select>
                </div>
              </div>

              {/* Surface & Duration Selectors */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-bold text-[#071326] mb-1.5">
                    Setup Surface
                  </label>
                  <div className="space-y-2">
                    <label className={`flex items-center gap-3 p-2.5 border rounded-lg cursor-pointer text-xs font-semibold transition-colors ${
                      details.surfaceType === 'grass' ? 'border-[#087BF5] bg-blue-50/40 text-[#071326]' : 'border-[#E5E9EE] text-[#475569]'
                    }`}>
                      <input
                        type="radio"
                        name="surface"
                        checked={details.surfaceType === 'grass'}
                        onChange={() => setDetails({ ...details, surfaceType: 'grass' })}
                        className="text-[#087BF5]"
                      />
                      <span>Grass (Standard Ground Stakes - Included)</span>
                    </label>

                    <label className={`flex items-center gap-3 p-2.5 border rounded-lg cursor-pointer text-xs font-semibold transition-colors ${
                      details.surfaceType === 'concrete' ? 'border-[#087BF5] bg-blue-50/40 text-[#071326]' : 'border-[#E5E9EE] text-[#475569]'
                    }`}>
                      <input
                        type="radio"
                        name="surface"
                        checked={details.surfaceType === 'concrete'}
                        onChange={() => setDetails({ ...details, surfaceType: 'concrete' })}
                        className="text-[#087BF5]"
                      />
                      <span>Concrete / Driveway (Sandbags +$25)</span>
                    </label>

                    <label className={`flex items-center gap-3 p-2.5 border rounded-lg cursor-pointer text-xs font-semibold transition-colors ${
                      details.surfaceType === 'indoor' ? 'border-[#087BF5] bg-blue-50/40 text-[#071326]' : 'border-[#E5E9EE] text-[#475569]'
                    }`}>
                      <input
                        type="radio"
                        name="surface"
                        checked={details.surfaceType === 'indoor'}
                        onChange={() => setDetails({ ...details, surfaceType: 'indoor' })}
                        className="text-[#087BF5]"
                      />
                      <span>Indoors / Gym (Sandbags +$25)</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#071326] mb-1.5">
                    Rental Duration
                  </label>
                  <div className="space-y-2">
                    <label className={`flex items-center gap-3 p-2.5 border rounded-lg cursor-pointer text-xs font-semibold transition-colors ${
                      details.duration === 'single-day' ? 'border-[#087BF5] bg-blue-50/40 text-[#071326]' : 'border-[#E5E9EE] text-[#475569]'
                    }`}>
                      <input
                        type="radio"
                        name="duration"
                        checked={details.duration === 'single-day'}
                        onChange={() => setDetails({ ...details, duration: 'single-day' })}
                        className="text-[#087BF5]"
                      />
                      <span>Standard Single Day (Included)</span>
                    </label>

                    <label className={`flex items-center gap-3 p-2.5 border rounded-lg cursor-pointer text-xs font-semibold transition-colors ${
                      details.duration === 'overnight' ? 'border-[#087BF5] bg-blue-50/40 text-[#071326]' : 'border-[#E5E9EE] text-[#475569]'
                    }`}>
                      <input
                        type="radio"
                        name="duration"
                        checked={details.duration === 'overnight'}
                        onChange={() => setDetails({ ...details, duration: 'overnight' })}
                        className="text-[#087BF5]"
                      />
                      <span>Keep Overnight (Pickup next morning +$50)</span>
                    </label>

                    <label className={`flex items-center gap-3 p-2.5 border rounded-lg cursor-pointer text-xs font-semibold transition-colors ${
                      details.duration === 'weekend' ? 'border-[#087BF5] bg-blue-50/40 text-[#071326]' : 'border-[#E5E9EE] text-[#475569]'
                    }`}>
                      <input
                        type="radio"
                        name="duration"
                        checked={details.duration === 'weekend'}
                        onChange={() => setDetails({ ...details, duration: 'weekend' })}
                        className="text-[#087BF5]"
                      />
                      <span>2-Day Weekend Bundle (+50% Rate)</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* STEP 3: CUSTOMER & DELIVERY ADDRESS */}
            <div className="bg-white border border-[#E8ECF1] rounded-xl p-5 sm:p-7 shadow-xs">
              <div className="mb-5 pb-3 border-b border-[#F1F5F9]">
                <span className="text-xs font-bold uppercase tracking-wider text-[#087BF5]">
                  Step 3
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-[#071326]">
                  Contact & Delivery Address
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-semibold text-[#071326] mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Jane Smith"
                    value={details.fullName}
                    onChange={(e) => setDetails({ ...details, fullName: e.target.value })}
                    className={`w-full h-11 px-3 bg-white border ${
                      formErrors.fullName ? 'border-red-400' : 'border-[#E5E9EE]'
                    } focus:border-[#087BF5] rounded-lg text-sm text-[#071326]`}
                  />
                  {formErrors.fullName && (
                    <p className="text-[11px] text-red-500 mt-1">{formErrors.fullName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#071326] mb-1">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="(863) 280-4175"
                    value={details.phone}
                    onChange={(e) => setDetails({ ...details, phone: e.target.value })}
                    className={`w-full h-11 px-3 bg-white border ${
                      formErrors.phone ? 'border-red-400' : 'border-[#E5E9EE]'
                    } focus:border-[#087BF5] rounded-lg text-sm text-[#071326]`}
                  />
                  {formErrors.phone && (
                    <p className="text-[11px] text-red-500 mt-1">{formErrors.phone}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-semibold text-[#071326] mb-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="jane@example.com"
                    value={details.email}
                    onChange={(e) => setDetails({ ...details, email: e.target.value })}
                    className={`w-full h-11 px-3 bg-white border ${
                      formErrors.email ? 'border-red-400' : 'border-[#E5E9EE]'
                    } focus:border-[#087BF5] rounded-lg text-sm text-[#071326]`}
                  />
                  {formErrors.email && (
                    <p className="text-[11px] text-red-500 mt-1">{formErrors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#071326] mb-1">
                    Street Address & Zip Code <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="123 Palm Ave, Haines City, FL 33844"
                    value={details.streetAddress}
                    onChange={(e) => setDetails({ ...details, streetAddress: e.target.value })}
                    className={`w-full h-11 px-3 bg-white border ${
                      formErrors.streetAddress ? 'border-red-400' : 'border-[#E5E9EE]'
                    } focus:border-[#087BF5] rounded-lg text-sm text-[#071326]`}
                  />
                  {formErrors.streetAddress && (
                    <p className="text-[11px] text-red-500 mt-1">{formErrors.streetAddress}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#071326] mb-1">
                  Delivery Notes / Gate Code / Setup Location
                </label>
                <textarea
                  rows={2}
                  placeholder="E.g., Back yard through side gate (needs 4ft clearance), water spigot is next to patio..."
                  value={details.notes}
                  onChange={(e) => setDetails({ ...details, notes: e.target.value })}
                  className="w-full p-3 bg-white border border-[#E5E9EE] focus:border-[#087BF5] rounded-lg text-sm text-[#071326] resize-y"
                />
              </div>
            </div>

          </div>

          {/* ================= RIGHT COLUMN: LIVE ESTIMATE TICKET (INDEPENDENT SCROLL) ================= */}
          <div 
            ref={rightPaneRef}
            className="lg:col-span-5 lg:h-full lg:overflow-y-auto lg:pl-1 independent-scroll pb-16 lg:pb-12"
          >
            <div className="bg-white border border-[#E5E9EE] rounded-xl p-5 sm:p-7 shadow-xs">
              <div className="flex items-center justify-between pb-4 border-b border-[#E8ECF1]">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-[#087BF5]">
                    REAL-TIME ESTIMATE
                  </p>
                  <h3 className="text-xl sm:text-2xl font-black text-[#071326]">
                    Booking Summary
                  </h3>
                </div>
                {cart.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setCart([])}
                    className="text-xs text-red-500 hover:underline font-semibold"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {/* Items List in Cart */}
              <div className="py-4 space-y-3 max-h-[300px] overflow-y-auto pr-1">
                {cart.length === 0 ? (
                  <div className="text-center py-8 px-4 bg-[#F8FAFC] border border-dashed border-[#CBD5E1] rounded-xl">
                    <p className="text-xs font-bold text-[#64748B] uppercase tracking-wider">
                      No Equipment Selected
                    </p>
                    <p className="text-xs text-[#94A3B8] mt-1">
                      Click any item on the left to add it to your estimate and calculate your total instantly.
                    </p>
                  </div>
                ) : (
                  cart.map((cartItem) => (
                    <div
                      key={cartItem.item.id}
                      className="flex items-center justify-between gap-3 text-xs sm:text-sm pb-2.5 border-b border-[#F1F5F9] last:border-none"
                    >
                      <div className="flex-1 pr-2">
                        <span className="font-bold text-[#071326] block leading-snug">
                          {cartItem.item.name}
                        </span>
                        <span className="text-[#64748B] text-xs">
                          {cartItem.quantity} &times; ${cartItem.item.price}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-[#071326]">
                          ${cartItem.item.price * cartItem.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleRemoveItem(cartItem.item.id)}
                          className="text-[#94A3B8] hover:text-red-500 p-1 rounded transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Pricing Math Breakdown */}
              <div className="border-t border-[#E8ECF1] pt-4 space-y-2.5 text-xs sm:text-sm">
                <div className="flex justify-between text-[#64748B]">
                  <span>Equipment Subtotal</span>
                  <span className="font-semibold text-[#071326]">${subtotal}</span>
                </div>

                <div className="flex justify-between text-[#64748B]">
                  <span>Delivery ({details.city})</span>
                  <span className={`font-semibold ${deliveryFee === 0 ? 'text-emerald-600' : 'text-[#071326]'}`}>
                    {deliveryFee === 0 ? 'FREE' : `$${deliveryFee}`}
                  </span>
                </div>

                {surfaceFee > 0 && (
                  <div className="flex justify-between text-[#64748B]">
                    <span>Hard Surface Sandbag Weighting</span>
                    <span className="font-semibold text-[#071326]">${surfaceFee}</span>
                  </div>
                )}

                {durationFee > 0 && (
                  <div className="flex justify-between text-[#64748B]">
                    <span>Duration Extension Fee</span>
                    <span className="font-semibold text-[#071326]">${durationFee}</span>
                  </div>
                )}

                {/* Big Grand Total */}
                <div className="pt-3 border-t border-[#E8ECF1] flex justify-between items-baseline">
                  <div>
                    <span className="text-sm font-extrabold text-[#071326] block">
                      Estimated Total
                    </span>
                    <span className="text-[11px] text-[#64748B]">
                      Includes setup & takedown
                    </span>
                  </div>
                  <span className="text-3xl font-black text-[#087BF5]">
                    ${grandTotal}
                  </span>
                </div>
              </div>

              {/* Submit Booking Button */}
              <div className="mt-6 space-y-3">
                <button
                  type="button"
                  onClick={handleSubmitBooking}
                  disabled={cart.length === 0}
                  className={`w-full py-3.5 rounded-[8px] font-bold text-sm flex items-center justify-center gap-2 shadow-xs transition-colors ${
                    cart.length === 0
                      ? 'bg-[#E2E8F0] text-[#94A3B8] cursor-not-allowed'
                      : 'bg-[#087BF5] hover:bg-[#076edc] active:bg-[#065ec0] text-white hover:translate-y-[-1px]'
                  }`}
                >
                  <span>Submit Booking Request</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </button>

                <p className="text-[11px] text-center text-[#64748B] leading-tight">
                  No payment charged now. We verify safety space, confirm schedule, and send your booking contract.
                </p>
              </div>

              {/* Direct Telephone Support */}
              <div className="mt-5 pt-4 border-t border-[#F1F5F9] text-center">
                <span className="text-xs text-[#64748B] block mb-1">
                  Prefer to book over the phone?
                </span>
                <a
                  href="tel:8632804175"
                  className="font-bold text-sm text-[#087BF5] hover:underline"
                >
                  863-280-4175 &bull; Mon–Sun 8am–8pm
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
