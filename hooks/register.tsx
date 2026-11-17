import type { Register, ThemeSetArgs } from 'claude-code'

import { makeColors } from './make-colors.js'

const { theme, problems } = makeColors({
  label: 'Valley fireflies',
  only: 'dark',
  roles: { accent: '#4f8a5b', danger: '#c1503c', success: '#7a9a47', warning: '#c8903a', pro: '#a57c5a' },
  dark: {
    gray: {
      anchors: {
        'surface-0': '#14190f',
        'surface-1': '#1b2214',
        'surface-2': '#232b1a',
        'surface-3': '#2a3320',
        'text-primary': '#efe6d0',
        'text-secondary': '#cfc4a8',
        'text-muted': '#a99f84',
      },
    },
  },
})

const SCENE = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice">
<style>
.f{fill:#f2d46b;opacity:0;filter:url(#glow);animation-name:drift;animation-iteration-count:infinite;animation-timing-function:ease-in-out}
@keyframes drift{0%{opacity:0;transform:translate(0,0)}15%{opacity:.95}45%{opacity:.25}70%{opacity:1}100%{opacity:0;transform:translate(var(--dx),var(--dy))}}
.moon{animation:breathe 9s ease-in-out infinite}
@keyframes breathe{0%,100%{opacity:.85}50%{opacity:1}}
.f0{animation-duration:7.5s;animation-delay:-5.4s;--dx:23px;--dy:-67px}.f1{animation-duration:8.5s;animation-delay:-0.9s;--dx:56px;--dy:-38px}.f2{animation-duration:10.0s;animation-delay:-8.3s;--dx:-49px;--dy:-35px}.f3{animation-duration:13.6s;animation-delay:-5.8s;--dx:20px;--dy:-33px}.f4{animation-duration:13.0s;animation-delay:-2.9s;--dx:-55px;--dy:-35px}.f5{animation-duration:10.9s;animation-delay:-6.8s;--dx:13px;--dy:-51px}.f6{animation-duration:9.6s;animation-delay:-5.5s;--dx:21px;--dy:-58px}.f7{animation-duration:10.5s;animation-delay:-5.3s;--dx:19px;--dy:-57px}.f8{animation-duration:9.5s;animation-delay:-2.5s;--dx:58px;--dy:-41px}.f9{animation-duration:9.1s;animation-delay:-5.0s;--dx:-50px;--dy:-34px}.f10{animation-duration:13.9s;animation-delay:-1.2s;--dx:-24px;--dy:-32px}.f11{animation-duration:10.0s;animation-delay:-9.6s;--dx:-41px;--dy:-39px}.f12{animation-duration:13.1s;animation-delay:-3.1s;--dx:13px;--dy:-20px}.f13{animation-duration:12.6s;animation-delay:-0.7s;--dx:3px;--dy:-33px}.f14{animation-duration:7.5s;animation-delay:-7.3s;--dx:29px;--dy:-28px}.f15{animation-duration:10.1s;animation-delay:-7.2s;--dx:27px;--dy:-18px}.f16{animation-duration:9.5s;animation-delay:-6.1s;--dx:60px;--dy:-41px}.f17{animation-duration:7.9s;animation-delay:-2.5s;--dx:38px;--dy:-52px}.f18{animation-duration:9.8s;animation-delay:-2.8s;--dx:-39px;--dy:-42px}.f19{animation-duration:8.9s;animation-delay:-4.2s;--dx:50px;--dy:-35px}.f20{animation-duration:7.6s;animation-delay:-1.5s;--dx:-31px;--dy:-61px}.f21{animation-duration:11.1s;animation-delay:-2.6s;--dx:2px;--dy:-17px}.f22{animation-duration:11.3s;animation-delay:-3.2s;--dx:8px;--dy:-47px}.f23{animation-duration:11.7s;animation-delay:-0.5s;--dx:19px;--dy:-29px}.f24{animation-duration:9.8s;animation-delay:-1.0s;--dx:-10px;--dy:-45px}.f25{animation-duration:13.9s;animation-delay:-4.4s;--dx:-36px;--dy:-66px}
</style>
<defs>
<linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0d1712"/><stop offset=".55" stop-color="#1c2a1d"/><stop offset=".85" stop-color="#4a3a22"/><stop offset="1" stop-color="#6b4a25"/></linearGradient>
<radialGradient id="halo"><stop offset="0" stop-color="#f3e2b0" stop-opacity=".55"/><stop offset="1" stop-color="#f3e2b0" stop-opacity="0"/></radialGradient>
<filter id="glow" x="-300%" y="-300%" width="700%" height="700%"><feGaussianBlur stdDeviation="3.2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
</defs>
<rect width="1600" height="900" fill="url(#sky)"/>
<g class="moon"><circle cx="1290" cy="170" r="150" fill="url(#halo)"/><circle cx="1290" cy="170" r="38" fill="#f1e4bd"/></g>
<path d="M0 560 L160 470 L290 540 L470 400 L640 520 L780 450 L960 540 L1130 430 L1300 520 L1450 460 L1600 530 L1600 900 L0 900Z" fill="#2c3a2a"/>
<path d="M0 640 L140 560 L300 630 L520 500 L700 610 L880 540 L1060 640 L1240 540 L1420 620 L1600 570 L1600 900 L0 900Z" fill="#24331f"/>
<path d="M0 730 L180 660 L360 720 L560 640 L760 735 L980 650 L1180 730 L1380 660 L1600 720 L1600 900 L0 900Z" fill="#1a2718"/>
<path d="M0 820 L120 770 L260 830 L420 780 L600 840 L800 800 L1000 845 L1200 790 L1400 835 L1600 800 L1600 900 L0 900Z" fill="#101b10"/>
<g fill="#0b140c">
<path d="M60 900 L100 700 L140 900Z M130 900 L175 740 L220 900Z M1380 900 L1425 720 L1470 900Z M1450 900 L1500 690 L1550 900Z M1520 900 L1565 760 L1610 900Z M10 900 L45 770 L80 900Z"/>
</g>
<circle class="f f0" cx="723" cy="457" r="2.8"/><circle class="f f1" cx="808" cy="678" r="2.2"/><circle class="f f2" cx="916" cy="415" r="2.2"/><circle class="f f3" cx="313" cy="494" r="3.4"/><circle class="f f4" cx="872" cy="405" r="2.2"/><circle class="f f5" cx="355" cy="656" r="2.2"/><circle class="f f6" cx="271" cy="677" r="3.4"/><circle class="f f7" cx="188" cy="668" r="2.2"/><circle class="f f8" cx="703" cy="618" r="3.4"/><circle class="f f9" cx="428" cy="737" r="2.2"/><circle class="f f10" cx="763" cy="753" r="2.8"/><circle class="f f11" cx="916" cy="464" r="2.8"/><circle class="f f12" cx="218" cy="771" r="3.4"/><circle class="f f13" cx="1483" cy="559" r="3.4"/><circle class="f f14" cx="251" cy="518" r="2.8"/><circle class="f f15" cx="694" cy="711" r="3.4"/><circle class="f f16" cx="1429" cy="557" r="2.2"/><circle class="f f17" cx="1071" cy="410" r="2.2"/><circle class="f f18" cx="860" cy="634" r="2.2"/><circle class="f f19" cx="340" cy="799" r="2.8"/><circle class="f f20" cx="794" cy="729" r="2.8"/><circle class="f f21" cx="1408" cy="499" r="2.2"/><circle class="f f22" cx="68" cy="454" r="2.8"/><circle class="f f23" cx="317" cy="733" r="3.4"/><circle class="f f24" cx="1453" cy="788" r="3.4"/><circle class="f f25" cx="1359" cy="585" r="2.2"/>
</svg>`

const LOOK: ThemeSetArgs = {
  colors: theme,
  overrideColorScheme: 'dark',
  backdrop: {
    scene: 'valley',
    glass: { blur: 10, tint: 'rgba(16, 22, 12, 0.7)', opacity: 0.62 },
  },
}

// Diagnostics for /ridgeline-check. Module variables reset on reload, which
// is fine: they describe this load only.
let lastSet = 'not set yet'
const backdropAsks: string[] = []

export const register: Register = on => {
  on('ui.render', { component: 'Backdrop' }, ($, e, next) => {
    const ask = `${e.surface} scene=${e.props.scene} from=${e.props.plugin}`
    if (!backdropAsks.includes(ask)) {
      backdropAsks.push(ask)
    }
    if (e.surface !== 'desktop' && e.surface !== 'mobile') {
      return next(e)
    }

    const { Svg } = $.ui.resolve(e)

    return <Svg source={SCENE} alt="Mountains at dusk with fireflies drifting over a valley" isInteractive />
  })

  on('session.start', async ($, e, next) => {
    const unpainted = problems.find(line => line.startsWith("Desktop won't paint"))

    if (unpainted !== undefined) {
      $.ui.toast(unpainted)
    }
    await $.command.register({
      name: 'ridgeline-check',
      description: 'Report whether the Ridgeline backdrop scene is being drawn',
    })
    const set = await $.theme.set(LOOK)
    lastSet = set.isDrawn ? 'accepted (a window that draws themes is attached)' : `not drawn: ${set.reason}`

    $.ui.toast(set.isDrawn ? 'Valley theme: a window says it draws this' : `Valley theme not drawn: ${set.reason}`)

    return next(e)
  })

  on('command.run', { command: 'ridgeline-check' }, async () => {
    const asks = backdropAsks.length === 0
      ? 'NONE - the app has not asked this mod to draw the scene in this session'
      : backdropAsks.join('; ')
    return { text: `Ridgeline 0.2.1\nTheme set: ${lastSet}\nScene draw requests: ${asks}` }
  })

  on('prompt.submit', async ($, e, next) => {
    const set = await $.theme.set(LOOK)

    if (!set.isDrawn) {
      $.ui.status(set.reason)
    }

    return next(e)
  })
}
