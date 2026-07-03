# Agent Studio

A desktop application built with [Deno Desktop](https://docs.deno.com/runtime/desktop/).

## Prerequisites

- [Deno](https://deno.com/) v2.9.0 or later

## Development

### Run as web server (browser)

```bash
deno task dev
```

Open http://localhost:8000 in your browser.

### Run as desktop app

```bash
deno task desktop
```

### Run with Hot Module Replacement

```bash
deno task desktop:hmr
```

## Build

### macOS

```bash
# App bundle
deno task desktop:build

# DMG disk image
deno task desktop:build:dmg
```

### Cross-compile for Linux

```bash
deno task desktop:build:linux
```

### Cross-compile for Windows

```bash
deno task desktop:build:windows
```

By default the `webview` backend is used (uses the OS native webview for small
binary size). To use the embedded Chromium backend:

```bash
deno desktop --backend cef main.ts
```

## Configuration

See [`deno.json`](./deno.json) — the `desktop` block contains all desktop
settings:

| Field | Description |
|---|---|
| `app.name` | Display name (window title, menu bar, taskbar) |
| `app.identifier` | Reverse-DNS bundle ID (e.g. `com.example.app`) |
| `app.icons` | Per-platform icon paths |
| `app.deepLinks` | Custom URL schemes the app registers |
| `backend` | `"webview"` (default), `"cef"`, or `"raw"` |
| `output` | Per-platform output paths |
| `errorReporting.url` | Server for crash report submission |

## Project Structure

```
├── main.ts         # Entry point — Deno.serve() serves the UI
├── deno.json       # Project & desktop config
├── icons/          # App icons (placeholder)
├── dist/           # Desktop app build output
└── README.md
```
