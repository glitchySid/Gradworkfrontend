"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";
import { useContracts } from "@/hooks/useApi";
import { Plus, Edit, Trash2, Briefcase, X, FileText } from "lucide-react";

interface Gig {
  id: string;
  title: string;
  description: string;
  price: number;
  thumbnail_url: string | null;
  category: string | null;
  user_id: string;
  created_at: string;
}

export default function ProfilePage() {
  const { authUser, loading, token } = useAuth();
  const router = useRouter();
  const [showCreateModal, setShowCreateModal] = useState(false);

  const { data: contracts = [] } = useContracts(token ?? undefined);
  const pendingContracts = contracts.filter((c) => c.status === "Pending").length;

  useEffect(() => {
    if (!loading && !token) {
      router.replace("/register");
    }
  }, [loading, token, router]);

  const { data: gigs = [], isLoading: gigsLoading, refetch } = useQuery<Gig[]>({
    queryKey: ['user-gigs', authUser?.id || ''],
    queryFn: () => api.get<Gig[]>(`/gigs/user/${authUser?.id}`, token!),
    enabled: !!token && !!authUser?.id,
  });

  const { data: allGigs = [] } = useQuery<Gig[]>({
    queryKey: ['gigs'],
    queryFn: () => api.get<Gig[]>('/gigs', token || undefined),
    enabled: !!token,
  });

  const displayGigs = authUser?.role === 'freelancer' ? gigs : allGigs;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Header />
        <div className="container mx-auto px-4 py-8 mt-16 sm:mt-20">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
          </div>
        </div>
      </div>
    );
  }

  const hasProfile = authUser?.username && authUser?.role;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <Header />
      <div className="flex-1 container mx-auto px-4 py-8 mt-16 sm:mt-20">
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="md:flex">
            <div className="p-4 sm:p-6 md:p-8 md:w-1/2">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center text-white text-xl sm:text-2xl font-bold overflow-hidden flex-shrink-0">
                  {authUser?.avatar_url ? (
                    <img
                      src={authUser.avatar_url}
                      alt={authUser.display_name || "Profile"}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    authUser?.display_name?.charAt(0) || authUser?.email?.charAt(0) || "U"
                  )}
                </div>
                <div className="min-w-0">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white truncate">
                    {authUser?.display_name || "User"}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 font-medium truncate">@{authUser?.username || "username"}</p>
                </div>
              </div>

              <div className="mt-6 sm:mt-8 space-y-4 sm:space-y-6">
                <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-400">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span className="text-base sm:text-lg capitalize">{authUser?.role || "Role not set"}</span>
                </div>

                <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-400 min-w-0">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-base sm:text-lg truncate">{authUser?.email}</span>
                </div>

                <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-400">
                  <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-lg">
                    Joined {authUser?.created_at ? new Date(authUser.created_at).toLocaleDateString() : "N/A"}
                  </span>
                </div>
              </div>
            </div>

            {!hasProfile ? (
              <div className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-900/10 p-4 sm:p-6 md:p-8 md:w-1/2 flex flex-col items-center justify-center">
                <div className="w-32 h-32 mb-6 relative">
                  <Image src="/assets/profilepage_inc.svg" alt="Profile Setup Icon" fill className="object-contain" />
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
                  Complete Your Account Setup!
                </h1>
                <Link
                  href="/setupprofile"
                  className="w-full max-w-xs bg-red-500 text-white py-4 px-6 rounded-lg text-lg font-semibold hover:bg-red-600 transform hover:scale-105 transition-all duration-200 shadow-md text-center block"
                >
                  Setup Profile
                </Link>
              </div>
            ) : (
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-700/50 p-4 sm:p-6 md:p-8 md:w-1/2 flex flex-col items-center justify-center">
                <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-900 dark:text-white mb-4">
                  Your Profile is Complete!
                </h1>
                <p className="text-gray-600 dark:text-gray-400 text-center mb-6">
                  You can now browse and create gigs, connect with clients/freelancers, and more.
                </p>
                <div className="space-y-3">
                  <Link
                    href="/explore"
                    className="w-full max-w-xs bg-red-500 text-white py-3 px-6 rounded-lg text-lg font-semibold hover:bg-red-600 transform hover:scale-105 transition-all duration-200 shadow-md text-center block"
                  >
                    Explore Gigs
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>

        {hasProfile && (
          <div className="max-w-4xl mx-auto">
            {/* Contracts quick access */}
            <Link
              href="/contracts"
              className="flex items-center justify-between bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 p-4 mb-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-50 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
                  <FileText size={20} className="text-red-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Contracts</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {pendingContracts > 0
                      ? `${pendingContracts} pending contract${pendingContracts > 1 ? "s" : ""}`
                      : "View your contracts"}
                  </p>
                </div>
              </div>
              <span className="text-red-500 text-sm font-medium">View all →</span>
            </Link>

            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {authUser?.role === 'freelancer' ? 'Your Gigs' : 'Available Gigs'}
              </h2>
              {authUser?.role === 'freelancer' && (
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  <Plus size={20} />
                  Create Gig
                </button>
              )}
            </div>

            {gigsLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md animate-pulse">
                    <div className="aspect-[5/3] bg-gray-300 dark:bg-gray-700" />
                    <div className="p-4 space-y-3">
                      <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-3/4" />
                      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full" />
                      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-2/3" />
                    </div>
                  </div>
                ))}
              </div>
            ) : displayGigs.length === 0 ? (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 text-center">
                <Briefcase size={48} className="mx-auto mb-4 text-gray-300 dark:text-gray-600" />
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  {authUser?.role === 'freelancer'
                    ? "You haven't created any gigs yet."
                    : "No gigs available yet."}
                </p>
                {authUser?.role === 'freelancer' && (
                  <button
                    onClick={() => setShowCreateModal(true)}
                    className="inline-block px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                    Create Your First Gig
                  </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayGigs.map((gig) => (
                  <GigCard key={gig.id} gig={gig} isOwner={gig.user_id === authUser?.id} token={token} onUpdate={refetch} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {showCreateModal && (
        <CreateGigModal onClose={() => setShowCreateModal(false)} onSuccess={refetch} />
      )}
      <Footer />
    </div>
  );
}

function GigCard({ gig, isOwner, token, onUpdate }: { gig: Gig; isOwner: boolean; token: string | null; onUpdate: () => void }) {
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await api.delete(`/gigs/${gig.id}`, token!);
      onUpdate();
    } catch (error) {
      console.error("Failed to delete gig:", error);
    } finally {
      setDeleting(false);
      setShowDelete(false);
    }
  };

  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
        <div className="relative aspect-[5/3] bg-gray-200 dark:bg-gray-700">
          {gig.thumbnail_url ? (
            <Image src={gig.thumbnail_url} alt={gig.title} fill className="object-cover" />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-gray-400">
              <Briefcase size={32} />
            </div>
          )}
        </div>

        <div className="p-4">
          <Link href={`/explore/${gig.id}`} className="hover:underline">
            <h3 className="font-semibold text-lg mb-2 truncate text-gray-900 dark:text-white">{gig.title}</h3>
          </Link>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">
            {gig.description || "No description"}
          </p>

          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-gray-500 dark:text-gray-400">From</span>
            <span className="font-bold text-lg text-red-600">
              ${gig.price.toFixed(2)}
            </span>
          </div>

          {isOwner && (
            <div className="flex gap-2 mt-4 pt-3 border-t border-gray-100 dark:border-gray-700">
              <button
                onClick={() => setShowEdit(true)}
                className="flex-1 flex items-center justify-center gap-1 px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
              >
                <Edit size={14} />
                Edit
              </button>
              <button
                onClick={() => setShowDelete(true)}
                className="flex-1 flex items-center justify-center gap-1 px-3 py-1.5 text-sm text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
              >
                <Trash2 size={14} />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {showDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-sm mx-4">
            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Delete Gig?</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">Are you sure you want to delete "{gig.title}"? This action cannot be undone.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDelete(false)}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-900 dark:text-gray-100"
                disabled={deleting}
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50"
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {showEdit && (
        <EditGigModal gig={gig} onClose={() => setShowEdit(false)} onSuccess={onUpdate} />
      )}
    </>
  );
}

const CATEGORIES = [
  { value: "", label: "Select a category" },
  { value: "WebDevelopment", label: "Web Development" },
  { value: "MobileDevelopment", label: "Mobile Development" },
  { value: "DataScience", label: "Data Science" },
  { value: "Design", label: "Design" },
  { value: "VideoEditing", label: "Video Editing" },
  { value: "ContentWriting", label: "Content Writing" },
  { value: "Other", label: "Other" },
];

function CreateGigModal({ onClose, onSuccess }: { onClose: () => void; onSuccess: () => void }) {
  const { token } = useAuth();
  const [formData, setFormData] = useState({ title: "", description: "", price: "", category: "", thumbnail_url: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.price || !formData.category) {
      setError("Title, price, and category are required");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Always send the enum value for category (from select value)
      const payload: any = {
        title: formData.title,
        description: formData.description,
        price: parseFloat(formData.price),
      };
      if (formData.category) {
        payload.category = formData.category; // This is the enum value, not the label
      }
      if (formData.thumbnail_url) {
        payload.thumbnail_url = formData.thumbnail_url;
      }
      await api.post("/gigs", payload, token!);
      onSuccess();
      onClose();
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Failed to create gig";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Create New Gig</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Gig Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              placeholder="e.g., I will build a professional website"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all resize-none bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              rows={4}
              placeholder="Describe your gig in detail..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Thumbnail URL
            </label>
            <input
              type="url"
              value={formData.thumbnail_url}
              onChange={(e) => setFormData({ ...formData, thumbnail_url: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              placeholder="e.g., https://example.com/image.jpg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Price (Rupees) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              min="1"
              step="0.01"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              placeholder="e.g., 100"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              required
            >
              {CATEGORIES.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-900 dark:text-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50"
            >
              {loading ? "Creating..." : "Create Gig"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function EditGigModal({ gig, onClose, onSuccess }: { gig: Gig; onClose: () => void; onSuccess: () => void }) {
  const { token } = useAuth();
  const [formData, setFormData] = useState({
    title: gig.title,
    description: gig.description,
    price: gig.price.toString(),
    category: gig.category || "",
    thumbnail_url: gig.thumbnail_url || ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.price) {
      setError("Title and price are required");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await api.put(`/gigs/${gig.id}`, {
        title: formData.title,
        description: formData.description,
        price: parseFloat(formData.price),
        category: formData.category,
        thumbnail_url: formData.thumbnail_url || null,
      }, token!);
      onSuccess();
      onClose();
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Failed to update gig";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Edit Gig</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Gig Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              placeholder="e.g., I will build a professional website"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all resize-none bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              rows={4}
              placeholder="Describe your gig in detail..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Price (USD) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              min="1"
              step="0.01"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              placeholder="e.g., 100"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Thumbnail URL
            </label>
            <input
              type="url"
              value={formData.thumbnail_url}
              onChange={(e) => setFormData({ ...formData, thumbnail_url: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              placeholder="e.g., https://example.com/image.jpg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              required
            >
              {CATEGORIES.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-900 dark:text-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
