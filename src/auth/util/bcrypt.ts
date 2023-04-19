import * as bcrypt from 'bcrypt';
import { CreateUserInput } from '../../user/dto/create-user.input';
import { Builder } from 'builder-pattern';

export const encryptPassword = async (createUserInput: CreateUserInput) => {
  const encryptedPassword = await bcrypt.hash(createUserInput.password, 10);
  return Builder<CreateUserInput>()
    .email(createUserInput.email)
    .password(encryptedPassword)
    .build();
};

export const validatePassword = async (
  enteredPassword: string,
  encryptedpassword: string,
) => await bcrypt.compare(enteredPassword, encryptedpassword);
