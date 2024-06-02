import { UserPayload } from "~/types/jwt";
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { JwtService } from "@nestjs/jwt";
import { ExtractJwt } from "passport-jwt";
import { env } from "~/config/env/env.schema";

@Injectable()
export class AutorizationGuard implements CanActivate {
  constructor (
    private readonly jwt: JwtService
  ){}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    /// @ts-expect-error
    if (context.contextType === 'graphql') {

      const { req } = GqlExecutionContext.create(context).getContext()
      const token = ExtractJwt.fromAuthHeaderAsBearerToken()(req)

      if(!token) throw new UnauthorizedException()

      const payload = await this.jwt.verifyAsync<UserPayload>(token, {
        algorithms: ['RS256'],
        publicKey: Buffer.from(env.JWT_PUBLIC_KEY, 'base64')
      })

      req.user = payload
      
      return true
    }
    return false
  }
}