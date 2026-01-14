import * as React from "react";

export function VerifyEmailEmail(props: { name?: string; verifyUrl: string }) {
  const { name, verifyUrl } = props;

  return (
    <div style={{ fontFamily: "Arial, sans-serif", lineHeight: 1.5 }}>
      <h2 style={{ margin: "0 0 12px" }}>Confirme seu email</h2>

      <p style={{ margin: "0 0 12px" }}>
        {name ? `Olá, ${name}!` : "Olá!"} Para concluir seu cadastro no Núcleo Alma,
        confirme seu email clicando no botão abaixo.
      </p>

      <p style={{ margin: "16px 0" }}>
        <a
          href={verifyUrl}
          style={{
            display: "inline-block",
            padding: "10px 14px",
            textDecoration: "none",
            borderRadius: 8,
            background: "#111",
            color: "#fff",
          }}
        >
          Confirmar email
        </a>
      </p>

      <p style={{ margin: "16px 0 0", fontSize: 12, color: "#555" }}>
        Se você não criou uma conta, pode ignorar este email.
      </p>
    </div>
  );
}
