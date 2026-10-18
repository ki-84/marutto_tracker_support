/* Progressive enhancement: the complete site and store links work without JavaScript. */
document.querySelectorAll('.demo-button').forEach((button) => {
  const status = button.parentElement.querySelector('.demo-status');
  const originalStatus = status.textContent;
  const originalLabel = button.children[1].textContent;
  button.addEventListener('click', () => {
    const completed = button.getAttribute('aria-pressed') !== 'true';
    button.setAttribute('aria-pressed', String(completed));
    button.children[1].textContent = completed ? button.dataset.reset : originalLabel;
    status.textContent = completed ? button.dataset.done : originalStatus;
    button.parentElement.classList.toggle('celebrate', completed);
  });
});

// Reveal motion only when supported, and always respect the system motion preference.
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.feature-visual, .detail-card, .photo-gallery figure').forEach((element) => {
    element.classList.add('will-reveal');
    observer.observe(element);
  });
}
