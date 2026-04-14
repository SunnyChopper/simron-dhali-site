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

(function () {
  var key = window.SIMRON_DHALI_GA_STORAGE_KEY || 'simrondhali_ga_consent_v1';
  var GEO_SESSION = 'simrondhali_geo_eea';
  var EEA_REGIONS = new Set([
    'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR', 'HU', 'IE',
    'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE',
    'IS', 'LI', 'NO', 'GB', 'CH'
  ]);

  var banner = document.getElementById('cookie-consent-banner');
  if (!banner) return;
  var accept = document.getElementById('cookie-consent-accept');
  var reject = document.getElementById('cookie-consent-reject');
  if (!accept || !reject) return;

  function hideBanner() {
    banner.hidden = true;
  }

  function isEeaCountry(code) {
    return EEA_REGIONS.has(String(code || '').trim().toUpperCase());
  }

  function shouldSkipGeoLookup() {
    if (window.location.protocol === 'file:') return true;
    var h = window.location.hostname;
    if (!h || h === 'localhost' || h === '127.0.0.1') return true;
    return false;
  }

  function fetchCountryCode() {
    return fetch('https://get.geojs.io/v1/country.json', { credentials: 'omit' })
      .then(function (r) {
        return r.ok ? r.json() : Promise.reject();
      })
      .then(function (data) {
        var code = (data && (data.country_code || data.country)) || '';
        return code ? String(code) : Promise.reject();
      })
      .catch(function () {
        return fetch('https://ipwho.is/json/', { credentials: 'omit' })
          .then(function (r) {
            return r.ok ? r.json() : Promise.reject();
          })
          .then(function (data) {
            if (!data || !data.success || !data.country_code) return Promise.reject();
            return String(data.country_code);
          });
      });
  }

  function detectEea(callback) {
    try {
      var cached = sessionStorage.getItem(GEO_SESSION);
      if (cached === '1') {
        callback(true);
        return;
      }
      if (cached === '0') {
        callback(false);
        return;
      }
    } catch (e) {}

    if (shouldSkipGeoLookup()) {
      callback(false);
      return;
    }

    fetchCountryCode()
      .then(function (code) {
        var eea = isEeaCountry(code);
        try {
          sessionStorage.setItem(GEO_SESSION, eea ? '1' : '0');
        } catch (e) {}
        callback(eea);
      })
      .catch(function () {
        callback(false);
      });
  }

  try {
    if (localStorage.getItem(key)) {
      hideBanner();
      return;
    }
  } catch (e) {}

  accept.addEventListener('click', function () {
    try {
      localStorage.setItem(key, 'granted');
    } catch (e) {}
    if (typeof window.gtag === 'function') {
      window.gtag('consent', 'update', {
        analytics_storage: 'granted',
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied'
      });
      window.gtag('event', 'page_view', {
        page_title: document.title,
        page_location: window.location.href
      });
    }
    hideBanner();
  });

  reject.addEventListener('click', function () {
    try {
      localStorage.setItem(key, 'denied');
    } catch (e) {}
    if (typeof window.gtag === 'function') {
      window.gtag('consent', 'update', {
        analytics_storage: 'denied',
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied'
      });
    }
    hideBanner();
  });

  detectEea(function (eea) {
    if (!eea) {
      hideBanner();
      return;
    }
    try {
      if (localStorage.getItem(key)) return;
    } catch (e) {}
    banner.hidden = false;
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
