window.addEventListener('load', e => {

  const burgerButton = document.querySelector(".burger");
  burgerButton.addEventListener("click", operateMenu);

  function operateMenu() {
    const menu = document.querySelector(".fullscreen-menu");
    menu.classList.add("fullscreen-menu_active");

    const closeButton = document.querySelector(".fullscreen-menu__button");
    closeButton.addEventListener("click", () => {
      document
        .querySelector(".fullscreen-menu")
        .classList.remove("fullscreen-menu_active");
    });

    const menuItems = menu.querySelectorAll(".menu__item");
    menuItems.forEach((item) =>
      item.addEventListener("click", () => {
        menu.classList.remove("fullscreen-menu_active");
      })
    );
  }
});

