import { Heart, Check, Baby, Users, Globe, MapPin, Navigation, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { CharityData } from "@/data/charityData";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useState } from "react";
import { Button } from "@/components/ui/button";

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
  const [showAllSectors, setShowAllSectors] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // Controlled state for better UX

  const addressParts = [data.streetAddress, data.suburb, data.city, data.postcode].filter(Boolean);
  const fullAddress = addressParts.length > 0 ? addressParts.join(', ') : '';
  const mapsUrl = fullAddress ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}` : '';

  const visibleSectors = showAllSectors ? data.sectors : data.sectors?.slice(0, 6);
  const remainingSectorsCount = (data.sectors?.length || 0) - 6;

  return (
    <section className="glass-card rounded-2xl md:rounded-3xl p-6 md:p-10 animate-fade-in space-y-8">

      {/* SECTION HEADER */}
      <div className="flex items-center gap-4">
        <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
          {sectorIcons[data.mainSectorName] || <Heart className="h-6 w-6" />}
        </div>
        <div>
          <h2 className="text-2xl font-bold text-foreground">Mission & Purpose</h2>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Primary Sector:</span>
            <Badge variant="secondary" className="font-normal">{data.mainSectorName}</Badge>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Left Column: Mission Statement */}
        <div className="space-y-6">
          <div className="relative">
            <span className="absolute -top-4 -left-2 text-6xl text-primary/10 font-serif leading-none">“</span>
            <blockquote className="relative z-10 text-xl font-medium text-foreground/90 italic leading-relaxed pl-6 border-l-4 border-primary/20 py-2">
              {data.charitablePurpose || "No mission statement available."}
            </blockquote>
          </div>
        </div>

        {/* Right Column: Beneficiaries & Activities */}
        <div className="space-y-8">
          {/* Who We Serve */}
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Who We Serve</h3>
            <div className="flex flex-wrap gap-4">
              {data.beneficiaries && data.beneficiaries.length > 0 ? (
                data.beneficiaries.map((beneficiary) => (
                  <div key={beneficiary} className="flex items-center gap-3 bg-card border border-border/50 rounded-xl px-4 py-3 shadow-sm hover:shadow-md transition-shadow">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      {beneficiaryIcons[beneficiary] || <Users className="h-5 w-5" />}
                    </div>
                    <span className="font-semibold text-foreground">{beneficiary}</span>
                  </div>
                ))
              ) : (
                <span className="text-muted-foreground italic">No beneficiaries listed</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* COLLAPSIBLE DETAILS SECTION */}
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
        <div className="relative py-4">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-border/50"></div>
          </div>
          <div className="relative flex justify-center">
            <CollapsibleTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2 rounded-full border-border/50 bg-background hover:bg-muted text-muted-foreground hover:text-foreground">
                {isOpen ? "Show Less Details" : "View Locations & Sectors"}
                <ArrowRight className={`h-4 w-4 transition-transform duration-200 ${isOpen ? "-rotate-90" : "rotate-90"}`} />
              </Button>
            </CollapsibleTrigger>
          </div>
        </div>

        <CollapsibleContent className="space-y-8 pt-4 animate-accordion-down">
          {/* Sectors Grid */}
          <div className="bg-muted/30 rounded-2xl p-6 border border-border/50">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Referenced Sectors</h3>
            <div className="flex flex-wrap gap-2">
              {visibleSectors && visibleSectors.length > 0 ? (
                <>
                  {visibleSectors.map((sector) => (
                    <Badge key={sector} variant="secondary" className="px-3 py-1.5 text-sm font-normal bg-background border border-border/50 shadow-sm hover:bg-muted">
                      {sector}
                    </Badge>
                  ))}
                  {!showAllSectors && remainingSectorsCount > 0 && (
                    <button onClick={() => setShowAllSectors(true)} className="px-3 py-1.5 text-sm font-medium text-primary hover:underline">
                      And {remainingSectorsCount} more...
                    </button>
                  )}
                  {showAllSectors && (
                    <button onClick={() => setShowAllSectors(false)} className="px-3 py-1.5 text-sm font-medium text-primary hover:underline">
                      Show less
                    </button>
                  )}
                </>
              ) : (<span className="text-muted-foreground italic">No specific sectors listed</span>)}
            </div>
          </div>

          {/* Location & Map */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Map Card */}
            <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="group relative block h-64 w-full overflow-hidden rounded-2xl border border-border bg-muted/20 transition-all hover:border-primary/50 hover:shadow-lg">
              {/* Abstract Map Pattern */}
              <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(#cbd5e1 1px, transparent 1px)", backgroundSize: "20px 20px" }}></div>

              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10">
                <div className="relative mb-3">
                  <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping"></div>
                  <div className="relative h-14 w-14 rounded-full bg-primary flex items-center justify-center shadow-lg text-primary-foreground">
                    <MapPin className="h-7 w-7" />
                  </div>
                </div>
                <h4 className="text-lg font-semibold text-foreground">View on Google Maps</h4>
                <p className="text-sm text-muted-foreground mt-1 max-w-[200px] mx-auto">{fullAddress}</p>

                <div className="mt-4 flex items-center gap-1 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
                  Open Map <Navigation className="h-3 w-3" />
                </div>
              </div>
            </a>

            {/* Address Details */}
            <div className="flex flex-col justify-center space-y-6">
              <h3 className="text-lg font-semibold text-foreground">Operations & Contact</h3>
              <div className="space-y-4">
                <div className="flex gap-4 p-4 rounded-xl bg-card border border-border/50">
                  <MapPin className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Physical Address</p>
                    <p className="text-foreground mt-0.5">{fullAddress}</p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 rounded-xl bg-card border border-border/50">
                  <Navigation className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Postal Address</p>
                    <p className="text-foreground mt-0.5">{data.postalAddress || "Same as physical address"}</p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 rounded-xl bg-card border border-border/50">
                  <Globe className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Areas of Operation</p>
                    <p className="text-foreground mt-0.5">{data.areasOfOperation}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </section>
  );
};
