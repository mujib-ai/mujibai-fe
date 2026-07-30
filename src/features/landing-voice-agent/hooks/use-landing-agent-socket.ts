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
    const canSend = socketRef.current?.readyState === WebSocket.OPEN;
    console.log('[landing-agent-socket] send()', {
      event,
      canSend,
      readyState: socketRef.current?.readyState,
    });
    if (canSend) {
      socketRef.current!.send(JSON.stringify(event));
      return true;
    }
    return false;
  }, []);

  const disconnect = useCallback((event?: LandingAgentClientEvent) => {
    console.log('[landing-agent-socket] disconnect() called', {
      hasSocket: !!socketRef.current,
      readyState: socketRef.current?.readyState,
      event,
    });
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
    } catch (err) {
      console.log('[landing-agent-socket] failed to resolve socket url', err);
      stateRef.current('error');
      return;
    }

    console.log('[landing-agent-socket] connecting', { socketUrl });
    const socket = new WebSocket(socketUrl);
    socketRef.current = socket;
    socket.onopen = () => {
      console.log('[landing-agent-socket] onopen', {
        hasInitialEvent: !!initialEventRef.current,
      });
      if (initialEventRef.current) send(initialEventRef.current);
    };
    socket.onmessage = message => {
      if (typeof message.data !== 'string') {
        console.log(
          '[landing-agent-socket] onmessage: non-string data, ignoring',
          {
            dataType: typeof message.data,
          }
        );
        return;
      }
      const event = parseServerEvent(message.data);
      console.log('[landing-agent-socket] onmessage', {
        raw: message.data,
        parsed: event,
      });
      if (event) eventRef.current(event);
      else
        eventRef.current({
          type: 'error',
          code: 'unexpected_message',
          message: 'Unexpected server message',
        });
    };
    socket.onerror = errorEvent => {
      console.log('[landing-agent-socket] onerror', errorEvent);
    };
    socket.onclose = closeEvent => {
      console.log('[landing-agent-socket] onclose', {
        code: closeEvent.code,
        reason: closeEvent.reason,
        wasClean: closeEvent.wasClean,
        shouldReconnect: shouldReconnectRef.current,
        reconnectCount: reconnectCountRef.current,
        isCurrentSocket: socketRef.current === socket,
      });
      if (socketRef.current !== socket) return;
      socketRef.current = null;
      if (!shouldReconnectRef.current || closeEvent.code === 1000) return;
      if (reconnectCountRef.current >= LANDING_AGENT_MAX_RECONNECTS) {
        console.log(
          '[landing-agent-socket] max reconnects reached, giving up',
          {
            maxReconnects: LANDING_AGENT_MAX_RECONNECTS,
          }
        );
        stateRef.current('error');
        return;
      }
      reconnectCountRef.current += 1;
      console.log('[landing-agent-socket] scheduling reconnect', {
        attempt: reconnectCountRef.current,
        delayMs: LANDING_AGENT_RECONNECT_DELAY_MS * reconnectCountRef.current,
      });
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
      console.log('[landing-agent-socket] connect() called', {
        initialEvent,
        readyState: socketRef.current?.readyState,
      });
      if (
        socketRef.current?.readyState === WebSocket.CONNECTING ||
        socketRef.current?.readyState === WebSocket.OPEN
      ) {
        console.log(
          '[landing-agent-socket] connect() skipped, already connecting/open'
        );
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
