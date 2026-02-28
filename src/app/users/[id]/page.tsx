"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";
import { useAuth } from "@/context/AuthContext";
import { useUser, useGigs, useFreelancerPortfolios, useCreateContract, Gig } from "@/hooks/useApi";
import { ArrowLeft, Mail, Calendar, Briefcase, User as UserIcon, MapPin, Star } from "lucide-react";

export default function FreelancerProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id: userId } = use(params);
  const router = useRouter();
  const { token, authUser } = useAuth();

  const { data: profileUser, isLoading: userLoading, error: userError } = useUser(userId, token ?? undefined);
  const { data: allGigs = [] } = useGigs(token ?? undefined);
  const { data: portfolios = [] } = useFreelancerPortfolios(userId, token ?? undefined);
  const createContract = useCreateContract();

  const [hireGigId, setHireGigId] = useState<string | null>(null);
  const [hireStatus, setHireStatus] = useState<Record<string, "idle" | "loading" | "success" | "error">>({});
  const [hireErrors, setHireErrors] = useState<Record<string, string>>({});

  const userGigs = allGigs.filter((g) => g.user_id === userId);
  const isOwnProfile = authUser?.id === userId;

  const handleHire = async (gig: Gig) => {
    if (!token) {
      router.push("/register");
      return;
    }

    setHireStatus((p) => ({ ...p, [gig.id]: "loading" }));
    setHireErrors((p) => ({ ...p, [gig.id]: "" }));

    try {
      await createContract.mutateAsync({ gig_id: gig.id, token: token ?? undefined });
      setHireStatus((p) => ({ ...p, [gig.id]: "success" }));
    } catch (err: unknown) {
      setHireStatus((p) => ({ ...p, [gig.id]: "error" }));
      if (err instanceof Error) {
        if (err.message.includes("409") || err.message.toLowerCase().includes("duplicate")) {
          setHireErrors((p) => ({ ...p, [gig.id]: "Already requested" }));
        } else if (err.message.includes("400")) {
          setHireErrors((p) => ({ ...p, [gig.id]: "Cannot hire yourself" }));
        } else {
          setHireErrors((p) => ({ ...p, [gig.id]: err.message }));
        }
      }
    }
  };

  if (userLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Header />
        <div className="max-w-5xl mx-auto px-4 py-8 mt-8">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500" />
          </div>
        </div>
      </div>
    );
  }

  // If not authenticated, show sign-in prompt (backend requires auth for /users/{id})
  if (!token) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
        <Header />
        <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-8">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-6"
          >
            <ArrowLeft size={20} />
            <span>Back</span>
          </button>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 text-center">
            <UserIcon size={48} className="mx-auto mb-4 text-gray-300 dark:text-gray-600" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Sign in to view this profile</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-6">You need to be signed in to view freelancer profiles.</p>
            <Link
              href="/register"
              className="inline-block px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Sign In
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (userError) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
        <Header />
        <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-8">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-6"
          >
            <ArrowLeft size={20} />
            <span>Back</span>
          </button>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 text-center">
            <p className="text-red-500">User not found or failed to load.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <Header />
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-8">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mb-6"
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </button>

        {/* Profile Header */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 p-6 sm:p-8 mb-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            {profileUser?.avatar_url ? (
              <Image
                src={profileUser.avatar_url}
                alt={profileUser.display_name ?? "User"}
                width={96}
                height={96}
                className="rounded-full object-cover w-24 h-24"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                <UserIcon size={40} className="text-red-400" />
              </div>
            )}
            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {profileUser?.display_name || profileUser?.username || "User"}
              </h1>
              {profileUser?.username && (
                <p className="text-gray-500 dark:text-gray-400 mt-1">@{profileUser.username}</p>
              )}
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 mt-3 text-sm text-gray-500 dark:text-gray-400">
                {profileUser?.role && (
                  <span className="flex items-center gap-1.5 px-3 py-1 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full font-medium">
                    <Briefcase size={14} />
                    {profileUser.role}
                  </span>
                )}
                {profileUser?.email && (
                  <span className="flex items-center gap-1.5">
                    <Mail size={14} />
                    {profileUser.email}
                  </span>
                )}
                {profileUser?.created_at && (
                  <span className="flex items-center gap-1.5">
                    <Calendar size={14} />
                    Joined {new Date(profileUser.created_at).toLocaleDateString()}
                  </span>
                )}
              </div>
            </div>
            {isOwnProfile && (
              <Link
                href="/profile"
                className="px-4 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-sm font-medium"
              >
                Edit Profile
              </Link>
            )}
          </div>
        </div>

        {/* Gigs Section */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            {isOwnProfile ? "Your Gigs" : "Gigs"} ({userGigs.length})
          </h2>
          {userGigs.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 p-8 text-center">
              <Briefcase size={40} className="mx-auto mb-3 text-gray-300 dark:text-gray-600" />
              <p className="text-gray-500 dark:text-gray-400">No gigs posted yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {userGigs.map((gig) => {
                const status = hireStatus[gig.id] || "idle";
                const error = hireErrors[gig.id] || "";

                return (
                  <div
                    key={gig.id}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden flex flex-col"
                  >
                    {/* Thumbnail */}
                    <div className="relative w-full h-40 bg-gray-100 dark:bg-gray-700">
                      {gig.thumbnail_url ? (
                        <Image
                          src={gig.thumbnail_url}
                          alt={gig.title}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <Briefcase size={32} className="text-gray-300" />
                        </div>
                      )}
                    </div>

                    <div className="p-4 flex flex-col flex-1">
                      <Link href={`/explore/${gig.id}`} className="hover:underline">
                        <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-2">{gig.title}</h3>
                      </Link>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">{gig.description}</p>

                      <div className="mt-auto pt-3 flex items-center justify-between">
                        <span className="text-red-600 font-bold">${gig.price.toFixed(2)}</span>
                        {gig.category && (
                          <span className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded-full">
                            {gig.category}
                          </span>
                        )}
                      </div>

                      {/* Hire button (not on own gigs) */}
                      {!isOwnProfile && (
                        <div className="mt-3">
                          {status === "success" ? (
                            <p className="text-green-600 text-sm font-medium text-center">Request sent!</p>
                          ) : status === "error" ? (
                            <p className="text-red-500 text-sm text-center">{error}</p>
                          ) : (
                            <button
                              onClick={() => handleHire(gig)}
                              disabled={status === "loading"}
                              className="w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-medium disabled:opacity-50"
                            >
                              {status === "loading" ? "Sending..." : "Hire"}
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Portfolios Section */}
        {portfolios.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Portfolio ({portfolios.length})
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {portfolios.map((p) => (
                <div
                  key={p.id}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 p-4"
                >
                  <h3 className="font-semibold text-gray-900 dark:text-white">{p.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-3">{p.description}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-red-600 font-bold">${p.price.toFixed(2)}</span>
                    <span className="text-xs text-gray-400 dark:text-gray-500">
                      {new Date(p.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
