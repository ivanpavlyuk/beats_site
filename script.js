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

// Слайдер на плагине slick
$(document).ready(function () {
  $('.slider').slick({
  });
});

// Пагинация в секции Отзывы
{
  const buttons = document.querySelectorAll('.feedbacks__button');
  const cards = document.querySelectorAll('.feedbacks__card');

  for (let index = 0; index < buttons.length; index++) {
    const element = buttons[index];

    element.addEventListener('click', function () {
      cards.forEach(e => e.classList.remove('feedbacks__card_active'));
      buttons.forEach(e => e.classList.remove('feedbacks__button_active'));
      cards[index].classList.add('feedbacks__card_active');
      element.classList.add('feedbacks__button_active');
    })
  }
}

// Форма
$('.form').submit(function (e) {
  e.preventDefault();

  const form = $(e.currentTarget);
  const name = form.find('[name="name"]');
  const phone = form.find('[name="phone"]');
  const comment = form.find('[name="comment"]');
  const to = form.find('[name="to"]');

  [phone, name, comment, to].forEach(field => {
    field.removeClass('form__input-error');
    if (field.val().trim() === '') {
      field.addClass('form__input-error');
    }
  });

  const modal = $('#modal');
  const message = modal.find('.delivery__message');

  if (form.find('.form__input-error').length === 0) {
    $.ajax({
      type: "post",
      url: "https://webdev-api.loftschool.com/sendmail",
      data: {
        name: name.val(),
        phone: phone.val(),
        comment: comment.val(),
        to: to.val()
      },
      success: data => {
        message.text(data.message);
        Fancybox.show([{
          src: '#modal',
          type: 'inline'
        }]);
      },
      error: data => {
        const response = data.responseJSON.message;
        message.text(response);
        message.css('color', 'red');
        Fancybox.show([{
          src: '#modal',
          type: 'inline'
        }]);
        message.css('color', 'black');
      }
    });


  }


  $('.delivery__button').click(function (e) {
    e.preventDefault();
    Fancybox.close();
  });
});