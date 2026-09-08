import {
  PROJECTS,
  getRenderableProjects,
  validateProjects,
} from "./projects.js";

const PROJECT_QUERY_KEY = "project";
const HISTORY_STAGE_KEY = "portfolioProjectStage";
const HISTORY_BASE_KEY = "portfolioProjectBase";
const CATEGORY_LABELS = Object.freeze({
  video: "Video / Post-production",
  "ai-visual": "AI Visual",
  "creative-system": "Creative System",
});

const elements = {
  list: document.querySelector("[data-project-list]"),
  template: document.querySelector("#project-card-template"),
  filters: Array.from(document.querySelectorAll("[data-project-filter]")),
  count: document.querySelector("[data-project-count]"),
  projectStatus: document.querySelector("[data-project-status]"),
  preview: document.querySelector("[data-active-preview]"),
  stage: document.querySelector("[data-project-stage]"),
};

const previewFields = {
  index: elements.preview?.querySelector("[data-preview-index]") ?? null,
  poster: elements.preview?.querySelector("[data-preview-poster]") ?? null,
  category: elements.preview?.querySelector("[data-preview-category]") ?? null,
  title: elements.preview?.querySelector("[data-preview-title]") ?? null,
  role: elements.preview?.querySelector("[data-preview-role]") ?? null,
  year: elements.preview?.querySelector("[data-preview-year]") ?? null,
  summary: elements.preview?.querySelector("[data-preview-summary]") ?? null,
  tags: elements.preview?.querySelector("[data-preview-tags]") ?? null,
};

const stageFields = {
  index: elements.stage?.querySelector("[data-stage-index]") ?? null,
  category: elements.stage?.querySelector("[data-stage-category]") ?? null,
  year: elements.stage?.querySelector("[data-stage-year]") ?? null,
  title: elements.stage?.querySelector("[data-stage-title]") ?? null,
  roles: elements.stage?.querySelector("[data-stage-roles]") ?? null,
  summary: elements.stage?.querySelector("[data-stage-summary]") ?? null,
  challenge: elements.stage?.querySelector("[data-stage-challenge]") ?? null,
  challengeSection: elements.stage?.querySelector("[data-stage-challenge-section]") ?? null,
  decisions: elements.stage?.querySelector("[data-stage-decisions]") ?? null,
  decisionsSection: elements.stage?.querySelector("[data-stage-decisions-section]") ?? null,
  deliverables: elements.stage?.querySelector("[data-stage-deliverables]") ?? null,
  deliverablesSection: elements.stage?.querySelector("[data-stage-deliverables-section]") ?? null,
  outcome: elements.stage?.querySelector("[data-stage-outcome]") ?? null,
  outcomeSection: elements.stage?.querySelector("[data-stage-outcome-section]") ?? null,
  credits: elements.stage?.querySelector("[data-stage-credits]") ?? null,
  creditsSection: elements.stage?.querySelector("[data-stage-credits-section]") ?? null,
  tools: elements.stage?.querySelector("[data-stage-tools]") ?? null,
  media: elements.stage?.querySelector("[data-stage-media]") ?? null,
  morph: elements.stage?.querySelector("[data-stage-morph]") ?? null,
  actions: elements.stage?.querySelector("[data-stage-actions]") ?? null,
  status: elements.stage?.querySelector("[data-stage-status]") ?? null,
  close: elements.stage?.querySelector("[data-stage-close]") ?? null,
  previous: elements.stage?.querySelector("[data-stage-previous]") ?? null,
  next: elements.stage?.querySelector("[data-stage-next]") ?? null,
};

const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
const finePointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");

const state = {
  projects: [],
  filteredProjects: [],
  filter: "all",
  activePreviewSlug: null,
  activeProject: null,
  phase: "closed",
  openingTrigger: null,
  openingSlug: null,
  scrollY: 0,
  scrollStyles: null,
  reducedMotion: reducedMotionQuery.matches,
  saveData: Boolean(navigator.connection?.saveData),
  backdropPointerDown: false,
  closeFallbackTimer: null,
  morphAnimation: null,
  failedMediaSlugs: new Set(),
  mediaSession: 0,
};

