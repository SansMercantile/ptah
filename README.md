# PTAH Frontend — Infrastructure Planning & Construction Intelligence

PTAH is Sans Mercantile's AI-driven construction and infrastructure intelligence
system: project control, safety/compliance auditing, materials budget
optimization, and a live view into its four operational subsystems (HAPI
logistics, HATHOR mining/supply, MAMI_WATA hydraulics, RA clean power).

## Stack

Single Node/Express server (`server.ts`) that runs Vite in middleware mode for
dev and serves the static build in production — one process, one port, no
separate frontend/backend split.

- React 19 + TypeScript, Vite 6, Tailwind CSS 4
- `motion` (Framer Motion) for page transitions
- `lucide-react` icons
- Google Gemini (`@google/genai`, model `gemini-3.5-flash`) for the AI features

## Local Development

**Prerequisites:** Node.js 20+

```bash
npm install
cp .env.example .env.local
# then set GEMINI_API_KEY in .env.local
npm run dev
```

The app runs on **http://localhost:3000** (server and frontend share one port).

Without `GEMINI_API_KEY` set, all three AI endpoints return a clearly-labeled
demo-mode response instead of failing — useful for UI work without a key.

## API Routes (server.ts)

- `POST /api/chat` — PTAH AI Co-Engineer chat, takes `{ prompt, history }`
- `POST /api/compliance` — safety/hazard audit, takes `{ scenario, systemModule }`,
  returns a scored JSON report (`score`, `severity`, `violations`, `corrections`)
- `POST /api/budget-optimize` — materials budget optimizer, takes `{ items }`,
  returns `{ optimizedItems, commentary }`

## Build & Run (production)

```bash
npm run build   # vite build + esbuild-bundles server.ts to dist/server.cjs
npm start        # node dist/server.cjs
```

## Project Structure

```
ptah/
├── server.ts              # Express app: API routes + Vite/static serving
├── src/
│   ├── App.tsx             # Landing <-> Console view switch
│   ├── components/
│   │   ├── LandingPage.tsx # Marketing/overview page
│   │   ├── ConsolePage.tsx # Main app: dashboard, chat, compliance, budget, subsystems
│   │   └── AnimatedEmoticon.tsx
│   ├── types.ts
│   └── index.css
├── public/logo.svg
└── vite.config.ts
```

## Known Issues

- Several Tailwind color classes used in `LandingPage.tsx`/`ConsolePage.tsx`
  reference non-existent shades (e.g. `slate-450`, `slate-505`, `slate-705`,
  `slate-805`, `slate-905`, `slate-940`, `slate-955`, `red-450`, `red-650`,
  `amber-955`, `emerald-550`). Tailwind only ships 50/100/.../900/950 — these
  silently apply no color. Needs a pass to replace with real shades.
