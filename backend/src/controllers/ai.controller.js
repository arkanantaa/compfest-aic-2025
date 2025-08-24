const Joi = require('joi');
const aiService = require('../services/ai.service');

const aiSchema = Joi.object({
  prompt: Joi.string().required(),
});

class AiController {
  async generate(req, res, next) {
    try {
      const { error, value } = aiSchema.validate(req.body);
      if (error) {
        error.isJoi = true;
        return next(error);
      }

      const response = await aiService.generateResponse(value.prompt);

      res.json({
        data: {
          response,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AiController();
