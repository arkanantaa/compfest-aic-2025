import React from 'react';
// 1. Import komponen dari react-leaflet dan CSS dari leaflet
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Data contoh untuk lokasi pin di peta
const locations = [
  { position: [-6.2088, 106.8456], name: 'Jakarta Pusat' },
  { position: [-6.1751, 106.8650], name: 'Jakarta Timur' },
  { position: [-6.1214, 106.7741], name: 'Jakarta Utara' },
  { position: [-6.2115, 106.8082], name: 'Jakarta Selatan' },
  { position: [-6.1683, 106.7588], name: 'Jakarta Barat' },
];

function MapSection() {
  // 2. Atur posisi tengah peta (misalnya, pusat kota Jakarta) dan level zoom
  const mapCenter = [-6.20, 106.8456]; // Latitude, Longitude for Jakarta
  const zoomLevel = 11;

  return (
    <section className="map-section">
      <h2>Real-time Air Quality Map</h2>
      <div className="map-container">
        {/* 3. Gunakan MapContainer sebagai pengganti <img> */}
        <MapContainer center={mapCenter} zoom={zoomLevel} scrollWheelZoom={false}>
          {/* TileLayer adalah penyedia gambar peta. OpenStreetMap gratis digunakan di sini. */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* 4. Loop melalui data lokasi untuk menambahkan Marker (pin) */}
          {locations.map((loc, index) => (
            <Marker key={index} position={loc.position}>
              <Popup>
                <b>{loc.name}</b><br />
                Informasi kualitas udara di sini.
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
      {/* Tombol ini bisa kita letakkan di luar peta agar tidak mengganggu interaksi */}
      <button className="map-explore-button">
        Explore Details for Selected Location
      </button>
    </section>
  );
}

export default MapSection;