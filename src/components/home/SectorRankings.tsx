import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { 
  ArrowUpDown, 
  ArrowDown, 
  Filter, 
  MapPin,
  ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  top10revenue,
  top10profit,
  top10assets,
  top10staff,
  top10donations,
} from "@/data/charityData";

interface CharityData {
  Name: string;
  CharityRegistrationNumber: string;
  StreetAddressCity: string | null;
  MainSectorName: string | null;
  TotalGrossIncome: number | null;
  NetSurplusDeficitForTheYear: number | null;
  TotalAssets: number | null;
  NumberOfFulltimeEmployees: number | null;
  DonationsKoha: number | null;
}

type SortField = "TotalGrossIncome" | "TotalAssets" | "NetSurplusDeficitForTheYear" | "NumberOfFulltimeEmployees" | "DonationsKoha";

const formatCurrency = (value: number | null): string => {
  if (value === null || value === undefined) return "—";
  const absValue = Math.abs(value);
  if (absValue >= 1000000000) return `$${(value / 1000000000).toFixed(1)}B`;
  if (absValue >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
  if (absValue >= 1000) return `$${(value / 1000).toFixed(0)}K`;
  return `$${value.toLocaleString()}`;
};

// Map sort fields to data sources
const getDataForSortField = (field: SortField): CharityData[] => {
  switch (field) {
    case "TotalGrossIncome":
      return top10revenue.d as CharityData[];
    case "NetSurplusDeficitForTheYear":
      return top10profit.d as CharityData[];
    case "TotalAssets":
      return top10assets.d as CharityData[];
    case "NumberOfFulltimeEmployees":
      return top10staff.d as CharityData[];
    case "DonationsKoha":
      return top10donations.d as CharityData[];
    default:
      return top10revenue.d as CharityData[];
  }
};

export const SectorRankings = () => {
  const navigate = useNavigate();
  const [sortField, setSortField] = useState<SortField>("TotalGrossIncome");

  // Get data based on sort field - data is already sorted from source
  const charities = useMemo(() => {
    return getDataForSortField(sortField);
  }, [sortField]);

  const handleSort = (field: SortField) => {
    setSortField(field);
  };

  const handleRowClick = (cc: string) => {
    navigate(`/charity/${cc}`);
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return <ArrowUpDown className="w-3.5 h-3.5 text-muted-foreground/50" />;
    return <ArrowDown className="w-3.5 h-3.5 text-primary" />;
  };

  const NetResult = ({ value }: { value: number | null }) => {
    if (value === null || value === undefined) return <span className="text-muted-foreground">—</span>;
    const isNegative = value < 0;
    return (
      <span className={isNegative ? "text-destructive" : "text-success"}>
        {isNegative ? `(${formatCurrency(Math.abs(value)).slice(1)})` : formatCurrency(value)}
      </span>
    );
  };

  // Mobile card component
  const MobileCard = ({ charity, index }: { charity: CharityData; index: number }) => {
    return (
      <div 
        onClick={() => handleRowClick(charity.CharityRegistrationNumber)}
        className="bg-card border border-border rounded-xl p-4 cursor-pointer hover:border-primary/30 hover:shadow-md transition-all duration-200 animate-fade-in"
        style={{ animationDelay: `${index * 50}ms` }}
      >
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground text-sm leading-tight line-clamp-2">
              {charity.Name}
            </h3>
            <div className="flex items-center gap-1 mt-1">
              <MapPin className="w-3 h-3 text-muted-foreground" />
              <p className="text-xs text-muted-foreground">{charity.StreetAddressCity || "—"}</p>
            </div>
            <p className="text-xs text-primary mt-0.5">{charity.MainSectorName || "—"}</p>
          </div>
          <div className="text-right shrink-0 ml-2">
            <p className="text-lg font-bold text-foreground">
              {formatCurrency(charity.TotalGrossIncome)}
            </p>
            <p className="text-xs text-muted-foreground">Revenue</p>
          </div>
        </div>
        
        <div className="grid grid-cols-4 gap-2 text-sm">
          <div>
            <p className="text-xs text-muted-foreground">Profit</p>
            <NetResult value={charity.NetSurplusDeficitForTheYear} />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Assets</p>
            <p className="font-medium text-foreground">{formatCurrency(charity.TotalAssets)}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Staff</p>
            <p className="font-medium text-foreground">{charity.NumberOfFulltimeEmployees || 0}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Donations</p>
            <p className="font-medium text-foreground">{formatCurrency(charity.DonationsKoha)}</p>
          </div>
        </div>
      </div>
    );
  };

  const sortOptions = [
    { label: "Highest Revenue", field: "TotalGrossIncome" as SortField },
    { label: "Highest Profit", field: "NetSurplusDeficitForTheYear" as SortField },
    { label: "Largest Assets", field: "TotalAssets" as SortField },
    { label: "Most Staff", field: "NumberOfFulltimeEmployees" as SortField },
    { label: "Most Donations", field: "DonationsKoha" as SortField },
  ];

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              Market Analysis
            </h2>
            <p className="text-muted-foreground">
              Top charities ranked by financial scale and impact
            </p>
          </div>
          
          {/* Desktop filters */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="outline" size="sm" className="gap-2" disabled>
              <Filter className="w-4 h-4" />
              Sector: All
              <ChevronDown className="w-3 h-3" />
            </Button>
          </div>

          {/* Mobile controls */}
          <div className="flex md:hidden items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2 flex-1">
                  <ArrowUpDown className="w-4 h-4" />
                  Sort By
                  <ChevronDown className="w-3 h-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="bg-popover">
                {sortOptions.map(option => (
                  <DropdownMenuItem 
                    key={option.field}
                    onClick={() => handleSort(option.field)}
                    className={sortField === option.field ? "bg-accent" : ""}
                  >
                    {option.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button variant="outline" size="sm" className="gap-2" disabled>
              <Filter className="w-4 h-4" />
              Filter
            </Button>
          </div>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block bg-card border border-border rounded-xl overflow-hidden">
          <div className="overflow-x-auto scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            <table className="w-full">
              <thead className="bg-muted/50 sticky top-0">
                <tr>
                  <th className="text-left py-4 px-4 font-semibold text-foreground text-sm">
                    Charity Name
                  </th>
                  <th className="text-left py-4 px-4 font-semibold text-foreground text-sm">
                    Location
                  </th>
                  <th className="text-left py-4 px-4 font-semibold text-foreground text-sm">
                    Sector
                  </th>
                  <th 
                    className="text-right py-4 px-4 font-semibold text-foreground text-sm cursor-pointer hover:bg-muted/80 transition-colors"
                    onClick={() => handleSort("TotalGrossIncome")}
                  >
                    <div className="flex items-center justify-end gap-1.5">
                      Revenue
                      <SortIcon field="TotalGrossIncome" />
                    </div>
                  </th>
                  <th 
                    className="text-right py-4 px-4 font-semibold text-foreground text-sm cursor-pointer hover:bg-muted/80 transition-colors"
                    onClick={() => handleSort("NetSurplusDeficitForTheYear")}
                  >
                    <div className="flex items-center justify-end gap-1.5">
                      Profit
                      <SortIcon field="NetSurplusDeficitForTheYear" />
                    </div>
                  </th>
                  <th 
                    className="text-right py-4 px-4 font-semibold text-foreground text-sm cursor-pointer hover:bg-muted/80 transition-colors"
                    onClick={() => handleSort("TotalAssets")}
                  >
                    <div className="flex items-center justify-end gap-1.5">
                      Assets
                      <SortIcon field="TotalAssets" />
                    </div>
                  </th>
                  <th 
                    className="text-right py-4 px-4 font-semibold text-foreground text-sm cursor-pointer hover:bg-muted/80 transition-colors"
                    onClick={() => handleSort("NumberOfFulltimeEmployees")}
                  >
                    <div className="flex items-center justify-end gap-1.5">
                      Staff
                      <SortIcon field="NumberOfFulltimeEmployees" />
                    </div>
                  </th>
                  <th 
                    className="text-right py-4 px-4 font-semibold text-foreground text-sm cursor-pointer hover:bg-muted/80 transition-colors"
                    onClick={() => handleSort("DonationsKoha")}
                  >
                    <div className="flex items-center justify-end gap-1.5">
                      Donations
                      <SortIcon field="DonationsKoha" />
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {charities.map((charity, index) => (
                  <tr 
                    key={charity.CharityRegistrationNumber}
                    onClick={() => handleRowClick(charity.CharityRegistrationNumber)}
                    className="border-t border-border cursor-pointer hover:bg-muted/30 transition-colors animate-fade-in"
                    style={{ animationDelay: `${index * 30}ms` }}
                  >
                    <td className="py-4 px-4">
                      <p className="font-medium text-foreground line-clamp-1">{charity.Name}</p>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-muted-foreground" />
                        <span className="text-muted-foreground text-sm">{charity.StreetAddressCity || "—"}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm text-primary">{charity.MainSectorName || "—"}</span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <span className={sortField === "TotalGrossIncome" ? "font-bold text-foreground" : "text-foreground"}>
                        {formatCurrency(charity.TotalGrossIncome)}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <span className={sortField === "NetSurplusDeficitForTheYear" ? "font-bold" : ""}>
                        <NetResult value={charity.NetSurplusDeficitForTheYear} />
                      </span>
                    </td>
                    <td className={`py-4 px-4 text-right text-foreground ${sortField === "TotalAssets" ? "font-bold" : ""}`}>
                      {formatCurrency(charity.TotalAssets)}
                    </td>
                    <td className={`py-4 px-4 text-right text-foreground ${sortField === "NumberOfFulltimeEmployees" ? "font-bold" : ""}`}>
                      {charity.NumberOfFulltimeEmployees || 0}
                    </td>
                    <td className={`py-4 px-4 text-right text-foreground ${sortField === "DonationsKoha" ? "font-bold" : ""}`}>
                      {formatCurrency(charity.DonationsKoha)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile Card List */}
        <div className="md:hidden space-y-3">
          {charities.map((charity, index) => (
            <MobileCard key={charity.CharityRegistrationNumber} charity={charity} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
