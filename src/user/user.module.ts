import { Module, Provider } from '@nestjs/common';
import { authServiceProvider } from 'src/auth/authProviders/auth.service.provider';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserResolver } from './user.resolver';
import { userServiceProvider } from './userProviders/user.provider';

const infrastructure: Provider[] = [
  ...authServiceProvider,
  ...userServiceProvider,
];
@Module({
  providers: [UserResolver, PrismaService, ...infrastructure],
})
export class UserModule {}
