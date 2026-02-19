import nodemailer from "nodemailer";

const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD } = process.env;

export const sendMail = async (receiver, subject, body) => {
  // 1. Créer un transporteur
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: +SMTP_PORT,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASSWORD,
    },
  });

  const info = await transporter.sendMail({
    from: "no-reply@superdemo.com",
    to: receiver,
    subject: subject,
    text: "Change de boite mail 🫠", // TODO utiliser un moteur de templating
    html: body, // TODO utiliser un moteur de templating
  });

  console.log(info);
};
