import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();
console.log(process.env.APP_PASSWORD);

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "shubham.jsx@gmail.com",
    pass: `${process.env.APP_PASSWORD}`, // Use env var or fallback
  },
  connectionTimeout: 5000, // 5 seconds
  greetingTimeout: 5000,
  socketTimeout: 5000,
  // Pool settings to reuse connections
  pool: true,
  maxConnections: 5,
  maxMessages: 10,
});

// Better verification with error handling
transporter.verify((error, success) => {
  if (error) {
    console.error("❌ SMTP connection error:", error.message);
    console.error(
      "Check: 1) App Password is valid 2) 2FA is enabled 3) Internet connection"
    );
  } else {
    console.log("✅ SMTP server is ready to send emails");
  }
});

type sendEmailType = {
  to: string;
  subject: string;
  body?: string;
  text?: string;
};

export const sendEmail = async ({ to, subject, text, body }: sendEmailType) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.FROM_EMAIL,
      to: to,
      subject: subject,
      text: text,
      //   html: body,
    });
    console.log("✅ Email sent successfully:", info.messageId);
    return info;
  } catch (error: any) {
    console.error("❌ Email send error:", error.message);

    // More specific error messages
    if (error.code === "EAUTH") {
      console.error("Authentication failed. Check your App Password.");
    } else if (error.code === "ESOCKET") {
      console.error("Socket error. Gmail might be blocking the connection.");
    } else if (error.responseCode === 535) {
      console.error("Invalid credentials. Generate a new App Password.");
    }

    throw error;
  }
};
