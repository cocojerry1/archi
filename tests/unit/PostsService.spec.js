import PostsService from '../../src/services/PostsService.js'; 
import { jest } from '@jest/globals';


const mockPostsRepository = {
  create: jest.fn(),
  findAll: jest.fn(),
  findById: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};


const postsService = new PostsService(mockPostsRepository);

describe('PostsService', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createPost', () => {
    it('should successfully create a post', async () => {
      const mockPostData = { userId: 1, title: 'Test Title', content: 'Test Content' };
      mockPostsRepository.create.mockResolvedValue(mockPostData);

      const result = await postsService.createPost(mockPostData);

      expect(mockPostsRepository.create).toHaveBeenCalledWith(mockPostData);
      expect(result).toEqual(mockPostData);
    });
  });

  describe('getPosts', () => {
    it('should return a list of posts', async () => {
      const mockPosts = [{ title: 'Post 1', content: 'Content 1' }, { title: 'Post 2', content: 'Content 2' }];
      const orderBy = 'createdAt';
      const orderValue = 'DESC';
      mockPostsRepository.findAll.mockResolvedValue(mockPosts);

      const result = await postsService.getPosts(orderBy, orderValue);

      expect(mockPostsRepository.findAll).toHaveBeenCalledWith({[orderBy]: orderValue.toLowerCase()});
      expect(result).toEqual(mockPosts);
    });
  });

  describe('getPostById', () => {
    it('should return a post by its ID', async () => {
      const postId = 1;
      const mockPost = { id: postId, title: 'Test Post', content: 'Test Content' };
      mockPostsRepository.findById.mockResolvedValue(mockPost);

      const result = await postsService.getPostById(postId);

      expect(mockPostsRepository.findById).toHaveBeenCalledWith(Number(postId));
      expect(result).toEqual(mockPost);
    });
  });

  describe('updatePost', () => {
    it('should update a post', async () => {
      const postId = 1;
      const updateData = { title: 'Updated Title', content: 'Updated Content' };
      const updatedPost = { ...updateData, id: postId };
      mockPostsRepository.update.mockResolvedValue(updatedPost);

      const result = await postsService.updatePost({ postId, updateData });

      expect(mockPostsRepository.update).toHaveBeenCalledWith(postId, updateData);
      expect(result).toEqual(updatedPost);
    });
  });

  describe('deletePost', () => {
    it('should delete a post', async () => {
      const postId = 1;
      mockPostsRepository.delete.mockResolvedValue({ id: postId });

      await postsService.deletePost(postId);

      expect(mockPostsRepository.delete).toHaveBeenCalledWith(Number(postId));
    });
  });
});