# ✦ Agency Design System — Obsidian Ember

This document defines the **"Obsidian Ember"** design system for the agency website. It is built on the tension between a warm near-black void and two opposing temperature accents — a searing electric orange and an icy teal — creating a visual system that feels simultaneously industrial and alive.

---

## 1. Aesthetic Direction & DFII

**Aesthetic:** Molten Industrial / Dark Thermal — warm-dark backgrounds, extreme typographic tension, and a hot/cool chromatic duality.  
**DFII Score:** 14/15 (Elite)  
**Differentiation Anchor:** *"If this were screenshotted with the logo removed, how would someone recognize it?"*
> It will be recognized by its warm-charcoal void backgrounds glowing with orange ember heat, the blade-sharp Space Grotesk typography pressed to extreme compression, and the ice-fire chromatic contrast between Electric Orange and Cool Teal — a palette that has zero overlap with any conventional agency aesthetic.

**Baseline Configuration:**
- **Design Variance:** 9 (Off-grid, asymmetric — content breaks containment by design)
- **Motion Intensity:** 9 (Physics-first — spring laws govern everything)
- **Visual Density:** 3 (Observatory Mode — vast negative space, content is spotlit)

---

## 2. Typography

We ban all system defaults and serif fonts. This is a technical aesthetic built for precision.

* **Primary Display (Headers & Hero):** `Space Grotesk`
  * *Styling:* `tracking-[-0.055em]`, `leading-[0.86]`. At large sizes it reads as industrial sculpture.
  * *Google Fonts:* `wght@300..700`
* **Secondary / Body:** `DM Sans`
  * *Styling:* `leading-[1.72]`, color `#A09890`. Warm, quiet, and subordinate to the display type.
  * *Google Fonts:* `wght@300..700`
* **Data / Technical / Labels:** `IBM Plex Mono`
  * *Styling:* Used exclusively for numbers, step counters, version strings, and micro-copy. Rendered in **Teal** `#14B8A6` for functional labels.
  * *Google Fonts:* `wght@400;500`

---

## 3. Dark Theme — Obsidian Ember Palette

*We ban pure black and all purple/blue AI clichés. Our void is warm — it has the weight of forged obsidian.*

| Token | Value | Usage |
|---|---|---|
| **Background Void** | `#080807` | Page background — warm near-black |
| **Surface 1** | `#111110` | Elevated panels, nav background |
| **Surface 2** | `#191917` | Modals, card backgrounds |
| **Surface 3** | `#242422` | Borders, dividers |
| **Text Primary** | `#F5F0EB` | H1/Display — warm white |
| **Text Secondary** | `#A09890` | Body copy — warm mid-tone grey |
| **Text Tertiary** | `#504840` | Placeholder, disabled labels |
| **Accent: Ember** | `#FF4D00` | Primary interactive accent — electric orange-red |
| **Accent: Teal** | `#14B8A6` | Secondary accent — icy cool contrast |
| **Glass Border** | `rgba(255, 77, 0, 0.12)` | Frosted glass edges with ember tint |
| **Glow: Ember** | `rgba(255, 77, 0, 0.08)` | Ambient background warmth |

### Accent Philosophy
The Ember (`#FF4D00`) is our energy source — used for CTAs, active states, and the italic gradient word in the hero. The Teal (`#14B8A6`) is strictly functional — mono labels, step numbers, technical data only. Never use these two colors adjacent to each other; their contrast should be felt across sections, not within a single component.

---

## 4. Backgrounds, Texture & Materiality

* **Film Grain:** Full-viewport `pointer-events-none` overlay at `5%` opacity. Slightly coarser grain — this reads as a cinematic layer, not a subtlety.
* **Ember Atmosphere:** Two enormous slow-moving radial blobs — one ember (`#FF4D00` at 6% opacity, 220px blur) anchored top-right, one deep amber (`#B45309` at 5% opacity, 280px blur) bottom-left. They pulse very slowly with a `breathing` keyframe animation.
* **Glass Panels:** True frosted glass. Inner border tinted ember (`rgba(255,77,0,0.12)`). Box shadow: `0 24px 60px -20px rgba(255,77,0,0.15)`.
* **Gradient Text:** The hero italic word uses `linear-gradient(135deg, #F5F0EB 20%, #FF4D00 100%)` clipped to text — warm white transitioning to ember fire.

---

## 5. Motion Philosophy

* **Spring Baseline:** `type: "spring", stiffness: 75, damping: 16` — slightly slower and heavier than before.
* **Curtain Reveal:** Hero text lines reveal via `clipPath: inset(100% 0 0 0) → inset(0 0 0 0)` — a physical curtain pull, not an opacity fade.
* **Ember Cursor:** The custom cursor dot is orange (`#FF4D00`). The trailing ring turns teal (`#14B8A6`) on interactive elements — a fire/ice swap.
* **Magnetic Pull:** ±25px pull radius on all CTAs.

---

## 6. Layout & Architecture (Anti-Generic)

* **Left-Dock Hero:** Content anchors to the left edge, the massive type overflows the safe zone — it feels physically too large for the container.
* **Breathing Sections:** `padding-y: 200px` on desktop. Never crowded.
* **Anti-Card Doctrine:** No border-radius boxes for content grouping. Sections separated by `border-top` rules and typographic hierarchy.
* **Viewport Stability:** `min-height: 100dvh` everywhere.

---

## 7. Component Token Summary

```
--void-bg:       #080807;
--surface-1:     #111110;
--surface-2:     #191917;
--surface-3:     #242422;
--text-primary:  #F5F0EB;
--text-secondary:#A09890;
--text-tertiary: #504840;
--accent-ember:  #FF4D00;
--accent-teal:   #14B8A6;
--glass-border:  rgba(255, 77, 0, 0.12);
--glow-ember:    rgba(255, 77, 0, 0.08);
--font-display:  'Space Grotesk', sans-serif;
--font-body:     'DM Sans', sans-serif;
--font-mono:     'IBM Plex Mono', monospace;
```
