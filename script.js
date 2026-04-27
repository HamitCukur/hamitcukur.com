document.addEventListener('DOMContentLoaded', function() {
  const mobileNavButton = document.querySelector('.mobile-nav-button');
  const mobileNavOverlay = document.querySelector('.mobile-nav-overlay');
  const mobileNav = document.querySelector('.mobile-nav');
  let isMenuOpen = false;

  if (!mobileNavButton || !mobileNavOverlay || !mobileNav) {
    return;
  }

  function toggleMobileNav() {
    isMenuOpen = !isMenuOpen;
    mobileNavButton.classList.toggle('active');
    mobileNavOverlay.classList.toggle('active');
    mobileNav.classList.toggle('active');

    document.body.style.overflow = isMenuOpen ? 'hidden' : '';

    const menuItems = mobileNav.querySelectorAll('li');
    menuItems.forEach(item => {
      item.style.transitionDelay = '0s';
      item.style.opacity = '0';
      item.style.transform = 'translateY(10px)';
    });

    if (isMenuOpen) {
      setTimeout(() => {
        menuItems.forEach((item, index) => {
          item.style.transitionDelay = `${index * 0.1}s`;
          item.style.opacity = '1';
          item.style.transform = 'translateY(0)';
        });
      }, 100);
    }
  }

  mobileNavButton.addEventListener('click', toggleMobileNav);

  const mobileNavLinks = document.querySelectorAll('.mobile-nav a');
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (isMenuOpen) {
        toggleMobileNav();
      }
    });
  });

  mobileNavOverlay.addEventListener('click', (e) => {
    if (e.target === mobileNavOverlay && isMenuOpen) {
      toggleMobileNav();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isMenuOpen) {
      toggleMobileNav();
    }
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const footer = document.querySelector('footer');
  if (!footer) return;

  const year = new Date().getFullYear();
  footer.innerHTML = `&copy; ${year} mehmet hamit &ccedil;ukur`;
});

document.addEventListener('DOMContentLoaded', function() {
  const links = document.querySelectorAll('a[href^="#"]');
  for (const link of links) {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
        });
      }
    });
  }
});

const COOKIE_CONSENT_NAME = 'cookie-consent';
const COOKIE_CONSENT_VALUE = 'accepted';

function setCookie(name, value, days) {
  const maxAge = days * 24 * 60 * 60;
  const secure = window.location.protocol === 'https:' ? ';Secure' : '';
  const hostname = window.location.hostname;
  const domain = hostname === 'hamitcukur.com' || hostname.endsWith('.hamitcukur.com')
    ? ';domain=.hamitcukur.com'
    : '';

  document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)};max-age=${maxAge};path=/;SameSite=Lax${secure}${domain}`;
}

function getCookie(name) {
  const nameEQ = encodeURIComponent(name) + "=";
  const ca = document.cookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
  }
  return null;
}

function getCookieConsentBanner() {
  let consentBanner = document.getElementById('cookie-consent');

  if (!consentBanner) {
    consentBanner = document.createElement('div');
    consentBanner.id = 'cookie-consent';
    consentBanner.innerHTML = 'this website uses cookies to ensure you get the best experience. <button id="cookie-close" type="button">got it!</button>';
    document.body.appendChild(consentBanner);
  }

  return consentBanner;
}

function grantTrackingConsent() {
  if (window.gtag) {
    gtag('consent', 'update', {
      'analytics_storage': 'granted'
    });
  }

  if (window.hj) {
    hj('stateChange', 'granted');
  }
}

function handleCookieConsent() {
  const consentBanner = getCookieConsentBanner();
  const closeButton = document.getElementById('cookie-close');
  const hasConsent = getCookie(COOKIE_CONSENT_NAME) === COOKIE_CONSENT_VALUE;

  if (hasConsent) {
    consentBanner.style.display = 'none';
    grantTrackingConsent();
    return;
  }

  consentBanner.style.display = 'block';

  if (closeButton && !closeButton.dataset.cookieHandlerAttached) {
    closeButton.dataset.cookieHandlerAttached = 'true';
    closeButton.addEventListener('click', function() {
      setCookie(COOKIE_CONSENT_NAME, COOKIE_CONSENT_VALUE, 365);
      consentBanner.style.display = 'none';
      grantTrackingConsent();
    });
  }
}

window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent', 'default', {
  'analytics_storage': 'denied'
});

window.addEventListener('load', function() {
  if (window.performance) {
    const timing = window.performance.timing;
    const pageLoadTime = timing.loadEventEnd - timing.navigationStart;
    if (window.gtag) {
      gtag('event', 'timing_complete', {
        'name': 'page_load',
        'value': pageLoadTime,
        'event_category': 'Performance'
      });
    }
  }
});

let maxScroll = 0;
window.addEventListener('scroll', function() {
  const percent = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight * 100;
  if (percent > maxScroll) {
    maxScroll = Math.round(percent);
    if (maxScroll % 25 === 0 && window.gtag) {
      gtag('event', 'scroll_depth', {
        'event_category': 'Engagement',
        'event_label': maxScroll + '%'
      });
    }
  }
});

document.addEventListener('DOMContentLoaded', function() {
  handleCookieConsent();
});

function buildYouTubeEmbedUrl(videoId) {
  if (!/^[A-Za-z0-9_-]{11}$/.test(videoId)) {
    return '';
  }

  return `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&playsinline=1`;
}

document.addEventListener('DOMContentLoaded', function() {
  const latestYouTubeFrame = document.querySelector('[data-latest-youtube]');
  if (!latestYouTubeFrame) return;

  fetch('/api/latest-youtube', {
    headers: {
      'Accept': 'application/json',
    },
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('latest youtube request failed');
      }
      return response.json();
    })
    .then(video => {
      const embedUrl = video.embedUrl || buildYouTubeEmbedUrl(video.videoId);
      if (!embedUrl) return;

      latestYouTubeFrame.src = embedUrl;
      if (video.title) {
        latestYouTubeFrame.title = `${video.title} | youtube`;
      }
    })
    .catch(() => {});
});
