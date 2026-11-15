import type { Register, ThemeSetArgs } from 'claude-code'

import { makeColors } from './make-colors.js'

// ─── Palette ───────────────────────────────────────────────────────────────
// Hunter green, warm browns, moss, tan, muted amber.
const { theme, problems } = makeColors({
  label: 'Ridgeline',
  roles: { accent: '#355e3b', danger: '#a8473a', success: '#6b8f3e', warning: '#c8963e', pro: '#8b5e3c' },
  light: {
    gray: {
      anchors: {
        'surface-0': '#e6dcc6',
        'surface-1': '#ede4d1',
        'surface-2': '#f4eee0',
        'text-primary': '#22281f',
        'text-secondary': '#46473a',
        'text-muted': '#5e5a49',
      },
    },
  },
  dark: {
    gray: {
      anchors: {
        'surface-0': '#151b15',
        'surface-1': '#1b221b',
        'surface-2': '#212920',
        'surface-3': '#262e25',
        'text-primary': '#eee6d4',
        'text-secondary': '#cdc3ad',
        'text-muted': '#a99f88',
      },
    },
  },
})

// ─── Scene geometry ────────────────────────────────────────────────────────
// The viewBox is 1600 wide. Each drifting layer is drawn 3200 wide from
// curves whose period is exactly 1600, then slid left by 1600 on a loop,
// so the seam never shows.
const W = 1600
const H = 1000

// Deterministic pseudo-random so every reload draws the same landscape.
function rng(seed: number): () => number {
  let s = seed >>> 0
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0
    return s / 4294967296
  }
}

// A ridge line: a sum of sines whose frequencies are whole multiples of the
// period, so y(x) === y(x + 1600).
function ridgeY(x: number, base: number, waves: ReadonlyArray<[number, number, number]>): number {
  let y = base
  for (const [k, amp, phase] of waves) {
    y -= amp * Math.sin((2 * Math.PI * k * x) / W + phase)
  }
  return y
}

function ridgePath(base: number, waves: ReadonlyArray<[number, number, number]>, step = 16): string {
  let d = `M0 ${H}`
  for (let x = 0; x <= W * 2; x += step) {
    d += ` L${x} ${ridgeY(x, base, waves).toFixed(1)}`
  }
  return `${d} L${W * 2} ${H} Z`
}

// A row of pine silhouettes standing on a ridge, repeated at +1600.
function pines(seed: number, count: number, base: number, waves: ReadonlyArray<[number, number, number]>, minH: number, maxH: number): string {
  const r = rng(seed)
  let d = ''
  for (let i = 0; i < count; i++) {
    const x0 = r() * W
    const h = minH + r() * (maxH - minH)
    const w = h * (0.32 + r() * 0.08)
    for (const off of [0, W]) {
      const x = x0 + off
      const ground = ridgeY(x, base, waves) + 6
      const top = ground - h
      // Three stacked tiers and a trunk.
      for (let t = 0; t < 3; t++) {
        const ty = top + (h * t) / 4
        const by = top + (h * (t + 1.6)) / 4
        const hw = (w / 2) * (0.55 + t * 0.25)
        d += `M${(x - hw).toFixed(1)} ${by.toFixed(1)}L${x.toFixed(1)} ${ty.toFixed(1)}L${(x + hw).toFixed(1)} ${by.toFixed(1)}Z`
      }
      d += `M${(x - 2).toFixed(1)} ${(ground - h * 0.12).toFixed(1)}h4V${(ground + 4).toFixed(1)}h-4Z`
    }
  }
  return d
}

const FAR: ReadonlyArray<[number, number, number]> = [[1, 38, 0.4], [3, 26, 1.7], [5, 14, 2.9], [9, 6, 0.3]]
const MID: ReadonlyArray<[number, number, number]> = [[2, 44, 2.1], [3, 22, 0.2], [7, 12, 1.1], [13, 5, 2.2]]
const NEAR: ReadonlyArray<[number, number, number]> = [[1, 30, 1.2], [4, 22, 2.6], [6, 10, 0.9], [11, 5, 1.8]]
const FRONT: ReadonlyArray<[number, number, number]> = [[2, 18, 0.7], [5, 12, 2.0], [9, 6, 0.5]]

