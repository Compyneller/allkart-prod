import { transporter } from "../config/email";

type sendEmailType = {
  to: string;
  subject: string;
  body: string;
};

export const sendEmail = async ({ to, subject, body }: sendEmailType) => {
  const info = await transporter.sendMail({
    from: process.env.FROM_EMAIL,
    to: to,
    subject: subject,
    html: body,
  });

  return info;
};
