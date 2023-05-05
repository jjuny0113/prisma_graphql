import { AuthServiceImpl } from './../auth/auth.service';
import { Module, Provider } from '@nestjs/common';
import { UserServiceImpl } from './user.service';
import { UserResolver } from './user.resolver';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserRepositoryImpl } from './user.repository';
import { UserInjectionToken } from './UserInjectionToken';
import { AuthInjectionToken } from 'src/auth/AuthInjectionToken';
import { AuthModule } from 'src/auth/auth.module';
import { JwtStrategyImpl } from 'src/auth/jwt/jwt.strategy';

const infrastructure: Provider[] = [
  {
    provide: UserInjectionToken.USER_REPOSITORY,
    useClass: UserRepositoryImpl,
  },
  {
    provide: UserInjectionToken.USER_SERVICE,
    useClass: UserServiceImpl,
  },
  {
    provide: AuthInjectionToken.AuthService,
    useClass: AuthServiceImpl,
  },
  {
    provide: AuthInjectionToken.JwtStrategy,
    useClass: JwtStrategyImpl,
  },
];
@Module({
  providers: [UserResolver, PrismaService, ...infrastructure],
  imports: [AuthModule],
})
export class UserModule {}
