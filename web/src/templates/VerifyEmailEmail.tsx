import * as React from "react";

export function VerifyEmailEmail(props: {
  name?: string;
  code: string;
  expiresInMinutes?: number;
}) {
  const { name, code, expiresInMinutes = 10 } = props;

  return (
    <div style={{ fontFamily: "Arial, sans-serif", lineHeight: 1.5 }}>
      <h2 style={{ margin: "0 0 12px" }}>Confirme seu email</h2>

      <p style={{ margin: "0 0 12px" }}>
        {name ? `Olá, ${name}!` : "Olá!"} Para concluir seu cadastro no Núcleo Alma,
        digite o código abaixo no app para confirmar seu email.
      </p>

      <div
        style={{
          margin: "16px 0",
          padding: "14px",
          borderRadius: 10,
          border: "1px solid #e5e5e5",
          background: "#fafafa",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: 12, color: "#555", marginBottom: 6 }}>
          Seu código de verificação
        </div>

        <div
          style={{
            fontSize: 28,
            fontWeight: 700,
            letterSpacing: 6,
            color: "#111",
          }}
        >
          {code}
        </div>

        <div style={{ fontSize: 12, color: "#555", marginTop: 8 }}>
          Expira em {expiresInMinutes} minutos.
        </div>
      </div>

      <p style={{ margin: "16px 0 0", fontSize: 12, color: "#555" }}>
        Se você não criou uma conta, pode ignorar este email. Não compartilhe este código com ninguém.
      </p>
    </div>
  );
}
