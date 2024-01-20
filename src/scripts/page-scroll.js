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
    page.style.transform = 'translateY(' + (-100 * counter) + '%)';
    makePaginationActive(counter);
  }

  function scrollUp() {
    if (validateCounter()) {
      counter = counter > 0 ? --counter : counter;
      page.style.transform = 'translateY(' + (-100 * counter) + '%)';
      makePaginationActive(counter);
    }
  }

  function scrollDown() {
    if (validateCounter()) {
      counter = counter === sections.length - 1 ? counter : ++counter;
      page.style.transform = 'translateY(' + (-100 * counter) + '%)';
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

  document.querySelector('.hero__button').addEventListener('click', e => {
    scroll(7);
  });

  window.addEventListener('keydown', e => {
    if (e.key === 'ArrowDown') {
      scrollDown();
    } else if (e.key === 'ArrowUp') {
      scrollUp();
    }
  });
});