import { CharityData } from "@/data/charityData";
import { formatNumber } from "@/lib/utils";
import { Users, UserPlus, Clock, Briefcase } from "lucide-react";

interface PeopleStatsProps {
    data: CharityData;
}

export const PeopleStats = ({ data }: PeopleStatsProps) => {
    const { totalStaff, fullTimeCount, partTimeCount, volunteerCount, volunteerHours } = data.people;

    const fullTimePct = totalStaff > 0 ? (fullTimeCount / totalStaff) * 100 : 0;
    const partTimePct = totalStaff > 0 ? (partTimeCount / totalStaff) * 100 : 0;

    return (
        <section className="glass-card rounded-2xl p-6 md:p-8 animate-fade-in space-y-8">
            <div className="flex items-center gap-3">
                <div className="p-3 bg-indigo-500/10 rounded-xl text-indigo-500">
                    <Users className="w-6 h-6" />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-foreground">Staffing & People</h2>
                    <p className="text-muted-foreground text-sm">The team behind the mission</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Paid Workforce Column */}
                <div className="space-y-6">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Paid Workforce</h3>
                        <div className="flex items-center gap-2 bg-indigo-500/10 px-3 py-1 rounded-full text-indigo-600">
                            <Briefcase className="w-4 h-4" />
                            <span className="font-bold text-sm">{formatNumber(totalStaff)} Total Staff</span>
                        </div>
                    </div>

                    {/* Scale Visual */}
                    <div className="bg-muted/30 rounded-xl p-6 border border-border/50 space-y-4">
                        {totalStaff > 0 ? (
                            <div className="flex h-4 w-full rounded-full overflow-hidden bg-muted">
                                <div
                                    className="bg-indigo-600 h-full flex items-center justify-center text-[10px] text-white font-medium"
                                    style={{ width: `${fullTimePct}%` }}
                                >
                                    {fullTimePct > 15 && `${fullTimePct.toFixed(0)}%`}
                                </div>
                                <div
                                    className="bg-indigo-300 h-full flex items-center justify-center text-[10px] text-indigo-900 font-medium"
                                    style={{ width: `${partTimePct}%` }}
                                >
                                    {partTimePct > 15 && `${partTimePct.toFixed(0)}%`}
                                </div>
                            </div>
                        ) : (
                            <div className="flex h-4 w-full rounded-full bg-muted items-center justify-center">
                                <span className="text-[10px] text-muted-foreground">No staff data</span>
                            </div>
                        )}

                        <div className="flex justify-between items-start pt-2">
                            <div className="space-y-1">
                                <div className="flex items-center gap-2 text-indigo-600 font-medium text-sm">
                                    <div className="w-2 h-2 rounded-full bg-indigo-600" />
                                    Full-time
                                </div>
                                <p className="text-2xl font-bold text-foreground pl-4">{formatNumber(fullTimeCount)}</p>
                            </div>
                            <div className="space-y-1 text-right">
                                <div className="flex items-center gap-2 justify-end text-indigo-400 font-medium text-sm">
                                    Part-time
                                    <div className="w-2 h-2 rounded-full bg-indigo-300" />
                                </div>
                                <p className="text-2xl font-bold text-foreground pr-4">{formatNumber(partTimeCount)}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Volunteers Column */}
                <div className="space-y-6">
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">Volunteer Contribution</h3>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 rounded-xl bg-violet-500/5 border border-violet-500/20 hover:bg-violet-500/10 transition-colors">
                            <div className="p-2 w-fit rounded-lg bg-violet-500/10 text-violet-600 mb-3">
                                <UserPlus className="w-5 h-5" />
                            </div>
                            <p className="text-sm text-muted-foreground font-medium">Weekly Volunteers</p>
                            <p className="text-3xl font-bold text-foreground mt-1">{formatNumber(volunteerCount)}</p>
                        </div>

                        <div className="p-4 rounded-xl bg-violet-500/5 border border-violet-500/20 hover:bg-violet-500/10 transition-colors">
                            <div className="p-2 w-fit rounded-lg bg-violet-500/10 text-violet-600 mb-3">
                                <Clock className="w-5 h-5" />
                            </div>
                            <p className="text-sm text-muted-foreground font-medium">Weekly Hours</p>
                            <p className="text-3xl font-bold text-foreground mt-1">{formatNumber(volunteerHours)}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
