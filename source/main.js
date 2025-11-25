const hamburger = document.querySelector(".hamburger");
const menu_bar = document.querySelector(".navbar-menu .menu-bar");
const menuLinks = document.querySelectorAll(".navbar-menu .menu-bar a");
const themeToggles = document.querySelectorAll(".theme-toggle");
const root = document.documentElement;
const THEME_STORAGE_KEY = "ck-theme";

if (hamburger && menu_bar) {
  hamburger.addEventListener("click", () => {
    menu_bar.classList.toggle("show");
  });
}

menuLinks.forEach((link) =>
  link.addEventListener("click", () => {
    menu_bar.classList.remove("show");
  })
);

const applyTheme = (theme) => {
  root.setAttribute("data-theme", theme);
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch (error) {
    // ignore write errors (private mode, etc.)
  }

  themeToggles.forEach((button) => {
    const icon = button.querySelector("i");
    if (icon) {
      icon.classList.remove("fa-moon", "fa-sun");
      icon.classList.add(theme === "light" ? "fa-moon" : "fa-sun");
    }
    button.setAttribute(
      "aria-label",
      theme === "light" ? "Switch to dark theme" : "Switch to light theme"
    );
  });
};

let storedTheme = null;
try {
  storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
} catch (error) {
  storedTheme = null;
}

const prefersDark =
  typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches;

const preferredTheme =
  storedTheme || (prefersDark ? "dark" : "light");

applyTheme(preferredTheme);

themeToggles.forEach((button) => {
  button.addEventListener("click", () => {
    const nextTheme = root.getAttribute("data-theme") === "light" ? "dark" : "light";
    applyTheme(nextTheme);
  });
});

// Handle scroll to top arrow
const scrollToTopArrow = document.querySelector(".arrow2");
if (scrollToTopArrow) {
  scrollToTopArrow.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}