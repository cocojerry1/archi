class UsersRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  async findByEmail(email) {
    return this.prisma.users.findFirst({
      where: { email },
    });
  }

  async create(data) {
    return this.prisma.users.create({ data });
  }

  async findById(userId) {
    return this.prisma.users.findFirst({
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

export default UsersRepository;

