const root = document.documentElement;
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
// Heavy motion needs both libraries; without them (or with reduced motion) the page stays fully readable.
const motion = !reduceMotion && 'gsap' in window && 'ScrollTrigger' in window;
if (motion) root.classList.add('motion');

const nav = document.getElementById('nav');
const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 12);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// Nav: a thin progress line; the current page's link is marked in the HTML (aria-current="page")
const navProgress = document.querySelector('.nav-progress');
let navFrame = 0;
const syncNav = () => {
  navFrame = 0;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  navProgress.style.transform = `scaleX(${max > 0 ? Math.min(1, window.scrollY / max) : 0})`;
};
const queueNav = () => {
  if (!navFrame) navFrame = requestAnimationFrame(syncNav);
};
window.addEventListener('scroll', queueNav, { passive: true });
window.addEventListener('resize', queueNav);
syncNav();

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

// One theme for the whole page: the device setting until the visitor picks one, then their choice.
const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
const themeMeta = document.querySelector('meta[name="theme-color"]');
const themeToggles = document.querySelectorAll('.theme-toggle');
let stored = null;
try {
  stored = localStorage.getItem('argo-theme');
} catch (e) {}
const syncTheme = () => {
  const theme = root.dataset.theme;
  const next = theme === 'dark' ? 'light' : 'dark';
  themeToggles.forEach((btn) => {
    btn.setAttribute('aria-label', `Switch to ${next} mode`);
    const label = btn.querySelector('.theme-label');
    if (label) label.textContent = next === 'dark' ? 'Dark mode' : 'Light mode';
  });
  themeMeta.setAttribute('content', theme === 'dark' ? '#050A12' : '#F4F9FA');
};
themeToggles.forEach((btn) => {
  btn.addEventListener('click', () => {
    root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    stored = root.dataset.theme;
    try {
      localStorage.setItem('argo-theme', stored);
    } catch (e) {}
    syncTheme();
  });
});
darkQuery.addEventListener('change', (e) => {
  if (stored) return;
  root.dataset.theme = e.matches ? 'dark' : 'light';
  syncTheme();
});
syncTheme();

document.getElementById('year').textContent = new Date().getFullYear();

const items = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    let n = 0;
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // stagger only the items that enter together
        entry.target.style.transitionDelay = `${n++ * 70}ms`;
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  items.forEach((el) => io.observe(el));
} else {
  items.forEach((el) => el.classList.add('in'));
}

// Hydrogen Advantage: one button opens and closes the text of all four cards
const advToggle = document.querySelector('.adv-toggle');
if (advToggle) {
  advToggle.addEventListener('click', () => {
    const open = advToggle.getAttribute('aria-expanded') !== 'true';
    advToggle.setAttribute('aria-expanded', String(open));
    document.querySelector('.adv-list').classList.toggle('is-open', open);
    // the page got taller or shorter, so later scroll triggers move once the height has settled
    if (motion) setTimeout(() => window.ScrollTrigger.refresh(), 500);
  });
}

const emblemText = document.querySelector('.drivetrain-head .section-head');
const emblem = document.querySelector('.emblem');
if (emblemText && emblem && 'ResizeObserver' in window) {
  // two images, one per theme; only the shown one has a height to measure
  const emblemImgs = [...emblem.querySelectorAll('img')];
  const sideBySide = window.matchMedia('(min-width: 961px)');
  const textBounds = (el) => {
    const range = document.createRange();
    range.selectNodeContents(el);
    return range.getBoundingClientRect();
  };
  const fitEmblem = () => {
    if (!sideBySide.matches) {
      emblem.style.marginTop = '';
      emblemImgs.forEach((img) => (img.style.height = ''));
      return;
    }
    const box = emblemText.getBoundingClientRect();
    const first = textBounds(emblemText.firstElementChild);
    const last = textBounds(emblemText.lastElementChild);
    const pad = emblem.offsetHeight - Math.max(...emblemImgs.map((img) => img.offsetHeight));
    emblem.style.marginTop = `${first.top - box.top}px`;
    emblemImgs.forEach((img) => (img.style.height = `${Math.max(120, last.bottom - first.top - pad)}px`));
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
  return { show, hide };
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
  const range = document.getElementById('sim-range');
  const rangeOut = document.getElementById('sim-range-out');
  const fillRange = () => range.style.setProperty('--p', `${(range.value / 240) * 100}%`);

  const { show, hide } = bindChart(simChart, {
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
      range.value = t;
      fillRange();
      rangeOut.textContent = duration(t);
      range.setAttribute('aria-valuetext', `${duration(t)}: battery ${kg(b)}, hydrogen ${kg(h)}`);
    },
  });

  range.setAttribute('aria-valuetext', `${duration(33)}: battery ${kg(battery(33))}, hydrogen ${kg(hydrogen(33))}`);
  fillRange();
  range.closest('.sim-range').hidden = false;
  range.addEventListener('input', () => show(Number(range.value)));
  range.addEventListener('blur', hide);
}

