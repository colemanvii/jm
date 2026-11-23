# Joseph Martin — Vision 001

A navigable creative-direction prototype of the future Joseph Martin website, extending the approved **Study B: The Object**. **This is not the live site** and nothing here changes josephbenmartin.com or its Shopify store. `main` is untouched; this work lives on the `vision-001` branch.

- Start at `index.html`. Presentation notes are at `notes/index.html`; the same content is in [docs/VISION-001.md](docs/VISION-001.md).
- Governing direction: [CLAUDE.md](CLAUDE.md) and [docs/CREATIVE_DIRECTION.md](docs/CREATIVE_DIRECTION.md).
- Earlier studies (A–F, identity, MCDC iteration 002) remain on the `claude/happy-davinci-8paj81` branch. The Study 001 page previously at the root is kept at `studies/001/`.

## Run

No build step. Serve the repository root with any static server, for example `python3 -m http.server 8000`, then open `http://localhost:8000/`.

## Layout

```
index.html                      homepage
hats/index.html, hats/hat.html  collection; product page (?h=oris|ahab|artemis|cerelia)
hatmaker/                       The Hatmaker
music-city-driving-club/        Capsule 001
commission/                     process + inquiry prototype
notes/                          presentation notes
assets/vision/                  vision.css (the one design system), vision.js, hats.js (product snapshot)
assets/fonts/                   Archivo (SIL OFL) + licence
assets/jm, assets/mcdc          real drawings and posters made for Joseph Martin
tools/vision/                   render + interaction tests
screenshots/vision-001/         desktop and phone renders of every page
```
