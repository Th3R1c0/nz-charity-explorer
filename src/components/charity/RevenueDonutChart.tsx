import { CharityData } from "@/data/charityData";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

interface RevenueDonutChartProps {
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

const COLORS = [
  "hsl(var(--chart-govt))",
  "hsl(var(--chart-donations))",
  "hsl(var(--chart-trading))",
  "hsl(var(--chart-investments))",
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-card border border-border rounded-lg p-4 shadow-xl">
        <p className="font-semibold text-foreground">{data.name}</p>
        <p className="text-muted-foreground">
          {formatCurrency(data.value)} ({data.percentage}%)
        </p>
      </div>
    );
  }
  return null;
};

export const RevenueDonutChart = ({ data }: RevenueDonutChartProps) => {
  const total = data.currentFinancials.totalIncome;
  
  const chartData = [
    { 
      name: "Government Grants", 
      value: data.revenueBreakdown.governmentGrants,
      percentage: ((data.revenueBreakdown.governmentGrants / total) * 100).toFixed(1)
    },
    { 
      name: "Donations", 
      value: data.revenueBreakdown.donations,
      percentage: ((data.revenueBreakdown.donations / total) * 100).toFixed(1)
    },
    { 
      name: "Trading/Services", 
      value: data.revenueBreakdown.tradingServices,
      percentage: ((data.revenueBreakdown.tradingServices / total) * 100).toFixed(1)
    },
    { 
      name: "Investments", 
      value: data.revenueBreakdown.investments,
      percentage: ((data.revenueBreakdown.investments / total) * 100).toFixed(1)
    },
  ];

  return (
    <div className="glass-card md:rounded-2xl p-0 md:p-6 animate-fade-in h-full" style={{ animationDelay: "1s" }}>
      <div className="mb-3 md:mb-4">
        <h3 className="text-base md:text-lg font-semibold text-foreground">Revenue Sources</h3>
        <p className="text-xs md:text-sm text-muted-foreground">Where the money comes from</p>
      </div>

      <div className="h-48 md:h-64 relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={45}
              outerRadius={70}
              paddingAngle={3}
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        
        {/* Center Label */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center">
            <p className="text-lg md:text-2xl font-bold text-foreground">{formatCurrency(total)}</p>
            <p className="text-[10px] md:text-xs text-muted-foreground">Total Income</p>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="space-y-1.5 md:space-y-2 mt-3 md:mt-4">
        {chartData.map((item, index) => (
          <div key={item.name} className="flex items-center justify-between text-xs md:text-sm">
            <div className="flex items-center gap-2">
              <div 
                className="h-2.5 w-2.5 md:h-3 md:w-3 rounded-full" 
                style={{ backgroundColor: COLORS[index] }}
              />
              <span className="text-muted-foreground">{item.name}</span>
            </div>
            <span className="font-medium text-foreground">{item.percentage}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};
