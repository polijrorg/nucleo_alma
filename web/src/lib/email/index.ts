import type React from "react";
import { resend } from "./resend";

type SendEmailHtml = {
  to: string;
  subject: string;
  html: string;
  text?: string;
};

type SendEmailReact = {
  to: string;
  subject: string;
  react: React.ReactElement;
  text?: string;
};

type SendArgs = SendEmailHtml | SendEmailReact;

function isReactPayload(args: SendArgs): args is SendEmailReact {
  return "react" in args;
}

export async function sendEmail(args: SendArgs) {
  if (!process.env.EMAIL_FROM) {
    throw new Error("EMAIL_FROM não configurado");
  }

  const { to, subject, text } = args;

  const base = {
    from: process.env.EMAIL_FROM,
    to,
    subject,
    ...(text ? { text } : {}),
  };

  const { data, error } = await resend.emails.send(
    isReactPayload(args)
      ? { ...base, react: args.react }
      : { ...base, html: args.html }
  );

  if (error) throw new Error(error.message);
  return data;
}
