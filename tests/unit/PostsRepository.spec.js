import { jest } from '@jest/globals';
import PostsRepository  from '../../src/repositories/PostsRepository.js'; 


const mockPrismaClient = {
  posts: {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
};


const postsRepository = new PostsRepository(mockPrismaClient);

describe('PostsRepository', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should successfully create a post', async () => {
      const postInput = { userId: 1, title: 'Test Title', content: 'Test Content' };
      const expectedPost = { id: 1, ...postInput };
      mockPrismaClient.posts.create.mockResolvedValue(expectedPost);

      const result = await postsRepository.create(postInput);

      expect(mockPrismaClient.posts.create).toHaveBeenCalledWith({ data: postInput });
      expect(result).toEqual(expectedPost);
    });
  });

  describe('findAll', () => {
    it('should return a list of posts', async () => {
      const mockPosts = [
        { id: 1, title: 'Post 1', content: 'Content of post 1', userId: 1 },
        { id: 2, title: 'Post 2', content: 'Content of post 2', userId: 1 },
      ];
      mockPrismaClient.posts.findMany.mockResolvedValue(mockPosts);

      const result = await postsRepository.findAll({ orderKey: 'createdAt', orderValue: 'desc' });

      expect(mockPrismaClient.posts.findMany).toHaveBeenCalled();
      expect(result).toEqual(mockPosts);
    });
  });

  describe('findById', () => {
    it('should return a specific post by ID', async () => {
      const mockPost = { id: 1, title: 'Test Post', content: 'Test Content', userId: 1 };
      mockPrismaClient.posts.findUnique.mockResolvedValue(mockPost);

      const result = await postsRepository.findById(1);

      expect(mockPrismaClient.posts.findUnique).toHaveBeenCalledWith({ where: { postId: 1 } });
      expect(result).toEqual(mockPost);
    });
  });

  describe('update', () => {
    it('should update a post', async () => {
      const postUpdate = { title: 'Updated Title', content: 'Updated Content' };
      const expectedPost = { id: 1, ...postUpdate, userId: 1 };
      mockPrismaClient.posts.update.mockResolvedValue(expectedPost);

      const result = await postsRepository.update(1, postUpdate);

      expect(mockPrismaClient.posts.update).toHaveBeenCalledWith({
        where: { postId: 1 },
        data: postUpdate,
      });
      expect(result).toEqual(expectedPost);
    });
  });

  describe('delete', () => {
    it('should delete a post', async () => {
      const expectedOutput = { id: 1, title: 'Deleted Post', content: 'Deleted Content', userId: 1 };
      mockPrismaClient.posts.delete.mockResolvedValue(expectedOutput);

      const result = await postsRepository.delete(1);

      expect(mockPrismaClient.posts.delete).toHaveBeenCalledWith({ where: { postId: 1 } });
      expect(result).toEqual(expectedOutput);
    });
  });
});