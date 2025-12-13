import { CharityData } from "@/data/charityData";
import { formatCurrency } from "@/lib/utils";
import { Activity, Wallet, TrendingUp, TrendingDown, Landmark, Scale } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { ComposedChart, Line, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid } from "recharts";

interface FinancialHealthProps {
    data: CharityData;
}

export const FinancialHealth = ({ data }: FinancialHealthProps) => {
    const { totalAssets, netEquity, operatingSurplus, totalLiabilities, liquidity, debtToAssetRatio, investmentValue } = data.financialHealth;
    const historyData = data.financialHistory;

    const isSurplus = operatingSurplus >= 0;

    const StatItem = ({ label, value, icon: Icon, subtext }: { label: string; value: string; icon: any; subtext?: string }) => (
        <div className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border/50 hover:border-primary/20 transition-all duration-200">
            <div className="p-2.5 bg-primary/10 rounded-lg text-primary shrink-0">
                <Icon className="w-5 h-5" />
            </div>
            <div>
                <p className="text-sm text-muted-foreground font-medium mb-0.5">{label}</p>
                <p className="text-xl md:text-2xl font-bold text-foreground tracking-tight">{value}</p>
                {subtext && <p className="text-xs text-muted-foreground mt-1">{subtext}</p>}
            </div>
        </div>
    );

    return (
        <section className="glass-card rounded-2xl p-4 md:p-8 animate-fade-in space-y-8">
            <div className="flex items-center gap-3 px-2 md:px-0">
                <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-500">
                    <Activity className="w-6 h-6" />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-foreground">Financial Health & Sustainability</h2>
                    <p className="text-muted-foreground text-sm">Asset base, liquidity, and long-term viability</p>
                </div>
            </div>

            <div className="space-y-6">
                {/* Historical Trend Chart */}
                <div className="w-full bg-card/50 border border-border/50 rounded-xl p-4 md:p-6">
                    <div className="mb-6">
                        <h3 className="text-base font-semibold text-foreground">Financial Performance History</h3>
                        <p className="text-xs text-muted-foreground">Income vs. Expenses & Net Surplus over time</p>
                    </div>
                    {historyData && historyData.length > 0 && historyData.some(d => d.income > 0 || d.expenses > 0) ? (
                        <div className="h-[250px] md:h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <ComposedChart data={historyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                                    <XAxis
                                        dataKey="year"
                                        tick={{ fontSize: 12, fill: '#888' }}
                                        axisLine={false}
                                        tickLine={false}
                                    />
                                    <YAxis
                                        hide={false}
                                        tick={{ fontSize: 10, fill: '#888' }}
                                        axisLine={false}
                                        tickLine={false}
                                        tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`}
                                    />
                                    <Tooltip
                                        cursor={{ fill: 'rgba(0,0,0,0.02)' }}
                                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                        formatter={(value: number) => formatCurrency(value)}
                                    />
                                    <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                                    <Bar dataKey="income" name="Total Income" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={20} />
                                    <Bar dataKey="expenses" name="Total Expenses" fill="#94a3b8" radius={[4, 4, 0, 0]} barSize={20} />
                                    <Line type="monotone" dataKey="surplus" name="Net Surplus" stroke="#10b981" strokeWidth={3} dot={{ r: 4, fill: '#10b981', strokeWidth: 0 }} />
                                </ComposedChart>
                            </ResponsiveContainer>
                        </div>
                    ) : (
                        <div className="h-[250px] flex flex-col items-center justify-center text-muted-foreground bg-muted/20 rounded-lg">
                            <Activity className="w-8 h-8 opacity-20 mb-2" />
                            <p>No historical financial data available</p>
                        </div>
                    )}
                </div>

                {/* Primary Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <StatItem
                        label="Total Asset Base"
                        value={totalAssets > 0 ? formatCurrency(totalAssets) : "N/A"}
                        icon={Landmark}
                        subtext="Total value of owned assets"
                    />
                    <StatItem
                        label="Net Equity"
                        value={formatCurrency(netEquity)}
                        icon={Scale}
                        subtext="Total assets minus debts"
                    />
                    <StatItem
                        label="Liquidity (Cash)"
                        value={formatCurrency(liquidity)}
                        icon={Wallet}
                        subtext="Immediate cash on hand"
                    />
                </div>

                {/* Secondary Stats & Ratios */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-muted/20 p-4 md:p-6 rounded-xl border border-border/50">
                    {/* Operating Performance */}
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-foreground">Operating Performance</span>
                            <span className={`text-sm font-bold px-2 py-0.5 rounded-full ${isSurplus ? 'bg-emerald-500/10 text-emerald-600' : 'bg-red-500/10 text-red-600'}`}>
                                {isSurplus ? 'Surplus' : 'Deficit'}
                            </span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-full ${isSurplus ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'}`}>
                                {isSurplus ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
                            </div>
                            <div>
                                <div className={`text-2xl font-bold ${isSurplus ? 'text-emerald-600' : 'text-red-600'}`}>
                                    {isSurplus ? '+' : ''}{formatCurrency(operatingSurplus)}
                                </div>
                                <p className="text-xs text-muted-foreground">Net result from operations this year</p>
                            </div>
                        </div>
                    </div>

                    {/* Debt Ratio */}
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-foreground">Debt-to-Asset Ratio</span>
                            <span className="text-sm font-bold text-foreground">{(debtToAssetRatio * 100).toFixed(1)}%</span>
                        </div>
                        <Progress value={debtToAssetRatio * 100} className="h-2.5" />
                        <div className="flex justify-between text-xs text-muted-foreground">
                            <span>Liabilities: {formatCurrency(totalLiabilities)}</span>
                            <span>Healthy &lt; 50%</span>
                        </div>
                    </div>
                </div>

                {/* Investment Note */}
                {investmentValue > 0 && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground px-1">
                        <TrendingUp className="w-4 h-4 text-primary" />
                        <span>Holds <strong>{formatCurrency(investmentValue)}</strong> in investments for future stability.</span>
                    </div>
                )}
            </div>
        </section>
    );
};
