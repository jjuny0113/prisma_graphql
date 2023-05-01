import { UserRepository } from '../user/user.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';

describe('userRepository', () => {
  let repository: UserRepository;
  beforeEach(async () => {
    const prisma = jestPrisma.client;
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserRepository,
        {
          provide: PrismaService,
          useValue: {
            user: prisma.user,
          },
        },
      ],
    }).compile();
    repository = module.get<UserRepository>(UserRepository);
  });

  test('Add user', async () => {
    const user = {
      email: 'test12314@test.com',
      password: '1234',
    };
    const createdUser = await repository.create(user);

    expect(createdUser.email).toEqual(user.email);
  });

  test('findById', async () => {
    const user = {
      email: 'test12314@test.com',
      password: '1234',
    };
    const createdUser = await repository.create(user);
    const findUser = await repository.findById(createdUser.id);
    expect(findUser.email).toEqual(user.email);
  });

  test('findByEmail', async () => {
    const user = {
      email: 'test12314@test.com',
      password: '1234',
    };
    const createdUser = await repository.create(user);
    const findUser = await repository.findByEmail(createdUser.email);
    expect(findUser.email).toEqual(user.email);
  });
});
