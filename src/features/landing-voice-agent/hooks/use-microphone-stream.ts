'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { floatToPcm16Base64 } from '../lib/audio';
import {
  LANDING_AGENT_CHUNK_SIZE,
  LANDING_AGENT_SAMPLE_RATE,
} from '../lib/constants';
import type { MicrophonePermission } from '../types/landing-agent.types';

export function useMicrophoneStream(onChunk: (data: string) => void) {
  const [permission, setPermission] = useState<MicrophonePermission>('prompt');
  const [muted, setMuted] = useState(false);
  const [level, setLevel] = useState(0);
  const streamRef = useRef<MediaStream | null>(null);
  const contextRef = useRef<AudioContext | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const mutedRef = useRef(false);
  const onChunkRef = useRef(onChunk);
  useEffect(() => {
    onChunkRef.current = onChunk;
  }, [onChunk]);

  const stop = useCallback(() => {
    processorRef.current?.disconnect();
    sourceRef.current?.disconnect();
    streamRef.current?.getTracks().forEach(track => track.stop());
    void contextRef.current?.close();
    processorRef.current = null;
    sourceRef.current = null;
    streamRef.current = null;
    contextRef.current = null;
    setLevel(0);
    setMuted(false);
    mutedRef.current = false;
  }, []);

  const start = useCallback(async () => {
    if (!navigator.mediaDevices?.getUserMedia || !window.AudioContext) {
      setPermission('unsupported');
      throw new Error('unsupported');
    }

    setPermission('requesting');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          channelCount: 1,
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
          sampleRate: LANDING_AGENT_SAMPLE_RATE,
        },
      });
      const context = new AudioContext({
        sampleRate: LANDING_AGENT_SAMPLE_RATE,
      });
      const source = context.createMediaStreamSource(stream);
      // ScriptProcessor has wider browser support than AudioWorklet and keeps this
      // isolated feature free of a separately hosted worklet asset.
      const processor = context.createScriptProcessor(
        LANDING_AGENT_CHUNK_SIZE,
        1,
        1
      );
      processor.onaudioprocess = event => {
        if (mutedRef.current) return;
        const input = event.inputBuffer.getChannelData(0);
        let sum = 0;
        for (const sample of input) sum += sample * sample;
        setLevel(Math.min(1, Math.sqrt(sum / input.length) * 5));
        onChunkRef.current(floatToPcm16Base64(input));
      };
      source.connect(processor);
      processor.connect(context.destination);
      streamRef.current = stream;
      contextRef.current = context;
      sourceRef.current = source;
      processorRef.current = processor;
      setPermission('granted');
    } catch (error) {
      setPermission(
        error instanceof DOMException &&
          ['NotAllowedError', 'PermissionDeniedError'].includes(error.name)
          ? 'denied'
          : 'prompt'
      );
      stop();
      throw error;
    }
  }, [stop]);

  const toggleMute = useCallback(() => {
    mutedRef.current = !mutedRef.current;
    setMuted(mutedRef.current);
    streamRef.current?.getAudioTracks().forEach(track => {
      track.enabled = !mutedRef.current;
    });
  }, []);

  useEffect(() => stop, [stop]);

  return { permission, muted, level, start, stop, toggleMute };
}
