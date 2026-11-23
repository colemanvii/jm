# Comparative critique — Phase 3

Judged against the brief's objectives (craft, point of view, intimacy, material, American character without costume, contemporary relevance, clarity of commerce) and against one practical fact: **there is no authorised photography yet.** Screenshots of every study at desktop, tablet and phone are in `/screenshots`.

---

## A — The Portrait

**The idea.** A monograph. A frontispiece portrait faces a title page set in Libre Caslon capitals; four chapters follow (Maker, Hands, Hats, Commission), each opened by a roman numeral. The hats are presented like a catalogue raisonné: plate, number, name, materials, price.

**What works**
- The first screen answers who, what and where in about two seconds: *Joseph Martin, Hatmaker, Nashville, Tennessee*, plus one sentence. It's calm and legible, and the two paths (hats, commission) are visible.
- Caslon has a real reason to be here: the face that printed the Declaration of Independence gives American lineage without a single Western motif.
- The commission chapter on near-black is the most persuasive piece of selling across the three studies: the price, time and place set as a short table, then four steps.
- The phone layout is composed rather than shrunk: the title moves above the portrait so name and face share the first screen.

**What doesn't**
- **It depends entirely on portraiture that doesn't exist.** With placeholders the page becomes a long run of grey plates. Even with great photography, this is the structure most likely to resemble other heritage brands, because the centred title page is a familiar luxury move.
- The centred, symmetrical title page is dignified but predictable. It lacks tension.
- Product entries alternate left and right at the same rhythm four times; by the third, it's monotonous. (Partly fixed: plates now carry a felt tint and swatch so each entry has its own character.)
- The "Contents" overlay is a pleasing book idea, but it adds a click for anyone who just wants to shop.

**Verdict.** The most conventional of the three, and the most hostage to a photoshoot. Its typography and commission chapter are worth keeping.

---

## B — The Object

**The idea.** The hat is the subject and **the felt is the colour system**. The page opens on a full field of whiskey felt with a fine-line anatomy drawing (crown, crease, pinch, band, brim, brim edge). Choosing a felt (Natural, Granite, Whiskey, Pecan) re-colours the whole field and swaps in the matching hat: Ahab, Artemis, Oris, Cerelia, with price and order link. Below sit four tall felt columns that widen on hover, an "Anatomy" grid that ties each part of a hat to where it appears in Joseph's real hats, and a black commission block: *Any colour. Any shape. $1,395.*

**What works**
- **The most distinctive and ownable idea of the three.** The colours aren't a brand palette picked from the air; they're Joseph's actual felts, named as he names them. The system grows each time he adds a felt.
- It needs the least photography to look finished. The drawing and colour fields carry the composition now, and the system is designed so the hero photograph (shot O1) drops in under the same annotations.
- The Anatomy section does what the brief asks: it shows craft through specifics (twine wrapped twice, partial binding, script embroidery) instead of adjectives.
- Commerce is the clearest of the three. Name, felt, size, price and an Order button are on the first screen; the commission price is the biggest type on the page.
- Measured: Lighthouse mobile Performance 100, LCP 1.2 s, CLS 0.

**What doesn't**
- **The person is almost missing.** It explains the hat beautifully but says little about the man who makes it. Intimacy, objective 3, is the weakest here.
- The anatomy drawing is a generic study. It is honest about that, but it's a little stiff (the crown is boxy) and should be redrawn from one of Joseph's actual hats.
- Archivo condensed caps at poster size could tip into streetwear if pushed further. The weight must stay in proportion to the delicacy of the work.
- The statement section after the hero has too much empty space before the felt columns. Tighten it in refinement.

**Verdict.** The strongest proposition, and the one most likely to be remembered tomorrow. It needs a human layer.

---

## C — The Living Archive

**The idea.** The workshop as an evolving archive. A ledger masthead (address, entry count, how many entries are "still to photograph", date updated) sits above a dense, asymmetric grid of 25 entries: hats with prices, felt and band swatches, charm drawings, shop-policy quotes, open interview questions, process and people placeholders. Each has an accession number (JM·H·003, JM·M·007…). Filters (Hats, Materials, Process, People, Notes) use view transitions; every entry opens a detail view with metadata and, for hats, an order link.

**What works**
- **The most alive and the most honest.** It turns missing content into part of the design: "Open question: What does the stitching mean?" and "To photograph" entries make the archive visibly in progress, which is true.
- **The best long-term editorial system.** New stories, materials, customers and collaborations are simply new entries; nothing has to be redesigned. It answers brief §20 directly.
- Newsreader with DM Mono reads as a working notebook: precise without feeling corporate.
- The phone version, a two-across contact sheet, may be the best phone experience of the three.

**What doesn't**
- On desktop the grid can read as a mood board. It is dense, and until real photographs replace the grey frames, the eye has nowhere to rest.
- The hats share space with swatches and notes, so the work, the point of the site, competes with its own context. A first-time buyer has to work harder.
- Accession numbers and ledger counts could become a mannerism if they spread to every page.

**Verdict.** The richest system and the best future Journal or Workshop section, but not the strongest front door.

---

## Recommendation

**Lead with B (The Object), and build C (The Living Archive) as the site's second layer.** Carry A's commission chapter and its long-form typography into the Maker page.

Why:
1. B is the only study that is distinctive *today*, before photography, and gets better with it. It's built from Joseph's real materials, so nobody else could own it.
2. C fixes B's weakness (no person, no process, no life) without diluting the homepage. The felts, bands and charms in B's anatomy are the same records as C's materials, so the two share one data model.
3. A's best parts move: the commission chapter on black, and a portrait-led Maker page once the portraits exist.

Resulting structure (5 sections, only if the content supports them):
- **Hats**: B's felt-led product system.
- **Workshop**: C's archive (materials, process, tools, people, notes).
- **Maker**: A's typography with M1–M3 portraits and Joseph's own words.
- **Commission**: one page (price, time, process, waitlist).
- **Journal**: deferred until there are three real stories. The Workshop archive covers this role at launch.

**This is a recommendation, not a decision.** All three studies are kept intact for review.

## Fixed in this pass
- C: led with a hat instead of an empty frame, so the first screen has colour and content on both desktop and phone; ended on a full-width closing frame; fixed metadata spacing; the detail view now keeps each entry's styling.
- B: fixed a 17 px horizontal overflow on phone (an SVG widening the grid track, and the default `fieldset` min-width); re-anchored callouts so no label is cropped on small screens.
- A: tinted product plates with their felt and added a swatch, so the four entries no longer read identically.
- All: raised small-text contrast, enlarged footer touch targets, replaced Newsreader's optical-size font (132 KB) with the weight-only cut (58 KB), which brought C's mobile LCP from 2.6 s to 1.7 s, and added favicons to remove 404s.

## Measured results (Lighthouse 12, simulated mobile, local static server, two runs each)

| Study | Performance | Accessibility | Best practices | SEO | LCP | CLS | TBT |
|---|---|---|---|---|---|---|---|
| A | 100 | 100 | 100 | 60* | 1.7 s | 0–0.003 | 0 ms |
| B | 100 | 100 | 100 | 60* | 1.2 s | 0 | 0 ms |
| C | 99–100 | 100 | 100 | 60* | 1.7 s | 0–0.003 | 0 ms |

\*SEO fails only `is-crawlable`, because the studies carry `noindex` on purpose so they can't be mistaken for the real site in search. Every other SEO audit passes. These are lab numbers from a local server, not field data from a real iPhone on a real network; INP can't be measured in a lab run.
