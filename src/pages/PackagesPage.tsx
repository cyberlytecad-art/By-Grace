import React from 'react';
import { ArrowRight, Check, PartyPopper } from 'lucide-react';
import { PageId } from '../types';
import { SmartImage } from '../components/SmartImage';
import { PACKAGE_IMAGES } from '../data/siteImages';

const PACKAGE_TONES = ['berry', 'blue', 'sunset'] as const;

interface PackagesPageProps {
  onNavigate: (page: PageId, extraData?: { preselectedCategory?: string }) => void;
}

export const PackagesPage: React.FC<PackagesPageProps> = ({ onNavigate }) => {
  const packages = [
    {
      id: 'pkg-01',
      code: 'PACKAGE 01',
      name: 'Backyard Birthday Bundle',
      placeholderLabel: 'REPLACE WITH PACKAGE 01 IMAGE',
      description: 'Ideal for home birthdays and family gatherings. Includes a commercial bounce house, tables, and chairs.',
      details: [
        'Choice of Standard Themed Bounce House (15x15)',
        '2 Commercial 6ft Folding Tables',
        '12 White Folding Chairs',
        'Complete Delivery, Setup & Takedown',
      ],
      pricePlaceholder: 'Bundled rate · ask us for details',
    },
    {
      id: 'pkg-02',
      code: 'PACKAGE 02',
      name: 'Summer Splash Combo Bundle',
      placeholderLabel: 'REPLACE WITH PACKAGE 02 IMAGE',
      description: 'Our most popular Florida summer package. Beat the heat with an inflatable water slide and heavy-duty shade tent.',
      details: [
        'Commercial Water Slide or Wet/Dry Combo',
        '10x20 Commercial Canopy / Event Tent',
        '3 Commercial Folding Tables + 18 Chairs',
        'Commercial Hose & Anchor Setup Included',
      ],
      pricePlaceholder: 'Bundled rate · ask us for details',
    },
    {
      id: 'pkg-03',
      code: 'PACKAGE 03',
      name: 'Ultimate Community Celebration',
      placeholderLabel: 'REPLACE WITH PACKAGE 03 IMAGE',
      description: 'The complete package for school festivals, church events, corporate picnics, and neighborhood block parties.',
      details: [
        'Large Inflatable Water Slide or Multi-Play Combo',
        '20x20 High Peak Event Tent',
        '4 Tables + 24 Chairs',
        'Popcorn or Cotton Candy Machine with Supplies',
      ],
      pricePlaceholder: 'Bundled rate · ask us for details',
    },
  ];

  return (
    <div className="w-full bg-white pb-20">
      <div className="max-w-[1250px] mx-auto px-4 sm:px-6 pt-12 md:pt-16">
        {/* Header Block: Left Aligned, matching Rentals page */}
        <div className="text-left mb-10 md:mb-12">
          {/* Small uppercase blue eyebrow */}
          <p className="text-xs md:text-sm font-bold uppercase tracking-[0.18em] text-[#087BF5] mb-2">
            PACKAGES
          </p>

          {/* Large heading */}
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight text-[#071326] mb-4">
            Party <span className="text-[#087BF5]">Packages</span>
          </h1>

          {/* Supporting paragraph */}
          <p className="text-base sm:text-[17px] text-[#64748B] max-w-[800px] leading-relaxed">
            Bundle your bounce houses, water slides, tents, tables, and chairs to get the best value for your event.
            All packages include delivery, sanitization, professional setup, and takedown in Haines City and Central Florida.
          </p>
        </div>

        {/* 
          PACKAGES GRID
          Clean 3-column layout consistent with the Rentals page.
          Subtle borders, clean typography, image placeholders.
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {packages.map((pkg, idx) => {
            return (
              <div
                key={pkg.id}
                className={`relative bg-white rounded-2xl p-5 sm:p-6 flex flex-col justify-between transition-all hover:translate-y-[-4px] group ${idx === 1 ? 'ring-2 ring-[#087BF5] shadow-xl shadow-[#087BF5]/15' : 'ring-1 ring-[#E8ECF1] hover:ring-[#CBD5E1] hover:shadow-xl hover:shadow-slate-200/70'}`}
              >
                <div>
                  {/* Eyebrow & Package Code */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#087BF5]">
                      {pkg.code}
                    </span>
                    {idx === 1 ? (
                      <span className="text-[11px] font-bold text-white bg-gradient-to-r from-[#FF6B4A] to-[#FF9F43] px-2.5 py-1 rounded-full">
                        Most Popular
                      </span>
                    ) : (
                      <span className="text-[11px] font-semibold text-[#64748B] bg-[#F1F5F9] px-2.5 py-1 rounded-full">
                        Central FL Bundle
                      </span>
                    )}
                  </div>

                  {/* Photo */}
                  <div className="rounded-xl overflow-hidden mb-5 -mx-1">
                    <SmartImage
                      image={PACKAGE_IMAGES[pkg.id]}
                      tone={PACKAGE_TONES[idx % PACKAGE_TONES.length]}
                      icon={PartyPopper}
                      label={pkg.code}
                      className="w-full aspect-[16/10]"
                      imgClassName="transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-display font-semibold text-2xl text-[#071326] mb-2 group-hover:text-[#087BF5] transition-colors">
                    {pkg.name}
                  </h3>
                  <p className="text-sm text-[#64748B] mb-5 leading-relaxed">
                    {pkg.description}
                  </p>

                  {/* Included Items Checklist */}
                  <div className="border-t border-[#F1F5F9] pt-4 mb-5">
                    <p className="text-xs font-bold uppercase tracking-wider text-[#071326] mb-3">
                      Package Includes:
                    </p>
                    <ul className="space-y-2">
                      {pkg.details.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-[#475569]">
                          <Check className="w-4 h-4 text-[#087BF5] shrink-0 mt-0.5 stroke-[2.5]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Price / Details Placeholder */}
                  <div className="bg-[#F8FAFC] border border-[#E8ECF1] rounded-lg p-3 text-center mb-6">
                    <p className="text-[11px] font-bold text-[#64748B] tracking-wider uppercase">
                      {pkg.pricePlaceholder}
                    </p>
                  </div>
                </div>

                {/* Action Button */}
                <button
                  onClick={() => {
                    onNavigate('estimator', { preselectedCategory: pkg.name });
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="w-full py-3 bg-gradient-to-r from-[#087BF5] to-[#20BEEF] hover:from-[#076edc] hover:to-[#14ADE0] text-white font-bold text-sm rounded-full flex items-center justify-center gap-2 shadow-md shadow-[#087BF5]/25 transition-all"
                >
                  <span>Book & Price This Package</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.2]" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Custom Bundling note */}
        <div className="mt-14 bg-[#F3F8FF] ring-1 ring-[#E1ECFB] rounded-[28px] p-8 sm:p-10 text-center max-w-2xl mx-auto">
          <h4 className="font-display text-2xl font-semibold text-[#071326]">
            Need a custom package for your specific event size?
          </h4>
          <p className="text-sm text-[#64748B] mt-1.5 mb-5">
            We customize packages with extra tables, chairs, generators, and multiple inflatables. Build and price your custom package in real time!
          </p>
          <button
            onClick={() => {
              onNavigate('estimator');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-6 py-3 bg-gradient-to-r from-[#087BF5] to-[#20BEEF] hover:from-[#076edc] hover:to-[#14ADE0] text-white text-sm font-semibold rounded-full shadow-md shadow-[#087BF5]/25 transition-all"
          >
            Customize Your Package & Estimate →
          </button>
        </div>
      </div>
    </div>
  );
};
