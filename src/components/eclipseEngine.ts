/**
 * Eclipse Arc Glow & Particle Engine
 * Big outer arc shifted further upside to sit higher in the hero section.
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
  colorType: number;
}

function vt(seed: number): Particle[] {
  const o = wt(seed);
  const i: Particle[] = [];

  // Tiny sharp blue-white stars (1-2px, few with soft glow, fewer and smaller)
  for (let b = 0; b < 65; b++) {
    const isGlow = o() > 0.85;
    i.push({
      x: -20 + o() * 664,
      y: -20 + o() * 380,
      r: isGlow ? 1.2 + o() * 0.8 : 0.5 + o() * 0.6,
      a: isGlow ? 0.45 + o() * 0.45 : 0.20 + o() * 0.50,
      vy: -(0.5 + o() * 1.5),
      vx: (o() - 0.5) * 0.8,
      appear: o() * 2.0,
      tw: 0.6 + o() * 1.8,
      ph: o() * 6.28,
      bokeh: false,
      colorType: o() > 0.35 ? 0 : 1, // mostly white and soft blue
    });
  }

  return i;
}

function createParticleSprite(type: "white" | "blue" | "violet"): HTMLCanvasElement | null {
  if (typeof document === "undefined") return null;
  const n = document.createElement("canvas");
  n.width = n.height = 64;
  const o = n.getContext("2d");
  if (!o) return null;
  const i = o.createRadialGradient(32, 32, 0, 32, 32, 32);

  if (type === "white") {
    i.addColorStop(0, "rgba(255, 255, 255, 1)");
    i.addColorStop(0.25, "rgba(255, 255, 255, 0.65)");
    i.addColorStop(0.65, "rgba(210, 230, 255, 0.25)");
    i.addColorStop(1, "rgba(255, 255, 255, 0)");
  } else if (type === "blue") {
    i.addColorStop(0, "rgba(220, 240, 255, 1)");
    i.addColorStop(0.25, "rgba(140, 195, 255, 0.85)");
    i.addColorStop(0.65, "rgba(80, 140, 255, 0.35)");
    i.addColorStop(1, "rgba(40, 90, 255, 0)");
  } else {
    i.addColorStop(0, "rgba(240, 230, 255, 1)");
    i.addColorStop(0.25, "rgba(180, 160, 255, 0.8)");
    i.addColorStop(0.65, "rgba(120, 100, 255, 0.3)");
    i.addColorStop(1, "rgba(70, 50, 230, 0)");
  }

  o.fillStyle = i;
  o.fillRect(0, 0, 64, 64);
  return n;
}

/**
 * Big outer arc geometry: Shifted upside (bottom rests at Y = 205)
 */
function At(n: number) {
  const o = n < 0.46 ? 360 : 285 + 75 * Math.exp(-(n - 0.46) / 0.85);
  const i = 205 + 14 * Math.exp(-n / 1);
  return { R: o, bottom: i, cy: i - o };
}

/**
 * Inner Glass Arc / Donut geometry: Shifted upside to cy = 195
 */
