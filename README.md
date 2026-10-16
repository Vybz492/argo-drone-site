# Argo — website

Static site for Argo, the TU/e hydrogen drone team. Plain HTML, CSS and JS, no build step.

## Run locally

```bash
python -m http.server 5180
```

Then open http://localhost:5180.

## Deploy to Vercel

Push this folder to a GitHub repo, then import it on vercel.com (Framework preset: **Other**, no build command, output directory `.`).

Or from this folder:

```bash
npx vercel
```

## Design

Colours, fonts, logo rules and components are described in [DESIGN.md](DESIGN.md). Follow it for any change to the site, slides or social media.

Brand files live in `assets/`: the ΛRGO wordmark (`argo-wordmark.svg`), the drone emblem (`argo-drone-emblem.webp`) and the favicon.

## Hidden for now

The **Our goal** section (7–8 hours headline, "Partner with us" / "Follow our progress" buttons, current-phase status line, design targets) is commented out in `index.html`. To bring it back, uncomment it; it has no menu link.

The **Roadmap** section (five phases with status chips) is commented out in `index.html`, together with its "Roadmap" link in both menus. To bring it back, uncomment the section (it sits between "Why parallel" and Contact) and the two links. The hidden "Our goal" section links to `#roadmap`, so restore the roadmap before (or with) that section.

The **Partners** and **Join** sections are commented out in `index.html`, together with their "Partners" and "Join" links in both menus (desktop and phone). To bring them back:

1. Uncomment the two sections and the menu links.
2. Point the "Partner with us" buttons back from `#contact` to `#partner`.

## Still to do

- Contact section: the LinkedIn and Instagram cards are placeholders (`<a>` without `href`). Add the link and remove the "Coming soon" chip when each channel exists. The email (contact@teamargo.eu) is live.
- "Apply to join" button: turn it into a link once the application form exists.
- Replace the drone emblem with a vector version when the designer provides one.
- Update the roadmap status chips as phases move along (once the roadmap is back).
- Swap the concept schematic for CAD renders once the airframe design exists.
