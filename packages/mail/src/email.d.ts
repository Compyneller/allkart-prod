import nodemailer from "nodemailer";
export declare const transporter: nodemailer.Transporter<import("nodemailer/lib/smtp-pool").SentMessageInfo, import("nodemailer/lib/smtp-pool").Options>;
type sendEmailType = {
    to: string;
    subject: string;
    body?: string;
    text?: string;
};
export declare const sendEmail: ({ to, subject, text, body }: sendEmailType) => Promise<import("nodemailer/lib/smtp-pool").SentMessageInfo>;
export {};
//# sourceMappingURL=email.d.ts.map