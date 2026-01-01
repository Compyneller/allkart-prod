import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { sendEmail } from "@repo/mail";
import { admin } from "better-auth/plugins";
import { userdb } from "@repo/auth-db";

export const auth = betterAuth({
  database: prismaAdapter(userdb, {
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
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:5000",
  secret: process.env.BETTER_AUTH_SECRET,
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url }) => {
      await sendEmail({
        to: user.email,
        subject: "Reset Password",
        text: `Click the link to reset your password: ${url}`,
      });
    },
  },
  emailVerification: {
    autoSignInAfterVerification: true,

    sendVerificationEmail: async ({ user, url }, request) => {
      await sendEmail({
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
      clientId: process.env.CLIENT_ID!,
      clientSecret: process.env.CLIENT_SECRET!,
    },
  },
  plugins: [admin()],
});
