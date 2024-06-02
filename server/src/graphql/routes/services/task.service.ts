import { GenerateSubTasksInput } from "~/graphql/inputs/task/generate-subtasks.input";
import { PrismaService } from "~/services/prisma.service";
import { OpenaiService } from "~/services/openai.service";
import { Injectable } from "@nestjs/common";
import { Task } from "~/graphql/models/task.model";
import { ChatOpenAI } from "@langchain/openai";
import { CreateTaskInput } from "~/graphql/inputs/task/create-task.input";

@Injectable()
export class TaskService {
  private jsonModeModel = new ChatOpenAI({
    model: "gpt-4-1106-preview",
  }).bind({
    response_format: {
      type: "json_object",
    },
  });

  constructor(
    private readonly prisma: PrismaService,
    private readonly openai: OpenaiService,
  ) { }

  async tasks(): Promise<Task[]> {
    const tasks = await this.prisma.task.findMany({ where: { parentId: null } }).catch(() => {
      throw new Error('Ocorreu um problema ao buscar as tarefas')
    })
    return tasks
  }

  async createTasks(data: CreateTaskInput, userId: string): Promise<Task> {
    const task = await this.prisma.task.create({
      data: {
        title: data.title,
        description: data.description,
        userId
      }
    })
    return task
  }

  async deleteTask(taskId: string) {
    return await this.prisma.task.delete({ where: { id: taskId } })
  }

  async generateSubTasks(data: GenerateSubTasksInput) {
    const task = await this.prisma.task.findUnique({ where: { id: data.taskId } })
    if (!task) {
      throw new Error('Não foi encontrado a tarefa')
    }

    const exemple = `
    subtasks: [
      {
        "title": "subtarefa",
        "description: "descrição da subtarefa"
      }
    ]
    `

    const result = await this.jsonModeModel.invoke([
      ["system", "Retorne apena no formato json"],
      ["human", `
      Voce vai dividir a tarefa ${task.title} em algumas partes

      Exemplo: """
      subtasks: [
        {
          "title": "subtarefa",
          "description: "descrição da subtarefa"
        },
        {
          "title": "subtarefa",
          "description: "descrição da subtarefa"
        },
        {
          "title": "subtarefa",
          "description: "descrição da subtarefa"
        }
      ]

      """

      retorne a quantidade no maximo 10 subtasks e no minimo 3 subtasks para a seguinte demanda
      
      você deve retornar um array de tarefas contendo title e description, essas serão as subtarefas

      titulo da tarefa principal: ${task.description}
      descrição da tarefa principal: ${task.description}
      informações adicionais para as subtarefas: ${data.prompt}

      `],
    ])

    const res = JSON.parse(result.content as string) as unknown as {
      subtasks: {
        title: string,
        description: string
      }[]
    }
    for (const { description, title } of res.subtasks) {
      await this.prisma.task.create({
        data: {
          title,
          description,
          parentId: task.id,
          userId: task.userId
        }
      }).then(() => {
        console.log('Foi um ', title)
      })
    }
    // console.log(result.content)

    return task
  }

  async subTasksFieldResolvers(task: Task) {
    const tasks = await this.prisma.task.findMany({
      where: { parentId: task.id }
    })
    return tasks
  }
}