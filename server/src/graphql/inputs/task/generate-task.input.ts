import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class GenerateTaskInput {

  @Field()
  goal: string

  @Field()
  description: string
}