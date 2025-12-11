import { CharityData } from "@/data/charityData";

interface GovernmentDependencyGaugeProps {
  data: CharityData;
}

export const GovernmentDependencyGauge = ({ data }: GovernmentDependencyGaugeProps) => {
  const percentage = (data.revenueBreakdown.governmentGrants / data.currentFinancials.totalIncome) * 100;
  const roundedPercentage = Math.round(percentage);
  
  // Determine risk level
  const getRiskLevel = (pct: number) => {
    if (pct < 30) return { level: "Low", color: "text-success", bgColor: "bg-success" };
    if (pct < 70) return { level: "Moderate", color: "text-warning", bgColor: "bg-warning" };
    return { level: "High", color: "text-destructive", bgColor: "bg-destructive" };
  };
  
  const risk = getRiskLevel(roundedPercentage);
  
  // Calculate needle rotation (0% = -90deg, 100% = 90deg)
  const rotation = -90 + (percentage * 1.8);

  return (
    <div className="glass-card md:rounded-2xl p-0 md:p-6 animate-fade-in" style={{ animationDelay: "1.1s" }}>
      <div className="mb-3 md:mb-4">
        <h3 className="text-base md:text-lg font-semibold text-foreground">Government Dependency</h3>
        <p className="text-xs md:text-sm text-muted-foreground">Funding risk assessment</p>
      </div>

      <div className="relative h-32 md:h-40 flex items-end justify-center">
        {/* Gauge Background */}
        <svg viewBox="0 0 200 100" className="w-full max-w-[200px] md:max-w-[250px]">
          {/* Background arc */}
          <path
            d="M 20 100 A 80 80 0 0 1 180 100"
            fill="none"
            stroke="hsl(var(--muted))"
            strokeWidth="16"
            strokeLinecap="round"
          />
          
          {/* Green zone (0-30%) */}
          <path
            d="M 20 100 A 80 80 0 0 1 56 33"
            fill="none"
            stroke="hsl(var(--success))"
            strokeWidth="16"
            strokeLinecap="round"
          />
          
          {/* Yellow zone (30-70%) */}
          <path
            d="M 56 33 A 80 80 0 0 1 144 33"
            fill="none"
            stroke="hsl(var(--warning))"
            strokeWidth="16"
          />
          
          {/* Red zone (70-100%) */}
          <path
            d="M 144 33 A 80 80 0 0 1 180 100"
            fill="none"
            stroke="hsl(var(--destructive))"
            strokeWidth="16"
            strokeLinecap="round"
          />
          
          {/* Needle */}
          <g transform={`rotate(${rotation} 100 100)`}>
            <line
              x1="100"
              y1="100"
              x2="100"
              y2="35"
              stroke="hsl(var(--foreground))"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <circle cx="100" cy="100" r="8" fill="hsl(var(--foreground))" />
          </g>
        </svg>
      </div>

      {/* Value Display */}
      <div className="text-center mt-2">
        <p className="text-2xl md:text-3xl font-bold text-foreground">{roundedPercentage}%</p>
        <p className={`text-xs md:text-sm font-medium ${risk.color}`}>
          {risk.level} Dependency
        </p>
      </div>

      {/* Risk Description */}
      <p className="text-[10px] md:text-xs text-muted-foreground text-center mt-3 md:mt-4">
        {roundedPercentage >= 70 
          ? "This charity relies heavily on government funding, which may pose risks if policies change."
          : roundedPercentage >= 30
          ? "Moderate reliance on government funding with some diversification."
          : "Well-diversified funding sources with low government dependency."}
      </p>
    </div>
  );
};
