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
| Seagrass and water in the Story | Sea blue `#7FB2FF` (in use, to be confirmed) |

**Ratio:** about 84% Ink and dark surfaces, 9% light text, 4% Electric Blue, 3% Cantaloupe. Blue and orange stay small and roughly equal.

### Blue and orange never touch
- Blue is never placed on orange and orange never on blue, including their hover tints.
- When both appear on one screen (the orange button beside the blue tank in Fig. 01), at least 16px of Ink or a neutral surface separates them.
- Text on blue or orange is always Ink. White text fails on both (2.88:1 on blue, 2.42:1 on orange).

### Gradients and light
- Soft radial glows at 7–55% opacity behind content, never over text at full strength. Blue glows for hydrogen; warm glows only as light (see Visual Theme).
- A faint grain texture on sections.
- **No section patterns.** No grids, line motifs or textures beyond the grain.
- **Section scenes.** Each section has a tinted field (a vertical gradient between Ink and a deep blue or warm dark) and one or two light sources. Scenes fade to Ink or Shell at their edges so sections meet without a seam.

| Section | Scene | Light |
|---|---|---|
| Hero | The LiDAR beam over a forest at night | The shader (see Motion) |
| Our mission | A light table at night | The canopy's warm afterglow at the top, a pool of hydrogen light under Fig. 01 with its reflection below, a cool haze behind the vision line; field Ink to `#081520` |
| The Hydrogen Advantage | A planet's horizon | One continuous band of blue light under a blue rim of horizon, which passes behind the glass tiles. Blue only: the section is about hydrogen, and blue means hydrogen; the warm horizon is kept for Contact, the action |
| Simulation (band) | The chart room | A deep blue field rising to the lower right, a cool desk light on the text, and a long beam along the hydrogen line's direction that brightens as the flight time runs |
| The story: panorama | Dusk over land and sea | A low band of evening light, leaf light over the forest half, sea light over the water half |
| The story: the problem | Under the canopy | Darker; one cold light from above, and the method stage's own light, which takes the colour of the method shown (cold sky, warm exhaust, a fading grey, a pale streak) |
| The story: the solution | Daybreak | Warm light low behind the forest, hydrogen light on the aircraft, leaf light where the scan lands |
| Contact (band) | Sunrise | Warm light rising behind the cards with a warm rim of horizon, the night's blue still in the upper left |

- Every text colour is measured against the scene it sits on (see Accessibility).
- Shadows are soft, long and tinted with Ink; only things that float (menus, the phone menu sheet) carry them.
- **Gradient text is not used.** Text is always one solid colour.

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

- **Scenes checked (round 5, 2026-11-04):** 322 text elements below the hero measured against the rendered scenes at 1440 and 1920px (the 92nd-percentile background pixel behind each); all pass AA. Lowest: 5.26:1, the 10.8px labels inside the Advantage figures. The only flag is "CO₂", where the strike line deliberately crosses the word ("No CO₂" is also written beside it).
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
| Section label | Inter | 600 | 15–17px | Sentence case, 36×3px bar before it in Electric Blue |
| Section heading (H2) | Inter | 700 | 28–44px | Line height 1.1, letter-spacing −0.025em |
| Block heading (Story) | Inter | 700 | 22–34px | With a small accent label above it ("The unsolved problem") |
| Subheading (H3) | Inter | 700 | 22–28px | "The Hydrogen Advantage" |
| Card heading (H4) | Inter | 700 | 17–22px | Letter-spacing −0.015em |
| Big figure / key figure | Inter | 700 | 28–80px; up to 160px for a single key number | Tabular figures, letter-spacing −0.045em at the largest sizes; counts up on entry |
| Intro | Inter | 300 | 20–26px | Line height 1.4. The only place Light is used |
| Body | Inter | 400 | 16–18px (17px default) | Line height 1.6, up to about 65 characters per line |
| UI (nav, buttons, labels) | Inter | 500–600 | 13–16px (15px default) | Sentence case |
| Drawing annotation / data | Inter | 500 | 10–13px | Inside figures, callouts, chart ticks and table headers only; tabular figures; at least 13px as rendered on a phone |

- **Inter is the only typeface.** Bold for headings and figures, Light only for large intro text, Regular for body text. Light was tested for body text and rejected: its thin strokes read worse on the dark ground.
- Inter is self-hosted: the variable font `assets/fonts/InterVariable.woff2` (licence in `assets/fonts/LICENSE.txt`), preloaded, with `font-display: swap` and the optical size axis on. No font is loaded from Google.
- **Method names (Story):** Inter 700 at the Section heading size, in a vertical list; the chosen one in Frost, the others in Slate.
- No index numbering (01, 02, 03) in the running layout.

