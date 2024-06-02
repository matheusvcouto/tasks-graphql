import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Task {

  @Field(() => ID)
  id: string

  @Field()
  title: string

  @Field(() => String, {
    nullable: true
  })
  description: string | null

    // @Field(() => [Task], {
    //   nullable: true
    // })
    // subTasks?: Task[]

  @Field(() => ID, {
    nullable: true
  })
  parentId: string | null

  @Field()
  createdAt: Date

  @Field()
  updatedAt: Date

}


@ObjectType()
export class SubTasks extends Task {}