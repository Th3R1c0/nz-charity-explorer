import { CharityData } from "@/data/charityData";
import { useEffect, useState } from "react";

interface MissionEfficiencyRingProps {
  data: CharityData;
}

export const MissionEfficiencyRing = ({ data }: MissionEfficiencyRingProps) => {
  const [animatedPercentage, setAnimatedPercentage] = useState(0);
  
  const totalExpenses = data.currentFinancials.totalExpenses;
  const programCosts = data.expenseBreakdown.programCosts;
  const percentage = Math.round((programCosts / totalExpenses) * 100);
  
  // Animate the ring fill
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedPercentage(percentage);
    }, 500);
    return () => clearTimeout(timer);
  }, [percentage]);
  
  // Get color based on percentage
  const getColor = (pct: number) => {
    if (pct >= 70) return "text-success stroke-success";
    if (pct >= 50) return "text-warning stroke-warning";
    return "text-destructive stroke-destructive";
  };
  
  const colorClass = getColor(percentage);
  
  // SVG calculations
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (animatedPercentage / 100) * circumference;

  return (
    <div className="glass-card rounded-2xl p-6 animate-fade-in" style={{ animationDelay: "1.2s" }}>
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground">Mission Efficiency</h3>
        <p className="text-sm text-muted-foreground">Spending on the cause</p>
      </div>

      <div className="relative h-48 flex items-center justify-center">
        <svg viewBox="0 0 200 200" className="w-full max-w-[200px] -rotate-90">
          {/* Background circle */}
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke="hsl(var(--muted))"
            strokeWidth="16"
          />
          
          {/* Progress circle */}
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            className={colorClass}
            strokeWidth="16"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            style={{ transition: "stroke-dashoffset 1.5s ease-out" }}
          />
        </svg>
        
        {/* Center text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <p className={`text-4xl font-bold ${colorClass.split(" ")[0]}`}>
              {percentage}%
            </p>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="text-center space-y-2">
        <p className="text-sm font-medium text-foreground">
          {percentage} cents of every dollar goes directly to the cause
        </p>
        <p className="text-xs text-muted-foreground">
          {percentage >= 70 
            ? "Excellent efficiency - Most funds support the mission"
            : percentage >= 50
            ? "Moderate efficiency - Room for improvement"
            : "Low efficiency - High overhead costs"}
        </p>
      </div>
    </div>
  );
};