## 5. Components

**Navigation:** transparent at the top, translucent with a hairline once scrolled; ΛRGO wordmark, page links, one primary button. There is no theme toggle. The links lead to pages, not sections: Home (`/`) and Drivetrain (`/drivetrain`), with more pages (for example Team and Partners) added as further links in the same list, in the bar and in the phone menu. The link of the current page is marked `aria-current="page"` in the HTML and carries a small Frost dot under it; the dot does not follow the scroll. "Partner with us" leads to the Contact section of the page it is on. "Partner with us" carries a small arrow that slides on hover, and every few seconds a slow glint of light travels along its border (never across the label, which keeps its full contrast). The wordmark is never changed. On phones "Menu" opens a full-height sheet with the page links (the current page underlined in Cantaloupe) and "Partner with us" as the last row.

**Link band (main page):** after the solution, one large bold link centred on the page, "Explore the Kingfisher Project", in Inter 700, underlined in Cantaloupe, with a decorative arrow that slides on hover. It leads to /drivetrain. No image.

**Buttons:** primary buttons are Cantaloupe with Ink text, 4px radius, Semibold 600, at least 48px tall (44px for the small nav button). The primary button is lit like a lamp: a warm top edge, its own soft warm light below it, and a highlight that follows the pointer. Hover Orange hover `#FD8D6E`, press `scale(0.97)`, magnetic on fine pointers. Secondary buttons are translucent Wing with Frost text and a lit top edge. Hover styles only on devices that can hover.

**Panels:** 6px radius, glass: a translucent dark Shell over the scene's light, blurred, with a thin lit rim and no coloured border. Used for Fig. 02, the advantage tiles, the market cards in the panorama's details panel, the solution illustration, the diagram, the use-case tiles and the contact cards. Under Reduce Transparency or Increase Contrast they become solid Shell.

**Advantage tiles (Mission):** a small figure and the bold title, centred, with two title lines reserved while the tiles sit side by side so the four texts start level; the text sits behind one shared "Read more" / "Show less" button that opens all four tiles together. The button sits centred under "The Hydrogen Advantage", on the hub line's stem, so opening the tiles only adds height below it and it never moves. Thin hydrogen-coloured hub lines draw out once from it to a small dot on each tile (desktop only). All four figures share one 220 × 88 box, so the titles line up: energy-density bars with their kWh/kg values; a crossed-out CO₂ pill beside a lit H₂O pill ("Only water vapour"); four battery packs with swap arrows above one long hydrogen tank; a drone scanning a row of point-cloud trees. Thin lines, 10px Inter labels in Slate, hydrogen in Electric Blue, battery and "not present" in Slate.

**Story blocks:** an accent label, a statement heading, short text, and a figure (point-cloud panorama, the method list, the solution illustration).

**Panorama (Story):** interactive. Each drone moves along its own survey line (the forest drone over the land half, the coastal drone over the water half), following the pointer on desktop, a drag, a sideways swipe on touch (vertical scrolling still works) or the arrow keys, Home and End on a focused drone. Faint returns are drawn everywhere; bright returns show only inside each moving beam. Each drone is a slider for screen readers ("Forest survey drone", "20% across the forest"); a hint in the caption reads "Drag to move the drones · Click a side for details" or, on touch devices, "Swipe to move the drones · Tap a side for details". A click or tap on a half (a press that moves no more than 5px; anything further is a drag) or on its key chip opens the market details panel under the panorama: that half's drone glides to the centre of its survey line, the other half (points, water, cone and drone) fades to 35%, and mouse hover stops moving the drones until the panel closes. The other half switches the panel to its market; the active half or chip again, or Escape, closes it and restores the scene. The key chips "Terrestrial" and "Blue carbon" are buttons (`aria-pressed`, `aria-controls` the panel), pills with a 1.5px border that takes the market colour when pressed.

**The unsolved problem (Story):** reads top to bottom as one argument, on the page grid. The heading runs across the page; below it the two paragraphs stand side by side (six columns each); under both, in one row, the chain of consequences: Inaccurate data, Significant financial risk, Corporate greenwashing, an ordered list with a ring before each step (the last ring filled) and a short line leading to the next. Then the subheading "Why current methods fall short" (Inter 700, 22–28px, Frost: one step below the 34px block heading) and the method list.

