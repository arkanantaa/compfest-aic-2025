const Joi = require('joi');
const locationService = require('../services/location.service');

const locationSchema = Joi.object({
  name: Joi.string().required(),
  address: Joi.string().required(),
  latitude: Joi.number().required(),
  longitude: Joi.number().required(),
  description: Joi.string().optional(),
});

const updateLocationSchema = Joi.object({
  name: Joi.string().optional(),
  address: Joi.string().optional(),
  latitude: Joi.number().optional(),
  longitude: Joi.number().optional(),
  description: Joi.string().optional(),
});

class LocationController {
  async create(req, res, next) {
    try {
      const { error, value } = locationSchema.validate(req.body);
      if (error) {
        error.isJoi = true;
        return next(error);
      }

      const location = await locationService.create(value);

      res.status(201).json({
        data: location,
        message: 'Location created successfully.',
      });
    } catch (error) {
      next(error);
    }
  }

  async getAll(req, res, next) {
    try {
      const locations = await locationService.getAll();
      res.json({
        data: locations,
      });
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const location = await locationService.getById(id);
      if (!location) {
        return res.status(404).json({ message: 'Location not found' });
      }
      res.json({
        data: location,
      });
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const { error, value } = updateLocationSchema.validate(req.body);
      if (error) {
        error.isJoi = true;
        return next(error);
      }

      const location = await locationService.update(id, value);

      res.json({
        data: location,
        message: 'Location updated successfully.',
      });
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      await locationService.delete(id);
      res.json({ message: 'Location deleted successfully.' });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new LocationController();
