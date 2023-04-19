import { UserRepository } from './user.repository';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { encryptPassword } from '../auth/util/bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
  async signUp(createUserInput: CreateUserInput) {
    const isExist = await this.userRepository.findByEmail(
      createUserInput.email,
    );
    console.log('isExist', isExist);
    if (isExist) {
      throw new HttpException('등록된 유저입니다', HttpStatus.BAD_REQUEST);
    }
    const encryptedPassWordUser = await encryptPassword(createUserInput);
    return this.userRepository.create(encryptedPassWordUser);
  }
}
