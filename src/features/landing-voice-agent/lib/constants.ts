export const LANDING_AGENT_WS_ENV =
  process.env.NEXT_PUBLIC_LANDING_AGENT_WS_URL;

export const LANDING_AGENT_SAMPLE_RATE = 16_000;
export const LANDING_AGENT_CHUNK_SIZE = 2_048;
export const LANDING_AGENT_MAX_RECONNECTS = 2;
export const LANDING_AGENT_RECONNECT_DELAY_MS = 1_000;

export const PUBLIC_LANDING_AGENT_ROUTES = [
  '/',
  '/about',
  '/pricing',
  '/contact',
  '/features',
  '/industries',
  '/ai-voice-agent',
  '/ai-call-center',
  '/arabic-ai-receptionist',
  '/automated-customer-service',
  '/after-hours-call-answering',
] as const;
