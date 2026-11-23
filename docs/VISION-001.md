# Joseph Martin — Vision 001

*23 November 2026 · branch `vision-001` · creative-direction prototype, not a production migration*

A coherent, navigable prototype of the future Joseph Martin website, built from the approved **Study B: The Object** (see [CREATIVE_DIRECTION.md](CREATIVE_DIRECTION.md)). `main` is unchanged. The same content is presented inside the site at `/notes/`.

## The five experiences

| # | Page | Path | Job |
|---|---|---|---|
| 1 | Homepage | `/index.html` | Introduce the house: the drawing, the four felts, the maker, the club, the commission |
| 2 | Hats | `/hats/index.html` | The collection (four felts, four hats), the other made-to-order designs, anatomy, custom |
| 2b | Product page | `/hats/hat.html#oris` (also `ahab`, `artemis`, `cerelia`) | Study B’s hero unchanged, plus specification, details to photograph, ordering, the other felts |
| 3 | The Hatmaker | `/hatmaker/index.html` | Joseph’s record from verifiable sources, a labelled place for his own words, the shop, printed matter |
| 4 | Music City Driving Club | `/music-city-driving-club/index.html` | Capsule 001: the jacket as an annotated technical drawing, the patches, the sketchbook, photography briefs |
| 5 | Commission | `/commission/index.html` | The offer, the process, and a working prototype of the inquiry journey |
| — | Presentation notes | `/notes/index.html` | This document, in the site’s own design |

## Design decisions

1. **One typeface, three voices.** Archivo alone, as in Study B: the wide tracked wordmark, the condensed display for names and statements, a quiet regular for text. No second family, including for MCDC.
2. **The felt is the palette.** Whiskey, natural, granite, pecan, plus ivory and near-black. Each page opens on one field: whiskey (home, product), paper (collection), black (maker, commission).
3. **Study B’s hero is kept intact** on the product page (drawing, annotations, swatches, oversized name). Everything new sits below it.
4. **Technical drawing as the signature.** The annotated drawing describes the hat (home, product) and the jacket (MCDC). It appears only where it explains something.
5. **MCDC’s personality comes from its own drawing.** Paper `#EFDECB` and red ink `#970F0B` are sampled from the original Cowboy George drawing; other colour lives only in the embroidered patches. Header, grid, type and footer are the house’s, so the club reads as part of Joseph’s world, not a microsite.
6. **Honest gaps.** Photographs and Joseph’s own words are shown as quiet, labelled frames with the brief (IDs from `docs/PHOTOGRAPHY.md` on the studies branch). Nothing stock or synthetic.
7. **Four menu items:** Hats, The Hatmaker, Driving Club, Commission. Study B’s Anatomy moves inside Hats. On phones the menu opens as a full-width list in the page’s field.
8. **Motion only where it explains:** the drawing draws once, felts cross-fade, collection columns open on hover. All off under `prefers-reduced-motion`.

Changes from iteration 002 of MCDC: re-set in Archivo (Instrument Serif, DM Mono and Barlow dropped); the **proposed Freeman patch removed** because it is another client’s mark and not a confirmed partnership; the JM name tab moved to whiskey twill; the jacket given the same callout language as the hat.

## Sources and authentic material

| Material | Source | Used on |
|---|---|---|
| Portrait of Joseph in his workshop (`assets/jm/joseph-workshop-*.webp`) | Approved by the client, 23 Nov 2026; uncropped on desktop, 4:5 crop centred on Joseph for phones; no grading; metadata stripped, colour profile kept| The Hatmaker; homepage (4:5 crop) |
| Cowboy George, red ink, and white line version | Existing drawing for Joseph Martin (`assets/jm/`, `assets/mcdc/`) | Home, MCDC, George patch |
| Double Decker Arts Festival poster (Oxford, MS, April 26–27, 2024) | Existing Tangerine work for Joseph Martin | The Hatmaker |
| “Martin Survives!” / “Don’t Call It Luck!” posters (Collage Studio, Jackson) | Existing Tangerine work; quotation transcribed from the poster | The Hatmaker; “Fourth Time’s the Charm” patch |
| Study B drawing, anatomy plates, swatch control | Approved Study B | Home, Hats, product |
| Jacket flat and patch set | MCDC iteration 002 | MCDC |
| Product data | josephbenmartin.com listings via search-index snapshots, Nov 2026 | Hats, product, Commission |
| Address, waitlist, “handmade start to finish”, 6–8 weeks MTO, ready-to-wear ships immediately | josephbenmartin.com home and contact pages (indexed) | Throughout |
| “About Joseph” is a memoir of growing up in Mississippi | Indexed summary of `/pages/meet-joseph` (medium confidence) | The Hatmaker |

