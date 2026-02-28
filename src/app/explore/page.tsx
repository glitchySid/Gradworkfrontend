"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";
import { Gig } from "@/hooks/useApi";
import { useAuth } from "@/context/AuthContext";
import { Search, X, Briefcase } from "lucide-react";
import { buildApiUrl } from "@/lib/api-url";

const CATEGORIES = [
  { value: "", label: "All Categories" },
  { value: "web_development", label: "Web Development" },
  { value: "mobile_development", label: "Mobile Development" },
  { value: "data_science", label: "Data Science" },
  { value: "design", label: "Design" },
  { value: "video_editing", label: "Video Editing" },
  { value: "content_writing", label: "Content Writing" },
  { value: "other", label: "Other" },
];

const fetchGigs = async (category: string, token?: string): Promise<Gig[]> => {
  let url = buildApiUrl("/gigs");

  if (category) {
    url = buildApiUrl(`/gigs/category/${category}`);
  }

  const headers: HeadersInit = {};
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(url, { headers });
  if (!response.ok) {
    throw new Error("Failed to fetch gigs");
  }
  return response.json();
};

const GigCard = ({ gig }: { gig: Gig }) => {
  return (
    <Link
      href={`/explore/${gig.id}`}
      className="block bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 w-full"
    >
      <div className="relative aspect-[5/3] bg-gray-100 dark:bg-gray-700">
        {gig.thumbnail_url ? (
          <Image
            src={gig.thumbnail_url}
            alt={gig.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <Briefcase size={32} className="text-gray-300" />
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 truncate text-gray-900 dark:text-white">{gig.title}</h3>

        <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">
          {gig.description}
        </p>

        <div className="flex items-center justify-between pt-2">
          <span className="text-xs text-gray-500 dark:text-gray-400">From</span>
          <span className="font-bold text-lg text-red-600">
            ${gig.price.toFixed(2)}
          </span>
        </div>
      </div>
    </Link>
  );
};

function ExplorePageContent() {
  const { token } = useAuth();
  const searchParams = useSearchParams();
  const urlSearchQuery = searchParams.get("search") || "";
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState(urlSearchQuery);

  useEffect(() => {
    const category = searchParams.get("category") || "";
    setSelectedCategory(category);
  }, [searchParams]);

  useEffect(() => {
    setSearchQuery(urlSearchQuery);
  }, [urlSearchQuery]);

  const {
    data: gigs,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["gigs", selectedCategory, token],
    queryFn: () => fetchGigs(selectedCategory, token ?? undefined),
  });

  const filteredGigs = gigs?.filter(gig => 
    searchQuery === "" || 
    gig.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    gig.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  const getCategoryLabel = (value: string) => {
    return CATEGORIES.find(c => c.value === value)?.label || "All Categories";
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Header />
        <div className="max-w-7xl mx-auto p-4 pt-20 sm:pt-24">
          <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">Explore Gigs</h2>
          <div className="text-center py-12">
            <p className="text-red-500">
              Failed to load gigs. Please try again later.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <div className="max-w-7xl mx-auto">
        <div className="p-4 pt-20 sm:pt-24">
          <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">Explore Gigs</h2>

          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" size={20} />
              <input
                type="text"
                placeholder="Search gigs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500"
              />
              {searchQuery && (
                <button
                  onClick={handleClearSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <X size={18} />
                </button>
              )}
            </div>

            <select
              value={selectedCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 min-w-[200px]"
            >
              {CATEGORIES.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>

          {selectedCategory && (
            <div className="mb-4 flex items-center gap-2">
              <span className="text-sm text-gray-500 dark:text-gray-400">Filtered by:</span>
              <span className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-full text-sm font-medium">
                {getCategoryLabel(selectedCategory)}
                <button
                  onClick={() => setSelectedCategory("")}
                  className="ml-2 hover:text-red-900"
                >
                  <X size={14} />
                </button>
              </span>
            </div>
          )}

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-3">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md w-full animate-pulse"
                >
                  <div className="aspect-[5/3] bg-gray-300 dark:bg-gray-700" />
                  <div className="p-4 space-y-3">
                    <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-3/4" />
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full" />
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredGigs && filteredGigs.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-3">
              {filteredGigs.map((gig) => <GigCard key={gig.id} gig={gig} />)}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                No gigs found{selectedCategory ? ` in ${getCategoryLabel(selectedCategory)}` : ""}.
              </p>
              {(searchQuery || selectedCategory) && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("");
                  }}
                  className="text-red-500 hover:text-red-600"
                >
                  Clear filters
                </button>
              )}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

function ExplorePageWithParams() {
  return <ExplorePageContent />;
}

export default function ExplorePageWrapper() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Header />
        <div className="max-w-7xl mx-auto p-4 pt-20 sm:pt-24">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
          </div>
        </div>
      </div>
    }>
      <ExplorePageWithParams />
    </Suspense>
  );
}