function historyObject() {
  return history.state && typeof history.state === "object"
    ? { ...history.state }
    : {};
}

function relativeUrl(url) {
  return `${url.pathname}${url.search}${url.hash}`;
}

function projectUrl(slug) {
  const url = new URL(window.location.href);
  url.searchParams.set(PROJECT_QUERY_KEY, slug);
  return url;
}

function baseUrl() {
  const url = new URL(window.location.href);
  url.searchParams.delete(PROJECT_QUERY_KEY);
  return url;
}

function projectFromSlug(slug) {
  return state.projects.find((project) => project.slug === slug) ?? null;
}

function projectIndex(project) {
  return state.projects.findIndex((candidate) => candidate.slug === project.slug);
}

function displayIndex(project) {
  const index = projectIndex(project);
  return String(index >= 0 ? index + 1 : 0).padStart(2, "0");
}

function categoryLabel(category) {
  return CATEGORY_LABELS[category] ?? category;
}

function setText(element, value) {
  if (!element) return;
  element.textContent = value == null ? "" : String(value);
}

function setProjectTitle(element, title) {
  setText(element, title);
  if (!element) return;

  if (/[\u3400-\u9fff]/u.test(title)) {
    element.setAttribute("lang", "zh-Hant");
  } else {
    element.removeAttribute("lang");
  }
}

function setOptionalText(element, section, value) {
  if (!element) return;

  const hasValue = typeof value === "string" && value.trim().length > 0;
  (section ?? element).hidden = !hasValue;
  element.textContent = hasValue ? value.trim() : "";
}

function setOptionalList(element, values, itemTag = "li", section = null) {
  if (!element) return;

  const safeValues = Array.isArray(values)
    ? values.filter((value) => typeof value === "string" && value.trim().length > 0)
    : [];

  element.replaceChildren();
  (section ?? element).hidden = safeValues.length === 0;

  safeValues.forEach((value) => {
    const item = document.createElement(itemTag);
    item.textContent = value.trim();
    element.append(item);
  });
}

function safeHref(value) {
  if (typeof value !== "string" || value.trim().length === 0) return null;

  try {
    const url = new URL(value, window.location.href);
    if (url.protocol !== "http:" && url.protocol !== "https:") return null;
    return url.href;
  } catch {
    return null;
  }
}

function approvedLinkHref(value) {
  return value && value.verified === true
    ? safeHref(value.href)
    : null;
}

function isNativeDialog(element) {
  return typeof HTMLDialogElement !== "undefined"
    && element instanceof HTMLDialogElement;
}

function announceProjectStatus(message) {
  setText(elements.projectStatus, message);
}

function announceStage(message) {
  setText(stageFields.status, "");
  window.requestAnimationFrame(() => setText(stageFields.status, message));
}

function updatePreferenceState() {
  state.reducedMotion = reducedMotionQuery.matches;
  state.saveData = Boolean(navigator.connection?.saveData);

  document.documentElement.classList.toggle("is-reduced-motion", state.reducedMotion);
  document.documentElement.dataset.saveData = String(state.saveData);

  if (state.reducedMotion || state.saveData) {
    document.getAnimations?.().forEach((animation) => animation.cancel());
    stopActiveMedia({ restorePoster: true });
  }
}

function setPoster(image, project) {
  if (!(image instanceof HTMLImageElement)) return;

  image.src = project.media.poster;
  image.alt = project.media.alt;
  image.decoding = "async";
  image.hidden = false;
}

function updateActiveCard(slug) {
  document.querySelectorAll("[data-project-trigger]").forEach((trigger) => {
    const isActive = trigger.dataset.projectSlug === slug;
    trigger.closest("[data-project-card]")?.classList.toggle("is-active", isActive);
  });
}

