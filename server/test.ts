// import {NodeMailerService} from '~/services/nodemailer.service'
import * as nodemailer from 'nodemailer'
const mail = nodemailer.createTransport({
  service: 'hostinger',
  host: 'smtp.hostinger.com',
  port: 465,
  secure: true,
  auth: {
    user: "contato@matheuscouto.com",
    pass: "N@Senha34",
  }
})

async function main() {
  try {
    const info = await mail.sendMail({
      from: {
        address: "contato@matheuscouto.com",
        name: "Matheus"
      },
      to: ['matheusvieira.emp@gmail.com'],
      subject: "Oi Mauro",
      text: "Seu codigo é 856686"
    })
    console.log(JSON.stringify(info, null, 2))
  } catch (error) {
    console.log("erorororrororoororor", error)
  }
}

main()

// const mail = new NodeMailerService()

// async function main() {
//   try {
//     const info = await mail.send.code({
//       to: 'matheusvieira.emp@gmail.com',
//       code: "123-132"
//     })
//     console.log(JSON.stringify(info, null, 2))
//   } catch (error) {
//     console.log("error", error)
//   }
// }


// main()