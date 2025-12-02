"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const better_auth_1 = require("better-auth");
const prisma_1 = require("better-auth/adapters/prisma");
const mail_1 = require("@repo/mail");
const plugins_1 = require("better-auth/plugins");
const auth_db_1 = require("@repo/auth-db");
exports.auth = (0, better_auth_1.betterAuth)({
    database: (0, prisma_1.prismaAdapter)(auth_db_1.userdb, {
        provider: "postgresql",
    }),
    user: {
        additionalFields: {
            role: {
                type: "string",
                defaultValue: "user",
                required: false,
                input: false,
            },
        },
    },
    session: {
        fetchUserInfo: true,
        additionalFields: {
            role: {
                type: "string",
                fieldName: "role",
                returned: true,
            },
        },
    },
    trustedOrigins: [process.env.ORIGIN || "http://localhost:3000"],
    baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000/auth/login",
    secret: process.env.BETTER_AUTH_SECRET,
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: true,
        sendResetPassword: async ({ user, url }) => {
            await (0, mail_1.sendEmail)({
                to: user.email,
                subject: "Reset Password",
                text: `Click the link to reset your password: ${url}`,
            });
        },
    },
    emailVerification: {
        autoSignInAfterVerification: true,
        sendVerificationEmail: async ({ user, url }, request) => {
            await (0, mail_1.sendEmail)({
                to: user.email,
                subject: "Verify your email address",
                text: `Click the link to verify your email: ${url}`,
            });
        },
        async afterEmailVerification(user, request) {
            console.log(user);
            // producer.send("auth-service", user);
        },
    },
    socialProviders: {
        google: {
            prompt: "consent",
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
        },
    },
    plugins: [(0, plugins_1.admin)()],
});
