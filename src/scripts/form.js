window.addEventListener('load', e => {

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

});
