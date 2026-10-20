# Argo — Design System

Design reference for everything Argo puts out: the website, slides, social media posts and stickers on the drone. Written in the [DESIGN.md](https://stitch.withgoogle.com/docs/design-md/overview/) format so both people and AI tools can follow it.

## 1. Visual Theme & Atmosphere

**Hydrogen light, in a light or a dark theme.** The website feels like a technology launch: bold type, light that seems to come from inside the scene, depth, and motion that answers the scroll and the pointer. The writing stays clear, formal and precise; the visuals may be bold. Teal and cyan always mean one thing: **hydrogen**, and by extension Argo itself.

- **One theme at a time.** The whole page is either light (Frost and white grounds, Ink text) or dark (Abyss and Deep Navy grounds, white text). It follows the visitor's device setting until they choose one with the toggle in the navigation, and then remembers their choice. Sections never alternate between light and dark; within a theme they differ only by a tone step (ground or band).
- **Light, not decoration.** Glow, gradients and depth come from one source: hydrogen. Streams of teal light in the hero, a glowing tank in Fig. 01, the hydrogen line in Fig. 02, LiDAR beams and point clouds in the Story. In the light theme glows become soft teal-tinted shadows.
- **Line art and point clouds.** Drawings, diagrams and charts are clean strokes (Ink on light, white on dark), with teal or cyan only for hydrogen parts. The Story's illustrations are LiDAR point clouds.
- **Read like a poster.** Every section leads with a figure, a drawing or a big number, and the text sits beside or below it.
- **Planned looks planned.** Solid line = exists or modelled, dashed line = planned.
- **No photographs.** Drawings, diagrams and point clouds carry the visuals.

## 2. Brand Assets

| Asset | Use | File |
|---|---|---|
| **ΛRGO wordmark** (crossbar-less A, heavy) | The team logo. Navigation bar, footer | `assets/argo-wordmark.svg` (vector, black) |
| **TEΛM ΛRGO lockup** (single line, lighter weight) | The full team name as a headline: website first screen, slide covers, banners | `assets/team-argo-wordmark.svg` (vector, black) |
| **Drone emblem** (the Kingfisher; bird, white + teal) | The drone's logo, next to drone content. The original on dark grounds; a light copy (Ink + Argo Teal) on light grounds | `assets/argo-drone-emblem.webp` (original) and `assets/argo-drone-emblem-light.webp` (light copy); both raster, transparent |
| **Favicon** (Λ from the wordmark) | Browser tab, small square avatars | `assets/favicon.svg` |

**Rules**
- The wordmark is the team logo. The bird is the drone's emblem. Do not combine them into one lock-up.
- Both wordmarks are black in the light theme and white in the dark theme. Never teal, never gradient-filled.
- The original drone emblem is never placed on white (its white outline disappears). In the light theme the light copy is used instead: its white parts are Ink `#0B0D10` and its teal parts Argo Teal `#007E8A` (at least 3:1 on the light grounds); it sits straight on the ground with a soft teal shadow, without a panel. The dark theme shows the original.
- Never stretch, recolour or distort either asset; the emblem's light copy is the only recoloured version. On the website the drone emblem is shown rotated 180° (beak pointing down), done in CSS.
- Leave clear space around either wordmark of at least half its height.
- **"Team Argo" as a headline:** always use the TEΛM ΛRGO lockup file. Never type "Team" in a font next to the ΛRGO wordmark.

## 3. Color Palette & Roles

### Anchors (fixed)
| Name | Hex | Role |
|---|---|---|
| **Argo Teal** | `#007E8A` | Hydrogen and accent text in the light theme. Primary buttons in both themes |
| **Argo Teal Bright** | `#0096A2` | Accent text in the dark theme; hydrogen fills in the light theme |
| **Ink** | `#0B0D10` | Text in the light theme |

### The family around them
| Name | Hex | Role |
|---|---|---|
| Abyss | `#050A12` | Dark theme: hero ground |
| Night ground | `#060C16` | Dark theme: section ground |
| Deep Navy | `#0A1B2E` | Dark theme: band ground |
| Harbour | `#12324A` | Dark theme: panels (about 50% opacity over the ground) |
| Petrol | `#0A4F5C` | Gradient middle stop; dark teal in the light hero streams |
| **Signal Cyan** (the one accent) | `#3FE3EE` | Dark theme only: the light itself (hydrogen lines, glow, terrestrial point clouds) |
| Ocean Blue | `#2A65AD` (light) / `#7FB2FF` (dark) | Blue carbon only: marine point clouds, water, the marine card |
| Ice | `#C9F4F7` | Light theme: glows and tints |
| Frost | `#F3F8FA` | Light theme: band ground |
| White | `#FFFFFF` | Light theme: section ground and panels |

### Theme tokens
| Role | Light | Dark |
|---|---|---|
| Ground / band | White / Frost | `#060C16` / Deep Navy |
| Hero ground | `#F4F9FA` | Abyss |
| Panels | White, teal-tinted border, soft Petrol shadow | Harbour glass, ice hairline |
| Text / body / secondary | Ink / `#1D2730` / `#56616C` | `#EEF6F8` / `#CFDDE3` / `#9FB3BF` |
| Hydrogen (strokes, lines) | Argo Teal | Signal Cyan with glow |
| Accent text | Argo Teal | Teal Bright, Signal Cyan for large figures |
| Terrestrial / blue carbon | Teal / Ocean Blue `#2A65AD` | Signal Cyan / Ocean Blue `#7FB2FF` |

### Gradients and light
- Radial teal or ice glows at 10–55% opacity behind content, never over text.
- A faint grain texture on dark-theme sections only.
- **Section backgrounds (both themes):** a faint 48px blueprint grid, two slow teal glows drifting over 70–90s, and one faint line motif per section (Mission hexagons, Simulation graph paper, Story contour lines, Testbed circuit traces, VTOL streamlines, Contact range rings). Behind the content, never interactive, still under reduced motion, faded out at section edges. Text over them still meets AA.
- Shadows are tinted with Petrol or teal, soft and long.
- **Gradient text is not used.** Text is always one solid colour.

### Accessibility
- Every text colour is checked against the real rendered background (shader, glows, panels, point clouds) in both themes, at desktop and phone widths: at least **4.5:1** for body text and **3:1** for large text (WCAG AA).
- Text never sits on bright light: the hero has a shade on the text side, and the hero shader leaves clear zones behind the labels of Fig. 01. Labels for the point-cloud drawings sit in a legend under each drawing.
- White text on Argo Teal buttons: **4.8:1**. Buttons stay Argo Teal in both themes.

### Colour meaning
- **Teal and cyan = hydrogen**; **Ocean Blue = blue carbon** (marine and coastal), only in the Story.
- **Teal = the main action** (primary buttons).
- Everything else is Ink, white or grey. No colours outside the blue–cyan family.

## 4. Typography

| Role | Font | Weight | Size | Notes |
|---|---|---|---|---|
| Display (H1) | TEΛM ΛRGO lockup (SVG) | — | up to 600px wide | Revealed by a light sweep on load |
| Section label | Bricolage Grotesque | 700 | 19–23px | Sentence case, 36×3px bar before it in the hydrogen colour |
| Section heading (H2) | Montserrat | 800 | 36–68px (28–48px for long headings) | Letter-spacing −0.035em |
| Block heading (Story) | Montserrat | 800 | 28–42px | With a small accent label above it ("The unsolved problem") |
| Subheading (H3) | Montserrat | 800 | 26–36px | "The Hydrogen Advantage" |
| Card heading (H4) | Montserrat | 700–800 | 17–30px | |
| Big figure / key figure | Montserrat | 800 | 28–80px | Tabular figures; counts up on entry |
| Body | Bricolage Grotesque | 400 | 16–19px | Line height 1.55–1.6 |
| UI (nav, buttons, labels) | Bricolage Grotesque | 500–700 | 13–16px | Sentence case |
| Drawing annotation / data | Martian Mono | 400–500 | 10–13px | Inside figures, callouts, chart ticks and table headers only |

- Montserrat echoes the ΛRGO wordmark; Bricolage carries reading text and the interface; Martian Mono stays inside drawings and data.
- No index numbering (01, 02, 03) in the running layout.

## 5. Components

**Navigation:** transparent at the top, translucent with a hairline once scrolled; ΛRGO wordmark, page links, the **theme toggle** (one icon that morphs between moon and sun, accessible name "Switch to light/dark mode"), one primary button. The links lead to pages, not sections: Home (`/`) and Drivetrain (`/drivetrain`), with more pages (for example Team and Partners) added as further links in the same list, in the bar and in the phone menu. The link of the current page is marked `aria-current="page"` in the HTML and carries a teal bar under it (cyan in the dark theme); the bar does not follow the scroll. A thin progress line in the same colour runs along the bottom of the bar. "Partner with us" leads to the Contact section of the page it is on. "Partner with us" carries a small arrow that slides on hover, and every few seconds a slow glint of light travels along its border (never across the label, which keeps its full contrast). The wordmark is never changed. On phones "Menu" opens a full-height sheet with the page links (the current page in the accent colour) and the theme toggle as the last row.

**Link band (main page):** after the market cards, one large bold link centred on the page, "Explore the Kingfisher Project", in Montserrat 800, underlined in the hydrogen colour, with a decorative arrow that slides on hover. It leads to /drivetrain. No image.

**Buttons:** Argo Teal, white text, 4px radius, soft teal glow. Hover darker teal, press `scale(0.97)`, magnetic on fine pointers. Hover styles only on devices that can hover.

**Panels:** 18px radius, a teal-tinted (light) or ice (dark) border, a long soft shadow and a 1px inner highlight. Used for Fig. 02, the advantage tiles, the method cards, the market cards, the diagram, the use-case tiles and the contact cards.

**Advantage tiles (Mission):** a small figure and the bold title, centred, with two title lines reserved while the tiles sit side by side so the four texts start level; the text sits behind one shared "Read more" / "Show less" button that opens all four tiles together. The button sits centred under "The Hydrogen Advantage", on the hub line's stem, so opening the tiles only adds height below it and it never moves. Thin hydrogen-coloured hub lines draw out once from it to a small dot on each tile (desktop only). All four figures share one 220 × 88 box, so the titles line up: energy-density bars with their kWh/kg values; a crossed-out CO₂ pill beside a lit H₂O pill ("Only water vapour"); four battery packs with swap arrows above one long hydrogen tank; a drone scanning a row of point-cloud trees. Thin lines, 10px mono labels in Muted, hydrogen in the hydrogen colour, battery and "not present" in Muted.

**Story blocks:** an accent label, a statement heading, short text, and a figure (point-cloud panorama, method cards, the solution illustration, market cards).

**Panorama (Story):** interactive. Each drone moves along its own survey line (the forest drone over the land half, the coastal drone over the water half), following the pointer on desktop, a drag, a sideways swipe on touch (vertical scrolling still works) or the arrow keys, Home and End on a focused drone. Faint returns are drawn everywhere; bright returns show only inside each moving beam. Each drone is a slider for screen readers ("Forest survey drone", "20% across the forest"); a hint in the caption reads "Drag to move the drones" or, on touch devices, "Swipe to move the drones".

**Method cards (Story):** four cards in a 2×2 grid beside the problem text (satellite, helicopter, battery drone, fixed-wing drone). Each has a small line drawing in the style of the satellite diagram showing why the method falls short, the method name and a one-line verdict. The full captions are screen-reader text only. Drawing, name and verdict line up across each pair (subgrid), and the text column beside the grid shares its top and bottom edges.

**Market cards:** two compact cards side by side, each with a short coloured bar (teal for terrestrial, Ocean Blue for blue carbon), a tag, a title and a one-line summary. "More details" (a native disclosure) opens inside its own card: the three facts (Target, Operation, Data output) as label-and-text rows, then the point-cloud drawing with a colour-keyed legend underneath, and its laser sweep plays. The cards keep their places and heights; "More details" never moves.

**Solution illustration (Story):** one drawing in the method-card style beside the solution statement: the planned hydrogen hexacopter flying low and slow over the forest, its hydrogen tank dashed in the hydrogen colour, the LiDAR beam lighting up canopy, trunk and ground returns, and three labelled targets (Hours of endurance, 3–7 kg LiDAR payload, Centimetre accuracy). The caption names it as an illustration of the planned hexacopter. On phones the labels move into a list under the drawing, and the drawing crops to the aircraft and forest.

**Drivetrain diagram nodes:** all five boxes share one style (panel fill, one stroke weight, no glow or dashes). Meaning lives in the connections: the hydrogen line between tank and fuel cell is the only teal dashed line.

**Use-case tiles (VTOL):** five separate tiles, each with a pictogram and its name; a scan line sweeps across the tile on hover. They are separate applications of a modular drone, not stops on one route.

**Contact cards:** Email, LinkedIn and Instagram as three equal cards (channel name, value in Montserrat 800). Only the email is a link (with an arrow); LinkedIn and Instagram read "Coming soon" and share the same lift-and-glow hover without behaving like links.

**Planned components:** the testbed components carry no status chips; the "Planned architecture" title marks them as planned.

**Illustrations:** captioned "Illustration"; informative drawings have a text description; decorative figures are `aria-hidden`. Never draw a VTOL airframe. Isometric technical line illustrations of the testbed are allowed when they are drawn as line art in the figure style (light strokes on the dark ground, Ink on the light ground), built from stated or measured dimensions, and captioned as an illustration, for example "Illustration of the planned architecture". Photorealistic renders, CAD renders and shaded 3D models of drones or hardware are not used. Hydrogen hardware is never drawn as existing: planned components are drawn apart from the airframe, marked as planned, and labelled with approximate positions. The hero's light streams are allowed because they read as light, not as an object.

**Charts:** inline SVG; hydrogen highlighted (teal, or cyan with glow in the dark theme), batteries in Ink or white; hover and keyboard readout, a slider for touch, and "Show the numbers". Fig. 01 and Fig. 02 are numbered. Fig. 03 (Testbed) and Fig. 04 (fuel cell) are numbered too.

**Footer:** on the band colour; team lines left, ΛRGO wordmark right.

## 6. Motion

Lenis (`lenis@1.1.20`) for smooth scrolling and GSAP with ScrollTrigger (`gsap@3.12.5`) for scroll scenes, from CDNs at pinned versions. The page is complete without them.

| Moment | What happens |
|---|---|
| **Hero, first second** | A WebGL shader draws streams of teal light (on Frost in the light theme, cyan on Abyss in the dark theme) that bend towards the pointer and fade out behind the labels of Fig. 01. The lockup sweeps in, the lines rise in, Fig. 01 draws itself (rotor rings, frame, callouts) and the dashed planned parts settle with the tank glowing. About 1.4s. The drawing tilts a few degrees towards the pointer. |
| **Curtains** | Band sections (Simulation, Testbed, Contact) arrive as a rounded panel that widens to full bleed. |
| **Mission** | Each advantage tile animates its own figure every time it scrolls into view (in either direction), on hover, and on tap on touch devices; a replay restarts the figure, never stacks: the hydrogen bar grows; the CO₂ strike draws and the H₂O pill lights; the battery packs drain one after another (the swap arrow pulses) while the tank drops only slightly; the drone flies the row and each tree lights as the scan passes. Reduced motion shows static frames (three packs empty, the fourth partly full; the drone halfway, half the trees lit). The shared button opens the tile text with a 0.45s height transition, instant under reduced motion. |
| **Simulation** | The battery line draws, then the hydrogen line, then the advantage area and the break-even dot. |
| **Story** | The point clouds are revealed by a laser sweep from left to right as each drawing comes into view. In the panorama the drones then ease to wherever the visitor moves them (instantly under reduced motion), and their beams light up the returns beneath. |
| **Testbed** | The whole diagram enters once, part by part; the flowing connections then keep running. No pinning. |
| **VTOL** | Tiles rise in; a scan line sweeps a tile on hover. |
| **Pointer** | Dark theme: a soft cyan light follows the pointer. Both themes: tiles and cards lift and glow under the pointer; primary actions are magnetic. Fine pointers only. |
| **Navigation** | The current-page bar stays still; the progress line follows the scroll; the theme icon morphs between moon and sun; a glint travels along the border of "Partner with us" about every 7 seconds and its arrow slides on hover. Under reduced motion: no sweep and no morph. |
| **Always** | The props in Fig. 01 spin and the diagram's dashed lines flow. |

**Rules**
- Custom ease-out `cubic-bezier(0.23, 1, 0.32, 1)` and GSAP `expo.out`/`power3`. No bounce. Each entrance runs once.
- No section holds the page in place.
- The shader renders below device resolution and pauses when off-screen or when the tab is hidden; without WebGL the hero falls back to a static gradient.
- In-page links scroll through Lenis and move keyboard focus to the target; Page Up/Down, Space, Home and End go through Lenis too.
- **Reduced motion:** no Lenis, no GSAP scenes; the hero shows one still frame (in the current theme); drawings and point clouds appear complete; content fades in briefly.
- **Fig. 01 is its own compositor layer** (`will-change: transform`), so the pointer tilt and the parallax move the drawing as one piece; without it the small fuel cell and battery boxes flicker against the tank.
- **Fig. 01 is self-contained:** one element (`#fig01`) whose styles do not depend on the hero.

## 7. Layout

- **Hero (one screen):** lockup, team line, tagline and affiliation line in a text column with generous space between them; Fig. 01 (the team's real DJI S800 EVO, traced to scale, with the planned tank, fuel cell and buffer battery dashed) large, taking just over half the width and running towards the right edge. No buttons or stats.
- **Our mission (ground):** eyebrow, heading and vision line in one full-width column. The heading (capped at 61px) runs on one line from 1240px up; below that, "On hydrogen." moves to its own line. Below, "The Hydrogen Advantage", the shared Read more button and four advantage tiles.
- **Simulation (band):** text beside Fig. 02 with the flight time slider and "Show the numbers".
- **The story (ground):** heading and intro; the point-cloud panorama; **the unsolved problem** (text and three risks beside the four method cards); **the solution** directly below as the answer (a two-sentence statement beside the solution illustration); **target markets and operations** ("Two markets, one airframe": two compact cards with "More details"). The heading matches the Simulation heading in size, so the heading, intro and the whole panorama fit on one screen (checked at 1440×900 and 1280×800). The panorama stays the main image.
- **Link band (end of the Story):** the centred link to /drivetrain. The main page's story ends here.
- **Contact (band):** heading, subtitle, three equal contact cards; then the footer.
- **The drivetrain page (`drivetrain/index.html`, teamargo.eu/drivetrain):** **The Kingfisher Project (band):** heading, intro and the emblem, then Fig. 03 and Fig. 04; **Future project: the fixed-wing VTOL (ground):** text on the left, the five use-case tiles on the right (one column on tablets and phones); then Contact and the footer.
- **Menu:** Home · Drivetrain (page links), plus the theme toggle.
- **Pages:** the main page (`index.html`) and the drivetrain page (`drivetrain/index.html`). The navigation, the Contact section and the footer exist on every page and must be changed in all of them. A new page lives in its own folder (`team/index.html` for teamargo.eu/team), uses root-relative paths (`/styles.css`, `/script.js`), and gets a link in both nav lists of every page; on its own page that link carries `aria-current="page"`.
- Max content width 1240px, 24px side padding (16px on phones). Section spacing about 152px (104px on phones).

## 8. Do's and Don'ts

**Do**
- Design every new element in both themes and check its contrast in both
- Let light come from hydrogen; keep line art as line art
- Lead each section with a figure, drawing or big number
- Draw planned things dashed, existing or modelled things solid
- Keep Fig. 01 self-contained

**Don't**
- Alternate light and dark sections within one theme
- Use colours outside the blue–cyan family, or Ocean Blue outside blue carbon
- Put gradient fills on text or wordmarks, or text over bright light
- Use photographs, photorealistic or CAD renders, or 3D models of drones or hardware (captioned isometric line illustrations are allowed; see Illustrations)
- Pin sections in place, or make placeholders look clickable

## 9. Responsive Behaviour

| Width | Changes |
|---|---|
| ≤ 1100px | Advantage tiles two by two; hub lines hidden |
| ≤ 1060px | Nav links and the theme toggle move into "Menu"; VTOL stacks; diagram descriptions two by two; no pointer light |
| ≤ 960px | Hero, Simulation and the testbed head stack; the problem block (method cards below the text) and the solution (illustration below the text) stack; market cards and contact cards go to one column |
| ≤ 880px | The drivetrain diagram switches to its vertical version |
| ≤ 720px | Single column; method cards one per row; market facts stack; larger text inside drawings; lighter shader resolution |

- The page never scrolls sideways; diagrams get a dedicated narrow version instead.

## 10. Writing

- **Clear, formal, concise technical English**: complete terms ("net-zero emissions targets"), the passive voice where natural, full sentences that flow. No hype words, no exclamation marks, no em dashes, British English.
- **Goals are goals.** Anything not built or measured is written as a target, conditional or in the future tense.
- **Short paragraphs:** three sentences at most, but sentences may be long.

## 11. Prompt Guide (for AI tools)

- Light: grounds White and Frost `#F3F8FA`; text Ink `#0B0D10` / `#56616C`; hydrogen Argo Teal `#007E8A`.
- Dark: grounds `#060C16`, Deep Navy `#0A1B2E`, Abyss `#050A12`; text `#EEF6F8` / `#9FB3BF`; hydrogen Signal Cyan `#3FE3EE` with glow.
- Blue carbon: Ocean Blue `#2A65AD` (light) / `#7FB2FF` (dark).
- Headings Montserrat 800, body Bricolage Grotesque, data Martian Mono. Glow from hydrogen only; no gradient text; dashed = planned.
- Example: "A panel on White with an 18px radius, a 1px rgba(0,126,138,0.14) border and a long soft Petrol-tinted shadow; inside, a point-cloud drawing of a forest in Argo Teal dots, ground returns in Ink at 30%, and a Martian Mono legend underneath."
