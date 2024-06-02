import { UnauthorizedException } from '@nestjs/common';
import { Resolver, Query, ObjectType, Field, Args, InputType, Context, Mutation } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';
import { Request, Response } from 'express';
import { AuthService } from '~/auth/auth.service';

@ObjectType()
class sendCodeResponse {

  @Field()
  message: string
}

@ObjectType()
class LoginResponse {

  @Field()
  access_token: string
}

@InputType()
class sendCodeInput {

  @Field()
  @IsEmail()
  email: string
}

@InputType()
class LoginInput {

  @Field()
  @IsEmail()
  email: string

  @Field()
  code: number
}

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService
  ) {}

  @Query(() => sendCodeResponse, {
    description: 'Enviar o codigo para o email'
  })
  async sendCode (
    @Args('email') email: string
  ): Promise<sendCodeResponse> {
    return await this.authService.sendCode(email) 
  }

  //ao fazer login deve verificar se a assinatura do usuario está ativa e retornar também o seu plano.
  @Query(() => LoginResponse, {
    description: 'Verificar se o codigo está correto. Retorna o token de acesso'
  })
  async login (
    @Args('data') data: LoginInput,
  ): Promise<LoginResponse> {
    const token = await this.authService.login(data.email, data.code)
    return {
      access_token: token
    }
    
  }

  @Mutation(() => LoginResponse, {
    description: 'Verificar se o codigo está correto. Retorna o token de acesso'
  })
  async loginTest (
    @Args('email') email: string,
    // @Context() context: { req: Request, res: Response }
  ): Promise<LoginResponse> {
    const token = await this.authService.test(email)
    return {
      access_token: token
    }
    
  }

  @Query(() => String)
  async unaltorizeTest (
  ): Promise<string> {
    if(true) {
      throw new UnauthorizedException()
    }
    return 'retorno'
    
  }
  
}