const FAR_BASE = 560
const MID_BASE = 650
const NEAR_BASE = 760
const FRONT_BASE = 880

// Fireflies: kept to the lower band and the edges, away from the words.
function fireflies(seed: number, count: number): string {
  const r = rng(seed)
  let out = ''
  for (let i = 0; i < count; i++) {
    const side = r()
    const x = side < 0.5 ? r() * W * 0.32 : W * 0.68 + r() * W * 0.32
    const y = 760 + r() * 210
    const rad = (1.6 + r() * 1.6).toFixed(1)
    const dur = (7 + r() * 6).toFixed(1)
    const delay = (-r() * 12).toFixed(1)
    const drift = (14 + r() * 24).toFixed(0)
    out += `<circle class="ff" cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="${rad}" style="animation-duration:${dur}s,${(Number(dur) * 2.3).toFixed(1)}s;animation-delay:${delay}s,${delay}s;--d:${drift}px"/>`
  }
  return out
}

// A soft cloud: three overlapping radial-gradient ellipses, no blur filter
// (cheaper to animate).
function cloud(x: number, y: number, s: number): string {
  return (
    `<g transform="translate(${x} ${y}) scale(${s})">` +
    `<ellipse cx="0" cy="0" rx="190" ry="34" fill="url(#cloud)"/>` +
    `<ellipse cx="-70" cy="-14" rx="110" ry="30" fill="url(#cloud)"/>` +
    `<ellipse cx="80" cy="-10" rx="130" ry="28" fill="url(#cloud)"/>` +
    `</g>`
  )
}

const SCENE = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice">
<style>
:root{
  --sky-top:#c9b48c;--sky-mid:#dcc59a;--sky-low:#e7cf9c;--glow:#e3ad5c;
  --far:#9aa27a;--mid:#6f8456;--near:#45603f;--front:#2f4430;--pine:#263a28;
  --fog:#efe3c6;--cloud:#f3e8cf;--ff:#d9a54a;--ffo:0.35;
}
@media (prefers-color-scheme: dark){
  :root{
    --sky-top:#0f1611;--sky-mid:#1c2619;--sky-low:#3a3621;--glow:#a8742e;
    --far:#3c4a32;--mid:#2c3b28;--near:#1f2d1e;--front:#151f15;--pine:#0f170f;
    --fog:#8c8266;--cloud:#6e6650;--ff:#e8b45a;--ffo:0.9;
  }
}
.st-top{stop-color:var(--sky-top)}.st-mid{stop-color:var(--sky-mid)}.st-low{stop-color:var(--sky-low)}
.st-glow{stop-color:var(--glow)}.st-cloud{stop-color:var(--cloud)}.st-fog{stop-color:var(--fog)}
.far{fill:var(--far)}.mid{fill:var(--mid)}.near{fill:var(--near)}.front{fill:var(--front)}.pine{fill:var(--pine)}
.drift{animation:slide linear infinite;will-change:transform}
.d-far{animation-duration:420s}
.d-mid{animation-duration:280s}
.d-near{animation-duration:190s}
.d-front{animation-duration:130s}
.d-cloud{animation-duration:360s}
@keyframes slide{from{transform:translateX(0)}to{transform:translateX(-${W}px)}}
.fog{animation:sway ease-in-out infinite alternate}
.fog1{animation-duration:70s}.fog2{animation-duration:95s;animation-delay:-30s}
@keyframes sway{from{transform:translateX(-60px);opacity:.55}to{transform:translateX(60px);opacity:.9}}
.glow{animation:breathe 40s ease-in-out infinite alternate}
@keyframes breathe{from{opacity:.75}to{opacity:1}}
.ff{fill:var(--ff);opacity:0;animation-name:blink,wander;animation-timing-function:ease-in-out;animation-iteration-count:infinite}
@keyframes blink{0%,100%{opacity:0}45%,55%{opacity:var(--ffo)}}
@keyframes wander{0%{transform:translate(0,0)}50%{transform:translate(var(--d),calc(var(--d) * -0.6))}100%{transform:translate(0,0)}}
/* Reduced motion: everything holds still, fireflies rest as a dim glow. */
@media (prefers-reduced-motion: reduce){
  *{animation:none !important}
  .ff{opacity:calc(var(--ffo) * 0.6)}
  .fog{opacity:.75}
}
</style>
<defs>
<linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
  <stop offset="0" class="st-top"/><stop offset=".45" class="st-mid"/><stop offset=".7" class="st-low"/>
