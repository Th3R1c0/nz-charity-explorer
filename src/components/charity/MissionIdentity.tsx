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
    <section className="glass-card md:rounded-2xl p-0 md:p-8 space-y-5 md:space-y-8 animate-fade-in h-full flex flex-col" style={{ animationDelay: "0.1s" }}>
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 md:h-12 md:w-12 rounded-lg md:rounded-xl bg-primary/10 flex items-center justify-center">
          {sectorIcons[data.mainSectorName] || <Heart className="h-5 w-5 md:h-6 md:w-6 text-primary" />}
        </div>
        <div>
          <h2 className="text-lg md:text-xl font-semibold text-foreground">Mission & Purpose</h2>
          <Badge variant="secondary" className="hidden md:inline-flex mt-1 text-xs">{data.mainSectorName}</Badge>
        </div>
      </div>

      {/* Mission Statement */}
      <blockquote className="relative pl-4 md:pl-6 border-l-4 border-primary/30 text-base md:text-lg text-foreground/90 italic leading-relaxed">
        "{data.charitablePurpose}"
      </blockquote>

      {/* Sectors - Mobile only pills below mission */}
      <div className="flex md:hidden flex-wrap justify-center gap-1.5">
        {data.sectors.map((sector) => (
          <Badge key={sector} variant="outline" className="px-3 py-1.5 text-xs">
            {sector}
          </Badge>
        ))}
      </div>

      {/* Sectors - Desktop with header */}
      <div className="hidden md:block space-y-3">
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Sectors</h3>
        <div className="flex flex-wrap gap-2">
          {data.sectors.map((sector) => (
            <Badge key={sector} variant="outline" className="px-4 py-2 text-sm">
              {sector}
            </Badge>
          ))}
        </div>
      </div>

      {/* Beneficiaries */}
      <div className="space-y-2 md:space-y-3">
        <h3 className="text-xs md:text-sm font-medium text-muted-foreground uppercase tracking-wider text-center md:text-left">Who We Serve</h3>
        <div className="flex flex-wrap justify-center md:justify-start gap-3 md:gap-4">
          {data.beneficiaries.map((beneficiary) => (
            <div key={beneficiary} className="flex flex-col items-center gap-1.5 md:gap-2">
              <div className="h-11 w-11 md:h-14 md:w-14 rounded-full bg-accent flex items-center justify-center text-accent-foreground">
                {beneficiaryIcons[beneficiary] || <Users className="h-5 w-5 md:h-6 md:w-6" />}
              </div>
              <span className="text-xs md:text-sm font-medium text-foreground">{beneficiary}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Activities */}
      <div className="space-y-2 md:space-y-3">
        <h3 className="text-xs md:text-sm font-medium text-muted-foreground uppercase tracking-wider text-center md:text-left">Activities</h3>
        <div className="flex flex-col items-center md:items-start gap-1.5 md:gap-2">
          {data.activities.map((activity) => (
            <div key={activity} className="flex items-center gap-2 text-sm md:text-base text-foreground">
              <Check className="h-4 w-4 text-success flex-shrink-0" />
              <span>{activity}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
