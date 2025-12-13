import { Heart, Check, Baby, Users, Globe } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { CharityData } from "@/data/charityData";

interface MissionIdentityProps {
  data: CharityData;
}

const beneficiaryIcons: Record<string, React.ReactNode> = {
  Children: <Baby className="h-5 w-5" />,
  Family: <Users className="h-5 w-5" />,
  Migrants: <Globe className="h-5 w-5" />,
};

const sectorIcons: Record<string, React.ReactNode> = {
  Health: <Heart className="h-5 w-5" />,
};

export const MissionIdentity = ({ data }: MissionIdentityProps) => {
  return (
    <section className="glass-card rounded-2xl md:rounded-3xl p-4 md:p-10 animate-fade-in h-full flex flex-col relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 md:hidden" />

      {/* Header */}
      <div className="flex items-center gap-4 mb-6 md:mb-8">
        <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-sm border border-primary/10">
          {sectorIcons[data.mainSectorName] || <Heart className="h-6 w-6" />}
        </div>
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-foreground">Mission & Purpose</h2>
          <Badge variant="secondary" className="hidden md:inline-flex mt-1 text-xs font-normal bg-background/50">{data.mainSectorName}</Badge>
        </div>
      </div>

      {/* Mission Statement */}
      <blockquote className="relative pl-6 border-l-4 border-primary/20 text-lg text-foreground/90 italic leading-relaxed mb-8">
        <span className="absolute -top-3 -left-3 text-4xl text-primary/10 font-serif">“</span>
        {data.charitablePurpose || "No data available"}
      </blockquote>

      {/* Sectors - Desktop only */}
      <div className="hidden md:block space-y-4 mb-8">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Sectors</h3>
        <div className="flex flex-wrap gap-2">
          {data.sectors && data.sectors.length > 0 ? (
            data.sectors.map((sector) => (
              <Badge key={sector} variant="secondary" className="px-3 py-1.5 text-sm font-normal bg-background border border-border/50">
                {sector}
              </Badge>
            ))
          ) : (
            <span className="text-sm text-muted-foreground italic">No data available</span>
          )}
        </div>
      </div>

      {/* Beneficiaries - Desktop only */}
      <div className="hidden md:block space-y-4 mb-8">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider text-center md:text-left">Who We Serve</h3>
        <div className="flex flex-wrap justify-center md:justify-start gap-4">
          {data.beneficiaries && data.beneficiaries.length > 0 ? (
            data.beneficiaries.map((beneficiary) => (
              <div key={beneficiary} className="flex flex-col items-center gap-2">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  {beneficiaryIcons[beneficiary] || <Users className="h-5 w-5" />}
                </div>
                <span className="text-sm font-medium text-foreground">{beneficiary}</span>
              </div>
            ))
          ) : (
            <span className="text-sm text-muted-foreground italic">No data available</span>
          )}
        </div>
      </div>

      {/* Activities - Desktop only */}
      <div className="hidden md:block space-y-4">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider text-center md:text-left">Activities</h3>
        <div className="flex flex-col items-center md:items-start gap-3">
          {data.activities && data.activities.length > 0 ? (
            data.activities.map((activity) => (
              <div key={activity} className="flex items-center gap-3 text-base text-foreground">
                <div className="h-5 w-5 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
                  <Check className="h-3 w-3 text-emerald-600" />
                </div>
                <span>{activity}</span>
              </div>
            ))
          ) : (
            <span className="text-sm text-muted-foreground italic">No activities listed</span>
          )}
        </div>
      </div>
    </section>
  );
};
