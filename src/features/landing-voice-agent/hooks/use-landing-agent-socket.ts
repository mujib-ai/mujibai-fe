'use client';

import { useCallback, useEffect, useRef } from 'react';

import {
  LANDING_AGENT_MAX_RECONNECTS,
  LANDING_AGENT_RECONNECT_DELAY_MS,
} from '../lib/constants';
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
  onConnectionState: (state: 'connecting' | 'reconnecting' | 'error') => void;
}

export function useLandingAgentSocket({
  onEvent,
  onConnectionState,
}: SocketOptions) {
  const socketRef = useRef<WebSocket | null>(null);
  const eventRef = useRef(onEvent);
  const stateRef = useRef(onConnectionState);
  const reconnectCountRef = useRef(0);
  const reconnectTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const shouldReconnectRef = useRef(false);
  const initialEventRef = useRef<LandingAgentClientEvent | null>(null);
  const connectSocketRef = useRef<() => void>(() => undefined);
  useEffect(() => {
    eventRef.current = onEvent;
    stateRef.current = onConnectionState;
  }, [onEvent, onConnectionState]);

  const send = useCallback((event: LandingAgentClientEvent) => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(event));
      return true;
    }
    return false;
  }, []);

  const disconnect = useCallback((event?: LandingAgentClientEvent) => {
    shouldReconnectRef.current = false;
    if (reconnectTimerRef.current) clearTimeout(reconnectTimerRef.current);
    reconnectTimerRef.current = null;

    const socket = socketRef.current;
    socketRef.current = null;
    if (!socket) return;

    if (socket.readyState === WebSocket.OPEN) {
      if (event) socket.send(JSON.stringify(event));
      socket.close(1000, 'Session closed');
      return;
    }

    if (socket.readyState === WebSocket.CONNECTING) {
      socket.onmessage = null;
      socket.onerror = null;
      socket.onclose = null;
      socket.onopen = () => socket.close(1000, 'Session closed');
    }
  }, []);

  const connectSocket = useCallback(() => {
    let socketUrl: string;
    try {
      socketUrl = getLandingAgentWebSocketUrl();
    } catch {
      stateRef.current('error');
      return;
    }

    const socket = new WebSocket(socketUrl);
    socketRef.current = socket;
    socket.onopen = () => {
      if (initialEventRef.current) send(initialEventRef.current);
    };
    socket.onmessage = message => {
      if (typeof message.data !== 'string') return;
      const event = parseServerEvent(message.data);
      if (event) eventRef.current(event);
      else
        eventRef.current({
          type: 'error',
          code: 'unexpected_message',
          message: 'Unexpected server message',
        });
    };
    socket.onerror = () => undefined;
    socket.onclose = closeEvent => {
      if (socketRef.current !== socket) return;
      socketRef.current = null;
      if (!shouldReconnectRef.current || closeEvent.code === 1000) return;
      if (reconnectCountRef.current >= LANDING_AGENT_MAX_RECONNECTS) {
        stateRef.current('error');
        return;
      }
      reconnectCountRef.current += 1;
      stateRef.current('reconnecting');
      reconnectTimerRef.current = setTimeout(
        () => connectSocketRef.current(),
        LANDING_AGENT_RECONNECT_DELAY_MS * reconnectCountRef.current
      );
    };
  }, [send]);

  useEffect(() => {
    connectSocketRef.current = connectSocket;
  }, [connectSocket]);

  const connect = useCallback(
    (initialEvent: LandingAgentClientEvent) => {
      if (
        socketRef.current?.readyState === WebSocket.CONNECTING ||
        socketRef.current?.readyState === WebSocket.OPEN
      ) {
        return;
      }
      disconnect();
      reconnectCountRef.current = 0;
      shouldReconnectRef.current = true;
      initialEventRef.current = initialEvent;
      stateRef.current('connecting');
      connectSocket();
    },
    [connectSocket, disconnect]
  );

  useEffect(() => disconnect, [disconnect]);

  return { connect, disconnect, send };
}