**Method list (Story):** the four methods (Satellite, Helicopter, Battery drone, Fixed-wing drone) as large names in a vertical list on columns 1–5, starting on the grid's left edge; the stage on columns 6–12 shows the chosen method's line drawing across the stage's full width (to the grid's right edge), its one-line verdict (Frost, intro size) and its full caption (Mist, body size). Hovering, focusing or clicking a name chooses it; the others fall back to Slate and a Frost bar slides beside the chosen one, in the margin just left of the grid edge. Built as tabs: the list is a vertical `tablist`, each name a `tab`, each stage a `tabpanel` (focusable, since it holds no control); the arrow keys, Home and End move between names, and only the chosen name is in the tab order. The stage cross-fades in 0.2s. The stage's light takes the method's colour (see Section scenes). In the drawings, lines keep their screen weight and labels are 10 units (about 21px on screen). Without JS the list is hidden and the four methods stand two by two, each with its name.

**Market details panel (under the panorama):** the label "Target markets and operations" and a small heading "Two markets, one airframe.", then the active market's card across the full content width. On desktop the card has two columns: on the left a short coloured bar in the market's colour (to be decided, see Colour meaning), the tag, the title, a one-line summary and the three facts (Target, Operation, Data output) as label-and-text rows; on the right that market's point-cloud drawing, vertically centred, with its colour-keyed legend and caption underneath. At ≤ 960px the card stacks, text first, then the drawing below a hairline. The panel opens and closes with a 0.45s height animation; switching markets snaps to the new card's height and fades the card in over 0.2s. The drawing's laser sweep plays each time its card opens or is switched to. Without JS both cards show. Under reduced motion everything changes instantly.

**Solution illustration (Story):** one drawing in the method-card style beside the solution statement: an orthographic side view of the DJI S800 EVO testbed from its left, flying left to right low over point-cloud trees. Proportions follow DJI's manual (as Fig. 01); the near and far arms, motors and rotors overlap from this side, so three rotor positions show. The airframe (frame, arms, motors, rotors, landing gear) is solid and drawn small (0.12 units per mm), centred over the scan cone. The only planned part shown is the LiDAR sensor, dashed, hanging under the centre of the frame behind the near landing-gear leg. Its scan cone lights up the trees in the panorama's dot style: every tree has a dotted trunk and branches; inside the cone the canopy, trunk and ground points are lit, outside they stay soft and unlit (soft canopy, neutral trunk dots, a dotted ground line). Three labelled targets, each with a dashed leader to its part: Hours of endurance (the centre frame), LiDAR sensor (the sensor), Centimetre accuracy (a lit canopy point). It builds up once as it arrives (see Motion). The caption names it as an illustration of the planned hexacopter. On phones the labels move into a list under the drawing, and the drawing crops to the aircraft and forest. Under the text and the figure, centred across both (after the figure on phones), one quiet line of body text: "The drivetrain that would power it is being developed in the Kingfisher Project." The link band follows with its own hairline and spacing.

**Drivetrain diagram nodes:** all five boxes share one style (panel fill, one stroke weight, no glow or dashes). Meaning lives in the connections: the hydrogen line between tank and fuel cell is the only Electric Blue dashed line.

**Use-case tiles (VTOL):** five separate tiles, each with a pictogram and its name; a scan line sweeps across the tile on hover. They are separate applications of a modular drone, not stops on one route.

