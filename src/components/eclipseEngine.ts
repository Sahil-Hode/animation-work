/**
 * Eclipse Arc Glow & Particle Engine
 * High-performance Canvas 2D engine with lift-off/exit logic removed so the arc stays in its settled resting position.
 */

const L = (n: number, o = 0, i = 1) => Math.min(i, Math.max(o, n));
const D = (n: number, o: number, i: number) => n + (o - n) * i;
const u = (n: number, o: number, i: number) => {
  const b = L((i - n) / (o - n));
  return b * b * (3 - 2 * b);
};
const P = (n: number) => (n * Math.PI) / 180;
const k = Math.PI * 2;

function $t(n: number, o: number[], i: number[]) {
  if (n <= o[0]) return i[0];
  for (let b = 1; b < o.length; b++) {
    if (n <= o[b]) return D(i[b - 1], i[b], (n - o[b - 1]) / (o[b] - o[b - 1]));
  }
  return i[i.length - 1];
}

function wt(seed: number) {
  let n = seed;
  return () => {
    n |= 0;
    n = (n + 1831565813) | 0;
    let o = Math.imul(n ^ (n >>> 15), 1 | n);
    o = (o + Math.imul(o ^ (o >>> 7), 61 | o)) ^ o;
    return ((o ^ (o >>> 14)) >>> 0) / 4294967296;
  };
}

interface Particle {
  x: number;
  y: number;
  r: number;
  a: number;
  vy: number;
  vx: number;
  appear: number;
  tw: number;
  ph: number;
  bokeh: boolean;
}

function vt(seed: number): Particle[] {
  const o = wt(seed);
  const i: Particle[] = [];
  for (let b = 0; b < 120; b++) {
    i.push({
      x: o() * 624,
      y: o() * 352,
      r: 0.5 + o() * o() * 2.2,
      a: 0.25 + o() * 0.6,
      vy: -(2 + o() * 6),
      vx: (o() - 0.5) * 3,
      appear: o() * 3.2,
      tw: 0.6 + o() * 2,
      ph: o() * 6.28,
      bokeh: false,
    });
  }
  for (let b = 0; b < 26; b++) {
    i.push({
      x: o() * 624,
      y: 90 + o() * 262,
      r: 4 + o() * 9,
      a: 0.05 + o() * 0.12,
      vy: -(3 + o() * 5),
      vx: (o() - 0.5) * 4,
      appear: 1.8 + o() * 2.6,
      tw: 0.3 + o(),
      ph: o() * 6.28,
      bokeh: true,
    });
  }
  return i;
}

function Pt(): HTMLCanvasElement | null {
  if (typeof document === "undefined") return null;
  const n = document.createElement("canvas");
  n.width = n.height = 64;
  const o = n.getContext("2d");
  if (!o) return null;
  const i = o.createRadialGradient(32, 32, 0, 32, 32, 32);
  i.addColorStop(0, "rgba(255,255,255,1)");
  i.addColorStop(0.25, "rgba(255,255,255,0.55)");
  i.addColorStop(1, "rgba(255,255,255,0)");
  o.fillStyle = i;
  o.fillRect(0, 0, 64, 64);
  return n;
}

/**
 * Calculates the Arc Radius and Center position over time.
 * The upward lift-off / shoot-up subtraction logic has been completely removed
 * so the arc settles and stays in its resting position.
 */
function At(n: number) {
  const o = n < 0.46 ? 336 : 246 + 90 * Math.exp(-(n - 0.46) / 0.85);
  const i = 203 + 14 * Math.exp(-n / 1);
  return { R: o, bottom: i, cy: i - o };
}

function Tt(n: number) {
  const o = 78 + 23 * u(1.3, 2.7, n);
  return { cx: 314, cy: 289 - o, rx: o, ry: o * 0.97, rot: 0 };
}

const ut = (e: number, c: number) => {
  let a = (e - c) % k;
  if (a > Math.PI) a -= k;
  if (a < -Math.PI) a += k;
  return Math.abs(a);
};

export interface EclipseIntroOptions {
  onComplete?: () => void;
  seed?: number;
  speed?: number;
  maxPixels?: number;
}

