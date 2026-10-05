import React from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { PageId } from '../types';
import { SlotImage } from '../components/SlotImage';
import { PageBand } from '../components/PageBand';
import { PACKAGE_IMAGES } from '../data/siteImages';

interface PackagesPageProps {
  onNavigate: (page: PageId, extraData?: { preselectedCategory?: string; preselectedItemId?: string }) => void;
}

export const PackagesPage: React.FC<PackagesPageProps> = ({ onNavigate }) => {
  // The three bundles from By Grace's "Especiales de Pascua" (Easter) flyer on Instagram.
  const sharedExtras = ['12 Chairs', '2 Tables', '10x10 Tent'];
  const packages = [
    {
      id: 'pkg-01',
      code: 'PACKAGE 01',
      name: 'Bounce House Package',
      placeholderLabel: 'REPLACE WITH PACKAGE 01 IMAGE',
      description: 'A 15x15 bounce house with seating and shade for a backyard birthday or family party.',
      details: ['15x15 Bounce House', ...sharedExtras],
      price: '$225',
    },
    {
      id: 'pkg-02',
      code: 'PACKAGE 02',
      name: 'Water Slide Package',
      placeholderLabel: 'REPLACE WITH PACKAGE 02 IMAGE',
      description: 'A water slide with seating and shade to keep everyone cool on a hot Florida day.',
      details: ['Water Slide', ...sharedExtras],
      price: '$380',
    },
    {
      id: 'pkg-03',
      code: 'PACKAGE 03',
      name: 'Combo Package',
      placeholderLabel: 'REPLACE WITH PACKAGE 03 IMAGE',
      description: 'A bounce house and slide combo with seating and shade, so kids can jump and slide all day.',
      details: ['Bounce House & Slide Combo', ...sharedExtras],
      price: '$300',
    },
  ];

  return (
    <div className="w-full pb-20">
      <PageBand eyebrow="PACKAGES" title={<>Party <span className="sun-text">Packages</span></>}>
        <p>
          Pick a bounce house, water slide or combo and get chairs, tables and a tent with it.
          We deliver and set everything up in Haines City and across Central Florida.
        </p>
      </PageBand>

      <div className="relative z-10 max-w-[1250px] mx-auto px-4 sm:px-6 -mt-8 sm:-mt-10">

        {/* 
          PACKAGES GRID
          Clean 3-column layout consistent with the Rentals page.
          Subtle borders, clean typography, image placeholders.
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {packages.map((pkg, i) => {
            const accent = ['#EC4899', '#0EA5E9', '#8B5CF6'][i % 3];
            return (
              <div
                key={pkg.id}
                className="bg-white border-t-[6px] shadow-xl shadow-[#071326]/15 hover:shadow-2xl rounded-[20px] p-5 sm:p-6 flex flex-col justify-between transition-all hover:translate-y-[-3px] group"
                style={{ borderTopColor: accent }}
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
                    <p className="text-3xl font-black leading-none" style={{ color: accent }}>{pkg.price}</p>
                    <p className="text-[11px] font-semibold text-[#64748B] mt-1">Easter special price</p>
                  </div>
                </div>

                {/* Action Button */}
                <button
                  onClick={() => {
                    onNavigate('estimator', { preselectedCategory: 'packages', preselectedItemId: pkg.id.replace('pkg-', 'pkg-bundle-') });
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="w-full py-3 text-white font-bold text-sm rounded-full flex items-center justify-center gap-2 shadow-md transition-all hover:brightness-110"
                  style={{ backgroundColor: accent }}
                >
                  <span>Choose This Package</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.2]" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Custom Bundling note */}
        <div className="mt-14 sunny-band shadow-2xl shadow-[#F97316]/30 rounded-[28px] p-7 sm:p-10 text-center max-w-2xl mx-auto">
          <h4 className="text-xl sm:text-2xl font-black text-white drop-shadow-sm">
            Need something different for your event?
          </h4>
          <p className="text-sm sm:text-base text-white/95 mt-1.5 mb-6">
            Mix and match bounce houses, slides, tents, tables and chairs. Build your quote and we'll confirm the price with you.
          </p>
          <button
            onClick={() => {
              onNavigate('estimator');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-7 py-3 bg-white hover:bg-[#FFF7ED] text-[#C2410C] text-sm font-bold rounded-full shadow-lg transition-colors"
          >
            Build Your Own Quote →
          </button>
        </div>
      </div>
    </div>
  );
};
