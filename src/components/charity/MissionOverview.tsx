import { Heart, Check, Baby, Users, Globe, MapPin, Mail, ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { CharityData } from "@/data/charityData";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useState } from "react";

interface MissionOverviewProps {
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

export const MissionOverview = ({ data }: MissionOverviewProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const addressParts = [data.streetAddress, data.suburb, data.city, data.postcode].filter(Boolean);
  const fullAddress = addressParts.length > 0 ? addressParts.join(', ') : '';

  return (
    <section className="glass-card rounded-2xl p-8 space-y-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
      <div className="grid grid-cols-2 gap-8">
        {/* Left Column: Mission & Purpose */}
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
              {sectorIcons[data.mainSectorName] || <Heart className="h-6 w-6 text-primary" />}
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">Mission & Purpose</h2>
              <Badge variant="secondary" className="mt-1 text-xs">{data.mainSectorName}</Badge>
            </div>
          </div>

          {/* Mission Statement */}
          <blockquote className="pl-6 border-l-4 border-primary/30 text-lg text-foreground/90 italic leading-relaxed">
            {data.charitablePurpose ? `"${data.charitablePurpose}"` : <span className="text-muted-foreground not-italic">No data available</span>}
          </blockquote>

          {/* Sectors */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Sectors</h3>
            <div className="flex flex-wrap gap-2">
              {data.sectors && data.sectors.length > 0 ? (
                data.sectors.map((sector) => (
                  <Badge key={sector} variant="outline" className="px-4 py-2 text-sm">
                    {sector}
                  </Badge>
                ))
              ) : (
                <span className="text-sm text-muted-foreground">No data available</span>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Who We Serve & Activities */}
        <div className="space-y-6">
          {/* Who We Serve */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Who We Serve</h3>
            <div className="flex flex-wrap gap-4">
              {data.beneficiaries && data.beneficiaries.length > 0 ? (
                data.beneficiaries.map((beneficiary) => (
                  <div key={beneficiary} className="flex flex-col items-center gap-2">
                    <div className="h-14 w-14 rounded-full bg-accent flex items-center justify-center text-accent-foreground">
                      {beneficiaryIcons[beneficiary] || <Users className="h-6 w-6" />}
                    </div>
                    <span className="text-sm font-medium text-foreground">{beneficiary}</span>
                  </div>
                ))
              ) : (
                <span className="text-sm text-muted-foreground">No data available</span>
              )}
            </div>
          </div>

          {/* Activities */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Activities</h3>
            <div className="flex flex-col gap-2">
              {data.activities && data.activities.length > 0 ? (
                data.activities.map((activity) => (
                  <div key={activity} className="flex items-center gap-2 text-base text-foreground">
                    <Check className="h-4 w-4 text-success flex-shrink-0" />
                    <span>{activity}</span>
                  </div>
                ))
              ) : (
                <span className="text-sm text-muted-foreground">No data available</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Expandable Location Details */}
      <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
        <CollapsibleTrigger className="w-full flex items-center justify-center gap-2 pt-4 border-t border-border text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
          <MapPin className="h-4 w-4" />
          <span className="text-sm font-medium">Location & Operations</span>
          <ChevronDown className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-4 space-y-4">
          <div className="grid grid-cols-2 gap-6">
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-muted-foreground">Street Address</p>
                <p className="text-base text-foreground">{fullAddress || 'No data available'}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-muted-foreground">Postal Address</p>
                <p className="text-base text-foreground">{data.postalAddress || 'No data available'}</p>
              </div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Globe className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-muted-foreground">Areas of Operation</p>
              <p className="text-base text-foreground">{data.areasOfOperation || 'No data available'}</p>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </section>
  );
};
