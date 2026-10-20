const AZIMUTH = 45;
const ELEVATION = 30;
const SHADES = 4;
const RADIANS = Math.PI / 180;
const UNIT = Math.sqrt(1.6);
function cameraOf({ scale, azimuth = AZIMUTH, elevation = ELEVATION }) {
    const a = azimuth * RADIANS;
    const e = elevation * RADIANS;
    return { sinA: Math.sin(a), cosA: Math.cos(a), sinE: Math.sin(e), cosE: Math.cos(e), k: scale * UNIT };
}
function iso([x, y, z], projection) {
    const { origin } = projection;
    const { sinA, cosA, sinE, cosE, k } = cameraOf(projection);
    return [origin[0] + (x * sinA - y * cosA) * k, origin[1] + ((x * cosA + y * sinA) * sinE - z * cosE) * k];
}
function towardViewer(projection) {
    const { sinA, cosA } = cameraOf(projection);
    return [cosA, sinA];
}
function depthOf([x, y, z], projection) {
    const { sinA, cosA, sinE, cosE } = cameraOf(projection);
    return (x * cosA + y * sinA) * cosE + z * sinE;
}
const tenth = (value) => {
    const text = (Math.round(value * 10) / 10).toFixed(1).replace(/\.0$/, "");
    return text === "-0" ? "0" : text;
};
function pathOf(points, closed = false) {
    if (!points.length)
        return "";
    return points.map(([x, y], at) => `${at ? "L" : "M"}${tenth(x)} ${tenth(y)}`).join("") + (closed ? "Z" : "");
}
const joinPaths = (paths) => paths.filter(Boolean).join("");
function roundedPlan({ x, y, w, d, r }, steps = 8) {
    const radius = Math.max(0, Math.min(r, w / 2, d / 2));
    const corners = [
        [x + w - radius, y + radius, -90],
        [x + w - radius, y + d - radius, 0],
        [x + radius, y + d - radius, 90],
        [x + radius, y + radius, 180],
    ];
    const out = [];
    for (const [cx, cy, start] of corners) {
        const count = radius > 0 ? steps : 0;
        for (let step = 0; step <= count; step++) {
            const angle = (start + (count ? (90 * step) / count : 45)) * RADIANS;
            out.push([cx + radius * Math.cos(angle), cy + radius * Math.sin(angle)]);
        }
    }
    return out;
}
function signedArea(points) {
    let area = 0;
    for (let index = 0; index < points.length; index++) {
        const [ax, ay] = points[index];
        const [bx, by] = points[(index + 1) % points.length];
        area += ax * by - bx * ay;
    }
    return area / 2;
}
const oriented = (points) => (signedArea(points) < 0 ? [...points].reverse() : points);
function convexHull(points) {
    const sorted = [...points].sort((a, b) => a[0] - b[0] || a[1] - b[1]);
    if (sorted.length < 3)
        return sorted;
    const cross = (o, a, b) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
    const lower = [];
    for (const point of sorted) {
        while (lower.length >= 2 && cross(lower[lower.length - 2], lower[lower.length - 1], point) <= 0)
            lower.pop();
        lower.push(point);
    }
    const upper = [];
    for (let index = sorted.length - 1; index >= 0; index--) {
        const point = sorted[index];
        while (upper.length >= 2 && cross(upper[upper.length - 2], upper[upper.length - 1], point) <= 0)
            upper.pop();
        upper.push(point);
    }
    return [...lower.slice(0, -1), ...upper.slice(0, -1)];
}
function runsOf(flags, want) {
    const count = flags.length;
    const runs = [];
    const start = flags.findIndex((flag, index) => flag !== flags[(index + count - 1) % count]);
    if (start < 0)
        return flags[0] === want ? [Array.from({ length: count + 1 }, (_, index) => index % count)] : [];
    let run = null;
    for (let step = 0; step < count; step++) {
        const index = (start + step) % count;
        if (flags[index] === want) {
            if (!run)
                run = [index];
            run.push((index + 1) % count);
        }
        else if (run) {
            runs.push(run);
            run = null;
        }
    }
    if (run)
        runs.push(run);
    return runs;
}
function extrude(ring, z, height, projection, options = {}) {
    const convex = options.convex ?? true;
    const count = ring.length;
    const counter = signedArea(ring) > 0;
    const [vx, vy] = towardViewer(projection);
    const { sinA, cosA } = cameraOf(projection);
    const normals = ring.map(([ax, ay], index) => {
        const [bx, by] = ring[(index + 1) % count];
        const dx = bx - ax;
        const dy = by - ay;
        const length = Math.hypot(dx, dy) || 1;
        return (counter ? [dy / length, -dx / length] : [-dy / length, dx / length]);
    });
    const facing = normals.map(([nx, ny]) => nx * vx + ny * vy > 1e-9);
    const top = ring.map(([x, y]) => iso([x, y, z + height], projection));
    const bottom = ring.map(([x, y]) => iso([x, y, z], projection));
    const outline = [];
    const crease = [];
    for (const run of runsOf(facing, false))
        outline.push(pathOf(run.map((index) => top[index])));
    for (const run of runsOf(facing, true)) {
        crease.push(pathOf(run.map((index) => top[index])));
        if (height > 0)
            outline.push(pathOf(run.map((index) => bottom[index])));
    }
    if (height > 0) {
        for (let index = 0; index < count; index++) {
            if (facing[(index + count - 1) % count] !== facing[index])
                outline.push(pathOf([top[index], bottom[index]]));
        }
    }
    let fill;
    if (convex) {
        fill = pathOf(convexHull([...top, ...bottom]), true);
    }
    else {
        const parts = [pathOf(oriented(top), true), pathOf(oriented(bottom), true)];
        for (let index = 0; index < count; index++) {
            if (!facing[index])
                continue;
            const next = (index + 1) % count;
            parts.push(pathOf(oriented([top[index], top[next], bottom[next], bottom[index]]), true));
        }
        fill = parts.join("");
    }
    const buckets = Array.from({ length: SHADES }, () => []);
    if (height > 0) {
        const [lx, ly] = [-sinA, cosA];
        for (let index = 0; index < count; index++) {
            if (!facing[index])
                continue;
            const [nx, ny] = normals[index];
            const lit = (nx * lx + ny * ly + 1) / 2;
            const shade = Math.min(SHADES - 1, Math.max(0, Math.floor(lit * SHADES)));
            const next = (index + 1) % count;
            buckets[shade].push(pathOf(oriented([top[index], top[next], bottom[next], bottom[index]]), true));
        }
    }
    let bevel;
    if (options.bevel && options.bevel > 0) {
        const by = options.bevel;
        const inset = ring.map(([x, y], index) => {
            const [ax, ay] = normals[(index + count - 1) % count];
            const [bx, by2] = normals[index];
            const mx = ax + bx;
            const my = ay + by2;
            const length = Math.hypot(mx, my) || 1;
            return [x - (mx / length) * by, y - (my / length) * by];
        });
        const insetTop = inset.map(([x, y]) => iso([x, y, z + height], projection));
        bevel = runsOf(facing, true)
            .map((run) => pathOf([top[run[0]], ...run.slice(1, -1).map((index) => insetTop[index]), top[run[run.length - 1]]]))
            .join("");
    }
    return {
        fill,
        outline: outline.join(""),
        crease: crease.join(""),
        top: pathOf(oriented(top), true),
        shades: buckets.map((paths) => paths.join("")),
        bevel,
    };
}
const ringOf = (plan, steps = 8) => roundedPlan(plan, steps);
function slabOf(plan, z, height, projection, steps = 8, bevel = 0) {
    return extrude(ringOf(plan, steps), z, height, projection, { convex: true, bevel });
}
function circleRing(cx, cy, radius, steps = 40) {
    return Array.from({ length: steps }, (_, step) => {
        const angle = (step / steps) * Math.PI * 2;
        return [cx + radius * Math.cos(angle), cy + radius * Math.sin(angle)];
    });
}
function cylinder(cx, cy, radius, z, height, projection, steps = 32, bevel = 0) {
    return extrude(circleRing(cx, cy, radius, steps), z, height, projection, { convex: true, bevel });
}
const insetPlan = ({ x, y, w, d, r }, by) => ({ x: x + by, y: y + by, w: w - by * 2, d: d - by * 2, r: Math.max(0, r - by) });
function onTop(points, z, projection, closed = false) {
    return pathOf(points.map(([x, y]) => iso([x, y, z], projection)), closed);
}
const planOutline = (plan, z, projection, steps = 8) => onTop(ringOf(plan, steps), z, projection, true);
const lineOnTop = (from, to, z, projection) => onTop([from, to], z, projection);
const segment = (from, to, projection) => pathOf([iso(from, projection), iso(to, projection)]);
const rise = (at, from, to, projection) => segment([at[0], at[1], from], [at[0], at[1], to], projection);
const ring = (cx, cy, radius, z, projection, steps = 40) => onTop(circleRing(cx, cy, radius, steps), z, projection, true);
const pointsAt = (points, projection) => points.map((point) => iso(point, projection));
function dotGrid(x, y, columns, rows, gap, z, projection) {
    const dots = [];
    for (let row = 0; row < rows; row++) {
        for (let column = 0; column < columns; column++)
            dots.push(iso([x + column * gap, y + row * gap, z], projection));
    }
    return dots;
}
function corners({ x, y, w, d }, inset = 0) {
    return [
        [x + inset, y + inset],
        [x + w - inset, y + inset],
        [x + inset, y + d - inset],
        [x + w - inset, y + d - inset],
    ];
}
function boxCorners({ x, y, w, d }, z0, z1) {
    const out = [];
    for (const px of [x, x + w])
        for (const py of [y, y + d])
            for (const z of [z0, z1])
                out.push([px, py, z]);
    return out;
}
function knurl(cx, cy, radius, z0, z1, count, projection, inset = 0.4) {
    const [vx, vy] = towardViewer(projection);
    const lines = [];
    for (let index = 0; index < count; index++) {
        const angle = (index / count) * Math.PI * 2;
        const nx = Math.cos(angle);
        const ny = Math.sin(angle);
        if (nx * vx + ny * vy < 0.15)
            continue;
        lines.push(segment([cx + radius * nx, cy + radius * ny, z0 + inset], [cx + radius * nx, cy + radius * ny, z1 - inset], projection));
    }
    return lines.join("");
}
function sideArc(cx, cy, radius, z, projection, steps = 24) {
    const [vx, vy] = towardViewer(projection);
    const facing = Math.atan2(vy, vx);
    const points = [];
    for (let step = 0; step <= steps; step++) {
        const angle = facing - Math.PI / 2 + (step / steps) * Math.PI;
        points.push(iso([cx + radius * Math.cos(angle), cy + radius * Math.sin(angle), z], projection));
    }
    return pathOf(points);
}
function ringSeam(ring, z, projection) {
    const count = ring.length;
    const counter = signedArea(ring) > 0;
    const [vx, vy] = towardViewer(projection);
    const facing = ring.map(([ax, ay], index) => {
        const [bx, by] = ring[(index + 1) % count];
        const dx = bx - ax;
        const dy = by - ay;
        const [nx, ny] = counter ? [dy, -dx] : [-dy, dx];
        return nx * vx + ny * vy > 1e-9;
    });
    return runsOf(facing, true).map((run) => pathOf(run.map((index) => iso([ring[index][0], ring[index][1], z], projection)))).join("");
}
const sideSeam = (plan, z, projection, steps = 8) => ringSeam(ringOf(plan, steps), z, projection);
function sideRing(center, radius, axis, projection, steps = 20) {
    const [px, py, pz] = center;
    const points = [];
    for (let step = 0; step < steps; step++) {
        const angle = (step / steps) * Math.PI * 2;
        const u = radius * Math.cos(angle);
        const v = radius * Math.sin(angle);
        points.push(iso(axis === "x" ? [px, py + u, pz + v] : [px + u, py, pz + v], projection));
    }
    return pathOf(points, true);
}
function coil(from, to, center, radius, turns, axis, projection, perTurn = 16) {
    const count = Math.max(1, Math.round(turns * perTurn));
    const back = [];
    const front = [];
    let run = [];
    let near = null;
    for (let index = 0; index <= count; index++) {
        const share = index / count;
        const angle = share * turns * Math.PI * 2;
        const u = radius * Math.cos(angle);
        const v = radius * Math.sin(angle);
        const along = from + (to - from) * share;
        const point = axis === "x" ? [along, center[0] + u, center[1] + v] : [center[0] + u, along, center[1] + v];
        const normal = axis === "x" ? [0, Math.cos(angle), Math.sin(angle)] : [Math.cos(angle), 0, Math.sin(angle)];
        const facing = depthOf(normal, projection) > 0;
        const flat = iso(point, projection);
        if (near === null)
            near = facing;
        if (facing !== near) {
            run.push(flat);
            (near ? front : back).push(pathOf(run));
            run = [flat];
            near = facing;
            continue;
        }
        run.push(flat);
    }
    if (run.length > 1)
        (near ? front : back).push(pathOf(run));
    return { back: back.join(""), front: front.join("") };
}
function topTicks(from, to, step, every, edge, z, lengths, projection, axis = "x") {
    const minor = [];
    const major = [];
    const first = Math.ceil(from / step) * step;
    for (let at = first, index = Math.round(first / step); at <= to + 1e-9; at += step, index++) {
        const big = index % every === 0;
        const length = big ? lengths[1] : lengths[0];
        const a = axis === "x" ? [at, edge] : [edge, at];
        const b = axis === "x" ? [at, edge + length] : [edge + length, at];
        (big ? major : minor).push(lineOnTop(a, b, z, projection));
    }
    return { minor: minor.join(""), major: major.join("") };
}
function sideTicks(from, to, step, every, face, top, lengths, projection, axis = "x") {
    const minor = [];
    const major = [];
    const first = Math.ceil(from / step) * step;
    for (let at = first, index = Math.round(first / step); at <= to + 1e-9; at += step, index++) {
        const big = index % every === 0;
        const length = big ? lengths[1] : lengths[0];
        const a = axis === "x" ? [at, face, top] : [face, at, top];
        const b = axis === "x" ? [at, face, top - length] : [face, at, top - length];
        (big ? major : minor).push(segment(a, b, projection));
    }
    return { minor: minor.join(""), major: major.join("") };
}
function radialTicks(cx, cy, radius, count, every, z, lengths, projection, from = 0, span = Math.PI * 2) {
    const minor = [];
    const major = [];
    const closed = Math.abs(span - Math.PI * 2) < 1e-9;
    const steps = closed ? count : count + 1;
    for (let index = 0; index < steps; index++) {
        const angle = from + (index / count) * span;
        const big = index % every === 0;
        const inner = radius - (big ? lengths[1] : lengths[0]);
        const sx = Math.sin(angle);
        const sy = -Math.cos(angle);
        (big ? major : minor).push(lineOnTop([cx + sx * inner, cy + sy * inner], [cx + sx * radius, cy + sy * radius], z, projection));
    }
    return { minor: minor.join(""), major: major.join("") };
}
const haloOf = (plan, z, height, projection) => slabOf(plan, z, height, projection).fill;
function axisVector(projection, [dx, dy, dz]) {
    const origin = iso([0, 0, 0], projection);
    const moved = iso([dx, dy, dz], projection);
    return [moved[0] - origin[0], moved[1] - origin[1]];
}
const fine = (value) => Math.round(value * 100) / 100;
function translateAlong(projection, by) {
    const [x, y] = axisVector(projection, by);
    return `translate(${fine(x)} ${fine(y)})`;
}
const thousandth = (value) => Math.round(value * 1000) / 1000;
function axesAt(at, z, projection) {
    const origin = iso([at[0], at[1], z], projection);
    const along = (point) => {
        const [px, py] = iso(point, projection);
        return [px - origin[0], py - origin[1]];
    };
    return { origin, x: along([at[0] + 1, at[1], z]), y: along([at[0], at[1] + 1, z]), z: along([at[0], at[1], z + 1]) };
}
const matrixOf = (u, v, origin) => `matrix(${thousandth(u[0])} ${thousandth(u[1])} ${thousandth(v[0])} ${thousandth(v[1])} ${thousandth(origin[0])} ${thousandth(origin[1])})`;
function holdStill(element, [dx, dy]) {
    const text = dx || dy ? `translate(${-dx} ${-dy})` : "";
    element.querySelectorAll("[data-hold]").forEach((node) => (text ? node.setAttribute("transform", text) : node.removeAttribute("transform")));
}
function topMatrix(at, z, projection, along = "x") {
    const { origin, x, y } = axesAt(at, z, projection);
    return along === "x" ? matrixOf(x, y, origin) : matrixOf([-y[0], -y[1]], x, origin);
}
function sideMatrix(at, z, projection, face) {
    const { origin, x, y, z: up } = axesAt(at, z, projection);
    const down = [-up[0], -up[1]];
    return face === "left" ? matrixOf(x, down, origin) : matrixOf([-y[0], -y[1]], down, origin);
}
function screenRise(height, projection) {
    const { cosE, k } = cameraOf(projection);
    return height * cosE * k;
}
function fitProjection(points, width, height, { pad = 24, headroom = 0, azimuth = AZIMUTH, elevation = ELEVATION } = {}) {
    const unit = { origin: [0, 0], scale: 1, azimuth, elevation };
    const flat = points.map((point) => iso(point, unit));
    const xs = flat.map(([x]) => x);
    const ys = flat.map(([, y]) => y);
    const left = Math.min(...xs);
    const right = Math.max(...xs);
    const up = Math.min(...ys);
    const down = Math.max(...ys);
    const scale = Math.min((width - pad * 2) / (right - left), (height - pad * 2 - headroom) / (down - up));
    return {
        origin: [width / 2 - ((left + right) / 2) * scale, headroom + (height - headroom) / 2 - ((up + down) / 2) * scale],
        scale,
        azimuth,
        elevation,
    };
}
const escape = (text) => text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const attrs = (pairs) => Object.entries(pairs)
    .filter(([, value]) => value !== undefined && value !== false)
    .map(([key, value]) => ` ${key}="${escape(String(value))}"`)
    .join("");