function renderPreview(project) {
  if (!project || !elements.preview) return;

  const isChanging = state.activePreviewSlug !== null
    && state.activePreviewSlug !== project.slug;
  state.activePreviewSlug = project.slug;
  elements.preview.dataset.projectSlug = project.slug;
  setText(previewFields.index, displayIndex(project));
  setText(previewFields.category, categoryLabel(project.category));
  setProjectTitle(previewFields.title, project.title);
  setText(previewFields.role, project.roles.join(" / "));
  setText(previewFields.year, project.year);
  setText(previewFields.summary, project.summary);
  setOptionalList(previewFields.tags, project.tags, "span");
  setPoster(previewFields.poster, project);
  updateActiveCard(project.slug);

  if (isChanging && !state.reducedMotion) {
    elements.preview.classList.add("is-updating");
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => elements.preview?.classList.remove("is-updating"));
    });
  }
}

function createCard(project) {
  if (!(elements.template instanceof HTMLTemplateElement)) return null;

  const card = elements.template.content.firstElementChild?.cloneNode(true);
  if (!(card instanceof HTMLElement)) return null;

  card.dataset.projectCard = "";
  card.dataset.projectSlug = project.slug;
  card.dataset.projectCategory = project.category;

  const trigger = card.querySelector("[data-project-trigger]");
  if (!(trigger instanceof HTMLButtonElement)) return null;

  trigger.dataset.projectSlug = project.slug;
  trigger.setAttribute("aria-haspopup", "dialog");
  trigger.setAttribute("aria-controls", "project-stage");

  setText(card.querySelector("[data-card-index]"), displayIndex(project));
  setProjectTitle(card.querySelector("[data-card-title]"), project.title);
  setText(card.querySelector("[data-card-category]"), categoryLabel(project.category));
  setText(card.querySelector("[data-card-role]"), project.roles.join(" / "));
  setText(card.querySelector("[data-card-year]"), project.year);

  trigger.addEventListener("focus", () => renderPreview(project));
  trigger.addEventListener("pointerenter", () => {
    if (finePointerQuery.matches) renderPreview(project);
  });
  trigger.addEventListener("click", () => {
    renderPreview(project);
    openProjectFromTrigger(project, trigger);
  });

  return card;
}

function updateFilterAvailability() {
  elements.filters.forEach((filter) => {
    const category = filter.dataset.projectFilter;
    const count = category === "all"
      ? state.projects.length
      : state.projects.filter((project) => project.category === category).length;
    const available = category === "all"
      || count > 0;

    filter.hidden = !available;
    filter.disabled = !available;
    setText(filter.querySelector(`[data-filter-count="${category}"]`), count);
  });
}

function renderProjectList({ announce = true } = {}) {
  if (!elements.list) return;

  state.filteredProjects = state.filter === "all"
    ? [...state.projects]
    : state.projects.filter((project) => project.category === state.filter);

  const fragment = document.createDocumentFragment();
  state.filteredProjects.forEach((project) => {
    const card = createCard(project);
    if (card) fragment.append(card);
  });
  elements.list.replaceChildren(fragment);

  elements.filters.forEach((filter) => {
    const isActive = filter.dataset.projectFilter === state.filter;
    filter.setAttribute("aria-pressed", String(isActive));
    filter.classList.toggle("is-active", isActive);
  });

  const count = state.filteredProjects.length;
  setText(elements.count, `${count} ${count === 1 ? "project" : "projects"}`);

  if (announce) {
    const label = state.filter === "all" ? "all work" : categoryLabel(state.filter);
    announceProjectStatus(`Showing ${count} ${count === 1 ? "project" : "projects"} in ${label}.`);
  }

  const nextPreview = state.filteredProjects.find(
    (project) => project.slug === state.activePreviewSlug,
  ) ?? state.filteredProjects[0] ?? null;

  if (nextPreview) {
    renderPreview(nextPreview);
  } else {
    state.activePreviewSlug = null;
  }
}

function setFilter(filter) {
  const accepted = filter === "all"
    || state.projects.some((project) => project.category === filter);
  state.filter = accepted ? filter : "all";
  renderProjectList();
}

