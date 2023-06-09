import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginUser } from 'src/user/dto/login-user.input';
import { UserRepository } from 'src/user/domain/UserRepository';
import { UserInjectionToken } from 'src/user/UserInjectionToken';
import { AuthService } from './domain/AuthService';

import { AuthInjectionToken } from './AuthInjectionToken';
import { LoginReturnType, Status } from 'src/graphql';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthServiceImpl implements AuthService {
  constructor(
    @Inject(UserInjectionToken.USER_REPOSITORY)
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    @Inject(AuthInjectionToken.validatePassword)
    private readonly validatePassword: (
      enteredPassword: string,
      encryptedpassword: string,
    ) => Promise<boolean>,
  ) {}

  async login(loginUser: LoginUser): Promise<LoginReturnType> {
    const user = await this.userRepository.findByEmail(loginUser.email);

    if (!user) {
      return {
        status: Status.ERROR,
        message: '이메일과 비밀번호를 확인해주세요.',
      };
    }
    const isPasswordValidation = await this.validatePassword(
      loginUser.password,
      user.password,
    );

    if (!isPasswordValidation) {
      return {
        status: Status.ERROR,
        message: '이메일과 비밀번호를 확인해주세요.',
      };
    }
    return {
      status: Status.OK,
      accessToken: this.jwtService.sign({
        userEmail: loginUser.email,
        sub: user.id,
      }),
    };
  }
}
