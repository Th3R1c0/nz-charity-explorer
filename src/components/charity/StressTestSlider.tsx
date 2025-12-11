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

export const StressTestSlider = ({ data }: StressTestSliderProps) => {
  const [cutPercentage, setCutPercentage] = useState(0);
  
  const govtGrants = data.revenueBreakdown.governmentGrants;
  const currentSurplus = data.currentFinancials.netSurplus;
  
  const grantReduction = govtGrants * (cutPercentage / 100);
  const projectedSurplus = currentSurplus - grantReduction;
  const isDeficit = projectedSurplus < 0;
  
  // Calculate months of runway impact
  const monthlyExpenses = data.currentFinancials.totalExpenses / 12;
  const newMonthlyIncome = (data.currentFinancials.totalIncome - grantReduction) / 12;
  const monthsUntilCrisis = data.currentFinancials.cashOnHand / (monthlyExpenses - newMonthlyIncome);

  return (
    <div className="glass-card rounded-2xl p-6 animate-fade-in" style={{ animationDelay: "1.5s" }}>
      <div className="mb-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-warning/20 flex items-center justify-center">
            <AlertTriangle className="h-5 w-5 text-warning" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Stress Test</h3>
            <p className="text-sm text-muted-foreground">What if government funding drops?</p>
          </div>
        </div>
      </div>

      {/* Slider */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-foreground">Simulate Grant Cut</span>
          <span className="text-lg font-bold text-destructive">-{cutPercentage}%</span>
        </div>
        
        <Slider
          value={[cutPercentage]}
          onValueChange={(value) => setCutPercentage(value[0])}
          max={50}
          min={0}
          step={5}
          className="py-4"
        />
        
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>0%</span>
          <span>-25%</span>
          <span>-50%</span>
        </div>
      </div>

      {/* Results */}
      <div className="mt-6 space-y-4">
        {/* Current vs Projected */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-muted/50 rounded-xl">
            <p className="text-xs text-muted-foreground mb-1">Current Surplus</p>
            <p className="text-xl font-bold text-success">
              {formatCurrency(currentSurplus)}
            </p>
          </div>
          
          <div className={`p-4 rounded-xl ${isDeficit ? "bg-destructive/10" : "bg-success/10"}`}>
            <p className="text-xs text-muted-foreground mb-1">Projected Result</p>
            <p className={`text-xl font-bold ${isDeficit ? "text-destructive" : "text-success"}`}>
              {formatCurrency(projectedSurplus)}
            </p>
          </div>
        </div>

        {/* Impact Analysis */}
        {cutPercentage > 0 && (
          <div className={`p-4 rounded-xl border ${
            isDeficit 
              ? "bg-destructive/5 border-destructive/20" 
              : "bg-success/5 border-success/20"
          }`}>
            <div className="flex items-start gap-3">
              {isDeficit ? (
                <TrendingDown className="h-5 w-5 text-destructive mt-0.5" />
              ) : (
                <Shield className="h-5 w-5 text-success mt-0.5" />
              )}
              <div>
                <p className={`font-medium ${isDeficit ? "text-destructive" : "text-success"}`}>
                  {isDeficit 
                    ? `Deficit of ${formatCurrency(Math.abs(projectedSurplus))}`
                    : "Still Operating at Surplus"
                  }
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {isDeficit
                    ? `Cash reserves would last approximately ${Math.max(0, Math.round(monthsUntilCrisis))} months under this scenario.`
                    : "The organization can absorb this reduction and maintain financial stability."
                  }
                </p>
              </div>
            </div>
          </div>
        )}

        {cutPercentage === 0 && (
          <p className="text-sm text-muted-foreground text-center py-4">
            Move the slider to simulate a reduction in government grants
          </p>
        )}
      </div>
    </div>
  );
};
