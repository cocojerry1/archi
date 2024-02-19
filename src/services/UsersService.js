import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UsersRepository from '../repositories/UsersRepository.js';


class UsersService {
  async signUp({ email, password, name, role, confirm }) {
    const isExistUser = await UsersRepository.findByEmail(email);
    if (isExistUser) throw new Error('User already exists');

    const hashedPassword = await bcrypt.hash(password, 10);
    return UsersRepository.create({
      email,
      password: hashedPassword,
      name,
      role,
      confirm,
    });
  }

  async signIn({ email, password }) {
    const user = await UsersRepository.findByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error('Invalid credentials');
    }

    const token = jwt.sign({ userId: user.userId }, 'custom-secret-key', { expiresIn: '12h' });
    return { user, token };
  }

  async getUserDetails(userId) {
    return UsersRepository.findById(userId);
  }
}

export default new UsersService();
