let audioCtx = null
let isPlaying = false

const notes = [329.63, 392.00, 440.00, 523.25, 587.33, 659.25, 783.99]

function playNote() {
  if (!audioCtx || audioCtx.state === "closed") return

  const freq = notes[Math.floor(Math.random() * notes.length)]
  const now = audioCtx.currentTime

  const osc = audioCtx.createOscillator()
  const gain = audioCtx.createGain()
  const filter = audioCtx.createBiquadFilter()

  osc.type = "sine"
  osc.frequency.setValueAtTime(freq, now)

  const vibrato = audioCtx.createOscillator()
  const vibratoGain = audioCtx.createGain()
  vibrato.frequency.value = 4.5
  vibratoGain.gain.value = 2
  vibrato.connect(vibratoGain)
  vibratoGain.connect(osc.frequency)
  vibrato.start(now)

  filter.type = "bandpass"
  filter.frequency.value = freq * 2
  filter.Q.value = 1.5

  const duration = 2 + Math.random() * 3
  gain.gain.setValueAtTime(0, now)
  gain.gain.linearRampToValueAtTime(0.04, now + 0.6)
  gain.gain.setValueAtTime(0.04, now + duration - 1)
  gain.gain.linearRampToValueAtTime(0, now + duration)

  osc.connect(filter)
  filter.connect(gain)
  gain.connect(audioCtx.destination)

  osc.start(now)
  osc.stop(now + duration)
  vibrato.stop(now + duration)

  const gap = duration * 0.6 + Math.random() * 2
  setTimeout(playNote, gap * 1000)
}

export function startGlobalFlute() {
  if (isPlaying) return
  isPlaying = true

  audioCtx = new AudioContext()
  playNote()
  setTimeout(playNote, 1200)
}

export function isFlutePlaying() {
  return isPlaying
}