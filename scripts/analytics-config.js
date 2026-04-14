(function () {
  var MEASUREMENT_ID = 'G-9ZKE26PNTC';
  gtag('js', new Date());
  gtag('config', MEASUREMENT_ID, {
    page_title: document.title,
    page_location: window.location.href,
    cookie_flags: 'SameSite=Lax;Secure',
    send_page_view: true
  });

  window.trackEvent = function () {
    if (typeof window.gtag === 'function') {
      window.gtag.apply(null, arguments);
    }
  };

  window.navTrack = function (sectionId, linkText) {
    window.trackEvent('nav_click', {
      section_id: sectionId,
      link_url: String(new URL('#' + sectionId, location.href)),
      link_text: linkText || sectionId
    });
  };

  window.outboundTrack = function (url, linkText, placement) {
    var u = new URL(url);
    window.trackEvent('outbound_click', {
      link_url: u.href,
      link_text: linkText,
      link_domain: u.hostname,
      outbound: true,
      placement: placement || ''
    });
  };

  window.fileDownloadTrack = function (pathOrUrl, fileName, linkText) {
    var u = new URL(pathOrUrl, location.href);
    var name = fileName || u.pathname.split('/').pop() || '';
    var ext = name.indexOf('.') !== -1 ? name.split('.').pop() : '';
    window.trackEvent('file_download', {
      file_name: name,
      file_extension: ext,
      link_url: u.href,
      link_text: linkText || name
    });
  };

  window.selectContentTrack = function (itemId, contentType, pathOrUrl, linkText) {
    var u = new URL(pathOrUrl, location.href);
    window.trackEvent('select_content', {
      content_type: contentType,
      item_id: itemId,
      link_url: u.href,
      link_text: linkText
    });
  };
})();
