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

    async updatePost(postId, userId, role, data) {
      const post = await postsRepository.findById(+postId);
      if (!post) {
          throw new Error('게시글 조회에 실패하였습니다.');
      }
      if (post.userId !== +userId && role !== "gen0") {
          throw new Error('수정 권한이 없습니다.');
      }
      return postsRepository.update(+postId, data);
  }

  async deletePost(postId, userId, role) {
      const post = await postsRepository.findById(+postId);
      if (!post) {
          throw new Error('게시글 조회에 실패하였습니다.');
      }
      if (post.userId !== +userId && role !== "gen0") {
          throw new Error('삭제 권한이 없습니다.');
      }
      return postsRepository.delete(+postId);
  }
}

export const postsService = new PostsService();
