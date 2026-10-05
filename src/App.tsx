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
import { BookEstimatorPage } from './pages/BookEstimatorPage';
import { AboutContactPage } from './pages/AboutContactPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [selectedRentalCategory, setSelectedRentalCategory] = useState<string | undefined>(undefined);
  const [selectedItemId, setSelectedItemId] = useState<string | undefined>(undefined);

  const handleNavigate = (
    page: PageId, 
    extraData?: { preselectedCategory?: string; preselectedItemId?: string }
  ) => {
    setCurrentPage(page);
    if (extraData?.preselectedCategory) {
      setSelectedRentalCategory(extraData.preselectedCategory);
    } else if (page !== 'about-contact' && page !== 'estimator') {
      setSelectedRentalCategory(undefined);
    }

    if (extraData?.preselectedItemId) {
      setSelectedItemId(extraData.preselectedItemId);
    } else if (page !== 'estimator') {
      setSelectedItemId(undefined);
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
        {currentPage === 'estimator' && (
          <BookEstimatorPage 
            initialCategory={selectedRentalCategory} 
            initialItemId={selectedItemId} 
          />
        )}
        {currentPage === 'about-contact' && (
          <AboutContactPage 
            initialCategory={selectedRentalCategory} 
            onNavigate={handleNavigate}
          />
        )}
      </main>

      {/* Universal Footer (Visible on mobile/tablet for estimator, and all views on other pages) */}
      <div className={currentPage === 'estimator' ? 'lg:hidden' : 'block'}>
        <Footer onNavigate={handleNavigate} />
      </div>
    </div>
  );
}
