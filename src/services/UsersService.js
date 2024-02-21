import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { sendTodayData } from "../middlewares/slackBot.js"

class UsersService {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }

  
  async signUp({ email, password, name, role, confirm }) {

    await new Promise((resolve) => setTimeout(resolve, 2000));

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

    try{
      await sendTodayData();
  } catch(err){

      next(err);
  }

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
    const refreshToken = jwt.sign({ userId: user.userId }, 'custom-refresh-secret-key', { expiresIn: '7D' });
    await this.usersRepository.saveToken(user.userId, refreshToken);
    return { token, refreshToken };
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
