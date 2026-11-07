(function () {
  'use strict';

  var SWIPER_CSS = 'https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.css';
  var SWIPER_JS = 'https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.js';
  var MEDIA_BASE = 'https://www.astonmartin.com';

  function $(sel, root) {
    return (root || document).querySelector(sel);
  }

  function $all(sel, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(sel));
  }

  function absUrl(src) {
    if (!src) return '';
    if (/^https?:/.test(src)) return src;
    return MEDIA_BASE + (src.charAt(0) === '/' ? src : '/' + src);
  }

  function loadSvgSprite() {
    var url = document.body.getAttribute('data-svg-url') || 'assets/images/svg-sprite.svg';
    fetch(url)
      .then(function (r) { return r.text(); })
      .then(function (svg) {
        if ($('#svg-sprite-inline')) return;
        var wrap = document.createElement('div');
        wrap.id = 'svg-sprite-inline';
        wrap.style.display = 'none';
        wrap.innerHTML = svg;
        document.body.insertBefore(wrap, document.body.firstChild);
        document.body.classList.add('svg-loaded');
      })
      .catch(function () {
        document.body.classList.add('svg-loaded');
      });
  }

  function hidePreloader() {
    var p = $('.preloader-v4');
    if (!p || p.classList.contains('is-hidden')) return;
    p.classList.add('is-hidden', 'fadeout');
    document.body.classList.remove('noscroll');
    setTimeout(function () { if (p.parentNode) p.remove(); }, 900);
  }

  function initLazyImages() {
    $all('img.lazyload[data-src], img[data-src]').forEach(function (img) {
      var src = img.getAttribute('data-src');
      if (src && (!img.getAttribute('src') || img.getAttribute('src').indexOf('spinner') !== -1)) {
        img.src = absUrl(src);
      }
      img.classList.remove('lazyload');
      img.removeAttribute('data-src');
    });
  }

  function pickVideoSrc(source) {
    if (!source) return '';
    var mobile = window.matchMedia('(max-width: 767px)').matches;
    return (mobile && source.getAttribute('data-mobile-src')) ||
      source.getAttribute('data-src') ||
      source.getAttribute('data-video-normaldef') ||
      '';
  }

  function setupVideo(wrap, video, source) {
    var src = pickVideoSrc(source);
    if (!src) return;

    video.src = absUrl(src);
    video.muted = true;
    video.playsInline = true;
    video.setAttribute('playsinline', '');
    video.setAttribute('muted', '');

    wrap.classList.add('video--loaded');
    wrap.setAttribute('data-video-state', 'loaded');

    var cover = wrap.querySelector('[data-video-cover]');
    if (cover) {
      var landscape = cover.querySelector('[data-landscape-img-src]');
      var portrait = cover.querySelector('[data-portrait-img-src]');
      var imgSrc = (landscape && landscape.getAttribute('data-landscape-img-src')) ||
        (portrait && portrait.getAttribute('data-portrait-img-src'));
      if (imgSrc) {
        cover.style.backgroundImage = 'url(' + absUrl(imgSrc) + ')';
        cover.style.backgroundSize = 'cover';
        cover.style.backgroundPosition = 'center';
      }
    }
  }

  function initVideos() {
    $all('[data-video]').forEach(function (wrap) {
      var video = wrap.querySelector('video');
      var source = wrap.querySelector('source');
      if (video && source) setupVideo(wrap, video, source);
    });

    $all('.swiper-slide--video').forEach(function (wrap) {
      if (wrap.hasAttribute('data-video')) return;
      var video = wrap.querySelector('video');
      var source = wrap.querySelector('source');
      if (video && source) setupVideo(wrap, video, source);
    });
  }

  function loadScript(src) {
    return new Promise(function (resolve, reject) {
      if (document.querySelector('script[src="' + src + '"]')) {
        resolve();
        return;
      }
      var s = document.createElement('script');
      s.src = src;
      s.onload = resolve;
      s.onerror = reject;
      document.head.appendChild(s);
    });
  }

  function loadStylesheet(href) {
    if (document.querySelector('link[href="' + href + '"]')) return;
    var l = document.createElement('link');
    l.rel = 'stylesheet';
    l.href = href;
    document.head.appendChild(l);
  }

  function playSlideVideo(slide) {
    if (!slide) return;
    var v = slide.querySelector('video');
    if (v) v.play().catch(function () {});
  }

  function pauseOtherVideos(slides, activeSlide) {
    slides.forEach(function (s) {
      var vid = s.querySelector('video');
      if (vid && s !== activeSlide) vid.pause();
    });
  }

  function initSwipers() {
    if (typeof Swiper === 'undefined') return;

    $all('.hero-banner-carousel .swiper-container').forEach(function (el) {
      if (el.swiper) return;
      var section = el.closest('.hero-banner-carousel');
      new Swiper(el, {
        loop: true,
        speed: 900,
        autoplay: { delay: 8000, disableOnInteraction: false },
        parallax: true,
        pagination: {
          el: section ? section.querySelector('.swiper-pagination') : null,
          clickable: true
        },
        navigation: {
          nextEl: section ? section.querySelector('.swiper-button-next') : null,
          prevEl: section ? section.querySelector('.swiper-button-prev') : null
        },
        on: {
          slideChange: function () {
            var slide = this.slides[this.activeIndex];
            playSlideVideo(slide);
            pauseOtherVideos(this.slides, slide);
          },
          init: function () {
            playSlideVideo(this.slides[this.activeIndex]);
          }
        }
      });
    });

    $all('.models-vehicle-carousel .swiper-container').forEach(function (el) {
      if (el.swiper) return;
      var section = el.closest('.models-vehicle-carousel');
      new Swiper(el, {
        loop: true,
        speed: 800,
        slidesPerView: 1,
        navigation: {
          nextEl: section ? section.querySelector('.swiper-button-next') : null,
          prevEl: section ? section.querySelector('.swiper-button-prev') : null
        },
        on: {
          slideChange: function () {
            var slide = this.slides[this.activeIndex];
            playSlideVideo(slide);
            pauseOtherVideos(this.slides, slide);
          },
          init: function () {
            playSlideVideo(this.slides[this.activeIndex]);
          }
        }
      });
    });

    $all('.stories-block-with-cta.swiper-container').forEach(function (el) {
      if (el.swiper) return;
      new Swiper(el, {
        slidesPerView: 'auto',
        spaceBetween: 16,
        freeMode: true
      });
    });
  }

  function initNavigation() {
    var nav = $('.global-navigation-v2');
    var header = $('.global-header-v2');
    if (!nav || !header) return;

    function openNav() {
      nav.setAttribute('data-state', 'open');
      nav.setAttribute('aria-expanded', 'true');
      document.body.classList.add('nav-open', 'noscroll');
      var hamburger = $('.hamburger', header);
      var closeIcon = $('.close-icon', header);
      if (hamburger) hamburger.classList.add('hide');
      if (closeIcon) closeIcon.classList.remove('hide');
    }

    function closeNav() {
      nav.setAttribute('data-state', 'closed');
      nav.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('nav-open', 'noscroll');
      var hamburger = $('.hamburger', header);
      var closeIcon = $('.close-icon', header);
      if (hamburger) hamburger.classList.remove('hide');
      if (closeIcon) closeIcon.classList.add('hide');
    }

    header.addEventListener('click', function (e) {
      var t = e.target.closest('.hamburger, .close-icon, .close-btn');
      if (!t) return;
      e.preventDefault();
      if (t.classList.contains('hamburger')) openNav();
      else closeNav();
    });

    $all('.global-navigation-v2 .nav-item').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        var panel = btn.nextElementSibling;
        if (panel && panel.classList.contains('nav-panel')) {
          e.preventDefault();
          panel.setAttribute('aria-expanded', 'true');
          panel.classList.add('active');
        }
      });
    });

    $all('.global-navigation-v2 .back-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        $all('.global-navigation-v2 .nav-panel.active').forEach(function (p) {
          p.classList.remove('active');
          p.setAttribute('aria-expanded', 'false');
        });
      });
    });
  }

  function initFooter() {
    $all('.global-footer-accordion-collapsible').forEach(function (btn) {
      btn.addEventListener('click', function () {
        btn.classList.toggle('active');
        var panel = btn.nextElementSibling;
        if (panel) panel.classList.toggle('active');
      });
    });

    $all('.language-switcher-open, .language-switcher-close').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var popup = $('.language-switcher-popup');
        if (popup) popup.classList.toggle('active');
      });
    });
  }

  function initHeader() {
    var header = $('.global-header-v2');
    if (!header) return;
    header.classList.add('active');
    window.addEventListener('scroll', function () {
      header.classList.toggle('sticky', window.scrollY > 40);
    }, { passive: true });
  }

  function initVehicleCarouselTitle() {
    var titleEl = $('.block-v4.vehicle-carousel .title');
    if (titleEl) titleEl.removeAttribute('href');
  }

  function boot() {
    if (document.body.classList.contains('booted')) return;
    document.body.classList.add('booted');

    loadStylesheet(SWIPER_CSS);
    initLazyImages();
    initVideos();
    initHeader();
    initNavigation();
    initFooter();
    initVehicleCarouselTitle();
    hidePreloader();
    document.documentElement.classList.remove('snap');

    loadScript(SWIPER_JS)
      .then(initSwipers)
      .catch(function (err) {
        console.warn('Swiper failed to load', err);
      });
  }

  loadSvgSprite();
  setTimeout(hidePreloader, 600);

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

  window.addEventListener('load', boot);
})();
