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
  const sections = document.querySelectorAll('.section');
  let counter = 0;

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

// Карта
let myMap;
const init = () => {
  myMap = new ymaps.Map("map", {
    center: [59.93916998692174, 30.309015096732622],
    zoom: 11,
    controls: [],
  });

  let coords = [
    [59.94554327989287, 30.38935262114668],
    [59.91142323563909, 30.50024587065841],
    [59.88693161784606, 30.319658102103713],
    [59.97033574821672, 30.315194906302924],
  ],
    myCollection = new ymaps.GeoObjectCollection({}, {
      draggable: false,
      iconLayout: 'default#image',
      iconImageHref: './img/icons/marker.svg',
      iconImageSize: [46, 57],
      iconImageOffset: [-35, -52]
    });

  for (let i = 0; i < coords.length; i++) {
    myCollection.add(new ymaps.Placemark(coords[i]));
  }

  myMap.geoObjects.add(myCollection);

  myMap.behaviors.disable('scrollZoom');
};

ymaps.ready(init);

// Плеер

const player = document.querySelector('.player');
const video = document.querySelector('video');
const bigPlayButton = document.querySelector('.player__play');
const smallPlayButton = document.querySelector('.player__controls-play');
const progress = document.querySelectorAll('.player__controls-progress');
const previous = document.querySelectorAll('.player__controls-previous');
const muteButton = document.querySelector('.player__controls-mute');
const positionBar = progress[0];
const volumeBar = progress[1];
let isPlayerActive = false;
let isVideoPaused = false;
let isMuted = false;

function setVolume() {
  video.volume = volumeBar.value / 10;
  setBarPreviousWidth(volumeBar);
}

function muteVideo() {
  video.muted = true;
  isMuted = true;
}

function unMuteVideo() {
  video.muted = false;
  isMuted = false;
}

function setPlayerInactive() {
  player.classList.remove('player_active');
  positionBar.value = 0;
  volumeBar.value = 5;
  positionBar.max = Math.round(video.duration);
  positionBar.disabled = true;
  isPlayerActive = false;
  setBarPreviousWidth(positionBar);
  unMuteVideo();
  setVolume();
}

function setPlayerActive() {
  player.classList.add('player_active');
  positionBar.disabled = false;
  isPlayerActive = true;
}

function setBarPreviousWidth(element) {
  element.previousElementSibling.style.width = element.value / element.max * 100 + '%';
}

function playVideo() {
  video.addEventListener('timeupdate', () => {
    positionBar.value = Math.round(video.currentTime);
    setBarPreviousWidth(positionBar);
  });
  positionBar.addEventListener('input', e => {
    video.currentTime = positionBar.value;
    setBarPreviousWidth(positionBar);
  });
  video.play();
  video.classList.remove('video_paused');
  isVideoPaused = false;
}

function pauseVideo() {
  video.pause();
  video.classList.add('video_paused');
  isVideoPaused = true;
}



video.addEventListener('loadeddata', () => {

  setPlayerInactive();
  bigPlayButton.addEventListener('click', e => {
    setPlayerActive();
    playVideo();
  });

  smallPlayButton.addEventListener('click', e => {
    if (!isPlayerActive) {
      setPlayerActive();
      playVideo();
    } else if (isPlayerActive && isVideoPaused) {
      playVideo();
    } else {
      pauseVideo();
    }
  });

  video.addEventListener('ended', e => {
    setPlayerInactive();
  });

  muteButton.addEventListener('click', e => {
    if (isMuted) {
      unMuteVideo();
    } else {
      muteVideo();
    }
  });

  volumeBar.addEventListener('input', e => {
    setVolume();
  });
});

