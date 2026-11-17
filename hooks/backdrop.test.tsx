import { expect, test } from 'claude-code/testing'

test('desktop and mobile draw the valley scene', async $ => {
  for (const surface of ['desktop', 'mobile'] as const) {
    const ui = await $.ui.mount({
      plugin: 'ridgeline',
      surface,
      component: 'Backdrop',
      props: { scene: 'valley', plugin: 'ridgeline', glass: { blur: 10, opacity: 0.62 } },
    })
    const svg = await ui.find({ type: 'Svg' })
    expect(svg).toBeDefined()
    await ui.unmount()
  }
})
