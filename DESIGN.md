# Argo — Design System

Design reference for everything Argo puts out: the website, slides, social media posts and stickers on the drone. Written in the [DESIGN.md](https://stitch.withgoogle.com/docs/design-md/overview/) format so both people and AI tools can follow it.

## 1. Visual Theme & Atmosphere

**Black, white and teal.** Argo looks like a clean engineering drawing: black ink lines on white paper, with a single teal accent. Teal always means one thing: **hydrogen**, and by extension Argo itself.

- **Light first.** Most of the page is white. The team logo is designed for white, so the brand lives there.
- **Dark where the drone is.** Near-black sections echo the dark drone body. That is where the white-and-teal drone emblem (the sticker) appears, exactly as it does on the aircraft.
- **Line art, not glow.** The drone emblem is a line drawing, so every illustration (drone schematics, drivetrain diagrams, charts) is also line art: black ink strokes, teal only for hydrogen parts. No neon, no glows, no gradients, no grid backdrops.
- **Calm and precise.** Generous white space, thin rules, small monospace labels. Confidence comes from restraint, not effects.

**Key characteristics**
- One accent colour (teal), used sparingly
- Heavy geometric headlines that echo the ΛRGO wordmark
- Monospace uppercase labels as the "technical" voice
- Slightly squared corners (4–6px)
- Light sections for the story (mission, roadmap, partners, join), dark sections for the drone and the footer

## 2. Brand Assets

| Asset | Use | File |
|---|---|---|
| **ΛRGO wordmark** (crossbar-less A) | The team name. Navigation bar, footer, slide covers, banners | `assets/argo-wordmark.svg` (vector, black) |
| **Drone emblem** (bird, white + teal) | The drone's logo. Only on dark backgrounds, mainly next to drone content | `assets/argo-drone-emblem.webp` (raster, transparent) |
| **Favicon** (Λ from the wordmark) | Browser tab, small square avatars | `assets/favicon.svg` |

**Rules**
- The wordmark is the team logo. The bird is the drone's emblem. Do not combine them into one lock-up.
- The wordmark is black on light backgrounds and white on dark backgrounds. Never teal.
- The drone emblem is never placed on white (its white outline disappears). On light backgrounds use the black-outline version of the bird.
- Never stretch, rotate, recolour or add effects to either asset.
- Leave clear space around the wordmark of at least the height of its "O".

**Still needed from the designer**
- The bird as a **vector file** (SVG, AI, EPS or vector PDF). The emblem is currently a raster image.
- A **simplified bird** for small and round uses (favicons, profile pictures): fewer feathers, no chest scales.
- The **exact teal codes**. The values below were sampled from the logo files.

## 3. Color Palette & Roles

### Brand
| Name | Hex | Role |
|---|---|---|
| **Argo Teal** | `#007E8A` | Accent on light backgrounds. Hydrogen in diagrams and charts. Primary buttons everywhere. Sampled from the team logo |
| **Argo Teal Bright** | `#0096A2` | Accent on dark backgrounds. Sampled from the drone sticker |
| **Ink** | `#0B0D10` | Headlines and body text on light. Dark section background |
| **White** | `#FFFFFF` | Page background |

### Neutrals
| Name | Hex | Role |
|---|---|---|
| Mist | `#F4F6F7` | Card surfaces on light |
| Graphite | `#2B3138` | Strong secondary text |
| Slate | `#5B6470` | Secondary text and labels on light (5.9:1 on white) |
| Ash | `#8A929C` | Decorative only: dividers, ticks. Not for reading text |
| Night Raised | `#151A20` | Card surfaces on dark |
| Fog | `#9AA4AF` | Secondary text on dark |
| Hairline | `rgba(11,13,16,0.10)` | Borders and rules on light |
| Hairline (dark) | `rgba(255,255,255,0.10)` | Borders and rules on dark |

### Accessibility
- Argo Teal on White: **4.8:1**. Fine for body text and buttons.
- White text on Argo Teal buttons: **4.8:1**.
- Argo Teal Bright on Ink: **5.4:1**. Use Bright, not regular Teal, for teal text on dark.
- White text on Argo Teal Bright: only **3.6:1**. Do not put small white text on Teal Bright. Buttons stay Argo Teal on every background.

### Colour meaning
- **Teal = hydrogen.** Hydrogen tank, hydrogen flow lines, the hydrogen line in charts, the words "On hydrogen", the hydrogen-flight goal.
- **Teal = the main action.** Primary buttons ("Partner with us", "Apply to join").
- **Everything else is black, white or grey.** Batteries, power electronics, status, labels, numbers.
- There is no second accent colour. No amber, no gold, no gradients.

## 4. Typography

| Role | Font | Weight | Size | Notes |
|---|---|---|---|---|
| Display (H1) | Montserrat | 800 | 42–78px | Tight leading (1.04), letter-spacing −0.03em |
| Section heading (H2) | Montserrat | 800 | 32–52px | Letter-spacing −0.025em |
| Card / item heading (H3) | Montserrat | 700 | 19–22px | |
| Body | Inter | 400 | 16–17px | Line height 1.6 |
| Lead paragraph | Inter | 400 | 17–20px | Slate colour |
| UI (nav, buttons) | Inter | 500–600 | 14–15px | |
| Label / eyebrow | IBM Plex Mono | 500 | 11.5–12.5px | UPPERCASE, letter-spacing 0.12em |
| Data / numbers | IBM Plex Mono | 400 | any | Spec values, chart ticks |

**Principles**
- Montserrat at heavy weights echoes the bold, round ΛRGO wordmark. It is for headings only.
- Inter carries all reading text.
- IBM Plex Mono is the engineering voice: labels, numbers, drawing annotations. Always uppercase when used as a label.
- Do not use the wordmark's crossbar-less "Λ" in normal text. It belongs to the logo only.

## 5. Components

**Buttons**
- Primary: Argo Teal background, white text, 4px radius, 48px tall (38px small). Hover: darker teal `#006B75`.
- Secondary: transparent, Ink text, 1px Hairline-strong border, 4px radius. Hover: Ink border.
- No pills, no glows, no gradients.

**Cards**
- Mist background (Night Raised on dark), 1px Hairline border, 6px radius, no shadow.

**Labels / eyebrows**
- Mono, uppercase, Slate. Section labels are numbered: `01 / Why hydrogen`.

**Status chips** (roadmap, placeholders)
- Mono uppercase, 1px border, 4px radius.
- Done: Mist fill, Ink text. In progress: Ink fill, White text. Planned: Slate outline. Hydrogen goal: Teal outline and text.

**Drawings and diagrams**
- Stroke in Ink (White on dark), 1–1.5px. Hydrogen parts in Teal (Teal Bright on dark).
- Batteries and peak power: Ink or grey, distinguished by dash pattern, never by a new colour.
- Engineering-drawing details are welcome: title blocks, callout lines, mono annotations.

**Navigation**
- White bar, ΛRGO wordmark left (20px tall), Inter text links, one small primary button.
- Becomes translucent white with a hairline bottom border on scroll.

**Footer**
- Dark section with the ΛRGO wordmark at full container width as the closing statement.

## 6. Layout

- Max content width 1180px, 24px side padding (16px on phones).
- Section spacing 128px vertical (88px on phones), separated by hairline rules.
- 8px base spacing unit.
- Corner radius: 4px for buttons, chips and small boxes; 6px for cards. Nothing larger.
- Depth comes from surface colour (White → Mist, Ink → Night Raised), never from shadows.

## 7. Do's and Don'ts

**Do**
- Keep most of the page white
- Use teal only for hydrogen and main actions
- Draw everything as clean line art
- Show the drone emblem on dark backgrounds only
- Use the mono font for anything that reads like a measurement or label

**Don't**
- Add a second accent colour (no amber, gold, blue or green)
- Use neon cyan, glows, gradients, grid backgrounds or drop shadows
- Use pill-shaped buttons or large corner radii
- Put the drone emblem on white, or the black-outline bird on dark
- Recolour the wordmark teal
- Use stock photos or AI renders that pretend to be the Argo drone

## 8. Responsive Behaviour

| Width | Changes |
|---|---|
| > 1060px | Full navigation |
| ≤ 1060px | Navigation links hidden, wordmark and primary button stay |
| ≤ 960px | Two-column layouts stack, roadmap becomes vertical |
| ≤ 720px | Single column, larger text in drawings, full-width buttons in call-to-action blocks |

- Wide diagrams scroll horizontally inside their card on small screens; the page itself never scrolls sideways.
- Animations respect `prefers-reduced-motion`.

## 9. Prompt Guide (for AI tools)

Quick reference:
- Background `#FFFFFF`, dark sections `#0B0D10`
- Text `#0B0D10`, secondary text `#5B6470`
- Accent `#007E8A` (light) / `#0096A2` (dark): hydrogen and primary buttons only
- Headings Montserrat 800, body Inter 400, labels IBM Plex Mono uppercase
- 4px radius buttons, 6px radius cards, no shadows

Example prompts:
- "Create a section on white with a mono uppercase label `03 / Roadmap` in #5B6470, a Montserrat 800 heading in #0B0D10, and an Inter paragraph in #5B6470. Hairline rule above the section."
- "Draw a line-art diagram on #0B0D10: white 1.5px strokes, hydrogen path in #0096A2, battery path in #9AA4AF with a different dash pattern, mono uppercase labels."
- "Primary button: #007E8A background, white Inter 600 text, 4px radius, 48px tall. Hover #006B75."
