import { useState, useMemo } from "react";
import { Search, Heart, BookOpen, Users, Church, Leaf, Building, HelpCircle, CheckCircle2, XCircle } from "lucide-react";
import { TestSearchQueryData } from "@/data/charityData";

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
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];
    const lowerQuery = query.toLowerCase();
    return TestSearchQueryData.d.filter(
      (charity) =>
        charity.Name.toLowerCase().includes(lowerQuery) ||
        charity.CharityRegistrationNumber.toLowerCase().includes(lowerQuery) ||
        charity.CharitablePurpose.toLowerCase().includes(lowerQuery)
    ) as SearchResult[];
  }, [query]);

  const showResults = isFocused && query.trim().length > 0;

  return (
    <div className="w-full max-w-3xl mx-auto relative">
      {/* Airbnb-style Search Bar */}
      <div
        className={`
          relative flex items-center gap-4 px-6 py-4
          bg-background border-2 rounded-full
          shadow-lg hover:shadow-xl transition-all duration-300
          ${isFocused ? "border-primary shadow-xl" : "border-border"}
        `}
      >
        <Search className="w-5 h-5 text-muted-foreground flex-shrink-0" />
        <input
          type="text"
          placeholder="Search charities by name, ID, or purpose..."
          className="flex-1 bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground text-base"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
        />
        <button className="bg-primary text-primary-foreground px-6 py-2 rounded-full font-medium hover:bg-primary/90 transition-colors">
          Search
        </button>
      </div>

      {/* Search Results Dropdown */}
      {showResults && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-background border border-border rounded-2xl shadow-2xl overflow-hidden z-50 max-h-[400px] overflow-y-auto">
          {searchResults.length === 0 ? (
            <div className="px-6 py-8 text-center text-muted-foreground">
              No charities found matching "{query}"
            </div>
          ) : (
            <div className="divide-y divide-border">
              {searchResults.map((charity, index) => (
                <div
                  key={charity.CharityRegistrationNumber + index}
                  className="flex items-center gap-4 px-5 py-4 hover:bg-muted/50 cursor-pointer transition-colors"
                >
                  {/* Left Column: Icon */}
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-muted/50 flex items-center justify-center">
                    {getSectorIcon(charity.MainActivityId)}
                  </div>

                  {/* Middle Column: Details */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-foreground truncate">
                      {charity.Name.trim()}
                    </h4>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-0.5">
                      <span>📍 {charity.PostalAddressCity}</span>
                      <span>•</span>
                      <span>{getSectorLabel(charity.MainActivityId)}</span>
                      <span>•</span>
                      <span className="font-mono text-xs">{charity.CharityRegistrationNumber}</span>
                    </div>
                    <p className="text-sm text-muted-foreground/70 mt-1 line-clamp-1">
                      {charity.CharitablePurpose.substring(0, 100)}...
                    </p>
                  </div>

                  {/* Right Column: Status Badge */}
                  <div className="flex-shrink-0">
                    {charity.RegistrationStatus === "Registered" ? (
                      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 text-xs font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Registered
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-500/10 text-rose-600 text-xs font-medium">
                        <XCircle className="w-3.5 h-3.5" />
                        Deregistered
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
