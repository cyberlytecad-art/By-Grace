import React, { useState } from 'react';
import { ArrowRight, Check, X } from 'lucide-react';
import { PageId } from '../types';
import { SlotImage } from '../components/SlotImage';
import { RENTAL_IMAGES } from '../data/siteImages';

interface RentalsPageProps {
  onNavigate: (page: PageId, extraData?: { preselectedCategory?: string }) => void;
}

interface RentalItem {
  id: string;
  name: string;
  placeholderLabel: string;
  shortDesc: string;
  popularItems: string[];
}

export const RentalsPage: React.FC<RentalsPageProps> = ({ onNavigate }) => {
  const [selectedRental, setSelectedRental] = useState<RentalItem | null>(null);

  const rentalCategories: RentalItem[] = [
    {
      id: 'water-slides',
      name: 'Water Slides',
      placeholderLabel: 'REPLACE WITH WATER SLIDE IMAGE',
      shortDesc: 'Cool off with our premium single and double lane commercial water slides with splash pools.',
      popularItems: ['18ft Tropical Wave Water Slide', '20ft Dual Lane Slip & Slide', 'Tsunami Splash Curve Slide'],
    },
    {
      id: 'bounce-houses',
      name: 'Bounce Houses',
      placeholderLabel: 'REPLACE WITH BOUNCE HOUSE IMAGE',
      shortDesc: 'Safe, clean, vibrant themed and classic bouncers for kids of all ages.',
      popularItems: ['Castle Theme Bouncer (15x15)', 'Rainbow Celebration Bounce House', 'Sports Arena Jumper'],
    },
    {
      id: 'combos',
      name: 'Combos',
      placeholderLabel: 'REPLACE WITH COMBO IMAGE',
      shortDesc: 'The best of both worlds: spacious jump area plus climbing wall, basketball hoop, and slide.',
      popularItems: ['4-in-1 Wet/Dry Castle Combo', 'Tropical Palm Combo with Pool', 'Multi-Color Adventure Jump & Slide'],
    },
    {
      id: 'tents',
      name: 'Tents',
      placeholderLabel: 'REPLACE WITH TENT IMAGE',
      shortDesc: 'Commercial heavy-duty high peak frame tents offering shade and weather protection for any crowd size.',
      popularItems: ['10x20 Canopy Tent', '20x20 High Peak Event Tent', '20x40 Celebration Tent with Sidewalls'],
    },
    {
      id: 'tables-chairs',
      name: 'Tables & Chairs',
      placeholderLabel: 'REPLACE WITH TABLES & CHAIRS IMAGE',
      shortDesc: 'Sturdy, clean white folding tables and commercial folding chairs sanitized before every rental.',
      popularItems: ['6ft & 8ft Heavy Duty White Banquet Tables', '60-inch Round Dining Tables', 'Commercial White Resin Folding Chairs'],
    },
    {
      id: 'concessions',
      name: 'Concessions',
      placeholderLabel: 'REPLACE WITH CONCESSIONS IMAGE',
      shortDesc: 'Fun, nostalgic event snacks including commercial popcorn makers and fluffy cotton candy machines.',
      popularItems: ['Popcorn Machine with Kernels & Bags', 'Cotton Candy Spinner with Floss Sugar', 'Snow Cone Machine with Syrups'],
    },
  ];

  return (
    <div className="w-full pb-20">
      <div className="max-w-[1250px] mx-auto px-4 sm:px-6 pt-12 md:pt-16">
        {/* Header Block: Left Aligned */}
        <div className="text-left mb-10 md:mb-12">
          {/* Small uppercase blue eyebrow */}
          <p className="text-xs md:text-sm font-bold uppercase tracking-[0.18em] text-[#087BF5] mb-2">
            RENTALS
          </p>

          {/* Large heading: “Our” dark navy/black, “Rentals” bright blue */}
          <h1 className="text-4xl sm:text-5xl md:text-[54px] font-black tracking-tight leading-tight text-[#071326] mb-4">
            Our <span className="party-text">Rentals</span>
          </h1>

          {/* Under it: Muted gray, max width ~800px */}
          <p className="text-base sm:text-[17px] text-[#64748B] max-w-[800px] leading-relaxed">
            Bounce houses, water slides, tents, tables, chairs, concessions and more. Everything you need
            for an unforgettable event in Haines City and all of Central Florida.
          </p>
        </div>

        {/* 
          RENTAL GRID
          Exactly 6 cards in a clean 3-column × 2-row grid.
          Aspect ratio ~16:9 or 1.65:1.
          Empty image placeholders for all 6.
          IMAGE
          LABEL                         →
          with white page background underneath.
          Grid gap: 20-28px horizontal, 30-40px vertical.
        */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 sm:gap-x-7 gap-y-8 sm:gap-y-10">
          {rentalCategories.map((category) => {
            return (
              <div
                key={category.id}
                onClick={() => {
                  if (category.id === 'combos') {
                    onNavigate('packages');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  } else {
                    setSelectedRental(category);
                  }
                }}
                className="group cursor-pointer select-none"
              >
                {/* 
                  Large rectangular image placeholder
                  Aspect ratio 16:9 / 1.65:1 with subtle 8-10px radius
                */}
                <div className="relative w-full aspect-[16/9.8] rounded-[10px] overflow-hidden shadow-lg shadow-[#071326]/15 image-placeholder border border-dashed border-[#CBD5E1] bg-[#E9EDF2] flex items-center justify-center text-center p-4 transition-all duration-200 group-hover:border-[#087BF5] group-hover:translate-y-[-2px]">
                  <span className="text-xs sm:text-[13px] font-bold tracking-wider text-[#64748B] uppercase">
                    [ {category.placeholderLabel} ]
                  </span>
                  <SlotImage image={RENTAL_IMAGES[category.id]} />
                </div>

                {/* Below image: category name on left, small thin blue arrow on far right */}
                <div className="mt-3.5 flex items-center justify-between px-1">
                  <h3 className="font-bold text-lg sm:text-xl text-[#071326] group-hover:text-[#087BF5] transition-colors">
                    {category.name}
                  </h3>
                  <div className="text-[#087BF5] transform group-hover:translate-x-1 transition-transform">
                    <ArrowRight className="w-5 h-5 stroke-[2]" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Quote Banner at the bottom of Rentals page */}
        <div className="mt-16 sm:mt-20 border-t border-[#E8ECF1] pt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h4 className="text-lg font-bold text-[#071326]">
              Looking for a custom combination or multi-day discount?
            </h4>
            <p className="text-sm text-[#64748B] mt-1">
              Call us directly or send a message for Haines City, Davenport, Lakeland, and all Central FL events.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => {
                onNavigate('packages');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-5 py-2.5 bg-white border border-[#CBD5E1] hover:border-[#087BF5] text-[#071326] hover:text-[#087BF5] font-semibold text-sm rounded-[8px] transition-colors"
            >
              View Packages
            </button>
            <button
              onClick={() => {
                onNavigate('estimator');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-5 py-2.5 bg-[#087BF5] hover:bg-[#076edc] text-white font-semibold text-sm rounded-[8px] transition-colors"
            >
              Estimate Price & Book →
            </button>
          </div>
        </div>
      </div>

      {/* Category Quick Details Modal (Clean & Non-intrusive) */}
      {selectedRental && (
        <div 
          className="fixed inset-0 z-50 bg-[#071326]/50 flex items-center justify-center p-4 backdrop-blur-xs"
          onClick={() => setSelectedRental(null)}
        >
          <div 
            className="bg-white rounded-xl border border-[#E8ECF1] max-w-lg w-full p-6 shadow-xl relative animate-in fade-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedRental(null)}
              className="absolute top-4 right-4 p-1.5 text-[#64748B] hover:text-[#071326] hover:bg-slate-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <p className="text-xs font-bold uppercase tracking-wider text-[#087BF5] mb-1">
              RENTAL CATEGORY
            </p>
            <h3 className="text-2xl font-black text-[#071326] mb-2">
              {selectedRental.name}
            </h3>
            <p className="text-sm text-[#64748B] mb-5">
              {selectedRental.shortDesc}
            </p>

            <div className="bg-[#F8FAFC] border border-[#E8ECF1] rounded-lg p-4 mb-6">
              <p className="text-xs font-bold uppercase tracking-wider text-[#071326] mb-2.5">
                Popular Options Available:
              </p>
              <ul className="space-y-2">
                {selectedRental.popularItems.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm text-[#334155]">
                    <Check className="w-4 h-4 text-[#087BF5] shrink-0 stroke-[2.5]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setSelectedRental(null)}
                className="px-4 py-2 border border-[#CBD5E1] text-[#475569] font-medium text-sm rounded-lg hover:bg-slate-50 transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const catName = selectedRental.name;
                  setSelectedRental(null);
                  onNavigate('estimator', { preselectedCategory: catName });
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-5 py-2 bg-[#087BF5] hover:bg-[#076edc] text-white font-bold text-sm rounded-lg flex items-center gap-2 transition-colors"
              >
                <span>Estimate & Book {selectedRental.name}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
