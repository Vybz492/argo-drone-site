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

## Before going live

- Replace `contact@example.com` in `index.html` (partner CTA and footer).
- Update the roadmap status chips as phases move along.
- Swap the concept schematic for CAD renders once the airframe design exists.
