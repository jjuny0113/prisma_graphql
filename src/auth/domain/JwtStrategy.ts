import { User } from '@prisma/client';
import { Payload } from '../jwt/jwt.payload';

export interface JwtStrategy {
  validate(payload: Payload): Promise<User>;
}
