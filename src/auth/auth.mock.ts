import { JwtSignOptions, JwtVerifyOptions } from '@nestjs/jwt';
import { AuthService } from './domain/AuthService';
import { JwtStrategy } from './domain/JwtStrategy';
import * as jwt from 'jsonwebtoken';

export const JwtMockStrategy: JwtStrategy = {
  validate: jest.fn(),
};

export const authMockService: AuthService = {
  login: jest.fn(),
};

interface IJwtMockService {
  sign(payload: string | Buffer | object, options?: JwtSignOptions): string;
  signAsync(
    payload: string | Buffer | object,
    options?: JwtSignOptions,
  ): Promise<string>;
  verify<T extends object = any>(token: string, options?: JwtVerifyOptions): T;
  verifyAsync<T extends object = any>(
    token: string,
    options?: JwtVerifyOptions,
  ): Promise<T>;
  decode(
    token: string,
    options?: jwt.DecodeOptions,
  ):
    | null
    | {
        [key: string]: any;
      }
    | string;
}

export const jwtMockService: IJwtMockService = {
  sign: jest.fn(),
  signAsync: jest.fn(),
  verify: jest.fn(),
  verifyAsync: jest.fn(),
  decode: jest.fn(),
};
