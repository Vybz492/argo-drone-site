const root = document.documentElement;
const reduceQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
const reduceMotion = reduceQuery.matches;
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
// Heavy motion needs both libraries; without them (or with reduced motion) the page stays fully readable.
const motion = !reduceMotion && 'gsap' in window && 'ScrollTrigger' in window;
if (motion) root.classList.add('motion');

const nav = document.getElementById('nav');
const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 12);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

const toggle = document.getElementById('menu-toggle');
const menu = document.getElementById('mobile-menu');
if (toggle && menu) {
  const setMenu = (open) => {
    menu.hidden = !open;
    toggle.setAttribute('aria-expanded', String(open));
    toggle.textContent = open ? 'Close' : 'Menu';
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
}

const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

// Entrances: each part of a section rises in once, staggered with the parts that arrive with it
const items = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    let n = 0;
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.transitionDelay = `${n++ * 80}ms`;
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  items.forEach((el) => io.observe(el));
} else {
  items.forEach((el) => el.classList.add('in'));
}

// Hydrogen Advantage: one button opens and closes the text of all four tiles
const moreBtn = document.querySelector('.more-btn');
const tiles = document.querySelector('.tiles');
if (moreBtn && tiles) {
  moreBtn.addEventListener('click', () => {
    const open = moreBtn.getAttribute('aria-expanded') !== 'true';
    moreBtn.setAttribute('aria-expanded', String(open));
    tiles.classList.toggle('is-open', open);
    // the page got taller or shorter, so later scroll triggers move once the height has settled
    if (motion) setTimeout(() => window.ScrollTrigger.refresh(), 500);
  });
}

