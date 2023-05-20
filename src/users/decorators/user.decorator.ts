import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const User = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    if (request?.user) {
      const user = request.user;

      return data ? user?.[data] : user;
    }

    return {};
  },
);
