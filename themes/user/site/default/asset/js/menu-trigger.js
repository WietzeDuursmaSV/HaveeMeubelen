document.addEventListener("DOMContentLoaded", function () {
  const menuTriggers = document.querySelectorAll("[data-menu-trigger]");
  const hamburger = document.getElementById("nav-hamburger");
  const navMenu = document.getElementById("nav-menu");
  const navOverlay = document.getElementById("nav-overlay");
  let isAnimating = false;

  function openMobileMenu() {
    hamburger.classList.add("active");
    navMenu.classList.add("active");
    navOverlay.classList.add("active");
  }

  function closeMobileMenu() {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
    navOverlay.classList.remove("active");
  }

  // Hamburger menu toggle
  if (hamburger) {
    hamburger.addEventListener("click", function () {
      if (navMenu.classList.contains("active")) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
  }

  // Overlay sluiten bij klik
  if (navOverlay) {
    navOverlay.addEventListener("click", function () {
      closeMobileMenu();
      closeAllMenus();
    });
  }

  // Close mobile menu when clicking a menu item
  document.querySelectorAll(".nav-menu__top-level-item").forEach((item) => {
    item.addEventListener("click", function () {
      // Don't close if it's a data-menu-trigger (submenu)
      if (this.hasAttribute("data-menu-trigger")) {
        return;
      }
      // Close mobile menu for regular links
      if (window.innerWidth <= 768) {
        closeMobileMenu();
      }
    });
  });

  function getOpenMenu() {
    return document.querySelector("[data-menu].active");
  }

  function getOpenTrigger() {
    return document.querySelector("[data-menu-trigger].active");
  }

  function closeAllMenus() {
    document.querySelectorAll("[data-menu]").forEach((menu) => {
      menu.style.maxHeight = "0px";
      menu.classList.remove("active");
    });
    menuTriggers.forEach((trigger) => {
      trigger.classList.remove("active");
    });
  }

  function openMenu(menu, trigger) {
    menu.style.maxHeight = menu.scrollHeight + "px";
    menu.classList.add("active");
    trigger.classList.add("active");
  }

  menuTriggers.forEach((trigger) => {
    trigger.addEventListener("click", function (e) {
      e.preventDefault();

      if (isAnimating) return;

      const menuName = this.getAttribute("data-menu-trigger");
      const menu = document.querySelector(`[data-menu="${menuName}"]`);

      if (!menu) return;

      const isOpen = menu.classList.contains("active");
      const currentlyOpenMenu = getOpenMenu();

      // Zelfde menu aanklikken: gewoon sluiten
      if (isOpen) {
        closeAllMenus();
        return;
      }

      // Een ander menu is open: eerst sluiten, daarna pas het nieuwe openen
      if (currentlyOpenMenu) {
        isAnimating = true;
        closeAllMenus();

        // Wacht tot de sluit-animatie klaar is (overeenkomend met CSS transitie max-height)
        const transitionDuration =
          parseFloat(getComputedStyle(currentlyOpenMenu).transitionDuration) *
          1000;

        setTimeout(() => {
          openMenu(menu, trigger);
          isAnimating = false;
        }, transitionDuration);
      } else {
        // Geen menu open: direct openen
        openMenu(menu, trigger);
      }
    });
  });

  // Sluit menu bij klik buiten
  document.addEventListener("click", function (e) {
    if (
      !e.target.closest("[data-menu-trigger]") &&
      !e.target.closest("[data-menu]")
    ) {
      closeAllMenus();
    }
  });
});