function setupFilters() {
  updateFilterAvailability();
  elements.filters.forEach((filter) => {
    filter.setAttribute("aria-pressed", String(filter.dataset.projectFilter === "all"));
    filter.addEventListener("click", () => setFilter(filter.dataset.projectFilter ?? "all"));
  });
}

function lockPageScroll() {
  if (state.scrollStyles) return;

  state.scrollY = window.scrollY;
  const scrollbarWidth = Math.max(0, window.innerWidth - document.documentElement.clientWidth);

  state.scrollStyles = {
    position: document.body.style.position,
    top: document.body.style.top,
    width: document.body.style.width,
    overflow: document.body.style.overflow,
    paddingRight: document.body.style.paddingRight,
  };

  document.body.style.position = "fixed";
  document.body.style.top = `-${state.scrollY}px`;
  document.body.style.width = "100%";
  document.body.style.overflow = "hidden";
  if (scrollbarWidth > 0) document.body.style.paddingRight = `${scrollbarWidth}px`;
  document.body.classList.add("project-stage-open");
}

function unlockPageScroll() {
  if (!state.scrollStyles) return;

  const savedY = state.scrollY;
  const savedStyles = state.scrollStyles;
  const rootScrollBehavior = document.documentElement.style.scrollBehavior;

  document.body.style.position = savedStyles.position;
  document.body.style.top = savedStyles.top;
  document.body.style.width = savedStyles.width;
  document.body.style.overflow = savedStyles.overflow;
  document.body.style.paddingRight = savedStyles.paddingRight;
  document.body.classList.remove("project-stage-open");
  state.scrollStyles = null;

  document.documentElement.style.scrollBehavior = "auto";
  window.scrollTo(0, savedY);
  document.documentElement.style.scrollBehavior = rootScrollBehavior;
}

function isUsableFocusTarget(element) {
  return element instanceof HTMLElement
    && element.isConnected
    && !element.closest("[hidden]")
    && !element.hasAttribute("disabled");
}

function restoreOpeningFocus() {
  let target = state.openingTrigger;

  if (!isUsableFocusTarget(target) && state.openingSlug) {
    const selector = `[data-project-trigger][data-project-slug="${CSS.escape(state.openingSlug)}"]`;
    target = document.querySelector(selector);
  }

  if (!isUsableFocusTarget(target)) {
    target = document.querySelector("#work-heading, #selected-work-heading, #work");
    if (target instanceof HTMLElement && !target.hasAttribute("tabindex")) {
      target.setAttribute("tabindex", "-1");
    }
  }

  if (isUsableFocusTarget(target)) target.focus({ preventScroll: true });
}

function setStageBoundary(button, disabled) {
  if (!(button instanceof HTMLButtonElement)) return;
  button.setAttribute("aria-disabled", String(disabled));
  button.classList.toggle("is-disabled", disabled);
}

function createMediaPlayButton(label, onActivate) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "stage-media-play";
  button.textContent = label;
  button.addEventListener("click", onActivate, { once: true });
  return button;
}

function createStagePoster(project) {
  const image = document.createElement("img");
  image.src = project.media.poster;
  image.alt = project.media.alt;
  image.decoding = "async";
  image.className = "stage-poster";
  return image;
}

function renderStagePosterFallback(project, message = null) {
  if (!stageFields.media) return;

  const poster = createStagePoster(project);
  stageFields.media.replaceChildren(poster);

  if (message) {
    const notice = document.createElement("p");
    notice.className = "stage-media-notice";
    notice.textContent = message;
    stageFields.media.append(notice);
  }

  if (typeof project.media.caption === "string" && project.media.caption.trim()) {
    const caption = document.createElement("p");
    caption.className = "stage-media-caption";
    caption.textContent = project.media.caption.trim();
    stageFields.media.append(caption);
  }
}

