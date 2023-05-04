import { CreateUserInput } from 'src/graphql';

export class CreateUserInputTypeCheck extends CreateUserInput {
  /**
   * @maxLength 50
   */
  email: string;
  password: string;
}