// Story panorama: each drone moves along its own survey line, and its beam lights up the returns beneath it.
// Pointer hover or drag, a sideways swipe, or the arrow keys on a focused drone.
const pano = document.querySelector('.pc-panorama');
if (pano) {
  pano.setAttribute('role', 'group');
  pano.querySelector('title').textContent += ' Each drone can be moved along its survey line.';
  const rigs = [...pano.querySelectorAll('.pc-handle')].map((handle) => {
    const { rig, min, max, label, where } = handle.dataset;
    const x = Number(handle.getAttribute('transform').match(/[\d.]+/)[0]);
    handle.setAttribute('tabindex', '0');
    handle.setAttribute('role', 'slider');
    handle.setAttribute('aria-label', label);
    handle.setAttribute('aria-valuemin', '0');
    handle.setAttribute('aria-valuemax', '100');
    return { handle, where, min: Number(min), max: Number(max), x, to: x, parts: pano.querySelectorAll(`[data-rig="${rig}"]`) };
  });
  const announce = (r) => {
    const pct = Math.round(((r.to - r.min) / (r.max - r.min)) * 100);
    r.handle.setAttribute('aria-valuenow', pct);
    r.handle.setAttribute('aria-valuetext', `${pct}% across the ${r.where}`);
  };
  let frame = 0;
  const tick = () => {
    frame = 0;
    rigs.forEach((r) => {
      const d = r.to - r.x;
      r.x = reduceMotion || Math.abs(d) < 0.3 ? r.to : r.x + d * 0.2;
      r.parts.forEach((el) => el.setAttribute('transform', `translate(${r.x.toFixed(1)} 0)`));
    });
    if (rigs.some((r) => r.x !== r.to)) frame = requestAnimationFrame(tick);
  };
  const moveTo = (r, x) => {
    r.to = Math.min(r.max, Math.max(r.min, x));
    announce(r);
    if (!frame) frame = requestAnimationFrame(tick);
  };
  const toX = (e) => {
    const point = pano.createSVGPoint();
    point.x = e.clientX;
    point.y = e.clientY;
    return point.matrixTransform(pano.getScreenCTM().inverse()).x;
  };
  // the forest drone owns the land half, the coastal drone the water half
  const pick = (x) => rigs[x < 590 ? 0 : 1];
  let active = null;
  pano.addEventListener('pointerdown', (e) => {
    active = pick(toX(e));
    pano.setPointerCapture(e.pointerId);
    if (e.pointerType === 'mouse') moveTo(active, toX(e));
  });
  pano.addEventListener('pointermove', (e) => {
    const x = toX(e);
    if (active) moveTo(active, x);
    else if (e.pointerType === 'mouse') moveTo(pick(x), x);
  });
  const release = () => {
    active = null;
  };
  pano.addEventListener('pointerup', release);
  pano.addEventListener('pointercancel', release);
  rigs.forEach((r) => {
    announce(r);
    r.handle.addEventListener('keydown', (e) => {
      const step = (r.max - r.min) / 20;
      if (e.key === 'ArrowRight' || e.key === 'ArrowUp') moveTo(r, r.to + step);
      else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') moveTo(r, r.to - step);
      else if (e.key === 'Home') moveTo(r, r.min);
      else if (e.key === 'End') moveTo(r, r.max);
      else return;
      e.preventDefault();
    });
  });
}

