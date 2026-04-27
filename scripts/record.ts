/**
 * Record each inkmotion animation as a portrait video (1080×1920).
 *
 * Prerequisites:
 *   npm run dev          ← must be running on localhost:3456
 *   npx playwright install chromium
 *
 * Usage:
 *   npm run record
 *
 * Output:
 *   videos/<AnimationName>.webm   (one per animation)
 *
 * Convert to MP4 (requires ffmpeg):
 *   for f in videos/*.webm; do ffmpeg -i "$f" "${f%.webm}.mp4"; done
 */

import { chromium } from 'playwright'
import { promises as fs } from 'fs'
import path from 'path'

// ─── Viewport ──────────────────────────────────────────────────────────────

const WIDTH  = 1080
const HEIGHT = 1350  // Instagram 4:5 portrait feed (perfect for posts + reels)

// ─── Recording options ─────────────────────────────────────────────────────

const SLOW_FACTOR = 2   // animations play at 1/2 speed
const REPEAT      = 3   // each animation plays this many times

// ─── Animation list ────────────────────────────────────────────────────────

type AnimEntry = {
  name: string
  duration: number   // ms to record
}

const SPRING_ANIMATIONS: AnimEntry[] = [
  // entrance — wait for them to settle
  { name: 'DropSettle',       duration: 4500 },
  { name: 'RiseOvershoot',    duration: 4500 },
  { name: 'GravityBounce',    duration: 5000 },
  { name: 'ExplodeFormation', duration: 5000 },
  { name: 'CenterBurst',      duration: 5000 },
  // interactive — show a few seconds of idle state
  { name: 'Repulsion',        duration: 5000 },
  { name: 'MagneticPull',     duration: 5000 },
  { name: 'SpringKerning',    duration: 5000 },
  { name: 'DragRelease',      duration: 5000 },
  { name: 'GravityWell',      duration: 5000 },
  // ambient — capture a full loop
  { name: 'ThermalNoise',     duration: 6000 },
  { name: 'Breathing',        duration: 6000 },
  { name: 'OrbitalDrift',     duration: 6000 },
  { name: 'WeightWave',       duration: 6000 },
  { name: 'Pendulum',         duration: 5000 },
  // event
  { name: 'Shockwave',        duration: 5000 },
  { name: 'WaveCascade',      duration: 4500 },
  { name: 'JellyHover',       duration: 5000 },
  { name: 'ScatterReturn',    duration: 5000 },
  { name: 'DominoFall',       duration: 5000 },
]

const TEXT_ANIMATIONS: AnimEntry[] = [
  { name: 'FadeUp',      duration: 4000 },
  { name: 'BlurIn',      duration: 4000 },
  { name: 'ScaleBounce', duration: 4500 },
  { name: 'SlideRight',  duration: 4000 },
  { name: 'Wave',        duration: 4500 },
  { name: 'FlipX',       duration: 4500 },
  { name: 'FlipY',       duration: 4500 },
  { name: 'FallDown',    duration: 4000 },
  { name: 'Rtl',         duration: 4000 },
  { name: 'CenterOut',   duration: 4500 },
  { name: 'Typewriter',  duration: 5000 },
  { name: 'Scramble',    duration: 5000 },
  { name: 'Glitch',      duration: 4000 },
  { name: 'ColorSweep',  duration: 5000 },
  { name: 'NeonPulse',   duration: 4500 },
  { name: 'ElasticSnap', duration: 4500 },
  { name: 'RotateIn',    duration: 4500 },
  { name: 'Anticipate',  duration: 4500 },
  { name: 'StaggerFade', duration: 6000 },
  { name: 'RandomRain',  duration: 5000 },
]

const ALL_ANIMATIONS = [...SPRING_ANIMATIONS, ...TEXT_ANIMATIONS]

// ─── Helpers ───────────────────────────────────────────────────────────────

async function ensureDir(dir: string) {
  await fs.mkdir(dir, { recursive: true })
}

async function checkServer(url: string): Promise<void> {
  const { default: http } = await import('http')
  return new Promise((resolve, reject) => {
    http.get(url, res => {
      res.resume()
      resolve()
    }).on('error', () => {
      reject(new Error(`Dev server not reachable at ${url}. Run "npm run dev" first.`))
    })
  })
}

// ─── Main ──────────────────────────────────────────────────────────────────

async function main() {
  const BASE_URL  = 'http://localhost:5173'
  const VIDEO_DIR = path.resolve('videos')

  console.log('📹  inkmotion — recording animations\n')

  await checkServer(BASE_URL)
  await ensureDir(VIDEO_DIR)

  // headed mode: headless shell doesn't composite CSS animations into the
  // video buffer, producing black frames. Windows briefly appear then close.
  const browser = await chromium.launch({
    headless: false,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })
  let recorded = 0

  for (const anim of ALL_ANIMATIONS) {
    const url = `${BASE_URL}/?preview=${anim.name}`

    process.stdout.write(`  recording ${anim.name.padEnd(20)}`)

    const context = await browser.newContext({
      viewport: { width: WIDTH, height: HEIGHT },
      deviceScaleFactor: 1,
      recordVideo: {
        dir: VIDEO_DIR,
        size: { width: WIDTH, height: HEIGHT },
      },
    })

    const page = await context.newPage()

    // Slow down RAF-based (spring) animations by skipping every Nth frame.
    // String form avoids esbuild injecting __name helpers that break in browser eval.
    await page.addInitScript(`;(function(){
      var _raf = window.requestAnimationFrame.bind(window)
      var _frame = 0
      window.requestAnimationFrame = function(cb) {
        var go = function(ts) {
          _frame++
          if (_frame % ${SLOW_FACTOR} === 0) cb(ts)
          else _raf(go)
        }
        return _raf(go)
      }
    })()`)

    await page.goto(`${url}&repeat=${REPEAT}`, { waitUntil: 'networkidle' })
    await page.evaluate('document.fonts.ready')

    // Slow CSS animations via playbackRate; poll every 50ms to catch staggered starts.
    await page.evaluate(`;(function(){
      var slow = ${SLOW_FACTOR}
      var slowAll = function() {
        document.getAnimations().forEach(function(a) {
          if (a.playbackRate !== 1/slow) a.playbackRate = 1/slow
        })
      }
      slowAll()
      setInterval(slowAll, 50)
    })()`)

    await page.waitForTimeout(300)

    // Play REPEAT times: wait for each animation to finish, then click the hidden
    // replay button to remount the component. Playwright drives timing so it works
    // for all animation types (including ambient loops that never call onComplete).
    const playMs = anim.duration * SLOW_FACTOR
    for (let play = 0; play < REPEAT; play++) {
      await page.waitForTimeout(playMs)
      if (play < REPEAT - 1) {
        await page.evaluate('document.querySelector("[data-testid=\\"ink-replay\\"]").click()')
        await page.waitForTimeout(200)  // let React remount before next play starts
      }
    }
    await page.waitForTimeout(1000)  // brief hold after last play

    // close context to finalise the video file
    await context.close()

    const tempPath = await page.video()!.path()
    const destPath = path.join(VIDEO_DIR, `${anim.name}.webm`)

    await fs.rename(tempPath, destPath)

    recorded++
    console.log(' ✓')
  }

  await browser.close()

  console.log(`\n✅  ${recorded} videos saved to ./videos/`)
  console.log('\nConvert to MP4 with ffmpeg:')
  console.log('  for f in videos/*.webm; do ffmpeg -i "$f" "${f%.webm}.mp4"; done\n')
}

main().catch(err => {
  console.error('\n❌ ', err.message)
  process.exit(1)
})
