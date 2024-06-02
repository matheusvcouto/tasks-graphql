import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

/**
 * Verifica se uma determinada data está há mais de um limite de tempo especificado em minutos.
 * @param {number} limitInMinutes - O limite de tempo em minutos.
 * @param {number} datetime - O timestamp da data para verificar.
 * @returns {boolean} - Retorna true se a data estiver há mais de 'limitInMinutes' minutos atrás, caso contrário retorna false.
 */
function isDateTimeBeforeLimit(limitInMinutes: number, datetime: number): boolean {
  const currentTime = new Date().getTime();
  const createdTime = new Date(datetime).getTime();
  const differenceInMinutes = (currentTime - createdTime) / (1000 * 60); // Diferença em minutos
  console.log("Diferença em minutos:", differenceInMinutes);
  return differenceInMinutes < limitInMinutes;
}

function isDateTimeBeforeLimitMin(limitInMinutes: number, datetime: Date): boolean {
  const currentTime = new Date().getTime();
  const createdTime = new Date(datetime).getTime();
  const differenceInMinutes = (currentTime - createdTime) / (1000 * 60); // Diferença em minutos
  console.log("Diferença em minutos:", differenceInMinutes);
  return differenceInMinutes < limitInMinutes;
}

async function createCode() {
  const newCode = Math.floor(Math.random() * 1000000)
  // console.log('codigo gerado', newCode)
  const [user] = await prisma.user.findMany()
  const create = await prisma.code.create({
    data: {
      value: newCode,
      email: user.email
    }
  })
  const code = await prisma.code.update({
    where: { email: user.email },
    data: { value: newCode, email: user.email }
  })
  console.log(code)
  // const code = await prisma.code.findUnique({
  //   where: { email: user.email },
  // })
  // const res = isDateTimeBeforeLimit(5, new Date(code!.updatedAt).getTime())
  console.log(new Date().getMinutes())
  console.log(new Date(code!.updatedAt).getMinutes())

  const res = isDateTimeBeforeLimitMin(5, code!.updatedAt)

  if (!res) {
    console.log('Já passou mais de 5min')
  }
  if (res) {
    console.log('Ainda da tempo.')
  }

}
createCode()


// // Exemplo de uso
// const datetime = 1715645472943; // Datetime em milissegundos
// const isMoreThan5Minutes = isMoreThan5MinutesAgo(datetime);
// console.log(isMoreThan5Minutes); // Saída: true ou false