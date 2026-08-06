// Web Audio API Ambient Sound Synthesizer
import type { AmbientSoundType } from '../types';

let audioCtx: AudioContext | null = null;
let currentSoundType: AmbientSoundType = 'none';
let activeOscillators: AudioNode[] = [];
let masterGain: GainNode | null = null;
let tickInterval: number | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function stopAmbientSound() {
  if (tickInterval) {
    clearInterval(tickInterval);
    tickInterval = null;
  }
  activeOscillators.forEach((node) => {
    try {
      if ('stop' in node && typeof (node as AudioScheduledSourceNode).stop === 'function') {
        (node as AudioScheduledSourceNode).stop();
      }
      node.disconnect();
    } catch {
      // ignore
    }
  });
  activeOscillators = [];
  currentSoundType = 'none';
}

export function setAmbientVolume(volume: number) {
  if (masterGain && audioCtx) {
    masterGain.gain.setTargetAtTime(Math.max(0, Math.min(1, volume)), audioCtx.currentTime, 0.1);
  }
}

export function playAmbientSound(type: AmbientSoundType, volume: number = 0.3) {
  stopAmbientSound();
  if (type === 'none') return;

  const ctx = getAudioContext();
  currentSoundType = type;

  masterGain = ctx.createGain();
  masterGain.gain.setValueAtTime(volume, ctx.currentTime);
  masterGain.connect(ctx.destination);

  if (type === 'tick') {
    // Clock tick loop
    const playTick = () => {
      if (currentSoundType !== 'tick' || !masterGain) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(100, now + 0.03);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);

      osc.connect(gain);
      gain.connect(masterGain);

      osc.start(now);
      osc.stop(now + 0.035);
    };

    playTick();
    tickInterval = window.setInterval(playTick, 1000);
  } else if (type === 'rain') {
    // Pink / White noise with bandpass filtering for gentle rain
    const bufferSize = ctx.sampleRate * 2;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1000, ctx.currentTime);

    const filter2 = ctx.createBiquadFilter();
    filter2.type = 'highpass';
    filter2.frequency.setValueAtTime(300, ctx.currentTime);

    whiteNoise.connect(filter);
    filter.connect(filter2);
    filter2.connect(masterGain);

    whiteNoise.start();
    activeOscillators.push(whiteNoise);
  } else if (type === 'space') {
    // Deep cosmic drone
    const freqs = [55, 110, 164.81]; // A1, A2, E3
    freqs.forEach((f) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, ctx.currentTime);

      // Subtle LFO for breathing drone
      const lfo = ctx.createOscillator();
      lfo.type = 'sine';
      lfo.frequency.setValueAtTime(0.1, ctx.currentTime);
      const lfoGain = ctx.createGain();
      lfoGain.gain.setValueAtTime(0.05, ctx.currentTime);

      lfo.connect(lfoGain);
      lfoGain.connect(gain.gain);

      gain.gain.setValueAtTime(0.1, ctx.currentTime);

      osc.connect(gain);
      gain.connect(masterGain!);

      osc.start();
      lfo.start();
      activeOscillators.push(osc, lfo);
    });
  } else if (type === 'brown') {
    // Brown noise generator
    const bufferSize = ctx.sampleRate * 2;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let lastOut = 0.0;

    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      output[i] = (lastOut + 0.02 * white) / 1.02;
      lastOut = output[i];
      output[i] *= 3.5; // Gain compensation
    }

    const brownNoise = ctx.createBufferSource();
    brownNoise.buffer = noiseBuffer;
    brownNoise.loop = true;

    brownNoise.connect(masterGain);
    brownNoise.start();
    activeOscillators.push(brownNoise);
  }
}
