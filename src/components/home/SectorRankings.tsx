import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { 
  ArrowUpDown, 
  ArrowUp, 
  ArrowDown, 
  Filter, 
  Building2, 
  Heart, 
  GraduationCap, 
  Users, 
  Leaf, 
  Church, 
  Briefcase,
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
  top10govdependency,
  top10staff,
} from "@/data/charityData";

interface CharityData {
  Name: string;
  CharityRegistrationNumber: string;
  TotalGrossIncome: number | null;
  NetSurplusDeficitForTheYear: number | null;
  TotalAssets: number | null;
  GovtGrantsContracts: number | null;
  NumberOfFulltimeEmployees: number | null;
  MainActivityId?: number | null;
  Location?: string;
}

const SECTOR_ICONS: Record<number, React.ReactNode> = {
  1: <Building2 className="w-4 h-4" />,
  2: <Heart className="w-4 h-4" />,
  3: <GraduationCap className="w-4 h-4" />,
  4: <Users className="w-4 h-4" />,
  5: <Leaf className="w-4 h-4" />,
  6: <Church className="w-4 h-4" />,
  9: <Heart className="w-4 h-4" />,
};

const SECTOR_NAMES: Record<number, string> = {
  1: "Arts/Culture",
  2: "Health",
  3: "Education",
  4: "Social Services",
  5: "Environment",
  6: "Religion",
  9: "Health",
};

type SortField = "TotalGrossIncome" | "TotalAssets" | "NetSurplusDeficitForTheYear" | "NumberOfFulltimeEmployees" | "govtDependency";
type SortDirection = "asc" | "desc";

const formatCurrency = (value: number | null): string => {
  if (value === null || value === undefined) return "—";
  const absValue = Math.abs(value);
  if (absValue >= 1000000000) return `$${(value / 1000000000).toFixed(1)}B`;
  if (absValue >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
  if (absValue >= 1000) return `$${(value / 1000).toFixed(0)}K`;
  return `$${value.toLocaleString()}`;
};

const calculateGovtDependency = (govt: number | null | undefined, total: number | null | undefined): number | null => {
  if (total === null || total === undefined || total <= 0) return null;
  if (govt === null || govt === undefined) return null;
  return Math.round((govt / total) * 100);
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
    case "govtDependency":
      return top10govdependency.d as CharityData[];
    case "NumberOfFulltimeEmployees":
      return top10staff.d as CharityData[];
    default:
      return top10revenue.d as CharityData[];
  }
};