// Hero: streams of hydrogen-coloured light, drawn by one fragment shader in either theme.
// The streams fade out behind Fig. 01's labels so the labels never need a halo.
const hero = document.querySelector('.hero');
const flowCanvas = document.querySelector('.hero-flow');
const fig01 = document.getElementById('fig01');
const startFlow = () => {
  const gl = flowCanvas.getContext('webgl', { antialias: false, alpha: false, powerPreference: 'low-power' });
  if (!gl) {
    flowCanvas.remove();
    return;
  }
  const vert = 'attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}';
  const frag = `precision mediump float;
uniform vec2 r;uniform float t;uniform vec2 m;uniform float light;uniform vec4 c0;uniform vec4 c1;uniform vec4 c2;
float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x),f.y);}
float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<4;i++){v+=a*n(p);p*=2.03;a*=.5;}return v;}
float box(vec2 q,vec4 b){vec2 d=max(b.xy-q,q-b.zw);return smoothstep(0.,26.,max(d.x,d.y));}
void main(){
  vec2 uv=gl_FragCoord.xy/r;float k=r.x/r.y;vec2 p=vec2(uv.x*k,uv.y);vec2 mm=vec2(m.x*k,m.y);
  float d=length(p-mm);
  float w=fbm(p*1.4+vec2(-t*.05,t*.02));
  float y=p.y*9.+w*4.2+.9*exp(-d*2.6)*sin(t*.6+p.x*2.);
  float lane=floor(y);float s=abs(fract(y)-.5);
  float core=smoothstep(.05,.0,s);float halo=smoothstep(.32,.0,s);
  float run=.5+.5*sin(p.x*2.4-t*(.7+h(vec2(lane,1.))*.6)+lane*1.9);
  run=pow(run,3.);
  float side=smoothstep(.05,.75,uv.x);
  float clear=box(gl_FragCoord.xy,c0)*box(gl_FragCoord.xy,c1)*box(gl_FragCoord.xy,c2);
  float I=(core*.9+halo*.22)*run*side*(.55+.45*h(vec2(lane,7.)))*clear;
  vec3 col;
  if(light>.5){
    vec3 base=mix(vec3(.955,.976,.98),vec3(.90,.955,.965),uv.y*.6+.2*w);
    vec3 tint=mix(vec3(0.,.49,.54),vec3(.04,.31,.36),run);
    col=mix(base,tint,clamp(I*.55,0.,1.))+vec3(0.,.04,.05)*exp(-d*2.2)*-.6;
  }else{
    vec3 base=mix(vec3(.02,.04,.07),vec3(.03,.10,.16),uv.y*.7+.15*w);
    vec3 tint=mix(vec3(0.,.49,.54),vec3(.25,.89,.93),run);
    col=base+I*tint*.75+vec3(0.,.33,.38)*exp(-d*2.2)*.22;
    col*=1.-.45*length(uv-vec2(.62,.5));
  }
  gl_FragColor=vec4(col,1.);
}`;
  const shader = (type, src) => {
    const s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    return s;
  };
  const prog = gl.createProgram();
  gl.attachShader(prog, shader(gl.VERTEX_SHADER, vert));
  gl.attachShader(prog, shader(gl.FRAGMENT_SHADER, frag));
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    flowCanvas.remove();
    return;
  }
  gl.useProgram(prog);
  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(prog, 'p');
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
  const u = (name) => gl.getUniformLocation(prog, name);
  const uR = u('r');
  const uT = u('t');
  const uM = u('m');
  const uLight = u('light');
  const uClear = [u('c0'), u('c1'), u('c2')];

  // label zones of Fig. 01 (callouts on the right, the FIG. 01 key, the title block), in canvas pixels
  const zones = [
    [...fig01.querySelectorAll('text')].filter((el) => Number(el.getAttribute('x')) >= 430),
    [...fig01.querySelectorAll('text')].filter((el) => Number(el.getAttribute('x')) < 100),
    [...fig01.querySelectorAll('.tb-block')],
  ];
  let scale = 1;
  const measure = () => {
    const c = flowCanvas.getBoundingClientRect();
    zones.forEach((els, i) => {
      const rects = els.map((el) => el.getBoundingClientRect()).filter((b) => b.width > 0);
      if (!rects.length) {
        gl.uniform4f(uClear[i], -1e4, -1e4, -1e4, -1e4);
        return;
      }
      const x0 = Math.min(...rects.map((b) => b.left)) - c.left - 10;
      const x1 = Math.max(...rects.map((b) => b.right)) - c.left + 10;
      const y0 = Math.min(...rects.map((b) => b.top)) - c.top - 8;
      const y1 = Math.max(...rects.map((b) => b.bottom)) - c.top + 8;
      gl.uniform4f(uClear[i], x0 * scale, (c.height - y1) * scale, x1 * scale, (c.height - y0) * scale);
    });
  };
  // render below device resolution: the image is soft light, so this costs nothing visible
  const resize = () => {
    scale = Math.min(window.devicePixelRatio || 1, 1.5) * (window.innerWidth < 720 ? 0.5 : 0.7);
    flowCanvas.width = Math.max(1, Math.round(flowCanvas.clientWidth * scale));
    flowCanvas.height = Math.max(1, Math.round(flowCanvas.clientHeight * scale));
    gl.viewport(0, 0, flowCanvas.width, flowCanvas.height);
  };
  const mouse = [0.72, 0.5];
  const aim = [0.72, 0.5];
  let frameCount = 0;
  const draw = (time) => {
    mouse[0] += (aim[0] - mouse[0]) * 0.05;
    mouse[1] += (aim[1] - mouse[1]) * 0.05;
    if (frameCount++ % 6 === 0) measure();
    gl.uniform2f(uR, flowCanvas.width, flowCanvas.height);
    gl.uniform1f(uT, time);
    gl.uniform2f(uM, mouse[0], mouse[1]);
    gl.uniform1f(uLight, root.dataset.theme === 'dark' ? 0 : 1);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  };
  resize();
  window.addEventListener('resize', () => {
    resize();
    measure();
    if (reduceMotion) draw(24);
  });
  if (reduceMotion) {
    draw(24);
    // a still frame still has to follow the theme
    themeToggles.forEach((btn) => btn.addEventListener('click', () => draw(24)));
    darkQuery.addEventListener('change', () => draw(24));
    return;
  }
  if (finePointer) {
    hero.addEventListener('pointermove', (e) => {
      const r = hero.getBoundingClientRect();
      aim[0] = (e.clientX - r.left) / r.width;
      aim[1] = 1 - (e.clientY - r.top) / r.height;
    });
  }
  let visible = true;
  let frame = 0;
  const t0 = performance.now();
  const loop = (now) => {
    frame = 0;
    if (!visible || document.hidden) return;
    draw((now - t0) / 1000 + 24);
    frame = requestAnimationFrame(loop);
  };
  const wake = () => {
    if (!frame && visible && !document.hidden) frame = requestAnimationFrame(loop);
  };
  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    wake();
  }).observe(hero);
  document.addEventListener('visibilitychange', wake);
  wake();
};
if (flowCanvas && fig01) startFlow();

