import { prisma } from '../utils/prisma/index.js';

class PostsRepository {
    async create(data) {
        return prisma.posts.create({ data });
    }

    async findAll(orderBy) {
        return prisma.posts.findMany({
            orderBy,
            select: {
                content: true,
                postId: true,
                title: true,
                status: true,
                createdAt: true,
                user: { select: { name: true } },
            },
        });
    }

    async findById(postId) {
        return prisma.posts.findUnique({
            where: { postId },
        });
    }

    async update(postId, data) {
        return prisma.posts.update({
            where: { postId },
            data,
        });
    }

    async delete(postId) {
        return prisma.posts.delete({
            where: { postId },
        });
    }
}

export const postsRepository = new PostsRepository();
