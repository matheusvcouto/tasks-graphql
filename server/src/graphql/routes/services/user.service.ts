import { Injectable } from "@nestjs/common";
import { User } from "~/graphql/models/user.model";
import { PrismaService } from "~/services/prisma.service";

@Injectable()
export class UserService {
  constructor (
    private readonly prisma: PrismaService
  ) {}
  
  async users(): Promise<User[]> {
    const users = await this.prisma.user.findMany()
    return users
  }
}