import { PrismaService } from "~/services/prisma.service";
import { UserPayload } from "~/types/jwt";
import { Inject, Injectable, Res, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { env } from "~/config/env/env.schema";
import { NodeMailerService } from "~/services/nodemailer.service";
import { Response } from "express";

type Token = string

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
    private readonly mail: NodeMailerService
  ) {}

  // enviar o email
  async sendCode(email: string) {
    const newCode = Math.floor(Math.random() * 1000000)
    const code = await this.prisma.code.upsert({
      update: {
        value: newCode
      },
      where: { email },
      create: {
        value: newCode,
        email: email
      },
    })
    const { accepted } = await this.mail.send.code({
      code: code.value,
      to: email
    })
    if (accepted[0] === email) {
      return {
        message: 'Codigo de acesso foi enviado com sucesso para seu email'
      }
    }
    return {
      message: 'Ocorreu um error ao enviar o codigo de acesso para seu email'
    }
  }
  
  // validar o code
  async login(email: string, code: number) {
    const codeAndUser = await this.prisma.code.findUnique({ 
      where: { email }, 
      include: { user: true } 
    })

    // Validação
    if (!codeAndUser) {
      throw new UnauthorizedException('dados invalidos')
    }
    if (code !== codeAndUser.value) {
      throw new UnauthorizedException('Codigo invalido')
    }
    const result = this.isDateTimeBeforeLimitMin(2, codeAndUser.updatedAt)

    if (result === false) {
      throw new UnauthorizedException('Tempo expiado')
    }

    const { id, name } = codeAndUser.user
  
    const payload = {
      sub: id,
      name,
      email,
    } satisfies UserPayload
  
    const token = await this.jwt.signAsync(payload, {
      algorithm: 'RS256',
      privateKey: Buffer.from(env.JWT_PRIVATE_KEY, 'base64'),
    })
  
    return token
  }

  async test(
    email: string, 
    // @Res() res: Response
  ) {
    // console.log('res', res)
    const user = await this.prisma.user.findUnique({ 
      where: { email }, 
    })

    // Validação
    if (!user) {
      throw new UnauthorizedException('dados invalidos')
    }

    const { id, name } = user
  
    const payload = {
      sub: id,
      name,
      email,
    } satisfies UserPayload
  
    const token = await this.jwt.signAsync(payload, {
      algorithm: 'RS256',
      privateKey: Buffer.from(env.JWT_PRIVATE_KEY, 'base64'),
    })
  
    return token
  }

  // async sendCodeToEmail(email: string) {
  //   const user = await this.prisma.user.findUnique({ where: { email } })
  //   if (!user) throw new UnauthorizedException('dados invalidos')
  // }

  isDateTimeBeforeLimitMin(limitInMinutes: number, datetime: Date): boolean {
    const currentTime = new Date().getTime();
    const createdTime = new Date(datetime).getTime();
    const differenceInMinutes = (currentTime - createdTime) / (1000 * 60); // Diferença em minutos
    return differenceInMinutes < limitInMinutes;
  }

}


// {
//   "accepted": [
//     "matheusvieira.emp@gmail.com"
//   ],
//   "rejected": [],
//   "ehlo": [
//     "PIPELINING",
//     "SIZE 48811212",
//     "ETRN",
//     "AUTH PLAIN LOGIN",
//     "ENHANCEDSTATUSCODES",
//     "8BITMIME",
//     "DSN",
//     "CHUNKING"
//   ],
//   "envelopeTime": 874,
//   "messageTime": 683,
//   "messageSize": 492,
//   "response": "250 2.0.0 Ok: queued as 4VgKJq0M3Vz6BB93",
//   "envelope": {
//     "from": "contato@matheuscouto.com",
//     "to": [
//       "matheusvieira.emp@gmail.com"
//     ]
//   },
//   "messageId": "<6f870f85-786a-8474-4256-049c76e3b329@matheuscouto.com>"
// }
