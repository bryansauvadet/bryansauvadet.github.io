document.addEventListener('DOMContentLoaded', () => {
  const root = document.querySelector('.yom-page');
  if (!root) return;

  const filters = [...root.querySelectorAll('.yom-filter[data-filter]')];
  const events = [...root.querySelectorAll('.yom-event[data-kind]')];

  const applyFilter = (filter) => {
    filters.forEach(button => {
      const active = button.dataset.filter === filter;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', active ? 'true' : 'false');
    });

    events.forEach(event => {
      const kinds = (event.dataset.kind || '').split(/\s+/).filter(Boolean);
      event.classList.toggle('is-hidden', filter !== 'all' && !kinds.includes(filter));
    });
  };

  filters.forEach(button => {
    button.addEventListener('click', () => applyFilter(button.dataset.filter || 'all'));
  });

  applyFilter('all');

  root.querySelectorAll('[data-yom-scroll]').forEach(link => {
    link.addEventListener('click', event => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({behavior:'smooth', block:'start'});
    });
  });

  async function hydrateChunkedMap(img) {
    const chunks = (img.dataset.yomChunks || '').split('|').filter(Boolean);
    if (!chunks.length) return;

    try {
      const parts = await Promise.all(chunks.map(async (url) => {
        const response = await fetch(url, {cache:'force-cache'});
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return (await response.text()).trim();
      }));
      img.src = 'data:image/webp;base64,' + parts.join('');
      img.classList.add('is-loaded');
    } catch (error) {
      img.closest('.yom-map-insert')?.classList.add('has-error');
      console.warn('Yŏm map loading failed', error);
    }
  }

  root.querySelectorAll('.yom-map-chunked').forEach(hydrateChunkedMap);
});
