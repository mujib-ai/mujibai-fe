import type { LandingAgentServerEvent } from '../types/landing-agent.types';

const SERVER_EVENT_TYPES = new Set([
  'session.ready',
  'agent.state',
  'transcript.user',
  'transcript.agent',
  'audio.chunk',
  'session.limit',
  'error',
  'session.ended',
]);

export function getLandingAgentWebSocketUrl(value?: string): string {
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