// Light under the pointer: on the glass tiles and on the main action
if (finePointer) {
  document.querySelectorAll('.tile').forEach((tile) => {
    tile.addEventListener('pointermove', (e) => {
      const r = tile.getBoundingClientRect();
      tile.style.setProperty('--mx', `${(((e.clientX - r.left) / r.width) * 100).toFixed(1)}%`);
    });
  });
  document.querySelectorAll('.btn-primary').forEach((btn) => {
    btn.addEventListener('pointermove', (e) => {
      const r = btn.getBoundingClientRect();
      btn.style.setProperty('--bx', `${(((e.clientX - r.left) / r.width) * 100).toFixed(1)}%`);
    });
    btn.addEventListener('pointerleave', () => btn.style.setProperty('--bx', '50%'));
  });
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
  pano.querySelector('title').textContent += ' Each drone can be moved along its survey line. Select a side, or the Terrestrial and Blue carbon buttons, for details.';
  const rigs = [...pano.querySelectorAll('.pc-handle')].map((handle) => {
    const { rig, min, max, label, where } = handle.dataset;
    const x = Number(handle.getAttribute('transform').match(/[\d.]+/)[0]);
    handle.setAttribute('tabindex', '0');
    handle.setAttribute('role', 'slider');
    handle.setAttribute('aria-label', label);
    handle.setAttribute('aria-valuemin', '0');
    handle.setAttribute('aria-valuemax', '100');
    return { rig, handle, where, min: Number(min), max: Number(max), x, to: x, parts: pano.querySelectorAll(`[data-rig="${rig}"]`) };
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

  // A click or tap on a half (or its chip) opens that market's details under the panorama; the same again closes them.
  const panel = document.getElementById('pano-panel');
  const chips = [...document.querySelectorAll('.pc-chip')];
  let side = null;
  const select = (next) => {
    side = next === side ? null : next;
    if (side) {
      panel.dataset.side = side;
      pano.dataset.side = side;
      const r = rigs.find((rig) => rig.rig === side);
      moveTo(r, (r.min + r.max) / 2);
    } else {
      delete pano.dataset.side;
    }
    panel.classList.toggle('is-open', Boolean(side));
    chips.forEach((chip) => chip.setAttribute('aria-pressed', String(chip.dataset.side === side)));
    if (motion) setTimeout(() => window.ScrollTrigger.refresh(), 500);
  };
  chips.forEach((chip) => chip.addEventListener('click', () => select(chip.dataset.side)));
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape' || !side) return;
    const chip = chips.find((c) => c.dataset.side === side);
    select(side);
    chip.focus();
  });

  let active = null;
  let down = null;
  pano.addEventListener('pointerdown', (e) => {
    active = pick(toX(e));
    // a press counts as a click until the pointer travels more than a few pixels
    down = e.button === 0 ? { x: e.clientX, y: e.clientY } : null;
    pano.setPointerCapture(e.pointerId);
    if (e.pointerType === 'mouse') moveTo(active, toX(e));
  });
  pano.addEventListener('pointermove', (e) => {
    const x = toX(e);
    if (down && Math.hypot(e.clientX - down.x, e.clientY - down.y) > 5) down = null;
    if (active) moveTo(active, x);
    // while a side is selected the drones stay put unless dragged
    else if (e.pointerType === 'mouse' && !side) moveTo(pick(x), x);
  });
  const release = () => {
    active = null;
    down = null;
  };
  pano.addEventListener('pointerup', () => {
    if (down) select(active.rig);
    release();
  });
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

/* Hero: the LiDAR beam. One fragment shader draws a fan of laser lines from a source under the navigation,
   blue at the source and warm where they reach a forest canopy, which the scan traces as one bright contour.
   Every laser line is drawn at least two render pixels wide with soft edges, so none breaks into dashes when still. */
const hero = document.getElementById('hero');
const heroLight = (() => {
  const canvas = hero && hero.querySelector('.hero-light');
  const state = { intro: reduceMotion ? 1 : 0, draw: () => {} };
  if (!canvas) return state;
  let gl = null;
  try {
    gl = canvas.getContext('webgl', { antialias: false, alpha: false, premultipliedAlpha: false, powerPreference: 'low-power' });
  } catch (e) {
    gl = null;
  }
  const frag = `precision highp float;
uniform vec2 uRes; uniform float uTime; uniform float uIntro; uniform vec2 uPtr; uniform vec4 uShade; uniform float uMotion;
const vec3 INK = vec3(0.0235, 0.0392, 0.0510);
const vec3 BLUE = vec3(0.0078, 0.5922, 0.8706);
const vec3 ORNG = vec3(0.9882, 0.4510, 0.3020);
float h1(float n) { return fract(sin(n * 127.1 + 11.7) * 43758.5453); }
float h2(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float vn(float x) { float i = floor(x); float f = fract(x); f = f * f * (3.0 - 2.0 * f); return mix(h1(i), h1(i + 1.0), f); }
/* the canopy as a LiDAR profile sees it: a mixed forest of round broadleaf crowns and pointed conifers,
   overlapping, with a ragged leafy edge and the odd gap where a laser would reach the ground */
float canopy(float x) {
  float w = 0.034; float i = floor(x / w); float h = 0.0;
  for (int k = -2; k <= 2; k++) {
    float j = i + float(k);
    float c = (j + 0.5) * w + (h1(j) - 0.5) * 0.5 * w;
    float conifer = step(0.7, h1(floor(j / 3.0) + 3.7));                 /* conifers grow in stands of three, never alone */
    float r = w * mix(0.62 + 0.42 * h1(j + 7.3), 0.78 + 0.16 * h1(j + 7.3), conifer);
    float top = mix(0.018 + 0.026 * h1(j + 13.1), 0.028 + 0.01 * h1(j + 13.1), conifer);
    float u = abs(x - c) / r;
    if (u < 1.0) h = max(h, top * mix(sqrt(1.0 - u * u), pow(1.0 - u * u, 1.4) * (1.0 - 0.35 * u), conifer));
  }
  float leaf = (vn(x * 300.0) - 0.5) * 0.0022 + (vn(x * 95.0 + 9.0) - 0.5) * 0.0035;
  return max(h + leaf * smoothstep(0.0, 0.012, h), 0.0) + 0.003;
}
float shadeMask(vec2 p) {
  vec2 c = (uShade.xy + uShade.zw) * 0.5; vec2 hs = (uShade.zw - uShade.xy) * 0.5 * 1.06 + 0.03;
  return 1.0 - smoothstep(0.55, 1.9, length((p - c) / hs));
}
void main() {
  vec2 fc = gl_FragCoord.xy; float H = uRes.y; vec2 p = fc / H; float asp = uRes.x / H;
  float e = uIntro;
  float srcY = 0.905, gY = 0.115;
  vec2 src = vec2(asp * 0.5, srcY);
  vec2 v = p - src; float down = max(-v.y, 0.0); float span = srcY - gY;
  float t = down / span;
  float tilt = (uPtr.x - 0.5) * 0.08 * uMotion;
  float a = atan(v.x, max(down, 0.0001)) - tilt;
  float halfA = 0.62 * mix(0.02, 1.0, smoothstep(0.0, 1.0, e));
  float yc = gY + canopy(p.x);
  float above = step(0.0, -v.y) * smoothstep(yc - 0.0015, yc + 0.004, p.y);
  float cone = smoothstep(halfA, halfA * 0.55, abs(a)) * above;

  /* laser lines, anti-aliased in render pixels */
  float K = 104.0;
  float n = a * K; float id = floor(n + 0.5); float r = h1(id * 1.37 + 3.0);
  float pitch = dot(v, v) * H / (K * max(down, 0.0001));        /* render pixels between neighbouring lines */
  float dpx = abs(n - id) * pitch;
  float crisp = 1.0 - smoothstep(0.6, 1.5, dpx);
  float line = mix(0.36, crisp, smoothstep(3.0, 6.0, pitch));       /* too dense to draw apart near the source: a smooth glow */
  float flick = 0.68 + 0.32 * sin(uTime * (0.5 + r * 0.9) + r * 40.0) * uMotion;
  float stri = line * (0.3 + 0.7 * r) * flick;
  float along = mix(0.3, 1.0, smoothstep(0.0, 0.8, t));
  vec3 beamCol = mix(BLUE, ORNG, smoothstep(0.42, 0.98, t));
  vec3 L = beamCol * cone * along * (0.22 + 0.9 * stri) * e;
  L += mix(vec3(0.55, 0.82, 1.0), vec3(1.0, 0.82, 0.68), smoothstep(0.3, 1.0, t)) * exp(-abs(a) * 5.0) * cone * along * 0.28 * e;
  float tp = fract(uTime / 7.5) * 1.3;
  L += beamCol * exp(-pow((t - tp) * 28.0, 2.0)) * cone * along * 0.5 * uMotion * e;   /* the scan pulse */
  float ls = length(v * vec2(1.0, 1.7)); float ig = smoothstep(0.0, 0.25, e);
  L += BLUE * exp(-ls * 15.0) * 1.1 * ig + vec3(0.8, 0.92, 1.0) * exp(-ls * 90.0) * ig;  /* source */

  /* the canopy scan line: bright and warm where the beam lands, a faint cool contour beyond it */
  float foot = span * tan(halfA);
  float gx = p.x - (src.x + span * tan(tilt));
  float inBeam = 1.0 - smoothstep(foot * 0.82, foot * 1.04, abs(gx));
  float s = (canopy(p.x + 0.002) - canopy(p.x - 0.002)) / 0.004;
  float dy = (p.y - yc) * H / sqrt(1.0 + s * s);
  float contour = 1.0 - smoothstep(0.7, 1.7, abs(dy));
  float hit = exp(-pow((tp - 1.0) * 12.0, 2.0)) * uMotion;            /* the pulse arrives */
  float edge = smoothstep(0.0, 0.12, p.x) * smoothstep(asp, asp - 0.12, p.x);
  L += vec3(1.0, 0.86, 0.72) * contour * inBeam * (0.9 + 0.5 * hit) * e;
  L += vec3(0.52, 0.66, 0.78) * contour * (1.0 - inBeam) * 0.2 * edge * e;
  L += mix(ORNG, vec3(1.0, 0.8, 0.6), 0.3) * exp(-abs(dy) / (H * 0.01)) * inBeam * 0.22 * e;
  /* warm light under the landing, cool spill around it */
  float gyd = p.y - gY;
  L += ORNG * exp(-abs(gyd) * 9.0) * exp(-pow(gx / (foot * 1.5 + 0.05), 2.0)) * 0.34 * e;
  L += BLUE * exp(-abs(gyd) * 4.0) * exp(-pow(gx / (foot * 2.6 + 0.1), 2.0)) * 0.18 * e;
  L += BLUE * 0.15 * exp(-length((p - vec2(asp * 0.5, 0.55)) * vec2(0.9 / asp, 1.4)) * 2.0) * e;
  L += (BLUE * 0.24 * exp(-length((p - vec2(0.0, 0.34)) * vec2(1.4, 1.1)) * 1.5) + BLUE * 0.15 * exp(-length((p - vec2(asp, 0.62)) * vec2(1.5, 1.2)) * 1.7) + ORNG * 0.09 * exp(-length((p - vec2(asp, 0.2)) * vec2(1.5, 1.3)) * 1.8)) * e;
  L *= mix(1.0, 0.2, smoothstep(0.002, 0.022, yc - p.y));                 /* the forest stands dark against the light */
  /* LiDAR returns: a sparse scatter of lit points in the crowns, only where the beam lands */
  vec2 gp = vec2(p.x, p.y) * H / 7.0; vec2 gc = floor(gp);
  float depth = yc - (gc.y + 0.5) * 7.0 / H;
  float ret = step(0.86, h2(gc)) * step(0.0, depth) * exp(-depth * 40.0) * (1.0 - smoothstep(0.9, 1.6, length(fract(gp) - 0.5) * 7.0));
  L += vec3(1.0, 0.86, 0.72) * ret * inBeam * 0.9 * e;
  L *= 1.0 - shadeMask(p) * mix(0.38, 0.7, smoothstep(0.45, 0.85, t));   /* dim behind the small text, softly */
  L = L / (1.0 + L * 0.3);
  vec3 col = INK + L + (h2(fc + fract(uTime) * 91.0) - 0.5) * 0.012;
  gl_FragColor = vec4(col, 1.0);
}`;
  let prog = null;
  const u = {};
  if (gl) {
    try {
      const compile = (type, src) => {
        const s = gl.createShader(type);
        gl.shaderSource(s, src);
        gl.compileShader(s);
        if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s));
        return s;
      };
      prog = gl.createProgram();
      gl.attachShader(prog, compile(gl.VERTEX_SHADER, 'attribute vec2 a;void main(){gl_Position=vec4(a,0.,1.);}'));
      gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, frag));
      gl.linkProgram(prog);
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(prog));
      gl.useProgram(prog);
      gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
      const loc = gl.getAttribLocation(prog, 'a');
      gl.enableVertexAttribArray(loc);
      gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
      ['uRes', 'uTime', 'uIntro', 'uPtr', 'uShade', 'uMotion'].forEach((name) => (u[name] = gl.getUniformLocation(prog, name)));
    } catch (err) {
      gl = null;
    }
  }
  if (!gl) {
    root.classList.add('no-gl');
    return state;
  }

  const copy = hero.querySelectorAll('.hero-label, .intro');
  const ptr = { x: 0.5, tx: 0.5 };
  let shade = [0, 0, 0, 0];
  let quality = 1;
  let slow = 0;
  let last = 0;
  let still = false;
  let running = false;
  let visible = true;
  let raf = 0;
  const t0 = performance.now();

  const draw = (now) => {
    const moving = !reduceQuery.matches;
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.uniform2f(u.uRes, canvas.width, canvas.height);
    gl.uniform1f(u.uTime, moving ? ((now || performance.now()) - t0) / 1000 : 0);
    gl.uniform1f(u.uIntro, state.intro);
    gl.uniform2f(u.uPtr, ptr.x, 0.5);
    gl.uniform4f(u.uShade, shade[0], shade[1], shade[2], shade[3]);
    gl.uniform1f(u.uMotion, moving ? 1 : 0);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  };
  // below device resolution, but never so low that a laser line falls under two render pixels on screen
  const measure = () => {
    const r = hero.getBoundingClientRect();
    const scale = Math.min(window.devicePixelRatio || 1, 1.5) * 0.85 * quality;
    canvas.width = Math.max(1, Math.round(r.width * scale));
    canvas.height = Math.max(1, Math.round(r.height * scale));
    const rs = [...copy].map((el) => el.getBoundingClientRect());
    const H = r.height;
    const c = { left: Math.min(...rs.map((q) => q.left)), right: Math.max(...rs.map((q) => q.right)), top: Math.min(...rs.map((q) => q.top)), bottom: Math.max(...rs.map((q) => q.bottom)) };
    shade = [(c.left - r.left) / H, (r.bottom - c.bottom) / H, (c.right - r.left) / H, (r.bottom - c.top) / H];
    draw();
  };
  const loop = (now) => {
    if (!running) return;
    // slow frames lower the resolution; if still slow, the light holds a still frame once the intro is done
    const dt = last ? now - last : 16;
    last = now;
    slow = dt > 40 ? slow + 1 : Math.max(0, slow - 1);
    if (slow > 20) {
      slow = 0;
      if (quality > 0.5) {
        quality *= 0.75;
        measure();
      } else still = true;
    }
    if (still && state.intro >= 1) {
      running = false;
      draw(now);
      return;
    }
    ptr.x += (ptr.tx - ptr.x) * 0.04;
    draw(now);
    raf = requestAnimationFrame(loop);
  };
  const setRunning = () => {
    const want = visible && !document.hidden && !reduceQuery.matches && !still;
    if (want && !running) {
      running = true;
      last = 0;
      raf = requestAnimationFrame(loop);
    } else if (!want && running) {
      running = false;
      cancelAnimationFrame(raf);
      draw();
    }
  };
  new ResizeObserver(measure).observe(hero);
  new IntersectionObserver(([en]) => {
    visible = en.isIntersecting;
    setRunning();
  }).observe(hero);
  document.addEventListener('visibilitychange', setRunning);
  reduceQuery.addEventListener('change', () => {
    setRunning();
    draw();
  });
  if (finePointer) {
    hero.addEventListener('pointermove', (e) => {
      const r = hero.getBoundingClientRect();
      ptr.tx = (e.clientX - r.left) / r.width;
    });
  }
  canvas.addEventListener('webglcontextlost', (e) => {
    e.preventDefault();
    running = false;
    root.classList.add('no-gl');
  });
  if (document.fonts) document.fonts.ready.then(measure);
  measure();
  setRunning();
  state.draw = draw;
  return state;
})();

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
    offset: target ? -76 : 0,
    onComplete: () => {
      const focusEl = target || document.getElementById('top');
      if (!focusEl.hasAttribute('tabindex')) focusEl.setAttribute('tabindex', '-1');
      focusEl.focus({ preventScroll: true });
    },
  });
  history.pushState(null, '', hash);
});