function markStageMediaUnavailable(project, session) {
  if (session !== state.mediaSession
    || state.phase !== "open"
    || state.activeProject?.slug !== project.slug) return;

  state.mediaSession += 1;
  state.failedMediaSlugs.add(project.slug);
  renderStagePosterFallback(project, "Project media is currently unavailable. The poster remains available.");
  announceStage(`Media for ${project.title} is unavailable. Showing its poster instead.`);
}

function renderStageMedia(project) {
  if (!stageFields.media) return;

  state.mediaSession += 1;
  renderStagePosterFallback(project);
  if (state.failedMediaSlugs.has(project.slug)) return;

  if (project.media.type === "video" && safeHref(project.media.previewSrc)) {
    const play = createMediaPlayButton("Play project preview", () => {
      const session = ++state.mediaSession;
      const video = document.createElement("video");
      video.controls = true;
      video.preload = "none";
      video.poster = project.media.poster;
      video.setAttribute("playsinline", "");

      const source = document.createElement("source");
      source.src = safeHref(project.media.previewSrc);
      video.append(source);
      video.addEventListener(
        "error",
        () => markStageMediaUnavailable(project, session),
        { once: true },
      );
      stageFields.media.replaceChildren(video);
      video.play().catch(() => markStageMediaUnavailable(project, session));
    });
    stageFields.media.append(play);
  }

  if (project.media.type === "embed" && safeHref(project.media.embedSrc)) {
    const play = createMediaPlayButton("Load project media", () => {
      const session = ++state.mediaSession;
      const iframe = document.createElement("iframe");
      iframe.src = safeHref(project.media.embedSrc);
      iframe.title = project.title;
      iframe.loading = "eager";
      iframe.allow = "fullscreen; picture-in-picture";
      iframe.allowFullscreen = true;
      iframe.addEventListener(
        "error",
        () => markStageMediaUnavailable(project, session),
        { once: true },
      );
      stageFields.media.replaceChildren(iframe);
    });
    stageFields.media.append(play);
  }
}

function stopActiveMedia({ restorePoster = false } = {}) {
  if (!stageFields.media) return;

  state.mediaSession += 1;

  stageFields.media.querySelectorAll("video, audio").forEach((media) => {
    media.pause();
    try {
      media.currentTime = 0;
    } catch {
      // Media may not have loaded enough data to seek.
    }
  });

  stageFields.media.querySelectorAll("iframe").forEach((frame) => {
    frame.src = "about:blank";
    frame.remove();
  });

  if (restorePoster && state.activeProject && elements.stage?.open) {
    renderStageMedia(state.activeProject);
  }
}

function appendStageAction(label, href, kind) {
  if (!stageFields.actions || !href) return;

  const anchor = document.createElement("a");
  anchor.href = href;
  anchor.textContent = label;
  anchor.className = `stage-action stage-action-${kind}`;

  const destination = new URL(href, window.location.href);
  if (destination.origin !== window.location.origin) {
    anchor.target = "_blank";
    anchor.rel = "noopener noreferrer";
  }

  stageFields.actions.append(anchor);
}

function renderStageActions(project) {
  if (!stageFields.actions) return;

  stageFields.actions.replaceChildren();
  const caseStudy = approvedLinkHref(project.links.caseStudy);
  const external = approvedLinkHref(project.links.external);
  appendStageAction("View case study", caseStudy, "case-study");
  appendStageAction("View project", external, "external");
  stageFields.actions.hidden = !caseStudy && !external;
}

