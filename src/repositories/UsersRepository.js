import { prisma } from '../utils/prisma/index.js';

class UsersRepository {
  async findByEmail(email) {
    return prisma.users.findFirst({
      where: { email },
    });
  }

  async create(data) {
    return prisma.users.create({ data });
  }

  async findById(userId) {
    return prisma.users.findFirst({
      where: { userId },
      select: {
        userId: true,
        email: true,
        name: true,
        createdAt: true,
        updatedAt: true,
        role: true,
      },
    });
  }
}

export default new UsersRepository();
