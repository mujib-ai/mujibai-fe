'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import {
  LandingSTTClient,
  type LandingSTTMessage,
} from '../lib/landing-stt-client';

type UseLandingSTTOptions = {
  onTranscript: (text: string, language: 'ar' | 'other') => void;
};

export function useLandingSTT({ onTranscript }: UseLandingSTTOptions) {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const clientRef = useRef<LandingSTTClient | null>(null);
  const transcriptRef = useRef(onTranscript);

  useEffect(() => {
    transcriptRef.current = onTranscript;
  }, [onTranscript]);

  const handleMessage = useCallback((message: LandingSTTMessage) => {
    switch (message.type) {
      case 'speech_started':
        setIsSpeaking(true);
        break;
      case 'speech_ended':
        setIsSpeaking(false);
        break;
      case 'transcript':
        if (message.language === 'ar') {
          transcriptRef.current(message.text, message.language);
        }
        break;
      case 'error':
        setError(message.message);
        break;
    }
  }, []);

  const stop = useCallback(() => {
    clientRef.current?.stop();
    clientRef.current = null;
    setIsListening(false);
    setIsSpeaking(false);
  }, []);

  const start = useCallback(async () => {
    if (clientRef.current) return;

    setError(null);
    const client = new LandingSTTClient({
      onMessage: handleMessage,
      onError: nextError => setError(nextError.message),
      onClose: () => {
        clientRef.current = null;
        setIsListening(false);
        setIsSpeaking(false);
      },
    });
    clientRef.current = client;

    try {
      await client.start();
      setIsListening(true);
    } catch (startError) {
      clientRef.current = null;
      setError(
        startError instanceof DOMException &&
          startError.name === 'NotAllowedError'
          ? 'permission_denied'
          : startError instanceof Error
            ? startError.message
            : 'connection_failed'
      );
      setIsListening(false);
    }
  }, [handleMessage]);

  useEffect(() => stop, [stop]);

  return { isListening, isSpeaking, error, start, stop };
}
