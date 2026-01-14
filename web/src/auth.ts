import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { prismaAdapter } from "better-auth/adapters/prisma";

import prisma from "./app/(backend)/services/db";

import { customSession } from "better-auth/plugins";
import { expo } from "@better-auth/expo";

import { getUserRole } from "@/backend/services/auth";
import { sendEmail } from "./lib/email";
import { ResetPasswordEmail } from "./templates/ResetPasswordEmail";
import { VerifyEmailEmail } from "./templates/VerifyEmailEmail";


type AuthUserMinimal = { email: string; name?: string | null };

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",

  database: prismaAdapter(prisma, {
    provider: "mongodb",
  }),

  emailVerification: {
    sendOnSignIn: true,

    sendVerificationEmail: async ({ user, url }) => {
      void sendEmail({
        to: user.email,
        subject: "Confirme seu email — Núcleo Alma",
        react: VerifyEmailEmail({
          name: user.name ?? user.email,
          verifyUrl: url,
        }),
      });
    },

  },

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,

    sendResetPassword: async ({ user, url }: ResetPasswordArgs) => {
      void sendEmail({
        to: user.email,
        subject: "Redefinir senha — Núcleo Alma",
        react: ResetPasswordEmail({
          name: user.name ?? user.email,
          resetUrl: url,
        }),
      });
    },

    onPasswordReset: async ({ user }: { user: AuthUserMinimal }) => {
      console.info("senha redefinida com sucesso:", user.email);
    },
  },

  user: {
    deleteUser: { enabled: true },
    changeEmail: { enabled: true },
  },

  plugins: [
    expo(),
    customSession(async ({ user, session }) => {
      const role = await getUserRole(session.userId);
      return { role, user, session };
    }),
    nextCookies(),
  ],

  trustedOrigins: ["nucleoalma://", "nucleoalma://*"],
});
