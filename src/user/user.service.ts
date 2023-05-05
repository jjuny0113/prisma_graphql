import { Inject, Injectable } from '@nestjs/common';
import { UserInputError } from 'apollo-server-express';
import typia from 'typia';

import { CreateUserInput } from 'src/graphql';
import { encryptPassword } from '../auth/util/bcrypt';
import { CreateUserInputTypeCheck } from './typia/create-user.typia';
import { UserRepository } from './domain/UserRepository';
import { UserService } from './domain/UserService';
import { UserInjectionToken } from './UserInjectionToken';

@Injectable()
export class UserServiceImpl implements UserService {
  constructor(
    @Inject(UserInjectionToken.USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}
  async signUp(createUserInput: CreateUserInput) {
    const isExist = await this.userRepository.findByEmail(
      createUserInput.email,
    );
    typia.assert<CreateUserInputTypeCheck>(createUserInput);

    if (isExist) {
      throw new UserInputError('등록된 유저입니다');
    }
    const encryptedPassWordUser = await encryptPassword(createUserInput);
    return this.userRepository.create(encryptedPassWordUser);
  }
}
