import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log: ['query']
})

async function main() {
  await prisma.task.deleteMany()
  await prisma.user.deleteMany()

  const user = await prisma.user.create({
    data: {
      email: 'matheus.vieira.couto@gmail.com',
      name: 'Matheus Vieira'
    }
  })

  const task_A = await prisma.task.create({
    data: {
      title: 'Tarefa teste',
      userId: user.id
    }
  })

  const subTask_A = await prisma.task.create({
    data: {
      title: 'sub tarefa A',
      userId: user.id,
      parentId: task_A.id
    }
  })

  await prisma.task.create({
    data: {
      userId: user.id,
      parentId: subTask_A.id,
      title: 'Subtarefa da subtarefa A',
      description: 'Descrição da subtarefa'
    }
  })

  await prisma.task.create({
    data: {
      title: "Criar um curso de empreendedorismo",
      description: "Um curso completo com foco em finanças e vendas para empreendedores",
      userId: user.id
    }
  })

  const subTask_B = await prisma.task.create({
    data: {
      title: 'sub tarefa B',
      userId: user.id,
      parentId: task_A.id
    }
  })
}

main()