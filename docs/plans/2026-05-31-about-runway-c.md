# ABOUT Section Runway ML Style Option C Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refactor the ABOUT section in `public/index.html` and `public/style.css` to transition from centered, large-font blocks to an elegant, left-aligned asymmetric 2-column editorial structure with 20px readable, elegant typography and transparent wireframe tags.

**Architecture:** 
- Restructure each `.about-chapter` in `public/index.html` into a grid containing `.about-chapter-label` (left column) and `.about-chapter-content` (right column).
- Define asymmetric grid, clamp bio typography sizes to `20px` max, and style tags with `background: transparent` and borders in `public/style.css`.
- Keep existing stagger animations driven by IntersectionObservers intact.

**Tech Stack:** HTML5, CSS3 transitions, Vanilla ES6 JavaScript.

---

### Task 1: Restructure ABOUT HTML Columns

**Files:**
- Modify: `public/index.html`

- [ ] **Step 1: Update the ABOUT chapters in `public/index.html`**
  Modify the `section#about` block (lines 93 to 215) to nest contents inside the new dual-column wrappers (`.about-chapter-label` and `.about-chapter-content`):
  ```html
    <section id="about" class="about-section">

      <!-- Chapter 0: Bio Statement -->
      <div class="about-chapter" data-reveal>
        <div class="about-chapter-label">
          <p class="label">About</p>
        </div>
        <div class="about-chapter-content">
          <h2 class="about-bio-text">
            I’m Chris Leung, a senior video editor and hybrid creative systems builder. Guided by creative judgement and visual sensibility, and backed by 8 years of production experience, I bring professional craft across post-production and AI, powered by industry-leading tools.
          </h2>
          <div class="about-base-actions">
            <a class="button light-button" href="CV_ChrisLeung.pdf" download>Download CV</a>
            <a class="button ghost-button" href="mailto:crizleung21@gmail.com">Email</a>
          </div>
        </div>
      </div>

      <!-- Chapter 1: Experience -->
      <div class="about-chapter" data-reveal data-stagger>
        <div class="about-chapter-label">
          <p class="label">Experience</p>
        </div>
        <div class="about-chapter-content">
          <ul class="experience-list">
            <li class="stagger-item"><span>2024 — Now</span><strong>You Find Limited</strong><em>Multimedia Designer</em></li>
            <li class="stagger-item"><span>2021 — 2023</span><strong>Online Marketing Genius Company Limited</strong><em>Senior Video Editor</em></li>
            <li class="stagger-item"><span>2018 — 2021</span><strong>Best Video Limited</strong><em>Video Editor</em></li>
            <li class="stagger-item"><span>2015 — 2018</span><strong>Giraffe International Production Limited</strong><em>Videographer</em></li>
          </ul>
        </div>
      </div>

      <!-- Chapter 2: Professional Skills -->
      <div class="about-chapter" data-reveal data-stagger>
        <div class="about-chapter-label">
          <p class="label">Professional Skills</p>
        </div>
        <div class="about-chapter-content">
          <div class="skills-dashboard">
            <div class="skills-dashboard-col">
              <span class="skills-group-label">Post-Production</span>
              <div class="skill-cloud mini-cloud">
                <span class="stagger-item">Video Editing</span>
                <span class="stagger-item">Motion Graphics</span>
                <span class="stagger-item">VFX &amp; Compositing</span>
                <span class="stagger-item">Short-form Editing</span>
                <span class="stagger-item">Color Grading</span>
              </div>

              <span class="skills-group-label">Production</span>
              <div class="skill-cloud mini-cloud">
                <span class="stagger-item">Videography</span>
                <span class="stagger-item">Camera Operation</span>
                <span class="stagger-item">Audio Operation</span>
                <span class="stagger-item">On-set Direction</span>
              </div>

              <span class="skills-group-label">Pre-Production</span>
              <div class="skill-cloud mini-cloud">
                <span class="stagger-item">Creative Direction</span>
                <span class="stagger-item">Pre-production Planning</span>
              </div>
            </div>

            <div class="skills-dashboard-col">
              <span class="skills-group-label">Visual Graphics</span>
              <div class="skill-cloud mini-cloud">
                <span class="stagger-item">Visual Design</span>
                <span class="stagger-item">On-Screen Graphics</span>
                <span class="stagger-item">Lower Thirds</span>
                <span class="stagger-item">Infographics</span>
                <span class="stagger-item">Title Design</span>
                <span class="stagger-item">Subtitle Styling</span>
              </div>

              <span class="skills-group-label">AI Skills</span>
              <div class="skill-cloud mini-cloud">
                <span class="stagger-item">AI Image Direction</span>
                <span class="stagger-item">AI Video Direction</span>
                <span class="stagger-item">Prompt Engineering</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Chapter 3: Tools -->
      <div class="about-chapter" data-reveal data-stagger>
        <div class="about-chapter-label">
          <p class="label">Tools</p>
        </div>
        <div class="about-chapter-content">
          <div class="skills-dashboard">
            <div class="skills-dashboard-col">
              <span class="skills-group-label">Post-Production</span>
              <div class="skill-cloud mini-cloud">
                <span class="stagger-item">Adobe Premiere Pro</span>
                <span class="stagger-item">Adobe After Effects</span>
              </div>

              <span class="skills-group-label">Design</span>
              <div class="skill-cloud mini-cloud">
                <span class="stagger-item">Adobe Illustrator</span>
                <span class="stagger-item">Adobe Photoshop</span>
              </div>
            </div>

            <div class="skills-dashboard-col">
              <span class="skills-group-label">AI Creative</span>
              <div class="skill-cloud mini-cloud">
                <span class="stagger-item">ChatGPT Image</span>
                <span class="stagger-item">Midjourney</span>
                <span class="stagger-item">Nano Banana Pro</span>
                <span class="stagger-item">Veo</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Chapter 4: Personal Skills -->
      <div class="about-chapter" data-reveal data-stagger>
        <div class="about-chapter-label">
          <p class="label">Personal Skills</p>
        </div>
        <div class="about-chapter-content">
          <div class="skill-cloud">
            <span class="stagger-item">Creative Problem Solving</span>
            <span class="stagger-item">Creative Judgement</span>
            <span class="stagger-item">Visual Sensibility</span>
            <span class="stagger-item">Detail-minded Execution</span>
            <span class="stagger-item">Quality Control</span>
            <span class="stagger-item">Project Coordination</span>
            <span class="stagger-item">Deadline Management</span>
            <span class="stagger-item">Client Communication</span>
            <span class="stagger-item">Team Leadership</span>
            <span class="stagger-item">Adaptability</span>
          </div>
        </div>
      </div>

    </section>
  ```

