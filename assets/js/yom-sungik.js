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
});
