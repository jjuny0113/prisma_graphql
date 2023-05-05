import { CreateUserInput } from 'src/graphql';

export class CreateUserInputTypeCheck extends CreateUserInput {
  /**
   * @minLength 0
   * @maxLength 50
   */
  email: string;
  /**
   * @minLength 0
   * @maxLength 20
   */
  password: string;
}
