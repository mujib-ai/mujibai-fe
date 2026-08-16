export type LandingSTTMessage =
  | { type: 'session_started'; sessionId: string }
  | { type: 'speech_started' }
  | { type: 'speech_ended' }
  | {
      type: 'transcript';
      text: string;
      language: 'ar' | 'other';
      final: true;
    }
  | { type: 'error'; message: string };

type LandingSTTClientOptions = {
  onMessage: (message: LandingSTTMessage) => void;
  onError: (error: Error) => void;
  onClose: () => void;
};

const debug = (...values: unknown[]) => {
  if (process.env.NODE_ENV === 'development') {
    console.debug('[landing-stt]', ...values);
  }
};

function getWebSocketUrl(): string {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) throw new Error('configuration');

  const url = new URL(apiUrl);
  url.protocol = url.protocol === 'https:' ? 'wss:' : 'ws:';
  url.pathname = '/ws/public/landing-agent/speech-to-text';
  url.search = '';
  url.hash = '';
  return url.toString();
}

function parseMessage(value: unknown): LandingSTTMessage | null {
  if (typeof value !== 'string') return null;

  try {
    const message: unknown = JSON.parse(value);
    if (
      !message ||
      typeof message !== 'object' ||
      !('type' in message) ||
      typeof message.type !== 'string'
    ) {
      return null;
    }
    return message as LandingSTTMessage;
  } catch {
    return null;
  }
}

function getCloseError(code: number, reason: string): string | null {
  if (code === 4403) return 'origin_not_allowed';
  if (code === 4404) return 'feature_disabled';
  if (code === 4429)
    return reason === 'too_many_connections'
      ? 'too_many_connections'
      : 'rate_limited';
  if (code !== 1000) return reason || 'connection_closed';
  return null;
}

export class LandingSTTClient {
  private socket: WebSocket | null = null;
  private audioContext: AudioContext | null = null;
  private stream: MediaStream | null = null;
  private source: MediaStreamAudioSourceNode | null = null;
  private worklet: AudioWorkletNode | null = null;
  private stopped = false;

  constructor(private readonly options: LandingSTTClientOptions) {}

  async start() {
    if (!navigator.mediaDevices?.getUserMedia || !window.AudioWorkletNode) {
      throw new Error('unsupported');
    }

    this.stopped = false;
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          channelCount: 1,
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });
      this.audioContext = new AudioContext();
      await this.audioContext.resume();
      await this.audioContext.audioWorklet.addModule('/pcm-worklet.js');
      await this.connect();
    } catch (error) {
      this.cleanup();
      throw error;
    }
  }

  private connect() {
    return new Promise<void>((resolve, reject) => {
      let settled = false;
      let streamingStarted = false;
      const socketUrl = getWebSocketUrl();
      debug('connecting', socketUrl);

      const socket = new WebSocket(socketUrl);
      socket.binaryType = 'arraybuffer';
      this.socket = socket;

      const handshakeTimeout = window.setTimeout(() => {
        if (settled) return;
        settled = true;
        reject(new Error('session_start_timeout'));
        socket.close(1000, 'session_start_timeout');
      }, 10_000);

      const settleConnection = () => {
        if (settled) return;
        settled = true;
        window.clearTimeout(handshakeTimeout);
        resolve();
      };

      socket.onopen = () => {
        debug('open', { readyState: socket.readyState });
      };

      socket.onmessage = event => {
        debug('message', event.data);
        const message = parseMessage(event.data);
        if (!message) {
          debug('parse_error', event.data);
          this.options.onError(new Error('invalid_control'));
          return;
        }

        if (
          message.type === 'session_started' &&
          !streamingStarted &&
          this.audioContext &&
          this.stream &&
          !this.stopped
        ) {
          socket.send(
            JSON.stringify({
              type: 'session_start',
              audio: {
                codec: 'pcm16',
                sample_rate: this.audioContext.sampleRate,
                channels: 1,
                bit_depth: 16,
                source: 'browser',
              },
            })
          );
          this.startStreaming();
          streamingStarted = true;
          settleConnection();
        }

        this.options.onMessage(message);
      };

      socket.onerror = event => {
        debug('error', event, { readyState: socket.readyState });
        const error = new Error('socket_error');
        if (!settled) {
          settled = true;
          window.clearTimeout(handshakeTimeout);
          reject(error);
        } else {
          this.options.onError(error);
        }
      };

      socket.onclose = event => {
        debug('close', event.code, event.reason);
        window.clearTimeout(handshakeTimeout);
        if (!settled) {
          settled = true;
          reject(
            new Error(getCloseError(event.code, event.reason) ?? 'closed')
          );
        } else {
          const message = getCloseError(event.code, event.reason);
          if (message && !this.stopped)
            this.options.onError(new Error(message));
        }
        this.cleanup();
        this.options.onClose();
      };
    });
  }
  private startStreaming() {
    if (!this.audioContext || !this.stream || !this.socket) return;

    this.source = this.audioContext.createMediaStreamSource(this.stream);
    this.worklet = new AudioWorkletNode(this.audioContext, 'pcm-worklet', {
      numberOfInputs: 1,
      numberOfOutputs: 0,
      channelCount: 1,
    });
    this.worklet.port.onmessage = (event: MessageEvent<ArrayBuffer>) => {
      if (this.socket?.readyState === WebSocket.OPEN) {
        this.socket.send(event.data);
      }
    };
    this.source.connect(this.worklet);
  }

  stop() {
    this.stopped = true;
    if (this.socket?.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify({ type: 'end_session' }));
      this.socket.close(1000, 'session_ended');
    }
    this.cleanup();
    this.options.onClose();
  }

  private cleanup() {
    this.worklet?.disconnect();
    this.source?.disconnect();
    this.stream?.getTracks().forEach(track => track.stop());
    void this.audioContext?.close();
    this.worklet = null;
    this.source = null;
    this.stream = null;
    this.audioContext = null;
    this.socket = null;
  }
}
