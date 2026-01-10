import { createParamDecorator, ExecutionContext } from '@nestjs/common';

type JwtUser = {
  sub: number;
  username: string;
};

export const GetUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    const user = request['user'] as JwtUser;

    if (!user) return null;

    return data ? user?.[data as keyof JwtUser] : user;
  },
);
