const projectData = {
  corporate: {
    label: "Video / Corporate & Brand",
    title: "Corporate brand story",
    body: "A placeholder case study for a corporate or brand film outcome. Use this slot for company profile edits, brand storytelling, interview-led corporate films, executive communication, and social cutdowns.",
    tags: ["Corporate & Brand", "Interview-led", "16:9 / 9:16", "Editing"]
  },
  event: {
    label: "Video / Event & Recap",
    title: "Event highlight film",
    body: "A placeholder case study for event recap work. Use this slot for conferences, launches, exhibitions, stage highlights, multi-camera event edits, speaker moments, and audience energy.",
    tags: ["Event & Recap", "Multi-camera", "16:9", "Highlight"]
  },
  interview: {
    label: "Video / Interview & Profile",
    title: "Interview profile piece",
    body: "A placeholder case study for interview-led storytelling. Use this slot for profile films, testimonial edits, talking-head structure, clean dialogue pacing, and emotional continuity.",
    tags: ["Interview & Profile", "Story Structure", "16:9 / 1:1", "Dialogue"]
  },
  microfilm: {
    label: "Video / Narrative",
    title: "Micro film sequence",
    body: "A placeholder case study for micro film or narrative work. Use this slot for short cinematic scenes, emotional pacing, atmosphere, visual continuity, and filmic montage structure.",
    tags: ["Narrative", "Micro Film", "16:9", "Cinematic"]
  },
  "ai-visual": {
    label: "AI Image / AI Video",
    title: "AI visual experiment",
    body: "A placeholder case study for AI visual work. Use this slot for AI image concepts, AI video motion tests, cinematic prompt direction, continuity tests, and generated visual experiments.",
    tags: ["AI Image", "AI Video", "Concept Frames", "Prompt Direction"]
  },
  "portfolio-system": {
    label: "Design / Systems",
    title: "Interactive portfolio system",
    body: "A placeholder case study for design and creative systems. Use this slot for web direction, portfolio IA, visual hierarchy, repeatable workflows, and prompt or production systems.",
    tags: ["Design", "Web", "Creative System", "Portfolio"]
  }
};

const filterCopy = {
  all: {
    heading: "A curated selection across editing, AI visuals, design, and systems.",
    status: "Showing 6 featured outcomes."
  },
  video: {
    heading: "Video lane: editing outcomes across commercial, event, interview, narrative, motion, and social formats.",
    status: "Video lane · 30 public works across 7 formats."
  },
  image: {
    heading: "AI image concepts, cinematic stills, character frames, and visual direction experiments.",
    status: "Showing AI image and visual concept work."
  },
  "ai-video": {
    heading: "AI video experiments, generated motion tests, continuity studies, and cinematic shot development.",
    status: "Showing AI video and motion experiment work."
  },
  design: {
    heading: "Media-first web, layout, interface rhythm, and visual direction systems.",
    status: "Showing design-led portfolio and visual system work."
  },
  systems: {
    heading: "Prompt systems, reusable templates, creative workflows, and production logic.",
    status: "Showing creative system and workflow work."
  }
};

const videoFilterCopy = {
  "all-video": "Video lane · 30 public works across 7 formats.",
  "corporate-brand": "Corporate & Brand · company profiles, brand stories, interview-led films, and executive communication.",
  "event-recap": "Event & Recap · highlight films, conferences, launches, and live-event energy.",
  "interview-profile": "Interview & Profile · testimonials, human stories, dialogue structure, and profile edits.",
  "product-promo": "Product & Promo · launches, product films, campaign edits, and promotional content.",
  narrative: "Narrative · micro films, cinematic shorts, emotional pacing, and story-led sequences.",
  "motion-compositing": "Motion & Compositing · motion graphics, green screen, keying, and visual post-production.",
  "social-reels": "Social & Reels · vertical cuts, short-form pacing, hooks, and platform-specific edits."
};

const revealItems = document.querySelectorAll('[data-reveal]');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealItems.forEach((item) => revealObserver.observe(item));

