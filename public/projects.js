const SUPPORTED_CATEGORIES = new Set(["video", "ai-visual", "creative-system"]);
const SUPPORTED_STATUSES = new Set(["demo", "published", "archived"]);
const SUPPORTED_MEDIA_TYPES = new Set(["image", "video", "embed"]);
const TEXT_LIST_FIELDS = Object.freeze([
  "roles",
  "creativeDecisions",
  "deliverables",
  "credits",
  "tools",
  "tags",
]);

const RIGHTS_SCOPE =
  "Portfolio display of existing repository project metadata and original title-card artwork only; excludes client footage, logos, audio, and all third-party media.";

export const PROJECTS = Object.freeze([
  Object.freeze({
    id: "project-zhen-ti-zi-ouyang-chang",
    slug: "zhen-ti-zi-ouyang-chang",
    title: "真體字 — 歐陽昌",
    category: "video",
    status: "demo",
    featured: true,
    order: 10,

    clientLabel: null,
    year: "Undated",
    roles: Object.freeze(["Video Editing", "Color Grading"]),
    summary: "An interview film featuring video editing and color grading.",
    challenge: null,
    creativeDecisions: Object.freeze([]),
    deliverables: Object.freeze([]),
    outcome: null,
    credits: Object.freeze([]),
    tools: Object.freeze([]),
    tags: Object.freeze(["Interview Film"]),

    media: Object.freeze({
      type: "image",
      poster: "assets/projects/zhen-ti-zi-ouyang-chang/poster.svg",
      previewSrc: null,
      embedSrc: null,
      alt: "Abstract monochrome title-card artwork for 真體字 — 歐陽昌.",
      caption: null,
      transcriptHref: null,
    }),

    links: Object.freeze({
      caseStudy: null,
      external: null,
    }),

    rights: Object.freeze({
      cleared: true,
      owner: "Criz Leung",
      usageScope: RIGHTS_SCOPE,
    }),
  }),

  Object.freeze({
    id: "project-you-huo-dan-xin-pian",
    slug: "you-huo-dan-xin-pian",
    title: "有貨 — 擔心篇",
    category: "video",
    status: "demo",
    featured: true,
    order: 20,

    clientLabel: null,
    year: "Undated",
    roles: Object.freeze(["Video Editing", "Color Grading"]),
    summary: "A micro film featuring video editing and color grading.",
    challenge: null,
    creativeDecisions: Object.freeze([]),
    deliverables: Object.freeze([]),
    outcome: null,
    credits: Object.freeze([]),
    tools: Object.freeze([]),
    tags: Object.freeze(["Micro Film"]),

    media: Object.freeze({
      type: "image",
      poster: "assets/projects/you-huo-dan-xin-pian/poster.svg",
      previewSrc: null,
      embedSrc: null,
      alt: "Abstract monochrome title-card artwork for 有貨 — 擔心篇.",
      caption: null,
      transcriptHref: null,
    }),

    links: Object.freeze({
      caseStudy: null,
      external: null,
    }),

    rights: Object.freeze({
      cleared: true,
      owner: "Criz Leung",
      usageScope: RIGHTS_SCOPE,
    }),
  }),

  Object.freeze({
    id: "project-downtown",
    slug: "downtown",
    title: "Downtown",
    category: "video",
    status: "demo",
    featured: true,
    order: 30,

    clientLabel: null,
    year: "Undated",
    roles: Object.freeze(["Video Editing", "Color Grading"]),
    summary: "A promotional film featuring video editing and color grading.",
    challenge: null,
    creativeDecisions: Object.freeze([]),
    deliverables: Object.freeze([]),
    outcome: null,
    credits: Object.freeze([]),
    tools: Object.freeze([]),
    tags: Object.freeze(["Promotional Film"]),

    media: Object.freeze({
      type: "image",
      poster: "assets/projects/downtown/poster.svg",
      previewSrc: null,
      embedSrc: null,
      alt: "Abstract monochrome title-card artwork for Downtown.",
      caption: null,
      transcriptHref: null,
    }),

    links: Object.freeze({
      caseStudy: null,
      external: null,
    }),

    rights: Object.freeze({
      cleared: true,
      owner: "Criz Leung",
      usageScope: RIGHTS_SCOPE,
    }),
  }),

  Object.freeze({
    id: "project-ogis",
    slug: "ogis",
    title: "OGIS",
    category: "video",
    status: "demo",
    featured: true,
    order: 40,

    clientLabel: null,
    year: "Undated",
    roles: Object.freeze(["Motion Graphics"]),
    summary: "A motion graphics project.",
    challenge: null,
    creativeDecisions: Object.freeze([]),
    deliverables: Object.freeze([]),
    outcome: null,
    credits: Object.freeze([]),
    tools: Object.freeze([]),
    tags: Object.freeze(["Motion Graphics"]),

    media: Object.freeze({
      type: "image",
      poster: "assets/projects/ogis/poster.svg",
      previewSrc: null,
      embedSrc: null,
      alt: "Abstract monochrome title-card artwork for OGIS.",
      caption: null,
      transcriptHref: null,
    }),

    links: Object.freeze({
      caseStudy: null,
      external: null,
    }),

    rights: Object.freeze({
      cleared: true,
      owner: "Criz Leung",
      usageScope: RIGHTS_SCOPE,
    }),
  }),
]);