function renderStage(project, { announce = true } = {}) {
  const isSwitching = state.phase === "open"
    && state.activeProject !== null
    && state.activeProject.slug !== project.slug;
  stopActiveMedia();
  state.activeProject = project;

  setText(stageFields.index, displayIndex(project));
  setText(stageFields.category, categoryLabel(project.category));
  setText(stageFields.year, project.year);
  setProjectTitle(stageFields.title, project.title);
  setText(stageFields.roles, project.roles.join(" / "));
  setText(stageFields.summary, project.summary);
  setOptionalText(stageFields.challenge, stageFields.challengeSection, project.challenge);
  setOptionalList(stageFields.decisions, project.creativeDecisions, "li", stageFields.decisionsSection);
  setOptionalList(stageFields.deliverables, project.deliverables, "li", stageFields.deliverablesSection);
  setOptionalText(stageFields.outcome, stageFields.outcomeSection, project.outcome);
  setOptionalList(stageFields.credits, project.credits, "li", stageFields.creditsSection);
  setOptionalList(stageFields.tools, project.tools, "span");
  renderStageMedia(project);
  renderStageActions(project);

  const currentIndex = state.filteredProjects.findIndex(
    (candidate) => candidate.slug === project.slug,
  );
  setStageBoundary(stageFields.previous, currentIndex <= 0);
  setStageBoundary(
    stageFields.next,
    currentIndex < 0 || currentIndex >= state.filteredProjects.length - 1,
  );

  if (isSwitching && !state.reducedMotion) {
    elements.stage?.classList.add("is-switching");
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => elements.stage?.classList.remove("is-switching"));
    });
  }

  if (announce) announceStage(`Viewing ${project.title}.`);
}

function clearStageMorph() {
  state.morphAnimation?.cancel();
  state.morphAnimation = null;

  if (!(stageFields.morph instanceof HTMLElement)) return;
  stageFields.morph.removeAttribute("style");
}

function runStageMorph(project, trigger) {
  if (state.reducedMotion
    || state.saveData
    || !(trigger instanceof HTMLElement)
    || !(stageFields.media instanceof HTMLElement)
    || !(stageFields.morph instanceof HTMLElement)
    || typeof stageFields.morph.animate !== "function") {
    return;
  }

  const origin = trigger.getBoundingClientRect();
  const target = stageFields.media.getBoundingClientRect();
  if (origin.width <= 0 || origin.height <= 0 || target.width <= 0 || target.height <= 0) return;

  clearStageMorph();
  const layer = stageFields.morph;
  layer.style.backgroundImage = `url("${project.media.poster}")`;
  layer.style.opacity = "1";

  state.morphAnimation = layer.animate([
    {
      left: `${origin.left}px`,
      top: `${origin.top}px`,
      width: `${origin.width}px`,
      height: `${origin.height}px`,
      borderRadius: "8px",
      opacity: 0.72,
    },
    {
      left: `${target.left}px`,
      top: `${target.top}px`,
      width: `${target.width}px`,
      height: `${target.height}px`,
      borderRadius: "0px",
      opacity: 1,
    },
  ], {
    duration: 520,
    easing: "cubic-bezier(0.22, 1, 0.36, 1)",
    fill: "both",
  });

  state.morphAnimation.finished
    .catch(() => undefined)
    .finally(clearStageMorph);
}

function showStage(project, { trigger = null, announce = true } = {}) {
  if (!isNativeDialog(elements.stage)
    || typeof elements.stage.showModal !== "function") {
    announceProjectStatus("The project viewer is not supported by this browser.");
    return false;
  }

  if (state.phase !== "closed") return false;

  state.phase = "opening";
  state.openingTrigger = trigger;
  state.openingSlug = trigger ? project.slug : null;
  lockPageScroll();
  renderStage(project, { announce: false });

  try {
    elements.stage.showModal();
  } catch (error) {
    console.error("Unable to open the project stage.", error);
    state.phase = "closed";
    state.activeProject = null;
    unlockPageScroll();
    return false;
  }

  elements.stage.classList.add("is-open");
  elements.stage.classList.remove("is-closing");
  state.phase = "open";

  window.requestAnimationFrame(() => {
    if (state.phase !== "open" || state.activeProject?.slug !== project.slug) return;

    stageFields.close?.focus({ preventScroll: true });
    runStageMorph(project, trigger);
    if (announce) announceStage(`Viewing ${project.title}.`);
  });
  return true;
}

function pushProjectHistory(project) {
  const nextState = historyObject();
  nextState[HISTORY_STAGE_KEY] = project.slug;
  delete nextState[HISTORY_BASE_KEY];
  history.pushState(nextState, "", relativeUrl(projectUrl(project.slug)));
}

