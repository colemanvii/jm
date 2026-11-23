# Identity sprint: three wordmarks, a recomposed opening, drawings v2, an edited archive

*23 November 2026 · branch `claude/happy-davinci-8paj81` · nothing here is approved, and nothing touches the live site*

| What | Where |
|---|---|
| The three directions, side by side | `/studies/identity/` (board) · `screenshots/identity/board-*` |
| Each direction on the website | `/studies/identity/site.html?d=thread`, `charm`, `george` · `screenshots/identity/site-*` |
| Study F.1, the recomposed opening and the rest | `/studies/f1-charm/` · `screenshots/identity/f1-*` |
| Pricing, categories, navigation, paths and photography audit | `docs/AUDIT.md` |
| Mark sources | `tools/identity/marks.py` → `assets/identity/*.svg`, `marks.js` |

**Study F is unchanged.** F.1 lives in its own folder and layers its own stylesheet on F's.

---

## 1. The standard

The question is not whether the identity looks like a beautiful independent fashion brand. It is whether it could belong to Joseph Martin and no one else. Each direction therefore starts from something that is already his, and each is judged by a **swap test**: put another hatmaker's name in, and see if the mark still works. If it does, it is not his.

## 2. The three directions

All marks are outlined to vector paths from SIL OFL fonts already in this repository (`tools/identity/marks.py`). Cowboy George is the original line drawing, applied as a mask and never redrawn.

### I · Thread
- **Source:** the NewsChannel 5 feature is about "the meaning behind his custom stitching". The meaning itself is unknown, and the mark does not claim it.
- **Construction:** Archivo at its widest (wdth 125, wght 470), tracked +14%. One running stitch beneath, 26 on and 13 off, starting in a knot under the J and leaving a loose tail after the N.
- **Applications:** stitched into the liner in red thread; ink woven label; a card where the stitch runs off the edge.
- **Verdict:** fails the swap test. The idea is his, but the form belongs to any atelier or denim brand, and wide grotesque capitals are everywhere in fashion now. It becomes his only if Joseph's own signature is what gets stitched.

### II · Charm (recommended)
- **Source:** every hat in the snapshot carries a gold charm: sailboat (Ahab), moon (Artemis), leaf (Oris), flower (Cerelia). His story is titled "Fourth Time's a Charm".
- **Construction:** Libre Caslon Display capitals, tracked +16% (American printing lineage, already used in Study A). A gold charm hangs on a jump ring from cap height between the names. **The charm changes with the hat; the name never does.** The master uses the leaf.
- **Applications:** gold foil on the satin liner tip, matching the charm on that hat's band; a cream woven label with the charm in gold thread; foil on black stock, with the four charms on the back.
- **On the website:** a gold thread drops from the header rule and the charm hangs at the end of JOSEPH. Choose a hat and the charm changes.
- **Verdict:** passes the swap test. No other hatmaker's mark is built from his own hardware. **The risk** is that Caslon spaced capitals alone read as generic luxury, so the charm carries all of the distinction. The stand-in charms drawn here must be replaced by tracings of Joseph's real ones.

### III · George
- **Source:** Cowboy George is already sold on the Cowboy George Foam Trucker and the Cowboy George Tee, and is drawn in red ink on the posters.
- **Construction:** the original drawing in red ink beside JOSEPH MARTIN in Barlow Condensed Bold, ruled, over HATMAKER · NASHVILLE, TENN.
- **Verdict:** the most ownable, since nobody else has George, but the narrowest in range. On the liner of a $1,795 commission, a dog with a cigarette sets the tone before the felt does. The red-ink, condensed-capitals stamp also pulls towards the Western nostalgia the brief asks to avoid.

### Recommendation

**II · Charm as the house mark** for hats, liners, labels, cards and the website. **George keeps the job he already has:** caps, tees, posters and the Music City Driving Club. **The stitch** stays a detail of the making, not a logo.

This is a hierarchy Joseph already half-uses: the mascot on the merchandise, the maker's mark inside the hat.

