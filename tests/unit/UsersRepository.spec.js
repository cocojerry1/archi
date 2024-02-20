
import UsersRepository from '../../src/repositories/UsersRepository.js';
import { jest } from '@jest/globals';

const mockFindFirst = jest.fn();
const mockCreate = jest.fn();
const prismaMock = {
  users: {
    findFirst: mockFindFirst,
    create: mockCreate,
  },
};

const usersRepository = new UsersRepository(prismaMock);

describe('UsersRepository', () => {
  beforeEach(() => {
    mockFindFirst.mockClear();
    mockCreate.mockClear();
  });

  describe('findByEmail', () => {
    it('should find a user by email', async () => {
      const mockUser = { id: 1, email: 'test@example.com' };
      mockFindFirst.mockResolvedValue(mockUser);

      const result = await usersRepository.findByEmail('test@example.com');

      expect(mockFindFirst).toHaveBeenCalledWith({
        where: { email: 'test@example.com' },
      });
      expect(result).toEqual(mockUser);
    });
  });

  describe('create', () => {
    it('should create a user with the given data', async () => {
      const newUser = { email: 'new@example.com', name: 'New User' };
      mockCreate.mockResolvedValue(newUser);

      const result = await usersRepository.create(newUser);

      expect(mockCreate).toHaveBeenCalledWith({ data: newUser });
      expect(result).toEqual(newUser);
    });
  });

  describe('findById', () => {
    it('should find a user by their ID', async () => {
      const mockUser = { id: 1, email: 'findbyid@example.com' };
      mockFindFirst.mockResolvedValue(mockUser);

      const result = await usersRepository.findById(1);

      expect(mockFindFirst).toHaveBeenCalledWith({
        where: { userId: 1 },
        select: {
          userId: true,
          email: true,
          name: true,
          createdAt: true,
          updatedAt: true,
          role: true,
        },
      });
      expect(result).toEqual(mockUser);
    });
  });
});


