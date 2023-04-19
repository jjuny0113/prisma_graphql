import { JwtService } from '@nestjs/jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginUser } from 'src/user/dto/login-user.input';
import { UserRepository } from 'src/user/user.repository';
import { validatePassword } from './util/bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginUser: LoginUser) {
    const user = await this.userRepository.findByEmail(loginUser.email);
    if (!user) {
      throw new UnauthorizedException('이메일과 비밀번호를 확인해주세요.');
    }
    const isPasswordValidation = await validatePassword(
      loginUser.password,
      user.password,
    );
    if (!isPasswordValidation) {
      throw new UnauthorizedException('이메일과 비밀번호를 확인해주세요.');
    }
    return {
      accessToken: this.jwtService.sign({
        userEmail: loginUser.email,
        sub: user.id,
      }),
    };
  }
}
