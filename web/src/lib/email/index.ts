import { resend } from "./resend";

type SendArgs =
  | { to: string; subject: string; html: string; text?: string }
  | { to: string; subject: string; react: React.ReactElement; text?: string };

export async function sendEmail(args: SendArgs) {
  if (!process.env.EMAIL_FROM) {
    throw new Error("EMAIL_FROM não configurado");
  }

  const { to, subject, ...content } = args as any;

  const { data, error } = await resend.emails.send({
    from: process.env.EMAIL_FROM,
    to,
    subject,
    ...content, // html | react
  });

  if (error) {
    console.error("[EMAIL ERROR]", error);
    return null;
  }

  return data;
}
