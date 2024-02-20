
class PostsService {
  constructor(postsRepository) {
    this.postsRepository = postsRepository;
  }

  async createPost({ userId, title, content }) {
    // Assuming validation is already done in the controller
    return this.postsRepository.create({
      userId: Number(userId), // Ensure userId is a number
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
    // Ensure postId is properly converted to a number if necessary
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
    // Check if the current user is the author or has a special role to delete the post
   
    return this.postsRepository.delete(+postId);
  }
}

export default PostsService;