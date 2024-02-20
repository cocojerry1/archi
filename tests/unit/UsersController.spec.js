import UsersController from '../../src/controllers/UsersController.js';
import { jest } from '@jest/globals';


const mockUsersService = {
  signUp: jest.fn(),
  signIn: jest.fn(),
  getUserDetails: jest.fn(),
};


const usersController = new UsersController(mockUsersService);

describe('UsersController', () => {
  let req, res, next;

  beforeEach(() => {
    req = { body: {}, user: { userId: 1 } };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
      cookie: jest.fn()
    };
    next = jest.fn();
  });

  describe('signUp', () => {
    it('should successfully sign up a user', async () => {

      const userData = { email: 'test@example.com', password: 'password', name: 'Test User', role: 'user', confirm: 'password' };
      mockUsersService.signUp.mockResolvedValue({
        userId: 1, ...userData
      });

      req.body = userData;

      await usersController.signUp(req, res, next);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: '회원가입이 완료되었습니다.',
        user: expect.objectContaining({
          email: userData.email,
          name: userData.name,
          role: userData.role
        })
      });
    });

    
  });


});

