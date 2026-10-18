document.addEventListener('DOMContentLoaded', () => {
  // Brief four-culture opening sequence on the first homepage visit of each session.
  (() => {
    const home = /^\/(fr|en|ko|ja|zh-hant|vi)\/(?:index\.html)?$/;
    if (!home.test(window.location.pathname)) {
      document.documentElement.classList.remove('site-intro-pending');
      return;
    }

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const forceIntro = new URLSearchParams(window.location.search).get('intro') === '1';
    let alreadySeen = false;
    try { alreadySeen = !forceIntro && !!sessionStorage.getItem('bs-site-intro-v2'); } catch (e) {}
    if (reducedMotion || alreadySeen) {
      document.documentElement.classList.remove('site-intro-pending');
      return;
    }

    try { sessionStorage.setItem('bs-site-intro-v2', '1'); } catch (e) {}

    const lang = (document.documentElement.lang || 'fr').toLowerCase();
    const subtitles = {
      fr: "Histoire de l’art bouddhique d’Asie de l’Est",
      en: "History of East Asian Buddhist Art",
      ko: "동아시아 불교미술사",
      ja: "東アジア仏教美術史",
      "zh-hant": "東亞佛教藝術史",
      vi: "Lịch sử nghệ thuật Phật giáo Đông Á"
    };
    const key = lang.startsWith('zh') ? 'zh-hant' : lang.split('-')[0];

    const intro = document.createElement('div');
    intro.className = 'site-intro';
    intro.setAttribute('aria-hidden', 'true');
    intro.innerHTML = `
      <div class="site-intro-panels">
        <div class="site-intro-panel site-intro-cn">
          <div class="site-intro-place"><span>中國</span><small>五臺山</small></div>
        </div>
        <div class="site-intro-panel site-intro-ko">
          <div class="site-intro-place"><span>한국</span><small>석굴암</small></div>
        </div>
        <div class="site-intro-panel site-intro-ja">
          <div class="site-intro-place"><span>日本</span><small>仏教美術</small></div>
        </div>
        <div class="site-intro-panel site-intro-vi">
          <div class="site-intro-place"><span>Việt Nam</span><small>Thiên Mụ</small></div>
        </div>
      </div>
      <div class="site-intro-title">
        <div class="site-intro-name">Bryan Sauvadet</div>
        <div class="site-intro-subtitle">${subtitles[key] || subtitles.fr}</div>
      </div>
    `;
    document.documentElement.appendChild(intro);

    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      document.documentElement.classList.remove('site-intro-pending');
      intro.classList.add('is-exiting');
      window.setTimeout(() => intro.remove(), 620);
    };

    requestAnimationFrame(() => intro.classList.add('is-active'));
    window.setTimeout(() => document.documentElement.classList.remove('site-intro-pending'), 2250);
    window.setTimeout(finish, 2450);
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