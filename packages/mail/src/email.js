"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = exports.transporter = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
console.log(process.env.APP_PASSWORD);
exports.transporter = nodemailer_1.default.createTransport({
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
exports.transporter.verify((error, success) => {
    if (error) {
        console.error("❌ SMTP connection error:", error.message);
        console.error("Check: 1) App Password is valid 2) 2FA is enabled 3) Internet connection");
    }
    else {
        console.log("✅ SMTP server is ready to send emails");
    }
});
const sendEmail = async ({ to, subject, text, body }) => {
    try {
        const info = await exports.transporter.sendMail({
            from: process.env.FROM_EMAIL,
            to: to,
            subject: subject,
            text: text,
            //   html: body,
        });
        console.log("✅ Email sent successfully:", info.messageId);
        return info;
    }
    catch (error) {
        console.error("❌ Email send error:", error.message);
        // More specific error messages
        if (error.code === "EAUTH") {
            console.error("Authentication failed. Check your App Password.");
        }
        else if (error.code === "ESOCKET") {
            console.error("Socket error. Gmail might be blocking the connection.");
        }
        else if (error.responseCode === 535) {
            console.error("Invalid credentials. Generate a new App Password.");
        }
        throw error;
    }
};
exports.sendEmail = sendEmail;
