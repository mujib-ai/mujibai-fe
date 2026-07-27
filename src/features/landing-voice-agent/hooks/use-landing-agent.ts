'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { base64ToArrayBuffer, pcm16ToAudioBuffer } from '../lib/audio';
import type {
  AgentState,
  LandingAgentLanguage,
  LandingAgentServerEvent,
  TranscriptEntry,
} from '../types/landing-agent.types';
import { useLandingAgentSocket } from './use-landing-agent-socket';
import { useMicrophoneStream } from './use-microphone-stream';

type ErrorKind =
  | 'microphoneDenied'
  | 'unsupported'
  | 'connection'
  | 'rateLimit'
  | 'sessionLimit'
  | 'audio'
  | 'unexpected'
  | 'configuration';

export function useLandingAgent(language: LandingAgentLanguage) {
  const [state, setState] = useState<AgentState>('idle');
  const [error, setError] = useState<ErrorKind | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [transcript, setTranscript] = useState<TranscriptEntry[]>([]);
  const playbackContextRef = useRef<AudioContext | null>(null);
  const playbackSourceRef = useRef<AudioBufferSourceNode | null>(null);
  const playbackEndRef = useRef(0);
  const endedRef = useRef(false);
  const terminateTransportRef = useRef<() => void>(() => undefined);

  const stopPlayback = useCallback(() => {
    try {
      playbackSourceRef.current?.stop();
    } catch {
      // A source that already ended cannot be stopped again.
    }
    playbackSourceRef.current = null;
    playbackEndRef.current = 0;
  }, []);

  const playAudio = useCallback(async (data: string, format: string) => {
    try {
      const context =
        playbackContextRef.current ??
        new AudioContext({
          sampleRate: format.includes('24000') ? 24_000 : 16_000,
        });
      playbackContextRef.current = context;
      if (context.state === 'suspended') await context.resume();
      const encoded = base64ToArrayBuffer(data);
      const buffer = format.toLowerCase().includes('pcm')
        ? pcm16ToAudioBuffer(
            context,
            encoded,
            format.includes('24000') ? 24_000 : 16_000
          )
        : await context.decodeAudioData(encoded.slice(0));
      const source = context.createBufferSource();
      source.buffer = buffer;
      source.connect(context.destination);
      const startAt = Math.max(context.currentTime, playbackEndRef.current);
      source.start(startAt);
      playbackEndRef.current = startAt + buffer.duration;
      playbackSourceRef.current = source;
    } catch {
      setError('audio');
    }
  }, []);

  const appendTranscript = useCallback(
    (speaker: 'user' | 'agent', text: string, final = true) => {
      setTranscript(current => {
        if (!final && speaker === 'user') {
          const last = current.at(-1);
          if (last?.speaker === 'user' && !last.final) {
            return [...current.slice(0, -1), { ...last, text }];
          }
        }
        return [...current, { id: crypto.randomUUID(), speaker, text, final }];
      });
    },
    []
  );

  const handleServerEvent = useCallback(
    (event: LandingAgentServerEvent) => {
      switch (event.type) {
        case 'session.ready':
          setSessionId(event.sessionId);
          setState('listening');
          break;
        case 'agent.state':
          setState(event.state);
          if (event.state === 'listening') stopPlayback();
          break;
        case 'transcript.user':
          appendTranscript('user', event.text, event.final);
          break;
        case 'transcript.agent':
          appendTranscript('agent', event.text);
          break;
        case 'audio.chunk':
          setState('speaking');
          void playAudio(event.data, event.format);
          break;
        case 'session.limit':
          endedRef.current = true;
          setError('sessionLimit');
          setState('ended');
          break;
        case 'error': {
          const code = event.code.toLowerCase();
          endedRef.current = code.includes('rate') || code.includes('limit');
          setError(
            code.includes('rate')
              ? 'rateLimit'
              : code.includes('limit')
                ? 'sessionLimit'
                : 'unexpected'
          );
          setState('error');
          break;
        }
        case 'session.ended':
          endedRef.current = true;
          setState('ended');
          break;
      }
    },
    [appendTranscript, playAudio, stopPlayback]
  );

  const handleConnectionState = useCallback(
    (next: 'connecting' | 'reconnecting' | 'error') => {
      setState(next);
      if (next === 'error')
        setError(
          process.env.NEXT_PUBLIC_LANDING_AGENT_WS_URL
            ? 'connection'
            : 'configuration'
        );
    },
    []
  );

  const { connect, disconnect, send } = useLandingAgentSocket({
    onEvent: handleServerEvent,
    onConnectionState: handleConnectionState,
  });

  const handleMicrophoneChunk = useCallback(
    (data: string) => {
      send({ type: 'audio.chunk', data });
    },
    [send]
  );
  const microphone = useMicrophoneStream(handleMicrophoneChunk);
  const { start: startMicrophone, stop: stopMicrophone } = microphone;

  const cleanup = useCallback(
    (sendEnd = false) => {
      stopMicrophone();
      disconnect(sendEnd ? { type: 'session.end' } : undefined);
      stopPlayback();
      void playbackContextRef.current?.close();
      playbackContextRef.current = null;
      setSessionId(null);
    },
    [disconnect, stopMicrophone, stopPlayback]
  );

  const start = useCallback(async () => {
    setError(null);
    setTranscript([]);
    setSessionId(null);
    endedRef.current = false;
    setState('connecting');
    try {
      await startMicrophone();
      connect({ type: 'session.start', language });
    } catch (cause) {
      setError(
        microphone.permission === 'unsupported' ||
          (cause instanceof Error && cause.message === 'unsupported')
          ? 'unsupported'
          : 'microphoneDenied'
      );
      setState('error');
    }
  }, [connect, language, microphone.permission, startMicrophone]);

  const end = useCallback(() => {
    endedRef.current = true;
    cleanup(true);
    setState('ended');
  }, [cleanup]);

  const bargeIn = useCallback(() => {
    if (state !== 'speaking') return;
    stopPlayback();
    send({ type: 'barge_in' });
    send({ type: 'audio.stop' });
    setState('listening');
  }, [send, state, stopPlayback]);

  const reset = useCallback(() => {
    cleanup(!endedRef.current);
    setTranscript([]);
    setError(null);
    setState('idle');
  }, [cleanup]);

  useEffect(() => {
    terminateTransportRef.current = () => cleanup(false);
  }, [cleanup]);

  useEffect(() => reset, [reset]);

  return {
    state,
    error,
    sessionId,
    transcript,
    microphone,
    start,
    end,
    reset,
    bargeIn,
  };
}
