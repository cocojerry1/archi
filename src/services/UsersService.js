import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class UsersService {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }

  async signUp({ email, password, name, role, confirm }) {
    if (password.length < 6) {
      throw new Error('비밀번호는 최소 6자 이상이어야 합니다.');
    }

    if (password !== confirm) {
      throw new Error('비밀번호가 일치하지 않습니다.');
    }

 
    const isExistUser = await this.usersRepository.findByEmail(email);
    if (isExistUser) throw new Error('이미 존재하는 이메일입니다.');

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.usersRepository.create({
      email,
      password: hashedPassword,
      name,
      role,
      confirm,
    });

    return {
      userId: user.userId,
      email: user.email,
      name: user.name,
      role: user.role,
    };
  }

  async signIn({ email, password }) {

    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new Error('존재하지 않는 이메일입니다.');
    }

    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
      throw new Error('비밀번호가 일치하지 않습니다.');
    }

    const token = jwt.sign({ userId: user.userId }, 'custom-secret-key', { expiresIn: '12h' });
    return { user, token };
  }

  async getUserDetails(userId) {

    const user = await this.usersRepository.findById(userId);
    if (!user) {
      throw new Error('사용자를 찾을 수 없습니다.');
    }
    return user;
  }
}

export default UsersService;
