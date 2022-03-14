// Animations
AOS.init({
  anchorPlacement: 'top-left',
  duration: 1000
});

// Add your javascript here
$('#cidercade-form').on('submit', function (e) {
  e.preventDefault();

  var formData = new FormData(this);

  let name = formData.get('name');
  let email = formData.get('email');

  if (name.length > 0 && email.length > 0) {
    $.ajax({
      url: 'https://script.google.com/macros/s/AKfycbzfS7-40uhrEAfq5OaCXW6oruB7MAJkrtnfg079snFxbJQCxTM/exec',
      method: 'POST',
      dataType: 'json',
      data: $(this).serialize(),
      success: function (response) {
        if (response.result == 'success') {
          $('#cidercadeRsvpModal').modal('hide');
        } else {
          alert('Something went wrong. Please try again.');
        }
      },
      error: function () {
        alert('Something went wrong. Please try again.');
      }
    });
  } else {
    alert('Please fill out the form');
  }
});
function submitRsvp(e, formId) {
  e.preventDefault();

  var formData = new FormData(document.querySelector(`#${formId}`));
  var name = document.getElementById('name').value;
  var email = document.getElementById('email').value;

  if (name.length > 0 && email.length > 0) {
    let queryString = new URLSearchParams(formData).toString();

    const xhr = new XMLHttpRequest();
  } else {
    alert('Please fill out the form');
  }

  return false;
}