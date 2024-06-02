import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class GenerateSubTasksInput {

  @Field()
  taskId: string

  @Field()
  prompt: string
}