export function createEclipseIntro(canvas: HTMLCanvasElement, options: EclipseIntroOptions = {}) {
  const {
    onComplete,
    seed = 7,
    speed = 1,
    maxPixels = 23e5,
  } = options;

  const t = canvas.getContext("2d");
  if (!t) return null;

  const it = vt(seed);
  const lt = Pt();
  const st =
    typeof matchMedia === "function" &&
    matchMedia("(prefers-reduced-motion: reduce)").matches;

  let E = 1,
    A = 1,
    U = 0,
    J = 0,
    N = 0,
    z = 0,
    F = 0,
    H = false,
    _ = 0,
    Q = 0,
    j = false,
    et = 0;

  function V() {
    const e = canvas.getBoundingClientRect();
    E = Math.min(window.devicePixelRatio || 1, 2);
    E = Math.min(E, Math.sqrt(maxPixels / Math.max(1, e.width * e.height)));
    N = Math.max(1, Math.round(e.width * E));
    z = Math.max(1, Math.round(e.height * E));
    canvas.width = N;
    canvas.height = z;
    A = (e.width < e.height ? (e.width / 624) * 1.35 : Math.max(e.width / 624, e.height / 352)) * E;
    U = (N - 624 * A) / 2;
    J = (z - 352 * A) / 2;
  }

  function ot(
    e: number,
    c: number,
    a: number,
    p: number,
    w: number,
    S: number,
    v = 0,
    T = 1
  ) {
    if (!t) return;
    const x: [number, number][] = [];
    const $: [number, number][] = [];
    for (let r = 0; r <= 90; r++) {
      const d = (r / 90) * 2 - 1;
      const M = d * p;
      const y = 1 - Math.pow(Math.abs(d), 5);
      const f = 1 - Math.cos(M);
      const h = (w + S * f) * y;
      const l = v * (0.3 + 0.7 * Math.min(1, f / 0.6)) * y;
      const s = Math.sin(M);
      const m = Math.cos(M);
      x.push([e + (a + l) * s, c + (a + l) * m]);
      $.push([e + (a - h - l * T) * s, c + (a - h - l * T) * m]);
    }
    t.beginPath();
    t.moveTo(x[0][0], x[0][1]);
    for (const r of x) t.lineTo(r[0], r[1]);
    for (let r = $.length - 1; r >= 0; r--) t.lineTo($[r][0], $[r][1]);
    t.closePath();
  }

  function nt(
    e: { cx: number; cy: number; rx: number; ry: number },
    c: number,
    a: number,
    p: number,
    w: number,
    S: number,
    v: number
  ) {
    if (!t || S <= 0.002) return;
    const T = [255, 228, 180];
    const R = [215, 232, 255];
    const x = T.map((h, l) => Math.round(D(h, R[l], v)));
    const $ = 110;
    const r = (h: number) => {
      const l: [number, number, number][] = [];
      for (let s = 0; s <= $; s++) {
        const m = s / $;
        const g = c - a + m * (a + p);
        const G = g - c;
        const I = G < 0 ? a : p;
        const X = Math.min(1, Math.abs(G) / I);
        const O = Math.pow(Math.cos((Math.PI / 2) * X), G < 0 ? 1.4 : 1.8);
        l.push([Math.cos(g),Math.sin(g), (w + h) * O]);
      }
      t.beginPath();
      l.forEach((s, m) => {
        const g = e.rx + 0.4 * s[2];
        if (m) t.lineTo(e.cx + g * s[0], e.cy + g * s[1]);
        else t.moveTo(e.cx + g * s[0], e.cy + g * s[1]);
      });
      for (let s = l.length - 1; s >= 0; s--) {
        const m = l[s];
        const g = e.rx - 0.6 * m[2];
        t.lineTo(e.cx + g * m[0], e.cy + g * m[1]);
      }
      t.closePath();
    };

    for (let h = 5; h >= 1; h--) {
      r(h * 3.2);
      t.fillStyle = `rgba(90,120,255,${0.07 * S})`;
      t.fill();
    }
    r(2.5);
    t.fillStyle = `rgba(${x[0]},${x[1]},${x[2]},${0.6 * S})`;
    t.fill();
    r(0);
    t.fillStyle = `rgba(255,255,255,${S})`;
    t.fill();

    const d = e.cx + e.rx * Math.cos(c);
    const M = e.cy + e.rx * Math.sin(c);
    const y = 5 + w * 0.6;
    const f = t.createRadialGradient(d, M, 0, d, M, y * 2);
    f.addColorStop(0, `rgba(255,255,255,${0.8 * S})`);
    f.addColorStop(0.3, `rgba(${x[0]},${x[1]},${x[2]},${0.4 * S})`);
    f.addColorStop(1, "rgba(80,110,255,0)");
    t.fillStyle = f;
    t.beginPath();
    t.arc(d, M, y * 2, 0, k);
    t.fill();
  }

  function bt(e: number) {
    if (!t) return;
    const c = u(1.15, 1.9, e);
    if (c <= 0.001) return;
    const a = Tt(e);
    const p = 1;
    const w = P(35 + 150 * u(1.25, 2.7, e));
    const S = P(120);

    const v = t.createRadialGradient(
      a.cx,
      a.cy + a.rx * 0.35,
      a.rx * 0.2,
      a.cx,
      a.cy,
      a.rx * 1.05
    );
    v.addColorStop(0, "rgba(30,60,255,0)");
    v.addColorStop(0.7, `rgba(40,80,255,${0.1 * c * p * u(1.8, 2.8, e)})`);
    v.addColorStop(1, `rgba(60,120,255,${0.24 * c * p * u(1.6, 2.6, e)})`);
    t.fillStyle = v;
    t.beginPath();
    t.ellipse(a.cx, a.cy, a.rx, a.ry, 0, 0, k);
    t.fill();

    t.lineWidth = 1;
    const T = u(2, 3.2, e);
    t.strokeStyle = `rgba(110,110,255,${0.26 * c * p * T})`;
    t.beginPath();
    t.arc(a.cx, a.cy - 18, 72, 0, k);
    t.stroke();
    t.strokeStyle = `rgba(140,110,255,${0.16 * c * p * T})`;
    t.beginPath();
    t.arc(a.cx + 2, a.cy - 32, 58, 0, k);
    t.stroke();

    const R = 48;
    const x = t.createConicGradient;
    const $ = (f: number) => {
      const h = u(w, w - P(50), ut(f, S));
      const l = 0.12 + 0.88 * u(-0.3, 0.9, Math.sin(f));
      return c * h * l * p;
    };
    const r = (f: string, h: number, l: number) => {
      let s: CanvasGradient | string;
      if (x) {
        const m = x.call(t, 0, a.cx, a.cy);
        for (let g = 0; g <= R; g++) {
          m.addColorStop(g / R, `rgba(${f},${$((g / R) * k) * l})`);
        }
        s = m;
      } else {
        s = `rgba(${f},${c * 0.6 * l})`;
      }
      t.lineWidth = h;
      t.strokeStyle = s;
      t.beginPath();
      t.arc(a.cx, a.cy, a.rx, 0, k);
      t.stroke();
    };

    r("40,90,255", 16, 0.1);
    r("50,100,255", 8, 0.18);
    r("70,140,255", 3.2, 0.32);
    r("120,200,255", 1.5, 1);

    const d = P(-100 + 220 * Math.exp(-(e - 1.9) / 1.4));
    const M = u(1.3, 1.9, e);
    nt(a, d, P(20), P(58), 8.5, M * c, u(1.4, 3.8, e));
    const y = 0.75 * u(1.3, 1.8, e) * c;
    nt(a, P(198), P(14), P(20), 4.5, y, 0);
  }

  function W(e: number) {
    if (!t) return;
    et = e;
    t.setTransform(1, 0, 0, 1, 0, 0);
    t.globalCompositeOperation = "source-over";
    t.globalAlpha = 1;
    t.fillStyle = "#010113";
    t.fillRect(0, 0, N, z);
    t.setTransform(A, 0, 0, A, U, J);

    const { R: c, cy: p } = At(e);
    const S =
      $t(
        e,
        [0.5, 1, 1.25, 2, 2.5, 3.5, 4, 4.25, 4.5],
        [0, 5, 14, 20, 30, 39, 56, 71, 112]
      ) / 236;
    const v = u(0.3, 1.6, e);
    const T = -U / A;
    const R = -J / A;
    const x = N / A;
    const $ = z / A;

    t.globalCompositeOperation = "lighter";

    // Ambient radial glow
    {
      const r = t.createRadialGradient(312, p, c, 312, p, c * 1.95);
      r.addColorStop(0, `rgba(10,20,255,${0.24 * v})`);
      r.addColorStop(0.35, `rgba(10,20,255,${0.09 * v})`);
      r.addColorStop(1, "rgba(10,20,255,0)");
      t.fillStyle = r;
      t.fillRect(T, R, x, $);
    }

    // Concentric blue halo
    {
      const r = Math.min(1.2, S * 3.4);
      const d = t.createRadialGradient(312, p, 0, 312, p, c);
      d.addColorStop(0, "rgba(20,30,255,0)");
      d.addColorStop(0.5, `rgba(20,30,255,${0.06 * r})`);
      d.addColorStop(0.8, `rgba(30,40,255,${0.26 * r})`);
      d.addColorStop(1, `rgba(70,70,255,${0.9 * r})`);
      t.fillStyle = d;
      t.beginPath();
      t.arc(312, p, c, 0, Math.PI * 2);
      t.fill();
    }

    // Floating Bokeh and Stardust Particles
    if (lt) {
      for (const r of it) {
        const d = e - r.appear;
        if (d < 0) continue;
        const M = u(0, 0.8, d) * (r.bokeh ? u(0, 1.2, d) : 1);
        const y = 0.65 + 0.35 * Math.sin(e * r.tw + r.ph);
        const f = r.x + r.vx * e;
        let h = (r.y + r.vy * e) % 352;
        if (h < 0) h += 352;
        t.globalAlpha = L(r.a * M * y * (r.bokeh ? 1 : 0.9));
        const l = r.r;
        t.drawImage(lt, f - l * 2, h - l * 2, l * 4, l * 4);
      }
    }
    t.globalAlpha = 1;

    // THE 18-LAYER VOLUMETRIC ARC GLOW
    {
      const r = u(0, 0.08, e);
      const d = 0.5 + 0.45 * u(0, 0.7, e);
      const M = P(L(6 + 150 * (e - 0.04), 1, 112));
      const y = 11;
      const f = 2.2;
      const h = 18;
      const l = 4.6;
      const s = 13;
      const m = 0.62;

      for (let X = h - 1; X >= 0; X--) {
        const O = 2 + X * l;
        const Z = m * (Math.exp(-O / s) - Math.exp(-(O + l) / s));
        const B = u(0, 0.75, X / (h - 1));
        const mt = `${Math.round(D(175, 45, B))},${Math.round(D(168, 35, B))},255`;
        ot(312, p, c, M, f, y, O, 0.45);
        t.fillStyle = `rgba(${mt},${Z * r * d * 1.6})`;
        t.fill();
      }

      const g = u(0.05, 0.9, e);
      const G = (X: number[], O: number[]) =>
        `rgb(${X.map((Z, B) => Math.round(D(Z, O[B], g))).join(",")})`;

      const I = t.createLinearGradient(32, 0, 592, 0);
      I.addColorStop(0, G([170, 150, 255], [255, 252, 255]));
      I.addColorStop(0.3, G([120, 100, 255], [195, 190, 255]));
      I.addColorStop(0.5, G([100, 80, 250], [150, 146, 240]));
      I.addColorStop(0.7, G([120, 100, 255], [195, 190, 255]));
      I.addColorStop(1, G([170, 150, 255], [255, 252, 255]));

      ot(312, p, c, M, f, y, 0);
      t.globalAlpha = r * d;
      t.fillStyle = I;
      t.fill();
      t.globalAlpha = 1;
    }

    // Side flares at arc intersection
    {
      const r = -p;
      const d = Math.atan2(Math.sqrt(Math.max(0, c * c - r * r)), r);
      const M = P(L(6 + 150 * (e - 0.04), 1, 112));
      const y = u(d - 0.12, d + 0.25, M) * (0.5 + 0.5 * u(0.4, 1.4, e));
      if (y > 0.001) {
        const f = Math.sqrt(Math.max(0, c * c - r * r));
        for (const h of [-1, 1]) {
          const l = 312 + h * f;
          const s = 4;
          const m = t.createRadialGradient(l, s, 0, l, s, 95);
          m.addColorStop(0, `rgba(255,250,255,${0.85 * y})`);
          m.addColorStop(0.18, `rgba(190,180,255,${0.55 * y})`);
          m.addColorStop(0.5, `rgba(70,70,255,${0.28 * y})`);
          m.addColorStop(1, "rgba(30,30,255,0)");
          t.fillStyle = m;
          t.fillRect(l - 100, s - 100, 200, 200);
        }
      }
    }

    // Inner Donut / Arc
    bt(e);

    canvas.style.opacity = "1";
    t.globalCompositeOperation = "source-over";
  }

  function Y(e: number) {
    if (!H) return;
    const c = ((e - _) / 1e3) * speed;
    
    // Once the arc reaches full reveal (c >= 3.5), it stays permanently in settled position
    // while allowing particle drift and shimmer to continue forever
    if (c >= 3.5) {
      const settledTime = 3.5 + (c - 3.5) * 0.1;
      W(settledTime);
      if (!j) {
        j = true;
        onComplete?.();
      }
      F = requestAnimationFrame(Y);
      return;
    }

    W(c);
    F = requestAnimationFrame(Y);
  }

  function dt() {
    if (!H) {
      if (st) {
        W(3.5);
        onComplete?.();
        return;
      }
      H = true;
      _ = performance.now() - (j ? 0 : Q * 1e3) / speed;
      j = false;
      F = requestAnimationFrame(Y);
    }
  }

  function rt() {
    if (H) {
      H = false;
      cancelAnimationFrame(F);
      Q = ((performance.now() - _) / 1e3) * speed;
    }
  }

  function ht(e: number) {
    rt();
    j = false;
    Q = e;
    W(e);
  }

  const q =
    typeof ResizeObserver !== "undefined"
      ? new ResizeObserver(() => {
          V();
          W(et);
        })
      : null;

  q?.observe(canvas);
  V();
  W(0);

  return {
    play: dt,
    pause: rt,
    seek: ht,
    resize: V,
    destroy() {
      H = false;
      cancelAnimationFrame(F);
      q?.disconnect();
    },
  };
}
