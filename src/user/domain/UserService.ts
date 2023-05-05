import { CreateUserInput, User } from 'src/graphql';

export interface UserService {
  signUp(createUserInput: CreateUserInput): Promise<User>;
}
