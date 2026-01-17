// Vanilla JavaScript Carousel (no plugins) — SDG 1 Gallery
(function () {
  'use strict';

  const images = [
    { src: 'p1.png', caption: 'Food support and basic needs assistance' },
    { src: 'p2.png', caption: 'Education access and learning resources' },
    { src: 'p3.jpg', caption: 'Community programmes and outreach services' },
    { src: 'p4.jpg', caption: 'Skills training and decent work opportunities' },
    { src: 'p5.png', caption: 'Inclusive support for vulnerable groups' },
    { src: 'p6.jpg', caption: 'Shelter and housing assistance initiatives' },
    { src: 'p7.jpg', caption: 'Child support and family aid programmes' },
    { src: 'p8.jpeg', caption: 'Healthcare accessibility for low-income groups' },
    { src: 'p9.webp', caption: 'Community fundraising and donation drives' },
    { src: 'p10.jpg', caption: 'Empowering communities through social support' }
  ];

  let index = 0;
  let timer = null;
  const intervalMs = 3200;

  const imgEl = document.getElementById('carouselImg');
  const captionEl = document.getElementById('carouselCaption');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const dotsWrap = document.getElementById('dotsWrap');
  const carousel = document.getElementById('carousel');

  if (!imgEl || !captionEl) return;

  function renderDots() {
    if (!dotsWrap) return;
    dotsWrap.innerHTML = '';
    images.forEach((_, i) => {
      const d = document.createElement('div');
      d.className = 'dot' + (i === index ? ' active' : '');
      d.title = `Go to image ${i + 1}`;
      d.addEventListener('click', () => {
        index = i;
        update();
        restartAuto();
      });
      dotsWrap.appendChild(d);
    });
  }

  function update() {
    const item = images[index];
    imgEl.src = item.src;
    imgEl.alt = item.caption;
    captionEl.textContent = `${item.caption} (Image ${index + 1} of ${images.length})`;
    renderDots();
  }

  function next() {
    index = (index + 1) % images.length;
    update();
  }

  function prev() {
    index = (index - 1 + images.length) % images.length;
    update();
  }

  function startAuto() { timer = setInterval(next, intervalMs); }
  function stopAuto() { if (timer) clearInterval(timer); timer = null; }
  function restartAuto() { stopAuto(); startAuto(); }

  if (nextBtn) nextBtn.addEventListener('click', () => { next(); restartAuto(); });
  if (prevBtn) prevBtn.addEventListener('click', () => { prev(); restartAuto(); });

  // Pause on hover (optional)
  if (carousel) {
    carousel.addEventListener('mouseenter', stopAuto);
    carousel.addEventListener('mouseleave', startAuto);
  }

  update();
  startAuto();
})();
