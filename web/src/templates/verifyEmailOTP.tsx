import * as React from "react";

type VerifyEmailEmailProps = {
  name?: string;
  code: string;
};

export function VerifyEmailEmail({ name, code }: VerifyEmailEmailProps) {
  return (
    <div style={container}>
      <div style={card}>
        <h1 style={title}>Confirme seu e-mail</h1>

        <p style={text}>
          Olá{ name ? `, ${name}` : "" }!
        </p>

        <p style={text}>
          Use o código abaixo para confirmar seu e-mail. Ele é válido por alguns
          minutos:
        </p>

        <div style={codeBox}>
          <span style={codeText}>{code}</span>
        </div>

        <p style={hint}>
          Se você não solicitou este código, pode ignorar este e-mail com
          segurança.
        </p>

        <hr style={divider} />

        <p style={footer}>
          Núcleo Alma · Segurança & Autenticação
        </p>
      </div>
    </div>
  );
}

/* ---------- Styles ---------- */

const container: React.CSSProperties = {
  backgroundColor: "#f3f4f6",
  padding: "40px 0",
  fontFamily: "Arial, Helvetica, sans-serif",
};

const card: React.CSSProperties = {
  maxWidth: "420px",
  margin: "0 auto",
  backgroundColor: "#ffffff",
  borderRadius: "12px",
  padding: "32px 28px",
  boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
};

const title: React.CSSProperties = {
  fontSize: "22px",
  fontWeight: "bold",
  marginBottom: "16px",
  color: "#111827",
  textAlign: "center",
};

const text: React.CSSProperties = {
  fontSize: "14px",
  lineHeight: "20px",
  color: "#374151",
  marginBottom: "12px",
};

const codeBox: React.CSSProperties = {
  backgroundColor: "#f9fafb",
  border: "1px dashed #d1d5db",
  borderRadius: "8px",
  padding: "16px",
  textAlign: "center",
  margin: "20px 0",
};

const codeText: React.CSSProperties = {
  fontSize: "28px",
  letterSpacing: "6px",
  fontWeight: "bold",
  color: "#111827",
};

const hint: React.CSSProperties = {
  fontSize: "12px",
  color: "#6b7280",
  marginTop: "12px",
};

const divider: React.CSSProperties = {
  border: "none",
  borderTop: "1px solid #e5e7eb",
  margin: "24px 0",
};

const footer: React.CSSProperties = {
  fontSize: "11px",
  color: "#9ca3af",
  textAlign: "center",
};
