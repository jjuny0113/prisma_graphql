import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient, User } from '@prisma/client';
import { AppModule } from 'src/app.module';
import * as request from 'supertest';
import { mockDeep } from 'jest-mock-extended';
import { UserModule } from 'src/user/user.module';
import { getTxClient } from 'src/common/testingUtil/transaction';
import { PrismaService } from 'src/prisma/prisma.service';
import { Status } from 'src/graphql';

global.setImmediate =
  global.setImmediate || ((fn, ...args) => global.setTimeout(fn, 0, ...args));

const GRAPHQL_ENDPOINT = '/graphql';

const testUser: User = {
  id: 1,
  email: 'test@test.com',
  password: '1234',
};

describe('userModule e2e', () => {
  let app: INestApplication;
  let jwtToken: string;
  const prisma = new PrismaClient();

  const baseTest = () => request(app.getHttpServer()).post(GRAPHQL_ENDPOINT);
  const publicTest = async (query: string) => await baseTest().send({ query });
  const privateTest = (query: string) =>
    baseTest().set('X-JWT', jwtToken).send({ query });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule, UserModule],
    })
      .overrideProvider(PrismaService)
      .useValue({
        user: prisma.user,
      })
      .compile();
    app = module.createNestApplication();

    await app.init();
  });

  afterAll(async () => {
    await prisma.user.delete({
      where: {
        email: testUser.email,
      },
    });
    await app.close();
  });

  describe('signUp', () => {
    it('새로운 유저', async () => {
      const test = await publicTest(`mutation{
                createUser(createUserInput:{email:"${testUser.email}",password:"${testUser.password}"}){
                    status,
                    message
                }
              }`);

      const { status, message } = test.body.data.createUser;
      expect(status).toBe(Status.OK);
      expect(message).toBe(`${testUser.email} 유저가 등록되었습니다`);
    });
    it('이미 유저가 있는 경우는 에러', async () => {
      const test = await publicTest(`mutation{
              createUser(createUserInput:{email:"${testUser.email}",password:"${testUser.password}"}){
                status,
                message
              }
            }`);

      const { status, message } = test.body.data.createUser;
      expect(status).toBe(Status.ERROR);
      expect(message).toBe('이미 등록된 유저입니다.');
    });
  });
  describe('login', () => {
    it('user login', async () => {
      const test = await publicTest(`
      mutation{
          login(loginInput:{email:"${testUser.email}",password:"${testUser.password}"}){
            status,
            accessToken,
            message
          }
        }
      `);
      const { status, accessToken, message } = test.body.data.login;
      expect(status).toBe(Status.OK);
      expect(accessToken).toBeTruthy();
      expect(message).toBeNull();
      jwtToken = accessToken;
    });
    it('login 실패시', async () => {
      const test = await publicTest(`
        mutation{
            login(loginInput:{email:"${testUser.email}",password:"${testUser.password}12"}){
              status,
              accessToken,
              message
            }
          }
        `);
      const { status, accessToken, message } = test.body.data.login;
      expect(status).toBe(Status.ERROR);
      expect(accessToken).toBeNull();
      expect(message).toBeTruthy();
    });
  });
});
