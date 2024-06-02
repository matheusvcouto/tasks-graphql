import { Args, Query, Resolver } from "@nestjs/graphql";
import { User } from "~/graphql/models/user.model";

@Resolver(() => User)
export class UserResolver {
  constructor () {}

  // @Query(() => [User])
  // async users(): Promise<User[]> {
  //   return 
  // }
}