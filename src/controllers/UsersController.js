class UsersController {
  constructor(usersService) {
    this.usersService = usersService;
  }

  async signUp(req, res, next) {
    try {
      const user = await this.usersService.signUp(req.body);
      res.status(201).json({
        message: '회원가입이 완료되었습니다.',
        user: { userId: user.userId, email: user.email, name: user.name, role: user.role },
      });
    } catch (error) {
      next(error);
    }
  }

  async signIn(req, res, next) {
    try {
      const { user, token } = await this.usersService.signIn(req.body);
      res.cookie('authorization', `Bearer ${token}`);
      res.status(200).json({ message: '로그인 성공', user });
    } catch (error) {
      next(error);
    }
  }

  async getUser(req, res, next) {
    try {
      const user = await this.usersService.getUserDetails(req.user.userId);
      res.status(200).json({ data: user });
    } catch (error) {
      next(error);
    }
  }
}

export default UsersController;
