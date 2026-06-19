/**
 * Endüstri İmparatorluğu v5 - Ses Yönetim Sistemi
 * BGM (Arka plan müziği) + SFX (Ses efektleri)
 */

interface AudioConfig {
  musicOn: boolean;
  sfxOn: boolean;
  volume: number;
}

class AudioManager {
  private ctx: AudioContext | null = null;
  private bgmGain: GainNode | null = null;
  private sfxGain: GainNode | null = null;
  private bgmActive = false;
  private bgmTimer: NodeJS.Timeout | null = null;
  private zone = 1;
  private gameState: any = null;

  // Her bölge için pentatonik/modal dizi (Hz)
  private SCALES: Record<number, number[]> = {
    1: [130.81, 155.56, 174.61, 196.0, 233.08, 261.63], // C minör — Sanayi
    2: [174.61, 196.0, 220.0, 261.63, 293.66, 329.63], // F majör — Ticaret
    3: [220.0, 246.94, 261.63, 311.13, 329.63, 392.0], // A minör — Uzay
    4: [261.63, 293.66, 349.23, 392.0, 440.0, 523.25], // C majör — Ay
    5: [146.83, 174.61, 196.0, 220.0, 246.94, 293.66], // D Frig — Mars
    6: [329.63, 369.99, 415.3, 493.88, 554.37, 659.25], // E Lidyen — Yıldız
    7: [196.0, 220.0, 261.63, 293.66, 329.63, 392.0], // G Mikso — Tanrı
    8: [110.0, 130.81, 155.56, 174.61, 220.0, 261.63], // A Lokryan — Paralel
  };

  private PATTERNS: Record<number, number[]> = {
    1: [0, 2, 1, 3, 0, 4, 2, 5],
    2: [0, 2, 4, 3, 2, 0, 4, 5],
    3: [0, 3, 5, 2, 4, 1, 3, 0],
    4: [0, 2, 4, 5, 4, 2, 1, 0],
    5: [0, 1, 3, 5, 3, 1, 0, 2],
    6: [0, 4, 2, 5, 3, 1, 4, 0],
    7: [5, 3, 1, 0, 2, 4, 3, 5],
    8: [5, 4, 2, 0, 1, 3, 5, 4],
  };

  /**
   * AudioContext'i başlat
   */
  private getContext(): AudioContext | null {
    if (!this.ctx) {
      try {
        const AudioContextClass = (window as any).AudioContext || (window as any).webkitAudioContext;
        this.ctx = new AudioContextClass();
        this.bgmGain = this.ctx.createGain();
        this.bgmGain.gain.value = 0;
        this.bgmGain.connect(this.ctx.destination);

        this.sfxGain = this.ctx.createGain();
        this.sfxGain.gain.value = 1;
        this.sfxGain.connect(this.ctx.destination);
      } catch (e) {
        console.warn('AudioContext başlatılamadı:', e);
        return null;
      }
    }
    return this.ctx;
  }

  /**
   * Ses ayarlarını al
   */
  private getConfig(): AudioConfig {
    if (!this.gameState) {
      return { musicOn: true, sfxOn: true, volume: 0.5 };
    }
    return {
      musicOn: this.gameState.musicOn !== false,
      sfxOn: this.gameState.sfxOn !== false,
      volume: this.gameState.audioVolume ?? 0.5,
    };
  }

  /**
   * Ses seviyesini uygula
   */
  private applyVolume(): void {
    const ctx = this.getContext();
    if (!ctx || !this.bgmGain || !this.sfxGain) return;

    const { musicOn, sfxOn, volume } = this.getConfig();
    this.bgmGain.gain.setTargetAtTime(musicOn ? volume * 0.28 : 0, ctx.currentTime, 0.4);
    this.sfxGain.gain.setTargetAtTime(sfxOn ? volume : 0, ctx.currentTime, 0.06);
  }

  /**
   * Tek osilatör çalar
   */
  private osc(
    freq: number,
    type: OscillatorType,
    dur: number,
    amp: number,
    delay: number = 0,
    dest: GainNode | null = null
  ): void {
    const ctx = this.getContext();
    if (!ctx) return;

    const out = dest || this.sfxGain;
    if (!out) return;

    try {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.connect(g);
      g.connect(out);
      o.type = type;
      o.frequency.setValueAtTime(freq, ctx.currentTime + delay);
      g.gain.setValueAtTime(0, ctx.currentTime + delay);
      g.gain.linearRampToValueAtTime(amp, ctx.currentTime + delay + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + delay + dur);
      o.start(ctx.currentTime + delay);
      o.stop(ctx.currentTime + delay + dur + 0.06);
    } catch (e) {
      console.warn('OSC hatası:', e);
    }
  }

