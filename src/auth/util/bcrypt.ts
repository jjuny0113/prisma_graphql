import * as bcrypt from 'bcrypt';

import { Builder } from 'builder-pattern';
import { CreateUserInput } from 'src/graphql';

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
