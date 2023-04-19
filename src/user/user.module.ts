import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserRepository } from './user.repository';
import { AuthService } from 'src/auth/auth.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [
    UserResolver,
    UserService,
    PrismaService,
    UserRepository,
    AuthService,
  ],
  imports: [],
  exports: [UserService, UserRepository],
})
export class UserModule {}