---

### Task 2: Implement Runway Option C Styles

**Files:**
- Modify: `public/style.css`

- [ ] **Step 1: Replace scroll chapter styles in `public/style.css`**
  Modify lines 166 to 306 in `public/style.css` with the asymmetric, fine-aligned grid, typography, and wireframe tags:
  ```css
  /* Scroll Chapter Layout */
  .about-chapter {
    max-width: 1100px;
    margin: 0 auto;
    padding: 80px max(22px, calc((100vw - 1100px) / 2));
    display: grid;
    grid-template-columns: 240px 1fr;
    gap: 48px;
    align-items: flex-start;
  }
  .about-chapter + .about-chapter {
    border-top: 1px solid var(--soft-line);
  }

  .about-chapter-label {
    position: sticky;
    top: 120px;
  }
  .about-chapter-label .label {
    margin: 0;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1.2px;
    color: var(--mid);
    text-align: left;
  }

  .about-chapter-content {
    display: flex;
    flex-direction: column;
    gap: 24px;
    text-align: left;
  }

  /* Bio Statement */
  .about-bio-text {
    font-size: 20px;
    font-weight: 400;
    line-height: 1.5;
    letter-spacing: -0.2px;
    color: var(--ink);
    margin-bottom: 24px;
    max-width: 760px;
    text-align: left;
  }
  .about-base-actions {
    display: flex;
    gap: 12px;
  }

  /* Stagger Animation Items */
  .stagger-item {
    opacity: 0;
    transform: translateY(12px);
    transition: opacity 450ms cubic-bezier(0.215, 0.61, 0.355, 1),
                transform 450ms cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  .stagger-item.is-visible {
    opacity: 1;
    transform: translateY(0);
  }

  /* Experience List */
  .experience-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: grid;
    gap: 0;
  }
  .experience-list li {
    padding: 16px 0;
    border-bottom: 1px solid rgba(0,0,0,0.06);
    display: grid;
    grid-template-columns: 120px 1fr;
    gap: 4px 16px;
    align-items: baseline;
    text-align: left;
  }
  .experience-list li:first-child {
    padding-top: 0;
  }
  .experience-list li:last-child {
    border-bottom: 0;
    padding-bottom: 0;
  }
  .experience-list span {
    font-size: 11px;
    color: var(--mid);
    font-weight: 700;
    letter-spacing: 0.2px;
  }
  .experience-list strong {
    font-size: 15px;
    color: var(--ink);
    grid-column: 2;
  }
  .experience-list em {
    font-size: 12px;
    color: var(--slate);
    font-style: normal;
    grid-column: 2;
  }

  /* Wireframe Skill Clouds */
  .skill-cloud {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
  .skill-cloud span {
    background: transparent !important;
    border: 1px solid var(--soft-line) !important;
    border-radius: 6px;
    padding: 6px 12px;
    font-size: 12px;
    color: var(--slate);
    font-weight: 500;
    transition: all 250ms ease;
  }
  .skill-cloud span:hover {
    border-color: var(--ink) !important;
    color: var(--ink) !important;
  }
  .mini-cloud span {
    padding: 5px 10px;
    font-size: 11px;
  }

  /* Skills Dashboard (dual column) */
  .skills-dashboard {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
  }
  .skills-dashboard-col {
    display: flex;
    flex-direction: column;
    gap: 18px;
  }
  .skills-group-label {
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: var(--mid);
    font-weight: 700;
    display: block;
    margin-bottom: 4px;
    text-align: left;
  }

  /* Responsive */
  @media (max-width: 860px) {
    .about-chapter {
      grid-template-columns: 1fr;
      gap: 20px;
      padding: 50px max(22px, calc((100vw - 1100px) / 2));
    }
    .about-chapter-label {
      position: static;
    }
    .skills-dashboard {
      grid-template-columns: 1fr;
      gap: 24px;
    }
    .experience-list li {
      grid-template-columns: 1fr;
      gap: 2px;
    }
    .experience-list span {
      grid-column: 1;
    }
    .experience-list strong {
      grid-column: 1;
    }
    .experience-list em {
      grid-column: 1;
    }
  }
  ```

---

### Task 3: Git Push & Deployment

- [ ] **Step 1: Commit and push changes to remote GitHub Repository**
  Call the pre-authorized MCP tool `push_files` (owner: `crizleung21`, repo: `crizleung21-portfolio`, branch: `main`) with updated files:
  - `public/index.html`
  - `public/style.css`
  Commit message: `"feat: implement premium Runway Option C asymmetric dual-column and wire tag redesign for about section"`

- [ ] **Step 2: Sync local workspace with remote**
  Run: `git fetch origin && git reset --hard origin/main`
  Expected: HEAD is updated to the latest push commit, and local workspace is completely clean.
