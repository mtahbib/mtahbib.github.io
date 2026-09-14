document.addEventListener('DOMContentLoaded', function () {
  var form = document.getElementById('contact-form');
  if (!form) return;

  var loading = form.querySelector('.loading');
  var errorMessage = form.querySelector('.error-message');
  var sentMessage = form.querySelector('.sent-message');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    sentMessage.style.display = 'none';
    errorMessage.style.display = 'none';
    errorMessage.textContent = '';
    loading.style.display = 'block';

    fetch(form.action, {
      method: 'POST',
      headers: { 'Accept': 'application/json' },
      body: new FormData(form)
    })
      .then(function (response) {
        if (response.ok) return response.json();
        throw new Error('Request failed');
      })
      .then(function () {
        loading.style.display = 'none';
        sentMessage.style.display = 'block';
        form.reset();
      })
      .catch(function () {
        loading.style.display = 'none';
        errorMessage.textContent = 'Something went wrong. Please email mtahbib@gmail.com directly.';
        errorMessage.style.display = 'block';
      });
  });
});
