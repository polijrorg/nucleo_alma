import { betterAuth } from "better-auth";
import type {
  SendVerificationEmailParams,
  SendResetPasswordParams,
} from "better-auth";

import { nextCookies } from "better-auth/next-js";
import { prismaAdapter } from "better-auth/adapters/prisma";

import prisma from "./app/(backend)/services/db";

import { customSession } from "better-auth/plugins";
import { expo } from "@better-auth/expo";

import { getUserRole } from "@/backend/services/auth";
import { sendEmail } from "./lib/email";
import { ResetPasswordEmail } from "./templates/ResetPasswordEmail";

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",

  database: prismaAdapter(prisma, {
    provider: "mongodb",
  }),

  emailAndPassword: {
    enabled: true,

    requireEmailVerification: true,

    sendVerificationEmail: async ({ user, url }: SendVerificationEmailParams) => {
      void sendEmail({
        to: user.email,
        subject: "Confirme seu email — Núcleo Alma",
        react: ResetPasswordEmail({
          name: user.name ?? user.email,
          resetUrl: url,
        }),
      });
    },

    sendResetPassword: async ({ user, url }: SendResetPasswordParams) => {
      void sendEmail({
        to: user.email,
        subject: "Redefinir senha — Núcleo Alma",
        react: ResetPasswordEmail({
          name: user.name ?? user.email,
          resetUrl: url,
        }),
      });
    },

    onPasswordReset: async ({ user }) => {
      console.info("✅ [AUTH] Senha redefinida com sucesso:", user.email);
    },
  },

  user: {
    deleteUser: {
      enabled: true,
    },

    changeEmail: {
      enabled: true,
      // Quando vocês forem implementar:
      // sendChangeEmailVerification: async ({ user, newEmail, url }) => {
      //   void sendEmail({
      //     to: user.email,
      //     subject: "Aprovar mudança de email — Núcleo Alma",
      //     html: `<p>Clique para aprovar a mudança para ${newEmail}:</p><a href="${url}">Aprovar</a>`,
      //   });
      // },
    },
  },

  plugins: [
    expo(),

    customSession(async ({ user, session }) => {
      const role = await getUserRole(session.userId);
      return {
        role,
        user,
        session,
      };
    }),

    nextCookies(),
  ],

  trustedOrigins: [
    "nucleoalma://",
    "nucleoalma://*",
    // se tiver web:
    // "http://localhost:3000",
    // "https://seu-dominio.com",
  ],
});
