const projectData = {
  reel: {
    label: "Video Editing",
    title: "Rhythm-led reel system",
    body: "A placeholder case study for commercial edits, social-first pacing, hook design, sound timing, and visual compression. Replace this with a real showreel breakdown later.",
    tags: ["Editing", "Pacing", "Showreel", "Story"]
  },
  image: {
    label: "AI Image",
    title: "Cinematic character frames",
    body: "A placeholder for AI image direction, character concepts, source-anchored prompt systems, and high-impact visual development.",
    tags: ["AI Image", "Character", "Prompt Direction", "Visual Design"]
  },
  aivideo: {
    label: "AI Video",
    title: "Motion experiments",
    body: "A placeholder for AI video tests, camera continuity, cinematic movement, visual coherence, and experimental short loops.",
    tags: ["AI Video", "Motion", "Continuity", "Experiment"]
  },
  design: {
    label: "Design",
    title: "Interactive portfolio systems",
    body: "A placeholder for interface design, web direction, information architecture, design systems, and media-first presentation logic.",
    tags: ["Design", "Web", "System", "Portfolio"]
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

const filterButtons = document.querySelectorAll('[data-filter]');
const cards = document.querySelectorAll('.work-card');
filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    filterButtons.forEach((btn) => btn.classList.remove('is-active'));
    button.classList.add('is-active');
    cards.forEach((card) => {
      const show = filter === 'all' || card.dataset.category === filter;
      card.classList.toggle('is-hidden', !show);
    });
  });
});

const modal = document.querySelector('.project-modal');
const modalLabel = document.querySelector('#modal-label');
const modalTitle = document.querySelector('#modal-title');
const modalBody = document.querySelector('#modal-body');
const modalTags = document.querySelector('#modal-tags');
const openButtons = document.querySelectorAll('[data-project]');
const closeButtons = document.querySelectorAll('[data-close-modal]');

const openModal = (key) => {
  const data = projectData[key];
  if (!data) return;
  modalLabel.textContent = data.label;
  modalTitle.textContent = data.title;
  modalBody.textContent = data.body;
  modalTags.innerHTML = data.tags.map((tag) => `<span>${tag}</span>`).join('');
  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
};

const closeModal = () => {
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
};

openButtons.forEach((button) => button.addEventListener('click', () => openModal(button.dataset.project)));
closeButtons.forEach((button) => button.addEventListener('click', closeModal));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeModal();
});
