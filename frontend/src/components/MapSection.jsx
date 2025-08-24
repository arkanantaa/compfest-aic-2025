import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMapEvents } from 'react-leaflet';
import { Icon } from 'leaflet';
import { Plus, Zap } from 'lucide-react';
import { generateEnvironmentalData, interventionTypes } from '../../services/mockData';
import { AIService } from '../../services/aiService';
import 'leaflet/dist/leaflet.css';
import './MapSection.css'; // Impor CSS baru

// Perbaikan untuk marker default di react-leaflet
delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const MapClickHandler = ({ onMapClick }) => {
  useMapEvents({
    click: (e) => {
      onMapClick(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
};

const MapSection = ({ onCreateProposal }) => {
  const [environmentalData, setEnvironmentalData] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedIntervention, setSelectedIntervention] = useState(null);
  const [showImpactAnalysis, setShowImpactAnalysis] = useState(false);
  const [impactAnalysis, setImpactAnalysis] = useState(null);
  const [activeLayers, setActiveLayers] = useState({
    environmental: true,
    proposals: true,
  });

  useEffect(() => {
    setEnvironmentalData(generateEnvironmentalData());
    const interval = setInterval(() => {
      setEnvironmentalData(generateEnvironmentalData());
    }, 300000); // Update data setiap 5 menit
    return () => clearInterval(interval);
  }, []);

  const handleMapClick = (lat, lng) => {
    setSelectedLocation({ lat, lng });
    setShowImpactAnalysis(false);
  };

  const handleInterventionSelect = (intervention) => {
    if (selectedLocation) {
      setSelectedIntervention(intervention);
      const analysis = AIService.calculateImpact(intervention, 1000, selectedLocation);
      setImpactAnalysis(analysis);
      setShowImpactAnalysis(true);
    }
  };

  const getAQIColor = (aqi) => {
    if (aqi <= 50) return '#10b981'; // Good - Green
    if (aqi <= 100) return '#f59e0b'; // Moderate - Yellow  
    if (aqi <= 150) return '#f97316'; // Unhealthy for sensitive - Orange
    return '#ef4444'; // Unhealthy - Red
  };

  const getNoiseColor = (level) => {
    if (level <= 45) return '#10b981';
    if (level <= 55) return '#f59e0b';
    if (level <= 70) return '#f97316';
    return '#ef4444';
  };

  return (
    <div className="map-section-wrapper">
      <MapContainer
        center={[-6.2088, 106.8456]}
        zoom={13}
        className="interactive-map-container"
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <MapClickHandler onMapClick={handleMapClick} />
        
        {activeLayers.environmental && environmentalData.map((sensor) => (
          <React.Fragment key={sensor.id}>
            <Circle
              center={[sensor.lat, sensor.lng]}
              radius={200}
              pathOptions={{
                color: getAQIColor(sensor.aqi),
                fillColor: getAQIColor(sensor.aqi),
                fillOpacity: 0.3,
                weight: 2
              }}
            />
            <Marker position={[sensor.lat, sensor.lng]}>
              <Popup>
                <div className="popup-content">
                  <h3 className="popup-title">Environmental Data</h3>
                  <div className="popup-grid">
                    <span>Air Quality (AQI):</span>
                    <span style={{ color: getAQIColor(sensor.aqi) }}>{sensor.aqi}</span>
                    <span>PM2.5:</span>
                    <span>{sensor.pm25.toFixed(1)} μg/m³</span>
                    <span>Noise Level:</span>
                    <span style={{ color: getNoiseColor(sensor.noiseLevel) }}>{sensor.noiseLevel} dB</span>
                    <span>Temperature:</span>
                    <span>{sensor.temperature.toFixed(1)}°C</span>
                  </div>
                </div>
              </Popup>
            </Marker>
          </React.Fragment>
        ))}

        {selectedLocation && (
          <Marker position={[selectedLocation.lat, selectedLocation.lng]}>
            <Popup>
              <div className="popup-content intervention-popup">
                <h3 className="popup-title">Selected Location</h3>
                <p>Choose an intervention to analyze potential impact:</p>
                <div className="intervention-buttons">
                  {interventionTypes.map((intervention) => (
                    <button
                      key={intervention.id}
                      onClick={() => handleInterventionSelect(intervention)}
                      className="intervention-button"
                      style={{ '--intervention-color': intervention.color }}
                    >
                      <div className="intervention-name">{intervention.name}</div>
                      <div className="intervention-desc">{intervention.description}</div>
                    </button>
                  ))}
                </div>
              </div>
            </Popup>
          </Marker>
        )}
      </MapContainer>

      <div className="layer-controls">
        <h3 className="layer-controls-title"><Zap size={16} /> Map Layers</h3>
        <div className="layer-options">
          <label><input type="checkbox" checked={activeLayers.environmental} onChange={(e) => setActiveLayers({ ...activeLayers, environmental: e.target.checked })}/><span>Environmental Data</span></label>
          <label><input type="checkbox" checked={activeLayers.proposals} onChange={(e) => setActiveLayers({ ...activeLayers, proposals: e.target.checked })}/><span>Community Proposals</span></label>
        </div>
      </div>

      {showImpactAnalysis && impactAnalysis && (
        <div className="impact-analysis-panel">
          <div className="impact-header">
            <div>
              <h3>AI Impact Analysis: {selectedIntervention.name}</h3>
              <p>Predicted environmental and social benefits</p>
            </div>
            <button onClick={() => setShowImpactAnalysis(false)}>×</button>
          </div>
          <div className="impact-grid">
            <div className="impact-item aqi"><div>{impactAnalysis.airQualityImprovement}%</div><span>Air Quality</span></div>
            <div className="impact-item noise"><div>-{impactAnalysis.noiseReduction} dB</div><span>Noise Reduction</span></div>
            <div className="impact-item green"><div>+{impactAnalysis.greenSpaceIncrease}%</div><span>Green Space</span></div>
            <div className="impact-item walk"><div>+{impactAnalysis.walkabilityImprovement}</div><span>Walkability Score</span></div>
          </div>
          <div className="impact-footer">
            <div className="impact-details">
              <div><span>Estimated Cost:</span> Rp {(impactAnalysis.estimatedCost / 1000000).toFixed(1)}M</div>
              <div><span>Implementation:</span> {impactAnalysis.implementationTime}</div>
            </div>
            <div className="impact-actions">
              <button onClick={() => setShowImpactAnalysis(false)}>Cancel</button>
              <button className="btn-create-proposal" onClick={() => { if (onCreateProposal) { onCreateProposal({ location: selectedLocation, intervention: selectedIntervention, impact: impactAnalysis }); } setShowImpactAnalysis(false); setSelectedLocation(null); }}>
                Create Proposal
              </button>
            </div>
          </div>
        </div>
      )}

      {!selectedLocation && (
        <div className="instructions-panel">
          <div className="instructions-header"><Plus size={20} /><h3>Create New Proposal</h3></div>
          <p>Click anywhere on the map to select a location for your urban improvement proposal.</p>
        </div>
      )}
    </div>
  );
};

export default MapSection;
