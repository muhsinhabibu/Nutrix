
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const toolsMenuToggle = document.getElementById("toolsMenuToggle");
const toolsMenu = document.getElementById("toolsMenu");

if (toolsMenuToggle && toolsMenu) {
  let menuPinnedOpen = false;

  const setToolsMenuOpen = (isOpen) => {
    toolsMenu.classList.toggle("open", isOpen);
    toolsMenuToggle.setAttribute("aria-expanded", String(isOpen));
  };

  toolsMenuToggle.addEventListener("click", () => {
    menuPinnedOpen = !menuPinnedOpen;
    setToolsMenuOpen(menuPinnedOpen);
  });

  const dropdown = toolsMenuToggle.closest(".nav-dropdown");
  dropdown.addEventListener("pointerenter", () => setToolsMenuOpen(true));
  dropdown.addEventListener("pointerleave", () => {
    if (!menuPinnedOpen) setToolsMenuOpen(false);
  });
  dropdown.addEventListener("focusin", () => setToolsMenuOpen(true));
  dropdown.addEventListener("focusout", (event) => {
    if (!menuPinnedOpen && !dropdown.contains(event.relatedTarget)) {
      setToolsMenuOpen(false);
    }
  });

  document.addEventListener("click", (event) => {
    if (!event.target.closest(".nav-dropdown")) {
      menuPinnedOpen = false;
      setToolsMenuOpen(false);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      menuPinnedOpen = false;
      setToolsMenuOpen(false);
      toolsMenuToggle.focus();
    }
  });
}

const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

// Prepare a contact email
const contactForm = document.getElementById("contactForm");
if (contactForm) contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  const result = document.getElementById("contactResult");

  if (!name || !email || !message) {
    result.textContent = "Please complete all fields.";
    return;
  }

  const subject = encodeURIComponent(`NutriX enquiry from ${name}`);
  const body = encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\n\n${message}`
  );

  const recipient = "muhsinhabibu20@gmail.com";

  result.innerHTML = "";

  const link = document.createElement("a");
  link.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
  link.textContent = "Open your email app to send the enquiry";
  link.className = "contact-link";

  result.appendChild(link);
});