const parallaxItems = document.querySelectorAll('[data-parallax]');
const updateParallax = () => {
  const scrollY = window.scrollY || 0;
  parallaxItems.forEach((item) => {
    const speed = Number(item.dataset.parallax || 0);
    item.style.transform = `translate3d(0, ${scrollY * speed}px, 0)`;
  });
};
window.addEventListener('scroll', updateParallax, { passive: true });
updateParallax();

const filterButtons = document.querySelectorAll('[data-filter]');
const videoFilterButtons = document.querySelectorAll('[data-video-filter]');
const videoSubfilter = document.querySelector('.video-subfilter');
const cards = document.querySelectorAll('.work-card');
const worksHeading = document.querySelector('#works-heading');
const worksStatus = document.querySelector('#works-status');
const grid = document.querySelector('.smart-filter-grid');

let activePrimaryFilter = 'all';
let activeVideoFilter = 'all-video';

const cardHasCategory = (card, category) => {
  const categories = (card.dataset.category || '').split(' ');
  return categories.includes(category);
};

const updateCopy = () => {
  const copy = filterCopy[activePrimaryFilter] || filterCopy.all;
  if (worksHeading) worksHeading.textContent = copy.heading;
  if (worksStatus) {
    worksStatus.textContent = activePrimaryFilter === 'video'
      ? (videoFilterCopy[activeVideoFilter] || copy.status)
      : copy.status;
  }
};

const updateWorkFilters = () => {
  const showVideoSubfilter = activePrimaryFilter === 'video';
  if (videoSubfilter) {
    videoSubfilter.classList.toggle('is-visible', showVideoSubfilter);
    videoSubfilter.setAttribute('aria-hidden', showVideoSubfilter ? 'false' : 'true');
  }

  if (grid) grid.classList.add('is-filtering');

  cards.forEach((card) => {
    let show = activePrimaryFilter === 'all' || cardHasCategory(card, activePrimaryFilter);

    if (activePrimaryFilter === 'video' && activeVideoFilter !== 'all-video') {
      show = show && card.dataset.videoSubcategory === activeVideoFilter;
    }

    card.classList.toggle('is-hidden', !show);
  });

  updateCopy();

  window.setTimeout(() => {
    if (grid) grid.classList.remove('is-filtering');
  }, 180);
};

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    activePrimaryFilter = button.dataset.filter;
    filterButtons.forEach((btn) => btn.classList.remove('is-active'));
    button.classList.add('is-active');

    if (activePrimaryFilter !== 'video') {
      activeVideoFilter = 'all-video';
      videoFilterButtons.forEach((btn) => btn.classList.toggle('is-active', btn.dataset.videoFilter === 'all-video'));
    }

    updateWorkFilters();
  });
});

videoFilterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    activeVideoFilter = button.dataset.videoFilter;
    videoFilterButtons.forEach((btn) => btn.classList.remove('is-active'));
    button.classList.add('is-active');
    updateWorkFilters();
  });
});
updateWorkFilters();

const modal = document.querySelector('.project-modal');
const modalLabel = document.querySelector('#modal-label');
const modalTitle = document.querySelector('#modal-title');
const modalBody = document.querySelector('#modal-body');
const modalTags = document.querySelector('#modal-tags');
const openButtons = document.querySelectorAll('[data-project]');
const closeButtons = document.querySelectorAll('[data-close-modal]');

const openModal = (key) => {
  const data = projectData[key];
  if (!data || !modal) return;
  modalLabel.textContent = data.label;
  modalTitle.textContent = data.title;
  modalBody.textContent = data.body;
  modalTags.innerHTML = data.tags.map((tag) => `<span>${tag}</span>`).join('');
  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
};

const closeModal = () => {
  if (!modal) return;
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
};

openButtons.forEach((button) => button.addEventListener('click', () => openModal(button.dataset.project)));
closeButtons.forEach((button) => button.addEventListener('click', closeModal));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeModal();
});
