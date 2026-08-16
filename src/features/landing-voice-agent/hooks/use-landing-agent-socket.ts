'use client';

import { useCallback, useEffect, useRef } from 'react';

import {
  getLandingAgentWebSocketUrl,
  parseServerEvent,
} from '../lib/websocket';
import type {
  LandingAgentClientEvent,
  LandingAgentServerEvent,
} from '../types/landing-agent.types';

interface SocketOptions {
  onEvent: (event: LandingAgentServerEvent) => void;
  onAudio: (data: ArrayBuffer) => void;
  onConnectionState: (state: 'connecting' | 'error') => void;
}

const AUDIO_FORMAT: LandingAgentClientEvent = {
  type: 'session_start',
  audio: {
    codec: 'pcm16',
    sample_rate: 16000,
    channels: 1,
    bit_depth: 16,
    source: 'browser',
  },
};

function closeError(code: number, reason: string): string | null {
  if (code === 4404) return 'landing_agent_disabled';
  if (code === 4403) return 'origin_not_allowed';
  if (code === 4429)
    return reason === 'too_many_connections'
      ? 'too_many_connections'
      : 'rate_limited';
  if (code !== 1000) return reason || 'connection';
  return null;
}

export function useLandingAgentSocket({
  onEvent,
  onAudio,
  onConnectionState,
}: SocketOptions) {
  const socketRef = useRef<WebSocket | null>(null);
  const sessionReadyRef = useRef(false);
  const sessionEndingRef = useRef(false);
  const eventRef = useRef(onEvent);
  const audioRef = useRef(onAudio);
  const stateRef = useRef(onConnectionState);

  useEffect(() => {
    eventRef.current = onEvent;
    audioRef.current = onAudio;
    stateRef.current = onConnectionState;
  }, [onAudio, onConnectionState, onEvent]);

  const send = useCallback((event: LandingAgentClientEvent) => {
    if (socketRef.current?.readyState !== WebSocket.OPEN) return false;
    socketRef.current.send(JSON.stringify(event));
    return true;
  }, []);

  const sendAudio = useCallback((data: ArrayBuffer) => {
    if (
      !sessionReadyRef.current ||
      socketRef.current?.readyState !== WebSocket.OPEN
    )
      return false;
    socketRef.current.send(data);
    return true;
  }, []);

  const disconnect = useCallback((sendEnd = false) => {
    sessionReadyRef.current = false;
    sessionEndingRef.current = false;
    const socket = socketRef.current;
    socketRef.current = null;
    if (!socket) return;

    if (socket.readyState === WebSocket.OPEN) {
      if (sendEnd) socket.send(JSON.stringify({ type: 'end_session' }));
      socket.close(1000, 'session_ended');
      return;
    }
    if (socket.readyState === WebSocket.CONNECTING) {
      socket.onmessage = null;
      socket.onerror = null;
      socket.onclose = null;
      socket.onopen = () => socket.close(1000, 'session_ended');
    }
  }, []);

  const connect = useCallback(() => {
    if (
      socketRef.current?.readyState === WebSocket.CONNECTING ||
      socketRef.current?.readyState === WebSocket.OPEN
    )
      return;

    let socketUrl: string;
    try {
      socketUrl = getLandingAgentWebSocketUrl();
    } catch {
      stateRef.current('error');
      eventRef.current({ type: 'error', message: 'configuration' });
      return;
    }

    stateRef.current('connecting');
    const socket = new WebSocket(socketUrl);
    socket.binaryType = 'arraybuffer';
    socketRef.current = socket;
    sessionReadyRef.current = false;
    sessionEndingRef.current = false;

    socket.onmessage = message => {
      if (message.data instanceof ArrayBuffer) {
        audioRef.current(message.data);
        return;
      }
      if (typeof message.data !== 'string') return;

      const event = parseServerEvent(message.data);
      if (!event) {
        eventRef.current({ type: 'error', message: 'invalid_control' });
        return;
      }
      if (event.type === 'session_started') {
        socket.send(JSON.stringify(AUDIO_FORMAT));
        sessionReadyRef.current = true;
      }
      if (event.type === 'session_ending') {
        sessionEndingRef.current = true;
        sessionReadyRef.current = false;
      }
      eventRef.current(event);
    };
    socket.onerror = () => {
      if (socketRef.current === socket) stateRef.current('error');
    };
    socket.onclose = closeEvent => {
      if (socketRef.current !== socket) return;
      socketRef.current = null;
      sessionReadyRef.current = false;
      const message = sessionEndingRef.current
        ? null
        : closeError(closeEvent.code, closeEvent.reason);
      if (message) eventRef.current({ type: 'error', message });
      sessionEndingRef.current = false;
    };
  }, []);

  useEffect(() => disconnect, [disconnect]);

  return { connect, disconnect, send, sendAudio };
}
