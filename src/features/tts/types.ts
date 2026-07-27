export enum TTSVoice {
  ABDULLAH = 'abdullah',
  FAHAD = 'fahad',
  SULTAN = 'sultan',
  LULWA = 'lulwa',
  NOURA = 'noura',
  AISHA = 'aisha',
}

export type GenerateTTSDto = {
  text: string;
  voice: TTSVoice;
};
