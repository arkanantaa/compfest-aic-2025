const prisma = require('../config/database');

class ProposalService {
  async create(proposalData, userId) {
    return await prisma.proposal.create({
      data: {
        ...proposalData,
        userId,
      },
    });
  }

  async getAll() {
    return await prisma.proposal.findMany({
      include: { user: true, location: true },
    });
  }

  async getById(id) {
    return await prisma.proposal.findUnique({
      where: { id },
      include: { user: true, location: true },
    });
  }

  async getByUserId(userId) {
    return await prisma.proposal.findMany({
      where: { userId },
      include: { location: true },
    });
  }

  async updateStatus(id, status) {
    return await prisma.proposal.update({
      where: { id },
      data: { status },
    });
  }
}

module.exports = new ProposalService();
