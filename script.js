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

const bindChart = (chart, { left, width, top, bottom, max, start, snap, step, bigStep, render }) => {
  const plot = chart.parentElement;
  const tip = plot.querySelector('.sim-tip');
  const cross = chart.querySelector('.sim-cross');
  let current = start;

  const show = (value) => {
    current = Math.max(0, Math.min(max, Math.round(value / snap) * snap));
    const x = left + (current / max) * width;
    cross.setAttribute('x1', x);
    cross.setAttribute('x2', x);
    render(current, x, tip);
    chart.classList.add('is-active');
    tip.hidden = false;
    const scale = chart.getBoundingClientRect().width / chart.viewBox.baseVal.width;
    const pointX = x * scale;
    const tipWidth = tip.offsetWidth;
    const fitsRight = pointX + 14 + tipWidth <= plot.clientWidth;
    tip.style.left = `${fitsRight ? pointX + 14 : pointX - 14 - tipWidth}px`;
  };

  const hide = () => {
    chart.classList.remove('is-active');
    tip.hidden = true;
  };

  chart.addEventListener('pointermove', (e) => {
    const point = chart.createSVGPoint();
    point.x = e.clientX;
    point.y = e.clientY;
    const p = point.matrixTransform(chart.getScreenCTM().inverse());
    if (p.x < left || p.x > left + width || p.y < top || p.y > bottom) {
      hide();
      return;
    }
    show(((p.x - left) / width) * max);
  });
  chart.addEventListener('pointerleave', hide);
  chart.addEventListener('focus', () => show(current));
  chart.addEventListener('blur', hide);
  chart.addEventListener('keydown', (e) => {
    const delta = e.shiftKey ? bigStep : step;
    if (e.key === 'ArrowRight') show(current + delta);
    else if (e.key === 'ArrowLeft') show(current - delta);
    else if (e.key === 'Home') show(0);
    else if (e.key === 'End') show(max);
    else if (e.key === 'Escape') chart.blur();
    else return;
    e.preventDefault();
  });
};

const simChart = document.getElementById('sim-chart');
if (simChart) {
  const dotBattery = simChart.querySelector('.sim-hover-batt');
  const dotHydrogen = simChart.querySelector('.sim-hover-h2');
  const top = 16;
  const bottom = 364;
  const maxKg = 5.5;
  const battery = (t) => (2.22 / 33) * t;
  const hydrogen = (t) => 2 + t / 150;
  const toY = (kg) => bottom - (kg / maxKg) * (bottom - top);
  const kg = (value) => `${value.toFixed(1)} kg`;
  const duration = (t) => (t < 60 ? `${t} min` : `${Math.floor(t / 60)} h ${String(t % 60).padStart(2, '0')} min`);

  bindChart(simChart, {
    left: 56,
    width: 568,
    top,
    bottom,
    max: 240,
    start: 33,
    snap: 1,
    step: 5,
    bigStep: 30,
    render: (t, x, tip) => {
      const b = battery(t);
      const h = hydrogen(t);
      dotHydrogen.setAttribute('cx', x);
      dotHydrogen.setAttribute('cy', toY(h));
      dotBattery.setAttribute('cx', x);
      dotBattery.setAttribute('cy', toY(Math.min(b, maxKg)));
      dotBattery.style.visibility = b <= maxKg ? 'visible' : 'hidden';
      tip.querySelector('[data-t]').textContent = duration(t);
      tip.querySelector('[data-b]').textContent = kg(b) + (b > maxKg ? ' ↑' : '');
      tip.querySelector('[data-h]').textContent = kg(h);
    },
  });
}

const loadChart = document.getElementById('load-chart');
if (loadChart) {
  const dotSeries = loadChart.querySelector('.sim-hover-batt');
  const dotParallel = loadChart.querySelector('.sim-hover-h2');
  const top = 36;
  const bottom = 372;
  const sample = 0.2;
  const perWatt = (bottom - top) / 2200;
  const fuelCell = 650;
  const traceY = loadChart.querySelector('#ld-line').getAttribute('d').match(/-?\d*\.?\d+/g).map(Number).filter((_, i) => i % 2 === 1);
  const toWatts = (y) => (bottom - y) / perWatt - 200;
  const watts = (value) => {
    const rounded = Math.round(value / 10) * 10;
    return `${rounded < 0 ? '−' : ''}${Math.abs(rounded).toLocaleString('en-US')} W`;
  };
  const clock = (t) => {
    const total = Math.round(t * 60);
    const h = Math.floor(total / 3600);
    const m = String(Math.floor((total % 3600) / 60)).padStart(h ? 2 : 1, '0');
    const s = String(total % 60).padStart(2, '0');
    return `${h ? `${h} h ` : ''}${m} min ${s} s`;
  };
  const phase = (t, series) => {
    if (t <= 1) return 'take-off';
    if (t >= 119) return 'landing';
    return series > 900 ? 'gust' : 'cruise';
  };

  bindChart(loadChart, {
    left: 64,
    width: 552,
    top,
    bottom,
    max: 120,
    start: 30,
    snap: sample,
    step: 1,
    bigStep: 10,
    render: (t, x, tip) => {
      const y = traceY[Math.round(t / sample)];
      const series = toWatts(y);
      dotSeries.setAttribute('cx', x);
      dotSeries.setAttribute('cy', y);
      dotParallel.setAttribute('cx', x);
      dotParallel.setAttribute('cy', y + fuelCell * perWatt);
      tip.querySelector('[data-t]').textContent = `${clock(t)} · ${phase(t, series)}`;
      tip.querySelector('[data-s]').textContent = watts(series);
      tip.querySelector('[data-p]').textContent = watts(series - fuelCell);
    },
  });
}
