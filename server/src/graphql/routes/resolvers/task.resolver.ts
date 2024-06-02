import { Args, Context, Field, Mutation, ObjectType, Query, ResolveField, Resolver, Root } from "@nestjs/graphql";
import { SubTasks, Task } from "~/graphql/models/task.model";
import { TaskService } from "../services/task.service";
import { GenerateSubTasksInput } from "~/graphql/inputs/task/generate-subtasks.input";
import { CreateTaskInput } from "~/graphql/inputs/task/create-task.input";

@Resolver(() => Task)
export class TaskResolver {
  constructor (
    private readonly taskServices: TaskService
  ) {}

  @Query(() => [Task])
  async tasks(
  ): Promise<Task[]> {
    return await this.taskServices.tasks()
  }

  @Mutation(() => Task)
  async createTask(
    @Args('input') input: CreateTaskInput
  ): Promise<Task> {
    return await this.taskServices.createTasks(input, '65f9a32f-c462-411a-921d-bbaeda1f9748')
  }

  @Mutation(() => Task)
  async deleteTask(
    @Args('taskId') taskId: string
  ) {
    return await this.taskServices.deleteTask(taskId)
  }

  @Mutation(() => Task)
  async generateSubTasks(
    @Args('input') input: GenerateSubTasksInput
  ): Promise<Task> {
    return this.taskServices.generateSubTasks(input)
  }

  @ResolveField(() => [Task])
  async subTasks (
    @Root() task: Task
  ) {
    return this.taskServices.subTasksFieldResolvers(task)
  }
}