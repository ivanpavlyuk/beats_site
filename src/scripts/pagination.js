window.addEventListener('load', e => {
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
});

