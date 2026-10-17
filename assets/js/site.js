document.addEventListener('DOMContentLoaded', () => {
  const button = document.querySelector('.menu-btn');
  const nav = document.querySelector('.nav');
  if (button && nav) button.addEventListener('click', () => nav.classList.toggle('open'));

  const path = window.location.pathname.replace(/\/$/, '/index.html');
  document.querySelectorAll('.nav a').forEach(a => {
    const href = new URL(a.href, window.location.origin).pathname.replace(/\/$/, '/index.html');
    if (href === path) a.classList.add('active');
  });

  document.querySelectorAll('[data-hero-carousel]').forEach(carousel => {
    const slides = [...carousel.querySelectorAll('.hero-slide')];
    const dots = [...carousel.querySelectorAll('.hero-carousel-dot')];
    const prev = carousel.querySelector('[data-carousel-prev]');
    const next = carousel.querySelector('[data-carousel-next]');
    if (slides.length < 2) return;

    let index = 0;
    let timer = null;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const show = (n) => {
      index = (n + slides.length) % slides.length;
      slides.forEach((s,i) => {
        s.classList.toggle('active', i === index);
        s.setAttribute('aria-hidden', i === index ? 'false' : 'true');
      });
      dots.forEach((d,i) => {
        d.classList.toggle('active', i === index);
        d.setAttribute('aria-current', i === index ? 'true' : 'false');
      });
    };

    const stop = () => { if (timer) { clearInterval(timer); timer = null; } };
    const start = () => {
      stop();
      if (!reducedMotion) timer = setInterval(() => show(index + 1), 6500);
    };

    prev?.addEventListener('click', () => { show(index - 1); start(); });
    next?.addEventListener('click', () => { show(index + 1); start(); });
    dots.forEach((d,i) => d.addEventListener('click', () => { show(i); start(); }));
    carousel.addEventListener('mouseenter', stop);
    carousel.addEventListener('mouseleave', start);
    carousel.addEventListener('focusin', stop);
    carousel.addEventListener('focusout', start);

    show(0);
    start();
  });
});