function replaceProjectHistory(project) {
  const nextState = historyObject();
  nextState[HISTORY_STAGE_KEY] = project.slug;
  delete nextState[HISTORY_BASE_KEY];
  history.replaceState(nextState, "", relativeUrl(projectUrl(project.slug)));
}

function openProjectFromTrigger(project, trigger) {
  if (state.phase !== "closed") return;

  pushProjectHistory(project);
  if (!showStage(project, { trigger })) {
    const normalizedState = historyObject();
    delete normalizedState[HISTORY_STAGE_KEY];
    normalizedState[HISTORY_BASE_KEY] = true;
    history.replaceState(normalizedState, "", relativeUrl(baseUrl()));
  }
}

function switchProject(direction) {
  if (state.phase !== "open" || !state.activeProject) return;

  const currentIndex = state.filteredProjects.findIndex(
    (project) => project.slug === state.activeProject.slug,
  );
  const nextIndex = currentIndex + direction;
  const nextProject = state.filteredProjects[nextIndex];
  if (!nextProject) return;

  replaceProjectHistory(nextProject);
  renderPreview(nextProject);
  renderStage(nextProject);
}

function finishClose() {
  if (state.phase === "closed") return;

  state.phase = "closing";

  if (state.closeFallbackTimer) {
    window.clearTimeout(state.closeFallbackTimer);
    state.closeFallbackTimer = null;
  }

  stopActiveMedia();
  clearStageMorph();
  elements.stage?.classList.remove("is-open", "is-closing");
  if (elements.stage?.open) elements.stage.close();

  unlockPageScroll();
  restoreOpeningFocus();
  state.activeProject = null;
  state.openingTrigger = null;
  state.openingSlug = null;
  state.phase = "closed";
}

function scheduleFinishClose() {
  if (state.phase === "closed") return;

  state.phase = "closing";
  elements.stage?.classList.add("is-closing");
  if (state.closeFallbackTimer) window.clearTimeout(state.closeFallbackTimer);
  state.closeFallbackTimer = window.setTimeout(
    finishClose,
    state.reducedMotion ? 0 : 320,
  );
}

function normalizeToBaseAndClose() {
  const normalizedState = historyObject();
  delete normalizedState[HISTORY_STAGE_KEY];
  normalizedState[HISTORY_BASE_KEY] = true;
  history.replaceState(normalizedState, "", relativeUrl(baseUrl()));
  scheduleFinishClose();
}

function requestClose() {
  if (state.phase !== "open") return;

  state.phase = "closing";
  elements.stage?.classList.add("is-closing");

  if (history.state?.[HISTORY_STAGE_KEY]) {
    state.closeFallbackTimer = window.setTimeout(normalizeToBaseAndClose, 700);
    history.back();
  } else {
    normalizeToBaseAndClose();
  }
}

function syncStageFromLocation({ initial = false } = {}) {
  const url = new URL(window.location.href);
  const hasProjectQuery = url.searchParams.has(PROJECT_QUERY_KEY);
  const slug = url.searchParams.get(PROJECT_QUERY_KEY);
  const project = slug ? projectFromSlug(slug) : null;

  if (hasProjectQuery && !project) {
    const normalizedState = historyObject();
    delete normalizedState[HISTORY_STAGE_KEY];
    normalizedState[HISTORY_BASE_KEY] = true;
    url.searchParams.delete(PROJECT_QUERY_KEY);
    history.replaceState(normalizedState, "", relativeUrl(url));
    scheduleFinishClose();
    announceProjectStatus("That project is unavailable. Showing selected work instead.");
    return;
  }

  if (!project) {
    scheduleFinishClose();
    return;
  }

  if (state.phase === "open" && state.activeProject?.slug === project.slug) return;

  if (state.phase === "open") {
    renderPreview(project);
    renderStage(project);
    return;
  }

  if (state.phase === "closing") finishClose();
  if (state.phase !== "closed") return;

  const opened = showStage(project, { trigger: null, announce: !initial });
  if (!opened) normalizeToBaseAndClose();
}

