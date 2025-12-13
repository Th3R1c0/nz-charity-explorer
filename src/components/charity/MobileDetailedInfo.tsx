import { useState } from "react";
import { Check, Baby, Users, Globe, MapPin, Navigation, Mail, ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { CharityData } from "@/data/charityData";

interface MobileDetailedInfoProps {
  data: CharityData;
}

const beneficiaryIcons: Record<string, React.ReactNode> = {
  Children: <Baby className="h-5 w-5" />,
  Family: <Users className="h-5 w-5" />,
  Migrants: <Globe className="h-5 w-5" />
};

// Koru SVG Pattern Component
const KoruIcon = ({
  className
}: {
  className?: string;
}) => <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor" strokeWidth="3">
    <path d="M50 85 C30 85 15 70 15 50 C15 30 30 15 50 15 C65 15 75 25 75 40 C75 52 67 60 55 60 C47 60 42 55 42 47 C42 41 46 37 52 37" strokeLinecap="round" />
  </svg>;

export const MobileDetailedInfo = ({
  data
}: MobileDetailedInfoProps) => {
  const [showAllSectors, setShowAllSectors] = useState(false);
  const addressParts = [data.streetAddress, data.suburb, data.city, data.postcode].filter(Boolean);
  const fullAddress = addressParts.length > 0 ? addressParts.join(', ') : '';
  const mapsUrl = fullAddress ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}` : '';

  const visibleSectors = showAllSectors ? data.sectors : data.sectors?.slice(0, 6);
  const remainingSectorsCount = (data.sectors?.length || 0) - 6;

  return <details className="glass-card rounded-xl md:hidden group">
    <summary className="flex items-center justify-between cursor-pointer list-none p-4 md:p-6 select-none bg-card/50 hover:bg-card/80 transition-colors rounded-xl group-open:rounded-b-none group-open:bg-transparent">
      <div className="flex items-center gap-3">
        <span className="text-lg font-semibold text-foreground">Detailed Information</span>
      </div>
      <ChevronDown className="w-5 h-5 text-muted-foreground transition-transform duration-300 group-open:rotate-180" />
    </summary>

    <div className="p-4 md:p-6 pt-0 space-y-8 animate-accordion-down border-t border-border/50">
      {/* Sectors */}
      <div className="space-y-3 pt-6">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Sectors</h3>
        <div className="flex flex-wrap gap-2">
          {visibleSectors && visibleSectors.length > 0 ? (
            <>
              {visibleSectors.map(sector => <Badge key={sector} variant="secondary" className="px-3 py-1.5 text-xs font-normal bg-background border border-border/50">
                {sector}
              </Badge>)}
              {!showAllSectors && remainingSectorsCount > 0 && (
                <button
                  onClick={() => setShowAllSectors(true)}
                  className="px-3 py-1.5 text-xs font-medium text-primary hover:underline transition-colors"
                >
                  +{remainingSectorsCount} more
                </button>
              )}
              {showAllSectors && (
                <button
                  onClick={() => setShowAllSectors(false)}
                  className="px-3 py-1.5 text-xs font-medium text-primary hover:underline transition-colors"
                >
                  Show less
                </button>
              )}
            </>
          ) : (
            <span className="text-sm text-muted-foreground italic">No data available</span>
          )}
        </div>
      </div>

      {/* Who We Serve */}
      <div className="space-y-3">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Who We Serve</h3>
        <div className="flex flex-wrap gap-3">
          {data.beneficiaries && data.beneficiaries.length > 0 ? (
            data.beneficiaries.map(beneficiary => <div key={beneficiary} className="flex flex-col items-center gap-2">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                {beneficiaryIcons[beneficiary] || <Users className="h-5 w-5" />}
              </div>
              <span className="text-xs font-medium text-foreground">{beneficiary}</span>
            </div>)
          ) : (
            <span className="text-sm text-muted-foreground italic">No data available</span>
          )}
        </div>
      </div>

      {/* Activities */}
      <div className="space-y-3">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Activities</h3>
        <div className="flex flex-col gap-3">
          {data.activities && data.activities.length > 0 ? (
            data.activities.map(activity => <div key={activity} className="flex items-center gap-3 text-sm text-foreground">
              <div className="h-5 w-5 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
                <Check className="h-3 w-3 text-emerald-600" />
              </div>
              <span>{activity}</span>
            </div>)
          ) : (
            <span className="text-sm text-muted-foreground italic">No data available</span>
          )}
        </div>
      </div>

      {/* Cultural Classification */}
      {(data.kaupapaMaoriCharity || data.pasifikaCharity) && <div className="space-y-3">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Cultural Identity</h3>
        <div className="flex flex-col gap-3">
          {data.kaupapaMaoriCharity && <div className="flex items-center gap-3 bg-primary/5 border border-primary/20 rounded-xl px-4 py-3">
            <KoruIcon className="h-6 w-6 text-primary" />
            <div>
              <p className="font-semibold text-sm text-foreground">Kaupapa Māori</p>
              <p className="text-xs text-muted-foreground">Māori Values Guided</p>
            </div>
          </div>}
          {data.maoriTrustBoard && <div className="flex items-center gap-3 bg-accent border border-primary/20 rounded-xl px-4 py-3">
            <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-primary font-bold text-xs">TB</span>
            </div>
            <div>
              <p className="font-semibold text-sm text-foreground">Māori Trust Board</p>
              <p className="text-xs text-muted-foreground">Registered Entity</p>
            </div>
          </div>}
        </div>
      </div>}

      {/* Location & Operations */}
      <div className="space-y-4">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Location & Operations</h3>

        {/* Map Card */}
        <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="block relative h-40 rounded-xl bg-muted/20 border border-border overflow-hidden group">
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(#cbd5e1 1px, transparent 1px)", backgroundSize: "16px 16px" }}></div>

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping" />
              <div className="relative h-10 w-10 rounded-full bg-primary flex items-center justify-center shadow-lg">
                <MapPin className="h-5 w-5 text-primary-foreground" />
              </div>
            </div>
          </div>

          <div className="absolute bottom-2 left-2 right-2 bg-card/90 backdrop-blur-sm rounded-lg px-3 py-2 flex items-center justify-between border border-border/50">
            <span className="text-xs font-medium text-foreground">View on Google Maps</span>
            <Navigation className="h-3.5 w-3.5 text-primary" />
          </div>
        </a>

        {/* Address Details */}
        <div className="space-y-3 bg-card/30 rounded-xl p-4 border border-border/30">
          <div className="flex items-start gap-3">
            <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs text-muted-foreground font-medium">Street Address</p>
              <p className="text-sm text-foreground leading-snug">{fullAddress || 'No data available'}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Mail className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs text-muted-foreground font-medium">Postal Address</p>
              <p className="text-sm text-foreground leading-snug">{data.postalAddress || 'No data available'}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Globe className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs text-muted-foreground font-medium">Areas of Operation</p>
              <p className="text-sm text-foreground leading-snug">{data.areasOfOperation || 'No data'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </details>;
};