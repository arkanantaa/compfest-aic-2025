// frontend/services/mockData.js

// Fungsi untuk menghasilkan data lingkungan dummy
export const generateEnvironmentalData = () => {
  // MODIFIKASI: Menggunakan data sensor baru yang Anda berikan
  const baseLocations = [
    { id: 'sensor-1', lat: -6.236704, lng: 106.793244, name: 'Sensor: Jakarta Selatan' },
    { id: 'sensor-2', lat: -6.3612408, lng: 106.8419476, name: 'Sensor: Qoryah Darussalam' },
    { id: 'sensor-3', lat: -6.09657, lng: 106.96135, name: 'Sensor: Jakarta' },
  ];

  return baseLocations.map(sensor => ({
    ...sensor,
    aqi: Math.floor(Math.random() * 150) + 1,
    pm25: Math.random() * 35,
    noiseLevel: Math.floor(Math.random() * 50) + 30,
    temperature: Math.random() * 5 + 28,
  }));
};

// Tipe intervensi yang bisa dipilih pengguna
export const interventionTypes = [
  {
    id: 'plant_trees',
    name: 'Plant New Trees',
    description: 'Increase green space and improve air quality.',
    color: '#10b981',
  },
  {
    id: 'noise_barrier',
    name: 'Install Noise Barrier',
    description: 'Reduce noise pollution from nearby traffic.',
    color: '#3b82f6',
  },
  {
    id: 'pedestrian_zone',
    name: 'Create Pedestrian Zone',
    description: 'Enhance walkability and reduce vehicle emissions.',
    color: '#f97316',
  },
];
