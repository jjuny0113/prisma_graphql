import { Injectable } from '@nestjs/common';
import { UserInputError } from 'apollo-server-express';
import { UserRepository } from './user.repository';

import { CreateUserInput } from 'src/graphql';
import typia from 'typia';
import { encryptPassword } from '../auth/util/bcrypt';
import { CreateUserInputCheckType } from './typeChecker/create-user.check';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
  async signUp(createUserInput: CreateUserInput) {
    const isExist = await this.userRepository.findByEmail(
      createUserInput.email,
    );
    typia.assert<CreateUserInputCheckType>(createUserInput);

    if (isExist) {
      throw new UserInputError('등록된 유저입니다');
    }
    const encryptedPassWordUser = await encryptPassword(createUserInput);
    return this.userRepository.create(encryptedPassWordUser);
  }
}