function hasText(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function isPlainObject(value) {
  if (value === null || typeof value !== "object" || Array.isArray(value)) return false;
  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
}

function isHttpUrl(value) {
  if (!hasText(value)) return false;

  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

function isLocalAssetPath(value) {
  if (!hasText(value) || isHttpUrl(value)) return false;
  const path = value.trim();
  return /^assets\/(?:[a-z0-9._-]+\/)*[a-z0-9._-]+$/iu.test(path)
    && !path.includes("\\")
    && !path.includes("%")
    && !path.split("/").some((segment) => segment === "." || segment === "..");
}

function isAssetLocation(value) {
  return isLocalAssetPath(value) || isHttpUrl(value);
}

function isPosterPath(value) {
  return isLocalAssetPath(value)
    && /\.(?:avif|jpe?g|png|svg|webp)$/iu.test(value);
}

function hasTextItems(value, minimum) {
  return Array.isArray(value)
    && value.length >= minimum
    && Object.keys(value).length === value.length
    && Array.from(value).every((item) => hasText(item));
}

function isApprovedLink(value) {
  return isPlainObject(value)
    && Object.hasOwn(value, "href")
    && Object.hasOwn(value, "verified")
    && isHttpUrl(value.href)
    && value.verified === true;
}

function projectErrors(project, index) {
  const prefix = `Project at index ${index}`;
  const errors = [];

  if (!isPlainObject(project)) return [`${prefix} must be a plain object.`];

  if (!hasText(project.id) || !/^project-[a-z0-9]+(?:-[a-z0-9]+)*$/u.test(project.id)) {
    errors.push(`${prefix} requires a canonical project id.`);
  }
  if (!hasText(project.slug) || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(project.slug)) {
    errors.push(`${prefix} requires a URL-safe slug.`);
  }
  if (!hasText(project.title)) errors.push(`${prefix} requires a confirmed title.`);
  if (!SUPPORTED_CATEGORIES.has(project.category)) {
    errors.push(`${prefix} has an unsupported category.`);
  }
  if (!SUPPORTED_STATUSES.has(project.status)) {
    errors.push(`${prefix} has an unsupported status.`);
  }
  if (typeof project.featured !== "boolean") {
    errors.push(`${prefix} requires a boolean featured flag.`);
  }
  if (!Number.isFinite(project.order)) errors.push(`${prefix} requires a numeric order.`);
  TEXT_LIST_FIELDS.forEach((field) => {
    if (!hasTextItems(project[field], 0)) {
      errors.push(`${prefix} ${field} must be a dense array of text labels.`);
    }
  });
  if (!isPlainObject(project.media)) errors.push(`${prefix} requires a plain media object.`);
  if (!isPlainObject(project.links)) errors.push(`${prefix} requires a plain links object.`);
  if (!isPlainObject(project.rights)) errors.push(`${prefix} requires a plain rights object.`);

  if (isPlainObject(project.media) && !SUPPORTED_MEDIA_TYPES.has(project.media.type)) {
    errors.push(`${prefix} has an unsupported media type.`);
  }

  if (isPlainObject(project.links)) {
    for (const [name, value] of Object.entries(project.links)) {
      if (value != null && !isApprovedLink(value)) {
        errors.push(`${prefix} has an invalid ${name} link.`);
      }
    }
  }

  if (project.status === "demo" || project.status === "published") {
    if (!hasText(project.year)) errors.push(`${prefix} requires a year or honest date label.`);
    if (!hasTextItems(project.roles, 1)) {
      errors.push(`${prefix} requires at least one confirmed role.`);
    }
    if (!hasText(project.summary)) errors.push(`${prefix} requires a confirmed summary.`);
    if (!isPlainObject(project.media) || !isPosterPath(project.media.poster)) {
      errors.push(`${prefix} requires a local poster.`);
    }
    if (!isPlainObject(project.media) || !hasText(project.media.alt)) {
      errors.push(`${prefix} requires meaningful media alt text.`);
    }
    if (!isPlainObject(project.rights) || project.rights.cleared !== true) {
      errors.push(`${prefix} requires cleared portfolio display rights.`);
    }
    if (!isPlainObject(project.rights) || !hasText(project.rights.owner) || !hasText(project.rights.usageScope)) {
      errors.push(`${prefix} requires a rights owner and usage scope.`);
    }

    if (isPlainObject(project.media) && project.media.type === "video") {
      if (!isAssetLocation(project.media.previewSrc) || project.media.verified !== true) {
        errors.push(`${prefix} requires a verified video preview source.`);
      }
    }

    if (isPlainObject(project.media) && project.media.type === "embed") {
      if (!isHttpUrl(project.media.embedSrc) || project.media.verified !== true) {
        errors.push(`${prefix} requires a verified HTTP(S) embed source.`);
      }
    }

    if (isPlainObject(project.media)
      && (project.media.type === "video" || project.media.type === "embed")) {
      const clearance = project.media.clearance;
      if (!isPlainObject(clearance)
        || clearance.cleared !== true
        || clearance.verified !== true
        || !hasText(clearance.owner)
        || !hasText(clearance.usageScope)) {
        errors.push(`${prefix} requires verified media-specific rights clearance.`);
      }

      const accessibility = project.media.accessibility;
      if (!isPlainObject(accessibility)
        || typeof accessibility.spokenContent !== "boolean") {
        errors.push(`${prefix} requires a spoken-content accessibility declaration.`);
      } else if (accessibility.spokenContent
        && (accessibility.verified !== true
          || (!isAssetLocation(accessibility.captionsHref)
            && !isAssetLocation(accessibility.transcriptHref)))) {
        errors.push(`${prefix} requires verified captions or a transcript for spoken media.`);
      }
    }
  }

  if (project.status === "published") {
    if (!hasText(project.challenge)) errors.push(`${prefix} requires a challenge before publication.`);
    if (!hasTextItems(project.creativeDecisions, 2)) {
      errors.push(`${prefix} requires at least two creative decisions before publication.`);
    }
    if (!hasTextItems(project.deliverables, 1)) {
      errors.push(`${prefix} requires at least one deliverable before publication.`);
    }
    if (!hasText(project.outcome)) errors.push(`${prefix} requires an outcome before publication.`);
    if (!hasTextItems(project.credits, 1)) {
      errors.push(`${prefix} requires credits before publication.`);
    }

    const links = isPlainObject(project.links) ? project.links : {};
    if (!isApprovedLink(links.caseStudy) && !isApprovedLink(links.external)) {
      errors.push(`${prefix} requires at least one verified URL before publication.`);
    }
  }

  return errors;
}

export function validateProjects(records = PROJECTS) {
  if (!Array.isArray(records)) {
    return { valid: false, errors: ["Project collection must be an array."] };
  }

  const errors = [];
  if (Object.keys(records).length !== records.length) {
    errors.push("Project collection must be a dense array.");
  }
  Array.from(records).forEach((project, index) => {
    errors.push(...projectErrors(project, index));
  });
  const ids = new Set();
  const slugs = new Set();

  records.forEach((project, index) => {
    if (!isPlainObject(project)) return;

    if (hasText(project.id)) {
      if (ids.has(project.id)) errors.push(`Duplicate project id at index ${index}: ${project.id}.`);
      ids.add(project.id);
    }

    if (hasText(project.slug)) {
      if (slugs.has(project.slug)) errors.push(`Duplicate project slug at index ${index}: ${project.slug}.`);
      slugs.add(project.slug);
    }
  });

  return { valid: errors.length === 0, errors };
}

export function getRenderableProjects(records = PROJECTS) {
  const validation = validateProjects(records);
  if (!validation.valid) return [];

  return records
    .filter((project) => project.status === "demo" || project.status === "published")
    .slice()
    .sort((a, b) => a.order - b.order);
}

export function evaluateReleaseReadiness(records = PROJECTS) {
  const validation = validateProjects(records);
  const errors = [...validation.errors];

  if (validation.valid) {
    const visible = records.filter(
      (project) => project.status === "demo" || project.status === "published",
    );
    const videos = visible.filter((project) => project.category === "video");
    const published = visible.filter((project) => project.status === "published");

    if (visible.length < 3) {
      errors.push("Production release requires at least three renderable projects.");
    }
    if (videos.length < 2) {
      errors.push("Production release requires at least two video/post-production projects.");
    }
    if (published.length < 1) {
      errors.push("Production release requires at least one published project.");
    }
  }

  return { ready: errors.length === 0, errors };
}
