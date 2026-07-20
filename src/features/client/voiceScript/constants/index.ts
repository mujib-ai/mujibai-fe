export const VOICE_OPTIONS = [
  'abdullah',
  'aisha',
  'fahad',
  'sultan',
  'lulwa',
  'noura',
] as const;

export type VoiceOption = (typeof VOICE_OPTIONS)[number];
