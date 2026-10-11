
/* =========================================================
   SRIKANTH SHANMUGAM — PORTFOLIO INTERACTIONS
   Main JavaScript: script.js
   ========================================================= */

"use strict";

document.body.classList.add("js-enabled");

document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;

  // ---------- 1. Theme toggle ----------

  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = document.getElementById("themeIcon");

  function applyTheme(theme, save = true) {
    const nextTheme = theme === "dark" ? "dark" : "light";

    root.dataset.theme = nextTheme;

    if (themeIcon) {
      themeIcon.textContent = nextTheme === "dark" ? "☼" : "◐";
    }

    if (themeToggle) {
      const label =
        nextTheme === "dark"
          ? "Switch to light theme"
          : "Switch to dark theme";

      themeToggle.setAttribute("aria-label", label);
      themeToggle.setAttribute("title", label);
    }

    if (save) {
      try {
        localStorage.setItem("srikanth-theme", nextTheme);
      } catch {
        // Theme still works for the current page if storage is unavailable.
      }
    }
  }

  // The HTML may already have selected a saved or system theme.
  applyTheme(root.dataset.theme || "light", false);

  themeToggle?.addEventListener("click", () => {
    const nextTheme =
      root.dataset.theme === "dark" ? "light" : "dark";

    applyTheme(nextTheme);
  });

  // ---------- 2. Mobile navigation ----------

  const menuToggle = document.getElementById("menuToggle");
  const mobileNav = document.getElementById("mobileNav");

  function closeMobileMenu() {
    if (!menuToggle || !mobileNav) return;

    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
    mobileNav.hidden = true;
  }

  function openMobileMenu() {
    if (!menuToggle || !mobileNav) return;

    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Close navigation");
    mobileNav.hidden = false;
  }

  menuToggle?.addEventListener("click", () => {
    const isOpen =
      menuToggle.getAttribute("aria-expanded") === "true";

    if (isOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  });

  mobileNav?.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
  });

  // Close the menu if the user moves back to desktop layout.
  const desktopQuery = window.matchMedia("(min-width: 821px)");

  desktopQuery.addEventListener?.("change", (event) => {
    if (event.matches) {
      closeMobileMenu();
    }
  });

  // ---------- 3. Scroll reveal ----------

  const revealElements = document.querySelectorAll(".reveal");

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if ("IntersectionObserver" in window && !reduceMotion) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -35px 0px"
      }
    );

    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });
  } else {
    // Ensure content remains visible on older browsers or
    // devices where the visitor prefers reduced motion.
    revealElements.forEach((element) => {
      element.classList.add("is-visible");
    });
  }

  // ---------- 4. Active navigation ----------

  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(
    '.primary-nav a[href^="#"]'
  );

  function setActiveNavigation(id) {
    navLinks.forEach((link) => {
      const isActive = link.getAttribute("href") === `#${id}`;

      if (isActive) {
        link.classList.add("active");
        link.setAttribute("aria-current", "location");
      } else {
        link.classList.remove("active");
        link.removeAttribute("aria-current");
      }
    });
  }

  if ("IntersectionObserver" in window && sections.length) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              b.intersectionRatio - a.intersectionRatio
          );

        if (visibleEntries.length) {
          setActiveNavigation(visibleEntries[0].target.id);
        }
      },
      {
        rootMargin: "-20% 0px -65% 0px",
        threshold: [0, 0.1, 0.25, 0.5]
      }
    );

    sections.forEach((section) => {
      sectionObserver.observe(section);
    });
  }

  // ---------- 5. Keyboard shortcuts ----------

  document.addEventListener("keydown", (event) => {
    const target = event.target;

    const isTyping =
      target instanceof HTMLElement &&
      (
        target.isContentEditable ||
        ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName)
      );

    if (
      isTyping ||
      event.ctrlKey ||
      event.metaKey ||
      event.altKey
    ) {
      return;
    }

    // Press T to toggle the colour theme.
    if (event.key.toLowerCase() === "t") {
      applyTheme(
        root.dataset.theme === "dark" ? "light" : "dark"
      );
    }

    // Escape closes the mobile menu.
    if (event.key === "Escape") {
      closeMobileMenu();
    }
  });

  // ---------- 6. Close mobile navigation on outside click ----------

  document.addEventListener("click", (event) => {
    if (!menuToggle || !mobileNav || mobileNav.hidden) return;

    const target = event.target;

    if (!(target instanceof Node)) return;

    if (
      !menuToggle.contains(target) &&
      !mobileNav.contains(target)
    ) {
      closeMobileMenu();
    }
  });

  // ---------- 7. Footer year ----------

  const yearElement = document.getElementById("year");

  if (yearElement) {
    yearElement.textContent = String(new Date().getFullYear());
  }

  // ---------- 8. Smooth internal links fallback ----------

  // CSS handles smooth scrolling in modern browsers. This
  // fallback respects reduced-motion settings.
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const href = link.getAttribute("href");

      if (!href || href === "#") return;

      let destination;

      try {
        destination = document.querySelector(href);
      } catch {
        return;
      }

      if (!destination) return;

      // Keep native anchor behaviour when reduced motion is enabled.
      if (reduceMotion) return;

      event.preventDefault();

      destination.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

      // Update the URL hash without a second jump.
      if (window.location.hash !== href) {
        history.pushState(null, "", href);
      }
    });
  });
});
