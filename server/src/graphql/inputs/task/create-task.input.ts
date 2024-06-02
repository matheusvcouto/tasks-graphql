import { Field, InputType } from "@nestjs/graphql";
import { Min } from "class-validator";

@InputType()
export class CreateTaskInput {

  @Field()
  title: string

  @Field(() => String,
    {
      nullable: true,
      defaultValue: null
    }
  )
  description: string | null

  // @Field(
  //   {
  //     nullable: true,
  //     defaultValue: null
  //   }
  // )
  // prompt: string | null
  
}