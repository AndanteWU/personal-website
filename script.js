const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const navItems = document.querySelectorAll(".nav-links a");
const sections = Array.from(document.querySelectorAll("main section[id]"));
const backToTop = document.querySelector(".back-to-top");
const langToggle = document.querySelector(".lang-toggle");
const translatableElements = document.querySelectorAll("[data-zh][data-en]");

let currentLanguage = "zh";

function closeMenu() {
  if (!navLinks || !navToggle) return;

  navLinks.classList.remove("open");
  navToggle.classList.remove("open");
  navToggle.setAttribute("aria-expanded", "false");
}

if (navToggle && navLinks) {
  navToggle.addEventListener("click", function () {
    const isOpen = navLinks.classList.toggle("open");
    navToggle.classList.toggle("open", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

navItems.forEach(function (item) {
  item.addEventListener("click", closeMenu);
});

const sectionMap = new Map(sections.map(function (section) {
  return [section.id, section];
}));

function setActiveLink() {
  const documentBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 8;
  const contactSection = sectionMap.get("contact");

  let currentId = "home";

  if (documentBottom && contactSection) {
    currentId = "contact";
  } else {
    const marker = window.scrollY + Math.min(window.innerHeight * 0.38, 260);

    sections.forEach(function (section) {
      const top = section.offsetTop;
      const bottom = top + section.offsetHeight;

      if (marker >= top && marker < bottom) {
        currentId = section.id;
      }
    });
  }

  navItems.forEach(function (item) {
    const targetId = item.getAttribute("href").slice(1);
    item.classList.toggle("active", targetId === currentId);
  });
}

function toggleBackToTop() {
  if (!backToTop) return;
  backToTop.classList.toggle("show", window.scrollY > 500);
}

function applyLanguage(language) {
  currentLanguage = language;
  document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
  document.body.setAttribute("data-language", language);
  document.title = language === "zh"
    ? "武宬志 | 个人网站"
    : "Wuchengzhi | Personal Website";

  translatableElements.forEach(function (element) {
    const nextText = language === "zh"
      ? element.getAttribute("data-zh")
      : element.getAttribute("data-en");

    if (nextText !== null) {
      element.textContent = nextText;
    }
  });

  if (langToggle) {
    langToggle.textContent = language === "zh" ? "中文 / EN" : "EN / 中文";
    langToggle.setAttribute("aria-label", language === "zh" ? "切换为英文" : "Switch to Chinese");
  }
}

if (langToggle) {
  langToggle.addEventListener("click", function () {
    const nextLanguage = currentLanguage === "zh" ? "en" : "zh";
    applyLanguage(nextLanguage);
  });
}

window.addEventListener("scroll", function () {
  setActiveLink();
  toggleBackToTop();
}, { passive: true });

window.addEventListener("resize", setActiveLink);

if (backToTop) {
  backToTop.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

applyLanguage("zh");
setActiveLink();
toggleBackToTop();
