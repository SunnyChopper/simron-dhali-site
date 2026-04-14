// Animations
AOS.init({
  anchorPlacement: 'top-left',
  duration: 1000
});

(function () {
  var btn = document.querySelector('.about-bio-toggle');
  var panel = document.getElementById('aboutBioCollapse');
  if (!btn || !panel) return;
  btn.addEventListener('click', function () {
    var open = btn.getAttribute('aria-expanded') === 'true';
    var nextOpen = !open;
    btn.setAttribute('aria-expanded', nextOpen ? 'true' : 'false');
    panel.classList.toggle('about-bio-expanded', nextOpen);
    btn.setAttribute('aria-label', nextOpen ? 'Show less about text' : 'Show full about text');
  });
})();

// Birthday RSVP page (birthday.html loads jQuery before this file)
if (typeof jQuery !== 'undefined') {
  const RSVP_DEADLINE = new Date('2022-03-18T00:00:00');

  var countdownEl = document.getElementById('countdown');
  if (countdownEl) {
    var countdownTimer = setInterval(function () {
      var now = new Date().getTime();
      var distance = RSVP_DEADLINE - now;

      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      countdownEl.innerHTML = days + 'd ' + hours + 'h ' + minutes + 'm ' + seconds + 's';

      if (distance < 0) {
        clearInterval(countdownTimer);

        $('#cidercadeRsvpButton').attr('disabled', true);
        $('#fogoRsvpButton').attr('disabled', true);
        $('#sipPhoRsvpButton').attr('disabled', true);
        $('#birthdayPregameRsvpButton').attr('disabled', true);

        $('#cidercadeRsvpExpired').show();
        $('#fogoRsvpExpired').show();
        $('#sipPhoRsvpExpired').show();
        $('#birthdayPregameRsvpExpired').show();

        countdownEl.innerHTML = '0d 0h 0m 0s';
      }
    }, 1000);
  }

  /* --- Form Submission Handlers --- */

  $('#cidercade-form').on('submit', function (e) {
    e.preventDefault();

    $('#cidercadeRsvpSubmitButton').attr('disabled', true);

    var formData = new FormData(this);

    var name = formData.get('name');
    var email = formData.get('email');

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

    $('#cidercadeRsvpSubmitButton').attr('disabled', false);
  });

  $('#fogo-form').on('submit', function (e) {
    e.preventDefault();

    $('#fogoRsvpSubmitButton').attr('disabled', true);

    var formData = new FormData(this);

    var name = formData.get('name');
    var email = formData.get('email');

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

    $('#fogoRsvpSubmitButton').attr('disabled', false);
  });

  $('#sippho-form').on('submit', function (e) {
    e.preventDefault();

    $('#sipPhoRsvpSubmitButton').attr('disabled', true);

    var formData = new FormData(this);

    var name = formData.get('name');
    var email = formData.get('email');

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

    $('#sipPhoRsvpSubmitButton').attr('disabled', false);
  });

  $('#birthday-pregame-form').on('submit', function (e) {
    e.preventDefault();

    $('#birthdayPregameRsvpSubmitButton').attr('disabled', true);

    var formData = new FormData(this);

    var name = formData.get('name');
    var email = formData.get('email');

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

    $('#birthdayPregameRsvpSubmitButton').attr('disabled', false);
  });
}

function submitRsvp(e, formId) {
  e.preventDefault();

  var formData = new FormData(document.querySelector('#' + formId));
  var name = document.getElementById('name').value;
  var email = document.getElementById('email').value;

  if (name.length > 0 && email.length > 0) {
    var queryString = new URLSearchParams(formData).toString();

    var xhr = new XMLHttpRequest();
  } else {
    alert('Please fill out the form');
  }

  return false;
}
