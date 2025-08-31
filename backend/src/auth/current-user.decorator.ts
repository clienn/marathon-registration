import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const CurrentUser = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  // Works for both REST & GraphQL
  const gqlCtx = GqlExecutionContext.create(ctx);
  const req = gqlCtx.getContext()?.req ?? (ctx.switchToHttp().getRequest());
  return req.user;
});