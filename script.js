const yearEl = document.getElementById("current-year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

const minorStyle = document.createElement("style");
minorStyle.textContent = `
  .section-grid {
    grid-template-columns: 1fr;
    align-items: start;
    gap: 20px;
  }

  .hero-aside {
    justify-self: end;
    max-width: 380px;
    width: 100%;
  }

  .portrait {
    padding: 10%;
    background: #ffffff;
  }

  .portrait img {
    width: 100%;
    height: auto;
    aspect-ratio: auto;
    object-fit: contain;
  }

  #hero-heading {
    font-size: 3.22rem;
  }

  .section-heading h2 {
    color: var(--accent);
    font-family: "Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    font-size: 1.45rem;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .interest-list {
    align-items: flex-start;
    align-content: flex-start;
  }

  .interest-list li {
    line-height: 1.2;
  }

  .contact-card h2 {
    font-size: 1.45rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .contact-note {
    max-width: 620px;
    margin: 10px 0 0;
    color: rgba(255, 255, 255, 0.78);
    font-size: 0.98rem;
  }

  .award-highlight {
    color: #8b1e1e;
    font-weight: 800;
  }

  @media (max-width: 900px) {
    #hero-heading {
      font-size: 2.59rem;
    }
  }

  @media (max-width: 640px) {
    #hero-heading {
      font-size: 2.1rem;
    }

    .section-heading h2,
    .contact-card h2 {
      font-size: 1.25rem;
    }
  }
`;
document.head.appendChild(minorStyle);

const updatedEl = document.querySelector(".updated");
if (updatedEl) {
  updatedEl.textContent = "Last update: June 2026";
}

const singleSectionHeadings = [
  ["research-heading", "Research Interest"],
  ["education-heading", "Education"],
  ["publications-heading", "Publications"],
  ["experience-heading", "Experience"],
  ["awards-heading", "Honors and Awards"],
  ["languages-heading", "Languages"],
];

singleSectionHeadings.forEach(([id, text]) => {
  const heading = document.getElementById(id);
  if (heading) {
    heading.textContent = text;
  }

  const eyebrow = heading?.closest(".section-heading")?.querySelector(".eyebrow");
  if (eyebrow) {
    eyebrow.remove();
  }
});

const contactHeading = document.getElementById("contact-heading");
if (contactHeading) {
  contactHeading.textContent = "Contact";
  const contactIntro = contactHeading.closest("div");
  contactIntro?.querySelector(".eyebrow")?.remove();

  if (contactIntro && !contactIntro.querySelector(".contact-note")) {
    const note = document.createElement("p");
    note.className = "contact-note";
    note.textContent = "For research inquiries and collaborations, please contact me by email.";
    contactHeading.insertAdjacentElement("afterend", note);
  }
}

document.querySelectorAll(".site-footer p").forEach((item) => {
  if (item.textContent.includes("Synced with CV")) {
    item.textContent = "Synced with CV: June 2026";
  }
});

const conferencePattern = /\((CCS 2026|ICLR 2026|ACSAC 2025|SECURITY 2025|NACCL 2025 Findings|KDD 2025|SP|Oakland 2024)\)/g;
document.querySelectorAll(".publication-item[data-type='conference'] .pub-venue").forEach((venue) => {
  const formatted = venue.textContent
    .replace(conferencePattern, "<strong>($1)</strong>")
    .replace(/Distinguished Paper Award/g, '<strong class="award-highlight">Distinguished Paper Award</strong>');
  venue.innerHTML = formatted;
});

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
