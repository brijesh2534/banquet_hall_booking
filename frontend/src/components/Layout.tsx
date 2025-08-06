import React from 'react';
import { Outlet } from 'react-router-dom'; // 1. Import Outlet
import Navigation from './Navigation';
import Footer from './Footer';

// No longer need LayoutProps
const Layout = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navigation />
      <main className="flex-grow">
        <Outlet /> {/* 2. Use Outlet instead of children */}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
