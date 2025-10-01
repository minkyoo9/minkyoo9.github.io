const yearEl = document.getElementById('current-year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// Enable smooth scrolling for in-page navigation links
const navLinks = document.querySelectorAll('a[href^="#"]');
navLinks.forEach((link) => {
  if (link.dataset.alertEmail !== undefined) {
    return;
  }

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

const alertEmailLinks = document.querySelectorAll('[data-alert-email]');
alertEmailLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    const email = link.dataset.alertEmail;
    if (email) {
      alert(email);
    }
  });
});
