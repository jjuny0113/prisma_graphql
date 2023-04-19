import { ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const getGqlCtxRequest = (context: ExecutionContext) =>
  GqlExecutionContext.create(context).getContext().req;