// Smooth scrolling. In-page links go through Lenis and then move focus to their target.
let lenis = null;
if (motion && 'Lenis' in window) {
  lenis = new window.Lenis({ lerp: 0.11 });
  lenis.on('scroll', window.ScrollTrigger.update);
  window.gsap.ticker.add((time) => lenis.raf(time * 1000));
  window.gsap.ticker.lagSmoothing(0);
}

// Lenis owns the scroll position, so page-sized keyboard scrolling goes through it too.
// Controls that use these keys themselves (the chart, the slider, form fields) handle them first.
if (lenis) {
  document.addEventListener('keydown', (e) => {
    if (e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey) return;
    if (e.target.closest('input, textarea, select, [contenteditable="true"]')) return;
    if (e.key === ' ' && e.target.closest('a, button, summary')) return;
    const step = window.innerHeight * 0.85;
    const from = lenis.targetScroll;
    if (e.key === 'PageDown' || (e.key === ' ' && !e.shiftKey)) lenis.scrollTo(from + step);
    else if (e.key === 'PageUp' || (e.key === ' ' && e.shiftKey)) lenis.scrollTo(from - step);
    else if (e.key === 'Home') lenis.scrollTo(0);
    else if (e.key === 'End') lenis.scrollTo(lenis.limit);
    else return;
    e.preventDefault();
  });
}

