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
      // Small RAF to ensure delays are applied before triggering visibility
      requestAnimationFrame(() => {
        items.forEach((item) => item.classList.add('is-visible'));
      });
      staggerObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
staggerContainers.forEach((c) => staggerObserver.observe(c));