function Tt(n: number) {
  const o = 95 + 23 * u(1.3, 2.7, n);
  return { cx: 312, cy: 195, rx: o, ry: o, rot: 0 };
}

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
  const ltWhite = createParticleSprite("white");
  const ltBlue = createParticleSprite("blue");
  const ltViolet = createParticleSprite("violet");

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
        l.push([Math.cos(g), Math.sin(g), (w + h) * O]);
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
    const y = 6 + w * 0.5;
    const f = t.createRadialGradient(d, M, 0, d, M, y * 2);
    f.addColorStop(0, `rgba(255,255,255,${0.85 * S})`);
    f.addColorStop(0.3, `rgba(${x[0]},${x[1]},${x[2]},${0.45 * S})`);
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
    const outerR = a.rx;
    const innerR = a.rx - 26;
    const middleR = a.rx - 13;

    t.save();
    t.beginPath();
    t.arc(a.cx, a.cy, outerR, Math.PI, 0, false);
    t.lineTo(a.cx + innerR, a.cy);
    t.arc(a.cx, a.cy, innerR, 0, Math.PI, true);
    t.closePath();

    const v = t.createRadialGradient(
      a.cx,
      a.cy,
      innerR * 0.88,
      a.cx,
      a.cy,
      outerR * 1.05
    );
    v.addColorStop(0, "rgba(10, 20, 100, 0.0)");
    v.addColorStop(0.5, `rgba(30, 70, 240, ${0.18 * c})`);
    v.addColorStop(0.85, `rgba(50, 110, 255, ${0.28 * c})`);
    v.addColorStop(1, `rgba(80, 150, 255, ${0.12 * c})`);
    t.fillStyle = v;
    t.fill();

    t.beginPath();
    t.arc(a.cx, a.cy, outerR, Math.PI, 0, false);
    t.strokeStyle = `rgba(110, 175, 255, ${0.85 * c})`;
    t.lineWidth = 2.4;
    t.stroke();

    t.beginPath();
    t.arc(a.cx, a.cy, middleR, Math.PI, 0, false);
    t.strokeStyle = `rgba(80, 140, 255, ${0.35 * c})`;
    t.lineWidth = 1.4;
    t.stroke();

    t.beginPath();
    t.arc(a.cx, a.cy, innerR, Math.PI, 0, false);
    t.strokeStyle = `rgba(70, 120, 255, ${0.55 * c})`;
    t.lineWidth = 1.6;
    t.stroke();

    for (const h of [-1, 1]) {
      const ex = a.cx + h * innerR;
      const ey = a.cy;
      const eg = t.createRadialGradient(ex, ey, 0, ex, ey, 18);
      eg.addColorStop(0, `rgba(255, 170, 235, ${0.9 * c})`);
      eg.addColorStop(0.35, `rgba(210, 130, 255, ${0.55 * c})`);
      eg.addColorStop(0.7, `rgba(120, 100, 255, ${0.25 * c})`);
      eg.addColorStop(1, "rgba(30, 60, 255, 0)");
      t.fillStyle = eg;
      t.beginPath();
      t.arc(ex, ey, 18, 0, k);
      t.fill();
    }
    t.restore();

    const angleProgress = (Math.sin((e - 1.5) * 1.8) + 1) / 2;
    const domeAngle = -Math.PI + 0.15 + angleProgress * (Math.PI - 0.3);

    nt(a, domeAngle, P(18), P(42), 9.5, c * 0.95, u(1.4, 3.8, e));

    const secondAngle = -Math.PI + 0.3 + ((angleProgress + 0.4) % 1) * (Math.PI - 0.6);
    nt(a, secondAngle, P(12), P(24), 6, c * 0.45, 0);
  }

  function W(e: number) {
    if (!t) return;
    et = e;
    t.setTransform(1, 0, 0, 1, 0, 0);
    t.globalCompositeOperation = "source-over";
    t.globalAlpha = 1;
    t.clearRect(0, 0, N, z);
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

    {
      const r = t.createRadialGradient(312, p - 50, 15, 312, p, c * 1.1);
      r.addColorStop(0, `rgba(18, 48, 220, ${0.48 * v})`);
      r.addColorStop(0.35, `rgba(14, 32, 170, ${0.32 * v})`);
      r.addColorStop(0.7, `rgba(8, 18, 100, ${0.14 * v})`);
      r.addColorStop(1, "rgba(2, 4, 30, 0)");
      t.fillStyle = r;
      t.fillRect(T, R, x, $);
    }

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

    const wrapH = Math.max(380, Math.ceil($ + 50));
    for (const r of it) {
      const d = e - r.appear;
      if (d < 0) continue;
      const M = u(0, 0.8, d) * (r.bokeh ? u(0, 1.2, d) : 1);
      const y = 0.65 + 0.35 * Math.sin(e * r.tw + r.ph);

      const f = r.x + r.vx * e + Math.sin(e * 0.7 + r.ph) * 3;
      let h = (r.y + r.vy * e) % wrapH;
      if (h < 0) h += wrapH;

      t.globalAlpha = L(r.a * M * y * (r.bokeh ? 1 : 0.95));
      const l = r.r;
      const sprite =
        r.colorType === 2
          ? ltViolet
          : r.colorType === 1
          ? ltBlue
          : ltWhite;

      if (sprite) {
        t.drawImage(sprite, f - l * 2, h - l * 2, l * 4, l * 4);
      }
    }
    t.globalAlpha = 1;

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

      const I = t.createLinearGradient(16, 0, 608, 0);
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

    {
      const r = -p;
      if (c > r && r > 0) {
        const d = Math.atan2(Math.sqrt(Math.max(0, c * c - r * r)), r);
        const M = P(L(6 + 150 * (e - 0.04), 1, 112));
        const y = u(d - 0.12, d + 0.25, M) * (0.5 + 0.5 * u(0.4, 1.4, e));
        if (y > 0.001) {
          const f = Math.sqrt(Math.max(0, c * c - r * r));
          for (const h of [-1, 1]) {
            const l = 312 + h * f;
            const s = 4;
            const m = t.createRadialGradient(l, s, 0, l, s, 100);
            m.addColorStop(0, `rgba(255,250,255,${0.85 * y})`);
            m.addColorStop(0.18, `rgba(190,180,255,${0.55 * y})`);
            m.addColorStop(0.5, `rgba(70,70,255,${0.28 * y})`);
            m.addColorStop(1, "rgba(30,30,255,0)");
            t.fillStyle = m;
            t.fillRect(l - 105, s - 105, 210, 210);
          }
        }
      }
    }

    // Legacy 2D canvas donut disabled - replaced by 3D Three.js wheel
    // t.save();
    // t.beginPath();
    // t.arc(312, p, c, 0, Math.PI * 2);
    // t.clip();
    // bt(e);
    // t.restore();

    canvas.style.opacity = "1";
    t.globalCompositeOperation = "source-over";
  }

  function Y(e: number) {
    if (!H) return;
    const c = ((e - _) / 1e3) * speed;

    if (c >= 3.5) {
      W(c);
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
        W(4.3);
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
