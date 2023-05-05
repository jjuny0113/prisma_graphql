import { UserRepository } from './domain/UserRepository';
import { UserService } from './domain/UserService';

export const userMockRepository: UserRepository = {
  findByEmail: jest.fn(),
  findById: jest.fn(),
  create: jest.fn(),
};

export const userMockResolver = {
  signUp: jest.fn(),
  login: jest.fn(),
  me: jest.fn(),
};

export const userMockService: UserService = {
  signUp: jest.fn(),
};
