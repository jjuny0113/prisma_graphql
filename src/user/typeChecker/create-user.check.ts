import { CreateUserInput } from 'src/graphql';

export class CreateUserInputCheckType extends CreateUserInput {
  /**
   * @maxLength 50
   */
  email: string;
  password: string;
}
