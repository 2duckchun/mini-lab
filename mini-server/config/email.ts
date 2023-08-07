import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { EmailAuthHtml } from "../views/EmailAuth";

dotenv.config();

type MailOption = {
  from: string;
  to: string;
  subject: string;
  html: string;
};

type GetEmailData = (to: string, authCode: string) => MailOption;

export const setSendEmail: GetEmailData = (to, authCode) => {
  const data: MailOption = {
    from: process.env.MAIL_USER as string,
    to,
    subject: "이메일 인증입니다.",
    html: EmailAuthHtml(authCode),
  };

  return data;
};

export const senderConfig = {
  service: "Naver",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
};

// export const sendEmail = (to: string, authCode: string) => {
//   const smtpTransport = nodemailer.createTransport({
//     service: "Naver",
//     auth: {
//       user: process.env.MAIL_USER,
//       pass: process.env.MAIL_PASSWORD,
//     },
//     tls: {
//       rejectUnauthorized: false,
//     },
//   });

//   const mail = getEmailData(to, authCode);

//   smtpTransport.sendMail(mail, (error, response) => {
//     if (error) {
//       console.error(error);
//     } else {
//       console.log(response);
//     }

//     smtpTransport.close();
//   });
// };
