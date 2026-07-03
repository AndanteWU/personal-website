const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const navItems = document.querySelectorAll(".nav-links a");
const sections = Array.from(document.querySelectorAll("main section[id]"));
const backToTop = document.querySelector(".back-to-top");

const closeMenu = () => {
  navLinks.classList.remove("open");
  navToggle.classList.remove("open");
  navToggle.setAttribute("aria-expanded", "false");
};

navToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  navToggle.classList.toggle("open", isOpen);
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

navItems.forEach((item) => {
  item.addEventListener("click", closeMenu);
});

const sectionMap = new Map(sections.map((section) => [section.id, section]));

const setActiveLink = () => {
  const documentBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 8;
  const contactSection = sectionMap.get("contact");

  let currentId = "home";

  if (documentBottom && contactSection) {
    currentId = "contact";
  } else {
    const marker = window.scrollY + Math.min(window.innerHeight * 0.38, 260);

    sections.forEach((section) => {
      const top = section.offsetTop;
      const bottom = top + section.offsetHeight;

      if (marker >= top && marker < bottom) {
        currentId = section.id;
      }
    });
  }

  navItems.forEach((item) => {
    const targetId = item.getAttribute("href").slice(1);
    item.classList.toggle("active", targetId === currentId);
  });
};

const toggleBackToTop = () => {
  backToTop.classList.toggle("show", window.scrollY > 500);
};

window.addEventListener("scroll", () => {
  setActiveLink();
  toggleBackToTop();
}, { passive: true });

window.addEventListener("resize", setActiveLink);

backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

setActiveLink();
toggleBackToTop();