function prepareInitialHistory() {
  const currentUrl = new URL(window.location.href);
  const hasProjectQuery = currentUrl.searchParams.has(PROJECT_QUERY_KEY);
  const slug = currentUrl.searchParams.get(PROJECT_QUERY_KEY);
  const project = slug ? projectFromSlug(slug) : null;

  if (hasProjectQuery && !project) {
    const nextState = historyObject();
    delete nextState[HISTORY_STAGE_KEY];
    nextState[HISTORY_BASE_KEY] = true;
    currentUrl.searchParams.delete(PROJECT_QUERY_KEY);
    history.replaceState(nextState, "", relativeUrl(currentUrl));
    announceProjectStatus("That project is unavailable. Showing selected work instead.");
    return;
  }

  if (!project) {
    const nextState = historyObject();
    delete nextState[HISTORY_STAGE_KEY];
    nextState[HISTORY_BASE_KEY] = true;
    history.replaceState(nextState, "", relativeUrl(currentUrl));
    return;
  }

  if (history.state?.[HISTORY_STAGE_KEY] !== project.slug) {
    const deepLinkUrl = new URL(currentUrl.href);
    deepLinkUrl.searchParams.set(PROJECT_QUERY_KEY, project.slug);
    const closeDestination = new URL(currentUrl.href);
    closeDestination.searchParams.delete(PROJECT_QUERY_KEY);

    const baseState = historyObject();
    delete baseState[HISTORY_STAGE_KEY];
    baseState[HISTORY_BASE_KEY] = true;
    history.replaceState(baseState, "", relativeUrl(closeDestination));

    const stageState = { ...baseState };
    delete stageState[HISTORY_BASE_KEY];
    stageState[HISTORY_STAGE_KEY] = project.slug;
    history.pushState(stageState, "", relativeUrl(deepLinkUrl));
  }

  syncStageFromLocation({ initial: true });
}

function setupStage() {
  if (!isNativeDialog(elements.stage)) return;

  stageFields.close?.addEventListener("click", requestClose);
  stageFields.previous?.addEventListener("click", () => {
    if (stageFields.previous?.getAttribute("aria-disabled") === "true") return;
    switchProject(-1);
  });
  stageFields.next?.addEventListener("click", () => {
    if (stageFields.next?.getAttribute("aria-disabled") === "true") return;
    switchProject(1);
  });

  elements.stage.addEventListener("cancel", (event) => {
    event.preventDefault();
    requestClose();
  });

  elements.stage.addEventListener("pointerdown", (event) => {
    state.backdropPointerDown = event.target === elements.stage;
  });
  elements.stage.addEventListener("pointerup", (event) => {
    const shouldClose = state.backdropPointerDown && event.target === elements.stage;
    state.backdropPointerDown = false;
    if (shouldClose) requestClose();
  });

  elements.stage.addEventListener("close", () => {
    if (state.phase !== "closed" && state.phase !== "closing") finishClose();
  });
}

function setupPreferences() {
  updatePreferenceState();
  reducedMotionQuery.addEventListener?.("change", updatePreferenceState);
  navigator.connection?.addEventListener?.("change", updatePreferenceState);
}

function setupVisibilityCleanup() {
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stopActiveMedia({ restorePoster: true });
  });
}

function initialize() {
  setupPreferences();

  const validation = validateProjects(PROJECTS);
  if (!validation.valid) {
    console.error("Project data validation failed:", validation.errors);
    setText(elements.count, "0 projects");
    announceProjectStatus("Project data is unavailable because its validation failed.");
    return;
  }

  state.projects = getRenderableProjects(PROJECTS);
  setupFilters();
  renderProjectList({ announce: false });
  setupStage();
  setupVisibilityCleanup();
  prepareInitialHistory();

  document.documentElement.classList.remove("no-js");
  document.documentElement.classList.add("js");

  window.addEventListener("popstate", () => syncStageFromLocation());
}

initialize();
