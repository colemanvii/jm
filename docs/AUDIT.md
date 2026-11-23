# Audit: the current public site against Studies F and F.1

*23 November 2026 · pricing, product categories, navigation, customer paths, photography and brand assets*

## How this was done, and its limits (read first)

- **josephbenmartin.com, shop.app and instagram.com are all blocked from this working environment.** Direct requests are refused by the network policy, through both the command line and the fetch tool. Nothing on this page comes from looking at the live site.
- The evidence is **search-engine index results** (web search, 23 Nov 2026), which return page titles, URLs and machine-written summaries of indexed pages. These can be stale, can merge two pages, and can misread a price. Every row below carries a confidence level:
  - **High:** the same fact appears in the business's own page title or URL and in more than one result.
  - **Medium:** one indexed summary of the business's own page.
  - **Low:** inferred, ambiguous or third-party.
- To replace this with a real audit, allow **josephbenmartin.com**, **cdn.shopify.com** and **shop.app** in the environment's network settings (Allowed domains), or supply a full-page export. Every **Medium** and **Low** row should then be rechecked.

## 1. Pages and navigation found

| URL | What it is | Confidence | In Study F? |
|---|---|---|---|
| `/` | Home: "custom hatmaker specializing in traditional western styles and dress fedoras"; says made-to-order ships in 6–8 weeks | High | Yes, as facts |
| `/collections/all` | All products (hats, caps, tees) | High | Linked as "Shop" |
| `/collections/made-to-order` | Made-to-order hats | High | Not linked |
| `/collections/caps` | **Caps** | High | **Missing** |
| `/collections` | Collections index | High | No |
| `/pages/meet-joseph` | **"About Joseph"** | High (title in index) | **Missing.** F built its own maker page and linked only the story |
| `/pages/fourth-times-a-charm` | The story | High | Yes |
| `/pages/contact` | Contact; "operating from a waitlist" | High | Yes |
| `/pages/sizing` | How to measure; "the hat will be made from the measurements you provide"; shipping note gives 4–6 weeks | Medium | Yes (link only) |

**The current site's own labels are "About Joseph", "Made to Order", "Caps" and "Sizing".** Study F renamed the first two ("The maker", "Hats" with no sub-division). F.1 uses **About Joseph** and adds **Caps & tees** to the main navigation.

## 2. Product categories

The current shop sells five kinds of thing. Study F showed three.

| Category | Examples | Study F | F.1 |
|---|---|---|---|
| Ready-to-wear hats | AHAB (listed "ready to wear") | Treated AHAB as made to order: **wrong** | Corrected, marked * |
| Made-to-order hats | ARTEMIS, CERELIA, WOODROW, CECH, RALPH | Four hats only | Seven named designs (four drawn, three listed as text) |
| Custom | Custom Felt Hat, Custom Straw Hat | Yes | Yes |
| **Caps** | Cowboy George Foam Trucker, JM Hatmaker, JM Cord, JM Resort, Tiger Camo, JM Wildflower Cord Cap | **Missing** | Added |
| **Tees** | Cowboy George Tee, Tres Banditos Tee | **Missing** | Added |

Also indexed: product pages with handles `one-garage-nashville-felt-hat` and `one-garage-nashville-straw-hat`, both titled "Custom Felt Hat" or "Custom Straw Hat". **Their purpose is unknown.** They may be an event, a partner or a private link. Nothing about them is shown or implied in any study; ask Joseph.

## 3. Pricing

