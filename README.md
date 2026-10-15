# Atikur Rahman — Portfolio

Personal portfolio built with Next.js 15 (App Router), TypeScript and Tailwind CSS.
Fully static, no database, no backend service to run.

---

## Running locally

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

| Script              | What it does                                      |
| ------------------- | ------------------------------------------------- |
| `npm run dev`       | Development server with hot reload                 |
| `npm run build`     | Production build (this is what Vercel runs)        |
| `npm start`         | Serve a production build locally                   |
| `npm run lint`      | ESLint                                             |
| `npm run typecheck` | TypeScript, no emit                                |

`npm run build` runs ESLint and TypeScript as part of the build and **fails the
build on any error**. Run it before pushing — a lint error that is only a warning
in your editor will stop a Vercel deploy.

---

## Theming

The site ships both a dark and a light theme. Visitors pick Light, Dark, or
System from the control in the navbar; System keeps following the OS setting
for as long as it stays selected. The choice is stored in `localStorage` under
the key `theme` and is shared across open tabs.

**How it fits together**

| File                            | Role                                                        |
| ------------------------------- | ----------------------------------------------------------- |
| `app/globals.css`               | The two palettes, as CSS variables                           |
| `tailwind.config.ts`            | Maps Tailwind colour names onto those variables              |
| `lib/theme.ts`                  | Shared constants + the pre-paint bootstrap script            |
| `components/ThemeProvider.tsx`  | React state, OS tracking, cross-tab sync                     |
| `components/ui/ThemeToggle.tsx` | The navbar control                                           |

Dark is the default on `:root`, and `.light` on `<html>` swaps the palette. A
small blocking script in `<head>` sets that class **before the first paint**, so
there is no flash of the wrong theme on load. If JavaScript is disabled the
site stays dark, which is how it looked before light mode existed.

### Adding or changing colours

Never hard-code a colour in a component. Add a variable to **both** blocks in
`app/globals.css` (`:root` for dark, `:root.light` for light), expose it in
`tailwind.config.ts`, then use the Tailwind class.

The available tokens:

| Token                                           | Use                                     |
| ----------------------------------------------- | --------------------------------------- |
| `canvas`, `canvas-soft`                          | Page background                         |
| `surface`, `surface-raised`, `surface-hover`     | Cards and panels                        |
| `surface-subtle`, `surface-muted`, `surface-strong` | Faint washes: icon chips, inputs     |
| `line`, `line-strong`                            | Borders and hairlines                   |
| `ink`, `ink-muted`, `ink-faint`                  | Text                                    |
| `accent-blue`, `accent-violet`, `accent-soft`    | Brand accent                            |
| `cta`, `cta-fg`                                  | Filled high-emphasis buttons            |
| `tone-success`, `tone-warning`, `tone-info`, `tone-special` | Status and signal colours    |

Two things to watch for:

- **Do not name a colour after an existing utility.** A colour called `base`
  makes Tailwind emit `.text-base` twice — once as the 1rem font size, once as
  a colour — and whichever lands later in the stylesheet silently wins. The
  page background is called `canvas` for exactly this reason, and the CTA
  shadow is `shadow-cta-lift` rather than `shadow-cta`.
- **Check contrast in both themes.** Several palette shades that are legible on
  a dark card are not on a white one: `emerald-400` measures 10:1 on `#0D0D0D`
  and 1.8:1 on white. The `tone-*` tokens exist so signal colours shift to a
  darker shade in light mode. Every text token in both themes clears WCAG AA
  (4.5:1); the measured ratios are in the comments in `app/globals.css`.

`app/opengraph-image.tsx` and `app/apple-icon.tsx` are deliberately exempt —
they are rendered to static PNGs at build time, where CSS variables do not
exist and there is no viewer theme to resolve.

---

## Deploying to Vercel (free tier)

The site is static with ISR; it needs no environment variables to build and no
paid features.

### 1. Push to GitHub

```bash
git add -A
git commit -m "Add light and dark theme system"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

### 2. Import the project

1. Go to <https://vercel.com/new> and sign in with GitHub.
2. Pick the repository and click **Import**.
3. Leave every build setting at its default — Vercel detects Next.js and uses
   `npm run build` with the right output directory on its own.
4. Click **Deploy**.

### 3. Set the canonical URL

Once the first deploy finishes you will have a real URL. Add it so that
metadata, Open Graph tags, `sitemap.xml` and `robots.txt` point at the right
place instead of the fallback in `lib/site.ts`:

**Project → Settings → Environment Variables**

| Name                   | Value                             | Environments |
| ---------------------- | --------------------------------- | ------------ |
| `NEXT_PUBLIC_SITE_URL` | `https://your-domain.vercel.app`  | All          |

No trailing slash. Redeploy afterwards — environment variables are baked in at
build time, so an existing deployment will not pick it up.

### Optional: a GitHub token

The GitHub section calls the public GitHub API, which allows 60 requests per
hour per IP. That is plenty, and every call fails soft: if GitHub is slow,
rate-limited or down, the section falls back to the repositories listed in
`data/projects.ts` and simply stops showing as live.

If you do hit limits, add a fine-grained token with **read-only access to
public repositories**:

| Name           | Value         | Environments |
| -------------- | ------------- | ------------ |
| `GITHUB_TOKEN` | `github_pat_…`| All          |

Server-side only — never prefix it with `NEXT_PUBLIC_`, which would ship it to
the browser.

### Custom domain

**Project → Settings → Domains → Add**, then point your registrar at the DNS
records Vercel shows. Update `NEXT_PUBLIC_SITE_URL` to match and redeploy.

### After deploying

- Both themes load without a flash, including on a hard refresh.
- The System option follows your OS appearance setting.
- `https://your-domain/sitemap.xml` and `/robots.txt` show the right host.
- `https://your-domain/opengraph-image` renders the share card.

---

## Project layout

```
app/              Routes, layout, metadata, generated icons and OG image
components/
  sections/       One component per page section
  ui/             Shared primitives (Button, Badge, Section, ThemeToggle…)
data/             All content: profile, projects, experience, skills
lib/              Site config, theme constants, GitHub/Codeforces clients
public/           Images, resume PDF, favicon
```

Content lives in `data/`, not in components — editing your experience, projects
or skills means changing a data file, not JSX.

---

## Notes

- Fonts (Inter, JetBrains Mono) are bundled in `app/fonts` and served from your
  own origin, so there is no third-party request on load and no layout shift.
- The contact form has no backend. It composes a `mailto:` link and hands it to
  the visitor's mail client, so nothing is sent anywhere without them seeing it.
- `.claude/launch.json` just tells Claude Code how to start the dev server. It
  is safe to delete if you do not use it.
