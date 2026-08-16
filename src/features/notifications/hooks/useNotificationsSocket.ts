'use client';

import { useCallback, useEffect, useRef } from 'react';

import { NOTIFICATIONS_RECONNECT_DELAYS_MS } from '../lib/constants';
import {
  getNotificationsWebSocketUrl,
  parseNotificationSocketEvent,
} from '../lib/notificationsSocket';
import type { NotificationSocketEvent } from '../types';

interface SocketOptions {
  enabled: boolean;
  onEvent: (event: NotificationSocketEvent) => void;
}

export function useNotificationsSocket({ enabled, onEvent }: SocketOptions) {
  const socketRef = useRef<WebSocket | null>(null);
  const eventRef = useRef(onEvent);
  const reconnectCountRef = useRef(0);
  const reconnectTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const shouldReconnectRef = useRef(false);
  const connectRef = useRef<() => void>(() => undefined);

  useEffect(() => {
    eventRef.current = onEvent;
  }, [onEvent]);

  const disconnect = useCallback(() => {
    shouldReconnectRef.current = false;
    if (reconnectTimerRef.current) clearTimeout(reconnectTimerRef.current);
    reconnectTimerRef.current = null;

    const socket = socketRef.current;
    socketRef.current = null;
    if (!socket) return;

    if (socket.readyState === WebSocket.OPEN) {
      socket.close(1000, 'Client disconnect');
      return;
    }
    if (socket.readyState === WebSocket.CONNECTING) {
      socket.onmessage = null;
      socket.onerror = null;
      socket.onclose = null;
      socket.onopen = () => socket.close(1000, 'Client disconnect');
    }
  }, []);

  const connect = useCallback(() => {
    let socketUrl: string;
    try {
      socketUrl = getNotificationsWebSocketUrl();
    } catch {
      return;
    }

    const socket = new WebSocket(socketUrl);
    socketRef.current = socket;

    socket.onmessage = message => {
      if (typeof message.data !== 'string') return;
      const event = parseNotificationSocketEvent(message.data);
      if (!event) return;

      if (event.type === 'ping') {
        socket.send(JSON.stringify({ type: 'pong' }));
        return;
      }
      eventRef.current(event);
    };

    socket.onopen = () => {
      reconnectCountRef.current = 0;
    };

    socket.onclose = closeEvent => {
      if (socketRef.current !== socket) return;
      socketRef.current = null;
      if (!shouldReconnectRef.current || closeEvent.code === 1000) return;
      const delay =
        NOTIFICATIONS_RECONNECT_DELAYS_MS[
          Math.min(
            reconnectCountRef.current,
            NOTIFICATIONS_RECONNECT_DELAYS_MS.length - 1
          )
        ];
      reconnectCountRef.current += 1;
      reconnectTimerRef.current = setTimeout(() => connectRef.current(), delay);
    };
  }, []);

  useEffect(() => {
    connectRef.current = connect;
  }, [connect]);

  useEffect(() => {
    if (!enabled) return undefined;

    shouldReconnectRef.current = true;
    reconnectCountRef.current = 0;
    connect();

    return () => {
      disconnect();
    };
  }, [enabled, connect, disconnect]);
}
