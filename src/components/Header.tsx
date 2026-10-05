import React, { useState } from 'react';
import { Phone, Menu, X } from 'lucide-react';
import { PageId } from '../types';
import { SlotImage } from './SlotImage';
import { LOGO } from '../data/siteImages';

interface HeaderProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: PageId; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'rentals', label: 'Rentals' },
    { id: 'packages', label: 'Packages' },
    { id: 'estimator', label: 'Book & Estimate' },
    { id: 'about-contact', label: 'About & Contact' },
  ];

  const handleNavClick = (pageId: PageId) => {
    onNavigate(pageId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-[#E8ECF1]">
      <div className="party-stripe h-1 w-full" aria-hidden="true" />
      <div className="max-w-[1250px] mx-auto px-4 sm:px-6 h-[74px] md:h-[82px] flex items-center justify-between">
        {/* Left: Circular By Grace Party Rentals Logo Placeholder */}
        <div 
          onClick={() => handleNavClick('home')}
          className="cursor-pointer flex items-center gap-3 select-none group"
          title="By Grace Party Rentals - Home"
        >
          {/* Circular Logo Image Slot */}
          <div className="relative image-placeholder w-14 h-14 md:w-16 md:h-16 rounded-full border border-dashed border-[#CBD5E1] bg-[#E9EDF2] flex items-center justify-center text-center p-1 text-[10px] md:text-[11px] font-bold text-[#64748B] leading-tight transition-transform group-hover:scale-105">
            <span>[ BY GRACE LOGO ]</span>
            <SlotImage image={LOGO} eager />
          </div>

          <div className="hidden sm:block">
            <span className="block text-base font-extrabold text-[#071326] tracking-tight leading-none">
              BY GRACE
            </span>
            <span className="block text-xs font-semibold text-[#087BF5] tracking-wider mt-0.5 uppercase">
              Party Rentals
            </span>
          </div>
        </div>

        {/* Center: Desktop Navigation links */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-11">
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`relative py-2 text-sm font-semibold transition-colors duration-150 ${
                  isActive
                    ? 'text-[#087BF5]'
                    : 'text-[#071326] hover:text-[#087BF5]'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#087BF5] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right: Phone button, Book & Quote blue button, and Mobile menu trigger */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Phone call button */}
          <a
            href="tel:8632804175"
            className="border border-[#CBD5E1] hover:border-[#087BF5] text-[#071326] hover:text-[#087BF5] bg-white px-2.5 sm:px-3.5 py-2 sm:py-2.5 rounded-[8px] font-semibold text-xs sm:text-sm inline-flex items-center gap-1.5 transition-colors shadow-2xs"
            title="Call By Grace Party Rentals: 863-280-4175"
          >
            <Phone className="w-3.5 h-3.5 text-[#087BF5] stroke-[2.4]" />
            <span className="hidden sm:inline tracking-wide">863-280-4175</span>
            <span className="sm:hidden text-xs">Call</span>
          </a>

          {/* Primary Blue CTA Button: Book & Quote */}
          <button
            onClick={() => handleNavClick('estimator')}
            className="bg-[#087BF5] hover:bg-[#076edc] active:bg-[#065ec0] text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-[8px] font-bold text-xs sm:text-sm inline-flex items-center gap-1.5 shadow-sm transition-all hover:translate-y-[-1px]"
            title="Online Price Estimate & Booking"
          >
            <span>Book & Quote</span>
            <span className="text-white/80 font-bold">&rarr;</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#071326] hover:text-[#087BF5] hover:bg-[#F1F5F9] rounded-lg transition-colors ml-1"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#E8ECF1] bg-white px-4 pt-3 pb-5 space-y-2 shadow-lg animate-in fade-in duration-200">
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-3 py-2.5 rounded-md text-base font-semibold transition-colors flex items-center justify-between ${
                  isActive
                    ? 'bg-blue-50 text-[#087BF5]'
                    : 'text-[#071326] hover:bg-[#F8FAFC]'
                }`}
              >
                <span>{item.label}</span>
                {isActive && <span className="w-2 h-2 rounded-full bg-[#087BF5]" />}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
