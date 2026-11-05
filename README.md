# Argo website

Static site for Argo, the TU/e hydrogen drone team. Plain HTML, CSS and JS, no build step. Live at https://www.teamargo.eu.

## Run locally

```bash
python -m http.server 5180
```

Then open http://localhost:5180.

## Deploy to Vercel

Push this folder to a GitHub repo, then import it on vercel.com (Framework preset: **Other**, no build command, output directory `.`). Vercel serves `404.html` for any address that does not match a file.

Or from this folder:

```bash
npx vercel
```

## Pages and files

- `index.html`: the main page (Hero, Our Mission, the Hydrogen Advantage, Simulation, the Story, Contact).
- `drivetrain/index.html`: the Kingfisher Project (Fig. 03, Fig. 04) and the fixed-wing VTOL.
- `404.html`: the "page could not be found" page, with links to both pages.
- `robots.txt` and `sitemap.xml`: let search engines in and list the two pages at their www addresses.
- `apple-touch-icon.png` and `assets/favicon-32.png`: PNG versions of the favicon for phones and older browsers.

## Design

Colours, fonts, logo rules and components are described in [DESIGN.md](DESIGN.md). Follow it for any change to the site, slides or social media.

Brand files live in `assets/`: the ΛRGO wordmark (`argo-wordmark.svg`), the TEΛM ΛRGO lockup (`team-argo-wordmark.svg`), the drone emblem (`argo-drone-emblem.webp`) and the favicon. Fonts live in `assets/fonts/`: Inter for the site, and Martian Mono and Bricolage Grotesque for Fig. 03 and Fig. 04, each with its licence.

## Contact channels

Email (contact@teamargo.eu), LinkedIn (Team Argo) and Instagram (@argodrones) are all live; each Contact card links to its channel, LinkedIn and Instagram in a new tab.

## Still to do

- Preview images for link sharing (`og:image`), one per page.
- A version of the drone emblem in Electric Blue, and a vector version of the emblem when the designer provides one.
- An application form for new members, once the team opens one.
