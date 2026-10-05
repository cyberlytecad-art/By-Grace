import React from 'react';
import { Phone, MapPin, Clock, Instagram } from 'lucide-react';
import { PageId } from '../types';
import { Logo } from './Logo';
import { INSTAGRAM_HANDLE, INSTAGRAM_URL } from '../data/siteImages';

interface FooterProps {
  onNavigate: (page: PageId) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleNavClick = (pageId: PageId) => {
    onNavigate(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gradient-to-b from-white to-[#F3F8FF] border-t border-[#E8ECF1] mt-16 md:mt-24">
      <div className="max-w-[1250px] mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
          {/* Col 1: Brand & Logo */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <Logo className="w-12 h-12 text-base" />
              <div>
                <span className="block font-display text-xl font-bold text-[#071326] tracking-tight">
                  BY GRACE PARTY RENTALS
                </span>
                <span className="block text-xs font-semibold text-[#087BF5] uppercase tracking-wider">
                  Haines City, FL & Central Florida
                </span>
              </div>
            </div>
            <p className="text-sm text-[#64748B] max-w-sm leading-relaxed">
              Family-owned party rental company providing clean, high-quality bounce houses, water slides, tents, tables, chairs, and concessions for any special event.
            </p>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#8B5CF6] via-[#E1306C] to-[#FF9F43] text-white px-4 py-2 text-sm font-semibold shadow-sm hover:shadow-md hover:translate-y-[-1px] transition-all"
            >
              <Instagram className="w-4 h-4" />
              <span>@{INSTAGRAM_HANDLE}</span>
            </a>
          </div>

          {/* Col 2: Quick Links */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#087BF5] mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm font-medium text-[#071326]">
              <li>
                <button
                  onClick={() => handleNavClick('home')}
                  className="hover:text-[#087BF5] transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('rentals')}
                  className="hover:text-[#087BF5] transition-colors"
                >
                  Our Rentals
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('packages')}
                  className="hover:text-[#087BF5] transition-colors"
                >
                  Party Packages
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('estimator')}
                  className="hover:text-[#087BF5] transition-colors"
                >
                  Book & Price Estimate
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('about-contact')}
                  className="hover:text-[#087BF5] transition-colors"
                >
                  About & Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Direct Contact */}
          <div className="md:col-span-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#087BF5] mb-4">
              Contact Us
            </h4>
            <div className="space-y-3 text-sm text-[#071326]">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-blue-50 text-[#087BF5] flex items-center justify-center shrink-0">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <div className="font-semibold text-xs sm:text-sm">
                  <a href="tel:8632804175" className="hover:text-[#087BF5] transition-colors">
                    863-280-4175
                  </a>
                  <span className="text-[#94A3B8] mx-1.5">•</span>
                  <a href="tel:3215229690" className="hover:text-[#087BF5] transition-colors">
                    321-522-9690
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center shrink-0">
                  <MapPin className="w-3.5 h-3.5" />
                </div>
                <div className="text-xs sm:text-sm text-[#475569]">
                  Haines City, FL &bull; Serving Central Florida
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                  <Clock className="w-3.5 h-3.5" />
                </div>
                <div className="text-xs sm:text-sm text-[#475569]">
                  Mon – Sun: 8:00 AM – 8:00 PM
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-[#E8ECF1] flex flex-col sm:flex-row items-center justify-between text-xs text-[#64748B] gap-4">
          <p>© {new Date().getFullYear()} By Grace Party Rentals. All rights reserved.</p>
          <p>Haines City &bull; Lakeland &bull; Davenport &bull; Kissimmee &bull; Orlando & Central Florida</p>
        </div>
      </div>
    </footer>
  );
};
