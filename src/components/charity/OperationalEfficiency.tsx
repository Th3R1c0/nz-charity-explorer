import { CharityData } from "@/data/charityData";
import { formatCurrency } from "@/lib/utils";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Zap, Users, Megaphone, TrendingDown, PieChart } from "lucide-react";

interface OperationalEfficiencyProps {
    data: CharityData;
}

export const OperationalEfficiency = ({ data }: OperationalEfficiencyProps) => {
    const { totalExpenditure, employeeCosts, fundraisingExpenses, assetDepreciation } = data.operationalEfficiency;

    const otherExpenses = Math.max(0, totalExpenditure - (employeeCosts + fundraisingExpenses + assetDepreciation));

    const StatItem = ({ label, value, icon: Icon, subtext, highlight = false }: { label: string; value: string; icon: any; subtext?: string; highlight?: boolean }) => (
        <div className={`p-4 rounded-xl border transition-all duration-200 ${highlight ? 'bg-primary/5 border-primary/20' : 'bg-card border-border/50'}`}>
            <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg shrink-0 ${highlight ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                    <Icon className="w-5 h-5" />
                </div>
                <div>
                    <p className="text-sm text-muted-foreground font-medium mb-0.5">{label}</p>
                    <p className="text-xl font-bold text-foreground">{value}</p>
                    {subtext && <p className="text-xs text-muted-foreground mt-1 opacity-80">{subtext}</p>}
                </div>
            </div>
        </div>
    );

    return (
        <section className="glass-card rounded-2xl p-6 md:p-8 animate-fade-in space-y-8">
            <div className="flex items-center gap-3">
                <div className="p-3 bg-orange-500/10 rounded-xl text-orange-500">
                    <PieChart className="w-6 h-6" />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-foreground">Operational Efficiency</h2>
                    <p className="text-muted-foreground text-sm">How funds are utilized</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Stats Column */}
                <div className="space-y-6">
                    <div className="p-4 rounded-xl bg-card border border-border/50">
                        <p className="text-sm font-medium text-muted-foreground mb-1">Total Expenditure</p>
                        <p className="text-2xl font-bold text-foreground">{formatCurrency(totalExpenditure)}</p>
                    </div>

                    <div className="space-y-4">
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-muted-foreground">Employee Costs</span>
                            <span className="font-medium">{formatCurrency(employeeCosts)}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-muted-foreground">Fundraising</span>
                            <span className="font-medium">{formatCurrency(fundraisingExpenses)}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-muted-foreground">Depreciation</span>
                            <span className="font-medium">{formatCurrency(assetDepreciation)}</span>
                        </div>
                    </div>
                </div>

                {/* Chart Column */}
                <div className="lg:col-span-2 space-y-4">
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider pl-1">Expenditure Breakdown</h3>
                    {/* Chart Section */}
                    <div className="w-full h-[200px] md:h-[120px] bg-muted/10 rounded-xl border border-border/50 p-4">
                        {totalExpenditure > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    layout="vertical"
                                    data={[{
                                        name: "Expenditure",
                                        Employees: employeeCosts,
                                        Fundraising: fundraisingExpenses,
                                        Depreciation: assetDepreciation,
                                        Other: otherExpenses
                                    }]}
                                    margin={{ top: 0, right: 30, left: 0, bottom: 0 }}
                                    barSize={32}
                                >
                                    <XAxis type="number" hide />
                                    <YAxis type="category" dataKey="name" hide />
                                    <Tooltip
                                        cursor={{ fill: 'transparent' }}
                                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                        formatter={(value: number) => formatCurrency(value)}
                                    />
                                    <Legend
                                        wrapperStyle={{ paddingTop: '20px' }}
                                        iconType="circle"
                                        layout="horizontal"
                                        verticalAlign="bottom"
                                        align="left"
                                        formatter={(value) => <span className="text-sm text-foreground ml-1">{value}</span>}
                                    />
                                    <Bar dataKey="Employees" stackId="a" fill="#3b82f6" radius={[4, 0, 0, 4]} />
                                    <Bar dataKey="Fundraising" stackId="a" fill="#ec4899" />
                                    <Bar dataKey="Depreciation" stackId="a" fill="#f59e0b" />
                                    <Bar dataKey="Other" stackId="a" fill="#94a3b8" radius={[0, 4, 4, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full text-muted-foreground bg-muted/20 rounded-xl border border-dashed border-border/50">
                                <TrendingDown className="w-6 h-6 opacity-20 mb-2" />
                                <span className="text-sm">No expenditure data available</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Key Stats Column - Moved down or kept if needed, but the design seems to have shifted. 
                    Merging the detailed stats into the first column or keeping separate. 
                    Let's re-add the detailed items as a row below if space permits or as a separate block.
                */}
                <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-border/50">
                    <StatItem
                        label="Employee Costs"
                        value={formatCurrency(employeeCosts)}
                        icon={Users}
                        subtext={totalExpenditure > 0 ? `${((employeeCosts / totalExpenditure) * 100).toFixed(0)}% of total` : "N/A"}
                        highlight={true}
                    />
                    <StatItem
                        label="Fundraising"
                        value={formatCurrency(fundraisingExpenses)}
                        icon={Megaphone}
                        subtext={fundraisingExpenses === 0 ? "No reported costs" : "Cost to raise funds"}
                    />
                    <StatItem
                        label="Depreciation"
                        value={formatCurrency(assetDepreciation)}
                        icon={TrendingDown}
                        subtext="Asset value loss"
                    />
                </div>
            </div>
        </section>
    );
};
