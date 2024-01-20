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

    if (deltaY > 100) {
      counter = counter > 0 ? --counter : counter;
      page.style.marginTop = -100 * counter + 'vh';
      startY = e.touches[0].clientY;
    } else if (deltaY < -100) {
      counter = counter === sections.length - 1 ? counter : ++counter;
      page.style.marginTop = -100 * counter + 'vh';
      startY = e.touches[0].clientY;
    }
  });
});