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

const emblemText = document.querySelector('.drivetrain-head .section-head');
const emblem = document.querySelector('.emblem');
if (emblemText && emblem && 'ResizeObserver' in window) {
  const emblemImg = emblem.querySelector('img');
  const sideBySide = window.matchMedia('(min-width: 961px)');
  const textBounds = (el) => {
    const range = document.createRange();
    range.selectNodeContents(el);
    return range.getBoundingClientRect();
  };
  const fitEmblem = () => {
    if (!sideBySide.matches) {
      emblem.style.marginTop = '';
      emblemImg.style.height = '';
      return;
    }
    const box = emblemText.getBoundingClientRect();
    const first = textBounds(emblemText.firstElementChild);
    const last = textBounds(emblemText.lastElementChild);
    emblem.style.marginTop = `${first.top - box.top}px`;
    emblemImg.style.height = `${last.bottom - first.top}px`;
  };
  new ResizeObserver(fitEmblem).observe(emblemText);
  sideBySide.addEventListener('change', fitEmblem);
}

const simChart = document.getElementById('sim-chart');
if (simChart) {
  const plot = simChart.parentElement;
  const tip = plot.querySelector('.sim-tip');
  const cross = simChart.querySelector('.sim-cross');
  const dotBattery = simChart.querySelector('.sim-hover-batt');
  const dotHydrogen = simChart.querySelector('.sim-hover-h2');
  const left = 56;
  const width = 568;
  const top = 16;
  const bottom = 364;
  const maxMinutes = 240;
  const maxKg = 5.5;
  const battery = (t) => (2.22 / 33) * t;
  const hydrogen = (t) => 2 + t / 150;
  const toX = (t) => left + (t / maxMinutes) * width;
  const toY = (kg) => bottom - (kg / maxKg) * (bottom - top);
  const kg = (value) => `${value.toFixed(1)} kg`;
  const duration = (t) => (t < 60 ? `${t} min` : `${Math.floor(t / 60)} h ${String(t % 60).padStart(2, '0')} min`);
  let minutes = 33;

  const show = (t) => {
    minutes = Math.max(0, Math.min(maxMinutes, Math.round(t)));
    const x = toX(minutes);
    const b = battery(minutes);
    const h = hydrogen(minutes);
    cross.setAttribute('x1', x);
    cross.setAttribute('x2', x);
    dotHydrogen.setAttribute('cx', x);
    dotHydrogen.setAttribute('cy', toY(h));
    dotBattery.setAttribute('cx', x);
    dotBattery.setAttribute('cy', toY(Math.min(b, maxKg)));
    dotBattery.style.visibility = b <= maxKg ? 'visible' : 'hidden';
    tip.querySelector('[data-t]').textContent = duration(minutes);
    tip.querySelector('[data-b]').textContent = kg(b) + (b > maxKg ? ' ↑' : '');
    tip.querySelector('[data-h]').textContent = kg(h);
    simChart.classList.add('is-active');
    tip.hidden = false;
    const scale = simChart.getBoundingClientRect().width / 640;
    const pointX = x * scale;
    const tipWidth = tip.offsetWidth;
    const fitsRight = pointX + 14 + tipWidth <= plot.clientWidth;
    tip.style.left = `${fitsRight ? pointX + 14 : pointX - 14 - tipWidth}px`;
  };

  const hide = () => {
    simChart.classList.remove('is-active');
    tip.hidden = true;
  };

  simChart.addEventListener('pointermove', (e) => {
    const point = simChart.createSVGPoint();
    point.x = e.clientX;
    point.y = e.clientY;
    const p = point.matrixTransform(simChart.getScreenCTM().inverse());
    if (p.x < left || p.x > left + width || p.y < top || p.y > bottom) {
      hide();
      return;
    }
    show(((p.x - left) / width) * maxMinutes);
  });
  simChart.addEventListener('pointerleave', hide);
  simChart.addEventListener('focus', () => show(minutes));
  simChart.addEventListener('blur', hide);
  simChart.addEventListener('keydown', (e) => {
    const step = e.shiftKey ? 30 : 5;
    if (e.key === 'ArrowRight') show(minutes + step);
    else if (e.key === 'ArrowLeft') show(minutes - step);
    else if (e.key === 'Home') show(0);
    else if (e.key === 'End') show(maxMinutes);
    else if (e.key === 'Escape') simChart.blur();
    else return;
    e.preventDefault();
  });
}