  /**
   * BGM barını zamanlar
   */
  private scheduleBar(zone: number): number {
    const ctx = this.getContext();
    if (!ctx || !this.bgmGain) return 2.0;

    const { musicOn, volume } = this.getConfig();
    if (!musicOn) return 1.5;

    const sc = this.SCALES[zone] || this.SCALES[1];
    const pat = this.PATTERNS[zone] || this.PATTERNS[1];
    const barDur = 2.0;
    const nDur = barDur / pat.length;

    // Melodi + oktav altı harmoni
    pat.forEach((idx, i) => {
      this.osc(sc[idx], 'triangle', nDur * 0.85, volume * 0.22, i * nDur, this.bgmGain!);
      if (i % 2 === 0) {
        this.osc(sc[idx] / 2, 'sine', nDur * 1.1, volume * 0.09, i * nDur, this.bgmGain!);
      }
    });

    // Bass drone
    try {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      const lp = ctx.createBiquadFilter();
      lp.type = 'lowpass';
      lp.frequency.value = 280;
      o.connect(lp);
      lp.connect(g);
      g.connect(this.bgmGain);
      o.type = 'sine';
      o.frequency.value = sc[0] / 2;
      const bv = volume * 0.13;
      g.gain.setValueAtTime(0, ctx.currentTime);
      g.gain.linearRampToValueAtTime(bv, ctx.currentTime + 0.15);
      g.gain.setValueAtTime(bv, ctx.currentTime + barDur - 0.2);
      g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + barDur + 0.05);
      o.start(ctx.currentTime);
      o.stop(ctx.currentTime + barDur + 0.1);
    } catch (e) {
      console.warn('Bass drone hatası:', e);
    }

    return barDur;
  }

  /**
   * Oyun durumunu başlat
   */
  public init(gameState: any): void {
    this.gameState = gameState;
  }

  /**
   * Bölgeyi değiştir
   */
  public setZone(z: number): void {
    this.zone = z;
  }

  /**
   * Ayarlar değiştiğinde çağır
   */
  public onSettingsChange(): void {
    this.applyVolume();
    const { musicOn } = this.getConfig();
    if (musicOn && !this.bgmActive) {
      this.startBGM(this.zone);
    }
  }

  /**
   * BGM başlat
   */
  public startBGM(zone: number = 1): void {
    const ctx = this.getContext();
    if (!ctx) return;

    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }

    this.bgmActive = true;
    this.zone = zone;
    this.applyVolume();

    const loop = () => {
      if (!this.bgmActive) return;
      const dur = this.scheduleBar(this.zone);
      this.bgmTimer = setTimeout(loop, dur * 1000 - 60);
    };

    if (this.bgmTimer) clearTimeout(this.bgmTimer);
    loop();
  }

  /**
   * BGM durdur
   */
  public stopBGM(): void {
    this.bgmActive = false;
    if (this.bgmTimer) clearTimeout(this.bgmTimer);

    const ctx = this.getContext();
    if (ctx && this.bgmGain) {
      this.bgmGain.gain.setTargetAtTime(0, ctx.currentTime, 0.6);
    }
  }

  /**
   * SFX Koleksiyonu
   */
  public sfx = {
    click: () => {
      const { sfxOn: s, volume: v } = this.getConfig();
      if (!s) return;
      this.osc(900, 'sine', 0.05, v * 0.18);
    },
    buy: () => {
      const { sfxOn: s, volume: v } = this.getConfig();
      if (!s) return;
      this.osc(440, 'sine', 0.1, v * 0.28);
      this.osc(660, 'sine', 0.08, v * 0.22, 0.05);
    },
    buyMax: () => {
      const { sfxOn: s, volume: v } = this.getConfig();
      if (!s) return;
      [440, 550, 660, 880].forEach((f, i) => this.osc(f, 'sine', 0.12, v * 0.28, i * 0.04));
    },
    sell: () => {
      const { sfxOn: s, volume: v } = this.getConfig();
      if (!s) return;
      this.osc(330, 'triangle', 0.15, v * 0.22);
    },
    error: () => {
      const { sfxOn: s, volume: v } = this.getConfig();
      if (!s) return;
      this.osc(180, 'sawtooth', 0.18, v * 0.32);
      this.osc(130, 'sawtooth', 0.22, v * 0.28, 0.1);
    },
    levelUp: () => {
      const { sfxOn: s, volume: v } = this.getConfig();
      if (!s) return;
      [523, 659, 784, 1047].forEach((f, i) => this.osc(f, 'sine', 0.3, v * 0.32, i * 0.08));
    },
    achievement: () => {
      const { sfxOn: s, volume: v } = this.getConfig();
      if (!s) return;
      [659, 784, 988, 1319].forEach((f, i) => this.osc(f, 'sine', 0.25, v * 0.28, i * 0.07));
    },
    milestone: () => {
      const { sfxOn: s, volume: v } = this.getConfig();
      if (!s) return;
      [880, 1100, 1320].forEach((f, i) => this.osc(f, 'triangle', 0.2, v * 0.24, i * 0.06));
    },
    save: () => {
      const { sfxOn: s, volume: v } = this.getConfig();
      if (!s) return;
      this.osc(440, 'sine', 0.1, v * 0.22);
      this.osc(550, 'sine', 0.08, v * 0.18, 0.06);
    },
    zoneUp: () => {
      const { sfxOn: s, volume: v } = this.getConfig();
      if (!s) return;
      [523, 659, 784, 1047, 1319].forEach((f, i) => this.osc(f, 'sine', 0.4, v * 0.32, i * 0.1));
    },
    event: () => {
      const { sfxOn: s, volume: v } = this.getConfig();
      if (!s) return;
      [440, 330, 220].forEach((f, i) => this.osc(f, 'sawtooth', 0.15, v * 0.22, i * 0.05));
    },
  };
}

// Singleton instance
export const audioManager = new AudioManager();
