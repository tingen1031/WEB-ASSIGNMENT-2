// jQuery effects and UI logic:
// - FAQ slideToggle
// - Smooth scroll for internal anchors
// - Scroll reveal (fade-in)
// - Lightbox for gallery grid images
// - Back to top button
// - Hamburger menu (mobile)
// - Auto highlight active nav link

$(function () {
  // ========= Active nav link =========
  (function () {
    const path = window.location.pathname.split('/').pop() || 'index.html';
    $('.nav-links a, .mobile-menu a').each(function () {
      const href = $(this).attr('href');
      if (href === path) $(this).addClass('active');
    });
  })();

  // ========= Hamburger menu =========
  (function () {
    const $btn = $('#hamburgerBtn');
    const $menu = $('#mobileMenu');

    if (!$btn.length || !$menu.length) return;

    function openMenu() {
      $btn.addClass('is-open').attr('aria-expanded', 'true');
      $menu.addClass('is-open');
    }

    function closeMenu() {
      $btn.removeClass('is-open').attr('aria-expanded', 'false');
      $menu.removeClass('is-open');
    }

    $btn.on('click', function () {
      if ($menu.hasClass('is-open')) closeMenu();
      else openMenu();
    });

    // Close when a link is clicked
    $menu.find('a').on('click', closeMenu);

    // Close menu when resizing to desktop
    $(window).on('resize', function () {
      if (window.innerWidth > 820) closeMenu();
    });
  })();

  // ========= FAQ slideToggle =========
  $('.faq-q').on('click', function () {
    $(this).next('.faq-a').slideToggle(250);
  });

  // ========= Smooth scroll for internal anchors =========
  $('a[href^="#"]').on('click', function (e) {
    const target = $(this.getAttribute('href'));
    if (target.length) {
      e.preventDefault();
      $('html, body').stop().animate(
        { scrollTop: target.offset().top - 80 },
        450
      );
    }
  });

  // ========= Scroll reveal =========
  function revealOnScroll() {
    const winBottom = $(window).scrollTop() + $(window).height();
    $('.reveal').each(function () {
      const elTop = $(this).offset().top;
      if (winBottom > elTop + 60) $(this).addClass('show');
    });
  }
  revealOnScroll();
  $(window).on('scroll', revealOnScroll);

  // ========= Back to top =========
  (function () {
    const $btn = $('#backTop');
    if (!$btn.length) return;

    function toggleBtn() {
      if ($(window).scrollTop() > 350) $btn.fadeIn(180);
      else $btn.fadeOut(180);
    }

    toggleBtn();
    $(window).on('scroll', toggleBtn);

    $btn.on('click', function () {
      $('html, body').animate({ scrollTop: 0 }, 450);
    });
  })();

  // ========= Lightbox for gallery grid =========
  (function () {
    const $lb = $('#lightbox');
    const $img = $('#lightboxImg');
    const $close = $('#lightboxClose');

    if (!$lb.length || !$img.length || !$close.length) return;

    $('.img-grid img')
      .css('cursor', 'pointer')
      .on('click', function () {
        $img.attr('src', $(this).attr('src'));
        $lb.fadeIn(160).attr('aria-hidden', 'false');
      });

    $close.on('click', function () {
      $lb.fadeOut(160).attr('aria-hidden', 'true');
    });

    $lb.on('click', function (e) {
      if (e.target === this) $close.click();
    });
  })();
});
