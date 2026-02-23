import { Search } from "lucide-react";
import { useState } from "react";
import { searchServices } from "@/data/searchService";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<string[]>([]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchQuery = e.target.value;
    setQuery(searchQuery);
    setResults(searchServices(searchQuery));
  };

  return (
    <div className="relative w-full transition-transform">
      <Search
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        size={20}
      />
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search Services"
        className="w-full py-2.5 pl-10 pr-4 rounded-lg border shadow-sm text-sm"
      />

      {/* Results dropdown */}
      {results.length > 0 && (
        <div className="absolute w-full mt-1 bg-white border rounded-lg shadow-lg z-10">
          {results.map((service, index) => (
            <div
              key={index}
              className="p-3 hover:bg-gray-100 cursor-pointer border-b last:border-b-0"
              onClick={() => {
                setQuery(service);
                setResults([]);
              }}
            >
              {service}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
