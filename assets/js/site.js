document.addEventListener('DOMContentLoaded', () => {
  const button = document.querySelector('.menu-btn');
  const nav = document.querySelector('.nav');
  if (button && nav) button.addEventListener('click', () => nav.classList.toggle('open'));
  const path = window.location.pathname.replace(/\/$/, '/index.html');
  document.querySelectorAll('.nav a').forEach(a => {
    const href = new URL(a.href, window.location.origin).pathname.replace(/\/$/, '/index.html');
    if (href === path) a.classList.add('active');
  });
});