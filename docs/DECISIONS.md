# Design decisions log

Reversible decisions taken during Phases 1–3, with reasons. Anything irreversible waits for approval.

| # | Decision | Why | Reversible? |
|---|---|---|---|
| 1 | Work on a dedicated branch; `main` untouched | Brief §5, §23 | Yes |
| 2 | Study 001 moved unchanged to `studies/001/` | Preserve prior work; free the root for a studies index | Yes (git history) |
| 3 | No stock photography anywhere; labelled placeholder frames with written shot briefs instead | Stock captioned as hat studies misrepresents the work (§10) | — |
| 4 | Plain static HTML/CSS with a little vanilla JS per study; no framework, no build step | Studies must be fast, inspectable and disposable. A framework should be chosen at Phase 5 against real needs (see README) | Yes |
| 5 | Self-hosted OFL fonts (Fontsource builds) with licences in `assets/fonts/` | Licensing clarity, no third-party requests, performance | Yes |
| 6 | Product data copied from public listings and **linked to the live Shopify product pages** rather than rebuilding a cart | §13, §17: never invent checkout; keep the real commerce path | Yes |
| 7 | AHAB price shown as "to confirm", not either listed number | The listings conflict; showing one would state an unverified fact | Yes |
| 8 | Felt colours are estimates, labelled as such | No physical samples or calibrated photos yet | Yes |
| 9 | `noindex` on all studies | Public repo/preview must not compete with or be confused for josephbenmartin.com | Yes |
| 10 | B's drawing is a generic western hat, captioned as such | A drawing of a specific product would claim knowledge of its exact shape | Yes |
| 11 | C's charm drawings are drawn from text descriptions and labelled "drawing, not a photograph" | Same reason | Yes |
| 12 | No customer, celebrity or press-client names | None are verified or cleared (§2, §10) | — |
| 13 | Reduced motion: every animation and transition is disabled under `prefers-reduced-motion` | §15, §18 | Yes |
| 14 | No scroll hijacking, parallax or loading screens; motion limited to reveals, line drawing, colour cross-fade, view transitions | §15 | Yes |
| 15 | Newsreader weight-only cut instead of optical-size cut in C | 74 KB saved; mobile LCP 2.6 s → 1.7 s. Optical sizing can return with subsetting | Yes |
| 16 | Recommend B + C (see CRITIQUE.md); **not adopted** pending approval | §22: request approval before choosing direction | — |

## Typography studied

| Face | Character | Why considered | Where |
|---|---|---|---|
| Libre Caslon Display / Text | Old-style, high contrast in display | American printing lineage (Caslon types printed the Declaration of Independence) | A, wordmark 01–02, 06 |
| Archivo (variable width) | Grotesk, 62–125% width | One family covers condensed poster names and expanded labels: the B system in a single file | B, wordmark 03–04 |
| Newsreader | Contemporary text serif designed for reading on screens | Warm, literary, excellent italic | C, wordmark 05 |
| DM Mono | Low-contrast monospace | Archival metadata, accession numbers | C |
| Inter Tight | Neutral grotesk, tight spacing | Small UI labels under Caslon | A |

Rejected for now: Cormorant (too fashionable, weak at text sizes), Fraunces (too soft and trend-associated), Playfair (luxury cliché).
