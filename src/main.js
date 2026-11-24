import "./style.css";

// =====================================
// 1. THEME SWITCHING
// =====================================

// Select theme button
const themeToggle = document.getElementById("theme-toggle");

// Select theme icon
const themeIcon = document.getElementById("theme-icon");

// Select HTML document
const htmlElement = document.documentElement;

// Switch between dark and light themes

function toggleTheme() {
  const currentTheme = htmlElement.getAttribute("data-theme");

  const newTheme = currentTheme === "light" ? "dark" : "light";

  // Apply the new theme
  htmlElement.setAttribute("data-theme", newTheme);

  // Save the selected theme
  localStorage.setItem("theme", newTheme);

  // Update the theme icon
  themeIcon.textContent = newTheme === "light" ? "🌙" : "☀️";
}

function loadSavedTheme() {
  // Get previously saved theme
  const savedTheme = localStorage.getItem("theme");

  // Use saved theme or default to dark
  const theme = savedTheme || "dark";

  // Apply the theme
  htmlElement.setAttribute("data-theme", theme);

  // Update icon
  themeIcon.textContent = theme === "light" ? "🌙" : "☀️";
}

// Load theme when the website starts
loadSavedTheme();

// Listen for theme button clicks

themeToggle.addEventListener("click", toggleTheme);

// =====================================
// 2. MOBILE NAVIGATION
// =====================================

// MOBILE NAVIGATION
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");
const navigationItems = navLinks?.querySelectorAll("a");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("active");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation menu" : "Open navigation menu",
    );

    menuToggle.textContent = isOpen ? "✕" : "☰";
  });

  navigationItems.forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation menu");
      menuToggle.textContent = "☰";
    });
  });

  // Close menu when clicking outside
  document.addEventListener("click", (event) => {
    const clickedInsideMenu = navLinks.contains(event.target);
    const clickedToggle = menuToggle.contains(event.target);

    if (!clickedInsideMenu && !clickedToggle) {
      navLinks.classList.remove("active");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation menu");
      menuToggle.textContent = "☰";
    }
  });
}

// =====================================
// 3. BACK TO TOP
// =====================================

const backToTop = document.getElementById("back-to-top");

// Show button after scrolling
window.addEventListener("scroll", () => {
  if (window.scrollY > 400) {
    backToTop.classList.add("show");
  } else {
    backToTop.classList.remove("show");
  }
});

// Return to top when clicked
backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// =====================================
// 4. SCROLL ANIMATIONS
// =====================================

const revealElements = document.querySelectorAll(
  ".section-heading, .about-content, .skill-card, .project-card, .experience-card, .education-card, .contact-content",
);

const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");

        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15,
  },
);

// Observe selected elements
revealElements.forEach((element) => {
  element.classList.add("reveal");

  observer.observe(element);
});

// =====================================
// 5. CONTACT INTERACTIONS
// =====================================

const copyEmailButton = document.getElementById("copy-email");

if (copyEmailButton) {
  copyEmailButton.addEventListener("click", async () => {
    const email = "damilolaogunleye420@gmail.com";

    try {
      await navigator.clipboard.writeText(email);

      const originalText = copyEmailButton.textContent;
      copyEmailButton.textContent = "Copied!";

      setTimeout(() => {
        copyEmailButton.textContent = originalText;
      }, 2000);
    } catch (error) {
      console.error("Failed to copy email:", error);
      copyEmailButton.textContent = "Copy failed";
    }
  });
}

console.log("My portfolio website is running!");
