const yearEl = document.getElementById('current-year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// Enable smooth scrolling for in-page navigation links
const navLinks = document.querySelectorAll('a[href^="#"]');
navLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    const targetId = link.getAttribute('href')?.replace('#', '');
    const target = targetId ? document.getElementById(targetId) : null;

    if (target) {
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.replaceState(null, '', `#${targetId}`);
    }
  });
});
