import React from 'react';
import MapSection from '../components/MapSection';
import AIChat from '../components/AIChat';
import FeedbackCard from '../components/FeedbackCard';
import './MapPage.css';

function MapPage() {
  return (
    <div className="map-page-container">
      <div className="map-page-main">
        <MapSection />
      </div>
      <div className="map-page-sidebar">
        <FeedbackCard />
        <AIChat />
      </div>
    </div>
  );
}

export default MapPage;
