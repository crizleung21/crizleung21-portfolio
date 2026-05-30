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
