import { tokenKey } from "../redis/keys.js";

class UsersRepository {
  constructor(prisma, redisClient) {
    this.prisma = prisma;
    this.redisClient = redisClient;
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
  saveToken = async (userId, refreshToken) => {
    return this.redisClient.hSet(tokenKey(userId), "token", refreshToken);
  };
  getToken = async (userId) => {
    return new Promise((resolve, reject) => {
        this.redisClient.hGet(tokenKey(userId), "token", (err, data) => {
            if (err){
                reject(err);
            } else{
                resolve(data);
            }
        })
    })
}



}



export default UsersRepository;

