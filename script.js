// Бургер
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

// Команда(аккордеон)
$(document).ready(function () {
  const dropdowns = $('.person__info');
  const buttons = $('.person__name');

  dropdowns.slideUp();
  buttons.click(function (e) {
    let currentButton = $(e.currentTarget);
    if (currentButton.hasClass('person__name_active')) {
      dropdowns.slideUp();
      buttons.removeClass('person__name_active');
    } else {
      dropdowns.slideUp();
      currentButton.addClass('person__name_active');
      currentButton.siblings('.person__info').slideDown();
    }
  });
});