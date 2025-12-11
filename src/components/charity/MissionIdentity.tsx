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
    <section className="glass-card rounded-2xl p-8 space-y-8 animate-fade-in" style={{ animationDelay: "0.1s" }}>
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
          {sectorIcons[data.mainSectorName] || <Heart className="h-6 w-6 text-primary" />}
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground">Mission & Purpose</h2>
          <Badge variant="secondary" className="mt-1">{data.mainSectorName}</Badge>
        </div>
      </div>

      {/* Mission Statement */}
      <blockquote className="relative pl-6 border-l-4 border-primary/30 text-lg text-foreground/90 italic leading-relaxed">
        "{data.charitablePurpose}"
      </blockquote>

      {/* Sectors */}
      <div className="space-y-3">
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
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Who We Serve</h3>
        <div className="flex flex-wrap gap-4">
          {data.beneficiaries.map((beneficiary) => (
            <div key={beneficiary} className="flex flex-col items-center gap-2">
              <div className="h-14 w-14 rounded-full bg-accent flex items-center justify-center text-accent-foreground">
                {beneficiaryIcons[beneficiary] || <Users className="h-6 w-6" />}
              </div>
              <span className="text-sm font-medium text-foreground">{beneficiary}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Activities */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Activities</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {data.activities.map((activity) => (
            <div key={activity} className="flex items-center gap-2 text-foreground">
              <Check className="h-4 w-4 text-success flex-shrink-0" />
              <span>{activity}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
