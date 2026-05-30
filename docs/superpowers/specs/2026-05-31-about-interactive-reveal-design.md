# Design Spec: About Section Interactive Text Reveal System (Option C)

**Date:** 2026-05-31
**Status:** Approved
**Target:** `public/index.html`, `public/style.css`, `public/script.js`

---

## 1. Goal & Objectives
Simplify the currently dense and crowded "ABOUT" section. Replace the traditional Tab panel structure with a cinematic, highly interactive narrative layout modeled after premium AI publications like Runway ML.

- **Minimalist Default State**: Display only a clean, spacious 2-sentence narrative introduction on the left.
- **Exploratory Hover Interaction**: Highlight key phrases ("8 years of production craft", "post-production editing", "emerging AI workflows"). Hovering over a phrase triggers a sleek slide-fade entry of detailed content (Experience, Skills, Tools) in the right-side details panel.
- **Mobile-First Tap Experience**: Gracefully transition from hover-to-reveal on desktop to tap-to-reveal on touch devices, maintaining 100% usability.

---

## 2. Component Architecture & HTML Layout

The `.about-panel` container is restructured into a 2-column grid layout on desktop:

```html
<section id="about" class="section about-section dark-section">
  <div class="about-interactive-container" data-reveal>
    
    <!-- Left Column: The Narrative Bio -->
    <div class="about-narrative-column">
      <p class="label">About</p>
      <h2 class="about-narrative-text">
        I’m Chris Leung, a senior video editor and hybrid creative systems builder. Working with 
        <span class="reveal-trigger" data-target="experience">8 years of production craft</span>, 
        I compose media structures that blend 
        <span class="reveal-trigger" data-target="skills">post-production editing</span> 
        with 
        <span class="reveal-trigger" data-target="tools">emerging AI workflows</span>.
      </h2>
      <div class="about-base-actions">
        <a class="button light-button" href="CV_ChrisLeung.pdf" download>Download CV</a>
        <a class="button ghost-button" href="mailto:crizleung21@gmail.com">Email</a>
      </div>
    </div>

    <!-- Right Column: The Dynamic Details Panel -->
    <div class="about-details-column">
      <!-- Default Placeholder State -->
      <div class="about-detail-pane is-active" data-pane="default">
        <div class="pane-placeholder-content">
          <span class="explore-indicator">✥</span>
          <p class="pane-tip">Hover or tap the underlined keywords to explore my credentials, technical skills, and tool stacks.</p>
        </div>
      </div>

      <!-- Detail Pane: Experience -->
      <div class="about-detail-pane" data-pane="experience">
        <h3 class="pane-title">Experience</h3>
        <ul class="experience-list compact-timeline">
          <li><span>2024 — Now</span><strong>You Find Limited</strong><em>Multimedia Designer</em></li>
          <li><span>2021 — 2023</span><strong>Online Marketing Genius</strong><em>Senior Video Editor</em></li>
          <li><span>2018 — 2021</span><strong>Best Video Limited</strong><em>Video Editor</em></li>
          <li><span>2015 — 2018</span><strong>Giraffe International Production</strong><em>Videographer</em></li>
        </ul>
      </div>

      <!-- Detail Pane: Skills -->
      <div class="about-detail-pane" data-pane="skills">
        <h3 class="pane-title">Skills</h3>
        <div class="skill-cloud">
          <span>Video Editing</span>
          <span>Motion Graphics</span>
          <span>VFX &amp; Compositing</span>
          <span>Color Grading</span>
          <span>AI Image Direction</span>
          <span>AI Video Direction</span>
          <span>Prompt Engineering</span>
        </div>
      </div>

      <!-- Detail Pane: Tools -->
      <div class="about-detail-pane" data-pane="tools">
        <h3 class="pane-title">Tools</h3>
        <div class="tool-stack-grid">
          <div class="tool-category">
            <span>Video &amp; Motion</span>
            <div class="skill-cloud mini-cloud">
              <span>Premiere Pro</span>
              <span>After Effects</span>
            </div>
          </div>
          <div class="tool-category">
            <span>Design</span>
            <div class="skill-cloud mini-cloud">
              <span>Photoshop</span>
              <span>Illustrator</span>
            </div>
          </div>
          <div class="tool-category">
            <span>AI Creative</span>
            <div class="skill-cloud mini-cloud">
              <span>Midjourney</span>
              <span>Veo</span>
              <span>ChatGPT</span>
            </div>
          </div>
        </div>
      </div>

    </div>

  </div>
</section>
```
