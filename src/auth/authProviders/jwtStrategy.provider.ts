import { Provider } from '@nestjs/common';
import { AuthInjectionToken } from '../AuthInjectionToken';
import { JwtService } from '@nestjs/jwt';
import { JwtStrategyImpl } from '../jwt/jwt.strategy';

export const jwtStrategyProvider: Provider[] = [
  {
    provide: AuthInjectionToken.JwtStrategy,
    useClass: JwtStrategyImpl,
  },
  {
    provide: AuthInjectionToken.JwtService,
    useClass: JwtService,
  },
];
