/**
 * Renders a fallback error page for server-side failures.
 * Designed to maintain the "Studio" aesthetic even when the app fails to boot.
 */
export function renderErrorPage(): string {
  return `<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8" />
    <title>Ops! Algo deu errado — Jhenifer Nogueira</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      :root {
        --bg: #0a0a0a;
        --text: #ffffff;
        --text-muted: rgba(255, 255, 255, 0.5);
        --accent: #c9a86a;
        --border: rgba(255, 255, 255, 0.1);
      }
      body {
        font-family: system-ui, -apple-system, sans-serif;
        background: var(--bg);
        color: var(--text);
        display: grid;
        place-items: center;
        min-height: 100vh;
        margin: 0;
        padding: 1.5rem;
        text-align: center;
      }
      .card {
        max-width: 32rem;
        width: 100%;
        padding: 3rem 2rem;
        border: 1px solid var(--border);
        border-radius: 24px;
        background: rgba(255, 255, 255, 0.02);
        backdrop-filter: blur(10px);
      }
      h1 {
        font-size: 1.75rem;
        font-weight: 600;
        margin: 0 0 1rem;
        letter-spacing: -0.02em;
      }
      p {
        color: var(--text-muted);
        font-size: 1rem;
        line-height: 1.6;
        margin: 0 0 2rem;
      }
      .actions {
        display: flex;
        gap: 1rem;
        justify-content: center;
        flex-wrap: wrap;
      }
      a, button {
        padding: 0.75rem 1.5rem;
        border-radius: 9999px;
        font: inherit;
        font-weight: 500;
        font-size: 0.875rem;
        cursor: pointer;
        text-decoration: none;
        border: 1px solid transparent;
        transition: all 0.3s ease;
      }
      .primary {
        background: var(--text);
        color: var(--bg);
      }
      .primary:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 20px -10px rgba(255,255,255,0.3);
      }
      .secondary {
        background: transparent;
        color: var(--text);
        border-color: var(--border);
      }
      .secondary:hover {
        background: rgba(255, 255, 255, 0.05);
        border-color: var(--text);
      }
    </style>
  </head>
  <body>
    <div class="card">
      <h1>Ops! Algo deu errado</h1>
      <p>Houve um problema ao carregar a página. Você pode tentar atualizar ou voltar para o início.</p>
      <div class="actions">
        <button class="primary" onclick="location.reload()">Tentar novamente</button>
        <a class="secondary" href="/">Voltar ao início</a>
      </div>
    </div>
  </body>
</html>`;
}
