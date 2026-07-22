/* ==================== MOBILE MENU ==================== */
const navToggle = document.getElementById("nav-toggle");
const navClose = document.getElementById("nav-close");
const mobileMenu = document.getElementById("mobile-menu");

const openMenu = () => mobileMenu.classList.add("open");
const closeMenu = () => mobileMenu.classList.remove("open");

if (navToggle) navToggle.addEventListener("click", openMenu);
if (navClose) navClose.addEventListener("click", closeMenu);
document
  .querySelectorAll(".mobile-menu__link")
  .forEach((link) => link.addEventListener("click", closeMenu));

/* ==================== SERVICES MODAL ==================== */
const modalViews = document.querySelectorAll(".services__modal");
const modalBtns = document.querySelectorAll(".services__button");
const modalCloses = document.querySelectorAll(".services__modal-close");

modalBtns.forEach((btn, i) => {
  btn.addEventListener("click", () => modalViews[i].classList.add("active-modal"));
});

const closeAllModals = () =>
  modalViews.forEach((view) => view.classList.remove("active-modal"));

modalCloses.forEach((close) => close.addEventListener("click", closeAllModals));

// Close modal when clicking the backdrop or pressing Escape
modalViews.forEach((view) => {
  view.addEventListener("click", (e) => {
    if (e.target === view) view.classList.remove("active-modal");
  });
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeAllModals();
    closeMenu();
  }
});

/* ==================== HEADER ON SCROLL ==================== */
const header = document.getElementById("header");
const scrollUp = document.getElementById("scroll-up");

function onScroll() {
  const y = window.scrollY;
  header.classList.toggle("scrolled", y >= 40);
  scrollUp.classList.toggle("show", y >= 500);
  scrollActive(y);
}
window.addEventListener("scroll", onScroll);

/* ==================== ACTIVE NAV LINK ==================== */
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav__link");

function scrollActive(scrollY) {
  let current = "";
  sections.forEach((section) => {
    const top = section.offsetTop - 120;
    if (scrollY >= top) current = section.getAttribute("id");
  });
  navLinks.forEach((link) => {
    link.classList.toggle(
      "active-link",
      link.getAttribute("href") === `#${current}`
    );
  });
}

/* ==================== SCROLL REVEAL ==================== */
const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window && revealItems.length) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal--visible");
          if (entry.target.hasAttribute("data-count-host")) {
            countUp(entry.target);
          }
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
  );
  revealItems.forEach((el) => revealObserver.observe(el));
} else {
  revealItems.forEach((el) => el.classList.add("reveal--visible"));
}

/* ==================== COUNT-UP STATS ==================== */
function countUp(scope) {
  scope.querySelectorAll("[data-count]").forEach((el) => {
    const target = parseInt(el.dataset.count, 10);
    let current = 0;
    const step = () => {
      current += 1;
      el.textContent = current < 10 ? `0${current}` : current;
      if (current < target) setTimeout(step, 180);
    };
    step();
  });
}
// Mark stat cards so the observer triggers their count-up
document
  .querySelectorAll(".stat-card")
  .forEach((card) => card.setAttribute("data-count-host", ""));

/* ==================== DARK / LIGHT THEME ==================== */
const themeButton = document.getElementById("theme-button");
const darkClass = "dark-theme";
const iconSun = "uil-sun";
const iconMoon = "uil-moon";
const themeIcon = themeButton.querySelector("i");

const savedTheme = localStorage.getItem("selected-theme");

// Default is dark (set on <body>). Apply saved preference if it exists.
if (savedTheme === "light") {
  document.body.classList.remove(darkClass);
}
function syncThemeIcon() {
  const isDark = document.body.classList.contains(darkClass);
  themeIcon.classList.toggle(iconSun, isDark);
  themeIcon.classList.toggle(iconMoon, !isDark);
}
syncThemeIcon();

themeButton.addEventListener("click", () => {
  document.body.classList.toggle(darkClass);
  syncThemeIcon();
  localStorage.setItem(
    "selected-theme",
    document.body.classList.contains(darkClass) ? "dark" : "light"
  );
});

// Initialize scroll-dependent UI on load
onScroll();
