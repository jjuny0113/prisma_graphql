import { Inject, Injectable } from '@nestjs/common';
import { UserInputError } from 'apollo-server-express';
import typia from 'typia';
import { CreateUserInput } from 'src/graphql';
import { CreateUserInputTypeCheck } from './typia/create-user.typia';
import { UserRepository } from './domain/UserRepository';
import { UserService } from './domain/UserService';
import { UserInjectionToken } from './UserInjectionToken';
import { AuthInjectionToken } from 'src/auth/AuthInjectionToken';

@Injectable()
export class UserServiceImpl implements UserService {
  constructor(
    @Inject(UserInjectionToken.USER_REPOSITORY)
    private readonly userRepository: UserRepository,
    @Inject(AuthInjectionToken.encryptPassword)
    private readonly encryptPassword: (
      createUserInput: CreateUserInput,
    ) => Promise<CreateUserInput>,
  ) {}
  async signUp(createUserInput: CreateUserInput) {
    const isExist = await this.userRepository.findByEmail(
      createUserInput.email,
    );
    typia.assert<CreateUserInputTypeCheck>(createUserInput);

    if (isExist) {
      throw new UserInputError('등록된 유저입니다');
    }
    const encryptedPassWordUser = await this.encryptPassword(createUserInput);
    const createdUser = await this.userRepository.create(encryptedPassWordUser);
    return {
      message: `${createdUser.email} 유저가 등록되었습니다`,
    };
  }
}
