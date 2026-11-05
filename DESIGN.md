# Argo — Design System

Design reference for everything Argo puts out: the website, slides, social media posts and stickers on the drone. Written in the [DESIGN.md](https://stitch.withgoogle.com/docs/design-md/overview/) format so both people and AI tools can follow it.

## 1. Visual Theme & Atmosphere

**The kingfisher, in the dark.** Argo's colours come from the kingfisher: a dark body (Ink), an electric blue back (Electric Blue) and an orange chest (Cantaloupe Orange). The website feels like a technology launch: bold type, light that seems to come from inside the scene, depth, and motion that answers the scroll and the pointer. The writing stays clear, formal and precise; the visuals may be bold. Each colour means one thing: **Electric Blue is hydrogen**, and by extension Argo's technology; **Cantaloupe Orange is the action**, what a visitor can do next. Blue and orange never touch.

- **Dark only.** The whole site is dark: an Ink ground with Frost text. There is no light theme and no theme toggle; a light theme may come much later, if ever.
- **Every section is a scene.** Each section has its own light, a softly tinted field and depth, so scrolling feels like moving through scenes rather than down one dark page (see Gradients and light). No section reads as flat black, and no section carries a pattern.
- **Light, not decoration.** Glow, gradients and depth read as light falling on the scene. Blue light comes from hydrogen and Argo's technology: the LiDAR beam's source in the hero, the glowing tank in Fig. 01, the hydrogen line in Fig. 02, the beams in the Story. Warm (orange) light is allowed as light only: the canopy where the hero's beam lands, the solution's daybreak, the sunrise behind Contact and the lit main button. Orange is never a fill, a decoration or a text colour outside the action.
- **Line art and point clouds.** Drawings, diagrams and charts are clean Frost strokes on the dark ground, with Electric Blue only for hydrogen parts. The Story's illustrations are LiDAR point clouds.
- **Read like a poster.** Every section leads with a figure, a drawing or a big number, and the text sits beside or below it.
- **Planned looks planned.** Solid line = exists or modelled, dashed line = planned.
- **No photographs.** Drawings, diagrams and point clouds carry the visuals.

## 2. Brand Assets

| Asset | Use | File |
|---|---|---|
| **ΛRGO wordmark** (crossbar-less A, heavy) | The team logo. Navigation bar, footer | `assets/argo-wordmark.svg` (vector, black) |
| **TEΛM ΛRGO lockup** (single line, lighter weight) | The full team name as a headline: website first screen, slide covers, banners | `assets/team-argo-wordmark.svg` (vector, black) |
| **Drone emblem** (the Kingfisher; bird, white + teal) | The drone's logo, next to drone content. The site uses the original on the dark ground | `assets/argo-drone-emblem.webp` (original, used on the site) and `assets/argo-drone-emblem-light.webp` (light copy, Ink + Argo Teal, not used while the site is dark only); both raster, transparent |
| **Favicon** (Λ from the wordmark) | Browser tab, small square avatars | `assets/favicon.svg` |

**Rules**
- The wordmark is the team logo. The bird is the drone's emblem. Do not combine them into one lock-up.
- Both wordmarks are Frost on the dark site, and black only on light printed matter. Never blue or orange, never gradient-filled.
- The original drone emblem is never placed on white or Frost (its white outline disappears). The light copy is never placed on Ink or a dark surface: its Ink outline disappears (1.02:1). On the site the original sits straight on the Ink ground or a dark surface, without a panel.
- The emblem still carries the old Argo Teal (`#007E8A`), the only teal left in the brand. A version in Electric Blue is planned as a separate task; until then the original is used exactly as it is.
- Never stretch, recolour or distort either asset. On the website the drone emblem is shown rotated 180° (beak pointing down), done in CSS.
- Leave clear space around either wordmark of at least half its height.
- **"Team Argo" as a headline:** always use the TEΛM ΛRGO lockup file. Never type "Team" in a font next to the ΛRGO wordmark.

## 3. Color Palette & Roles

### Brand colours (fixed)
| Name | Hex | Role |
|---|---|---|
| **Ink** | `#060A0D` | The ground of every page; the text on blue and orange |
| **Electric Blue** | `#0297DE` | Hydrogen: hydrogen parts in drawings, the hydrogen line, hydrogen key figures, the light in the hero and the Story |
| **Cantaloupe Orange** | `#FC734D` | The action: primary buttons and the arrows of the contact cards; as light, the warm glows listed under Gradients and light |

### Neutrals and tints
| Name | Hex | Role |
|---|---|---|
| Shell | `#0E1419` | Surface one step above Ink: panels, tiles, cards, band sections, footer |
| Wing | `#161E25` | Surface two steps above Ink: secondary buttons, empty bar tracks, panels on a Shell band |
| Wing hover | `#1E2830` | Hover on a Wing surface |
| Frost | `#EEF2F5` | Main and body text, wordmarks, drawing strokes (a softened white) |
| Mist | `#B9C3CB` | Secondary text |
| Slate | `#8C98A2` | Captions, figure labels, chart ticks |
| Stroke | `#4A5560` | Thin secondary lines inside drawings only, never text |
| Blue hover | `#35AEE8` | Hover on a blue fill |
| Orange hover | `#FD8D6E` | Hover on a primary button |

### Roles
| Role | Colour |
|---|---|
| Ground / band | Ink / Shell |
| Panels | Shell on the Ink ground, Wing on a Shell band. Told apart by tone, with no coloured border |
| Text / secondary / captions | Frost / Mist / Slate |
| Hydrogen (strokes, lines, fills, glow) | Electric Blue |
| Primary action | Cantaloupe with Ink text |
| Secondary action | Translucent Wing with Frost text |
| Links | Frost text with a Slate underline (Frost on hover) |
| Current page in the navigation | A small Frost dot under the link |
| Focus ring | Frost (the off-white), 2px, 3px offset |
| Trees in the Story | Leaf green `#A6D96A` (approved) |
| Seagrass and water in the Story | Sea blue `#7FB2FF` (approved) |

**Ratio:** about 84% Ink and dark surfaces, 9% light text, 4% Electric Blue, 3% Cantaloupe. Blue and orange stay small and roughly equal.

### Blue and orange never touch
- Blue is never placed on orange and orange never on blue, including their hover tints.
- Text on blue or orange is always Ink. White text fails on both (2.88:1 on blue, 2.42:1 on orange).

### Gradients and light
- Soft radial glows at 7–55% opacity behind content, never over text at full strength. Blue glows for hydrogen; warm glows only as light (see Visual Theme).
- A faint grain texture on sections.
- **No section patterns.** No grids, line motifs or textures beyond the grain.
- **No hard edges.** Every glow layer fades out towards all four of its edges (a mask), so the edge of its box can never cut its light into a visible seam; a section's light fades in from its top where it meets the section above. The only edges are the deliberate ones: the band panels (Simulation, Contact) and the horizon lines.
- **Section scenes.** Each section has a tinted field (a vertical gradient between Ink and a deep blue or warm dark) and one or two light sources. Scenes fade to Ink or Shell at their edges so sections meet without a seam. Every oval glow uses `radial-gradient(closest-side, …, transparent)`, so it reaches zero before its box ends; the Advantage oval is as wide as the page grid (`--glow-w`), the Kingfisher oval a touch wider (`--glow-w-wide`), and neither reaches the window's edges.

| Section | Scene | Light |
|---|---|---|
| Hero | The LiDAR beam over a forest at night | The shader (see Motion) |
| Our mission | A light table at night | The canopy's warm afterglow at the top, a pool of hydrogen light behind Fig. 01 (no reflection under it), a cool haze behind the vision line; field Ink to `#081520`; below the drawing, the wide oval of the Advantage begins (see the next row) |
| The Hydrogen Advantage | A planet's horizon | One continuous band of blue light under a still blue rim of horizon, which passes behind the glass tiles. Blue only: the section is about hydrogen, and blue means hydrogen; the warm horizon is kept for Contact, the action |
| Simulation (band) | The chart room | A deep blue field rising to the lower right, a cool desk light on the text, and a long beam along the hydrogen line's direction that brightens as the flight time runs; in the gap above the heading, one faint blue oval as wide as the page grid, brightest 12px above the border with Our mission (where the drawing's old reflection ended), drawn as two identical parts, one per section, that meet without a seam |
| The story: panorama | Dusk over land and sea | A low band of evening light, leaf light over the forest half, sea light over the water half |
| The story: the problem | Under the canopy | Darker; one cold light from above, and the method stage's own light, which takes the colour of the method shown (cold sky, warm exhaust, a fading grey, a pale streak) |
| The story: the solution | Daybreak | Warm light low behind the forest, hydrogen light on the aircraft, leaf light where the scan lands |
| The Kingfisher link (end of the Story) | A lit doorway | One faint blue oval centred behind the link, a touch wider than the page grid (1312px, `--glow-w-wide`) and never reaching the window's edges, fading to nothing inside its own box |
| Contact (band) | Sunrise | Warm light rising behind the cards with a warm rim of horizon, the night's blue still in the upper left |
| Drivetrain page: The Kingfisher Project (ground) | The test bench at night | Field Ink to `#081520` and back; a pool of hydrogen light behind the emblem, a cool haze behind the words, and under each figure one faint blue oval about the figure's width, so the deep blue panels stand out against a lit field. All glows fade to nothing inside their own boxes |
| Drivetrain page: Future project, the VTOL (ground) | The route ahead | A deep blue field behind the five use cases, a cool desk light on the text, fading in from the top and out at the bottom |

