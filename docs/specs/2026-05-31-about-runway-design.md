# ABOUT Section Runway ML Style Option C Redesign Specification

**Date:** 2026-05-31
**Author:** Antigravity Portfolio Specialist
**Status:** Approved by User

---

## 1. Goal & Context
The current scroll chapters design for the ABOUT section is perceived by the user as too centered, with overly large typography, and lacking clean minimalism. 

This specification refactors the ABOUT section into **Option C (Runway Asymmetric 2-Column & Wire Tag Layout)**. It addresses:
- **Centeredness:** Shifts from a single centered block layout to an asymmetrical 2-column grid layout (Left Column: Small Section Title, Right Column: Left-aligned content).
- **Font Size:** Reduces the bio statement text size by ~40% (down to a clean 20px) and standardizes other typography sizes.
- **Clutter / lack of clean minimalism:** Replaces thick實心 backgrounds on skill tags with transparent backgrounds and ultra-fine border wireframes that dynamically light up on hover.

---

## 2. Component Design & Changes

### A. HTML Restructuring (`public/index.html`)
Each `.about-chapter` will be restructured to hold a grid split:
1. `.about-chapter-label` (Left Column): Small, uppercase label anchored to the left.
2. `.about-chapter-content` (Right Column): All timelines, skill dashboards, and tag clouds left-aligned.

```html
<div class="about-chapter" data-reveal data-stagger>
  <div class="about-chapter-label">
    <p class="label">Experience</p>
  </div>
  <div class="about-chapter-content">
    <ul class="experience-list">
      <li class="stagger-item">...</li>
    </ul>
  </div>
</div>
```

### B. CSS Refinements (`public/style.css`)
- **Dual-Column Grid:** Implement `.about-chapter` with `display: grid; grid-template-columns: 220px 1fr; gap: 48px; align-items: flex-start;`.
- **Typography Reductions:**
  - `.about-bio-text`: `font-size: 20px; font-weight: 400; line-height: 1.5; max-width: 760px; color: var(--ink);`
  - `.experience-list strong`: `font-size: 15px;`
  - `.experience-list em`: `font-size: 12px;`
- **Wireframe Tags:**
  - `.skill-cloud span`: `background: transparent; border: 1px solid var(--soft-line); font-size: 12px; padding: 6px 12px; color: var(--slate); font-weight: 500; transition: all 250ms ease;`
  - `.skill-cloud span:hover`: `border-color: var(--ink); color: var(--ink);`
- **Responsive Adaptations:**
  - Under `860px`, collapse the dual-column grid into a single column (`grid-template-columns: 1fr;`) and reset paddings for small screens.

---

## 3. Verification Plan
- **Structural Integrity:** Ensure all 5 chapters render in precise asymmetric dual-columns on desktop screen widths (> 860px).
- **Responsive Stacking:** Check that the columns cleanly wrap to a single column on mobile viewport widths (< 860px).
- **Typography Verification:** Visually inspect that bio text is compact (20px) and tag wireframes render with thin 1px borders and transparent backgrounds.
