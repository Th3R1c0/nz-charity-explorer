import { CharityData } from "@/data/charityData";

interface CashRunwayBarProps {
  data: CharityData;
}

export const CashRunwayBar = ({ data }: CashRunwayBarProps) => {
  const monthlyExpenses = data.currentFinancials.totalExpenses / 12;
  const cashMonths = data.currentFinancials.cashOnHand / monthlyExpenses;
  const roundedMonths = Math.round(cashMonths * 10) / 10;
  
  // Max display is 12 months
  const maxMonths = 12;
  const fillPercentage = Math.min((cashMonths / maxMonths) * 100, 100);
  
  // Get color based on months
  const getColor = (months: number) => {
    if (months >= 6) return { fill: "bg-success", text: "text-success" };
    if (months >= 3) return { fill: "bg-warning", text: "text-warning" };
    return { fill: "bg-destructive", text: "text-destructive" };
  };
  
  const colors = getColor(cashMonths);

  return (
    <div className="glass-card rounded-2xl p-6 animate-fade-in" style={{ animationDelay: "1.3s" }}>
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground">Cash Runway</h3>
        <p className="text-sm text-muted-foreground">Survival time without income</p>
      </div>

      {/* Battery Bar */}
      <div className="space-y-4">
        <div className="relative h-12 bg-muted rounded-full overflow-hidden">
          {/* Markers */}
          <div 
            className="absolute top-0 bottom-0 w-0.5 bg-destructive/50 z-10" 
            style={{ left: `${(3 / maxMonths) * 100}%` }}
          >
            <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-destructive whitespace-nowrap">
              3mo
            </span>
          </div>
          <div 
            className="absolute top-0 bottom-0 w-0.5 bg-success/50 z-10" 
            style={{ left: `${(6 / maxMonths) * 100}%` }}
          >
            <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-success whitespace-nowrap">
              6mo
            </span>
          </div>
          
          {/* Fill */}
          <div 
            className={`absolute left-0 top-0 bottom-0 ${colors.fill} rounded-full transition-all duration-1000 ease-out`}
            style={{ width: `${fillPercentage}%` }}
          >
            {/* Battery stripes */}
            <div className="absolute inset-0 overflow-hidden rounded-full">
              <div className="h-full w-full bg-[repeating-linear-gradient(90deg,transparent,transparent_8px,rgba(255,255,255,0.1)_8px,rgba(255,255,255,0.1)_16px)]" />
            </div>
          </div>
          
          {/* Battery cap */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 -mr-2 h-6 w-3 bg-muted-foreground/20 rounded-r-full" />
        </div>

        {/* Value */}
        <div className="text-center pt-4">
          <p className={`text-3xl font-bold ${colors.text}`}>
            {roundedMonths} Months
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            of operating expenses covered
          </p>
        </div>

        {/* Status */}
        <p className="text-xs text-muted-foreground text-center">
          {cashMonths >= 6 
            ? "Healthy cash reserves - Organization is financially stable"
            : cashMonths >= 3
            ? "Moderate reserves - Should focus on building cash buffer"
            : "Critical - Immediate attention needed for financial sustainability"}
        </p>
      </div>
    </div>
  );
};
