// Animations
AOS.init({
  anchorPlacement: 'top-left',
  duration: 1000
});

// Add your javascript here
const RSVP_DEADLINE = new Date('2022-03-18T00:00:00');

var countdownTimer = setInterval(() =>{
  let now = new Date().getTime();
  let distance = RSVP_DEADLINE - now;

  let days = Math.floor(distance / (1000 * 60 * 60 * 24));
  let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById('countdown').innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;

  if (distance < 0) {
    clearInterval(countdownTimer);

    // Disable the RSVP buttons
    $('#cidercadeRsvpButton').attr('disabled', true);
    $('#fogoRsvpButton').attr('disabled', true);
    $('#sipPhoRsvpButton').attr('disabled', true);
    $('#birthdayPregameRsvpButton').attr('disabled', true);

    // Show the RSVP deadline has passed
    $('#cidercadeRsvpExpired').show();
    $('#fogoRsvpExpired').show();
    $('#sipPhoRsvpExpired').show();
    $('#birthdayPregameRsvpExpired').show();

    // Show the RSVP deadline has passed
    document.getElementById('countdown').innerHTML = '0d 0h 0m 0s';
  }
}, 1000);

/* --- Form Submission Handlers --- */

$('#cidercade-form').on('submit', function (e) {
  e.preventDefault();

  // Disable the RSVP button
  $('#cidercadeRsvpSubmitButton').attr('disabled', true);

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
          $('#cidercadeRsvpModal').hide();
          $('.modal-backdrop').hide();
        } else {
          alert('Something went wrong. Please try again.');
        }
      },
      error: function (xhr, status, error) {
        alert(xhr.responseText);
      }
    });
  } else {
    alert('Please fill out the form');
  }

  // Re-enable the RSVP button
  $('#cidercadeRsvpSubmitButton').attr('disabled', false);
});

$('#fogo-form').on('submit', function (e) {
  e.preventDefault();

  // Disable the RSVP button
  $('#fogoRsvpSubmitButton').attr('disabled', true);

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
          $('#fogoRsvpModal').hide();
          $('.modal-backdrop').hide();
        } else {
          alert('Something went wrong. Please try again.');
        }
      },
      error: function (xhr, status, error) {
        alert(xhr.responseText);
      }
    });
  } else {
    alert('Please fill out the form');
  }

  // Re-enable the RSVP button
  $('#fogoRsvpSubmitButton').attr('disabled', false);
});

$('#sippho-form').on('submit', function (e) {
  e.preventDefault();

  // Disable the RSVP button
  $('#sipPhoRsvpSubmitButton').attr('disabled', true);

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
          $('#sipPhoRsvpModal').hide();
          $('.modal-backdrop').hide();
        } else {
          alert('Something went wrong. Please try again.');
        }
      },
      error: function (xhr, status, error) {
        alert(xhr.responseText);
      }
    });
  } else {
    alert('Please fill out the form');
  }

  // Re-enable the RSVP button
  $('#sipPhoRsvpSubmitButton').attr('disabled', false);
});

$('#birthday-pregame-form').on('submit', function (e) {
  e.preventDefault();

  // Disable the RSVP button
  $('#birthdayPregameRsvpSubmitButton').attr('disabled', true);

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
          $('#birthdayPregameRsvpModal').hide();
          $('.modal-backdrop').hide();
        } else {
          alert('Something went wrong. Please try again.');
        }
      },
      error: function (xhr, status, error) {
        alert(xhr.responseText);
      }
    });
  } else {
    alert('Please fill out the form');
  }

  // Re-enable the RSVP button
  $('#birthdayPregameRsvpSubmitButton').attr('disabled', false);
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