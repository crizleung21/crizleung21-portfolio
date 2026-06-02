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

// Stagger animation for scroll chapters
const staggerContainers = document.querySelectorAll('[data-stagger]');
const staggerObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const items = entry.target.querySelectorAll('.stagger-item');
      const delayStep = entry.target.dataset.staggerDelay
        ? Number(entry.target.dataset.staggerDelay)
        : 50;
      items.forEach((item, index) => {
        item.style.transitionDelay = `${index * delayStep}ms`;
      });
      requestAnimationFrame(() => {
        items.forEach((item) => item.classList.add('is-visible'));
      });
      staggerObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
staggerContainers.forEach((c) => staggerObserver.observe(c));

// About command panel interactions
const commandTabs = document.querySelectorAll('[data-command-target]');
const commandPanels = document.querySelectorAll('[data-command-panel]');
commandTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.commandTarget;
    commandTabs.forEach((item) => item.classList.toggle('is-active', item === tab));
    commandPanels.forEach((panel) => {
      panel.classList.toggle('is-active', panel.dataset.commandPanel === target);
    });
  });
});

const skillToggleItems = document.querySelectorAll('[data-skill-toggle]');
skillToggleItems.forEach((item) => {
  item.addEventListener('click', () => {
    item.classList.toggle('is-open');
  });
});

// Video archive filters and modal
const videoFilters = document.querySelectorAll('[data-video-filter]');
const videoCards = document.querySelectorAll('[data-video-card]');
videoFilters.forEach((filter) => {
  filter.addEventListener('click', () => {
    const target = filter.dataset.videoFilter;
    videoFilters.forEach((item) => item.classList.toggle('is-active', item === filter));
    videoCards.forEach((card) => {
      const matches = target === 'all' || card.dataset.category === target;
      card.classList.toggle('is-hidden', !matches);
    });
  });
});

const videoModal = document.querySelector('[data-video-modal]');
const videoFrame = document.querySelector('[data-video-frame]');
const videoModalTitle = document.querySelector('[data-video-modal-title]');
const videoOpenButtons = document.querySelectorAll('[data-video-open]');
const videoCloseButtons = document.querySelectorAll('[data-video-close]');

const closeVideoModal = () => {
  if (!videoModal || !videoFrame) return;
  videoModal.classList.remove('is-open');
  videoModal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
  videoFrame.innerHTML = '';
  if (videoModalTitle) videoModalTitle.textContent = '';
};

videoOpenButtons.forEach((button) => {
  button.addEventListener('click', () => {
    if (!videoModal || !videoFrame) return;
    const videoId = button.dataset.videoId;
    const title = button.dataset.videoTitle || 'Video';
    videoFrame.innerHTML = `<iframe src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0" title="${title}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`;
    if (videoModalTitle) videoModalTitle.textContent = title;
    videoModal.classList.add('is-open');
    videoModal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
  });
});

videoCloseButtons.forEach((button) => button.addEventListener('click', closeVideoModal));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeVideoModal();
});
