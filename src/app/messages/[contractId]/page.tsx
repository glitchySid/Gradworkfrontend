"use client";

import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Header from "@/components/ui/header";
import { type ChatMessage, useChat } from "@/hooks/useChat";
import { useAuth } from "@/context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { ArrowLeft, MessageCircle, Send } from "lucide-react";
import Link from "next/link";

interface ConversationDetail {
  contract_id: string;
  other_user_id: string;
  other_user_name: string;
  last_message: string;
  last_message_at: string;
  unread_count: number;
}

export default function ChatPage() {
  const params = useParams();
  const router = useRouter();
  const contractId = params.contractId as string;
  const { token, user } = useAuth();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [messageInput, setMessageInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { data: conversations = [] } = useQuery<ConversationDetail[]>({
    queryKey: ["conversations"],
    queryFn: () => api.get<ConversationDetail[]>("/chat/conversations", token!),
    enabled: !!token,
  });

  const currentConversation = conversations.find((c) =>
    c.contract_id === contractId
  );

  const {
    connected,
    messages,
    sendMessage,
    markAsRead,
    sendTyping,
    setMessages,
  } = useChat({
    contractId,
    token: token || "",
    onMessage: (msg) => {
      if (msg.sender_id !== user?.id) {
        markAsRead(msg.id);
      }
    },
  });

  const { data: historicalMessages = [] } = useQuery<ChatMessage[]>({
    queryKey: ["messages", contractId],
    queryFn: () =>
      api.get<ChatMessage[]>(`/chat/${contractId}/messages`, token!),
    enabled: !!token && !!contractId,
  });

  useEffect(() => {
    if (historicalMessages.length > 0) {
      setMessages(historicalMessages);
    }
  }, [historicalMessages, setMessages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (!messageInput.trim()) return;
    sendMessage(messageInput.trim());
    setMessageInput("");

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    sendTyping(false);
    setIsTyping(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessageInput(e.target.value);

    if (!isTyping) {
      setIsTyping(true);
      sendTyping(true);
    }

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      sendTyping(false);
      setIsTyping(false);
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  if (!token) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-500">Please log in to view messages.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full px-4 py-4 mt-16">
        <div className="bg-white rounded-lg shadow flex flex-col h-[calc(100vh-180px)]">
          <div className="flex items-center p-4 border-b border-gray-200">
            <Link
              href="/messages"
              className="mr-3 text-gray-500 hover:text-gray-700"
            >
              <ArrowLeft size={20} />
            </Link>
            <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-white font-bold">
              {currentConversation?.other_user_name?.charAt(0).toUpperCase() ||
                "?"}
            </div>
            <div className="ml-3">
              <h2 className="font-semibold text-gray-900">
                {currentConversation?.other_user_name || "Chat"}
              </h2>
              <p className="text-xs text-gray-500">
                {connected ? "Online" : "Offline"}
              </p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0
              ? (
                <div className="flex items-center justify-center h-full text-gray-500">
                  <div className="text-center">
                    <MessageCircle
                      size={48}
                      className="mx-auto mb-2 text-gray-300"
                    />
                    <p>No messages yet. Start the conversation!</p>
                  </div>
                </div>
              )
              : (
                messages.slice().reverse().map((msg) => {
                  const isOwnMessage = msg.sender_id === user?.id;
                  return (
                    <div
                      key={msg.id}
                      className={`flex ${
                        isOwnMessage ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[70%] rounded-lg px-4 py-2 ${
                          isOwnMessage
                            ? "bg-red-500 text-white"
                            : "bg-gray-100 text-gray-900"
                        }`}
                      >
                        <p className="break-words">{msg.content}</p>
                        <div
                          className={`flex items-center justify-end gap-1 mt-1 ${
                            isOwnMessage ? "text-red-100" : "text-gray-400"
                          }`}
                        >
                          <span className="text-xs">
                            {formatTime(msg.created_at)}
                          </span>
                          {isOwnMessage && (
                            <span className="text-xs">
                              {msg.is_read ? "✓✓" : "✓"}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={messageInput}
                onChange={handleInputChange}
                onKeyDown={handleKeyPress}
                placeholder="Type a message..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
              />
              <button
                onClick={handleSendMessage}
                disabled={!messageInput.trim()}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
