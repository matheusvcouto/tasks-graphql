import { Module } from "@nestjs/common";
import { AuthResolver } from "./auth.resolver";
import { PrismaService } from "~/services/prisma.service";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { AuthService } from "~/auth/auth.service";
import { NodeMailerService } from "~/services/nodemailer.service";
import { env } from "~/config/env/env.schema";

@Module({
  imports: [
    JwtModule.register({
      signOptions: { algorithm: 'RS256' },
      privateKey: Buffer.from(env.JWT_PRIVATE_KEY, 'base64'),
      publicKey: Buffer.from(env.JWT_PUBLIC_KEY, 'base64')
    }),
  ],
  providers: [AuthResolver, PrismaService, JwtService, AuthService, NodeMailerService]
})
export class AuthModule {}