## 3. The recomposed opening (Study F.1)

| | Study F | Study F.1 |
|---|---|---|
| The name | Instrument Serif, "Joseph" roman / "Martin" italic, about 210 px at 1440 wide | Caslon capitals, JOSEPH / MARTIN offset by 1.12 em, 144 px at 1440 wide (smaller, but tracked wide, so it holds the same width) |
| Tension | Overlap of the two words | A single gold line drops from the header rule; the charm hangs at the end of JOSEPH, in the space above MARTIN's last letters |
| Hierarchy | Name, then portrait | Name, then the charm (the only colour on the screen), then the portrait, then the four ways to buy |
| Proportion | Name 7 columns, portrait 5 | Name 9 columns, portrait 3, at full height. The portrait reads as a frontispiece strip, not a competing block |
| Commerce | Three ways to buy | Four, adding Caps & tees from $45, which F was missing |
| Living detail | The felt switcher, further down | The same control changes the felt, the band plate *and* the hanging charm in the hero |

## 4. Drawings, version 2

Study F used one generic hat silhouette for all four designs. That is gone. With no photographs available (see `docs/AUDIT.md` §6), the honest replacement has two parts:

1. **A band plate for each hat.** Each plate draws the details its listing documents, at large scale: Artemis's twine wrapped twice and its bow and keeper; Oris's tonal ribbon, beadwork with its leaf charm, turkey feather and the binding that stops part of the way round; Ahab's two-tone ribbons and indigo denim; Cerelia's rust suede and flower charm. Documented materials are drawn in their documented colours (indigo, rust, twine, gold). **Undocumented colours (Ahab's two tones, Artemis's bow, Oris's beads) are drawn in neutral grey and labelled "not documented".** Cerelia's embroidery is a labelled dashed box: its pattern has not been seen.
2. **The unverified outline.** One dashed hat outline, the same for every hat *on purpose* and labelled "Outline not verified · trace from photograph". Drawing four different crowns without seeing them would be invention.

**Limitation, stated plainly:** these are drawings of descriptions, not of hats. They become drawings of Joseph's hats only when each outline is traced from a profile photograph and each charm from a macro photograph.

## 5. The archive, edited

From 21 entries to **7**: the Double Decker poster, Cowboy George, the pair of red-ink posters, the four hats as one entry of band plates, the Music City Driving Club, the shop-policy sentence, and the stitching question. Each carries a one-line reason it was kept, and the page ends with the list of what was cut and why.

## 6. What is still missing before this goes in front of Joseph

1. **His real charms**, photographed or in hand, so the mark is traced from them. Also: does **every** hat have a charm? WOODROW, CECH and RALPH are not documented. If not, the system needs a rule for hats without one (the name alone? a house charm?).
2. **The label and liner currently inside his hats.** The identity has to improve on what is there, and we have not seen it.
3. **His current logo**, and who made it.
4. **The stitching answer.** If it carries real meaning, Direction I may deserve a second look.
5. **Production tests:** a foil-on-satin sample of the charm at 18 mm, and a woven label at 50 × 15 mm. Caslon hairlines will need a heavier cut, or the mark redrawn, to survive weaving at that size.
6. **The Caslon J and M**, redrawn by hand so the type is ownable too, not only the charm.
7. **Who owns Cowboy George** as artwork. Confirm before George is formalised as the mascot.
8. **Network access** to josephbenmartin.com, cdn.shopify.com and shop.app, to replace this audit's medium- and low-confidence rows.

## 7. Tests

- `python3 -I tools/identity/marks.py` regenerates every mark (needs `fonttools`, `brotli`).
- `node tools/identity/render.mjs`: board, three site openings and F.1 at 1440 × 900 and iPhone 13. No overflow, no console errors.
- `node tools/identity/interact.mjs`: 21 checks covering the direction switch, the charm picker, all nine application drawings, the F.1 charm switcher (felt, band plate and hero charm), all four F.1 hat pages, the seven-piece archive, Study F still loading, and the phone menu.
- Lighthouse was not run.
