"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";
import { useAuth } from "@/context/AuthContext";
import { useContracts, useUpdateContractStatus, useDeleteContract, useGigs, Contract, Gig } from "@/hooks/useApi";
import { Check, X, Trash2, MessageCircle, Clock, FileText, ArrowLeft } from "lucide-react";

type TabType = "all" | "pending" | "accepted" | "rejected";

export default function ContractsPage() {
  const router = useRouter();
  const { token, authUser, loading: authLoading } = useAuth();
  const [activeTab, setActiveTab] = useState<TabType>("all");

  const { data: contracts = [], isLoading, refetch } = useContracts(token ?? undefined);
  const { data: allGigs = [] } = useGigs(token ?? undefined);
  const updateStatus = useUpdateContractStatus();
  const deleteContract = useDeleteContract();

  useEffect(() => {
    if (!authLoading && !token) {
      router.replace("/register");
    }
  }, [authLoading, token, router]);

  const gigMap = new Map<string, Gig>();
  allGigs.forEach((g) => gigMap.set(g.id, g));

  const filteredContracts = contracts.filter((c) => {
    if (activeTab === "all") return true;
    return c.status.toLowerCase() === activeTab;
  });

  const pendingCount = contracts.filter((c) => c.status.toLowerCase() === "pending").length;
  const acceptedCount = contracts.filter((c) => c.status.toLowerCase() === "accepted").length;

  const handleAccept = async (contractId: string) => {
    try {
      await updateStatus.mutateAsync({ id: contractId, status: "Accepted", token: token ?? undefined });
      refetch();
    } catch (err) {
      console.error("Failed to accept contract:", err);
    }
  };

  const handleReject = async (contractId: string) => {
    try {
      await updateStatus.mutateAsync({ id: contractId, status: "Rejected", token: token ?? undefined });
      refetch();
    } catch (err) {
      console.error("Failed to reject contract:", err);
    }
  };

  const handleDelete = async (contractId: string) => {
    try {
      await deleteContract.mutateAsync({ id: contractId, token: token ?? undefined });
      refetch();
    } catch (err) {
      console.error("Failed to delete contract:", err);
    }
  };

  const getStatusBadge = (status: string) => {
    const s = status.toLowerCase();
    if (s === "pending") return "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400";
    if (s === "accepted") return "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400";
    if (s === "rejected") return "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400";
    return "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300";
  };

  const tabs: { key: TabType; label: string; count?: number }[] = [
    { key: "all", label: "All", count: contracts.length },
    { key: "pending", label: "Pending", count: pendingCount },
    { key: "accepted", label: "Accepted", count: acceptedCount },
    { key: "rejected", label: "Rejected" },
  ];

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-8 mt-8">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <Header />
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-8">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mb-4"
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </button>

        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Contracts</h1>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === tab.key
                  ? "bg-red-500 text-white"
                  : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600"
              }`}
            >
              {tab.label}
              {tab.count !== undefined && tab.count > 0 && (
                <span className={`ml-1.5 px-1.5 py-0.5 rounded-full text-xs ${
                  activeTab === tab.key ? "bg-white/20 text-white" : "bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Contracts List */}
        {filteredContracts.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 text-center">
            <FileText size={48} className="mx-auto mb-4 text-gray-300 dark:text-gray-600" />
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              {activeTab === "all"
                ? "No contracts yet."
                : `No ${activeTab} contracts.`}
            </p>
            <Link
              href="/explore"
              className="inline-block px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Explore Gigs
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredContracts.map((contract) => {
              const gig = gigMap.get(contract.gig_id);
              const isClient = contract.user_id === authUser?.id;
              const isFreelancer = gig?.user_id === authUser?.id;
              const isPending = contract.status.toLowerCase() === "pending";
              const isAccepted = contract.status.toLowerCase() === "accepted";

              return (
                <div
                  key={contract.id}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 p-4 sm:p-6"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                          {gig ? gig.title : "Unknown Gig"}
                        </h3>
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(contract.status)}`}>
                          {contract.status}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500 dark:text-gray-400">
                        {gig && (
                          <span className="font-medium text-red-600">
                            ${gig.price.toFixed(2)}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <Clock size={14} />
                          {new Date(contract.created_at).toLocaleDateString()}
                        </span>
                        <span className="text-gray-400 dark:text-gray-500">
                          {isClient ? "You hired" : "Client request"}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 flex-shrink-0 flex-wrap">
                      {/* Freelancer: Accept/Reject pending contracts */}
                      {isFreelancer && isPending && (
                        <>
                          <button
                            onClick={() => handleAccept(contract.id)}
                            disabled={updateStatus.isPending}
                            className="flex items-center gap-1 px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm font-medium disabled:opacity-50"
                          >
                            <Check size={16} />
                            Accept
                          </button>
                          <button
                            onClick={() => handleReject(contract.id)}
                            disabled={updateStatus.isPending}
                            className="flex items-center gap-1 px-3 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors text-sm font-medium disabled:opacity-50"
                          >
                            <X size={16} />
                            Reject
                          </button>
                        </>
                      )}

                      {/* Client: Cancel pending contracts */}
                      {isClient && isPending && (
                        <button
                          onClick={() => handleDelete(contract.id)}
                          disabled={deleteContract.isPending}
                          className="flex items-center gap-1 px-3 py-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors text-sm font-medium disabled:opacity-50"
                        >
                          <Trash2 size={16} />
                          Cancel
                        </button>
                      )}

                      {/* Message button for accepted contracts */}
                      {isAccepted && (
                        <Link
                          href={`/messages/${contract.id}`}
                          className="flex items-center gap-1 px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-medium"
                        >
                          <MessageCircle size={16} />
                          Message
                        </Link>
                      )}

                      {/* View gig */}
                      {gig && (
                        <Link
                          href={`/explore/${gig.id}`}
                          className="px-3 py-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors text-sm"
                        >
                          View Gig
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
