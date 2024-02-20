import PostsController from '../../src/controllers/PostsController.js';
import { jest } from '@jest/globals';



const mockPostsService = {
  createPost: jest.fn(),
  getPosts: jest.fn(),
  getPostById: jest.fn(),
  updatePost: jest.fn(),
  deletePost: jest.fn(),
};

const postsController = new PostsController(mockPostsService);

describe('PostsController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createPost', () => {
    it('should successfully create a post and return 201 status', async () => {
      const req = {
        user: { userId: 1 },
        body: { title: 'Test Title', content: 'Test Content' },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const next = jest.fn();

      const mockPost = { id: 1, ...req.body, userId: req.user.userId };
      mockPostsService.createPost.mockResolvedValue(mockPost);

      await postsController.createPost(req, res, next);

      expect(mockPostsService.createPost).toHaveBeenCalledWith({
        userId: req.user.userId,
        title: req.body.title,
        content: req.body.content,
      });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ data: mockPost });
    });
  });


  describe('deletePost', () => {
    it('should successfully delete a post and return 200 status', async () => {
      const req = {
        params: { postId: '1' },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const next = jest.fn();

   
      mockPostsService.deletePost.mockResolvedValue(undefined);

      await postsController.deletePost(req, res, next);

      expect(mockPostsService.deletePost).toHaveBeenCalledWith('1');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: "게시물이 삭제되었습니다." });
    });
  });

  
});