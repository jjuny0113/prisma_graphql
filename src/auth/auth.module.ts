import { Module, Provider, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthServiceImpl } from './auth.service';
import { UserInjectionToken } from 'src/user/UserInjectionToken';
import { UserRepositoryImpl } from 'src/user/user.repository';
import { AuthInjectionToken } from './AuthInjectionToken';
import { JwtStrategyImpl } from './jwt/jwt.strategy';

const infrastructure: Provider[] = [
  {
    provide: UserInjectionToken.USER_REPOSITORY,
    useClass: UserRepositoryImpl,
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
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
      session: false,
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET_KEY,
      signOptions: {
        expiresIn: '24h',
      },
    }),
    forwardRef(() => PrismaModule),
  ],
  providers: [...infrastructure, PrismaService],
})
export class AuthModule {}
