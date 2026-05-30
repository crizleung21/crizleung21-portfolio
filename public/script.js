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
  },
  "category-video": {
    label: "Explore Category / Video",
    title: "Video — 30 public works",
    body: "The full video lane will hold corporate and brand films, event recaps, interview profiles, product and promo edits, narrative micro films, motion and compositing work, and social or reels formats. Homepage shows selected outcomes first; the full archive can be expanded later.",
    tags: ["30 Public Works", "Corporate & Brand", "Event & Recap", "Social & Reels"]
  },
  "category-ai-image": {
    label: "Explore Category / AI Image",
    title: "AI Image — visual concepts",
    body: "A category for AI image direction, cinematic stills, character frames, visual concept development, and source-aware image generation systems.",
    tags: ["AI Image", "Concept Frames", "Character", "Visual Direction"]
  },
  "category-ai-video": {
    label: "Explore Category / AI Video",
    title: "AI Video — motion experiments",
    body: "A category for generated motion tests, AI video experiments, shot continuity, camera movement studies, and cinematic visual transitions.",
    tags: ["AI Video", "Motion Tests", "Continuity", "Generated Shots"]
  },
  "category-design": {
    label: "Explore Category / Design",
    title: "Design — visual systems",
    body: "A category for web design, layout direction, interface rhythm, visual hierarchy, and media-first presentation systems.",
    tags: ["Design", "Web", "Layout", "Visual Direction"]
  },
  "category-systems": {
    label: "Explore Category / Systems",
    title: "Systems — creative workflows",
    body: "A category for prompt systems, production templates, reusable creative workflows, design logic, and structured visual production methods.",
    tags: ["Systems", "Prompt Architecture", "Workflow", "Templates"]
  }
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
