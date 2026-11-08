/**
 * Background Music Service (Disabled per user request to optimize mobile performance)
 * All background audio players and YouTube iframes have been removed.
 */

export interface BGMState {
  isPlaying: boolean;
  isMuted: boolean;
  volume: number;
}

type Listener = (state: BGMState) => void;

class BackgroundMusicController {
  private playing = false;
  private muted = true;
  private volume = 0;
  private listeners: Set<Listener> = new Set();

  constructor() {
    if (typeof window !== 'undefined') {
      // Remove any lingering container or script if present
      const container = document.getElementById('dulcito-yt-bgm-container');
      if (container) container.remove();
      const script = document.getElementById('youtube-iframe-api-script');
      if (script) script.remove();
    }
  }

  public subscribe(listener: Listener): () => void {
    listener(this.getState());
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  public play() {}
  public pause() {}
  public toggle() {}
  public setVolume(_vol: number) {}
  public mute() {}
  public unmute() {}
  public duck() {}
  public unduck() {}

  public getState(): BGMState {
    return {
      isPlaying: false,
      isMuted: true,
      volume: 0,
    };
  }
}

export const backgroundMusic = new BackgroundMusicController();
