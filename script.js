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
  message.css('color', 'black');

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

      }
    });
  }

  $('.delivery__button').click(function (e) {
    e.preventDefault();
    Fancybox.close();
  });
});

// Горизонтальный аккордеон
function showAccordeon() {
  action();

  function action() {
    const buttons = document.querySelectorAll('.colors__item-title');
    const blocks = document.querySelectorAll('.colors__item-content');
    const texts = document.querySelectorAll('.colors__item-text');

    let buttonsWidth = 0;
    let blockWidth = 0;

    function closeButtons() {
      buttons.forEach(button => {
        button.isClosed = true;
        button.nextElementSibling.style.width = '0px';
        buttonsWidth = 0;
        blockWidth = 0;
      });
    }

    function closeButtonsOutside() {
      document.addEventListener('click', (e) => {
        let withinBoundaries = false;
        buttons.forEach(button => {
          withinBoundaries = withinBoundaries || e.composedPath().includes(button);
        });

        if (!withinBoundaries) {
          closeButtons();
        }
      })
    }

    closeButtonsOutside();
    closeButtons();

    buttons.forEach(button => {
      button.addEventListener('click', e => {
        if (window.innerWidth < 830) {
          // Calculate dimensions
          buttons.forEach(button => {
            buttonsWidth += button.offsetWidth;
          });
          let textWidth = window.innerWidth - buttonsWidth;
          buttons.forEach(button => {
            button.nextElementSibling.querySelector('.colors__item-text').style.width = textWidth + 'px';
          });

          if (button.isClosed) {
            closeButtons();
            button.nextElementSibling.style.width = textWidth + 'px';
            button.isClosed = false;
          } else {
            button.nextElementSibling.style.width = '0px';
            closeButtons();
          }
        } else {
          if (button.isClosed) {
            closeButtons();
            button.nextElementSibling.style.width = '524px';
            button.nextElementSibling.querySelector('.colors__item-text').style.width = '524px';
            button.isClosed = false;
          } else {
            button.nextElementSibling.style.width = '0px';
            closeButtons();
          }
        }
      })

    });
  }
}
showAccordeon();

// Прокрутка страницы

window.addEventListener('load', e => {

  const page = document.querySelector('.wrapper__main-content');
  const sections = document.querySelectorAll('.section');
  const links = document.querySelectorAll('.menu__link');
  const dots = document.querySelectorAll('.fixed-paginator__button');

  let counter = 0;

  function validateCounter() {
    return counter >= 0 && counter < sections.length;
  }

  function makePaginationActive(counter) {
    dots.forEach(dot => {
      dot.classList.remove('fixed-paginator__button_active');
    });
    dots[counter].classList.add('fixed-paginator__button_active');
  }

  function scroll(index) {
    counter = index;
    page.style.marginTop = -100 * counter + 'vh';
    makePaginationActive(counter);
  }

  function scrollUp() {
    if (validateCounter()) {
      counter = counter > 0 ? --counter : counter;
      page.style.marginTop = -100 * counter + 'vh';
      makePaginationActive(counter);
    }
  }

  function scrollDown() {
    if (validateCounter()) {
      counter = counter === sections.length - 1 ? counter : ++counter;
      page.style.marginTop = -100 * counter + 'vh';
      makePaginationActive(counter);
    }
  }

  links.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      sections.forEach((section, index) => {
        if (e.target.getAttribute('href') === '#' + section.getAttribute('id')) {
          scroll(index);
        }
      });
    })
  });

  window.addEventListener('wheel', e => {
    if (e.deltaY < 0) {
      scrollUp();
    } else {
      scrollDown();
    }
  })

  dots.forEach((dot, index) => {
    dot.addEventListener('click', e => {
      scroll(index);
    })
  });

  window.addEventListener('keydown', e => {
    if (e.key === 'ArrowDown') {
      scrollDown();
    } else if (e.key === 'ArrowUp') {
      scrollUp();
    }
  });
})



// Скролл для телефонов
window.addEventListener('load', () => {
  const page = document.querySelector('.wrapper__main-content');
  const sections = ['hero', 'advantages', 'models', 'team', 'colors', 'feedbacks', 'delivery', 'map', 'contacts'];
  let counter = 0;
  window.location.hash = "#" + sections[counter];

  let startY = 0;

  window.addEventListener('touchstart', (e) => {
    startY = e.touches[0].clientY;
  });

  window.addEventListener('touchmove', (e) => {
    const deltaY = e.touches[0].clientY - startY;

    if (deltaY > 100) { // You can adjust this threshold
      counter = counter > 0 ? --counter : counter;
      page.style.marginTop = -100 * counter + 'vh';
      startY = e.touches[0].clientY;
    } else if (deltaY < -100) { // You can adjust this threshold
      counter = counter === sections.length - 1 ? counter : ++counter;
      page.style.marginTop = -100 * counter + 'vh';
      startY = e.touches[0].clientY;
    }
  });
});
