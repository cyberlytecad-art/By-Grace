/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { PageId } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { RentalsPage } from './pages/RentalsPage';
import { PackagesPage } from './pages/PackagesPage';
import { AboutContactPage } from './pages/AboutContactPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [selectedRentalCategory, setSelectedRentalCategory] = useState<string | undefined>(undefined);

  const handleNavigate = (page: PageId, extraData?: { preselectedCategory?: string }) => {
    setCurrentPage(page);
    if (extraData?.preselectedCategory) {
      setSelectedRentalCategory(extraData.preselectedCategory);
    } else if (page !== 'about-contact') {
      setSelectedRentalCategory(undefined);
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#071326] flex flex-col font-['Inter',sans-serif]">
      {/* Universal Header */}
      <Header currentPage={currentPage} onNavigate={handleNavigate} />

      {/* Main Page Content */}
      <main className="flex-1">
        {currentPage === 'home' && <HomePage onNavigate={handleNavigate} />}
        {currentPage === 'rentals' && <RentalsPage onNavigate={handleNavigate} />}
        {currentPage === 'packages' && <PackagesPage onNavigate={handleNavigate} />}
        {currentPage === 'about-contact' && (
          <AboutContactPage initialCategory={selectedRentalCategory} />
        )}
      </main>

      {/* Universal Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
