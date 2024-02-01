import { MailerConfig } from 'nodemailer';

const mailConfig: MailerConfig = {
  mailer: 'smtp',

  smtp: {
    host: 'smtp.gmail.com',
    port: 465,
    secure: false,
    auth: {
      user: 'no-reply@riasistemas.com.br',
      pass: 'fnmsgprbzxevzoec',
    },
  },
};

export default mailConfig;
