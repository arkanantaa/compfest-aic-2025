// src/pages/ProposalsPage.jsx
import React from 'react';
import './ProposalsPage.css';

// --- Data Contoh ---
const trendingParks = [
  { rank: 1, title: 'Green Valley Park', description: 'Popular for picnics and cycling, offering scenic trails.', airQuality: 'Good' },
  { rank: 2, title: 'City Central Garden', description: 'An urban oasis with diverse flora, perfect for a quick escape.', airQuality: 'Moderate' },
  { rank: 3, title: 'Riverside Park', description: 'Features calm river views and extensive walking trails, family-friendly.', airQuality: 'Good' },
  { rank: 4, title: 'Mountain Peak Preserve', description: 'High-altitude trails with breathtaking panoramic views and fresh air.', airQuality: 'Excellent' },
];
const clearestAirParks = [
    { rank: 1, title: 'Whispering Pines Sanctuary', description: 'Remote sanctuary with pristine, untouched air, ideal for meditation.', airQuality: 'Excellent' },
    { rank: 2, title: 'Blue Sky Mesa', description: 'Elevated mesa with expansive clear skies and remarkably pure air quality.', airQuality: 'Excellent' },
    { rank: 3, title: 'Pristine Forest Trail', description: 'Long, winding trails through old-growth forest, renowned for clean air.', airQuality: 'Excellent' },
    { rank: 4, title: 'Alpine Meadows', description: 'High-alpine fields known for their exceptionally crisp and clean air.', airQuality: 'Excellent' },
];
const mostSearched = [
    { rank: 1, title: 'Green Valley Park', description: 'Consistently a top search for its accessibility and amenities.' },
    { rank: 2, title: 'City Central Garden', description: 'Frequently searched for its central location and serene environment.' },
    { rank: 3, title: 'Lakeside Park', description: 'Popular search due to its family-friendly facilities and beautiful lake.' },
    { rank: 4, title: 'Historical Landmark Square', description: 'A cultural hub and popular search destination for its rich history and open space.' },
];

// --- Ikon SVG ---
const TrendingIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M23 6l-9.5 9.5-5-5L1 18"/></svg>;
const ParkIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14.12 14.12a2 2 0 11-4-4l4-4a2 2 0 114 4l-4 4zM12 22s-4-2-4-8 4-8 4-8 4 2 4 8-4 8-4 8z"/></svg>;
const SearchIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>;

// --- Komponen Kartu ---
const ParkCard = ({ rank, title, description, airQuality }) => {
    // Fungsi untuk mendapatkan kelas CSS berdasarkan kualitas udara
    const getAirQualityClass = (quality) => {
        if (!quality) return '';
        return `aq-${quality.toLowerCase()}`;
    };

    return (
        <div className="park-card">
            <div className="card-header">
                <h3>{title}</h3>
                <span className="rank-badge">#{rank}</span>
            </div>
            <p className="card-description">{description}</p>
            {airQuality && (
                <div className="card-air-quality">
                    <strong>Air Quality:</strong>
                    <span className={getAirQualityClass(airQuality)}>{airQuality}</span>
                </div>
            )}
        </div>
    );
};


// --- Komponen Halaman Utama ---
function ProposalsPage() {
  return (
    <div className="proposals-page-container">
      <main className="proposals-main-content">
        
        {/* Bagian Trending Parks */}
        <section className="parks-section">
          <h2 className="section-title">
            <TrendingIcon /> Trending Parks
          </h2>
          <div className="parks-grid">
            {trendingParks.map(park => <ParkCard key={park.rank} {...park} />)}
          </div>
        </section>

        {/* Bagian Parks with Clearest Air */}
        <section className="parks-section">
          <h2 className="section-title">
            <ParkIcon /> Parks with Clearest Air
          </h2>
          <div className="parks-grid">
            {clearestAirParks.map(park => <ParkCard key={park.rank} {...park} />)}
          </div>
        </section>

        {/* Bagian Most Searched Places */}
        <section className="parks-section">
          <h2 className="section-title">
            <SearchIcon /> Most Searched Places
          </h2>
          <div className="parks-grid">
            {mostSearched.map(park => <ParkCard key={park.rank} {...park} />)}
          </div>
        </section>

      </main>
    </div>
  );
}

export default ProposalsPage;
