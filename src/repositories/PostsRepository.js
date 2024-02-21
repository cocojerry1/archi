class PostsRepository {
    constructor(prisma) {
      this.prisma = prisma;
    }
  
   
      async create({ userId, title, content }) {
        return this.prisma.posts.create({
          data: {
            userId, 
            title,
            content,
          },
        });
      }
    
  
  
      async findAll({ orderKey = 'createdAt', orderValue = 'desc' }) {
        return this.prisma.posts.findMany({
            orderBy: {
                [orderKey]: orderValue,
            },
            select: {
                content: true,
                postId: true,
                title: true,
                status: true,
                createdAt: true,
                user: {
                    select: {
                        name: true
                    },
                },
            },
        });
    }
  
    async findById(postId) {
      return this.prisma.posts.findUnique({
        where: { postId },
      });
    }
  
    async update(postId, data) {
      return this.prisma.posts.update({
        where: { postId },
        data,
      });
    }
  
    async delete(postId) {
      return this.prisma.posts.delete({
        where: { postId },
      });
    }
}
export default PostsRepository;