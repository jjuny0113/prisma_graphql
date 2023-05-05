import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserInput } from 'src/graphql';
import { UserRepository } from './domain/UserRepository';

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findByEmail(email: string) {
    return await this.prismaService.user.findFirst({
      where: {
        email,
      },
    });
  }

  async findById(id: number) {
    return await this.prismaService.user.findFirst({
      where: {
        id,
      },
    });
  }

  async create(createUserInput: CreateUserInput) {
    return await this.prismaService.user.create({
      data: createUserInput,
    });
  }
}