- Every text colour is measured against the scene it sits on (see Accessibility).
- Shadows are soft, long and tinted with Ink; only things that float (menus, the phone menu sheet) carry them.
- **Gradient text is not used,** with one trial exception (rounds 8–12): "On hydrogen." in the hero headline is one smooth, eased vertical gradient over the whole height of the letters, from soft white `#D9E8F2` at the top of the tallest letters (0.11em below the top of the line box, in Inter) into deep blue `#0287CC` (a darker tint of Electric Blue) by the baseline (0.852em), with the 50/50 mix at the centre of the "o" (0.595em). The curve is smoothstep(s^1.63), written as 11 colour stops, so it starts and ends gently and shows no line or banding. Never orange or Ink. One gradient for the whole line, so every letter has the same colour at the same height. The gradient box reaches 0.14em below the line (given back with a negative margin), so the tails of "y" and "g" are drawn in full. A soft vertical band of pale light brightens the words where the beam crosses them, kept on the beam's axis as it swings with the pointer. The hero shader dims the beam behind the words by 38% (the brightness before round 9, restored on request; rounds 9 and 10 had 58% plus a further 50% just behind this line, for 3:1). **Accepted design choice (2026-11-05):** at 38%, the deep blue at the bottom of the letters measures 2.1–2.5:1 against the brightest beam behind it at 1440px (below the 3:1 for large text; the lighter upper half about 4:1). The bright rays are kept on purpose; do not raise the dimming or change the letters' colours to reach 3:1. Reduced motion: the still gradient, no band. Increase Contrast or forced colours: plain Frost. Everywhere else, text is one solid colour.

