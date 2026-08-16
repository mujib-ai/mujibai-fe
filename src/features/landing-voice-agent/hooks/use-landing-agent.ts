'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { pcm16ToAudioBuffer } from '../lib/audio';
import { LANDING_AGENT_PLAYBACK_SAMPLE_RATE } from '../lib/constants';
import type {
  AgentState,
  LandingAgentServerEvent,
  TranscriptEntry,
} from '../types/landing-agent.types';
import { useLandingAgentSocket } from './use-landing-agent-socket';
import { useMicrophoneStream } from './use-microphone-stream';

export type LandingAgentError =
  | 'microphoneDenied'
  | 'unsupported'
  | 'configuration'
  | 'disabled'
  | 'origin'
  | 'rateLimit'
  | 'connections'
  | 'sessionLimit'
  | 'timeout'
  | 'provider'
  | 'audio'
  | 'connection'
  | 'unexpected';

function mapError(message: string): LandingAgentError {
  if (message === 'configuration') return 'configuration';
  if (message === 'landing_agent_disabled') return 'disabled';
  if (message === 'origin_not_allowed') return 'origin';
  if (message === 'rate_limited') return 'rateLimit';
  if (message === 'too_many_connections') return 'connections';
  if (
    [
      'token_limit_exceeded',
      'session_limit_reached',
      'audio_limit_exceeded',
    ].includes(message)
  )
    return 'sessionLimit';
  if (['connection_timeout', 'idle_timeout'].includes(message))
    return 'timeout';
  if (message === 'provider_failure') return 'provider';
  if (['bad_audio_format', 'payload_too_large'].includes(message))
    return 'audio';
  if (message === 'connection') return 'connection';
  return 'unexpected';
}

export function useLandingAgent() {
  const [state, setState] = useState<AgentState>('idle');
  const [error, setError] = useState<LandingAgentError | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [transcript, setTranscript] = useState<TranscriptEntry[]>([]);
  const playbackContextRef = useRef<AudioContext | null>(null);
  const playbackSourcesRef = useRef(new Set<AudioBufferSourceNode>());
  const playbackEndRef = useRef(0);
  const sessionEndingRef = useRef(false);
  const terminateTransportRef = useRef<() => void>(() => undefined);
  const stopMicrophoneRef = useRef<() => void>(() => undefined);

  const stopPlayback = useCallback(() => {
    playbackSourcesRef.current.forEach(source => {
      try {
        source.stop();
      } catch {
        // The source may already have completed.
      }
    });
    playbackSourcesRef.current.clear();
    playbackEndRef.current = 0;
  }, []);

  const playAudio = useCallback(async (data: ArrayBuffer) => {
    try {
      const context = playbackContextRef.current ?? new AudioContext();
      playbackContextRef.current = context;
      if (context.state === 'suspended') await context.resume();

      const source = context.createBufferSource();
      source.buffer = pcm16ToAudioBuffer(
        context,
        data,
        LANDING_AGENT_PLAYBACK_SAMPLE_RATE
      );
      source.connect(context.destination);
      const startAt = Math.max(context.currentTime, playbackEndRef.current);
      source.start(startAt);
      playbackEndRef.current = startAt + source.buffer.duration;
      playbackSourcesRef.current.add(source);
      source.onended = () => {
        playbackSourcesRef.current.delete(source);
        if (sessionEndingRef.current && playbackSourcesRef.current.size === 0) {
          setState('ended');
        }
      };
      setState('speaking');
    } catch {
      setError('audio');
      setState('error');
    }
  }, []);

  const handleServerEvent = useCallback(
    (event: LandingAgentServerEvent) => {
      switch (event.type) {
        case 'session_started':
          setSessionId(event.sessionId);
          setState('listening');
          break;
        case 'speech_started':
          if (event.bargeIn) stopPlayback();
          setState('listening');
          break;
        case 'speech_ended':
          setState('thinking');
          break;
        case 'transcript':
          setTranscript(current => [
            ...current,
            {
              id: crypto.randomUUID(),
              speaker: 'user',
              text: event.text,
              final: true,
            },
          ]);
          break;
        case 'assistant_audio_done':
          if (!sessionEndingRef.current) setState('listening');
          break;
        case 'session_ending':
          sessionEndingRef.current = true;
          stopMicrophoneRef.current();
          if (playbackSourcesRef.current.size === 0) setState('ended');
          break;
        case 'assistant_interrupted':
          stopPlayback();
          setState(sessionEndingRef.current ? 'ended' : 'listening');
          break;
        case 'error':
          setError(mapError(event.message));
          setState('error');
          terminateTransportRef.current();
          break;
      }
    },
    [stopPlayback]
  );

  const handleConnectionState = useCallback((next: 'connecting' | 'error') => {
    setState(next);
    if (next === 'error') setError(current => current ?? 'connection');
  }, []);

  const { connect, disconnect, sendAudio } = useLandingAgentSocket({
    onEvent: handleServerEvent,
    onAudio: data => void playAudio(data),
    onConnectionState: handleConnectionState,
  });
  const microphone = useMicrophoneStream(sendAudio);
  const { start: startMicrophone, stop: stopMicrophone } = microphone;

  const cleanup = useCallback(
    (sendEnd = false) => {
      stopMicrophone();
      disconnect(sendEnd);
      stopPlayback();
      void playbackContextRef.current?.close();
      playbackContextRef.current = null;
      setSessionId(null);
      sessionEndingRef.current = false;
    },
    [disconnect, stopMicrophone, stopPlayback]
  );

  const start = useCallback(async () => {
    setError(null);
    setTranscript([]);
    setSessionId(null);
    setState('connecting');
    try {
      await startMicrophone();
      connect();
    } catch (cause) {
      setError(
        microphone.permission === 'unsupported' ||
          (cause instanceof Error && cause.message === 'unsupported')
          ? 'unsupported'
          : 'microphoneDenied'
      );
      setState('error');
    }
  }, [connect, microphone.permission, startMicrophone]);

  const end = useCallback(() => {
    cleanup(true);
    setState('ended');
  }, [cleanup]);

  const reset = useCallback(() => {
    cleanup(false);
    setTranscript([]);
    setError(null);
    setState('idle');
  }, [cleanup]);

  useEffect(() => {
    terminateTransportRef.current = () => cleanup(false);
    stopMicrophoneRef.current = stopMicrophone;
  }, [cleanup, stopMicrophone]);

  useEffect(() => () => cleanup(false), [cleanup]);

  return {
    state,
    error,
    sessionId,
    transcript,
    microphone,
    start,
    end,
    reset,
  };
}
