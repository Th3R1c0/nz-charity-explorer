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
  return;
};