### Accessibility
- Every text colour is checked against the real rendered background (shader, glows, panels, point clouds), at desktop and phone widths: at least **4.5:1** for body text and **3:1** for large text (WCAG AA).
- Text never sits on bright light: the hero shader dims softly behind the words, and every scene keeps its brightest light away from text. Labels for the point-cloud drawings sit in a legend under each drawing.
- Measured pairs:

| Text on background | Ratio |
|---|---|
| Frost on Ink / Shell / Wing | 17.65 / 16.47 / 14.97 |
| Mist on Ink / Shell | 11.10 / 10.36 |
| Slate on Ink / Shell | 6.74 / 6.29 |
| Ink on Cantaloupe (primary button) / on Orange hover | 7.28 / 8.72 |
| Ink on Electric Blue / on Blue hover | 6.13 / 7.92 |
| Cantaloupe on Ink / Shell (links) | 7.28 / 6.80 |
| Electric Blue on Ink / Shell / Wing (hydrogen labels and figures) | 6.13 / 5.72 / 5.20 |

- **Scenes checked (round 6, 2026-11-04):** 323 text elements below the hero measured against the rendered scenes at 1440 and 1920px (the 92nd-percentile background pixel behind each); all pass AA. Lowest: 5.35:1, the small labels inside the Advantage figures. The only flag is "CO₂", where the strike line deliberately crosses the word ("No CO₂" is also written beside it).
- **Increase contrast:** under `prefers-contrast: more`, Mist becomes Frost and Slate becomes `#C9D1D7` (12.85:1 on Ink).
- Meaning never relies on colour alone: planned parts are dashed, actions look like buttons or underlined links, and key figures carry words.

### Colour meaning
- **Electric Blue = hydrogen.**
- **Cantaloupe Orange = the action** (primary buttons, links, where you are in the navigation).
- **Terrestrial and blue carbon (Story): to be decided.** The old pair (teal or cyan for terrestrial, Ocean Blue for blue carbon) is retired. The new pair must not be Electric Blue or Cantaloupe, since both already carry a meaning.
- Everything else is Ink, Frost or grey. No colours outside the palette; the emblem's teal is the one exception until its blue version exists.

## 4. Typography

| Role | Font | Weight | Size | Notes |
|---|---|---|---|---|
| Display (H1) | TEΛM ΛRGO lockup (SVG) | — | up to 600px wide | Revealed by a light sweep on load |
| Headline (first line set in type) | Inter | 700 | 36–84px | Line height 1.0, letter-spacing −0.035em |
| Section label | Inter | 600 | 15–17px | Title Case ("Our Mission", "The Unsolved Problem", "Future Project: The Fixed-Wing VTOL"), Frost, 36×3px bar before it in Electric Blue. Every label on both pages looks the same, including the Story's block labels (28px bar on phones) |
| Section heading (H2) | Inter | 700 | 28–44px | Line height 1.1, letter-spacing −0.025em |
| Block heading (Story) | Inter | 700 | 22–34px | With a section label above it ("The Unsolved Problem"), styled exactly as the other labels |
| Subheading (H3) | Inter | 700 | 22–28px | "The Hydrogen Advantage" |
| Card heading (H4) | Inter | 700 | 17–22px | Letter-spacing −0.015em |
| Big figure / key figure | Inter | 700 | 28–80px; up to 160px for a single key number | Tabular figures, letter-spacing −0.045em at the largest sizes; counts up on entry |
| Intro | Inter | 300 | 20–26px | Line height 1.4. The only place Light is used |
| Body | Inter | 400 | 16–18px (17px default) | Line height 1.6, up to about 65 characters per line |
| UI (nav, buttons, labels) | Inter | 500–600 | 13–16px (15px default) | Sentence case |
| Drawing annotation / data | Inter | 500 | 10–13px | Inside figures, callouts, chart ticks and table headers only; tabular figures; at least 13px as rendered on a phone |

- **Inter is the only typeface.** Bold for headings and figures, Light only for large intro text, Regular for body text. Light was tested for body text and rejected: its thin strokes read worse on the dark ground.
- Inter is self-hosted: the variable font `assets/fonts/InterVariable.woff2` (licence in `assets/fonts/LICENSE.txt`), preloaded, with `font-display: swap` and the optical size axis on. No font is loaded from Google.
- **One exception, open for decision:** Fig. 03 and Fig. 04 on the drivetrain page are kept exactly as built, so they keep their own typefaces (Martian Mono for labels, Bricolage Grotesque for their paragraphs), loaded from Google Fonts on that page only. Moving them to Inter would change the figures' text widths and is a separate task.
- **Method names (Story):** Inter 700 at the Section heading size, in a vertical list; the chosen one in Frost, the others in Slate.
- No index numbering (01, 02, 03) in the running layout.

## 5. Components

**Navigation:** transparent at the top, translucent with a hairline once scrolled; ΛRGO wordmark, page links, one primary button. There is no theme toggle. The links lead to pages, not sections: Home (`/`) and Drivetrain (`/drivetrain`), with more pages (for example Team and Partners) added as further links in the same list, in the bar and in the phone menu. The link of the current page is marked `aria-current="page"` in the HTML and carries a small Frost dot under it; the dot does not follow the scroll. A thin progress line (2px, Electric Blue with a soft glow) runs along the bottom edge of the bar, as on the original site, and grows from left to right with the scroll (transform only). "Get in touch" leads to the Contact section of the page it is on. "Get in touch" carries a small arrow that slides on hover, and every few seconds a slow glint of light travels along its border (never across the label, which keeps its full contrast). The wordmark is never changed. On phones "Menu" opens a full-height sheet with the page links (the current page underlined in Cantaloupe) and "Get in touch" as the last row.

**Link band (main page):** after the solution, one large bold link centred on the page, "Explore the Kingfisher Project", in Inter 700, underlined in Cantaloupe, with a decorative arrow that slides on hover. It leads to /drivetrain. No image.

