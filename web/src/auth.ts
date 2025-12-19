import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { prismaAdapter } from "better-auth/adapters/prisma";

import prisma from "./app/(backend)/services/db";

import { customSession, emailOTP } from "better-auth/plugins";
import { expo } from "@better-auth/expo";

import { getUserRole } from "@/backend/services/auth";
import { sendEmail } from "./lib/email";
import { ResetPasswordEmail } from "./templates/ResetPasswordEmail";
import { VerifyEmailEmail } from "./templates/VerifyEmailEmail";

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",

  database: prismaAdapter(prisma, { provider: "mongodb" }),

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },

  user: {
    deleteUser: { enabled: true },
    changeEmail: { enabled: true },
  },

  plugins: [
    expo(),

    emailOTP({
      otpLength: 6,
      expiresIn: 10 * 60,
      allowedAttempts: 5,

      overrideDefaultEmailVerification: true,

      async sendVerificationOTP({ email, otp, type }) {
        if (type === "email-verification") {
          void sendEmail({
            to: email,
            subject: "Confirme seu email — Núcleo Alma",
            react: VerifyEmailEmail({
              code: otp,
              name: email,
            }),
          });
          return;
        }

        if (type === "forget-password") {
          void sendEmail({
            to: email,
            subject: "Redefinir senha — Núcleo Alma",
            react: ResetPasswordEmail({
              code: otp,
              name: email,
            }),
          });
          return;
        }
      },
    }),

    customSession(async ({ user, session }) => {
      const role = await getUserRole(session.userId);
      return { role, user, session };
    }),

    nextCookies(),
  ],

  trustedOrigins: ["nucleoalma://", "nucleoalma://*"],
});
