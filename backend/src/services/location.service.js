const prisma = require('../config/database');

class LocationService {
  async create(locationData) {
    return await prisma.location.create({
      data: locationData,
    });
  }

  async getAll() {
    return await prisma.location.findMany();
  }

  async getById(id) {
    return await prisma.location.findUnique({
      where: { id },
    });
  }

  async update(id, locationData) {
    return await prisma.location.update({
      where: { id },
      data: locationData,
    });
  }

  async delete(id) {
    return await prisma.location.delete({
      where: { id },
    });
  }
}

module.exports = new LocationService();
