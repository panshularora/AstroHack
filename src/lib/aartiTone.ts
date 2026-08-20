/** Short procedural aarti / room tone. No audio files. */

let ctx: AudioContext | null = null

function ac() {
  if (typeof window === "undefined") return null
  if (!ctx) ctx = new AudioContext()
  return ctx
}

function beep(audio: AudioContext, freq: number, at: number, dur: number, gain = 0.08, type: OscillatorType = "sine") {
  const o = audio.createOscillator()
  const g = audio.createGain()
  o.type = type
  o.frequency.value = freq
  g.gain.setValueAtTime(0.0001, at)
  g.gain.exponentialRampToValueAtTime(gain, at + 0.03)
  g.gain.exponentialRampToValueAtTime(0.0001, at + dur)
  o.connect(g)
  g.connect(audio.destination)
  o.start(at)
  o.stop(at + dur + 0.02)
}

export function playAarti(kind: string) {
  const audio = ac()
  if (!audio) return
  void audio.resume()
  const t0 = audio.currentTime + 0.02
  if (kind === "aarti-navagraha") {
    ;[196, 220, 247, 262, 294, 330, 349].forEach((f, i) => beep(audio, f, t0 + i * 0.28, 0.32, 0.07))
    return
  }
  if (kind === "aarti-durga") {
    beep(audio, 196, t0, 1.4, 0.04)
    beep(audio, 294, t0 + 0.15, 1.2, 0.05)
    beep(audio, 784, t0 + 0.05, 0.18, 0.09)
    beep(audio, 784, t0 + 0.55, 0.18, 0.08)
    beep(audio, 659, t0 + 1.1, 0.4, 0.07)
    return
  }
  beep(audio, 130.8, t0, 1.6, 0.045)
  beep(audio, 196, t0, 1.6, 0.03)
  beep(audio, 523, t0 + 0.08, 0.16, 0.1)
  beep(audio, 659, t0 + 0.42, 0.16, 0.08)
  beep(audio, 784, t0 + 0.78, 0.22, 0.07)
}

export function startRoomTone() {
  const audio = ac()
  if (!audio) return () => {}
  void audio.resume()
  const t0 = audio.currentTime
  const master = audio.createGain()
  master.gain.value = 0.035
  master.connect(audio.destination)

  const drone = audio.createOscillator()
  drone.type = "sine"
  drone.frequency.value = 110
  const fifth = audio.createOscillator()
  fifth.type = "sine"
  fifth.frequency.value = 165
  const filter = audio.createBiquadFilter()
  filter.type = "lowpass"
  filter.frequency.value = 480
  drone.connect(filter)
  fifth.connect(filter)
  filter.connect(master)
  drone.start(t0)
  fifth.start(t0)
  beep(audio, 880, t0, 0.12, 0.06)

  return () => {
    try {
      drone.stop()
      fifth.stop()
    } catch {
      /* already stopped */
    }
    master.disconnect()
  }
}
