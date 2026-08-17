(() => {
  const storageKey = "atlas-systems-language";
  const languageButton = document.querySelector("[data-language-toggle]");
  const menuButton = document.querySelector("[data-menu-toggle]");

  const setLanguage = (language) => {
    const normalized = language === "en" ? "en" : "pt";
    document.documentElement.lang = normalized === "en" ? "en" : "pt-BR";
    document.documentElement.dataset.language = normalized;

    document.querySelectorAll("[data-pt][data-en]").forEach((element) => {
      element.textContent = element.dataset[normalized];
    });

    document.querySelectorAll("[data-aria-pt][data-aria-en]").forEach((element) => {
      element.setAttribute("aria-label", element.dataset[`aria${normalized === "en" ? "En" : "Pt"}`]);
    });

    document.querySelectorAll("[data-meta-pt][data-meta-en]").forEach((element) => {
      const value = element.dataset[`meta${normalized === "en" ? "En" : "Pt"}`];
      if (element.tagName === "TITLE") element.textContent = value;
      else element.setAttribute("content", value);
    });

    if (languageButton) {
      languageButton.textContent = normalized === "en" ? "EN / PT" : "PT / EN";
      languageButton.setAttribute("aria-label", normalized === "en" ? "Switch language to Portuguese" : "Trocar idioma para inglês");
    }

    try { window.localStorage.setItem(storageKey, normalized); } catch (_) {}
  };

  let initialLanguage = "pt";
  try { initialLanguage = window.localStorage.getItem(storageKey) || "pt"; } catch (_) {}
  setLanguage(initialLanguage);

  languageButton?.addEventListener("click", () => {
    setLanguage(document.documentElement.dataset.language === "en" ? "pt" : "en");
  });

  menuButton?.addEventListener("click", () => {
    const open = document.body.classList.toggle("menu-open");
    menuButton.setAttribute("aria-expanded", String(open));
  });

  document.querySelectorAll(".service-nav a").forEach((link) => {
    link.addEventListener("click", () => {
      document.body.classList.remove("menu-open");
      menuButton?.setAttribute("aria-expanded", "false");
    });
  });

  const year = document.querySelector("[data-current-year]");
  if (year) year.textContent = String(new Date().getFullYear());

  const reveals = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    reveals.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: .12 });

  reveals.forEach((element) => observer.observe(element));
})();
