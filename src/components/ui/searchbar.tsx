import { Search, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Gig } from "@/hooks/useApi";
import { useAuth } from "@/context/AuthContext";
import { buildApiUrl } from "@/lib/api-url";

const fetchGigs = async (query: string, token?: string): Promise<Gig[]> => {
  const headers: HeadersInit = {};
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  
  const response = await fetch(buildApiUrl("/gigs"), { headers });
  if (!response.ok) {
    throw new Error("Failed to fetch gigs");
  }
  const gigs: Gig[] = await response.json();
  
  if (!query.trim()) return gigs.slice(0, 5);
  
  const lowerQuery = query.toLowerCase();
  return gigs
    .filter(gig => 
      gig.title.toLowerCase().includes(lowerQuery) ||
      gig.description?.toLowerCase().includes(lowerQuery)
    )
    .slice(0, 5);
};

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { token } = useAuth();
  const containerRef = useRef<HTMLDivElement>(null);

  const { data: results = [] } = useQuery({
    queryKey: ["search-gigs", query, token],
    queryFn: () => fetchGigs(query, token ?? undefined),
    enabled: query.length > 0 || true,
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setIsOpen(true);
  };

  const handleResultClick = (gig: Gig) => {
    setQuery("");
    setIsOpen(false);
    router.push(`/explore?search=${encodeURIComponent(gig.title)}`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setIsOpen(false);
      router.push(`/explore?search=${encodeURIComponent(query)}`);
    }
  };

  const handleClear = () => {
    setQuery("");
    setIsOpen(false);
  };

  const showResults = isOpen && query.length > 0;

  return (
    <div ref={containerRef} className="relative w-full">
      <form onSubmit={handleSubmit}>
        <Search
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          size={20}
        />
        <input
          type="text"
          value={query}
          onChange={handleSearch}
          onFocus={() => setIsOpen(true)}
          placeholder="Search gigs..."
          className="w-full py-2.5 pl-10 pr-10 rounded-lg border shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
        />
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X size={16} />
          </button>
        )}
      </form>

      {showResults && results.length > 0 && (
        <div className="absolute w-full mt-1 bg-white border rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
          {results.map((gig) => (
            <div
              key={gig.id}
              className="p-3 hover:bg-gray-100 cursor-pointer border-b last:border-b-0"
              onClick={() => handleResultClick(gig)}
            >
              <div className="font-medium text-gray-900 truncate">{gig.title}</div>
              <div className="text-sm text-gray-500 truncate">
                {gig.description || "No description"}
              </div>
              <div className="text-sm font-semibold text-red-500 mt-1">
                ${gig.price.toFixed(2)}
              </div>
            </div>
          ))}
          <div
            className="p-3 text-center text-red-500 hover:bg-gray-100 cursor-pointer border-t"
            onClick={() => {
              setIsOpen(false);
              router.push(`/explore?search=${encodeURIComponent(query)}`);
            }}
          >
            View all results for "{query}"
          </div>
        </div>
      )}

      {showResults && results.length === 0 && (
        <div className="absolute w-full mt-1 bg-white border rounded-lg shadow-lg z-50 p-4 text-center text-gray-500">
          No gigs found for "{query}"
        </div>
      )}
    </div>
  );
};

export default SearchBar;
