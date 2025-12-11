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
  const hasHistory = data.financialHistory && data.financialHistory.length >= 2;
  const previousYear = hasHistory ? data.financialHistory[data.financialHistory.length - 2] : null;
  const currentYear = hasHistory ? data.financialHistory[data.financialHistory.length - 1] : null;
  
  const incomeTrend = hasHistory && previousYear && currentYear && previousYear.income !== 0
    ? ((currentYear.income - previousYear.income) / previousYear.income * 100).toFixed(1)
    : null;
  const surplusTrend = hasHistory && previousYear && currentYear && previousYear.surplus !== 0
    ? ((currentYear.surplus - previousYear.surplus) / previousYear.surplus * 100).toFixed(1)
    : null;
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
      <StatCard
        title="Total Income"
        value={data.currentFinancials?.totalIncome != null ? formatCurrency(data.currentFinancials.totalIncome) : 'No data'}
        icon={<DollarSign className="h-6 w-6 text-primary" />}
        trend={incomeTrend ? (parseFloat(incomeTrend) >= 0 ? "up" : "down") : undefined}
        trendValue={incomeTrend ? `${parseFloat(incomeTrend) >= 0 ? "+" : ""}${incomeTrend}%` : undefined}
        delay={0.6}
      />
      <StatCard
        title="Net Surplus"
        value={data.currentFinancials?.netSurplus != null ? formatCurrency(data.currentFinancials.netSurplus) : 'No data'}
        icon={<PiggyBank className="h-6 w-6 text-primary" />}
        trend={surplusTrend ? (parseFloat(surplusTrend) >= 0 ? "up" : "down") : undefined}
        trendValue={surplusTrend ? `${parseFloat(surplusTrend) >= 0 ? "+" : ""}${surplusTrend}%` : undefined}
        delay={0.7}
      />
      <StatCard
        title="Total Assets"
        value={data.currentFinancials?.totalAssets != null ? formatCurrency(data.currentFinancials.totalAssets) : 'No data'}
        subtitle="Net worth of the organization"
        icon={<Building className="h-6 w-6 text-primary" />}
        delay={0.8}
      />
      <StatCard
        title="Employees"
        value={data.currentFinancials?.employees != null ? data.currentFinancials.employees.toString() : 'No data'}
        subtitle="Full-time staff"
        icon={<Users className="h-6 w-6 text-primary" />}
        delay={0.9}
      />
    </div>
  );
};
