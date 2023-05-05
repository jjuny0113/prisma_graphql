import { User } from '@prisma/client';
import { CreateUserInput } from 'src/graphql';

export interface UserRepository {
  findByEmail(email: string): Promise<User | null>;
  findById(id: number): Promise<User | null>;
  create(createUserInput: CreateUserInput): Promise<User>;
}
