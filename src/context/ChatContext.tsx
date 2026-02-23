"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';

export interface Conversation {
  contract_id: string;
  other_user_id: string;
  other_user_name: string;
  last_message: string;
  last_message_at: string;
  unread_count: number;
}

interface ChatContextType {
  conversations: Conversation[];
  isLoading: boolean;
  activeContractId: string | null;
  setActiveContractId: (id: string | null) => void;
  refetchConversations: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children, token }: { children: ReactNode; token: string | null }) {
  const [activeContractId, setActiveContractId] = useState<string | null>(null);

  const { data: conversations = [], isLoading, refetch } = useQuery<Conversation[]>({
    queryKey: ['conversations'],
    queryFn: () => api.get<Conversation[]>('/chat/conversations', token!),
    enabled: !!token,
  });

  const refetchConversations = useCallback(() => {
    refetch();
  }, [refetch]);

  return (
    <ChatContext.Provider
      value={{
        conversations,
        isLoading,
        activeContractId,
        setActiveContractId,
        refetchConversations,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChatContext() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }
  return context;
}
