import React from 'react';
import Header from '../components/Header';
import MapSection from '../components/MapSection';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';

function MainLayout() {
  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        <MapSection />
        <Sidebar />
      </main>
      <Footer />
    </div>
  );
}

export default MainLayout;