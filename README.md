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

## Still to do

- Contact section: the email, LinkedIn and Instagram cards are placeholders (`<a>` without `href`). Add the link and remove the "Coming soon" chip when each channel exists.
- "Apply to join" button: turn it into a link once the application form exists.
- Replace the drone emblem with a vector version when the designer provides one.
- Update the roadmap status chips as phases move along.
- Swap the concept schematic for CAD renders once the airframe design exists.