export const SectorRankings = () => {
  const navigate = useNavigate();
  const [sortField, setSortField] = useState<SortField>("TotalGrossIncome");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  // Get data based on sort field
  const charities = useMemo(() => {
    return getDataForSortField(sortField);
  }, [sortField]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(prev => prev === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  const sortedCharities = [...charities].sort((a, b) => {
    let aVal: number, bVal: number;
    
    if (sortField === "govtDependency") {
      aVal = calculateGovtDependency(a.GovtGrantsContracts, a.TotalGrossIncome) ?? 0;
      bVal = calculateGovtDependency(b.GovtGrantsContracts, b.TotalGrossIncome) ?? 0;
    } else {
      aVal = (a[sortField] as number) || 0;
      bVal = (b[sortField] as number) || 0;
    }

    return sortDirection === "desc" ? bVal - aVal : aVal - bVal;
  });

  const handleRowClick = (cc: string) => {
    navigate(`/charity/${cc}`);
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return <ArrowUpDown className="w-3.5 h-3.5 text-muted-foreground/50" />;
    return sortDirection === "desc" 
      ? <ArrowDown className="w-3.5 h-3.5 text-primary" />
      : <ArrowUp className="w-3.5 h-3.5 text-primary" />;
  };

  const GovtBar = ({ percentage }: { percentage: number | null }) => {
    if (percentage === null) {
      return <span className="text-muted-foreground text-sm">—</span>;
    }
    return (
      <div className="flex items-center gap-2">
        <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-chart-govt rounded-full transition-all duration-500"
            style={{ width: `${Math.min(percentage, 100)}%` }}
          />
        </div>
        <span className="text-xs text-muted-foreground">{percentage}%</span>
      </div>
    );
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
    const govtPct = calculateGovtDependency(charity.GovtGrantsContracts, charity.TotalGrossIncome);
    const sectorIcon = charity.MainActivityId ? SECTOR_ICONS[charity.MainActivityId] : <Briefcase className="w-4 h-4" />;

    return (
      <div 
        onClick={() => handleRowClick(charity.CharityRegistrationNumber)}
        className="bg-card border border-border rounded-xl p-4 cursor-pointer hover:border-primary/30 hover:shadow-md transition-all duration-200 animate-fade-in"
        style={{ animationDelay: `${index * 50}ms` }}
      >
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <div className="p-1.5 bg-accent rounded-lg text-accent-foreground shrink-0">
              {sectorIcon}
            </div>
            <div className="min-w-0">
              <h3 className="font-semibold text-foreground text-sm leading-tight line-clamp-2">
                {charity.Name}
              </h3>
              <p className="text-xs text-muted-foreground">{charity.Location}</p>
            </div>
          </div>
          <div className="text-right shrink-0 ml-2">
            <p className="text-lg font-bold text-foreground">
              {formatCurrency(charity.TotalGrossIncome)}
            </p>
            <p className="text-xs text-muted-foreground">Revenue</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <p className="text-xs text-muted-foreground">Assets</p>
            <p className="font-medium text-foreground">{formatCurrency(charity.TotalAssets)}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Staff</p>
            <p className="font-medium text-foreground">{charity.NumberOfFulltimeEmployees || 0}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Govt Funded</p>
            <p className="font-medium text-foreground">{govtPct !== null ? `${govtPct}%` : "—"}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Profit</p>
            <NetResult value={charity.NetSurplusDeficitForTheYear} />
          </div>
        </div>
      </div>
    );
  };

  const sortOptions = [
    { label: "Highest Revenue", field: "TotalGrossIncome" as SortField },
    { label: "Largest Assets", field: "TotalAssets" as SortField },
    { label: "Most Staff", field: "NumberOfFulltimeEmployees" as SortField },
    { label: "Govt Dependency", field: "govtDependency" as SortField },
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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <Filter className="w-4 h-4" />
                  Sector: All
                  <ChevronDown className="w-3 h-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-popover">
                <DropdownMenuItem>All Sectors</DropdownMenuItem>
                <DropdownMenuItem>Health</DropdownMenuItem>
                <DropdownMenuItem>Education</DropdownMenuItem>
                <DropdownMenuItem>Social Services</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <Filter className="w-4 h-4" />
                  Filter
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-popover">
                <DropdownMenuItem>All Sectors</DropdownMenuItem>
                <DropdownMenuItem>Health</DropdownMenuItem>
                <DropdownMenuItem>Education</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block bg-card border border-border rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50 sticky top-0">
                <tr>
                  <th className="text-left py-4 px-4 font-semibold text-foreground text-sm">
                    Charity Name
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
                    className="text-left py-4 px-4 font-semibold text-foreground text-sm cursor-pointer hover:bg-muted/80 transition-colors"
                    onClick={() => handleSort("govtDependency")}
                  >
                    <div className="flex items-center gap-1.5">
                      Govt Dependency
                      <SortIcon field="govtDependency" />
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
                </tr>
              </thead>
              <tbody>
                {sortedCharities.map((charity, index) => {
                  const govtPct = calculateGovtDependency(charity.GovtGrantsContracts, charity.TotalGrossIncome);
                  const sectorIcon = charity.MainActivityId ? SECTOR_ICONS[charity.MainActivityId] : <Briefcase className="w-4 h-4" />;
                  
                  return (
                    <tr 
                      key={charity.CharityRegistrationNumber}
                      onClick={() => handleRowClick(charity.CharityRegistrationNumber)}
                      className="border-t border-border cursor-pointer hover:bg-muted/30 transition-colors animate-fade-in"
                      style={{ animationDelay: `${index * 30}ms` }}
                    >
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="p-1.5 bg-accent rounded-lg text-accent-foreground">
                            {sectorIcon}
                          </div>
                          <div>
                            <p className="font-medium text-foreground line-clamp-1">{charity.Name}</p>
                            <p className="text-xs text-muted-foreground">{charity.Location || "NZ"}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <span className="font-bold text-foreground">
                          {formatCurrency(charity.TotalGrossIncome)}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <NetResult value={charity.NetSurplusDeficitForTheYear} />
                      </td>
                      <td className="py-4 px-4 text-right text-foreground">
                        {formatCurrency(charity.TotalAssets)}
                      </td>
                      <td className="py-4 px-4">
                        <GovtBar percentage={govtPct} />
                      </td>
                      <td className="py-4 px-4 text-right text-foreground">
                        {charity.NumberOfFulltimeEmployees || 0}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile Card List */}
        <div className="md:hidden space-y-3">
          {sortedCharities.map((charity, index) => (
            <MobileCard key={charity.CharityRegistrationNumber} charity={charity} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