document.addEventListener('click', (e) => {
  const link = e.target.closest('a[href^="#"]');
  if (!link || !lenis) return;
  const hash = link.getAttribute('href');
  const target = hash === '#top' || hash === '#' ? null : document.querySelector(hash);
  if (hash !== '#top' && !target) return;
  e.preventDefault();
  lenis.scrollTo(target || 0, {
    offset: target ? -68 : 0,
    onComplete: () => {
      const focusEl = target || document.getElementById('top');
      if (!focusEl.hasAttribute('tabindex')) focusEl.setAttribute('tabindex', '-1');
      focusEl.focus({ preventScroll: true });
    },
  });
  history.pushState(null, '', hash);
});

if (motion) {
  const { gsap, ScrollTrigger } = window;
  gsap.registerPlugin(ScrollTrigger);

  // Hero: the first second (main page only)
  if (fig01) {
    const bp = fig01.querySelector('.bp');
    const intro = gsap.timeline({ defaults: { ease: 'expo.out' } });
    intro
      .fromTo('.hero-wordmark', { clipPath: 'inset(0% 100% 0% 0%)', x: -24 }, { clipPath: 'inset(0% 0% 0% 0%)', x: 0, duration: 1.3, clearProps: 'clipPath,transform' }, 0.05)
      .from(['.hero-sub', '.hero-tagline', '.hero-meta'], { y: 26, opacity: 0, duration: 1, stagger: 0.1 }, 0.35)
      .from(bp.querySelectorAll('.rotor-disc'), { scale: 0.3, opacity: 0, transformOrigin: '50% 50%', duration: 1.2, stagger: 0.05 }, 0)
      .from(bp.querySelectorAll(':scope > g:not(.discs):not(.planned):not(.tb-block)'), { opacity: 0, duration: 0.9, stagger: 0.04 }, 0.15)
      .from(bp.querySelector('.planned'), { opacity: 0, scale: 0.85, transformOrigin: '50% 50%', duration: 1 }, 0.7)
      .from(bp.querySelectorAll('text, .tb-block, .legend'), { opacity: 0, duration: 0.8, stagger: 0.03 }, 0.8);
    bp.querySelectorAll('.cline').forEach((line) => {
      const len = line.getTotalLength();
      intro.fromTo(line, { strokeDasharray: len, strokeDashoffset: len }, { strokeDashoffset: 0, duration: 0.9, ease: 'power2.inOut' }, 0.75);
    });

    gsap.to('.hero-stage', { yPercent: -10, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });

    if (finePointer) {
      const rx = gsap.quickTo(fig01, 'rotationX', { duration: 0.9, ease: 'power3' });
      const ry = gsap.quickTo(fig01, 'rotationY', { duration: 0.9, ease: 'power3' });
      hero.addEventListener('pointermove', (e) => {
        const r = hero.getBoundingClientRect();
        ry(((e.clientX - r.left) / r.width - 0.5) * 10);
        rx(-((e.clientY - r.top) / r.height - 0.5) * 8);
      });
      hero.addEventListener('pointerleave', () => {
        rx(0);
        ry(0);
      });
    }
  }

  // Band sections open up like a curtain as they arrive
  document.querySelectorAll('.curtain').forEach((section) => {
    gsap.fromTo(section, { clipPath: 'inset(0% 3% 0% 3% round 28px)' }, {
      clipPath: 'inset(0% 0% 0% 0% round 0px)',
      ease: 'none',
      scrollTrigger: { trigger: section, start: 'top bottom', end: 'top 30%', scrub: true },
    });
  });

  // Hydrogen Advantage: each figure replays whenever its card scrolls into view (either direction), on hover, or on tap.
  // restart() rewinds the one timeline to its start state, so replays never stack.
  document.querySelectorAll('.adv').forEach((card) => {
    const fig = card.querySelector('.adv-fig');
    const tl = gsap.timeline({ paused: true });

    // energy density: the hydrogen bar grows to full length
    const bar = fig.querySelector('.af-bar.h2');
    if (bar) tl.fromTo(bar, { scaleX: 0 }, { scaleX: 1, transformOrigin: '0% 50%', duration: 1.3, ease: 'expo.out' }, 0.3);

    // zero emission: CO₂ is struck out, then the H₂O pill lights
    const strike = fig.querySelector('.af-strike');
    if (strike) {
      tl.fromTo(strike, { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.8, ease: 'power2.inOut' }, 0.5);
      tl.fromTo(fig.querySelectorAll('.h2'), { opacity: 0 }, { opacity: 1, duration: 0.8, ease: 'power2.out' }, 1.1);
    }

    // continuous efficiency: battery packs drain one after another while the tank drops only slightly
    if (fig.classList.contains('af-packs')) {
      tl.fromTo(fig.querySelectorAll('.af-pack-fill'), { attr: { width: 25 } }, { attr: { width: 0 }, duration: 0.9, ease: 'power1.in', stagger: 0.9 }, 0.4);
      tl.fromTo(fig.querySelectorAll('.af-swap'), { scale: 1 }, { scale: 1.35, duration: 0.2, ease: 'power2.out', yoyo: true, repeat: 1, stagger: 0.9, transformOrigin: '50% 50%' }, 1.2);
      tl.fromTo(fig.querySelector('.af-tank-fill'), { attr: { width: 215 } }, { attr: { width: 184 }, duration: 3.6, ease: 'none' }, 0.4);
    }

    // industrial demand: the drone flies the row and each tree lights once the scan cone has passed it
    const rig = fig.querySelector('.af-rig');
    if (rig) {
      const trees = [...fig.querySelectorAll('.af-tree')];
      const pos = { x: 4 };
      const place = () => {
        rig.setAttribute('transform', `translate(${pos.x} 0)`);
        trees.forEach((tree) => tree.classList.toggle('lit', Number(tree.getAttribute('x')) <= pos.x));
      };
      tl.fromTo(pos, { x: 4 }, { x: 206, duration: 4.5, ease: 'sine.inOut', onUpdate: place }, 0);
      place();
    }

    const replay = () => tl.restart();
    ScrollTrigger.create({ trigger: card, start: 'top 85%', end: 'bottom 15%', onEnter: replay, onEnterBack: replay });
    // hover on mouse devices; a tap (not a swipe) on touch devices
    card.addEventListener(finePointer ? 'pointerenter' : 'click', replay);
  });

  // Simulation: the chart draws itself
  if (simChart) {
    const lines = [simChart.querySelector('.sim-batt'), simChart.querySelector('.sim-h2')];
    const chartIn = gsap.timeline({ scrollTrigger: { trigger: simChart, start: 'top 78%', once: true } });
    lines.forEach((line, i) => {
      const len = line.getTotalLength();
      chartIn.fromTo(line, { strokeDasharray: len, strokeDashoffset: len }, { strokeDashoffset: 0, duration: 1.2, ease: 'power2.inOut', clearProps: 'strokeDasharray,strokeDashoffset' }, i * 0.3);
    });
    chartIn
      .from(simChart.querySelector('.sim-zone'), { opacity: 0, duration: 0.9, ease: 'power2.out' }, 0.9)
      .from(simChart.querySelector('.sim-dot'), { scale: 0, transformOrigin: '50% 50%', duration: 0.8, ease: 'expo.out' }, 1.1)
      .from(simChart.querySelectorAll('.sim-label, .sim-note'), { opacity: 0, duration: 0.6, stagger: 0.1 }, 1.2);
  }

  if (finePointer) {
    // magnetic actions
    document.querySelectorAll('a.channel, .nav-actions .btn').forEach((el) => {
      const mx = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3' });
      const my = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3' });
      el.addEventListener('pointermove', (e) => {
        const r = el.getBoundingClientRect();
        mx((e.clientX - r.left - r.width / 2) * 0.06);
        my((e.clientY - r.top - r.height / 2) * 0.1);
      });
      el.addEventListener('pointerleave', () => {
        mx(0);
        my(0);
      });
    });

    // in the dark theme a soft light follows the pointer
    const glow = document.querySelector('.glow-cursor');
    const gx = gsap.quickTo(glow, 'x', { duration: 0.7, ease: 'power3' });
    const gy = gsap.quickTo(glow, 'y', { duration: 0.7, ease: 'power3' });
    window.addEventListener('pointermove', (e) => {
      gx(e.clientX);
      gy(e.clientY);
      glow.classList.add('is-on');
    }, { passive: true });

    // advantage cards light up where the pointer is
    document.querySelectorAll('.adv').forEach((card) => {
      card.addEventListener('pointermove', (e) => {
        const r = card.getBoundingClientRect();
        card.style.setProperty('--mx', `${e.clientX - r.left}px`);
        card.style.setProperty('--my', `${e.clientY - r.top}px`);
      });
    });
  }

  window.addEventListener('load', () => ScrollTrigger.refresh());
}
