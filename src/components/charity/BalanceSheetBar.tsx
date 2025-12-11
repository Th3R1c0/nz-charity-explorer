import { CharityData } from "@/data/charityData";

interface BalanceSheetBarProps {
  data: CharityData;
}

const formatCurrency = (value: number) => {
  if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(2)}M`;
  }
  if (value >= 1000) {
    return `$${(value / 1000).toFixed(0)}K`;
  }
  return `$${value}`;
};

export const BalanceSheetBar = ({ data }: BalanceSheetBarProps) => {
  const { totalAssets, totalLiabilities, totalEquity } = data.currentFinancials;
  
  const liabilityPercentage = (totalLiabilities / totalAssets) * 100;
  const equityPercentage = (totalEquity / totalAssets) * 100;
  
  // Debt ratio assessment
  const debtRatio = (totalLiabilities / totalAssets) * 100;
  const getHealthStatus = (ratio: number) => {
    if (ratio < 30) return { label: "Healthy", color: "text-success" };
    if (ratio < 60) return { label: "Moderate", color: "text-warning" };
    return { label: "High Leverage", color: "text-destructive" };
  };
  
  const health = getHealthStatus(debtRatio);

  return (
    <div className="glass-card md:rounded-2xl p-4 md:p-6 animate-fade-in h-full" style={{ animationDelay: "1.4s" }}>
      <div className="mb-4 md:mb-6">
        <h3 className="text-base md:text-lg font-semibold text-foreground">Balance Sheet</h3>
        <p className="text-xs md:text-sm text-muted-foreground">Assets vs Liabilities</p>
      </div>

      <div className="space-y-6">
        {/* Total Assets Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Total Assets</span>
            <span className="font-medium text-foreground">{formatCurrency(totalAssets)}</span>
          </div>
          <div className="h-8 bg-chart-surplus rounded-lg overflow-hidden">
            <div className="h-full w-full flex items-center justify-center text-sm font-medium text-primary-foreground">
              100%
            </div>
          </div>
        </div>

        {/* Liabilities + Equity Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Liabilities + Equity</span>
            <span className="font-medium text-foreground">{formatCurrency(totalAssets)}</span>
          </div>
          <div className="h-8 rounded-lg overflow-hidden flex">
            {/* Liabilities */}
            <div 
              className="h-full bg-destructive flex items-center justify-center text-sm font-medium text-destructive-foreground transition-all duration-1000"
              style={{ width: `${liabilityPercentage}%` }}
            >
              {liabilityPercentage >= 15 && `${Math.round(liabilityPercentage)}%`}
            </div>
            {/* Equity */}
            <div 
              className="h-full bg-success flex items-center justify-center text-sm font-medium text-success-foreground transition-all duration-1000"
              style={{ width: `${equityPercentage}%` }}
            >
              {equityPercentage >= 15 && `${Math.round(equityPercentage)}%`}
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-destructive" />
            <span className="text-muted-foreground">
              Liabilities: {formatCurrency(totalLiabilities)}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-success" />
            <span className="text-muted-foreground">
              Equity: {formatCurrency(totalEquity)}
            </span>
          </div>
        </div>

        {/* Debt Ratio */}
        <div className="pt-4 border-t border-border">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Debt Ratio</span>
            <span className={`font-medium ${health.color}`}>
              {Math.round(debtRatio)}% ({health.label})
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
