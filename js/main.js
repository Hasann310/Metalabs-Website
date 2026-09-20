(() => {
  'use strict';

  const root = document.documentElement;
  const header = document.querySelector('#site-header');
  const themeToggle = document.querySelector('.theme-toggle');
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileMenu = document.querySelector('#mobile-menu');
  const notifyForm = document.querySelector('#notify-form');
  const formMessage = document.querySelector('#form-message');
  const year = document.querySelector('#year');

  const savedTheme = localStorage.getItem('metalabs-theme');
  const systemPrefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
  root.dataset.theme = savedTheme || (systemPrefersLight ? 'light' : 'dark');

  themeToggle?.addEventListener('click', () => {
    const nextTheme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    root.dataset.theme = nextTheme;
    localStorage.setItem('metalabs-theme', nextTheme);
    themeToggle.setAttribute('aria-label', `Switch to ${nextTheme === 'dark' ? 'light' : 'dark'} theme`);
  });

  const closeMenu = () => {
    menuToggle?.setAttribute('aria-expanded', 'false');
    mobileMenu?.classList.remove('open');
  };

  menuToggle?.addEventListener('click', () => {
    const willOpen = menuToggle.getAttribute('aria-expanded') !== 'true';
    menuToggle.setAttribute('aria-expanded', String(willOpen));
    mobileMenu?.classList.toggle('open', willOpen);
  });

  mobileMenu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });

  const updateHeader = () => header?.classList.toggle('scrolled', window.scrollY > 12);
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -30px' });
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  }

  notifyForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    const email = new FormData(notifyForm).get('email');
    formMessage.textContent = `Thanks — ${email} has been added to the demo list.`;
    notifyForm.reset();
  });

  if (year) year.textContent = new Date().getFullYear();
})();
