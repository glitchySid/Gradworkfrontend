"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";
import { useChatContext } from "@/context/ChatContext";
import { useAuth } from "@/context/AuthContext";

export default function MessagesPage() {
  const { conversations, isLoading } = useChatContext();
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/register");
    }
  }, [loading, user, router]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Header />
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500">
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <Header />
      <div className="flex-1 max-w-4xl mx-auto px-4 py-8 mt-16 w-full">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Messages</h1>

        {conversations.length === 0
          ? (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 text-center">
              <p className="text-gray-500 dark:text-gray-400 mb-4">No conversations yet.</p>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Start by exploring gigs and sending contract requests to
                freelancers.
              </p>
              <Link
                href="/explore"
                className="inline-block mt-4 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Explore Gigs
              </Link>
            </div>
          )
          : (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
              {conversations.map((conv) => (
                <Link
                  key={conv.contract_id}
                  href={`/messages/${conv.contract_id}`}
                  className="flex items-center p-4 hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-100 dark:border-gray-700 last:border-b-0 transition-colors"
                >
                  <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                    {conv.other_user_name.charAt(0).toUpperCase()}
                  </div>
                  <div className="ml-4 flex-1 min-w-0">
                    <div className="flex justify-between items-baseline">
                      <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                        {conv.other_user_name}
                      </h3>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {formatDate(conv.last_message_at)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                      {conv.last_message}
                    </p>
                  </div>
                  {conv.unread_count > 0 && (
                    <div className="ml-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      {conv.unread_count}
                    </div>
                  )}
                </Link>
              ))}
            </div>
          )}
      </div>
      <Footer />
    </div>
  );
}
