export type AgentState =
  | 'idle'
  | 'connecting'
  | 'listening'
  | 'thinking'
  | 'speaking'
  | 'ended'
  | 'error';

export type LandingAgentClientEvent =
  | {
      type: 'session_start';
      audio: {
        codec: 'pcm16';
        sample_rate: 16000;
        channels: 1;
        bit_depth: 16;
        source: 'browser';
      };
    }
  | { type: 'end_session' };

export type LandingAgentServerEvent =
  | { type: 'session_started'; sessionId: string }
  | { type: 'speech_started'; bargeIn?: boolean }
  | { type: 'speech_ended' }
  | { type: 'transcript'; text: string }
  | { type: 'assistant_text_delta'; text: string }
  | { type: 'assistant_text_done'; text: string }
  | { type: 'assistant_audio_done' }
  | { type: 'assistant_interrupted'; reason?: string }
  | { type: 'error'; message: string };

export interface TranscriptEntry {
  id: string;
  speaker: 'user';
  text: string;
  final: boolean;
}

export type MicrophonePermission =
  | 'prompt'
  | 'requesting'
  | 'granted'
  | 'denied'
  | 'unsupported';
