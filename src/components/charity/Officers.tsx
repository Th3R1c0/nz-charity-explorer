import { useState } from "react";
import { Users, ChevronDown, ChevronUp, History, UserCheck, CalendarDays } from "lucide-react";
import { CharityMembersTestData } from "@/data/charityData";
import { Badge } from "@/components/ui/badge";

interface Officer {
    FullName: string;
    OfficerStatus: string;
    PositionAppointmentDate: string;
    LastDateAsAnOfficer: string | null;
    PositioninOrganisation: string;
    CharityRegistrationNumber: string;
}

export const Officers = () => {
    const [showAllLeaders, setShowAllLeaders] = useState(false);

    // Helper to identify council members
    const isCouncilMember = (position: string) => {
        const p = position.toLowerCase();
        return p.includes("council member") || p.includes("member of council");
    };

    // Filter officers
    const currentOfficers = CharityMembersTestData.d.filter(
        (o) => o.OfficerStatus === "Qualified"
    );

    const executives = currentOfficers.filter(o => !isCouncilMember(o.PositioninOrganisation));
    const pastOfficers = CharityMembersTestData.d.filter(
        (o) => o.OfficerStatus === "Past"
    );

    const displayedExecutives = showAllLeaders ? executives : executives.slice(0, 3);
    const remainingExecutives = executives.length - 3;

    // Format date helper
    const formatDate = (dateString: string) => {
        if (!dateString) return "";
        return new Date(dateString).toLocaleDateString("en-NZ", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    const OfficerCard = ({ officer }: { officer: Officer }) => (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-card border border-border hover:border-primary/20 hover:shadow-sm transition-all duration-200 group">
            <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform mt-0.5 sm:mt-0">
                    <UserCheck className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                    <h4 className="font-bold text-base sm:text-lg text-foreground leading-tight sm:leading-none mb-1">
                        {officer.FullName}
                    </h4>
                    <p className="text-xs sm:text-sm font-medium text-primary line-clamp-2 sm:line-clamp-1">
                        {officer.PositioninOrganisation}
                    </p>
                </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground pl-12 sm:pl-0">
                <div className="hidden sm:block p-1.5 bg-muted rounded-md text-muted-foreground/70">
                    <CalendarDays className="w-4 h-4" />
                </div>
                <div className="flex flex-row sm:flex-col items-center sm:items-start gap-2 sm:gap-0">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/60 leading-none mb-0 sm:mb-0.5">Appointed</span>
                    <span className="font-medium text-foreground text-xs sm:text-sm">{formatDate(officer.PositionAppointmentDate)}</span>
                </div>
            </div>
        </div>
    );

    const StatCard = ({ label, count, icon: Icon, colorClass }: { label: string, count: number, icon: any, colorClass: string }) => (
        <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-muted/30 border border-border/50">
            <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shrink-0 ${colorClass}`}>
                <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
                <div className="text-xl sm:text-2xl font-bold text-foreground leading-none mb-1">
                    {count}
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground font-medium">
                    {label}
                </div>
            </div>
        </div>
    );

    return (
        <section className="glass-card rounded-2xl p-4 sm:p-6 md:p-8 animate-fade-in space-y-6 sm:space-y-8" style={{ animationDelay: "0.2s" }}>
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
                <div className="p-2.5 sm:p-3 bg-indigo-500/10 rounded-xl text-indigo-500">
                    <Users className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-foreground">Leadership & Officers</h2>
                    <p className="text-muted-foreground text-xs sm:text-sm">Key executives and governance structure</p>
                </div>
            </div>

            {/* Governance Stats - Moved to Top */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 pb-4 sm:pb-6 border-b border-border/50">
                <StatCard
                    label="Current Members"
                    count={currentOfficers.length}
                    icon={Users}
                    colorClass="bg-blue-500/10 text-blue-600"
                />
                <StatCard
                    label="Past Officers"
                    count={pastOfficers.length}
                    icon={History}
                    colorClass="bg-amber-500/10 text-amber-600"
                />
            </div>

            {/* Key Leadership List */}
            <div className="space-y-3 sm:space-y-4">
                <h3 className="text-xs sm:text-sm font-semibold text-muted-foreground uppercase tracking-wider pl-1">
                    Key Leadership
                </h3>
                <div className="grid grid-cols-1 gap-2 sm:gap-3">
                    {displayedExecutives.map((officer, idx) => (
                        <OfficerCard key={idx} officer={officer as Officer} />
                    ))}
                </div>

                {/* Show More/Less Button */}
                {executives.length > 3 && (
                    <button
                        onClick={() => setShowAllLeaders(!showAllLeaders)}
                        className="w-full py-2.5 text-sm font-medium text-primary hover:text-primary/80 hover:bg-primary/5 rounded-lg transition-colors flex items-center justify-center gap-2 mt-2"
                    >
                        {showAllLeaders ? (
                            <>
                                Show Less <ChevronUp className="w-4 h-4" />
                            </>
                        ) : (
                            <>
                                Show {remainingExecutives} More Leaders <ChevronDown className="w-4 h-4" />
                            </>
                        )}
                    </button>
                )}
            </div>
        </section>
    );
};
