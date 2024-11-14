'use client';

import React from 'react';
import Navbar from '../components/Navbar';
import MainContent from '../components/MainContent';
import Footer from '../components/Footer';

const VehicleFilterPage = () => {
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      <Navbar />
      <MainContent />
      <Footer />
    </div>
  );
};

export default VehicleFilterPage;