</linearGradient>
<radialGradient id="sun" cx=".72" cy=".56" r=".42">
  <stop offset="0" class="st-glow" stop-opacity=".75"/><stop offset="1" class="st-glow" stop-opacity="0"/>
</radialGradient>
<radialGradient id="cloud"><stop offset="0" class="st-cloud" stop-opacity=".55"/><stop offset="1" class="st-cloud" stop-opacity="0"/></radialGradient>
<linearGradient id="fogv" x1="0" y1="0" x2="0" y2="1">
  <stop offset="0" class="st-fog" stop-opacity="0"/><stop offset=".5" class="st-fog" stop-opacity=".45"/><stop offset="1" class="st-fog" stop-opacity="0"/>
</linearGradient>
</defs>
<rect width="${W}" height="${H}" fill="url(#sky)"/>
<rect class="glow" width="${W}" height="${H}" fill="url(#sun)"/>
<g class="drift d-cloud">${cloud(260, 170, 1)}${cloud(980, 110, 0.8)}${cloud(1360, 230, 0.65)}${cloud(260 + W, 170, 1)}${cloud(980 + W, 110, 0.8)}${cloud(1360 + W, 230, 0.65)}</g>
<g class="drift d-far"><path class="far" d="${ridgePath(FAR_BASE, FAR, 20)}"/></g>
<rect class="fog fog1" x="-100" y="540" width="${W + 200}" height="120" fill="url(#fogv)"/>
<g class="drift d-mid"><path class="mid" d="${ridgePath(MID_BASE, MID, 16)}"/><path class="pine" opacity=".35" d="${pines(7, 26, MID_BASE, MID, 14, 26)}"/></g>
<rect class="fog fog2" x="-100" y="660" width="${W + 200}" height="140" fill="url(#fogv)"/>
<g class="drift d-near"><path class="near" d="${ridgePath(NEAR_BASE, NEAR, 14)}"/><path class="pine" opacity=".7" d="${pines(19, 22, NEAR_BASE, NEAR, 30, 54)}"/></g>
<g class="drift d-front"><path class="front" d="${ridgePath(FRONT_BASE, FRONT, 12)}"/><path class="pine" d="${pines(42, 14, FRONT_BASE, FRONT, 70, 130)}"/></g>
${fireflies(5, 16)}
</svg>`

const LOOK: ThemeSetArgs = {
  colors: theme,
  // Frosted panels over the scene keep chat text readable; the tint follows
  // the app's own panel color in each mode.
  backdrop: { scene: 'ridgeline', glass: { blur: 0, opacity: 0 } },
}

export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    const unpainted = problems.find(line => line.startsWith("Desktop won't paint"))
    if (unpainted !== undefined) {
      $.ui.toast(unpainted)
    }
    const set = await $.theme.set(LOOK)
    if (!set.isDrawn) {
      $.ui.status(set.reason)
    }
    return next(e)
  })

  on('ui.render', { component: 'Backdrop' }, ($, e, next) => {
    if ((e.surface !== 'desktop' && e.surface !== 'mobile') || e.props.scene !== 'ridgeline') {
      return next(e)
    }
    const { Svg } = $.ui.resolve(e)
    return <Svg source={SCENE} alt="Layered mountain ridges and pine forest at golden hour, with drifting fog and fireflies" isInteractive />
  })
}
