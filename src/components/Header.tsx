import React, { useState } from 'react';
import { Phone, Menu, X } from 'lucide-react';
import { PageId } from '../types';
import { Logo } from './Logo';

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
    <header className="sticky top-0 z-50 bg-white/85 backdrop-blur-md border-b border-[#E8ECF1]/80 supports-[backdrop-filter]:bg-white/75">
      <div className="max-w-[1250px] mx-auto px-4 sm:px-6 h-[74px] md:h-[82px] flex items-center justify-between">
        {/* Left: Logo */}
        <div 
          onClick={() => handleNavClick('home')}
          className="cursor-pointer flex items-center gap-3 select-none group"
          title="By Grace Party Rentals - Home"
        >
          <Logo className="w-12 h-12 md:w-14 md:h-14 text-lg md:text-xl transition-transform group-hover:scale-105 group-hover:rotate-[-4deg]" />

          <div className="hidden sm:block">
            <span className="block font-display text-xl font-bold text-[#071326] tracking-tight leading-none">
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
            className="border border-[#CBD5E1] hover:border-[#087BF5] text-[#071326] hover:text-[#087BF5] bg-white px-2.5 sm:px-3.5 py-2 sm:py-2.5 rounded-full font-semibold text-xs sm:text-sm inline-flex items-center gap-1.5 transition-colors shadow-2xs"
            title="Call By Grace Party Rentals: 863-280-4175"
          >
            <Phone className="w-3.5 h-3.5 text-[#087BF5] stroke-[2.4]" />
            <span className="hidden sm:inline tracking-wide">863-280-4175</span>
            <span className="sm:hidden text-xs">Call</span>
          </a>

          {/* Primary Blue CTA Button: Book & Quote */}
          <button
            onClick={() => handleNavClick('estimator')}
            className="bg-gradient-to-r from-[#087BF5] to-[#20BEEF] hover:from-[#076edc] hover:to-[#14ADE0] text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-full font-bold text-xs sm:text-sm inline-flex items-center gap-1.5 shadow-md shadow-[#087BF5]/25 transition-all hover:translate-y-[-1px]"
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
