/// <reference lib="dom" />
/// <reference lib="deno.ns" />

Deno.serve((req: Request) => {
  const url = new URL(req.url);
  const path = url.pathname;

  // Simple router
  if (path === "/" || path === "/index.html") {
    return new Response(HTML, {
      headers: { "content-type": "text/html; charset=utf-8" },
    });
  }

  // API endpoint example
  if (path === "/api/info") {
    return Response.json({
      name: "Agent Studio",
      version: "0.1.0",
      platform: Deno.build.os,
      arch: Deno.build.arch,
      denoVersion: Deno.version.deno,
      v8Version: Deno.version.v8,
    });
  }

  // 404
  return new Response("Not Found", { status: 404 });
});

// ─── HTML template ───────────────────────────────────────────────────────────

const HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Agent Studio</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
      color: #e2e8f0;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 2rem;
    }
    .container {
      max-width: 640px;
      width: 100%;
      text-align: center;
    }
    h1 {
      font-size: 2.5rem;
      font-weight: 700;
      background: linear-gradient(to right, #38bdf8, #818cf8);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin-bottom: 0.5rem;
    }
    .subtitle {
      font-size: 1.1rem;
      color: #94a3b8;
      margin-bottom: 2rem;
    }
    .card {
      background: rgba(30, 41, 59, 0.8);
      border: 1px solid rgba(148, 163, 184, 0.15);
      border-radius: 12px;
      padding: 1.5rem;
      margin: 1rem 0;
      text-align: left;
      backdrop-filter: blur(8px);
    }
    .card h2 {
      font-size: 1rem;
      font-weight: 600;
      color: #38bdf8;
      margin-bottom: 0.75rem;
    }
    .info-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0.5rem;
    }
    .info-item {
      display: flex;
      flex-direction: column;
      gap: 0.15rem;
    }
    .info-label {
      font-size: 0.75rem;
      color: #64748b;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .info-value {
      font-size: 0.9rem;
      color: #e2e8f0;
      font-family: "SF Mono", "Fira Code", monospace;
    }
    .badge {
      display: inline-block;
      background: rgba(56, 189, 248, 0.15);
      color: #38bdf8;
      border: 1px solid rgba(56, 189, 248, 0.3);
      border-radius: 20px;
      padding: 0.25rem 0.75rem;
      font-size: 0.8rem;
      margin-bottom: 1rem;
    }
    .footer {
      margin-top: 2rem;
      font-size: 0.8rem;
      color: #475569;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="badge">Deno Desktop</div>
    <h1>Agent Studio</h1>
    <p class="subtitle">A Deno Desktop application running on the webview backend</p>

    <div class="card" id="info-card">
      <h2>System Info</h2>
      <div class="info-grid">
        <div class="info-item">
          <span class="info-label">Platform</span>
          <span class="info-value" id="platform">—</span>
        </div>
        <div class="info-item">
          <span class="info-label">Architecture</span>
          <span class="info-value" id="arch">—</span>
        </div>
        <div class="info-item">
          <span class="info-label">Deno Version</span>
          <span class="info-value" id="deno-version">—</span>
        </div>
        <div class="info-item">
          <span class="info-label">V8 Version</span>
          <span class="info-value" id="v8-version">—</span>
        </div>
      </div>
    </div>

    <div class="footer">
      <p>Agent Studio v0.1.0 &middot; Built with Deno Desktop</p>
    </div>
  </div>

  <script>
    // Fetch system info from the backend via API
    fetch('/api/info')
      .then(res => res.json())
      .then(data => {
        document.getElementById('platform').textContent = data.platform;
        document.getElementById('arch').textContent = data.arch;
        document.getElementById('deno-version').textContent = data.denoVersion;
        document.getElementById('v8-version').textContent = data.v8Version;
      })
      .catch(err => {
        console.error('Failed to fetch system info:', err);
      });
  </script>
</body>
</html>`;