**Buttons:** primary buttons are Cantaloupe with Ink text, 4px radius, Semibold 600, at least 48px tall (44px for the small nav button). The primary button is lit like a lamp: a warm top edge, its own soft warm light below it, and a highlight that follows the pointer. Hover Orange hover `#FD8D6E`, press `scale(0.97)`, magnetic on fine pointers. Secondary buttons are translucent Wing with Frost text and a lit top edge. Hover styles only on devices that can hover.

**Panels:** 6px radius, glass: a translucent dark Shell over the scene's light, blurred, with a thin lit rim and no coloured border. Used for Fig. 02, the advantage tiles, the market cards in the panorama's details panel, the solution illustration, the diagram, the open row of the use-case list (as a tint, without blur) and the contact cards. Under Reduce Transparency or Increase Contrast they become solid Shell. **The Advantage tiles are pre-blurred glass:** instead of a live backdrop blur, each tile holds a copy of the section's light (glow and horizon) lined up with the real one, blurred once with a plain filter on its own GPU layer, under the same tint and lit rim. It looks the same and costs nothing to keep while the page scrolls; the horizon behind them therefore stays still.

**Advantage tiles (Mission):** a small figure and the bold title, centred, with two title lines reserved while the tiles sit side by side so the four texts start level; the text sits behind one shared "Read more" / "Show less" button that opens all four tiles together. The button sits centred under "The Hydrogen Advantage", on the hub line's stem, so opening the tiles only adds height below it and it never moves. Thin hydrogen-coloured hub lines draw out once from it to a small dot on each tile (desktop only). All four figures share one 220 × 88 box, so the titles line up: energy-density bars with their kWh/kg values; a crossed-out CO₂ pill beside a lit H₂O pill ("Only water vapour"); four battery packs with swap arrows above one long hydrogen tank; a drone scanning a row of point-cloud trees. Thin lines, 10px Inter labels in Slate, hydrogen in Electric Blue, battery and "not present" in Slate. **Reserved space (round 7):** the row of tiles always keeps the height of the open state, so Read more never moves anything below it; closed, that space shows as room under the tiles (the blue light fills it); open, the tiles end 48px above the Simulation band. The text in the tiles is 15px with 1.5 line height and 22px side padding, to keep that space as small as the copy allows. The tiles are their own GPU layers from the start (building them as they faded in cost two 60ms stalls on the first scroll).

**Story blocks:** a section label, a statement heading, short text, and a figure (point-cloud panorama, the method list, the solution illustration).

**Panorama (Story):** interactive. Each drone moves along its own survey line (the forest drone over the land half, the coastal drone over the water half), following the pointer on desktop, a drag, a sideways swipe on touch (vertical scrolling still works) or the arrow keys, Home and End on a focused drone. Faint returns are drawn everywhere; bright returns show only inside each moving beam. Each drone is a slider for screen readers ("Forest survey drone", "20% across the forest"); a hint in the caption reads "Drag to move the drones · Click a side for details" or, on touch devices, "Swipe to move the drones · Tap a side for details". A click or tap on a half (a press that moves no more than 5px; anything further is a drag) or on its key chip opens the market details panel under the panorama: that half's drone glides to the centre of its survey line, the other half (points, water, cone and drone) fades to 35%, and mouse hover stops moving the drones until the panel closes. The other half switches the panel to its market; the active half or chip again, or Escape, closes it and restores the scene. The key chips "Terrestrial" and "Blue carbon" are buttons (`aria-pressed`, `aria-controls` the panel), pills with a 1.5px border that takes the market colour when pressed. **The light cones end on the terrain:** fixed clip regions built from the drawing's own ground points and water surface keep each cone above the ground; the forest cone ends on the ground line (and follows it down the shore), the coastal cone is brighter above the water surface and fainter below it, ending on the seabed. The clips stay put while the cones move with the drones.

**The unsolved problem (Story):** reads top to bottom as one argument, on the page grid. The heading runs across the page; below it the two paragraphs stand side by side (six columns each); under both, in one row, the chain of consequences: Inaccurate data, Significant financial risk, Corporate greenwashing, an ordered list with a ring before each step (the last ring filled) and a short line leading to the next. Then the subheading "Why current methods fall short" (Inter 700, 22–28px, Frost: one step below the 34px block heading) and the method list.

**Method list (Story):** one symmetric block on the page grid's two halves (the same line as the two paragraphs above it). On the left (six columns): the subheading "Why current methods fall short" and, tightly under it, the four method names (Satellite, Helicopter, Battery drone, Fixed-wing drone), Inter 700 at 36–48px with 9px between rows, starting on the grid's left edge. On the right (six columns): the chosen method's drawing (at most 440px wide), its top level with the subheading, and under it the one-line verdict (Frost, intro size) and the full caption (Mist, body size), sized so that drawing and text end about where the list ends. Hovering, focusing or clicking a name chooses it; the others fall back to Slate and a Frost bar slides beside the chosen one, in the margin just left of the grid edge. Built as tabs: the list is a vertical `tablist`, each name a `tab`, each stage a `tabpanel` (focusable, since it holds no control); the arrow keys, Home and End move between names, and only the chosen name is in the tab order. The stage cross-fades in 0.2s. The stage's light takes the method's colour (see Section scenes). **The drawings** (360 × 170, refined line art in Fig. 01's language) share one scene: a hatched ground line and five lobed tree crowns with trunks and branches. One crown shape drives everything: the outline that is drawn, the LiDAR returns (leaf-green dots on that outline, plus the leaves inside it, the trunk and the ground where a beam reaches), and where every cone and sight line ends (on the real canopy surface). The satellite's view cone lands on the crown tops and the hatched "missed" area fills exactly the space beneath the canopy; the helicopter's beam starts at its sensor and ends on the crown below; the fixed-wing drone's four rays each end on a crown with one or two returns. Aircraft in Frost line with real detail; fine detail in Mist and Stroke; sight lines, paths and leaders dashed in Slate; labels 12 units in a column on the right. Never photographs or realistic renders. Without JS the list is hidden and the four methods stand two by two, each with its name.

