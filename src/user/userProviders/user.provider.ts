import { Provider } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthInjectionToken } from 'src/auth/AuthInjectionToken';
import { encryptPassword } from 'src/auth/util/bcrypt';
import { UserInjectionToken } from '../UserInjectionToken';
import { UserRepositoryImpl } from '../user.repository';
import { UserServiceImpl } from '../user.service';

export const userServiceProvider: Provider[] = [
  {
    provide: UserInjectionToken.USER_SERVICE,
    useClass: UserServiceImpl,
  },
  {
    provide: UserInjectionToken.USER_REPOSITORY,
    useClass: UserRepositoryImpl,
  },
  {
    provide: AuthInjectionToken.encryptPassword,
    useValue: encryptPassword,
  },
  {
    provide: AuthInjectionToken.JwtService,
    useClass: JwtService,
  },
];
