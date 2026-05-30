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

const aboutTabs = document.querySelectorAll('[data-about-tab]');
const aboutPanels = document.querySelectorAll('[data-about-panel]');

aboutTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.aboutTab;
    aboutTabs.forEach((item) => {
      const isActive = item === tab;
      item.classList.toggle('is-active', isActive);
      item.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });
    aboutPanels.forEach((panel) => {
      panel.classList.toggle('is-active', panel.dataset.aboutPanel === target);
    });
  });
});

const skillViewButtons = document.querySelectorAll('[data-skill-view]');
const skillPanels = document.querySelectorAll('[data-skill-panel]');

skillViewButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const target = button.dataset.skillView;
    skillViewButtons.forEach((item) => {
      const isActive = item === button;
      item.classList.toggle('is-active', isActive);
      item.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });
    skillPanels.forEach((panel) => {
      panel.classList.toggle('is-active', panel.dataset.skillPanel === target);
    });
  });
});

const skillGroupCards = document.querySelectorAll('[data-skill-group]');
skillGroupCards.forEach((card) => {
  card.addEventListener('click', () => {
    card.classList.toggle('is-open');
  });
});
