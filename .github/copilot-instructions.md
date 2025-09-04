## Repo quick-start for AI coding agents

Purpose: make an AI coding agent immediately productive in this Expo + Supabase demo app by capturing the project shape, key files, run/debug workflows, and project-specific gotchas.

1) Big picture
- This is a small Expo React Native app (TypeScript). Entry: `App.tsx` which chooses between `Register` and `HomeScreen` based on Supabase auth.
- Supabase client lives under `src/lib/` (`supabase.ts`, `supabase-config.ts`). Auth state is observed in `App.tsx` (supabase.auth.onAuthStateChange) and profiles are upserted in `src/screens/Register.tsx`.
- UI is split into `src/screens/*` and reusable UI in `src/components/*` (e.g. `TileCard.tsx`, `Button.tsx`). Assets live in `assets/`.

2) Key files to read first
- `App.tsx` — app entry, theme toggle, auth listener.
- `src/lib/supabase.ts` and `src/lib/supabase-config.ts` — how supabase URL/ANON key are read and whether local Supabase is used (env var `USE_LOCAL_SUPABASE`).
- `src/screens/Register.tsx` — sign up / sign in flow; shows how upsert into `profiles` table is performed.
- `src/screens/HomeScreen.tsx`, `src/components/TileCard.tsx` — patterns for cards and how `image` props are passed.
- `package.json` — npm scripts for Expo and Supabase CLI (`npm run start`, `npm run supabase:start`, etc.).

3) Run / debug workflows (concrete)
- Start Expo dev server: `npm run start` (Windows PowerShell). Use `npm run android` / `npm run ios` / `npm run web` to open target.
- Local Supabase: `npm run supabase:start` / `npm run supabase:stop` / `npm run supabase:status` (these use the supabase CLI via npx). To force the app to use the local instance set `USE_LOCAL_SUPABASE=true` in the environment or update `src/lib/supabase-config.ts`.
- Environment config: Expo reads runtime values from `app.json` `extra` or `process.env`. The code falls back to placeholder strings if the values are missing — do not assume Supabase keys are present.

4) Project-specific patterns & gotchas
- Assets and Metro: image requires use the correct filename and extension. Example: the repo contains `assets/Books.jpg` (capital B). A `require('../../assets/books.png')` may produce Metro errors (unsupported file type). Use `require('../../assets/Books.jpg')` or replace the asset with a valid file.
- Supabase client creation intentionally avoids throwing when keys are missing; code uses console warnings. Tests or CI should set real keys.
- When registering a user, `Register.tsx` calls `supabase.auth.signUp(...)` then upserts into `profiles` with `supabase.from('profiles').upsert({ id: userId, email, name })`. This is the canonical pattern for creating profile rows in this app.
- UI conventions: small, self-contained screen files; `TileCard` expects `image` prop to be a `require(...)` result and renders it full-bleed inside `imageWrap`.

5) Integration points
- Supabase (auth + Postgres) — migrations live under `supabase/migrations/`.
- Expo — expects `app.json` extras for Supabase keys. See `src/lib/supabase.ts` for exact lookup order.

6) Testing / helper scripts
- Repo contains `test-auth-flow.js` and `test-profiles.js` — inspect to learn test expectations and sample API flows.

7) How to make safe edits (rules for an AI agent)
- Prefer minimal changes; respect existing component props and style shapes (e.g., `TileCard` width is `48%`).
- When touching Supabase config, do not commit secrets. If you add config, prefer `app.json` `extra` or CI secrets.
- If adding images, add matching require() calls and verify filename casing; prefer `.jpg`/`.png` that Metro supports.

8) Useful snippets from repo
- Use local supabase: set environment variable `USE_LOCAL_SUPABASE=true` before `expo start`.
- Example image require (used in `Register.tsx`):
  `source={require('../../assets/Books.jpg')}`
- Example profile upsert (Register):
  `await supabase.from('profiles').upsert({ id: userId, email, name })`

9) When you need more context
- Look at `app.json` for Expo extras. If Supabase errors appear in Metro, check `assets/` filenames and run `npm run supabase:status` to confirm local DB state.

If anything here is unclear or you want more/less detail (for example, stricter rules about editing migrations or a code style section), tell me what to include and I will iterate.
