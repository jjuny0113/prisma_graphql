import { Provider } from '@nestjs/common';
import { UserInjectionToken } from 'src/user/UserInjectionToken';
import { UserRepositoryImpl } from 'src/user/user.repository';
import { AuthInjectionToken } from '../AuthInjectionToken';
import { validatePassword } from '../util/bcrypt';
import { JwtStrategyImpl } from '../jwt/jwt.strategy';
import { AuthServiceImpl } from '../auth.service';

export const authServiceProvider: Provider[] = [
  {
    provide: AuthInjectionToken.AuthService,
    useClass: AuthServiceImpl,
  },
  {
    provide: UserInjectionToken.USER_REPOSITORY,
    useClass: UserRepositoryImpl,
  },
  {
    provide: AuthInjectionToken.validatePassword,
    useValue: validatePassword,
  },
  {
    provide: AuthInjectionToken.JwtStrategy,
    useClass: JwtStrategyImpl,
  },
];
