import React from 'react';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';

export default function Layout({ children, currentPageName }) {
  const noLayoutPages = ['Checkout'];
  const hideNavFooter = noLayoutPages.includes(currentPageName);

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--cream)' }}>
      {!hideNavFooter && <Navbar />}
      <main className="flex-1">
        {children}
      </main>
      {!hideNavFooter && <Footer />}
    </div>
  );
}