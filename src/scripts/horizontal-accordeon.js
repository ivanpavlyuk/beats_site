window.addEventListener('load', e => {
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
});

