window.addEventListener("load", () => {
    document.body.classList.remove("preload");
});

const mainMenuOverlay = document.querySelector(".main-menu-overlay");
const mainMenu = document.querySelector("#main-menu");
const mainMenuOpenBtn = document.querySelector(".navbar__burger-icon");
const mainMenuCloseBtn = document.querySelector(".main-menu__close-btn");
const mainMenuLinks = document.querySelectorAll(".nav-link a");
const mainMenuContactLinks = document.querySelector(".main-menu-contact-links");


// OPEN MAIN MENU 
mainMenuOpenBtn.addEventListener("click", () => {
  mainMenuOpenBtn.setAttribute("aria-expanded", "true");
  mainMenuOverlay.classList.add("main-menu-overlay--entrance");

  setTimeout(() => {
    mainMenu.classList.add("main-menu--active");
  }, 350);

  setTimeout(() => {
    mainMenuLinks.forEach((link, index) => {
      setTimeout(() => {
        link.classList.remove("nav-link--exit");
        link.classList.add("nav-link--entrance");
      }, index * 100);
    });
    mainMenuContactLinks.classList.add("main-menu-contact-links--entrance");
    mainMenuCloseBtn.classList.add("main-menu__close-btn--active");
  }, 800);
});



// CLOSE MAIN MENU 
mainMenuCloseBtn.addEventListener("click", () => {
    mainMenuOpenBtn.setAttribute("aria-expanded", "false");
    mainMenuContactLinks.classList.remove("main-menu-contact-links--entrance");
    mainMenuCloseBtn.classList.remove("main-menu__close-btn--active");

    // Stagger the exit animation for each link
    mainMenuLinks.forEach((link, index) => {
      setTimeout(() => {
        link.classList.remove("nav-link--entrance");
      }, index * 100);
    });

    setTimeout(() => {
        mainMenu.classList.remove("main-menu--active");
    }, 750);

    setTimeout(() => {
        mainMenuOverlay.classList.remove("main-menu-overlay--entrance");
    }, 500);
});