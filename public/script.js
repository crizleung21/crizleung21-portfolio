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

const narrativeText = document.querySelector('.about-narrative-text');
const triggers = document.querySelectorAll('.reveal-trigger');
const panes = document.querySelectorAll('.about-detail-pane');

let hoverTimeout = null;

const activatePane = (targetPaneId) => {
  panes.forEach((pane) => {
    const isTarget = pane.dataset.pane === targetPaneId;
    pane.classList.toggle('is-active', isTarget);
  });
};

triggers.forEach((trigger) => {
  const target = trigger.dataset.target;
  
  // Desktop hover behaviors
  trigger.addEventListener('mouseenter', () => {
    if (hoverTimeout) clearTimeout(hoverTimeout);
    
    // Visual focus triggers
    narrativeText.classList.add('has-hover');
    triggers.forEach((t) => t.classList.toggle('is-active-trigger', t === trigger));
    
    activatePane(target);
  });
  
  // Mobile tap support
  trigger.addEventListener('click', (e) => {
    const isAlreadyActive = trigger.classList.contains('is-active-trigger');
    
    if (isAlreadyActive) {
      // Toggle off back to default pane
      resetToDefault();
    } else {
      if (hoverTimeout) clearTimeout(hoverTimeout);
      narrativeText.classList.add('has-hover');
      triggers.forEach((t) => t.classList.toggle('is-active-trigger', t === trigger));
      activatePane(target);
    }
    e.stopPropagation();
  });
});

const resetToDefault = () => {
  if (narrativeText) narrativeText.classList.remove('has-hover');
  triggers.forEach((t) => t.classList.remove('is-active-trigger'));
  activatePane('default');
};

// Return to default placeholder panel when cursor leaves the columns
const aboutContainer = document.querySelector('.about-interactive-container');
if (aboutContainer) {
  aboutContainer.addEventListener('mouseleave', () => {
    hoverTimeout = setTimeout(resetToDefault, 200);
  });
}

// Close details overlay on tapping anywhere else on mobile
document.addEventListener('click', () => {
  resetToDefault();
});
