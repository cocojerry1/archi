import { postsRepository } from '../repositories/PostsRepository.js';

class PostsService {
    async createPost(userId, title, content) {
        return postsRepository.create({
            userId: +userId,
            title,
            content,
        });
    }

    async getPosts(orderKey = 'createdAt', orderValue = 'DESC') {
        const orderBy = {
            [orderKey]: orderValue.toUpperCase() === 'ASC' ? 'asc' : 'desc',
        };
        return postsRepository.findAll(orderBy);
    }

    async getPostById(postId) {
        return postsRepository.findById(+postId);
    }

    async updatePost(postId, data) {
        return postsRepository.update(+postId, data);
    }

    async deletePost(postId) {
        return postsRepository.delete(+postId);
    }
}

export const postsService = new PostsService();
