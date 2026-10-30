/**
 * Web Audio API synthesizer for ambient hearth crackle, liquid pour sound,
 * ice clink, and spice grating (zero external audio dependencies).
 */
class SoundEffects {
  private ctx: AudioContext | null = null;
  private isPlayingHearth = false;
  private noiseNode: AudioNode | null = null;
  private gainNode: GainNode | null = null;
  private crackleInterval: number | null = null;

  public init() {
    if (this.ctx) return;
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioCtx) {
      this.ctx = new AudioCtx();
    }
  }

  /* Hearth Ambience */
  public playHearth() {
    this.init();
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    if (this.isPlayingHearth) return;

    const bufferSize = this.ctx.sampleRate * 2;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let lastOut = 0.0;

    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      output[i] = (lastOut + 0.02 * white) / 1.02;
      lastOut = output[i];
      output[i] *= 3.5;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(450, this.ctx.currentTime);

    const masterGain = this.ctx.createGain();
    masterGain.gain.setValueAtTime(0.08, this.ctx.currentTime);

    whiteNoise.connect(filter);
    filter.connect(masterGain);
    masterGain.connect(this.ctx.destination);

    whiteNoise.start(0);
    this.noiseNode = whiteNoise;
    this.gainNode = masterGain;
    this.isPlayingHearth = true;

    this.crackleInterval = window.setInterval(() => {
      if (!this.ctx || !this.isPlayingHearth) return;
      if (Math.random() > 0.4) {
        this.triggerPop();
      }
    }, 400);
  }

  private triggerPop() {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const popGain = this.ctx.createGain();

    osc.type = 'triangle';
    const freq = 120 + Math.random() * 300;
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(30, this.ctx.currentTime + 0.05);

    popGain.gain.setValueAtTime(0.04 + Math.random() * 0.05, this.ctx.currentTime);
    popGain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);

    osc.connect(popGain);
    popGain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.06);
  }

  public stopHearth() {
    if (this.crackleInterval) {
      clearInterval(this.crackleInterval);
      this.crackleInterval = null;
    }
    if (this.noiseNode) {
      try {
        (this.noiseNode as AudioScheduledSourceNode).stop();
      } catch {
        // Ignored
      }
      this.noiseNode.disconnect();
      this.noiseNode = null;
    }
    if (this.gainNode) {
      this.gainNode.disconnect();
      this.gainNode = null;
    }
    this.isPlayingHearth = false;
  }

  public toggleHearth(): boolean {
    if (this.isPlayingHearth) {
      this.stopHearth();
      return false;
    } else {
      this.playHearth();
      return true;
    }
  }

  public isHearthActive(): boolean {
    return this.isPlayingHearth;
  }

  /* Liquid Pour Sound (thick creamy pour) */
  public playPourSound(durationSeconds: number = 3.5) {
    this.init();
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    const now = this.ctx.currentTime;
    const bufferSize = this.ctx.sampleRate * 2;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = noiseBuffer;
    noise.loop = true;

    // Bandpass filter centered around 600Hz-850Hz for thick liquid
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(650, now);
    filter.frequency.linearRampToValueAtTime(820, now + durationSeconds);
    filter.Q.setValueAtTime(2.5, now);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.12, now + 0.3);
    gain.gain.setValueAtTime(0.12, now + durationSeconds - 0.5);
    gain.gain.exponentialRampToValueAtTime(0.001, now + durationSeconds);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    noise.start(now);
    noise.stop(now + durationSeconds);
  }

  /* Ice clink sound (crystal glass ping) */
  public playIceClink() {
    this.init();
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    const now = this.ctx.currentTime;
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(2800, now);
    osc1.frequency.exponentialRampToValueAtTime(1400, now + 0.35);

    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(3600, now);
    osc2.frequency.exponentialRampToValueAtTime(1800, now + 0.25);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(this.ctx.destination);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 0.36);
    osc2.stop(now + 0.36);
  }

  /* Nutmeg Grater Sound (subtle spice grating) */
  public playNutmegGrate() {
    this.init();
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    const now = this.ctx.currentTime;
    for (let i = 0; i < 3; i++) {
      const startTime = now + i * 0.15;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(180 + Math.random() * 80, startTime);
      gain.gain.setValueAtTime(0.04, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.1);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(startTime);
      osc.stop(startTime + 0.11);
    }
  }

  /* Firework Rocket Launch (rising whoosh) */
  public playFireworkLaunch() {
    try {
      this.init();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.55);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.05, now + 0.2);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.6);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.62);
    } catch {
      // Audio playback fails gracefully if context blocked
    }
  }

  /* Firework Boom & Crackle Burst */
  public playFireworkBurst() {
    try {
      this.init();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }

      const now = this.ctx.currentTime;

      // 1. Low Thud / Boom
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(35, now + 0.45);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.52);

      // 2. High Sparkle Crackles
      for (let i = 0; i < 5; i++) {
        const crackleDelay = 0.08 + Math.random() * 0.35;
        const crackleOsc = this.ctx.createOscillator();
        const crackleGain = this.ctx.createGain();

        crackleOsc.type = 'square';
        crackleOsc.frequency.setValueAtTime(1200 + Math.random() * 1800, now + crackleDelay);

        crackleGain.gain.setValueAtTime(0.025, now + crackleDelay);
        crackleGain.gain.exponentialRampToValueAtTime(0.0001, now + crackleDelay + 0.06);

        crackleOsc.connect(crackleGain);
        crackleGain.connect(this.ctx.destination);

        crackleOsc.start(now + crackleDelay);
        crackleOsc.stop(now + crackleDelay + 0.07);
      }
    } catch {
      // Audio playback fails gracefully
    }
  }
}

export const soundEffects = new SoundEffects();
export const hearthSound = {
  toggle: () => soundEffects.toggleHearth(),
  active: () => soundEffects.isHearthActive(),
};

