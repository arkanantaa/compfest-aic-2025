// frontend/services/aiService.js

// Layanan AI dummy untuk menghitung dampak
export class AIService {
  static calculateImpact(intervention, radius, location) {
    // Ini adalah logika dummy. Di aplikasi nyata, ini akan memanggil API backend.
    return {
      airQualityImprovement: Math.floor(Math.random() * 15) + 5,
      noiseReduction: Math.floor(Math.random() * 10) + 2,
      greenSpaceIncrease: intervention.id === 'plant_trees' ? Math.floor(Math.random() * 20) + 10 : 0,
      walkabilityImprovement: intervention.id === 'pedestrian_zone' ? Math.floor(Math.random() * 30) + 10 : 5,
      estimatedCost: Math.floor(Math.random() * 500000000) + 100000000,
      implementationTime: `${Math.floor(Math.random() * 6) + 3} months`,
    };
  }
}
