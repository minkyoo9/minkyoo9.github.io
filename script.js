const yearEl = document.getElementById("current-year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

const navLinks = Array.from(document.querySelectorAll(".site-nav a[href^='#']"));
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const setActiveLink = () => {
  const current = sections.findLast((section) => section.getBoundingClientRect().top <= 120);
  navLinks.forEach((link) => {
    link.classList.toggle("active", current && link.getAttribute("href") === `#${current.id}`);
  });
};

window.addEventListener("scroll", setActiveLink, { passive: true });
setActiveLink();

const filterButtons = document.querySelectorAll("[data-filter]");
const publications = document.querySelectorAll(".publication-item");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((item) => item.classList.toggle("active", item === button));
    publications.forEach((publication) => {
      const shouldShow = filter === "all" || publication.dataset.type === filter;
      publication.classList.toggle("is-hidden", !shouldShow);
    });
  });
});
