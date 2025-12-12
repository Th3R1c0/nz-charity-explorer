import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Heart, Users, Church, HelpCircle, CheckCircle2, XCircle, Loader2, X, ChevronsRight } from "lucide-react";

interface SearchResult {
  Name: string;
  CharityRegistrationNumber: string;
  PostalAddressCity: string;
  PostalAddressSuburb: string;
  RegistrationStatus: string;
  MainActivityId: number | null;
  CharitablePurpose: string;
}

const getSectorIcon = (activityId: number | null) => {
  switch (activityId) {
    case 4: // Health/Education
      return <Heart className="w-6 h-6 text-rose-500" />;
    case 8: // Religious
      return <Church className="w-6 h-6 text-purple-500" />;
    case 9: // Community/Health services
      return <Users className="w-6 h-6 text-blue-500" />;
    default:
      return <HelpCircle className="w-6 h-6 text-muted-foreground" />;
  }
};

const getSectorLabel = (activityId: number | null) => {
  switch (activityId) {
    case 4:
      return "Health & Education";
    case 8:
      return "Religious";
    case 9:
      return "Community Services";
    default:
      return "General";
  }
};

export const SearchBar = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Debounce the query - only update debouncedQuery after user stops typing
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);
    return () => clearTimeout(timer);
  }, [query]);

  // Fetch when debouncedQuery changes
  useEffect(() => {
    const fetchCharities = async () => {
      if (!debouncedQuery.trim()) {
        setSearchResults([]);
        return;
      }

      setIsLoading(true);
      try {
        const encodedQuery = encodeURIComponent(debouncedQuery.toLowerCase());
        const apiUrl = `http://www.odata.charities.govt.nz/vOrganisations?$filter=substringof('${encodedQuery}', tolower(Name)) eq true&$select=Name,PostalAddressCity,PostalAddressSuburb,MainActivityId,RegistrationStatus,CharityRegistrationNumber,CharitablePurpose&$format=json`;
        const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(apiUrl)}`;
        const response = await fetch(proxyUrl);
        const data = await response.json();
        setSearchResults(data.d || []);
      } catch (error) {
        console.error("Error fetching charities:", error);
        setSearchResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCharities();
  }, [debouncedQuery]);

  const handleClear = () => {
    setQuery("");
    setDebouncedQuery("");
    setSearchResults([]);
  };

  // Show results when there's a query (not just when focused)
  const showResults = query.trim().length > 0;

  // Show loading immediately when typing (before debounce completes)
  const isTyping = query.trim() !== debouncedQuery.trim() && query.trim().length > 0;

  // Auto-scroll when results appear
  useEffect(() => {
    if (showResults && searchResults.length > 0 && !hasScrolled) {
      searchContainerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setHasScrolled(true);
    }
    if (!showResults) {
      setHasScrolled(false);
    }
  }, [showResults, searchResults.length, hasScrolled]);

  return (
    <div className="w-full relative mb-8" ref={searchContainerRef}>
      {/* Full-width Search Bar */}
      <div
        className={`
          relative flex items-center gap-2 md:gap-4 px-4 md:px-6 py-3 md:py-4
          bg-background border-2 rounded-full
          shadow-lg hover:shadow-xl transition-all duration-300
          ${isFocused ? "border-primary shadow-xl" : "border-border"}
        `}
      >
        <Search className="w-5 h-5 text-muted-foreground flex-shrink-0" />
        <input
          type="text"
          placeholder='Try searching "Heart" or "Health" to see results'
          className="flex-1 min-w-0 bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground text-sm md:text-base text-left"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
        />
        <button 
          onClick={query ? handleClear : undefined}
          className="bg-primary text-primary-foreground px-4 md:px-6 py-2 rounded-full font-medium hover:bg-primary/90 transition-colors text-sm md:text-base whitespace-nowrap flex-shrink-0"
        >
          {query ? <X className="w-4 h-4" /> : <ChevronsRight className="w-4 h-4" />}
        </button>
      </div>

      {/* Search Results Dropdown */}
      {showResults && (isFocused || searchResults.length > 0) && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-background border border-border rounded-2xl shadow-2xl overflow-hidden z-50 max-h-[400px] md:max-h-[500px] overflow-y-auto">
          {isLoading || isTyping ? (
            <div className="px-4 md:px-6 py-6 md:py-8 flex items-center justify-center text-muted-foreground text-sm md:text-base">
              <Loader2 className="w-4 h-4 md:w-5 md:h-5 animate-spin mr-2" />
              Searching...
            </div>
          ) : searchResults.length === 0 ? (
            <div className="px-4 md:px-6 py-6 md:py-8 text-center text-muted-foreground text-sm md:text-base">
              No charities found matching "{query}"
            </div>
          ) : (
          <div className="divide-y divide-border">
              {searchResults.map((charity, index) => {
                const isDeregistered = charity.RegistrationStatus !== "Registered";
                return (
                <div
                  key={charity.CharityRegistrationNumber + index}
                  className={`flex items-start md:items-center gap-3 md:gap-4 px-3 md:px-5 py-3 md:py-4 transition-colors ${
                    isDeregistered 
                      ? "opacity-50 cursor-not-allowed bg-muted/30" 
                      : "hover:bg-muted/50 cursor-pointer"
                  }`}
                  onClick={() => !isDeregistered && navigate(`/charity/${charity.CharityRegistrationNumber}`)}
                >
                  {/* Left Column: Icon */}
                  <div className={`flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-muted/50 flex items-center justify-center ${isDeregistered ? "grayscale" : ""}`}>
                    {getSectorIcon(charity.MainActivityId)}
                  </div>

                  {/* Middle Column: Details */}
                  <div className="flex-1 min-w-0">
                    <h4 className={`font-semibold text-sm md:text-base leading-tight line-clamp-2 md:truncate ${isDeregistered ? "text-muted-foreground" : "text-foreground"}`}>
                      {charity.Name.trim()}
                    </h4>
                    <div className="flex flex-wrap items-center gap-1 md:gap-2 text-xs md:text-sm text-muted-foreground mt-1 md:mt-0.5">
                      <span>📍 {charity.PostalAddressCity}</span>
                      <span className="hidden md:inline">•</span>
                      <span className="hidden md:inline">{getSectorLabel(charity.MainActivityId)}</span>
                    </div>
                    {charity.CharitablePurpose && (
                      <p className="text-xs md:text-sm text-muted-foreground/70 mt-1 line-clamp-1 hidden md:block">
                        {charity.CharitablePurpose.substring(0, 100)}...
                      </p>
                    )}
                  </div>

                  {/* Right Column: Status Badge */}
                  <div className="flex-shrink-0">
                    {charity.RegistrationStatus === "Registered" ? (
                      <div className="flex items-center gap-1 md:gap-1.5 px-2 md:px-3 py-1 md:py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 text-[10px] md:text-xs font-medium">
                        <CheckCircle2 className="w-3 h-3 md:w-3.5 md:h-3.5" />
                        <span className="hidden sm:inline">Registered</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 md:gap-1.5 px-2 md:px-3 py-1 md:py-1.5 rounded-full bg-rose-500/10 text-rose-600 text-[10px] md:text-xs font-medium">
                        <XCircle className="w-3 h-3 md:w-3.5 md:h-3.5" />
                        <span className="hidden sm:inline">Deregistered</span>
                      </div>
                    )}
                  </div>
                </div>
              );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
