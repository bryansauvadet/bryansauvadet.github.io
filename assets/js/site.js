document.addEventListener('DOMContentLoaded', () => {
  // Static opening sequence: markup is embedded directly in each localized homepage.
  (() => {
    const intro = document.querySelector('.site-intro');
    if (!intro) return;

    const forceIntro = new URLSearchParams(window.location.search).get('intro') === '1';
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const rawLang = (document.documentElement.lang || 'fr').toLowerCase();
    const introLang = rawLang.startsWith('zh') ? 'zh-hant' : rawLang.split('-')[0];
    const introKey = 'bs-site-intro-v4-' + introLang;
    let alreadySeen = false;
    try { alreadySeen = !forceIntro && !!sessionStorage.getItem(introKey); } catch (e) {}

    if (!forceIntro && (reducedMotion || alreadySeen)) {
      intro.remove();
      document.documentElement.classList.remove('site-intro-skip');
      return;
    }

    document.documentElement.classList.remove('site-intro-skip');
    try { if (!forceIntro) sessionStorage.setItem(introKey, '1'); } catch (e) {}

    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      intro.classList.add('is-exiting');
      window.setTimeout(() => { intro.style.display = 'none'; intro.remove(); }, 820);
    };

    requestAnimationFrame(() => intro.classList.add('is-active'));
    window.setTimeout(finish, 4200);
    window.setTimeout(() => { if (intro && intro.isConnected) { intro.style.display = 'none'; intro.remove(); } }, 5400);
    intro.addEventListener('click', finish, {once:true});
    window.addEventListener('keydown', e => { if (e.key === 'Escape') finish(); }, {once:true});
  })();
  const button = document.querySelector('.menu-btn');
  const nav = document.querySelector('.nav');
  if (button && nav) button.addEventListener('click', () => nav.classList.toggle('open'));

  const path = window.location.pathname.replace(/\/$/, '/index.html');
  document.querySelectorAll('.nav a').forEach(a => {
    const href = new URL(a.href, window.location.origin).pathname.replace(/\/$/, '/index.html');
    if (href === path) a.classList.add('active');
  });

  document.querySelectorAll('[data-hero-carousel]').forEach(carousel => {
    const img = carousel.querySelector('.hero-current-image');
    const credit = carousel.querySelector('.image-credit');
    const dots = [...carousel.querySelectorAll('.hero-carousel-dot')];
    const prev = carousel.querySelector('[data-carousel-prev]');
    const next = carousel.querySelector('[data-carousel-next]');
    if (!img || !credit) return;

    let slides = [];
    try {
      slides = JSON.parse(carousel.dataset.slides || '[]');
    } catch (e) {
      return;
    }
    if (!slides.length) return;

    let index = 0;
    let timer = null;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const show = (n) => {
      index = (n + slides.length) % slides.length;
      const slide = slides[index];
      img.src = slide.src;
      img.alt = slide.alt || '';
      credit.textContent = slide.credit || '';
      carousel.classList.toggle('is-contain', !!slide.contain);
      dots.forEach((d,i) => {
        d.classList.toggle('active', i === index);
        d.setAttribute('aria-current', i === index ? 'true' : 'false');
      });
    };

    const stop = () => {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    };
    const start = () => {
      stop();
      if (!reducedMotion && slides.length > 1) {
        timer = setInterval(() => show(index + 1), 6500);
      }
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