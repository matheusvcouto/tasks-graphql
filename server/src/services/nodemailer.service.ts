import { Injectable } from '@nestjs/common'
import SMTPTransport from 'nodemailer/lib/smtp-transport'
import * as nodemailer from 'nodemailer';

@Injectable()
export class NodeMailerService {
  private mail: nodemailer.Transporter;

  constructor(
  ) {
    this.mail = nodemailer.createTransport({
      host: 'smtp.hostinger.com',
      port: 465,
      secure: true,
      auth: {
        user: "contato@matheuscouto.com",
        pass: "N@Senha34",
      }
    });
  }

  private form = {
    address: "contato@matheuscouto.com",
    name: 'Matheus Couto'
  }

  // // smtp
  // private mail = nodemailer.createTransport({
  //   service: 'hostinger',
  //   host: 'smtp.hostinger.com',
  //   port: 465,
  //   secure: true,
  //   auth: {
  //     user: "contato@matheuscouto.com",
  //     pass: "N@Senha34",
  //   }
  // })

  send = {
    message: (data: { to: string | string[], title: string, html: string }) => {
      return this.mail.sendMail({
        from: this.form,
        to: data.to,
        subject: data.title,
        html: data.html,
      })
    },
    code: (data: { to: string | string[], code: number | string }) => {
      return this.mail.sendMail({
        from: this.form,
        to: data.to,
        subject: 'Codigo de verificação',
        html: `
          <p>Seu codigo de acesso é 
            <strong style="color: #4286f4">${data.code}<strong>
          </p>
        `
      })
    }
  }
}