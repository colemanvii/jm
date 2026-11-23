# Discovery report

*Phase 1 · November 2026 · concise by design*

## 1. Limits of this audit (read first)

- **josephbenmartin.com could not be opened from the working environment.** The network policy refused the connection, as it did for the NewsChannel 5 page. Everything below about the live site comes from **search-engine index snippets of its pages**, not from looking at the site itself.
- As a result, the following have **not** been audited and must be before Phase 4: the current wordmark and logo, the photography, page layouts, the navigation as built, mobile behaviour, checkout flow, page speed, and on-page SEO.
- To fix this, allow `josephbenmartin.com` (and ideally `instagram.com`) in the environment's network settings, or supply a full-page export or screenshots.

## 2. Verified facts and their sources

Confidence: **High** = the business's own pages (via the search index). **Medium** = third-party coverage or a profile. **Low** = an inference.

| Fact | Source | Confidence |
|---|---|---|
| Business: Joseph Martin, hatmaker, Nashville TN (indexed page title "Joseph Martin Hatmaker Nashville, TN") | josephbenmartin.com | High |
| Address: 1200 Villa Place, Suite 200, Nashville, TN 37212 (some third-party listings say "12000", which looks like a typo) | /pages/contact, NewsChannel 5 | High |
| Specialty: traditional western styles and dress fedoras | site description via search | High |
| Commissions currently taken from a **waitlist**, "due to the bespoke nature of the craft and high demand" | /pages/contact | High |
| Policy: "all items are handmade start to finish in our nashville shop with a 6-8 week turnaround time" | product pages | High |
| Ready-to-wear ships immediately; made-to-order ships in 6–8 weeks | site | High |
| **Custom Felt Hat — $1,395**, all-inclusive (any colour, shape, style, design), about 4–6 weeks; consultation remote or in person | /products/custom-felt-hat-1 | High |
| **Custom Straw Hat — $595–$1,150** | /products/custom-straw-hat | High |
| **AHAB**: natural dress-weight felt, two-tone ribbons, indigo denim band accent, gold sailboat charm. **Price conflict: $1,675 on the product page, $1,395 on the collection page** | /products/ahab | High (price unresolved) |
| **ARTEMIS**: dress-weight fur felt, granite, two-tone bow and keeper, double-wrap twine band, gold moon charms, $1,625 (one listing in size 7 ⅜; a second URL, /products/aurora, carries the same title) | /products/artemis | High |
| **ORIS**: fur felt, whiskey, size 7 ½, turkey feather, beaded adornment with gold leaf charm, partial brim binding, $1,625 | /products/hb | High |
| **CERELIA**: western-weight fur felt, pecan, rust suede accent band, floral and script embroidery, gold flower charm, about 4–6 weeks, $1,795 | /products/primavera | High |
| Another product exists, titled "CECH" (/products/czech); its details were not captured | search index | High (title only) |
| There is a story page, "Fourth Time's a Charm" | /pages/fourth-times-a-charm | High |
| TV feature: NewsChannel 5 *Talk of the Town*, introduced by stylist Emily Goodin, on custom one-of-a-kind hats and "the meaning behind his custom stitching" | newschannel5.com | Medium |
| Social accounts: Instagram and TikTok @josephbenmartin | NewsChannel 5, TikTok index | Medium |
| LinkedIn lists him as owner and Creative Director; he mentions writing on Substack about the move and choosing Nashville | LinkedIn snippet | Medium |
| A podcast episode describes a move from investment banking into hatmaking | podcast listing snippet | **Low — do not publish; confirm with Joseph** |
| Commerce platform is Shopify | inferred from `/products/`, `/collections/` and `/pages/` URLs and shop.app listings | Low–Medium |

**Not to be used:** a TikTok hashtag mentions a well-known musician. Nothing confirms a client relationship, so no customer or celebrity names appear anywhere in the studies.

## 3. What must survive the redesign

- Every live product URL (`/products/*`) and collection (`/collections/made-to-order`, `/collections/all`). The studies link to these rather than copying checkout.
- `/pages/contact` (the waitlist path), `/pages/sizing`, and `/pages/fourth-times-a-charm`.
- The three ways to buy: **ready-to-wear** (in stock, ships now), **made to order** (named designs, 6–8 weeks), and **custom** (from $595 straw or $1,395 felt).
- Shopify as the commerce backend, unless Joseph decides otherwise. Any new front end has to keep cart and checkout on Shopify.

## 4. Inconsistencies found

1. AHAB's price differs between pages ($1,675 vs $1,395).
2. Turnaround is quoted three ways: 6–8 weeks (policy), about 4–6 weeks (custom felt, Cerelia), and "ships immediately" (ready-to-wear). The new site needs one clear statement for each type of hat.
3. A duplicate ARTEMIS listing (/artemis and /aurora). It could be an intentional size variant or a leftover.
4. Product handles don't match product names (`hb` → ORIS, `primavera` → CERELIA, `czech` → CECH). This hurts search and link legibility; renaming needs 301 redirects.

## 5. The repository as found

- `colemanvii/jm` (public) held one commit: `index.html`, "Study 001". It is a single self-contained page with system fonts (Georgia/Arial), a gradient over a full-bleed hero, and **Unsplash stock images captioned "Hat study" and "Study in form / 001"**.
- Assessment: the hierarchy is sensible (hero → maker → work → commission), but the page has no real content. More seriously, generic stock photos captioned as hat studies could be **mistaken for Joseph's work**, which the brief rules out. The sans/serif pairing is the browser default. The giant `nowrap` headline depends on a mobile override to avoid overflow.
- Action: Study 001 is kept unchanged at `studies/001/` for reference. None of its stock imagery is reused.

## 6. Assets

**Available now:** public product facts (above), product URLs, the address, the policy text, the existence of the story page and the press feature.

**Not available:** any authorised photograph, the current logo or wordmark files, Joseph's own words, biography, process details, materials suppliers, customer permissions. → See [PHOTOGRAPHY.md](PHOTOGRAPHY.md) and [CONTENT.md](CONTENT.md).
