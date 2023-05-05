import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

import { LoginUser } from './dto/login-user.input';
import { Inject, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { User } from '@prisma/client';
import { CreateUserInput } from 'src/graphql';
import { UserService } from './domain/UserService';
import { AuthService } from 'src/auth/domain/AuthService';
import { UserInjectionToken } from './UserInjectionToken';
import { AuthInjectionToken } from 'src/auth/AuthInjectionToken';

@Resolver('User')
export class UserResolver {
  constructor(
    @Inject(UserInjectionToken.USER_SERVICE)
    private readonly userService: UserService,
    @Inject(AuthInjectionToken.AuthService)
    private readonly authService: AuthService,
  ) {}

  @Mutation('createUser')
  signUp(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.signUp(createUserInput);
  }

  @Mutation('login')
  login(@Args('loginInput') loginUser: LoginUser) {
    return this.authService.login(loginUser);
  }

  @Query('user')
  @UseGuards(JwtAuthGuard)
  me(@CurrentUser() user: User) {
    return user;
  }
}
