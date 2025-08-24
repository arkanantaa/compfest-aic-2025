const Joi = require('joi');
const userService = require('../services/user.service');

// Validation schemas
const updateUserSchema = Joi.object({
  displayName: Joi.string().max(100).optional(),
  photoUrl: Joi.string().uri().optional(),
});

class UserController {
  getMe(req, res) {
    res.json({
      data: req.user
    });
  }

  async updateMe(req, res, next) {
    try {
      // Validate request body
      const { error, value } = updateUserSchema.validate(req.body);
      if (error) {
        error.isJoi = true;
        return next(error);
      }

      // Update user
      const updatedUser = await userService.updateUser(req.user.id, value);

      res.json({
        data: updatedUser
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();
