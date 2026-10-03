const nav = document.getElementById('nav');
const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 12);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

const toggle = document.getElementById('menu-toggle');
const menu = document.getElementById('mobile-menu');
const setMenu = (open) => {
  menu.hidden = !open;
  toggle.setAttribute('aria-expanded', String(open));
  toggle.textContent = open ? 'Close' : 'Menu';
  nav.classList.toggle('menu-open', open);
};
toggle.addEventListener('click', () => setMenu(menu.hidden));
menu.addEventListener('click', (e) => {
  if (e.target.closest('a')) setMenu(false);
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !menu.hidden) {
    setMenu(false);
    toggle.focus();
  }
});
window.matchMedia('(min-width: 1061px)').addEventListener('change', (e) => {
  if (e.matches) setMenu(false);
});

const root = document.documentElement;
const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
const themeMeta = document.querySelector('meta[name="theme-color"]');
const themeToggles = document.querySelectorAll('.theme-toggle');
const currentTheme = () => root.dataset.theme || (darkQuery.matches ? 'dark' : 'light');
const syncTheme = () => {
  const theme = currentTheme();
  const next = theme === 'dark' ? 'light' : 'dark';
  themeToggles.forEach((btn) => {
    btn.setAttribute('aria-label', `Switch to ${next} mode`);
    const label = btn.querySelector('.theme-label');
    if (label) label.textContent = next === 'dark' ? 'Dark mode' : 'Light mode';
  });
  themeMeta.setAttribute('content', theme === 'dark' ? '#0B0D10' : '#FFFFFF');
};
themeToggles.forEach((btn) => {
  btn.addEventListener('click', () => {
    root.dataset.theme = currentTheme() === 'dark' ? 'light' : 'dark';
    try {
      localStorage.setItem('argo-theme', root.dataset.theme);
    } catch (e) {}
    syncTheme();
  });
});
darkQuery.addEventListener('change', syncTheme);
syncTheme();

const items = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  items.forEach((el) => io.observe(el));
} else {
  items.forEach((el) => el.classList.add('in'));
}

document.getElementById('year').textContent = new Date().getFullYear();
