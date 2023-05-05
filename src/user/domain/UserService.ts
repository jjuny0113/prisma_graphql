import { CreateUserInput, UserReturnType } from 'src/graphql';

export interface UserService {
  signUp(createUserInput: CreateUserInput): Promise<UserReturnType>;
}
