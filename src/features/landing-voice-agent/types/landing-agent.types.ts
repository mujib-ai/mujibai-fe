export type AgentState =
  | 'idle'
  | 'connecting'
  | 'listening'
  | 'thinking'
  | 'speaking'
  | 'reconnecting'
  | 'ended'
  | 'error';

export type LandingAgentLanguage = 'ar' | 'en';

export type LandingAgentClientEvent =
  | { type: 'session.start'; language?: LandingAgentLanguage }
  | { type: 'audio.chunk'; data: string }
  | { type: 'audio.stop' }
  | { type: 'barge_in' }
  | { type: 'session.end' };

export type LandingAgentServerEvent =
  | { type: 'session.ready'; sessionId: string }
  | { type: 'agent.state'; state: AgentState }
  | { type: 'transcript.user'; text: string; final: boolean }
  | { type: 'transcript.agent'; text: string }
  | { type: 'audio.chunk'; data: string; format: string }
  | { type: 'session.limit'; reason: string }
  | { type: 'error'; code: string; message: string }
  | { type: 'session.ended' };

export interface TranscriptEntry {
  id: string;
  speaker: 'user' | 'agent';
  text: string;
  final: boolean;
}

export type MicrophonePermission =
  | 'prompt'
  | 'requesting'
  | 'granted'
  | 'denied'
  | 'unsupported';
