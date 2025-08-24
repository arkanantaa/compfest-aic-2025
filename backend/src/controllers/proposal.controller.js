const Joi = require('joi');
const proposalService = require('../services/proposal.service');

const proposalSchema = Joi.object({
  locationId: Joi.string().required(),
  justification: Joi.string().required(),
});

const updateStatusSchema = Joi.object({
  status: Joi.string().valid('APPROVED', 'REJECTED').required(),
});

class ProposalController {
  async create(req, res, next) {
    try {
      const { error, value } = proposalSchema.validate(req.body);
      if (error) {
        error.isJoi = true;
        return next(error);
      }

      const proposal = await proposalService.create(value, req.user.id);

      res.status(201).json({
        data: proposal,
        message: 'Proposal created successfully.',
      });
    } catch (error) {
      next(error);
    }
  }

  async getAll(req, res, next) {
    try {
      const proposals = await proposalService.getAll();
      res.json({
        data: proposals,
      });
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const proposal = await proposalService.getById(id);
      if (!proposal) {
        return res.status(404).json({ message: 'Proposal not found' });
      }
      res.json({
        data: proposal,
      });
    } catch (error) {
      next(error);
    }
  }

  async getMyProposals(req, res, next) {
    try {
      const proposals = await proposalService.getByUserId(req.user.id);
      res.json({
        data: proposals,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateStatus(req, res, next) {
    try {
      const { id } = req.params;
      const { error, value } = updateStatusSchema.validate(req.body);
      if (error) {
        error.isJoi = true;
        return next(error);
      }

      const proposal = await proposalService.updateStatus(id, value.status);

      res.json({
        data: proposal,
        message: 'Proposal status updated successfully.',
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ProposalController();
