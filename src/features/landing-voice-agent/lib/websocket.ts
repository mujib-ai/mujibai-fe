import type { LandingAgentServerEvent } from '../types/landing-agent.types';

const SERVER_EVENT_TYPES = new Set([
  'session_started',
  'speech_started',
  'speech_ended',
  'transcript',
  'assistant_text_delta',
  'assistant_text_done',
  'assistant_audio_done',
  'session_ending',
  'assistant_interrupted',
  'error',
]);

export function getLandingAgentWebSocketUrl(): string {
  const configured = process.env.NEXT_PUBLIC_LANDING_AGENT_WS_URL;
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const value =
    configured ??
    (apiUrl
      ? `${apiUrl.replace(/^http/, 'ws').replace(/\/$/, '')}/ws/public/landing-agent`
      : null);
  if (!value) throw new Error('configuration');

  const url = new URL(value);
  if (!['ws:', 'wss:'].includes(url.protocol)) throw new Error('configuration');
  if (url.pathname !== '/ws/public/landing-agent')
    throw new Error('configuration');
  if (window.location.protocol === 'https:' && url.protocol !== 'wss:')
    throw new Error('configuration');

  return url.toString();
}

export function parseServerEvent(
  value: string
): LandingAgentServerEvent | null {
  try {
    const event: unknown = JSON.parse(value);
    if (
      !event ||
      typeof event !== 'object' ||
      !('type' in event) ||
      typeof event.type !== 'string' ||
      !SERVER_EVENT_TYPES.has(event.type)
    ) {
      return null;
    }
    return event as LandingAgentServerEvent;
  } catch {
    return null;
  }
}
