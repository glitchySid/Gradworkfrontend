import { Search } from "lucide-react";
import { useState } from "react";
import { searchServices } from "../../data/searchService.js";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = (e) => {
    const searchQuery = e.target.value;
    setQuery(searchQuery);
    setResults(searchServices(searchQuery));
  };

  return (
    <div className="relative max-w-[85%] sm:max-w-xl mx-auto transition-transform hidden sm:block">
      <Search className="absolute left-3 top-3 text-gray-400" />
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search Services"
        className="w-full p-3 pl-12 rounded-lg border shadow-sm"
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
