
class PostsService {
  constructor(postsRepository) {
    this.postsRepository = postsRepository;
  }

  async createPost({ userId, title, content }) {

    return this.postsRepository.create({
      userId: Number(userId),
      title,
      content,
    });
  }

  async getPosts(orderKey = 'createdAt', orderValue = 'DESC') {
    const orderBy = {
        [orderKey]: orderValue.toUpperCase() === 'ASC' ? 'asc' : 'desc',
    };
    return this.postsRepository.findAll(orderBy);
}

  async getPostById(postId) {

    return this.postsRepository.findById(Number(postId));
  }

  async updatePost({ postId, updateData }) {
    if (!postId) {
      throw new Error('postId is required.');
    }
  
    const post = await this.postsRepository.findById(postId);
    if (!post) {
      throw new Error('게시글 조회에 실패하였습니다.');
    }
  
    return this.postsRepository.update(postId, updateData);
  }
  

  async deletePost(postId) {
    const post = await this.postsRepository.findById(+postId);
    if (!post) {
      throw new Error('게시글 조회에 실패하였습니다.');
    }

   
    return this.postsRepository.delete(+postId);
  }
}

export default PostsService;