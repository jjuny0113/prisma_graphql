import { CreateUserInput } from 'src/graphql';

export interface UserService {
  signUp(createUserInput: CreateUserInput): Promise<{
    message: string;
  }>;
}