**Contact cards:** Email, LinkedIn and Instagram as three equal glass cards (channel name, value in Inter 700), each a link with a Cantaloupe arrow in its corner. Email opens `mailto:contact@teamargo.eu`; LinkedIn ("Team Argo", https://www.linkedin.com/company/team-argo/about/) and Instagram ("@argodrones", https://www.instagram.com/argodrones/) open in a new tab, which screen readers announce ("opens in a new tab"). On hover a card lifts, a soft light follows the pointer inside it and the arrow slides out.

**Planned components:** the testbed components carry no status chips; the "Planned architecture" title marks them as planned.

**Illustrations:** captioned "Illustration"; informative drawings have a text description; decorative figures are `aria-hidden`. Never draw a VTOL airframe. Isometric technical line illustrations of the testbed are allowed when they are drawn as line art in the figure style (Frost strokes on the dark ground), built from stated or measured dimensions, and captioned as an illustration, for example "Illustration of the planned architecture". Photorealistic renders, CAD renders and shaded 3D models of drones or hardware are not used. Hydrogen hardware is never drawn as existing: planned components are drawn apart from the airframe, marked as planned, and labelled with approximate positions. The hero's light streams are allowed because they read as light, not as an object.

**Charts:** inline SVG; hydrogen highlighted in Electric Blue with a soft blue glow, batteries in Frost; hover and keyboard readout, a slider for touch, and "Show the numbers". Fig. 01 and Fig. 02 are numbered. Fig. 03 (Testbed) and Fig. 04 (fuel cell) are numbered too.

**Footer:** on the band colour; team lines left, ΛRGO wordmark right. No email in the footer: the Contact card right above it already shows it (main page; the drivetrain page still has it until that page is updated).

## 6. Motion

Lenis (`lenis@1.1.20`) for smooth scrolling and GSAP with ScrollTrigger (`gsap@3.12.5`) for scroll scenes, from CDNs at pinned versions. The page is complete without them.

| Moment | What happens |
|---|---|
| **Hero, first second** | A WebGL shader draws the LiDAR beam: a fan of laser lines from a source under the navigation, blue at the source and warm where they land on a forest canopy, traced as one bright contour. LiDAR returns scatter in the crowns where the beam lands (dense near the canopy line, thinning deeper), with a faint cool scatter along the rest of the canopy. The beam ignites and opens, the navigation and the words rise in. About 1.6s. The beam leans towards the pointer (up to about ±0.05 rad, fine pointers only), and the words drift up a little as the page scrolls away. |
| **Curtains** | Band sections (Simulation, Testbed, Contact) arrive as a rounded panel that widens to full bleed. |
| **Our mission** | Fig. 01 draws itself as it arrives (rotor rings, frame, callouts, then the dashed planned parts with the tank glowing) and tilts a few degrees towards the pointer. Once the vision line is in view, it lights up word by word from Slate to Frost on its own, in about 1.2s (a timed play-through, never tied to the scroll, so it always ends fully Frost). The pool of light under Fig. 01 widens and brightens as the section arrives. |
| **The Hydrogen Advantage** | The horizon rises behind the tiles as the section comes up (scrubbed). Each advantage tile animates its own figure every time it scrolls into view (in either direction), on hover, and on tap on touch devices; a replay restarts the figure, never stacks: the hydrogen bar grows; the CO₂ strike draws and the H₂O pill lights; the battery packs drain one after another (the swap arrow pulses) while the tank drops only slightly; the drone flies the row and each tree lights as the scan passes. Reduced motion shows static frames (three packs empty, the fourth partly full; the drone halfway, half the trees lit). The shared button opens the tile text with a 0.45s height transition, instant under reduced motion. |
| **Simulation** | The chart draws itself once it comes into view: the battery line, then the hydrogen line, then the saving area, the break-even dot and the labels. The hover crosshair, the slider and "Show the numbers" work as before. The page never holds still. |
| **Story** | The point clouds are revealed by a laser sweep from left to right as each drawing comes into view. In the panorama the drones then ease to wherever the visitor moves them (instantly under reduced motion), and their beams light up the returns beneath. The chain of consequences draws itself link by link. The method names rise in one after another, then the first drawing builds up part by part (opacity only). The solution illustration builds once: the forest, the aircraft settling in, the scan cone and its lit returns, then the leaders and the three targets. |
| **Contact** | The sunrise comes up behind the cards (scrubbed). |
| **Testbed** | The whole diagram enters once, part by part; the flowing connections then keep running. No pinning. |
| **VTOL** | Tiles rise in; a scan line sweeps a tile on hover. |
| **Pointer** | No light follows the pointer across the page. Tiles and cards lift and brighten under the pointer, with a soft light inside the card under it; primary actions are magnetic. Fine pointers only. |
| **Navigation** | The current-page bar stays still; the progress line follows the scroll; a glint travels along the border of "Partner with us" about every 7 seconds and its arrow slides on hover. Under reduced motion: no sweep. |
| **Read more** | The Advantage tiles open by FLIP: the page is laid out once (at the start of opening, at the end of closing) and the visible motion is compositor-only: each tile's new part is uncovered from the top with a clip, the text fades in, and the section below glides along with a transform, 0.45s with the custom ease-out. Scroll positions are recalculated once, afterwards, when the browser is idle. The market panel in the Story opens with a 0.45s height transition (`grid-template-rows` 0fr to 1fr). The chevron turns 180°. Closed text is hidden from screen readers. Instant under reduced motion. |
| **Always** | The props in Fig. 01 spin and the diagram's dashed lines flow. |

**Rules**
- Custom ease-out `cubic-bezier(0.23, 1, 0.32, 1)` and GSAP `expo.out`/`power3`. No bounce. Each entrance runs once.
- Motion serves the story: a scrubbed move follows the reader's scroll only for light in the background (the horizon, the sunrise, the pool under Fig. 01); text and figures never depend on where the scroll stops: an entrance builds a figure or lights a line once, on a timer, and always finishes. Nothing loops for decoration.
- No section holds the page in place.
- Interactions people repeat (the method list, cards, buttons) answer in 0.2–0.3s with CSS transitions, so they retarget when the pointer moves on.
- **Performance:** never animate the height of something with long content below it (the whole page is laid out and repainted every frame); use FLIP. Scene layers that sit in a section that changes height are sized and placed in px, not %, so they are not repainted. Glass (backdrop blur) is expensive to resize: the one longer frame left when the Advantage tiles open (about 45ms on an Intel UHD laptop) is the glass being resized once; the motion after it holds the frame rate.
- The shader renders below device resolution and pauses when off-screen or when the tab is hidden; without WebGL the hero falls back to a static gradient.
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
- **The drivetrain page (`drivetrain/index.html`, teamargo.eu/drivetrain):** **The Kingfisher Project (band):** heading, intro and the emblem, then Fig. 03 and Fig. 04; **Future project: the fixed-wing VTOL (ground):** text on the left, the five use-case tiles on the right (one column on tablets and phones); then Contact and the footer.
- **Menu:** Home · Drivetrain (page links), plus "Partner with us".
- **Pages:** the main page (`index.html`) and the drivetrain page (`drivetrain/index.html`). The navigation, the Contact section and the footer exist on every page and must be changed in all of them. A new page lives in its own folder (`team/index.html` for teamargo.eu/team), uses root-relative paths (`/styles.css`, `/script.js`), and gets a link in both nav lists of every page; on its own page that link carries `aria-current="page"`.
- Max content width 1240px, 24px side padding (16px on phones). Section spacing about 152px (104px on phones).
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
- Put gradient fills on text or wordmarks, or text over bright light
- Use photographs, photorealistic or CAD renders, or 3D models of drones or hardware (captioned isometric line illustrations are allowed; see Illustrations)
- Pin sections in place, or make placeholders look clickable
- Let a light follow the pointer across the page

## 9. Responsive Behaviour

| Width | Changes |
|---|---|
| ≤ 1100px | Advantage tiles two by two; hub lines hidden |
| ≤ 1060px | Nav links move into "Menu"; VTOL stacks; diagram descriptions two by two; the problem text, the method list and its stage, and the solution stack |
| ≤ 960px | Hero, Simulation and the testbed head stack; the market details panel and contact cards go to one column |
| ≤ 880px | The drivetrain diagram switches to its vertical version |
| ≤ 720px | Single column; method cards one per row; market facts stack; larger text inside drawings; lighter shader resolution |

- The page never scrolls sideways; diagrams get a dedicated narrow version instead.

## 10. Writing

- **Clear, formal, concise technical English**: complete terms ("net-zero emissions targets"), the passive voice where natural, full sentences that flow. No hype words, no exclamation marks, no em dashes, British English.
- **Goals are goals.** Anything not built or measured is written as a target, conditional or in the future tense.
- **Short paragraphs:** three sentences at most, but sentences may be long.

## 11. Prompt Guide (for AI tools)

- Dark only: ground Ink `#060A0D`, surfaces Shell `#0E1419` and Wing `#161E25`; text Frost `#EEF2F5` / Mist `#B9C3CB` / Slate `#8C98A2`.
- Hydrogen: Electric Blue `#0297DE`, with a soft blue glow. Action: Cantaloupe Orange `#FC734D` with Ink text. Blue and orange never touch; text on either is always Ink.
- Inter only: Bold 700 for headings and figures, Light 300 for large intro text, Regular 400 for body. Blue glow from hydrogen, warm glow only as light; every section its own lit scene, never flat black and never patterned; no gradient text; dashed = planned.
- Example: "A panel on Shell `#0E1419` with a 6px radius and no border; inside, a line drawing of the testbed in Frost strokes, the planned hydrogen tank dashed in Electric Blue, and Inter labels in Slate underneath."
