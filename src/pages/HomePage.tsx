import React from 'react';
import { ArrowRight, Tent, Armchair, Package, Popcorn, Sparkles } from 'lucide-react';
import { PageId } from '../types';
import { SlotImage } from '../components/SlotImage';
import { HERO } from '../data/siteImages';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const categoryCards = [
    {
      id: 'inflatables',
      title: 'Inflatables',
      desc: 'Bounce houses, combos, water slides & more.',
      icon: Sparkles,
      iconColor: 'text-[#087BF5]',
      iconBg: 'bg-blue-50',
      targetPage: 'rentals' as PageId,
    },
    {
      id: 'tents',
      title: 'Tents',
      desc: 'Tents for any size event.',
      icon: Tent,
      iconColor: 'text-[#F97316]',
      iconBg: 'bg-orange-50',
      targetPage: 'rentals' as PageId,
    },
    {
      id: 'tables-chairs',
      title: 'Tables & Chairs',
      desc: 'Everything you need for your party.',
      icon: Armchair,
      iconColor: 'text-[#10B981]',
      iconBg: 'bg-emerald-50',
      targetPage: 'rentals' as PageId,
    },
    {
      id: 'concessions',
      title: 'Concessions',
      desc: 'Popcorn, cotton candy and more.',
      icon: Popcorn,
      iconColor: 'text-[#EF4444]',
      iconBg: 'bg-rose-50',
      targetPage: 'rentals' as PageId,
    },
    {
      id: 'packages',
      title: 'Packages',
      desc: 'Bounce house, slide & combo bundles.',
      icon: Package,
      iconColor: 'text-[#8B5CF6]',
      iconBg: 'bg-purple-50',
      targetPage: 'packages' as PageId,
    },
  ];

  return (
    <div className="w-full">
      {/* 
        HERO SECTION
        Height: approx 650-760px on 1440px desktop
        One large full-width image placeholder occupying almost the entire hero.
      */}
      <section className="relative w-full overflow-hidden">
        {/* Replaceable Hero Background Container */}
        <div 
          className="hero-placeholder-bg relative w-full h-[640px] sm:h-[min(720px,calc(100svh-140px))] lg:h-[min(780px,calc(100svh-140px))] sm:min-h-[560px] flex items-center pb-16"
        >
          {/* Photo layers fade out at the bottom so the hero melts into the page instead of ending on a hard edge. */}
          <div className="hero-fade absolute inset-0">
            {/* Visual indicator for the placeholder slot */}
            <div className="absolute inset-0 bg-[#D9DFE7] flex items-center justify-end pr-10 lg:pr-24 pointer-events-none opacity-40 select-none">
              <div className="border-2 border-dashed border-[#94A3B8] p-6 rounded-xl text-right max-w-md hidden md:block">
                <p className="text-xs font-bold text-[#475569] tracking-wider uppercase">
                  [ REPLACE WITH LARGE PARTY RENTAL HERO PHOTO ]
                </p>
                <p className="text-[11px] text-[#64748B] mt-1 leading-normal">
                  Intended: Tropical blue water slide on right, green palms, party tent & tables on left, bounce house behind, Florida backyard & blue sky.
                </p>
              </div>
            </div>

            <SlotImage image={HERO} eager />

            {/* Subtle dark/blue translucent gradient overlay on left for readability */}
            <div 
              className="absolute inset-0 bg-gradient-to-r from-[#071326]/85 via-[#071326]/55 to-transparent pointer-events-none"
              aria-hidden="true"
            />
          </div>

          {/* Hero Content aligned ~10-12% from the left edge */}
          <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16 xl:px-24">
            <div className="max-w-2xl lg:max-w-3xl">
              {/* Eyebrow */}
              <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-[#20BEEF] mb-3">
                BY GRACE PARTY RENTALS
              </p>

              {/* Main Headline (max 2 lines) */}
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[76px] font-black uppercase tracking-tight leading-[0.95] text-white mb-5 select-none">
                <span>FUN FOR</span>
                <br />
                <span className="text-[#20BEEF]">EVERY EVENT</span>
              </h1>

              {/* Subheadline (2 lines, ~16px) */}
              <p className="text-sm sm:text-base text-white/95 max-w-lg font-normal leading-relaxed mb-8">
                Bounce houses, water slides, tents, tables, chairs and more.
                <br className="hidden sm:inline" />
                Serving Haines City & all of Central Florida.
              </p>

              {/* Hero Buttons (side by side, around 150-170px wide, 48-52px tall) */}
              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={() => {
                    onNavigate('rentals');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="w-[155px] sm:w-[165px] h-[50px] bg-[#087BF5] hover:bg-[#076edc] active:bg-[#065ec0] text-white font-bold text-sm rounded-[8px] inline-flex items-center justify-center gap-2 shadow-sm transition-all hover:translate-y-[-1px]"
                >
                  <span>View Rentals</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </button>

                <button
                  onClick={() => {
                    onNavigate('estimator');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="w-[155px] sm:w-[165px] h-[50px] bg-white/10 hover:bg-white/20 active:bg-white/25 text-white font-bold text-sm rounded-[8px] border border-white/80 inline-flex items-center justify-center backdrop-blur-xs transition-all hover:translate-y-[-1px]"
                >
                  Get a Quote
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM CATEGORY BAR: one frosted glass strip resting on the faded bottom of the hero. */}
        <div className="relative -mt-32 sm:-mt-36 z-20 max-w-[1250px] mx-auto px-4 sm:px-6 pb-12">
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-px bg-white/50 rounded-2xl overflow-hidden border border-white/70 shadow-2xl shadow-[#071326]/20 backdrop-blur-xl">
            {categoryCards.map((card, i) => {
              const IconComponent = card.icon;
              return (
                <div
                  key={card.id}
                  onClick={() => {
                    onNavigate(card.targetPage);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`cursor-pointer bg-white/75 hover:bg-white p-4 sm:p-5 flex items-center gap-3.5 transition-colors group ${i === categoryCards.length - 1 ? 'col-span-2 lg:col-span-1' : ''}`}
                >
                  <div className={`w-11 h-11 rounded-xl ${card.iconBg} ${card.iconColor} flex items-center justify-center shrink-0 transition-transform group-hover:scale-110`}>
                    <IconComponent className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <div className="min-w-0">
                    <span className="block font-bold text-sm sm:text-[15px] text-[#071326] group-hover:text-[#087BF5] transition-colors leading-tight">
                      {card.title}
                    </span>
                    <p className="text-[11px] sm:text-xs text-[#64748B] leading-snug mt-0.5 line-clamp-2">
                      {card.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trust & Local Service Highlight Banner */}
      <section className="max-w-[1250px] mx-auto px-4 sm:px-6 mt-16 sm:mt-20">
        <div className="party-banner border border-[#D3DDE9] shadow-lg shadow-[#071326]/10 rounded-xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <p className="text-xs font-bold uppercase tracking-wider text-[#087BF5]">
              Local & Family-Owned in Haines City, FL
            </p>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#071326]">
              Planning a Birthday, School Event, or Church Gathering?
            </h2>
            <p className="text-sm text-[#64748B]">
              We deliver, set up and clean every bounce house, water slide, tent and table so your event runs smoothly.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => {
                onNavigate('rentals');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="bg-[#087BF5] hover:bg-[#076edc] text-white px-5 py-2.5 rounded-[8px] font-semibold text-sm transition-colors"
            >
              Browse Catalog
            </button>
            <a
              href="tel:8632804175"
              className="border border-[#CBD5E1] hover:border-[#087BF5] text-[#071326] hover:text-[#087BF5] bg-white px-4 py-2.5 rounded-[8px] font-semibold text-sm transition-colors"
            >
              863-280-4175
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
