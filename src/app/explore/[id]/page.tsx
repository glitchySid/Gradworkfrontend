"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Briefcase, Clock, Tag, User as UserIcon } from "lucide-react";
import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";
import { useGig, useUser, useCreateContract } from "@/hooks/useApi";
import { useAuth } from "@/context/AuthContext";

const CATEGORY_LABELS: Record<string, string> = {
  web_development: "Web Development",
  mobile_development: "Mobile Development",
  data_science: "Data Science",
  design: "Design",
  video_editing: "Video Editing",
  content_writing: "Content Writing",
  other: "Other",
};

export default function GigDetailPage() {
  const params = useParams();
  const router = useRouter();
  const gigId = params.id as string;
  const { token, authUser } = useAuth();

  const { data: gig, isLoading, error } = useGig(gigId, token ?? undefined);
  const { data: gigOwner } = useUser(gig?.user_id ?? "", token ?? undefined);
  const createContract = useCreateContract();

  const [hireStatus, setHireStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [hireError, setHireError] = useState("");

  const isOwnGig = authUser?.id === gig?.user_id;

  const handleHire = async () => {
    if (!token) {
      router.push("/register");
      return;
    }

    setHireStatus("loading");
    setHireError("");

    try {
      await createContract.mutateAsync({ gig_id: gigId, token: token ?? undefined });
      setHireStatus("success");
    } catch (err: unknown) {
      setHireStatus("error");
      if (err instanceof Error) {
        if (err.message.includes("409") || err.message.toLowerCase().includes("duplicate")) {
          setHireError("You have already sent a request for this gig.");
        } else if (err.message.includes("400")) {
          setHireError("You cannot hire yourself.");
        } else {
          setHireError(err.message);
        }
      } else {
        setHireError("Failed to send hire request.");
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-8 mt-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3" />
            <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-xl" />
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-2/3" />
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full" />
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !gig) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Gig Not Found</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">This gig may have been removed or doesn&apos;t exist.</p>
          <Link
            href="/explore"
            className="inline-block px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Browse Gigs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mb-6"
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Thumbnail */}
            <div className="relative aspect-video bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden">
              {gig.thumbnail_url ? (
                <Image
                  src={gig.thumbnail_url}
                  alt={gig.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Briefcase size={64} className="text-gray-300" />
                </div>
              )}
            </div>

            {/* Title & Category */}
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3">{gig.title}</h1>
              {gig.category && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full text-sm font-medium">
                  <Tag size={14} />
                  {CATEGORY_LABELS[gig.category] || gig.category}
                </span>
              )}
            </div>

            {/* Description */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Description</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-wrap">
                {gig.description || "No description provided."}
              </p>
            </div>

            {/* Posted Date */}
            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm">
              <Clock size={16} />
              <span>Posted {new Date(gig.created_at).toLocaleDateString()}</span>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Price Card */}
            <div className="bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 rounded-xl p-6 shadow-sm">
              <div className="text-center mb-6">
                <span className="text-sm text-gray-500 dark:text-gray-400">Starting at</span>
                <p className="text-3xl font-bold text-red-600">${gig.price.toFixed(2)}</p>
              </div>

              {isOwnGig ? (
                <div className="text-center text-gray-500 dark:text-gray-400 text-sm">
                  This is your gig
                </div>
              ) : hireStatus === "success" ? (
                <div className="text-center">
                  <div className="bg-green-50 text-green-700 py-3 px-4 rounded-lg text-sm font-medium mb-3">
                    Request sent successfully!
                  </div>
                  <Link
                    href="/contracts"
                    className="text-red-500 hover:text-red-600 text-sm font-medium"
                  >
                    View your contracts &rarr;
                  </Link>
                </div>
              ) : (
                <>
                  <button
                    onClick={handleHire}
                    disabled={hireStatus === "loading"}
                    className="w-full py-3 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {!token
                      ? "Sign in to Hire"
                      : hireStatus === "loading"
                        ? "Sending Request..."
                        : "Hire This Freelancer"}
                  </button>
                  {hireError && (
                    <p className="mt-3 text-red-500 text-sm text-center">{hireError}</p>
                  )}
                </>
              )}
            </div>

            {/* Freelancer Info Card */}
            {gigOwner && (
              <Link
                href={`/users/${gigOwner.id}`}
                className="block bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-4">About the Freelancer</h3>
                <div className="flex items-center gap-3">
                  {gigOwner.avatar_url ? (
                    <img
                      src={gigOwner.avatar_url}
                      alt={gigOwner.display_name || "Freelancer"}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-white font-bold">
                      {gigOwner.display_name?.charAt(0) || gigOwner.email?.charAt(0) || "U"}
                    </div>
                  )}
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {gigOwner.display_name || "Freelancer"}
                    </p>
                    {gigOwner.username && (
                      <p className="text-gray-500 dark:text-gray-400 text-sm">@{gigOwner.username}</p>
                    )}
                  </div>
                </div>
                <p className="mt-3 text-red-500 text-sm font-medium flex items-center gap-1">
                  <UserIcon size={14} /> View Profile
                </p>
              </Link>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
