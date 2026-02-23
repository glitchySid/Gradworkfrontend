import { useEffect, useRef, useState, useCallback } from 'react';

export interface ChatMessage {
  id: string;
  contract_id: string;
  sender_id: string;
  content: string;
  is_read: boolean;
  created_at: string;
}

export interface ChatState {
  connected: boolean;
  messages: ChatMessage[];
  typingUsers: Map<string, boolean>;
  onlineUsers: Set<string>;
}

interface UseChatOptions {
  contractId: string;
  token: string;
  onMessage?: (message: ChatMessage) => void;
  onTyping?: (userId: string, isTyping: boolean) => void;
  onPresence?: (userId: string, online: boolean) => void;
  onError?: (error: string) => void;
}

interface SendMessagePayload {
  type: 'send_message';
  content: string;
}

interface MarkReadPayload {
  type: 'mark_read';
  message_id: string;
}

interface TypingPayload {
  type: 'typing' | 'stop_typing';
}

type WSMessage = SendMessagePayload | MarkReadPayload | TypingPayload;

export function useChat({ contractId, token, onMessage, onTyping, onPresence, onError }: UseChatOptions) {
  const wsRef = useRef<WebSocket | null>(null);
  const [state, setState] = useState<ChatState>({
    connected: false,
    messages: [],
    typingUsers: new Map(),
    onlineUsers: new Set(),
  });

  const onMessageRef = useRef(onMessage);
  const onTypingRef = useRef(onTyping);
  const onPresenceRef = useRef(onPresence);
  const onErrorRef = useRef(onError);

  useEffect(() => {
    onMessageRef.current = onMessage;
    onTypingRef.current = onTyping;
    onPresenceRef.current = onPresence;
    onErrorRef.current = onError;
  }, [onMessage, onTyping, onPresence, onError]);

  const connect = useCallback(() => {
    if (!contractId || !token) return;

    const wsUrl = `ws://127.0.0.1:8080/api/chat/ws/${contractId}?token=${token}`;
    const ws = new WebSocket(wsUrl);

    ws.onopen = () => {
      setState(prev => ({ ...prev, connected: true }));
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        switch (data.type) {
          case 'new_message': {
            const message: ChatMessage = {
              id: data.id,
              contract_id: contractId,
              sender_id: data.sender_id,
              content: data.content,
              is_read: false,
              created_at: data.created_at,
            };
            setState(prev => ({
              ...prev,
              messages: [message, ...prev.messages],
            }));
            onMessageRef.current?.(message);
            break;
          }
          case 'message_read': {
            setState(prev => ({
              ...prev,
              messages: prev.messages.map(m =>
                m.id === data.message_id ? { ...m, is_read: true } : m
              ),
            }));
            break;
          }
          case 'user_typing': {
            setState(prev => {
              const newTyping = new Map(prev.typingUsers);
              newTyping.set(data.user_id, true);
              return { ...prev, typingUsers: newTyping };
            });
            onTypingRef.current?.(data.user_id, true);
            break;
          }
          case 'user_stop_typing': {
            setState(prev => {
              const newTyping = new Map(prev.typingUsers);
              newTyping.set(data.user_id, false);
              return { ...prev, typingUsers: newTyping };
            });
            onTypingRef.current?.(data.user_id, false);
            break;
          }
          case 'presence': {
            setState(prev => {
              const newOnline = new Set(prev.onlineUsers);
              if (data.online) {
                newOnline.add(data.user_id);
              } else {
                newOnline.delete(data.user_id);
              }
              return { ...prev, onlineUsers: newOnline };
            });
            onPresenceRef.current?.(data.user_id, data.online);
            break;
          }
          case 'error': {
            onErrorRef.current?.(data.message);
            break;
          }
        }
      } catch (err) {
        console.error('Failed to parse WebSocket message:', err);
      }
    };

    ws.onclose = () => {
      setState(prev => ({ ...prev, connected: false }));
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      onErrorRef.current?.('Connection error');
    };

    wsRef.current = ws;
  }, [contractId, token]);

  const disconnect = useCallback(() => {
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
    setState(prev => ({ ...prev, connected: false }));
  }, []);

  const sendMessage = useCallback((content: string) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ type: 'send_message', content }));
    }
  }, []);

  const markAsRead = useCallback((messageId: string) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ type: 'mark_read', message_id: messageId }));
    }
  }, []);

  const sendTyping = useCallback((isTyping: boolean) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ type: isTyping ? 'typing' : 'stop_typing' }));
    }
  }, []);

  const setMessages = useCallback((messages: ChatMessage[]) => {
    setState(prev => ({ ...prev, messages }));
  }, []);

  const connectRef = useRef(connect);
  const disconnectRef = useRef(disconnect);

  useEffect(() => {
    connectRef.current = connect;
    disconnectRef.current = disconnect;
  }, [connect, disconnect]);

  useEffect(() => {
    connectRef.current();
    return () => disconnectRef.current();
  }, []);

  return {
    ...state,
    sendMessage,
    markAsRead,
    sendTyping,
    setMessages,
    disconnect,
    connect,
  };
}
