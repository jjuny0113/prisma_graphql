import { Module, Provider } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { PrismaService } from 'src/prisma/prisma.service';
import { authServiceProvider } from './authProviders/auth.service.provider';
import { jwtStrategyProvider } from './authProviders/jwtStrategy.provider';

const infrastructure: Provider[] = [
  ...authServiceProvider,
  ...jwtStrategyProvider,
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
  ],
  providers: [...infrastructure, PrismaService],
})
export class AuthModule {}
