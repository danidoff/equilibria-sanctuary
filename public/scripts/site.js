const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursorFollower');
const nav = document.getElementById('mainNav');
const menuButton = document.querySelector('.nav-hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileLinks = mobileMenu ? mobileMenu.querySelectorAll('a') : [];

if (cursor && follower && window.matchMedia('(pointer: fine)').matches) {
  document.addEventListener('mousemove', (event) => {
    cursor.style.left = `${event.clientX}px`;
    cursor.style.top = `${event.clientY}px`;
    setTimeout(() => {
      follower.style.left = `${event.clientX}px`;
      follower.style.top = `${event.clientY}px`;
    }, 80);
  });

  document.querySelectorAll('a, button, .pillar, .activity-card').forEach((element) => {
    element.addEventListener('mouseenter', () => {
      cursor.style.transform = 'translate(-50%,-50%) scale(2)';
      follower.style.transform = 'translate(-50%,-50%) scale(1.5)';
    });
    element.addEventListener('mouseleave', () => {
      cursor.style.transform = 'translate(-50%,-50%) scale(1)';
      follower.style.transform = 'translate(-50%,-50%) scale(1)';
    });
  });
}

function syncNavState() {
  if (!nav || !mobileMenu) return;
  nav.classList.toggle('scrolled', window.scrollY > 40 || mobileMenu.classList.contains('is-open'));
}

function setMenuState(isOpen) {
  if (!mobileMenu || !menuButton) return;
  mobileMenu.classList.toggle('is-open', isOpen);
  document.body.classList.toggle('menu-open', isOpen);
  menuButton.setAttribute('aria-expanded', String(isOpen));
  mobileMenu.setAttribute('aria-hidden', String(!isOpen));
  syncNavState();
}

if (menuButton && mobileMenu) {
  menuButton.addEventListener('click', () => {
    setMenuState(!mobileMenu.classList.contains('is-open'));
  });

  mobileLinks.forEach((link) => {
    link.addEventListener('click', () => setMenuState(false));
  });

  mobileMenu.addEventListener('click', (event) => {
    if (event.target === mobileMenu) setMenuState(false);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && mobileMenu.classList.contains('is-open')) {
      setMenuState(false);
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 1024) setMenuState(false);
    syncNavState();
  });
}

window.addEventListener('scroll', syncNavState, { passive: true });
syncNavState();

if ('IntersectionObserver' in window) {
  document.body.classList.add('js-loaded');
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    },
    { threshold: 0.05, rootMargin: '0px 0px -40px 0px' }
  );

  reveals.forEach((element) => observer.observe(element));
}
