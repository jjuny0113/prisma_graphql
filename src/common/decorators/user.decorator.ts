import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { getGqlCtxRequest } from '../utils/getGqlCtx';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => getGqlCtxRequest(context).user,
);
