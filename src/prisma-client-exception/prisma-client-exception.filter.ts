import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpAdapterHost,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();

    const message = exception.message.replace(/\n/g, '');
    console.log('message', message);
  }
}
