import React from 'react';
import { ArrowRight, Candy, Dices, IceCreamCone, Music, Sparkles } from 'lucide-react';
import { PageId } from '../types';
import { SlotImage } from '../components/SlotImage';
import { RENTAL_IMAGES, SiteImage } from '../data/siteImages';
import { RENTAL_INVENTORY } from '../data/rentalInventory';

interface RentalsPageProps {
  onNavigate: (page: PageId, extraData?: { preselectedCategory?: string }) => void;
}

interface RentalItem {
  id: string;
  name: string;
  placeholderLabel: string;
  shortDesc: string;
  image?: SiteImage;
}

/** Icons for items that don't have a photo yet. */
const PLACEHOLDER_ICONS: Record<string, React.ElementType> = {
  'cotton-candy': Candy,
  'snow-cone': IceCreamCone,
  'dj-service': Music,
  'giant-games': Dices,
};

/** Mosaic layout: water slides is the big feature tile, the rest fill around it. */
const TILE_SPANS: Record<string, string> = {
  'water-slides': 'col-span-2 row-span-2',
  'bounce-houses': 'lg:col-span-2',
  'decor-more': 'lg:col-span-2',
};

const scrollToSection = (id: string) => {
  document.getElementById(`rentals-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

export const RentalsPage: React.FC<RentalsPageProps> = ({ onNavigate }) => {
  const rentalCategories: RentalItem[] = [
    {
      id: 'water-slides',
      name: 'Water Slides',
      placeholderLabel: 'REPLACE WITH WATER SLIDE IMAGE',
      shortDesc: 'Cool off with our premium single and double lane commercial water slides with splash pools.',
    },
    {
      id: 'bounce-houses',
      name: 'Bounce Houses',
      placeholderLabel: 'REPLACE WITH BOUNCE HOUSE IMAGE',
      shortDesc: 'Safe, clean, vibrant themed and classic bouncers for kids of all ages.',
    },
    {
      id: 'combos',
      name: 'Combos',
      placeholderLabel: 'REPLACE WITH COMBO IMAGE',
      shortDesc: 'The best of both worlds: spacious jump area plus climbing wall, basketball hoop, and slide.',
    },
    {
      id: 'tents',
      name: 'Tents',
      placeholderLabel: 'REPLACE WITH TENT IMAGE',
      shortDesc: 'Commercial heavy-duty high peak frame tents offering shade and weather protection for any crowd size.',
    },
    {
      id: 'tables-chairs',
      name: 'Tables & Chairs',
      placeholderLabel: 'REPLACE WITH TABLES & CHAIRS IMAGE',
      shortDesc: 'Sturdy, clean white folding tables and commercial folding chairs sanitized before every rental.',
    },
    {
      id: 'concessions',
      name: 'Concessions',
      placeholderLabel: 'REPLACE WITH CONCESSIONS IMAGE',
      shortDesc: 'Fun, nostalgic event snacks including commercial popcorn makers and fluffy cotton candy machines.',
    },
    {
      id: 'decor-more',
      name: 'Decor & More',
      placeholderLabel: 'REPLACE WITH DECOR IMAGE',
      shortDesc: 'Balloon decor, DJ service and giant games to finish off the party.',
      image: { src: `${import.meta.env.BASE_URL}images/items/balloon-decor.jpg`, alt: 'Balloon decor' },
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

        {/* RENTAL GRID: a photo mosaic. Each tile scrolls down to that category's items below. */}
        <div className="grid grid-cols-2 lg:grid-cols-4 auto-rows-[170px] sm:auto-rows-[210px] lg:auto-rows-[230px] gap-3 sm:gap-4">
          {rentalCategories.map((category) => {
            const count = RENTAL_INVENTORY.find((s) => s.id === category.id)?.items.length ?? 0;
            const featured = category.id === 'water-slides';
            const wide = featured || Boolean(TILE_SPANS[category.id]);
            return (
              <div
                key={category.id}
                onClick={() => scrollToSection(category.id)}
                className={`group relative cursor-pointer select-none rounded-2xl overflow-hidden bg-[#0B1B33] shadow-xl shadow-[#071326]/20 ring-1 ring-[#071326]/10 ${TILE_SPANS[category.id] ?? ''}`}
              >
                <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-105">
                  <SlotImage image={category.image ?? RENTAL_IMAGES[category.id]} eager={featured} />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#071326]/85 via-[#071326]/25 to-transparent" aria-hidden="true" />

                <span className="absolute top-3 left-3 sm:top-4 sm:left-4 px-2.5 py-1 rounded-full bg-white/90 text-[11px] sm:text-xs font-bold text-[#071326] shadow-sm">
                  {count} {count === 1 ? 'option' : 'options'}
                </span>

                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 lg:p-6 flex items-end justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className={`font-black text-white tracking-tight leading-tight drop-shadow ${featured ? 'text-2xl sm:text-4xl' : 'text-lg sm:text-2xl'}`}>
                      {category.name}
                    </h3>
                    <p className={`text-white/85 text-sm mt-1 leading-snug ${featured ? 'hidden sm:block max-w-md' : wide ? 'hidden lg:block max-w-md' : 'hidden'}`}>
                      {category.shortDesc}
                    </p>
                  </div>
                  <div className="shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/40 text-white flex items-center justify-center transition-all group-hover:bg-[#087BF5] group-hover:border-[#087BF5]">
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.2] transition-transform group-hover:translate-x-0.5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Every item, grouped by category. The cards above scroll down to these. */}
        {RENTAL_INVENTORY.map((section) => (
          <section key={section.id} id={`rentals-${section.id}`} className="scroll-mt-28 mt-16 sm:mt-20">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-6 sm:mb-8">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#087BF5] mb-1.5">
                  {section.items.length} {section.items.length === 1 ? 'option' : 'options'}
                </p>
                <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[#071326]">{section.name}</h2>
                <p className="text-sm sm:text-base text-[#64748B] mt-2 max-w-[640px]">{section.blurb}</p>
              </div>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="self-start sm:self-auto text-sm font-semibold text-[#087BF5] hover:text-[#076edc] whitespace-nowrap"
              >
                Back to all rentals ↑
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
              {section.items.map((item) => {
                const Icon = PLACEHOLDER_ICONS[item.id] ?? Sparkles;
                return (
                  <div
                    key={item.id}
                    className="flex flex-col bg-white rounded-[12px] border border-[#D3DDE9] shadow-lg shadow-[#071326]/10 overflow-hidden transition-all duration-200 hover:border-[#087BF5] hover:shadow-xl hover:translate-y-[-2px]"
                  >
                    {item.image ? (
                      <div className="relative w-full aspect-[4/3] bg-[#E9EDF2] image-placeholder">
                        <SlotImage image={item.image} />
                      </div>
                    ) : (
                      <div className="w-full aspect-[4/3] party-banner flex flex-col items-center justify-center gap-3 text-[#087BF5]">
                        <Icon className="w-14 h-14 stroke-[1.5]" />
                        <span className="text-xs font-bold uppercase tracking-wider text-[#64748B]">Photo coming soon</span>
                      </div>
                    )}
                    <div className="flex flex-col flex-1 p-5">
                      <h3 className="font-bold text-lg text-[#071326]">{item.name}</h3>
                      <p className="text-sm text-[#64748B] mt-1.5 leading-relaxed flex-1">{item.description}</p>
                      <button
                        onClick={() => {
                          onNavigate('estimator', { preselectedCategory: section.name });
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="mt-4 self-start px-4 py-2 bg-[#087BF5] hover:bg-[#076edc] text-white font-semibold text-sm rounded-[8px] flex items-center gap-2 transition-colors"
                      >
                        <span>Get a Quote</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        ))}

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

    </div>
  );
};
