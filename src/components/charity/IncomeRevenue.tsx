import { CharityData } from "@/data/charityData";
import { formatCurrency } from "@/lib/utils";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { DollarSign, Landmark, Briefcase, Heart, TrendingUp } from "lucide-react";

interface IncomeRevenueProps {
    data: CharityData;
}

export const IncomeRevenue = ({ data }: IncomeRevenueProps) => {
    const { totalGrossIncome, serviceIncome, govtGrants, donationIncome, investmentIncome } = data.incomeSources;

    const chartData = [
        { name: "Service & Trading", value: serviceIncome, color: "#3b82f6", icon: Briefcase }, // Blue
        { name: "Govt Grants", value: govtGrants, color: "#8b5cf6", icon: Landmark }, // Purple
        { name: "Donations", value: donationIncome, color: "#ec4899", icon: Heart }, // Pink
        { name: "Investments", value: investmentIncome, color: "#10b981", icon: TrendingUp }, // Emerald
    ].filter(item => item.value > 0);

    const CustomTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-card border border-border p-3 rounded-lg shadow-lg">
                    <p className="font-medium text-foreground">{payload[0].name}</p>
                    <p className="text-primary font-bold">{formatCurrency(payload[0].value)}</p>
                    <p className="text-xs text-muted-foreground">
                        {((payload[0].value / totalGrossIncome) * 100).toFixed(1)}% of Total
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <section className="glass-card rounded-2xl p-6 md:p-8 animate-fade-in space-y-8">
            <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-500/10 rounded-xl text-blue-500">
                    <DollarSign className="w-6 h-6" />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-foreground">Income & Revenue Sources</h2>
                    <p className="text-muted-foreground text-sm">Where the funding comes from</p>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 items-center">
                {/* Chart Section */}
                <div className="relative w-full h-[300px] lg:w-1/2">
                    {chartData.length > 0 ? (
                        <>
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={chartData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={80}
                                        outerRadius={110}
                                        paddingAngle={2}
                                        dataKey="value"
                                    >
                                        {chartData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
                                        ))}
                                    </Pie>
                                    <Tooltip content={<CustomTooltip />} />
                                </PieChart>
                            </ResponsiveContainer>
                            {/* Center Label */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                <span className="text-sm text-muted-foreground font-medium uppercase tracking-wide">Total Income</span>
                                <span className="text-2xl font-bold text-foreground">{formatCurrency(totalGrossIncome)}</span>
                            </div>
                        </>
                    ) : (
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground bg-muted/20 rounded-full w-[220px] h-[220px] m-auto">
                            <p className="text-sm font-medium">No Revenue Data</p>
                        </div>
                    )}
                </div>

                {/* Detailed List */}
                <div className="w-full lg:w-1/2 space-y-4">
                    {chartData.length > 0 ? (
                        chartData.map((item) => (
                            <div key={item.name} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors border-b border-border/40 last:border-0">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg text-white" style={{ backgroundColor: item.color }}>
                                        <item.icon className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-foreground text-sm">{item.name}</p>
                                        <p className="text-xs text-muted-foreground">
                                            {((item.value / totalGrossIncome) * 100).toFixed(1)}%
                                        </p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-foreground text-sm">{formatCurrency(item.value)}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="flex flex-col gap-2 items-center justify-center h-full p-8 text-muted-foreground bg-muted/20 rounded-xl border border-dashed border-border/50">
                            <span className="text-sm">No detailed revenue breakdown available for this charity.</span>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};
