import React from 'react';
// 1. Import komponen dari react-leaflet, termasuk 'Circle', dan CSS dari leaflet
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Data contoh untuk lokasi pin umum di peta
const locations = [
  { position: [-6.2088, 106.8456], name: 'Jakarta Pusat' },
  { position: [-6.1751, 106.8650], name: 'Jakarta Timur' },
  { position: [-6.1214, 106.7741], name: 'Jakarta Utara' },
  { position: [-6.2115, 106.8082], name: 'Jakarta Selatan' },
  { position: [-6.1683, 106.7588], name: 'Jakarta Barat' },
];

// Data untuk lokasi sensor baru yang akan dilingkari
const sensorLocations = [
  { position: [-6.236704, 106.793244], name: 'Sensor: Jakarta Selatan' },
  { position: [-6.409456, 106.856152], name: 'Sensor: Depok' },
  { position: [-6.3612408, 106.8419476], name: 'Sensor: Qoryah Darussalam' },
  { position: [-6.09657, 106.96135], name: 'Sensor: Jakarta' },
];

function MapSection() {
  // 2. Atur posisi tengah peta (pusat kota Jakarta) dan level zoom
  const mapCenter = [-6.20, 106.8456]; // Latitude, Longitude for Jakarta
  const zoomLevel = 11;

  // Opsi untuk styling lingkaran hijau
  const greenOptions = { color: 'green', fillColor: 'green' };

  return (
    <section className="map-section">
      <h2>Real-time Air Quality Map</h2>
      <div className="map-container">
        {/* 3. Gunakan MapContainer untuk menampilkan peta */}
        <MapContainer center={mapCenter} zoom={zoomLevel} scrollWheelZoom={false}>
          {/* TileLayer adalah penyedia gambar peta. OpenStreetMap gratis digunakan di sini. */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* 4. Loop melalui data lokasi umum untuk menambahkan Marker (pin) */}
          {locations.map((loc, index) => (
            <Marker key={`loc-${index}`} position={loc.position}>
              <Popup>
                <b>{loc.name}</b><br />
                Informasi kualitas udara di sini.
              </Popup>
            </Marker>
          ))}

          {/* 5. Loop melalui data lokasi sensor untuk menambahkan Marker dan Lingkaran Hijau */}
          {sensorLocations.map((loc, index) => (
            <React.Fragment key={`sensor-${index}`}>
              <Marker position={loc.position}>
                <Popup>
                  <b>{loc.name}</b><br />
                  Prediksi kualitas udara untuk radius 1 km.
                </Popup>
              </Marker>
              {/* Tambahkan Circle di sekitar setiap marker sensor */}
              <Circle
                center={loc.position}
                pathOptions={greenOptions}
                radius={1000} // Radius dalam meter (1 km)
              />
            </React.Fragment>
          ))}
        </MapContainer>
      </div>
      <button className="map-explore-button">
        Explore Details for Selected Location
      </button>
    </section>
  );
}

export default MapSection;
