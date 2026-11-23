# Joseph Martin — Reimagined

Working studies for a new digital home for **Joseph Martin, independent hatmaker, Nashville**.
Creative direction: Tangerine. **This is not the live site.** Nothing here changes josephbenmartin.com or its Shopify store.

## Status

Phases 1–3 (discovery, three concept studies, comparative critique) are done. **The next step needs a decision: which direction to develop.** See [docs/CRITIQUE.md](docs/CRITIQUE.md).

| Study | Path | Idea |
|---|---|---|
| A — The Portrait | `studies/a-portrait/` | The maker first: frontispiece portrait facing a title page; chapters |
| B — The Object | `studies/b-object/` | The hat first: felt as colour system, anatomy as graphic language |
| C — The Living Archive | `studies/c-archive/` | The workshop first: a filterable archive of hats, materials, process, people, notes |
| Wordmark | `studies/wordmark/` | Six typographic directions on screen, label, lining and card |
| Study 001 | `studies/001/` | The original first study, unchanged |

## Run locally

No build step and no dependencies. Serve the repository root with any static server:

```sh
npx serve .            # or: python3 -m http.server 8000
```

Then open `http://localhost:3000/` (or `:8000`). Opening the HTML files directly also works.

## Test

Requires Playwright (a local or global install is fine).

```sh
node tools/render.mjs          # screenshots at 1440×900, 834×1112 and iPhone 13; fails on horizontal overflow or console errors
node tools/interact.mjs        # exercises the contents menu (A), felt switcher (B), filters and detail view (C)
```

Screenshots are written to `screenshots/`. Lighthouse results are recorded in `docs/CRITIQUE.md`.

## Repository layout

```
index.html              studies index
studies/                one self-contained page per study
assets/fonts/           self-hosted woff2 (SIL OFL) + licence files
docs/
  DISCOVERY.md          audit of the current site, verified facts, limitations
  REFERENCES.md         13 references and the principles taken from them
  CRITIQUE.md           comparative critique, recommendation, measured results
  DECISIONS.md          design decision log and typography notes
  PHOTOGRAPHY.md        photography standards and full shot list
  CONTENT.md            facts to confirm, interview questions, copy needed
tools/                  render + interaction test scripts
screenshots/            rendered studies (desktop, tablet, phone)
```

## Ground rules (from the brief)

- **No invented facts.** Product details are a November 2026 snapshot of public listings on josephbenmartin.com and link back to the live product pages. Conflicts are marked "to confirm".
- **No stock imagery** standing in for Joseph, his shop, his customers or his hats. Every image slot is a labelled placeholder with a shot brief.
- **No invented quotes or biography.** Gaps are labelled; interview questions are in `docs/CONTENT.md`.
- This repository is **public**: no client documents, private messages, unpublished photography or credentials.

## Implementation notes (for Phase 5)

- **Commerce:** Shopify appears to be the backend (inferred from URL structure; confirm). Keep cart and checkout on Shopify. Two clean options:
  1. A custom **Shopify theme** (Liquid) built from the chosen study. The simplest to operate, with no extra hosting.
  2. A static or Astro front end using the **Shopify Storefront API** for products and cart, handing off to Shopify checkout. Choose this only if the archive and editorial system outgrow what a theme can do comfortably.
  Recommendation: start with option 1 unless the Living Archive becomes central, then reassess.
- **Images:** responsive `srcset` (AVIF/WebP), explicit dimensions to protect CLS, `fetchpriority="high"` on the first-screen image only.
- **SEO at launch:** remove `noindex`; add `Product` and `LocalBusiness` structured data from real data, Open Graph images from real photography, and 301 redirects if product handles are renamed (e.g. `hb` → `oris`).
- **Accessibility:** keep the current baseline: skip links, visible focus, native `<dialog>`, `aria-pressed` filters, radio-group felt selector, reduced-motion support.
