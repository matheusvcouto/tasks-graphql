import { UserPayload } from '~/types/jwt';
import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export interface AuthUser {
  sub: string;
}

export const CurrentUser = createParamDecorator(
  (_, context: ExecutionContext): UserPayload => {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req
    const user = req.user as UserPayload | undefined

    if (!user) {
      throw new UnauthorizedException()
    }

    return req.user
  },
);