// Hero entrance: the beam ignites and opens, then the words rise in. The page is complete without GSAP.
const heroWords = hero ? hero.querySelectorAll('[data-in]') : [];
if ('gsap' in window && hero) {
  const { gsap } = window;
  if (reduceMotion) {
    // calm: one still frame of light, the words fade in briefly, nothing travels
    heroLight.intro = 1;
    heroLight.draw();
    gsap.fromTo(heroWords, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3, ease: 'none' });
  } else {
    const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
    tl.to(heroLight, { intro: 1, duration: 1.6, ease: 'expo.out' }, 0.05)
      .fromTo(nav, { autoAlpha: 0, y: -8 }, { autoAlpha: 1, y: 0, duration: 0.8, clearProps: 'transform,opacity,visibility' }, 0.25)
      .fromTo(heroWords, { autoAlpha: 0, y: 26 }, { autoAlpha: 1, y: 0, duration: 1.1, stagger: 0.09, clearProps: 'transform' }, 0.4);
  }
  root.classList.remove('pre');
} else {
  heroLight.intro = 1;
  heroLight.draw();
  root.classList.remove('pre');
}

if (motion) {
  const { gsap, ScrollTrigger } = window;
  gsap.registerPlugin(ScrollTrigger);

  // the hero words drift up a little as the page scrolls away from them
  gsap.to('.hero-stage', { yPercent: -8, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });

  // Fig. 01 draws itself as it arrives: rotor rings, frame, then the planned parts settle with the tank glowing
  const fig01 = document.getElementById('fig01');
  if (fig01) {
    const bp = fig01.querySelector('.bp');
    const draw = gsap.timeline({ defaults: { ease: 'expo.out' }, scrollTrigger: { trigger: fig01, start: 'top 75%', once: true } });
    draw
      .from(bp.querySelectorAll('.rotor-disc'), { scale: 0.3, opacity: 0, transformOrigin: '50% 50%', duration: 1.2, stagger: 0.05 }, 0)
      .from(bp.querySelectorAll(':scope > g:not(.discs):not(.planned):not(.tb-block)'), { opacity: 0, duration: 0.9, stagger: 0.04 }, 0.15)
      .from(bp.querySelector('.planned'), { opacity: 0, scale: 0.85, transformOrigin: '50% 50%', duration: 1 }, 0.7)
      .from(bp.querySelectorAll('text, .tb-block, .legend, .cdot'), { opacity: 0, duration: 0.8, stagger: 0.03 }, 0.8);
    bp.querySelectorAll('.cline').forEach((line) => {
      const len = line.getTotalLength();
      draw.fromTo(line, { strokeDasharray: len, strokeDashoffset: len }, { strokeDashoffset: 0, duration: 0.9, ease: 'power2.inOut', clearProps: 'strokeDasharray,strokeDashoffset' }, 0.75);
    });
    if (finePointer) {
      // the drawing tilts a few degrees towards the pointer
      const section = document.getElementById('mission');
      const rx = gsap.quickTo(fig01, 'rotationX', { duration: 0.9, ease: 'power3' });
      const ry = gsap.quickTo(fig01, 'rotationY', { duration: 0.9, ease: 'power3' });
      section.addEventListener('pointermove', (e) => {
        const r = fig01.getBoundingClientRect();
        ry(Math.max(-1, Math.min(1, (e.clientX - r.left) / r.width - 0.5)) * 10);
        rx(-Math.max(-1, Math.min(1, (e.clientY - r.top) / r.height - 0.5)) * 8);
      });
      section.addEventListener('pointerleave', () => {
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

  // Hydrogen Advantage: each figure replays whenever its tile scrolls into view (either direction), on hover, or on tap.
  // restart() rewinds the one timeline to its start state, so replays never stack.
  document.querySelectorAll('.tile').forEach((tile) => {
    const fig = tile.querySelector('.af');
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
    ScrollTrigger.create({ trigger: tile, start: 'top 85%', end: 'bottom 15%', onEnter: replay, onEnterBack: replay });
    // hover on mouse devices; a tap (not a swipe) on touch devices
    tile.addEventListener(finePointer ? 'pointerenter' : 'click', replay);
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
    // the main action and the email card lean towards the pointer
    document.querySelectorAll('a.channel, .nav-actions .btn-primary').forEach((el) => {
      const mx = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3' });
      const my = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3' });
      el.addEventListener('pointermove', (e) => {
        const r = el.getBoundingClientRect();
        mx((e.clientX - r.left - r.width / 2) * 0.08);
        my((e.clientY - r.top - r.height / 2) * 0.14);
      });
      el.addEventListener('pointerleave', () => {
        mx(0);
        my(0);
      });
    });

    // a soft hydrogen light follows the pointer
    const glow = document.querySelector('.glow-cursor');
    if (glow) {
      const gx = gsap.quickTo(glow, 'x', { duration: 0.7, ease: 'power3' });
      const gy = gsap.quickTo(glow, 'y', { duration: 0.7, ease: 'power3' });
      window.addEventListener('pointermove', (e) => {
        gx(e.clientX);
        gy(e.clientY);
        glow.classList.add('is-on');
      }, { passive: true });
    }
  }

  window.addEventListener('load', () => ScrollTrigger.refresh());
}
