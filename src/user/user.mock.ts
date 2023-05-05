import { UserRepository } from './domain/UserRepository';

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
