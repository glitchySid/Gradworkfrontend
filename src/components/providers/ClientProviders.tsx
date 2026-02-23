"use client";

import { useAuth } from "@/context/AuthContext";
import { ChatProvider } from "@/context/ChatContext";

export function ClientProviders({ children }: { children: React.ReactNode }) {
  const { token, loading } = useAuth();

  if (loading) {
    return null;
  }

  return (
    <ChatProvider token={token}>
      {children}
    </ChatProvider>
  );
}