**Market details panel (under the panorama):** the label "Target Markets and Operations" and a small heading "Two markets, one airframe.", then the active market's card across the full content width. On desktop the card has two columns: on the left a short coloured bar in the market's colour (to be decided, see Colour meaning), the tag, the title, a one-line summary and the three facts (Target, Operation, Data output) as label-and-text rows; on the right that market's point-cloud drawing, vertically centred, with its colour-keyed legend and caption underneath. At ≤ 960px the card stacks, text first, then the drawing below a hairline. The panel opens and closes with a 0.45s height animation; switching markets snaps to the new card's height and fades the card in over 0.2s. The drawing's laser sweep plays each time its card opens or is switched to. Without JS both cards show. Under reduced motion everything changes instantly.

**Solution illustration (Story):** one drawing in the method-card style beside the solution statement: an orthographic side view of the DJI S800 EVO testbed from its left, flying left to right low over point-cloud trees. Proportions follow DJI's manual (as Fig. 01); the near and far arms, motors and rotors overlap from this side, so three rotor positions show. The airframe (frame, arms, motors, rotors, landing gear) is solid and drawn small (0.12 units per mm), centred over the scan cone. The only planned part shown is the LiDAR sensor, dashed, hanging under the centre of the frame behind the near landing-gear leg. Its scan cone lights up the trees in the panorama's dot style: every tree has a dotted trunk and branches; inside the cone the canopy, trunk and ground points are lit, outside they stay soft and unlit (soft canopy, neutral trunk dots, a dotted ground line). Three labelled targets, each with a dashed leader to its part: Hours of endurance (the centre frame), LiDAR sensor (the sensor), Centimetre accuracy (a lit canopy point). It builds up once as it arrives (see Motion). The caption names it as an illustration of the planned hexacopter. On phones the labels move into a list under the drawing, and the drawing crops to the aircraft and forest. Under the text and the figure, centred across both (after the figure on phones), one quiet line of body text: "The drivetrain that would power it is being developed in the Kingfisher Project." The link band follows with its own hairline and spacing.

**Drivetrain diagram nodes:** all five boxes share one style (panel fill, one stroke weight, no glow or dashes). Meaning lives in the connections: the hydrogen line between tank and fuel cell is the only Electric Blue dashed line.

**Use-case list (VTOL):** the five use cases as a hover-expand list on columns 7–12, as tall as the VTOL text beside it: its top on the first paragraph's first line, its bottom on the last line (closed rows 52px, the open row 228px, 8px apart). Each row shows the use case's name (Inter 700, 22px); one row is open at a time (the first at the start), with its name in Frost and its drawing across the whole row under the name, centred and as large as the row allows. The other rows fall back: Slate names on a fainter surface. Hovering, focusing or clicking a row opens it with a spring (damping 0.72, about 4% overshoot, 0.7s), interruptible from wherever it is. The rows are one tab stop: the arrow keys, Home and End move between them, and focus opens a row just as hover does. The list keeps one fixed height, so nothing below it moves; the row surfaces are a tint without a live blur, because the rows change size. No scan line and no text inside the drawings: the name is the explanation. Reduced motion: rows switch at once. Without JS every row is open. **The drawings** (480 × 160, the method drawings' line language, simpler): two lattice pylons carrying four conductors (power grid); a high-speed train in side view (a long pointed nose, carriages with window bands, a pantograph on the contact wire) on a solid rail over sleepers and gravel ballast, under the masts, catenary and droppers (railway); a pipe on supports with flanges, a valve and its handwheel, and a marker post (pipeline); a runway in perspective with threshold blocks, aiming-point markings, centre line, edge lights, the localiser array and a glide-path antenna (airport); two carriageways of three lanes under a sign gantry (motorway). Frost outlines, Mist detail and wires, Stroke for the faintest lines, a hatched ground, a dashed Slate ring on what is inspected; no blue, since none of it is hydrogen. They are separate applications of a modular drone, not stops on one route.

**Fig. 03 and Fig. 04 (drivetrain page):** the isometric testbed and the exploded PEM fuel cell, built with the anatomy kit (`assets/figures/`). Line art in white and pale grey; everything hydrogen (the hydrogen line, the H₂ tank, the hydrogen dots and particles, the selected hydrogen zone) in Electric Blue `#0297DE`, the selected tank's edge in Blue hover `#35AEE8`. Each sits on its original dark blue panel (`#060C16`, as on the first site) with an 18px rounded hairline frame (Frost at 12%); the panel is a step deeper than the lit blue field and the oval of light around it, so it reads as its own surface. The panels keep the width their insides were laid out for (up to 1480px, 24px from the window's edges), a little wider than the page grid. Their insides (drawings, parts, labels, legends, text, layout and every interaction) are not changed by page work; colour changes go in `fig03.css` and `fig04.css` only.

