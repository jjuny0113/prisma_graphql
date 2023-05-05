import { Test, TestingModule } from '@nestjs/testing';
import { Provider, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './domain/AuthService';
import { AuthInjectionToken } from './AuthInjectionToken';
import { UserInjectionToken } from 'src/user/UserInjectionToken';
import { AuthServiceImpl } from './auth.service';
import { userMockRepository } from 'src/user/user.mock';
import { JwtMockStrategy, authMockService, jwtMockService } from './auth.mock';
import { UserRepository } from 'src/user/domain/UserRepository';
import { LoginUser } from 'src/user/dto/login-user.input';
import { JwtService } from '@nestjs/jwt';

describe('AuthService', () => {
  let service: AuthService;
  let repository: UserRepository;
  let jwtService: JwtService;

  beforeEach(async () => {
    const providers: Provider[] = [
      {
        provide: AuthInjectionToken.AuthService,
        useClass: AuthServiceImpl,
      },
      {
        provide: UserInjectionToken.USER_REPOSITORY,
        useValue: userMockRepository,
      },
      {
        provide: AuthInjectionToken.validatePassword,
        useValue: (enteredPassword: string, encryptedpassword: string) => {
          return enteredPassword === encryptedpassword;
        },
      },
      {
        provide: AuthInjectionToken.JwtStrategy,
        useValue: JwtMockStrategy,
      },
      {
        provide: AuthInjectionToken.JwtService,
        useValue: jwtMockService,
      },
    ];
    const module: TestingModule = await Test.createTestingModule({
      providers,
    }).compile();

    service = module.get<AuthService>(AuthInjectionToken.AuthService);
    repository = module.get<UserRepository>(UserInjectionToken.USER_REPOSITORY);
    jwtService = module.get<JwtService>(AuthInjectionToken.JwtService);
  });

  describe('login test', () => {
    it('등록되지 않은 user가 로그인 시도시 error', async () => {
      try {
        const user: LoginUser = {
          email: 'test@test.com',
          password: '1234',
        };
        jest.spyOn(repository, 'findByEmail').mockResolvedValue(null);
        await service.login(user);
      } catch (e) {
        expect(e instanceof UnauthorizedException).toBe(true);
      }
    });
    it('입력된 비밀번호와 db의 비밀번호가 다르면 error', async () => {
      try {
        const user: LoginUser = {
          email: 'test@test.com',
          password: '1234',
        };
        jest.spyOn(repository, 'findByEmail').mockResolvedValue({
          id: 1,
          email: 'test@test.com',
          password: '12345',
        });
        await service.login(user);
      } catch (e) {
        expect(e instanceof UnauthorizedException).toBe(true);
      }
    });
    it('입력된 비밀번호와 저장된 비밀번호가 같으면 accessToken 지급', async () => {
      const user: LoginUser = {
        email: 'test@test.com',
        password: '1234',
      };
      jest.spyOn(repository, 'findByEmail').mockResolvedValue({
        id: 1,
        email: 'test@test.com',
        password: '1234',
      });
      jest.spyOn(jwtService, 'sign').mockReturnValue('로그인 토큰 지급');
      const loginUser = await service.login(user);
      expect(loginUser.hasOwnProperty('accessToken')).toBe(true);
      expect(loginUser.accessToken).toBe('로그인 토큰 지급');
    });
  });
});
