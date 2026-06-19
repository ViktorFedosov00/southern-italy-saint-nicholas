/* Shared interactions: header, mobile nav, scroll-reveal, lightbox */
(function () {
  // sticky header state
  var header = document.querySelector('.site-header');
  function onScroll() { if (header) header.classList.toggle('scrolled', window.scrollY > 40); }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // mobile nav
  var burger = document.querySelector('.burger');
  var nav = document.querySelector('.nav');
  if (burger && nav) {
    burger.addEventListener('click', function () {
      nav.classList.toggle('open');
      if (header) header.classList.add('scrolled');
    });
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { nav.classList.remove('open'); });
    });
  }

  // scroll reveal
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('in'); });
  }

  // lightbox for galleries
  var lb = document.createElement('div');
  lb.className = 'lightbox';
  lb.innerHTML = '<button class="lb-close" aria-label="Закрыть">&times;</button><img alt=""><div class="lb-cap"></div>';
  document.body.appendChild(lb);
  var lbImg = lb.querySelector('img');
  var lbCap = lb.querySelector('.lb-cap');
  function openLb(src, cap) { lbImg.src = src; lbCap.textContent = cap || ''; lb.classList.add('open'); }
  function closeLb() { lb.classList.remove('open'); lbImg.src = ''; }
  document.querySelectorAll('.gallery figure').forEach(function (fig) {
    fig.addEventListener('click', function () {
      var img = fig.querySelector('img');
      var cap = fig.querySelector('figcaption');
      openLb(img.getAttribute('data-full') || img.src, cap ? cap.textContent : img.alt);
    });
  });
  lb.addEventListener('click', closeLb);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeLb(); });
})();
