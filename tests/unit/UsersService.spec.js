import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UsersService from '../../src/services/UsersService.js';
import { jest } from '@jest/globals';




const mockUsersRepository = {
  findByEmail: jest.fn(),
  create: jest.fn(),
  findById: jest.fn(),
};


const usersService = new UsersService(mockUsersRepository);

describe('UsersService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('signUp', () => {
    it('should throw an error if password is less than 6 characters', async () => {
      await expect(
        usersService.signUp({
          email: 'test@example.com',
          password: '123',
          confirm: '123',
          name: 'Test',
          role: 'user',
        })
      ).rejects.toThrow('비밀번호는 최소 6자 이상이어야 합니다.');
    });

  });

  describe('signIn', () => {
    it('should return a user object and token if credentials are valid', async () => {
      mockUsersRepository.findByEmail.mockResolvedValue({
        userId: 1,
        email: 'valid@example.com',
        password: bcrypt.hashSync('password', 10),
      });
    
  

      const result = await usersService.signIn({
        email: 'valid@example.com',
        password: 'password',
      });

      expect(result).toHaveProperty('token');
      expect(result.user).toHaveProperty('email', 'valid@example.com');
    });

  });

  describe('getUserDetails', () => {
    it('should return user details if user exists', async () => {
      mockUsersRepository.findById.mockResolvedValue({
        userId: 1,
        email: 'user@example.com',
        name: 'Test User',
        role: 'user',
      });

      const result = await usersService.getUserDetails(1);

      expect(result).toHaveProperty('email', 'user@example.com');
    });

  });
});
