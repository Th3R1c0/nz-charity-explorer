import { CharityData } from "@/data/charityData";
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from "recharts";
interface FinancialOverviewChartProps {
  data: CharityData;
}
const formatCurrency = (value: number) => {
  if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(1)}M`;
  }
  if (value >= 1000) {
    return `$${(value / 1000).toFixed(0)}K`;
  }
  return `$${value}`;
};
const CustomTooltip = ({
  active,
  payload,
  label
}: any) => {
  if (active && payload && payload.length) {
    return <div className="bg-card border border-border rounded-lg p-4 shadow-xl">
        <p className="font-semibold text-foreground mb-2">{label}</p>
        {payload.map((entry: any, index: number) => <div key={index} className="flex items-center gap-2 text-sm">
            <div className="h-3 w-3 rounded-full" style={{
          backgroundColor: entry.color
        }} />
            <span className="text-muted-foreground">{entry.name}:</span>
            <span className="font-medium text-foreground">
              {formatCurrency(entry.value)}
            </span>
          </div>)}
      </div>;
  }
  return null;
};
export const FinancialOverviewChart = ({
  data
}: FinancialOverviewChartProps) => {
  const chartData = data.financialHistory.map(item => ({
    year: item.year.toString(),
    income: item.income,
    expenses: item.expenses,
    surplus: item.surplus
  }));
  return <section style={{
    animationDelay: "0.5s"
  }} className="glass-card rounded-2xl p-8 animate-fade-in px-[32px]">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground">Financial Overview</h2>
        <p className="text-muted-foreground">5-Year Income, Expenses & Surplus Trend</p>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={chartData} margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5
        }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="year" stroke="hsl(var(--muted-foreground))" tick={{
            fill: "hsl(var(--muted-foreground))"
          }} />
            <YAxis yAxisId="left" stroke="hsl(var(--muted-foreground))" tick={{
            fill: "hsl(var(--muted-foreground))"
          }} tickFormatter={formatCurrency} />
            <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--chart-surplus))" tick={{
            fill: "hsl(var(--chart-surplus))"
          }} tickFormatter={formatCurrency} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{
            paddingTop: "20px"
          }} formatter={value => <span className="text-foreground">{value}</span>} />
            <ReferenceLine yAxisId="right" y={0} stroke="hsl(var(--muted-foreground))" strokeDasharray="3 3" />
            <Bar yAxisId="left" dataKey="income" name="Total Income" fill="hsl(var(--chart-income))" radius={[4, 4, 0, 0]} barSize={40} />
            <Bar yAxisId="left" dataKey="expenses" name="Total Expenses" fill="hsl(var(--chart-expense))" radius={[4, 4, 0, 0]} barSize={40} />
            <Line yAxisId="right" type="monotone" dataKey="surplus" name="Net Surplus" stroke="hsl(var(--chart-surplus))" strokeWidth={3} dot={{
            fill: "hsl(var(--chart-surplus))",
            strokeWidth: 2,
            r: 6
          }} activeDot={{
            r: 8,
            strokeWidth: 2
          }} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </section>;
};