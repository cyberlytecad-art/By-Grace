import React from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { PageId } from '../types';
import { SlotImage } from '../components/SlotImage';
import { PACKAGE_IMAGES } from '../data/siteImages';

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
      pricePlaceholder: '[ CUSTOM BUNDLED RATE / INQUIRE FOR DETAILS ]',
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
      pricePlaceholder: '[ CUSTOM BUNDLED RATE / INQUIRE FOR DETAILS ]',
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
      pricePlaceholder: '[ CUSTOM BUNDLED RATE / INQUIRE FOR DETAILS ]',
    },
  ];

  return (
    <div className="w-full pb-20">
      <div className="max-w-[1250px] mx-auto px-4 sm:px-6 pt-12 md:pt-16">
        {/* Header Block: Left Aligned, matching Rentals page */}
        <div className="text-left mb-10 md:mb-12">
          {/* Small uppercase blue eyebrow */}
          <p className="text-xs md:text-sm font-bold uppercase tracking-[0.18em] text-[#087BF5] mb-2">
            PACKAGES
          </p>

          {/* Large heading */}
          <h1 className="text-4xl sm:text-5xl md:text-[54px] font-black tracking-tight leading-tight text-[#071326] mb-4">
            Party <span className="party-text">Packages</span>
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
          {packages.map((pkg) => {
            return (
              <div
                key={pkg.id}
                className="bg-white border border-[#D3DDE9] hover:border-[#087BF5] shadow-lg shadow-[#071326]/10 hover:shadow-xl rounded-xl p-5 sm:p-6 flex flex-col justify-between transition-all hover:translate-y-[-2px] group"
              >
                <div>
                  {/* Eyebrow & Package Code */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#087BF5]">
                      {pkg.code}
                    </span>
                    <span className="text-[11px] font-semibold text-[#64748B] bg-[#F1F5F9] px-2 py-0.5 rounded">
                      Central FL Bundle
                    </span>
                  </div>

                  {/* Image Placeholder */}
                  <div className="relative w-full aspect-[16/10] rounded-[8px] image-placeholder border border-dashed border-[#CBD5E1] bg-[#E9EDF2] flex items-center justify-center text-center p-3 mb-4">
                    <span className="text-[11px] sm:text-xs font-bold text-[#64748B] uppercase tracking-wider">
                      [ {pkg.placeholderLabel} ]
                    </span>
                    <SlotImage image={PACKAGE_IMAGES[pkg.id]} />
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-extrabold text-xl text-[#071326] mb-2 group-hover:text-[#087BF5] transition-colors">
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
                  className="w-full py-3 bg-[#087BF5] hover:bg-[#076edc] active:bg-[#065ec0] text-white font-bold text-sm rounded-[8px] flex items-center justify-center gap-2 transition-colors"
                >
                  <span>Book & Price This Package</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.2]" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Custom Bundling note */}
        <div className="mt-14 party-banner border border-[#D3DDE9] shadow-lg shadow-[#071326]/10 rounded-xl p-6 sm:p-8 text-center max-w-2xl mx-auto">
          <h4 className="text-lg font-bold text-[#071326]">
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
            className="px-6 py-2.5 bg-[#087BF5] hover:bg-[#076edc] text-white text-sm font-semibold rounded-[8px] transition-colors"
          >
            Customize Your Package & Estimate →
          </button>
        </div>
      </div>
    </div>
  );
};
