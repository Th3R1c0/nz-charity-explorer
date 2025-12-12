import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { CharityData } from "@/data/charityData";
import { AlertTriangle, TrendingDown, Shield } from "lucide-react";
interface StressTestSliderProps {
  data: CharityData;
}
const formatCurrency = (value: number) => {
  const absValue = Math.abs(value);
  if (absValue >= 1000000) {
    return `${value < 0 ? "-" : ""}$${(absValue / 1000000).toFixed(2)}M`;
  }
  if (absValue >= 1000) {
    return `${value < 0 ? "-" : ""}$${(absValue / 1000).toFixed(0)}K`;
  }
  return `${value < 0 ? "-" : ""}$${absValue}`;
};
export const StressTestSlider = ({
  data
}: StressTestSliderProps) => {
  const [cutPercentage, setCutPercentage] = useState(0);
  const govtGrants = data.revenueBreakdown.governmentGrants;
  const currentSurplus = data.currentFinancials.netSurplus;
  const grantReduction = govtGrants * (cutPercentage / 100);
  const projectedSurplus = currentSurplus - grantReduction;
  const isDeficit = projectedSurplus < 0;

  // Calculate months of runway impact
  // When income drops, if expenses exceed new income, calculate how long cash reserves last
  const monthlyExpenses = data.currentFinancials.totalExpenses / 12;
  const newMonthlyIncome = (data.currentFinancials.totalIncome - grantReduction) / 12;
  const monthlyBurn = monthlyExpenses - newMonthlyIncome;

  // Only calculate months until crisis if we're burning cash (expenses > income)
  const monthsUntilCrisis = monthlyBurn > 0 ? data.currentFinancials.cashOnHand / monthlyBurn : Infinity;
  const getRiskLevel = () => {
    if (cutPercentage === 0) return { level: "stable", color: "text-success", icon: Shield, label: "Stable" };
    if (monthsUntilCrisis === Infinity) return { level: "stable", color: "text-success", icon: Shield, label: "Stable" };
    if (monthsUntilCrisis > 12) return { level: "low", color: "text-primary", icon: Shield, label: "Low Risk" };
    if (monthsUntilCrisis > 6) return { level: "medium", color: "text-warning", icon: AlertTriangle, label: "Medium Risk" };
    return { level: "high", color: "text-destructive", icon: TrendingDown, label: "High Risk" };
  };

  const risk = getRiskLevel();
  const RiskIcon = risk.icon;

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">Government Funding Stress Test</h3>
      
      <div className="space-y-6">
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">Simulated Grant Reduction</span>
            <span className="text-lg font-bold text-foreground">{cutPercentage}%</span>
          </div>
          <Slider
            value={[cutPercentage]}
            onValueChange={(value) => setCutPercentage(value[0])}
            max={100}
            step={5}
            className="w-full"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-muted/50 rounded-lg p-4">
            <p className="text-xs text-muted-foreground mb-1">Grant Reduction</p>
            <p className="text-xl font-bold text-destructive">-{formatCurrency(grantReduction)}</p>
          </div>
          <div className="bg-muted/50 rounded-lg p-4">
            <p className="text-xs text-muted-foreground mb-1">Projected Surplus</p>
            <p className={`text-xl font-bold ${isDeficit ? "text-destructive" : "text-success"}`}>
              {formatCurrency(projectedSurplus)}
            </p>
          </div>
        </div>

        <div className={`flex items-center gap-3 p-4 rounded-lg ${
          risk.level === "high" ? "bg-destructive/10" : 
          risk.level === "medium" ? "bg-warning/10" : "bg-success/10"
        }`}>
          <RiskIcon className={`w-5 h-5 ${risk.color}`} />
          <div>
            <p className={`font-semibold ${risk.color}`}>{risk.label}</p>
            {monthsUntilCrisis !== Infinity && monthlyBurn > 0 && (
              <p className="text-xs text-muted-foreground">
                ~{Math.round(monthsUntilCrisis)} months until cash reserves depleted
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};