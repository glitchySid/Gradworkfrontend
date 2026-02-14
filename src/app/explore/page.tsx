"use client";

import { useQuery } from "@tanstack/react-query";
import Header from "@/components/ui/header";
import { Gig } from "@/types";

const fetchGigs = async (): Promise<Gig[]> => {
  const response = await fetch(
    "https://gradwork-backend-production.up.railway.app/api/gigs"
  );
  if (!response.ok) {
    throw new Error("Failed to fetch gigs");
  }
  return response.json();
};

const GigCard = ({ gig }: { gig: Gig }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 w-full">
      {/* Thumbnail placeholder */}
      <div className="relative aspect-[5/3] bg-gray-200">
        {gig.thumbnail_url && (
          <img
            src={gig.thumbnail_url}
            alt={gig.title}
            className="w-full h-full object-cover"
          />
        )}
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 truncate">{gig.title}</h3>

        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {gig.description}
        </p>

         <div className="flex items-center justify-between pt-2">
          <span className="text-xs text-gray-500">From</span>
          <span className="font-bold text-lg text-red-600">
            ₹{gig.price.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default function ExplorePage() {
  const {
    data: gigs,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["gigs"],
    queryFn: fetchGigs,
  });

  const handleAboutUsClick = () => {
    console.log("About Us clicked");
  };

  if (isLoading) {
    return (
      <div>
        <Header onAboutUsClick={handleAboutUsClick} />
        <div className="max-w-7xl mx-auto p-4 mt-8">
          <h2 className="text-xl font-semibold mb-6">Explore Gigs</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-3">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-lg overflow-hidden shadow-md w-full animate-pulse"
              >
                <div className="aspect-[5/3] bg-gray-300" />
                <div className="p-4 space-y-3">
                  <div className="h-5 bg-gray-300 rounded w-3/4" />
                  <div className="h-4 bg-gray-300 rounded w-full" />
                  <div className="h-4 bg-gray-300 rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Header onAboutUsClick={handleAboutUsClick} />
        <div className="max-w-7xl mx-auto p-4 mt-8">
          <h2 className="text-xl font-semibold mb-6">Explore Gigs</h2>
          <div className="text-center py-12">
            <p className="text-red-500">Failed to load gigs. Please try again later.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header onAboutUsClick={handleAboutUsClick} />
      <div className="max-w-7xl mx-auto">
        <div className="p-4 mt-8">
          <h2 className="text-xl font-semibold mb-6">Explore Gigs</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-3">
            {gigs?.map((gig) => (
              <GigCard key={gig.id} gig={gig} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
