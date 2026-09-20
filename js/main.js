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

  const authForm = document.querySelector('#auth-form');
  const formMsg = document.querySelector('#form-message');
  const loginBtn = document.querySelector('#login-btn');
  const registerBtn = document.querySelector('#register-btn');
  const emailInput = document.querySelector('#user-email');
  const passwordInput = document.querySelector('#user-password');

  async function handleAuth(action) {
    const email = emailInput?.value;
    const password = passwordInput?.value;

    if(!email || !password) {
      formMsg.style.color = '#ff6d78';
      formMsg.textContent = 'Please enter both email and password.';
      return;
    }

    formMsg.style.color = '#a0a7b8';
    formMsg.textContent = 'Processing... Please wait.';
    loginBtn.disabled = true;
    registerBtn.disabled = true;

    // লগইন নাকি সাইনআপ সেই অনুযায়ী সার্ভারের লিংক ঠিক করা হচ্ছে
    const endpoint = action === 'login' ? '/api/v1/users/app/login' : '/api/v1/users/app/register';

    try {
      const response = await fetch(`https://genmeta-server.onrender.com${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (data.success) {
        formMsg.style.color = '#70e3a1';
        formMsg.textContent = action === 'login' ? 'Login successful! Opening GenMeta...' : 'Account created! 50 Credits added. Opening GenMeta...';
        
        // ডেস্কটপ অ্যাপ ওপেন করার লিংক
        const secretKey = data.data.apiKey;
        window.location.href = `genmeta://login?token=${secretKey}`;
      } else {
        formMsg.style.color = '#ff6d78';
        formMsg.textContent = 'Error: ' + (data.message || 'Authentication failed');
      }
    } catch (error) {
      formMsg.style.color = '#ff6d78';
      formMsg.textContent = 'Server connection failed. Is the server running?';
    } finally {
      loginBtn.disabled = false;
      registerBtn.disabled = false;
    }
  }

  loginBtn?.addEventListener('click', () => handleAuth('login'));
  registerBtn?.addEventListener('click', () => handleAuth('register'));

  if (year) year.textContent = new Date().getFullYear();
})();
