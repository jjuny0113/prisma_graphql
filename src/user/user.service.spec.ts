import { Provider } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { UserResolver } from './user.resolver';
import { UserInjectionToken } from './UserInjectionToken';
import { UserServiceImpl } from './user.service';
import { AuthInjectionToken } from 'src/auth/AuthInjectionToken';
import { UserService } from './domain/UserService';
import { UserRepository } from './domain/UserRepository';
import { TypeGuardError } from 'typia';
import { UserInputError } from 'apollo-server-express';
import { userMockRepository, userMockResolver } from './user.mock';
import { authMockService, JwtMockStrategy } from 'src/auth/auth.mock';

describe('UserServiceTest', () => {
  let service: UserService;
  let repository: UserRepository;
  const infrastructure: Provider[] = [
    {
      provide: UserResolver,
      useValue: userMockResolver,
    },
    {
      provide: UserInjectionToken.USER_REPOSITORY,
      useValue: userMockRepository,
    },
    {
      provide: UserInjectionToken.USER_SERVICE,
      useClass: UserServiceImpl,
    },
    {
      provide: AuthInjectionToken.AuthService,
      useValue: authMockService,
    },
    {
      provide: AuthInjectionToken.JwtStrategy,
      useValue: JwtMockStrategy,
    },
    {
      provide: AuthInjectionToken.encryptPassword,
      useValue: jest.fn(),
    },
  ];
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [...infrastructure],
    }).compile();
    service = module.get<UserService>(UserInjectionToken.USER_SERVICE);
    repository = module.get<UserRepository>(UserInjectionToken.USER_REPOSITORY);
  });
  describe('signUp', () => {
    it('조건에 만족하는 유저이면 성공 message', async () => {
      const user = {
        id: 1,
        email: 'test@test.com',
        password: '1234',
      };
      jest.spyOn(repository, 'create').mockResolvedValue(user);
      const createUser = await service.signUp({
        email: user.email,
        password: user.password,
      });
      expect(createUser.message).toBe(`${user.email} 유저가 등록되었습니다`);
    });
    it('아이디가 50자가 넘어가면 error', async () => {
      try {
        await service.signUp({
          email: Array(60).fill('a').join(''),
          password: '1234',
        });
      } catch (e) {
        expect(e instanceof TypeGuardError).toBe(true);
      }
    });
    it('기존에 있던 유저이면 errer', async () => {
      const user = {
        id: 1,
        email: 'test@test.com',
        password: '1234',
      };
      jest.spyOn(repository, 'findByEmail').mockResolvedValue(user);
      try {
        await service.signUp(user);
      } catch (e) {
        expect(e instanceof UserInputError).toBe(true);
      }
    });
  });
});