**Contact cards:** Email, LinkedIn and Instagram as three equal glass cards (channel name, value in Inter 700; each carries a mark before the name, 20px, monochrome in Frost: a plain line paper plane for Email (a generic send mark, never an app's logo), and the LinkedIn and Instagram marks), each a link with a Cantaloupe arrow in its corner. Email opens `mailto:contact@teamargo.eu`; LinkedIn ("Team Argo", https://www.linkedin.com/company/team-argo/about/) and Instagram ("@argodrones", https://www.instagram.com/argodrones/) open in a new tab, which screen readers announce ("opens in a new tab"). On hover a card lifts, a soft light follows the pointer inside it and the arrow slides out.

**Planned components:** the testbed components carry no status chips; the "Planned architecture" title marks them as planned.

**Illustrations:** captioned "Illustration"; informative drawings have a text description; decorative figures are `aria-hidden`. Never draw a VTOL airframe. Isometric technical line illustrations of the testbed are allowed when they are drawn as line art in the figure style (Frost strokes on the dark ground), built from stated or measured dimensions, and captioned as an illustration, for example "Illustration of the planned architecture". Photorealistic renders, CAD renders and shaded 3D models of drones or hardware are not used. Hydrogen hardware is never drawn as existing: planned components are drawn apart from the airframe, marked as planned, and labelled with approximate positions. The hero's light streams are allowed because they read as light, not as an object.

**Charts:** inline SVG; hydrogen highlighted in Electric Blue with a soft blue glow, batteries in Frost; hover and keyboard readout, a slider for touch, and "Show the numbers". Fig. 01 and Fig. 02 are numbered. Fig. 03 (Testbed) and Fig. 04 (fuel cell) are numbered too.

**Footer:** on the band colour; team lines left, ΛRGO wordmark right. No email in the footer: the Contact card right above it already shows it (on every page).

## 6. Motion

Lenis (`lenis@1.1.20`) for smooth scrolling and GSAP with ScrollTrigger (`gsap@3.12.5`) for scroll scenes, from CDNs at pinned versions. The page is complete without them.

| Moment | What happens |
|---|---|
| **Hero, first second** | A WebGL shader draws the LiDAR beam: a fan of laser lines from a source under the navigation, blue at the source and warm where they land on a forest canopy, traced as one bright contour. LiDAR returns scatter in the crowns where the beam lands (dense near the canopy line, thinning deeper), with a faint cool scatter along the rest of the canopy. The beam ignites and opens, the navigation and the words rise in. About 1.6s. The beam leans towards the pointer (up to about ±0.05 rad, fine pointers only), and the words drift up a little as the page scrolls away. "On hydrogen." brightens softly where the beam's light crosses it, following the beam as it swings with the pointer (none under reduced motion). |
| **Curtains** | Band sections (Simulation, Contact) arrive as a rounded panel that widens to full bleed. |
| **Our mission** | Fig. 01 draws itself as it arrives (rotor rings, frame, callouts, then the dashed planned parts with the tank glowing) and tilts a few degrees towards the pointer. Once the vision line is in view, it lights up word by word from Slate to Frost on its own, in about 1.2s (a timed play-through, never tied to the scroll, so it always ends fully Frost). The pool of light under Fig. 01 widens and brightens as the section arrives. |
| **The Hydrogen Advantage** | The horizon stays still (its copies live in the tiles' pre-blurred glass). Each advantage tile animates its own figure every time it scrolls into view (in either direction), on hover, and on tap on touch devices; a replay restarts the figure, never stacks: the hydrogen bar grows; the CO₂ strike draws and the H₂O pill lights; the battery packs drain one after another (the swap arrow pulses) while the tank drops only slightly; the drone flies the row and each tree lights as the scan passes. Reduced motion shows static frames (three packs empty, the fourth partly full; the drone halfway, half the trees lit). The shared button opens the tile text with a 0.45s height transition, instant under reduced motion. |
| **Simulation** | The chart draws itself once it comes into view: the battery line, then the hydrogen line, then the saving area, the break-even dot and the labels. The hover crosshair, the slider and "Show the numbers" work as before. The page never holds still. |
| **Story** | The point clouds are revealed by a laser sweep from left to right as each drawing comes into view. In the panorama the drones then ease to wherever the visitor moves them (instantly under reduced motion), and their beams light up the returns beneath. The chain of consequences draws itself link by link. The method names rise in one after another, then the first drawing builds up part by part (opacity only). The solution illustration builds once: the forest, the aircraft settling in, the scan cone and its lit returns, then the leaders and the three targets. |
| **Contact** | The sunrise comes up behind the cards (scrubbed). |
| **Drivetrain page** | The heading, the emblem and each figure's panel rise in once. Inside Fig. 03 the propellers idle and the connections flow, inside Fig. 04 the particles flow; both run only while on screen and hold while the page scrolls (going on 200ms after it stops), as their own scripts do. Reduced motion: still figures. |
| **VTOL** | Text and list rise in; hovering or focusing a row opens it with a spring and reveals its drawing. |
| **Pointer** | No light follows the pointer across the page. Tiles and cards lift and brighten under the pointer, with a soft light inside the card under it; primary actions are magnetic. Fine pointers only. |
| **Navigation** | The current-page bar stays still; the progress line follows the scroll; a glint travels along the border of "Get in touch" about every 7 seconds and its arrow slides on hover. Under reduced motion: no sweep. |
| **Read more** | The Advantage tiles grow and shrink inside their reserved space with a 0.45s height transition (`grid-template-rows` 0fr to 1fr) and the text fades in; they are fully drawn on every frame (checked frame by frame). Nothing below moves, so no scroll positions need recalculating. The market panel in the Story opens with the same 0.45s height transition. The chevron turns 180°. Closed text is hidden from screen readers. Instant under reduced motion. |
| **Always** | The props in Fig. 01 spin and the diagram's dashed lines flow, but only while they are on screen and the page is still: while the page scrolls they hold, and 200ms after it stops they go on where they stopped (as on the drivetrain page). Each propeller pauses on its own when it leaves the screen. They pause through their Animation objects, so holding restyles nothing. |

**Rules**
- Custom ease-out `cubic-bezier(0.23, 1, 0.32, 1)` and GSAP `expo.out`/`power3`. No bounce. Each entrance runs once.
- Motion serves the story: a scrubbed move follows the reader's scroll only for light in the background (the sunrise, the pool under Fig. 01); text and figures never depend on where the scroll stops: an entrance builds a figure or lights a line once, on a timer, and always finishes. Nothing loops for decoration.
- No section holds the page in place.
- Interactions people repeat (the method list, cards, buttons) answer in 0.2–0.3s with CSS transitions, so they retarget when the pointer moves on.
- **Performance:** never let a height change move long content below it: reserve the space (as under the Advantage tiles), so only the changing element is laid out. Scene layers in a section that changes height are sized and placed in px, not %. Glass that resizes or sits on moving content uses the pre-blurred approach, and nothing it copies may move with the scroll (measured: the horizon's scroll rise doubled the frame time, so the horizon stays still). Endless loops (the propellers, the scroll cue) run only on screen and while the page is still (off screen this halves the page's main-thread work). Elements that fade in over composited content get their own layers from the start. **Anything a script scales gets its own layer from the start** (`will-change: transform`): otherwise Chrome repaints it at every new size (the pool under Fig. 01 did, on every scroll frame while Our Mission came on screen). **Entrances clear the transforms they leave** on parts inside Fig. 01's 3D context (`clearProps`), or each part stays a separate layer. A scene's fade mask sits on the pseudo-element that carries its lights, never on a scene with a composited child (that costs a full-section mask layer). Measured on one pass through Our Mission: tiles painted down about 15 % and layer area down 17–18 % on desktop and phone.
- The shader renders below device resolution and pauses as soon as the hero leaves the screen (measured: keeping it running half a screen longer made 29–30% of frames miss 144 Hz while scrolling Our Mission, against about 9%) or when the tab is hidden; without WebGL the hero falls back to a static gradient. Once running, the shader also draws the hero's 56px fade to Ink and the grain (the same grain image and overlay blend at 6%), so neither is a CSS layer blended over the moving canvas every frame; without WebGL or JS they stay as CSS. The hero's words, their glow and the lockup's shadow form one fixed layer (`will-change: transform`): painted once, only moved while scrolling.
- In-page links scroll through Lenis and move keyboard focus to the target; Page Up/Down, Space, Home and End go through Lenis too.
- **Reduced motion:** no Lenis, no GSAP scenes and no scrubbing; the hero shows one still frame; drawings, the chart, the chain and point clouds appear complete; the vision line is Frost from the start; the method stage swaps with a short fade and no travel; Read more opens instantly; content fades in briefly.
- **Fig. 01 is its own compositor layer** (`will-change: transform`), so the pointer tilt and the parallax move the drawing as one piece; without it the small fuel cell and battery boxes flicker against the tank.
- **Fig. 01 is self-contained:** one element (`#fig01`) whose styles do not depend on the hero.

## 7. Layout

- **Hero (one screen):** centred: the TEΛM ΛRGO lockup, the headline "The power to go further. On hydrogen." and the line under it, over the LiDAR beam and the forest canopy, which run the full width. No buttons or stats; a quiet scroll cue at the bottom.
- **Our mission (ground):** the section label "Our mission" (as the h2) and the vision line set large on columns 1–5; Fig. 01 (the team's real DJI S800 EVO, traced to scale, with the planned tank, fuel cell and buffer battery dashed) on columns 6–12, inside the grid's right edge.
- **The Hydrogen Advantage (ground):** the centred heading, the shared Read more button and the hub lines, then the four advantage tiles over the horizon.
- **Simulation (band):** text beside Fig. 02 with the flight time slider and "Show the numbers".
- **The story (ground):** heading and intro; the point-cloud panorama, with the market details panel ("Target markets and operations", "Two markets, one airframe") that opens under it; **the unsolved problem** (the heading across the page, the two paragraphs side by side with the chain of consequences under the second, then "Why current methods fall short" with the method list on five columns and its stage on seven); **the solution** directly below as the answer (a two-sentence statement beside the solution illustration). The heading matches the Simulation heading in size, so the heading, intro and the whole panorama fit on one screen (checked at 1440×900 and 1280×800). The panorama stays the main image.
- **Link band (end of the Story):** the centred link to /drivetrain. The main page's story ends here.
- **Contact (band):** heading, subtitle, three equal contact cards; then the footer.
- **The drivetrain page (`drivetrain/index.html`, teamargo.eu/drivetrain):** **The Kingfisher Project (ground):** the section label, the page's h1 (set at the section-heading size) and the intro on columns 1–8, the emblem (rotated 180°, 300px tall, captioned) on columns 10–12; then Fig. 03 and Fig. 04 on their dark blue panels, 72px apart. **Future project: the fixed-wing VTOL (ground):** the section label and heading across the page (columns 1–9), then the two paragraphs (19px, as the main page's section text) on columns 1–5 beside the use-case list on columns 7–12, the list starting and ending with the text, so the whole section fits one screen at 1440 × 900 (one column at 1060px and below); then Contact and the footer, the same as on the main page. The navigation, progress line, Contact and footer behave exactly as on the main page; the wordmark leads to the main page.
- **Menu:** Home · Drivetrain (page links), plus "Get in touch".
- **Pages:** the main page (`index.html`) and the drivetrain page (`drivetrain/index.html`). The navigation, the Contact section and the footer exist on every page and must be changed in all of them. A new page lives in its own folder (`team/index.html` for teamargo.eu/team), uses root-relative paths (`/styles.css`, `/script.js`), and gets a link in both nav lists of every page; on its own page that link carries `aria-current="page"`.
- Max content width 1240px, 24px side padding (20px on phones, 16px at 380px and less). Section spacing about 152px (about 96px on phones).
- **One page grid for every section:** 12 columns between the same two edges (117 and 1309px at 1440; 357 and 1549px at 1920), gutter 40px (24px at 1060px and below). Text beside a figure always splits 5 | 7 columns (Our mission, Simulation, the method list, the solution); two text columns split 6 | 6 (the problem paragraphs, the market card); the four Advantage tiles take three columns each and the three contact cards four each. Nothing bleeds past the edges.

## 8. Do's and Don'ts

**Do**
- Design every new element for the dark ground and check its contrast against the surface it actually sits on
- Give each colour its one job: Electric Blue for hydrogen, Cantaloupe for the action
- Let light come from hydrogen; keep line art as line art
- Lead each section with a figure, drawing or big number
- Draw planned things dashed, existing or modelled things solid
- Keep Fig. 01 self-contained

**Don't**
- Add light sections or a light theme (the site is dark only)
- Put blue on orange or orange on blue, or white text on either
- Use colours outside the palette, or orange as a fill or decoration (warm light is allowed only as light; see Gradients and light)
- Add patterns, grids or line motifs to section backgrounds
- Put gradient fills on text or wordmarks (the trial "On hydrogen." gradient is the only exception), or text over bright light
- Use photographs, photorealistic or CAD renders, or 3D models of drones or hardware (captioned isometric line illustrations are allowed; see Illustrations)
- Pin sections in place, or make placeholders look clickable
- Let a light follow the pointer across the page

## 9. Responsive Behaviour

Desktop (1280px and wider) is the reference and is never changed by the rules below; every responsive rule sits under `max-width: 1279.98px`. Checked at 360×800, 390×844, 768×1024, 1024×768, 1180×820 and 1280×800.

| Width | Composition |
|---|---|
| 901–1279px (tablet landscape) | The desktop layout on a tighter grid (gutter 32px): Our mission, the problem, the method list, the solution and the drivetrain head stay side by side; the full navigation stays. Small figure labels are raised to a reading size. Fig. 04's specification line moves into its readout, and on touch its parts list keeps one column. Band curtains start from a 12px inset (3% of a narrow window would cut into the text). |
| ≤ 1100px | Advantage tiles two by two, hub lines hidden, **no reserved space** (on two rows it would stand empty): Read more lets the section grow. Simulation and VTOL stack. |
| ≤ 900px (tablet portrait) | One column, text first and its figure under it. Nav: wordmark, "Get in touch" and "Menu"; the menu is a full-height sheet under the bar with the page links large (the current page underlined in Cantaloupe) and "Get in touch" as the last row; the page behind holds still. The chain of consequences runs down the page. Market card stacks (drawing under a hairline). Contact: the email card across the top, LinkedIn and Instagram under it. Lighter effects: no live backdrop blur (panels become a denser tint, the Advantage tiles skip the pre-blurred glass), and the hero beam draws 64 laser lines instead of 104, sparser LiDAR returns and at 0.62 instead of 0.85 of device resolution. |
| ≤ 880px | Fig. 03 and Fig. 04 switch to their own vertical versions (their scripts) |
| ≤ 600px (phones) | Side margins 20px (16px at 380px and less). "Get in touch" leaves the bar (it is in the menu). Fig. 01 crops to the drone and its labels move into a key under it. Advantage tiles one per row. Fig. 02's numbers are set larger in the chart and the slider takes the full width. **The panorama** runs 880px wide and scrolls sideways under the finger; the drone over the middle of the view follows it; a tap on a side or a chip opens its details. The solution drawing crops to the aircraft and forest with its three labels in a list under it. Contact cards one per row; the footer ends on the wordmark across the page. VTOL rows are as tall as their names (wrapping to two lines) and the open row adds its drawing; tap to open. Fig. 03 and Fig. 04 run 12px from the screen edges. |

- The page never scrolls sideways (the drivetrain section clips its wide glows); diagrams get a dedicated narrow version instead.
- **Touch:** nothing depends on hover. The hero beam sways slowly on its own (about ±7° over 11 s; still under reduced motion); the method names, VTOL rows, panorama halves and chips, and the figures' parts all answer a tap. Touch targets are at least 44px (the wordmark, page links, chips and "Show the numbers" reach it with an invisible hit area, so the desktop look is unchanged).

## 10. Writing

- **Clear, formal, concise technical English**: complete terms ("net-zero emissions targets"), the passive voice where natural, full sentences that flow. No hype words, no exclamation marks, no em dashes, British English.
- **Goals are goals.** Anything not built or measured is written as a target, conditional or in the future tense.
- **Short paragraphs:** three sentences at most, but sentences may be long.

## 11. Prompt Guide (for AI tools)

- Dark only: ground Ink `#060A0D`, surfaces Shell `#0E1419` and Wing `#161E25`; text Frost `#EEF2F5` / Mist `#B9C3CB` / Slate `#8C98A2`.
- Hydrogen: Electric Blue `#0297DE`, with a soft blue glow. Action: Cantaloupe Orange `#FC734D` with Ink text. Blue and orange never touch; text on either is always Ink.
- Inter only: Bold 700 for headings and figures, Light 300 for large intro text, Regular 400 for body. Blue glow from hydrogen, warm glow only as light; every section its own lit scene, never flat black and never patterned; no gradient text; dashed = planned.
- Example: "A panel on Shell `#0E1419` with a 6px radius and no border; inside, a line drawing of the testbed in Frost strokes, the planned hydrogen tank dashed in Electric Blue, and Inter labels in Slate underneath."
