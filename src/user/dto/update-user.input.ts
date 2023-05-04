
import { PartialType } from '@nestjs/mapped-types';
import { CreateUserInput } from 'src/graphql';

export class UpdateUserInput extends PartialType(CreateUserInput) {
  id: number;
}