| Product | Price found | Source / confidence | Notes |
|---|---|---|---|
| Custom Felt Hat | $1,395, "all-inclusive" | Product page · High | Described as a purchase "that places you in the queue" (see §5) |
| Custom Straw Hat | $595 on one listing, $1,150 on another | Two listings · High | F's "$595–$1,150" holds; it is two products, not a range |
| AHAB | **$1,675** (product page, "ready to wear"); $1,395 on an earlier collection snapshot | Medium | Still conflicting; F.1 shows $1,675* |
| ARTEMIS | $1,625; second listing `/aurora` is a single size 7 ⅜, tagged sale | Medium | F called `/aurora` "one listing in size 7 ⅜" without the sale |
| ORIS | $1,625, size 7 ½; "tonal ribbon" | Medium | F missed the tonal ribbon. A single size suggests ready-to-wear, but the category is not stated |
| CERELIA | $1,795 | High (from Phase 1) | Unchanged |
| WOODROW | $1,675, camel fur felt, size 6 ¾, made to order, 4–6 weeks | Medium | **New** to the studies |
| CECH | Turnaround 8–10 weeks; price not captured | Medium | F said "details not captured"; the turnaround is now known |
| RALPH | In the made-to-order collection; $950 or $1,825 (unclear which) | Low | **New**; do not show a price until confirmed |
| Caps | $45 each; JM Wildflower Cord Cap $245 | Medium | Trucker listing tagged sale |
| Tees | $45 each | Medium | |

## 4. Turnaround: four figures in circulation

| Figure | Where | Confidence |
|---|---|---|
| Ships immediately | Ready-to-wear | High |
| **4–6 weeks** | Custom felt, custom straw, ARTEMIS, WOODROW, CERELIA, the sizing page's shipping note | Medium–High |
| **6–8 weeks** | Homepage, for made to order; product policy line | High |
| **8–10 weeks** | CECH | Medium |

**Recommendation:** one figure per kind of hat, set by Joseph and stated in one place (the product page), with the homepage referring to it rather than repeating it. F.1 shows "4–6 weeks*" for custom, with all three figures disclosed in the note.

## 5. Customer paths

| Goal | Current site (as indexed) | Study F | Issue |
|---|---|---|---|
| Buy a hat now | Collection → product → Shopify checkout | Linked out to the product | OK |
| Order a named design | Product page with turnaround → checkout | Linked out | OK; turnaround varies by product |
| **Commission a custom hat** | **Two routes:** the Custom Felt Hat product ($1,395, "places you in the queue") *and* the contact page ("operating from a waitlist") | Pointed only to the contact page | **Conflict.** Is buying the product the way onto the waitlist, or is the waitlist a separate step? This must be one route. Ask Joseph. |
| Get sized remotely | Sizing page: measure at home, made from your measurements | Linked | OK. F's "Fit" step should cite this page, not "process to confirm" |
| Buy a cap or tee | `/collections/caps`, `/collections/all` | **No route** | Fixed in F.1 |
| Learn about Joseph | `/pages/meet-joseph` and `/pages/fourth-times-a-charm` | Own maker page; About Joseph never linked | F.1 labels it About Joseph; the content still needs his words |

## 6. Photography and existing brand assets

**Searched for:** product photography, portraits, the current logo or wordmark, packaging, labels, social imagery.

| Source | What is probably there | Reachable? | Used? |
|---|---|---|---|
| Shop product images (cdn.shopify.com) | Photographs of each hat, cap and tee | **No**, blocked | No |
| Instagram @josephbenmartin | Process, portraits, customers | **No**, blocked | No |
| TikTok @josephbenmartin | Video | Not tried (same policy) | No |
| NewsChannel 5 *Talk of the Town* | A video segment with Joseph | Blocked in Phase 1 | No |
| Facebook page | Unknown | Not tried | No |
| This repository | Four posters and drawings made for Joseph Martin; the Cowboy George line drawing; the Freeman eagle (another client) | Yes | Posters, drawings and George only |
| The Tangerine repository | No Joseph Martin assets (personal planning notes only; not used) | Yes | No |

**Result: no genuine photograph of Joseph, his shop or his hats is available to this work, and his current logo has still not been seen.** Nothing generic has been used in their place. Every photographic slot remains a labelled placeholder with a shot brief.

**This also limits the drawings.** Without photographs, no hat's crown, crease or brim can be drawn accurately, so F.1 draws only what each listing documents and marks the outline as unverified (see `docs/IDENTITY.md` §4).

**To unblock:** allow the three domains above, or ask Joseph for (1) the current logo files and who made them, (2) one product photograph per hat in profile, (3) a close-up photograph of each charm, (4) any existing portraits he likes, and (5) the label and liner currently used inside his hats. Item 5 is the single most useful thing for the identity work.
