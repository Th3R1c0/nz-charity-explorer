import { TrendingUp, TrendingDown, DollarSign, PiggyBank, Users, Building } from "lucide-react";
import { CharityData } from "@/data/charityData";

interface StatCardsProps {
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

interface StatCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon: React.ReactNode;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  delay: number;
}

const StatCard = ({ title, value, subtitle, icon, trend, trendValue, delay }: StatCardProps) => (
  <div 
    className="glass-card-always rounded-xl p-4 md:p-6 animate-fade-in hover:stat-glow transition-shadow duration-300"
    style={{ animationDelay: `${delay}s` }}
  >
    <div className="flex items-start justify-between">
      <div className="space-y-0.5 md:space-y-1">
        <p className="text-xs md:text-sm text-muted-foreground">{title}</p>
        <p className="text-xl md:text-2xl font-bold text-foreground">{value}</p>
        {subtitle && (
          <p className="text-xs md:text-sm text-muted-foreground hidden md:block">{subtitle}</p>
        )}
      </div>
      <div className="h-10 w-10 md:h-12 md:w-12 rounded-lg md:rounded-xl bg-primary/10 flex items-center justify-center">
        {icon}
      </div>
    </div>
    {trend && trendValue && (
      <div className="mt-2 md:mt-4 flex items-center gap-1">
        {trend === "up" ? (
          <TrendingUp className="h-3 w-3 md:h-4 md:w-4 text-success" />
        ) : trend === "down" ? (
          <TrendingDown className="h-3 w-3 md:h-4 md:w-4 text-destructive" />
        ) : null}
        <span className={`text-xs md:text-sm font-medium ${
          trend === "up" ? "text-success" : trend === "down" ? "text-destructive" : "text-muted-foreground"
        }`}>
          {trendValue}
        </span>
        <span className="text-xs md:text-sm text-muted-foreground">vs last year</span>
      </div>
    )}
  </div>
);

export const StatCards = ({ data }: StatCardsProps) => {
  const previousYear = data.financialHistory[data.financialHistory.length - 2];
  const currentYear = data.financialHistory[data.financialHistory.length - 1];
  
  const incomeTrend = ((currentYear.income - previousYear.income) / previousYear.income * 100).toFixed(1);
  const surplusTrend = ((currentYear.surplus - previousYear.surplus) / previousYear.surplus * 100).toFixed(1);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        title="Total Income"
        value={formatCurrency(data.currentFinancials.totalIncome)}
        icon={<DollarSign className="h-6 w-6 text-primary" />}
        trend={parseFloat(incomeTrend) >= 0 ? "up" : "down"}
        trendValue={`${parseFloat(incomeTrend) >= 0 ? "+" : ""}${incomeTrend}%`}
        delay={0.6}
      />
      <StatCard
        title="Net Surplus"
        value={formatCurrency(data.currentFinancials.netSurplus)}
        icon={<PiggyBank className="h-6 w-6 text-primary" />}
        trend={parseFloat(surplusTrend) >= 0 ? "up" : "down"}
        trendValue={`${parseFloat(surplusTrend) >= 0 ? "+" : ""}${surplusTrend}%`}
        delay={0.7}
      />
      <StatCard
        title="Total Assets"
        value={formatCurrency(data.currentFinancials.totalAssets)}
        subtitle="Net worth of the organization"
        icon={<Building className="h-6 w-6 text-primary" />}
        delay={0.8}
      />
      <StatCard
        title="Employees"
        value={data.currentFinancials.employees.toString()}
        subtitle="Full-time staff"
        icon={<Users className="h-6 w-6 text-primary" />}
        delay={0.9}
      />
    </div>
  );
};