function solidSvg(paths, { tone = "hi", crease = "faint", halo = false, lit = false, flat = false, className, inner = "" } = {}) {
    const parts = [];
    if (halo)
        parts.push(`<path class="iso-halo" d="${paths.fill}"/>`);
    parts.push(`<path class="iso-fill" d="${paths.fill}"/>`);
    if (!flat) {
        paths.shades.forEach((d, shade) => {
            if (d)
                parts.push(`<path class="iso-shade" data-shade="${shade}" d="${d}"/>`);
        });
        parts.push(`<path class="iso-top" d="${paths.top}"/>`);
    }
    if (crease !== "none" && paths.crease)
        parts.push(`<path class="iso-line iso-crease" data-tone="${crease}" d="${paths.crease}"/>`);
    if (crease !== "none" && paths.bevel)
        parts.push(`<path class="iso-line iso-bevel" data-tone="${crease}" d="${paths.bevel}"/>`);
    if (inner)
        parts.push(inner);
    parts.push(`<path class="iso-line iso-edge" data-tone="${tone}" d="${paths.outline}"/>`);
    return `<g${attrs({ class: className ? `iso-solid ${className}` : "iso-solid", "data-lit": lit ? "" : undefined, "data-seamless": paths.seamless ? "" : undefined })}>${parts.join("")}</g>`;
}
function lineSvg(d, { tone = "lo", dotted = false, dashed = false, flow = false, className, free } = {}) {
    if (!d)
        return "";
    return `<path${attrs({
        class: className ? `iso-line ${className}` : "iso-line",
        "data-tone": tone,
        "data-free": free === true ? "" : free || undefined,
        "data-dotted": dotted ? "" : undefined,
        "data-dashed": dashed ? "" : undefined,
        "data-flow": flow ? "" : undefined,
        d,
    })}/>`;
}
function dotsSvg(points, { size = 0.5, tone = "mid", pulse = false } = {}) {
    const dots = points
        .map(([x, y, alpha], index) => `<circle cx="${tenth(x)}" cy="${tenth(y)}" r="${size}"${alpha !== undefined && alpha < 1 ? ` fill-opacity="${Math.max(0, alpha).toFixed(2)}"` : ""}${pulse ? ` data-pulse="" style="--pulse-at:${(index * 137) % 1600}ms"` : ""}/>`)
        .join("");
    return `<g class="iso-dots" data-tone="${tone}">${dots}</g>`;
}
function fadedSvg(list, style = {}) {
    const groups = new Map();
    for (const entry of list) {
        const [d, alpha] = Array.isArray(entry) ? entry : [entry.d, entry.alpha];
        if (!d || !(alpha > 0.02))
            continue;
        const level = Math.min(1, Math.round(alpha * 20) / 20);
        groups.set(level, (groups.get(level) ?? "") + d);
    }
    return [...groups].map(([alpha, d]) => (alpha >= 1 ? lineSvg(d, style) : `<g opacity="${alpha.toFixed(2)}">${lineSvg(d, style)}</g>`)).join("");
}
function fadeLineSvg(points, { fade = [0, 0], tone = "lo", className, stops = 6 } = {}) {
    if (points.length < 2)
        return "";
    const ease = (t) => t * t * (3 - 2 * t);
    const hashOf = (text) => {
        let hash = 2166136261;
        for (let index = 0; index < text.length; index++)
            hash = Math.imul(hash ^ text.charCodeAt(index), 16777619);
        return (hash >>> 0).toString(36);
    };
    const lengths = [0];
    for (let index = 1; index < points.length; index++)
        lengths.push(lengths[index - 1] + Math.hypot(points[index][0] - points[index - 1][0], points[index][1] - points[index - 1][1]));
    const at = (length) => {
        let index = 1;
        while (index < points.length - 1 && lengths[index] < length)
            index++;
        const span = lengths[index] - lengths[index - 1] || 1;
        const t = Math.max(0, Math.min(1, (length - lengths[index - 1]) / span));
        return [points[index - 1][0] + (points[index][0] - points[index - 1][0]) * t, points[index - 1][1] + (points[index][1] - points[index - 1][1]) * t];
    };
    const pieceOf = (from, to) => [at(from), ...points.filter((_, index) => lengths[index] > from + 1e-6 && lengths[index] < to - 1e-6), at(to)];
    const total = lengths[lengths.length - 1];
    if (total < 1e-6)
        return "";
    let [start, end] = Array.isArray(fade) ? fade : [fade, fade];
    if (start + end > total) {
        const share = total / (start + end);
        start *= share;
        end *= share;
    }
    const paint = `var(--anatomy-${tone})`;
    const ramp = (piece, rising) => {
        const d = pathOf(piece);
        const [x1, y1] = piece[0];
        const [x2, y2] = piece[piece.length - 1];
        const id = `iso-fade-${hashOf(`${d}|${tone}|${rising}`)}`;
        const marks = Array.from({ length: stops + 1 }, (_, index) => {
            const t = index / stops;
            const alpha = ease(rising ? t : 1 - t);
            return `<stop offset="${t.toFixed(3)}" stop-opacity="${alpha.toFixed(3)}" style="stop-color:${paint}"/>`;
        }).join("");
        const gradient = `<linearGradient id="${id}" gradientUnits="userSpaceOnUse" x1="${tenth(x1)}" y1="${tenth(y1)}" x2="${tenth(x2)}" y2="${tenth(y2)}">${marks}</linearGradient>`;
        return `<defs>${gradient}</defs><path${attrs({ class: className ? `iso-line ${className}` : "iso-line", "data-tone": tone, "data-free": rising ? "start" : "end", d, style: `stroke:url(#${id})` })}/>`;
    };
    const parts = [];
    if (start > 0.05)
        parts.push(ramp(pieceOf(0, start), true));
    if (total - end - start > 0.05)
        parts.push(lineSvg(pathOf(pieceOf(start, total - end)), { tone, className }));
    if (end > 0.05)
        parts.push(ramp(pieceOf(total - end, total), false));
    return `<g class="iso-fade">${parts.join("")}</g>`;
}
function wireSvg(from, to, { via = [], tone = "lo", dotted = false, dashed = false, flow = false, ends = "both", size = 1.2 } = {}) {
    const d = pathOf([from, ...via, to]);
    const end = ([x, y]) => `<circle class="iso-wire-end" cx="${tenth(x)}" cy="${tenth(y)}" r="${size}"/>`;
    return `<g class="iso-wire" data-tone="${tone}">${lineSvg(d, { tone, dotted, dashed, flow })}${ends === "both" || ends === "from" ? end(from) : ""}${ends === "both" || ends === "to" ? end(to) : ""}</g>`;
}
function faceTextSvg(transform, text, { size = 3, tone = "mid", anchor = "start" } = {}) {
    return `<text class="iso-face-text" data-tone="${tone}" transform="${transform}" font-size="${size}" text-anchor="${anchor}">${escape(text)}</text>`;
}
function groupSvg(children, extra = {}) {
    return `<g${attrs(extra)}>${Array.isArray(children) ? children.join("") : children}</g>`;
}
function figureSvg({ width, height, label, body, standalone = false, className }) {
    const style = standalone ? `<style>${ISO_CSS}</style>` : "";
    return `<svg${attrs({
        xmlns: "http://www.w3.org/2000/svg",
        class: `iso-svg${standalone ? " iso" : ""}${className ? ` ${className}` : ""}`,
        "data-theme": standalone || undefined,
        viewBox: `0 0 ${width} ${height}`,
        role: "img",
        "aria-label": label,
    })}>${style}${Array.isArray(body) ? body.join("") : body}</svg>`;
}
function swatchSvg(mark) {
    if (mark === "raised" || mark === "flat" || mark === "lit") {
        const body = mark === "flat" ? "M2 6.5 8 3.5 14 6.5 8 9.5Z" : "M2 4.5 8 1.5 14 4.5 14 6 8 9 2 6Z";
        const crease = mark === "flat" ? "" : `<path class="iso-swatch-crease" d="M2 4.5 8 7.5 14 4.5"/>`;
        return `<svg class="iso-swatch" data-mark="${mark}" viewBox="0 0 16 10" aria-hidden="true"><path d="${body}"/>${crease}</svg>`;
    }
    return `<svg class="iso-swatch" data-mark="${mark}" viewBox="0 0 16 10" aria-hidden="true"><path d="M1.5 5h13"/></svg>`;
}
function plateHtml({ fig, title, hint, readout = "", keys = [], caption, body }) {
    const corner = (name, text, extra = "") => `<span class="iso-plate-corner" data-corner="${name}"${extra}>${escape(text)}</span>`;
    const legend = keys.length || caption
        ? `<figcaption class="iso-legend">${keys.length ? `<span class="iso-keys">${keys.map((key) => `<span class="iso-key">${swatchSvg(key.mark)}${escape(key.label)}</span>`).join("")}</span>` : ""}${caption ? `<span class="iso-caption">${escape(caption)}</span>` : ""}</figcaption>`
        : "";
    return `<figure class="iso-figure"><div class="iso-plate"><div class="iso-plate-corners" aria-hidden="true">${corner("fig", fig)}${title ? corner("title", title) : ""}${hint ? corner("hint", hint) : ""}${corner("readout", readout, " data-readout")}</div>${body}</div>${legend}</figure>`;
}
function pageHtml({ title, theme = "dark", body, script = "", width = 650 }) {
    return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${escape(title)}</title><style>${ISO_CSS}${PAGE_CSS.replace("__WIDTH__", String(width))}</style></head><body class="iso" data-theme="${theme}"><main class="iso-page">${body}</main>${script ? `<script type="module">${script.replace(/<\/(script)/gi, "<\\/$1")}<\/script>` : ""}</body></html>`;
}
const PAGE_CSS = `
*{box-sizing:border-box}
html{color-scheme:dark}
body[data-theme="light"]{color-scheme:light}
body{margin:0;background:var(--anatomy-page);color:var(--anatomy-text);font:14px/1.6 ui-sans-serif,system-ui,-apple-system,"Segoe UI",sans-serif;-webkit-font-smoothing:antialiased}
.iso-page{width:min(__WIDTH__px,100% - 32px);margin:64px auto 96px}
`;
const ISO_CSS = `
.iso{
  --anatomy-page:#0b0b0b;--anatomy-card:#131313;--anatomy-text:#a3a3a3;--anatomy-strong:#e6e6e6;--anatomy-muted:#6e6e6e;
  --anatomy-paper:#131313;--anatomy-face:#1b1b1b;--anatomy-top:#1c1c1c;
  --anatomy-shade-0:#0f0f0f;--anatomy-shade-1:#121212;--anatomy-shade-2:#151515;--anatomy-shade-3:#181818;
  --anatomy-lit-top:#262626;--anatomy-lit-shade:#1d1d1d;
  --anatomy-hi:#d4d4d4;--anatomy-mid:#6a6a6a;--anatomy-lo:#3e3e3e;--anatomy-faint:#2a2a2a;--anatomy-lit:#ffffff;
  --anatomy-halo:#050505;--anatomy-halo-opacity:.9;--anatomy-dot:#e6e6e6;
  --anatomy-red:#ff6b6b;--anatomy-green:#6be0a0;--anatomy-blue:#6b9bff;
  --anatomy-weight:.6px;--anatomy-ease:cubic-bezier(.32,.72,0,1);
  --anatomy-mono:ui-monospace,"SF Mono",Menlo,Consolas,monospace;
  --anatomy-lift:inset 0 1px 0 0 #ffffff0a,inset 0 0 0 1px #ffffff06,0 0 0 1px #00000026,0 1px 1px -.5px #00000014,0 3px 3px -1.5px #00000014,0 6px 6px -3px #00000014,0 12px 12px -6px #00000014;
}
.iso[data-theme="light"]{
  --anatomy-page:#f2f2ef;--anatomy-card:#fbfbfa;--anatomy-text:#57575a;--anatomy-strong:#18181a;--anatomy-muted:#8c8c90;
  --anatomy-paper:#fbfbfa;--anatomy-face:#ffffff;--anatomy-top:#ffffff;
  --anatomy-shade-0:#dcdcd9;--anatomy-shade-1:#e5e5e2;--anatomy-shade-2:#ededea;--anatomy-shade-3:#f4f4f1;
  --anatomy-lit-top:#ffffff;--anatomy-lit-shade:#eeeeeb;
  --anatomy-hi:#26262a;--anatomy-mid:#8a8a8f;--anatomy-lo:#b4b4b8;--anatomy-faint:#d4d4d6;--anatomy-lit:#000000;
  --anatomy-halo:#8a8a80;--anatomy-halo-opacity:.32;--anatomy-dot:#3a3a3e;
  --anatomy-red:#e5484d;--anatomy-green:#30a46c;--anatomy-blue:#3e63dd;
  --anatomy-lift:inset 0 1px 0 0 #ffffff,0 0 0 1px #0000000f,0 1px 1px -.5px #0000000a,0 3px 3px -1.5px #0000000a,0 6px 6px -3px #0000000a,0 12px 12px -6px #0000000a;
}
.iso-svg{display:block;width:100%;height:auto;overflow:visible}
.iso-svg path,.iso-svg circle{vector-effect:non-scaling-stroke}
.iso-fill{fill:var(--anatomy-paper);stroke:none}
.iso-solid[data-lit]>.iso-fill{fill:var(--anatomy-face)}
.iso-shade,.iso-top{stroke:none}
.iso-shade[data-shade="0"]{fill:var(--anatomy-shade-0)}
.iso-shade[data-shade="1"]{fill:var(--anatomy-shade-1)}
.iso-shade[data-shade="2"]{fill:var(--anatomy-shade-2)}
.iso-shade[data-shade="3"]{fill:var(--anatomy-shade-3)}
.iso-top{fill:var(--anatomy-top)}
.iso-solid[data-lit]>.iso-top{fill:var(--anatomy-lit-top)}
.iso-solid[data-lit]>.iso-shade{fill:var(--anatomy-lit-shade)}
.iso-solid[data-seamless]>.iso-shade,.iso-solid[data-seamless]>.iso-top{stroke-width:.4;stroke-linejoin:round}
.iso-solid[data-seamless]>.iso-shade[data-shade="0"]{stroke:var(--anatomy-shade-0)}
.iso-solid[data-seamless]>.iso-shade[data-shade="1"]{stroke:var(--anatomy-shade-1)}
.iso-solid[data-seamless]>.iso-shade[data-shade="2"]{stroke:var(--anatomy-shade-2)}
.iso-solid[data-seamless]>.iso-shade[data-shade="3"]{stroke:var(--anatomy-shade-3)}
.iso-solid[data-seamless]>.iso-top{stroke:var(--anatomy-top)}
.iso-solid[data-seamless][data-lit]>.iso-top{stroke:var(--anatomy-lit-top)}
.iso-solid[data-seamless][data-lit]>.iso-shade{stroke:var(--anatomy-lit-shade)}
.iso-solid[data-lit]>.iso-edge{stroke:var(--anatomy-lit)}
.iso-halo{fill:var(--anatomy-halo);stroke:none;filter:blur(9px);opacity:var(--anatomy-halo-opacity);transform:translateY(3px)}
.iso-line{fill:none;stroke:var(--anatomy-lo);stroke-width:var(--anatomy-weight);stroke-linecap:round;stroke-linejoin:round}
.iso-line[data-tone="hi"]{stroke:var(--anatomy-hi)}
.iso-line[data-tone="mid"]{stroke:var(--anatomy-mid)}
.iso-line[data-tone="lo"]{stroke:var(--anatomy-lo)}
.iso-line[data-tone="faint"]{stroke:var(--anatomy-faint)}
.iso-line[data-tone="lit"]{stroke:var(--anatomy-lit)}
.iso-line[data-tone="red"]{stroke:var(--anatomy-red)}
.iso-line[data-tone="green"]{stroke:var(--anatomy-green)}
.iso-line[data-tone="blue"]{stroke:var(--anatomy-blue)}
.iso-line[data-dotted]{stroke-dasharray:.01 3.5;stroke-width:1}
.iso-line[data-dashed]{stroke-dasharray:3 3}
.iso-line[data-flow]{stroke-dasharray:2 6}
.iso-wire-end{fill:var(--anatomy-paper);stroke:var(--anatomy-lo);stroke-width:var(--anatomy-weight)}
.iso-wire[data-tone="hi"] .iso-wire-end{stroke:var(--anatomy-hi)}
.iso-wire[data-tone="mid"] .iso-wire-end{stroke:var(--anatomy-mid)}
.iso-wire[data-tone="faint"] .iso-wire-end{stroke:var(--anatomy-faint)}
.iso-wire[data-tone="lit"] .iso-wire-end{stroke:var(--anatomy-lit)}
.iso-dots circle{fill:var(--anatomy-dot);stroke:none;opacity:.32}
.iso-dots[data-tone="hi"] circle{opacity:.85}
.iso-dots[data-tone="mid"] circle{opacity:.45}
.iso-dots[data-tone="lo"] circle{opacity:.22}
.iso-dots[data-tone="faint"] circle{opacity:.12}
.iso-face-text{fill:var(--anatomy-mid);font-family:var(--anatomy-mono);letter-spacing:.04em}
.iso-face-text[data-tone="hi"]{fill:var(--anatomy-hi)}
.iso-face-text[data-tone="lo"]{fill:var(--anatomy-lo)}
.iso-face-text[data-tone="faint"]{fill:var(--anatomy-faint)}
.tb-body{fill:var(--anatomy-shade-2);stroke:none}
.tb-shine{fill:var(--anatomy-top);stroke:none}
.tb-shade{fill:var(--anatomy-shade-0);stroke:none}
.tb-ring{fill:none;stroke:var(--anatomy-lo);stroke-width:.45;stroke-linecap:butt;stroke-linejoin:round}
.tb-ring[data-tone="mid"]{stroke:var(--anatomy-mid)}
.tb-ring[data-tone="faint"]{stroke:var(--anatomy-faint)}
.tb-ring[data-tone="hi"]{stroke:var(--anatomy-hi)}
@keyframes iso-flow{to{stroke-dashoffset:-32}}
@keyframes iso-pulse{0%,100%{opacity:.18}12%{opacity:1}40%{opacity:.18}}
.iso-line[data-flow]{animation:iso-flow 1600ms linear infinite}
.iso-dots circle[data-pulse]{animation:iso-pulse 1600ms steps(1,end) infinite;animation-delay:var(--pulse-at,0ms)}
.iso-figure{margin:32px 0 36px}
.iso-plate{position:relative;padding:52px 24px;border-radius:0;background:var(--anatomy-card);box-shadow:0 0 0 1px var(--anatomy-mid);--anatomy-paper:var(--anatomy-card)}
.iso-plate-corners{position:absolute;inset:18px 20px;pointer-events:none}
.iso-plate-corner{position:absolute;color:var(--anatomy-muted);font-family:var(--anatomy-mono);font-size:10.5px;line-height:1;letter-spacing:.04em;white-space:nowrap}
.iso-plate-corner[data-corner="fig"]{top:0;left:0;color:var(--anatomy-text)}
.iso-plate-corner[data-corner="title"]{top:0;right:0;text-transform:uppercase;letter-spacing:.1em}
.iso-plate-corner[data-corner="hint"]{bottom:0;left:0;text-transform:uppercase;letter-spacing:.1em}
.iso-plate-corner[data-corner="readout"]{right:0;bottom:0;color:var(--anatomy-text);font-variant-numeric:tabular-nums}
.iso-plate .iso-svg{margin:0 auto}
.iso-legend{display:grid;gap:8px;margin-top:12px;color:var(--anatomy-muted);font-size:13px;line-height:1.55}
.iso-keys{display:flex;flex-wrap:wrap;gap:6px 18px}
.iso-key{display:inline-flex;align-items:center;gap:7px}
.iso-swatch{width:16px;height:10px;flex:none;overflow:visible}
.iso-swatch path{fill:none;stroke:var(--anatomy-hi);stroke-width:1;vector-effect:non-scaling-stroke;stroke-linejoin:round;stroke-linecap:round}
.iso-swatch[data-mark="raised"] path,.iso-swatch[data-mark="flat"] path{stroke:var(--anatomy-mid)}
.iso-swatch[data-mark="lit"] path{stroke:var(--anatomy-lit)}
.iso-swatch[data-mark="dim"] path{stroke:var(--anatomy-lo)}
.iso-swatch[data-mark="dotted"] path{stroke-dasharray:.01 3;stroke-width:1.4}
.iso-swatch[data-mark="dashed"] path{stroke-dasharray:3 2.5}
.iso-swatch[data-mark="red"] path{stroke:var(--anatomy-red)}
.iso-swatch[data-mark="green"] path{stroke:var(--anatomy-green)}
.iso-swatch[data-mark="blue"] path{stroke:var(--anatomy-blue)}
.iso-swatch-crease{stroke:var(--anatomy-lo)!important}
@media (max-width:560px){.iso-plate{padding:48px 12px 70px}.iso-plate-corner[data-corner="hint"]{bottom:18px}}
@media (prefers-reduced-motion:reduce){.iso-line[data-flow],.iso-dots circle[data-pulse]{animation:none}}
`;

const root = document.querySelector(".tb-fig");   // every other query stays inside this figure, except Fig. 04's card below
const svg = root.querySelector(".tb-svg");         // the drone; the layers above it share its viewBox (BRIEF §16)
const layers = root.querySelector(".tb-layers");
const sheets = [...layers.querySelectorAll("svg.iso-svg")];
const topSheet = layers.querySelector(".tb-layer-top");
const stage = root.querySelector(".tb-stage");
const D = {"P":{"origin":[563,421.563628132992],"scale":0.43001605757180483,"azimuth":6,"elevation":24},"Z":{"hub":434,"blade1":436,"cap1":439},"blade":[[8,-5.5],[30,-8.8],[60,-11],[110,-9.35],[160,-7.15],[185,-5.5],[185,-5.5],[187.75,-4.83],[189.76,-3],[190.5,-0.5],[189.76,2],[187.75,3.83],[185,4.5],[185,4.5],[160,5.85],[110,7.65],[60,9],[30,7.2],[8,4.5]],"cover":[[-30,0],[-29.73,-2.07],[-28.93,-4],[-27.66,-5.66],[-26,-6.93],[-24.07,-7.73],[-22,-8],[22,-8],[24.07,-7.73],[26,-6.93],[27.66,-5.66],[28.93,-4],[29.73,-2.07],[30,0],[29.73,2.07],[28.93,4],[27.66,5.66],[26,6.93],[24.07,7.73],[22,8],[-22,8],[-24.07,7.73],[-26,6.93],[-27.66,5.66],[-28.93,4],[-29.73,2.07]],"rotors":[{"id":"M1","cx":346.41,"cy":200,"theta0":76,"dir":-1},{"id":"M2","cx":346.41,"cy":-200,"theta0":-26,"dir":1},{"id":"M3","cx":0,"cy":-400,"theta0":-128,"dir":-1},{"id":"M4","cx":-346.41,"cy":-200,"theta0":-50,"dir":1},{"id":"M5","cx":-346.41,"cy":200,"theta0":100,"dir":-1},{"id":"M6","cx":0,"cy":400,"theta0":178,"dir":1}],"read":{"frame":"CENTRE FRAME · Ø 240 MM","gear":"RETRACTABLE LANDING GEAR · LOWERED · 460 × 425 × 320 MM","rest":"WHEELBASE 800 MM","arm-M1":"FRAME ARM M1 · 350 MM · STATOR 41 × 14 MM · 400 KV · COUNTER-CLOCKWISE","prop-M1":"FOLDING PROPELLER M1 · 15 × 5.2 IN","arm-M2":"FRAME ARM M2 · 350 MM · STATOR 41 × 14 MM · 400 KV · CLOCKWISE","prop-M2":"FOLDING PROPELLER M2 · 15 × 5.2 IN","arm-M3":"FRAME ARM M3 · 350 MM · STATOR 41 × 14 MM · 400 KV · COUNTER-CLOCKWISE","prop-M3":"FOLDING PROPELLER M3 · 15 × 5.2 IN","arm-M4":"FRAME ARM M4 · 350 MM · STATOR 41 × 14 MM · 400 KV · CLOCKWISE","prop-M4":"FOLDING PROPELLER M4 · 15 × 5.2 IN","arm-M5":"FRAME ARM M5 · 350 MM · STATOR 41 × 14 MM · 400 KV · COUNTER-CLOCKWISE","prop-M5":"FOLDING PROPELLER M5 · 15 × 5.2 IN","arm-M6":"FRAME ARM M6 · 350 MM · STATOR 41 × 14 MM · 400 KV · CLOCKWISE","prop-M6":"FOLDING PROPELLER M6 · 15 × 5.2 IN"}};
const P = D.P;
const narrow = matchMedia("(max-width: 880px)");
const hint = root.querySelector('[data-corner="hint"]');
if (matchMedia("(pointer: coarse)").matches && hint) hint.textContent = "Tap a component";
const COPY = {"tank":{"name":"H₂ TANK","sub":"300 bar storage","text":"Hydrogen will be compressed and stored in a Type IV carbon tank at 300 bar, providing the primary, lightweight energy reserve for the system."},"fc":{"name":"PEM FUEL CELL","sub":"steady power","text":"The stored hydrogen will be supplied to a proton exchange membrane (PEM) fuel cell, which will generate a steady, continuous supply of DC power for sustained flight."},"dcdc":{"name":"DC/DC CONVERTER","sub":"the brain: limits current","text":"A DC/DC converter will act as the central controller, safely limiting and regulating the current distributed across the internal DC bus."},"batt":{"name":"BUFFER BATTERY","sub":"absorbs the spikes","text":"A smaller battery, integrated in parallel, will absorb sudden power spikes. While the fuel cell delivers steady baseline energy, the buffer battery will handle the volatile power demands of the motors and electronic speed controllers (ESCs) during dynamic manoeuvres."}};
const order = ["tank","fc","dcdc","batt"];
let on = null, held = false;
function choose(id) {
  if (id === on) return;
  on = id;
  for (const el of layers.querySelectorAll(".cp[data-c], .tb-lead, .tb-zone")) el.toggleAttribute("data-on", el.dataset.c === id);
}

// ---- close-ups: click, Enter or tap zooms onto a component; Back, Esc or a click outside it returns ----
const ZOOM = {"tank":{"vb":[4.48,291.8,527.1,266.83],"box":[34,362.42,270.14,488],"side":"right"},"fc":{"vb":[-93.95,17.89,634.22,321.05],"box":[34,50,133.27,306.84],"side":"right"},"dcdc":{"vb":[767.14,52.32,375.33,190],"box":[964.77,106,1110,188.65],"side":"left"},"batt":{"vb":[773.6,352.42,375.33,190],"box":[967.56,406.84,1120.12,488],"side":"left"}};
const panel = stage.querySelector(".tb-zoom");
const [pName, pSub, pText] = panel.querySelectorAll("p");
const back = panel.querySelector(".tb-z-back"), apart = panel.querySelector(".tb-z-apart");
const rows = [...stage.querySelectorAll(".tb-row")];
const rowOf = (id) => rows.find((r) => r.dataset.c === id);
const calm = matchMedia("(prefers-reduced-motion: reduce)");
const fig04 = document.querySelector("figure.fc");   // Fig. 04's card, on pages that carry it below this one
const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
let zoomed = null, zoomedIn = "", tween = 0, shown = null, sharp = null;
const base = () => (narrow.matches ? svg.dataset.phone : svg.dataset.desk).split(" ").map(Number);
// BRIEF §16: every layer but the zoomed component's moves by the same compositor transform, which shows viewBox vb through
// the layers' own viewBox, so a zoom frame redraws nothing. The zoomed component's layer (sharp) takes vb as its own viewBox,
// untransformed, so its strokes stay 1 px (non-scaling) throughout, as in the single drawing; the dimmed rest scales, as it
// always did.
const movers = [layers.querySelector(".tb-dim"), ...layers.querySelectorAll(".tb-layer")];
function mapOf(vb) {
  const b = base(), w = layers.offsetWidth, h = layers.offsetHeight;
  const k0 = Math.min(w / b[2], h / b[3]), k = Math.min(w / vb[2], h / vb[3]), s = k / k0;
  return { s, x: -((w - b[2] * k0) / 2) * s + (b[0] - vb[0]) * k + (w - vb[2] * k) / 2, y: -((h - b[3] * k0) / 2) * s + (b[1] - vb[1]) * k + (h - vb[3] * k) / 2 };
}
function show(vb) {
  const m = mapOf(vb), rest = Math.abs(m.s - 1) < 1e-6 && Math.abs(m.x) < 0.01 && Math.abs(m.y) < 0.01;
  shown = rest ? null : vb;
  const t = rest ? "" : "translate(" + m.x.toFixed(2) + "px," + m.y.toFixed(2) + "px) scale(" + m.s.toFixed(5) + ")";
  for (const el of movers) el.style.transform = el === sharp ? "" : t;
  if (sharp) sharp.setAttribute("viewBox", vb.map((v) => v.toFixed(2)).join(" "));
}
function unpin() { if (sharp) { sharp.setAttribute("viewBox", base().join(" ")); sharp.style.transform = layers.querySelector(".tb-dim").style.transform; sharp = null; } }
function viewTo(to, ms) {
  cancelAnimationFrame(tween); tween = 0;
  const from = shown || base(), t0 = performance.now();
  if (ms) { hold(ms + 50); for (const el of movers) el.style.willChange = "transform, opacity"; }
  const step = (now) => {
    const t = ms ? Math.min(1, (now - t0) / ms) : 1;
    show(from.map((v, i) => v + (to[i] - v) * ease(t)));
    if (t < 1) { tween = requestAnimationFrame(step); return; }
    tween = 0;
    for (const el of movers) el.style.willChange = "";   // at rest the layers redraw sharply at their new scale
  };
  step(t0);
}
function placePanel() {
  if (!zoomed || narrow.matches) { panel.style.top = ""; return; }
  panel.style.top = (layers.offsetTop + (layers.offsetHeight - panel.offsetHeight) / 2).toFixed(0) + "px";
}
// phones: the open row's art grows to the free width beside or under its text, at most 60% of the screen height
function grow(r, open) {
  const a = r.querySelector(".tb-art"), w = +a.getAttribute("width"), h = +a.getAttribute("height");
  let z = 1;
  if (open) {
    const left = a.getBoundingClientRect().left - r.getBoundingClientRect().left, beside = getComputedStyle(r.querySelector(".tb-pick")).display === "flex";
    const room = r.clientWidth * 0.9 - 14 - left - (beside ? r.querySelector(".tb-text").offsetWidth + 18 : 0);
    z = Math.max(1, Math.min(room / w, (innerHeight * 0.6) / h));
  }
  a.style.width = (w * z).toFixed(1) + "px"; a.style.height = (h * z).toFixed(1) + "px";
}
function zoom(id, { focus = true } = {}) {
  if (id === zoomed) return;
  const was = zoomed, phone = narrow.matches;
  zoomed = id; zoomedIn = id ? (phone ? "phone" : "desk") : "";
  choose(id && phone ? id : null);                    // phones light the zone on the drone; desktop clears the hover
  layers.toggleAttribute("data-zoom", !!id); stage.toggleAttribute("data-zoom", !!id);
  for (const el of layers.querySelectorAll(".tb-layer-cp, .tb-layer-cp .cp")) el.toggleAttribute("data-zoomed", el.dataset.c === id);
  // SVG elements have no inert: the hit areas drop their tab stop and pointer events instead (CSS), the drawing its a11y tree
  svg.toggleAttribute("aria-hidden", !!id); topSheet.toggleAttribute("aria-hidden", !!id);
  for (const h of hitsEls) if (id) h.removeAttribute("tabindex"); else h.setAttribute("tabindex", "0");
  for (const r of rows) {
    const open = r.dataset.c === id, b = r.querySelector(".tb-pick");
    r.toggleAttribute("data-zoomed", open); r.inert = !!id && !open;
    b.setAttribute("aria-expanded", String(open));
    root.querySelector("#" + CSS.escape(b.getAttribute("aria-controls"))).hidden = !open;
    grow(r, open && phone);
  }
  panel.hidden = !id;
  if (id) {
    pName.textContent = COPY[id].name; pSub.textContent = COPY[id].sub; pText.textContent = COPY[id].text;
    apart.hidden = id !== "fc" || !fig04;
    panel.dataset.side = phone ? "" : ZOOM[id].side;
    (phone ? rowOf(id) : stage).appendChild(panel);
    placePanel();
    if (phone) rowOf(id).scrollIntoView({ behavior: calm.matches ? "auto" : "smooth", block: "start" });
    back.focus({ preventScroll: true });
  } else stage.appendChild(panel);
  if (!phone) {
    unpin();
    if (id) sharp = layers.querySelector('.tb-layer-cp[data-c="' + id + '"]');
    viewTo(id ? ZOOM[id].vb : base(), calm.matches ? 0 : 600);
  }
  if (!id && was && focus) (phone ? rowOf(was).querySelector(".tb-pick") : layers.querySelector('.tb-hit[data-c="' + was + '"]')).focus({ preventScroll: true });
}
// a resize keeps an open close-up in its own layout; crossing 880 px closes it. The layout is read a frame after the
// change event, because a screenshot's viewport swap fires "change" for a flip that is already undone
function fit() {
  if (zoomed && zoomedIn !== (narrow.matches ? "phone" : "desk")) zoom(null, { focus: false });
  if (!tween) {
    for (const s of sheets) if (s !== sharp) s.setAttribute("viewBox", base().join(" "));
    if (zoomed && !narrow.matches) show(ZOOM[zoomed].vb); else { unpin(); show(base()); }
  }
  placePanel();
}
fit(); narrow.addEventListener("change", () => requestAnimationFrame(fit));
addEventListener("resize", () => { if (zoomed && zoomedIn === "desk" && !narrow.matches && !tween) show(ZOOM[zoomed].vb); placePanel(); });
back.addEventListener("click", () => zoom(null));
// the fuel cell's close-up hands over to Fig. 04 below: scroll there, then take the stack apart in place
apart.addEventListener("click", () => {
  const btn = fig04.querySelector(".fc-btn");
  // phones close the row at once: a shrinking row would move the scroll target while the page scrolls to Fig. 04
  stage.classList.toggle("tb-now", narrow.matches); zoom(null, { focus: false }); stage.offsetHeight; stage.classList.remove("tb-now");
  let done = false;
  const go = () => { if (done) return; done = true; if (btn.getAttribute("aria-label") === "Take the stack apart") btn.click(); btn.focus({ preventScroll: true }); };
  const target = Math.min(scrollY + fig04.getBoundingClientRect().top - parseFloat(getComputedStyle(fig04).scrollMarginTop || 0), document.documentElement.scrollHeight - innerHeight);
  fig04.scrollIntoView({ behavior: calm.matches ? "auto" : "smooth", block: "start" });
  if (calm.matches || Math.abs(target - scrollY) < 2) go(); else { addEventListener("scrollend", go, { once: true }); setTimeout(go, 1500); }
});
panel.addEventListener("keydown", (e) => {
  if (e.key !== "Tab") return;
  const f = [...panel.querySelectorAll("button:not([hidden])")], i = f.indexOf(document.activeElement);
  e.preventDefault(); f[(i + (e.shiftKey ? -1 : 1) + f.length) % f.length].focus();
});
document.addEventListener("keydown", (e) => { if (zoomed && e.key === "Escape") { e.preventDefault(); zoom(null); } });
stage.addEventListener("mousedown", (e) => { if (zoomed && !panel.contains(e.target)) e.preventDefault(); });   // focus stays in the panel
document.addEventListener("click", (e) => {
  if (!zoomed || panel.contains(e.target)) return;
  if (zoomedIn === "phone") { if (rowOf(zoomed).contains(e.target)) return; }   // the art toggles through its own button
  else {
    const [x0, y0, x1, y1] = ZOOM[zoomed].box, M = svg.getScreenCTM(), p = new DOMPoint(e.clientX, e.clientY).matrixTransform(M.inverse());
    if (p.x >= x0 && p.x <= x1 && p.y >= y0 && p.y <= y1) return;
  }
  zoom(null);
});

const hitsEls = [...layers.querySelectorAll(".tb-hit")];
for (const h of hitsEls) {
  const id = h.dataset.c;
  h.addEventListener("pointerenter", (e) => { if (e.pointerType === "mouse") choose(id); });
  h.addEventListener("pointerleave", (e) => { if (e.pointerType === "mouse" && document.activeElement !== h) choose(null); });
  h.addEventListener("click", (e) => { e.stopPropagation(); zoom(id); });
  h.addEventListener("focus", () => choose(id));
  h.addEventListener("blur", () => { if (!stage.contains(document.activeElement)) choose(null); });
  h.addEventListener("keydown", (e) => {
    const i = order.indexOf(id), step = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0;
    if (step) { e.preventDefault(); hitsEls.find((x) => x.dataset.c === order[(i + step + order.length) % order.length]).focus(); }
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); zoom(id); }
    if (e.key === "Escape" && !zoomed) { h.blur(); choose(null); }
  });
}
layers.addEventListener("click", () => choose(null));
for (const art of stage.querySelectorAll(".tb-art[data-pick]")) art.addEventListener("click", (e) => { e.stopPropagation(); stage.querySelector('.tb-pick[data-c="' + art.dataset.pick + '"]').click(); });
// phones: a row opens its paragraph under the component, grows its art and lights its zone on the drone
for (const b of stage.querySelectorAll(".tb-pick")) b.addEventListener("click", (e) => { e.stopPropagation(); zoom(zoomed === b.dataset.c ? null : b.dataset.c); });
// propeller idle: one turn per 8 s, each in its motor's direction (manual p. 11)
const parts = (g) => ({ fill: g.querySelector(".iso-fill"), shades: [...g.querySelectorAll(".iso-shade")], top: g.querySelector(".iso-top"), crease: g.querySelector(".iso-crease"), edge: g.querySelector(".iso-edge") });
const rotors = D.rotors.map((r) => ({ ...r,
  blades: [0, 1].map((b) => parts(svg.querySelector('[data-live="' + r.id + ':b' + b + '"] .iso-solid'))),
  cover: parts(svg.querySelector('[data-live="' + r.id + ':c"] .iso-solid')),
  pins: [...svg.querySelectorAll('[data-live="' + r.id + ':c"] [data-pin]')] }));
const turn = (r, th) => ([u, v]) => { const c = Math.cos(th * Math.PI / 180), s = Math.sin(th * Math.PI / 180); return [r.cx + u * c - v * s, r.cy + u * s + v * c]; };
function paint(el, p) {
  el.fill.setAttribute("d", p.fill);
  p.shades.forEach((d, i) => el.shades[i].setAttribute("d", d || ""));
  el.top.setAttribute("d", p.top);
  el.crease.setAttribute("d", p.crease || "");
  el.edge.setAttribute("d", p.outline);
}
function pose(t) {
  for (const r of rotors) {
    const th = r.theta0 + r.dir * 45 * t;
    r.blades.forEach((el, b) => paint(el, extrude(D.blade.map(turn(r, th + b * 180)), D.Z.hub, D.Z.blade1 - D.Z.hub, P)));
    paint(r.cover, extrude(D.cover.map(turn(r, th)), D.Z.blade1, D.Z.cap1 - D.Z.blade1, P));
    r.pins.forEach((pin, i) => { const [x, y] = iso([...turn(r, th)([i ? 22 : -22, 0]), D.Z.cap1], P); pin.setAttribute("cx", x.toFixed(2)); pin.setAttribute("cy", y.toFixed(2)); });
  }
}
const still = matchMedia("(prefers-reduced-motion: reduce)");
let visible = false, raf = 0, clock = 0, last = 0;
function frame(now) {
  raf = 0;
  if (held || !visible || document.hidden || still.matches) { last = 0; return; }
  if (last) clock += Math.min(0.1, (now - last) / 1000);
  last = now;
  pose(clock);
  raf = requestAnimationFrame(frame);
}
const wake = () => { if (!held && !raf && visible && !document.hidden && !still.matches) raf = requestAnimationFrame(frame); };
new IntersectionObserver(([e]) => { visible = e.isIntersecting; wake(); }).observe(stage);
document.addEventListener("visibilitychange", wake);
still.addEventListener("change", () => { if (still.matches) pose(0); wake(); });

// BRIEF §16: the propeller idle and the flow drift hold while the page scrolls and while a close-up zooms, then go on where
// they stopped. The CSS flows pause through their Animation objects, so holding restyles nothing.
let holdTimer = 0, paused = [];
function hold(ms) {
  clearTimeout(holdTimer); holdTimer = setTimeout(resume, ms);
  if (held) return;
  held = true;
  paused = [...root.querySelectorAll(".flow, .tb-rail, [data-flow], [data-pulse]")].flatMap((el) => el.getAnimations()).filter((a) => a instanceof CSSAnimation && a.playState === "running");
  for (const a of paused) a.pause();
}
function resume() { held = false; for (const a of paused) a.play(); paused = []; wake(); }
addEventListener("scroll", () => { if (visible) hold(200); }, { passive: true });
window.__testbed = { choose, pose, zoom, hold, get held() { return held; } };
