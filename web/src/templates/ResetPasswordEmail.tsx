import * as React from "react";

export function ResetPasswordEmail(props: { name?: string; resetUrl: string }) {
  const { name, resetUrl } = props;

  return (
    <div style={{ fontFamily: "Arial, sans-serif", lineHeight: 1.5 }}>
      <h2 style={{ margin: "0 0 12px" }}>Redefinir senha</h2>

      <p style={{ margin: "0 0 12px" }}>
        {name ? `Olá, ${name}!` : "Olá!"} Recebemos um pedido para redefinir sua senha.
        Clique no botão abaixo para criar uma nova senha.
      </p>

      <p style={{ margin: "16px 0" }}>
        <a
          href={resetUrl}
          style={{
            display: "inline-block",
            padding: "10px 14px",
            textDecoration: "none",
            borderRadius: 8,
            background: "#111",
            color: "#fff",
          }}
        >
          Redefinir senha
        </a>
      </p>

      <p style={{ margin: "16px 0 0", fontSize: 12, color: "#555" }}>
        Se você não solicitou isso, ignore este email.
      </p>
    </div>
  );
}