**Audit limit.** `josephbenmartin.com`, `cdn.shopify.com`, `instagram.com` and `newschannel5.com` are refused by this environment’s network policy (checked again 23 Nov 2026). No photograph from the live site was seen or used. To redo the audit properly, add those hosts under *Allowed domains* in the environment’s network settings, then recheck every row marked * below.

### Product data used, with confidence

| Hat | Shown | Confidence / note |
|---|---|---|
| ORIS (`/products/hb`) | Fur felt, whiskey, size 7 ½, tonal ribbon, made in Tennessee, $1,625 | Medium. Availability (ready-to-wear vs made to order) not stated → shown as *to confirm* |
| AHAB | Dress-weight felt, natural, 7 ⅜, ready to wear*, $1,675* | Price conflicts ($1,395 on an older collection listing) |
| ARTEMIS | Dress-weight fur felt, granite, made to order 4–6 weeks, $1,625 | Medium |
| CERELIA (`/products/primavera`) | Western-weight fur felt, pecan, 4–6 weeks, $1,795 | High |
| WOODROW | Camel fur felt, 6 ¾, 4–6 weeks, $1,675* | Medium |
| CECH, RALPH | Named only; CECH 8–10 weeks* | Low |
| Custom felt / straw | $1,395 all-inclusive / $595 or $1,150 (two listings) | High |

## Still required

- **Product photography:** each hat in profile on a matched ground (O1) so the annotations sit on the real hat; three-quarter, crown-down and detail macros (O2–O4).
- **The portrait at full resolution** (the supplied file is 1,124 px wide); a close portrait (M2); **shop photography** (H1–H5).
- **Calibrated felt swatches** (T1) to correct on-screen colours.
- **Joseph’s words:** biography (150–250 words), one line per hat, care notes, commission FAQ.
- **Current logo and label files**, and who made them.
- **MCDC drawings:** scans of the 20 Nov 2024 sheet; winged wheel, crossed flags and GO as line art. Drop them in `assets/mcdc/` with the names in `docs/MCDC.md` on the studies branch and set the keys in `assets/mcdc/manifest.json` to `true`; no code changes needed.
- **Jacket photography:** the flat from above, then worn.
- **Confirmations:** AHAB price and category; ORIS availability; WOODROW/CECH/RALPH details; one turnaround per kind of hat; how a commission joins the waitlist (inquiry vs buying the Custom Felt Hat listing); the handover step; whether shop fittings are by appointment.
- **Permission** to publish the Jackson/Oxford history and the shop address on a new site.

## Internal tracking (not shown on the site)

| Item | Status | Action |
|---|---|---|
| Photographer credit for the workshop portrait | **Unconfirmed.** No credit appears anywhere on the site. | Ask Joseph who took it and how they want to be credited; then add the credit to the Hatmaker caption and the Notes page |
| Full-resolution portrait file | Supplied file is 1,124 × 730 px | Request the photographer’s original |

## Prototype vs production

| Feature | Prototype (this branch) | Production would need |
|---|---|---|
| Pages, navigation, phone menu | Working static HTML/CSS/JS, no build | Shopify theme (Liquid) or Storefront-API front end |
| Felt switcher | Working; updates hat, colour, URL | Driven by Shopify products/variants |
| **Order** | Opens the hat’s listing on the **current** Shopify shop | Native cart and Shopify checkout; live inventory and sizes |
| Prices, sizes, availability | Hard-coded Nov 2026 snapshot (`assets/vision/hats.js`) | Live from Shopify; copy confirmed by Joseph |
| **Commission inquiry** | Full journey (branching, validation, review, confirmation); **sends and stores nothing** | Form backend or Shopify customer/draft order, email to Joseph, waitlist confirmation, spam protection, privacy notice |
| MCDC “Leave your name” | Same inquiry, nothing stored | A list only once something is announced |
| Jacket and patch explorer | Working | Add photographs and final patch specs |
| Indexing | `noindex` on every page | Remove; structured data; redirects for renamed handles |

## Test

No dependencies beyond a global Playwright.

```sh
node tools/vision/render.mjs     # desktop 1440×900 + iPhone 13, first screen + full page → screenshots/vision-001/
node tools/vision/interact.mjs   # 18 checks: phone menu, felt switcher, jacket, inquiry paths, internal links
```

Both pass on this branch: no console errors, no failed requests, no horizontal overflow at either size.
