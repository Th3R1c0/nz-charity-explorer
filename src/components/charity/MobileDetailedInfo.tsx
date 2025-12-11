import { Check, Baby, Users, Globe, Heart, MapPin, Navigation, Mail, ChevronDown } from "lucide-react";
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
  const addressParts = [data.streetAddress, data.suburb, data.city, data.postcode].filter(Boolean);
  const fullAddress = addressParts.length > 0 ? addressParts.join(', ') : '';
  const mapsUrl = fullAddress ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}` : '';
  return <details className="glass-card rounded-xl md:hidden">
      <summary className="flex items-center justify-between cursor-pointer list-none px-0 py-0">
        <div className="flex items-center gap-3">
          
          <span className="text-lg font-semibold text-foreground">Detailed Information</span>
        </div>
        <ChevronDown className="w-5 h-5 text-muted-foreground transition-transform [details[open]>&]:rotate-180" />
      </summary>
      
      <div className="px-4 pb-4 space-y-6 py-[3px]">
        {/* Sectors */}
        <div className="space-y-2">
          <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Sectors</h3>
          <div className="flex flex-wrap gap-1.5">
            {data.sectors && data.sectors.length > 0 ? (
              data.sectors.map(sector => <Badge key={sector} variant="outline" className="px-3 py-1.5 text-xs">
                  {sector}
                </Badge>)
            ) : (
              <span className="text-sm text-muted-foreground">No data available</span>
            )}
          </div>
        </div>

        {/* Who We Serve */}
        <div className="space-y-2">
          <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Who We Serve</h3>
          <div className="flex flex-wrap justify-start gap-3">
            {data.beneficiaries && data.beneficiaries.length > 0 ? (
              data.beneficiaries.map(beneficiary => <div key={beneficiary} className="flex flex-col items-center gap-1.5">
                  <div className="h-11 w-11 rounded-full bg-accent flex items-center justify-center text-accent-foreground">
                    {beneficiaryIcons[beneficiary] || <Users className="h-5 w-5" />}
                  </div>
                  <span className="text-xs font-medium text-foreground">{beneficiary}</span>
                </div>)
            ) : (
              <span className="text-sm text-muted-foreground">No data available</span>
            )}
          </div>
        </div>

        {/* Activities */}
        <div className="space-y-2">
          <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Activities</h3>
          <div className="flex flex-col gap-1.5">
            {data.activities && data.activities.length > 0 ? (
              data.activities.map(activity => <div key={activity} className="flex items-center gap-2 text-sm text-foreground">
                  <Check className="h-4 w-4 text-success flex-shrink-0" />
                  <span>{activity}</span>
                </div>)
            ) : (
              <span className="text-sm text-muted-foreground">No data available</span>
            )}
          </div>
        </div>

        {/* Cultural Classification */}
        {(data.kaupapaMaoriCharity || data.pasifikaCharity) && <div className="space-y-2">
            <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Cultural Identity</h3>
            <div className="flex flex-col gap-2">
              {data.kaupapaMaoriCharity && <div className="flex items-center gap-3 bg-primary/5 border border-primary/20 rounded-lg px-4 py-3">
                  <KoruIcon className="h-6 w-6 text-primary" />
                  <div>
                    <p className="font-semibold text-sm text-foreground">Kaupapa Māori</p>
                    <p className="text-xs text-muted-foreground">Māori Values Guided</p>
                  </div>
                </div>}
              {data.maoriTrustBoard && <div className="flex items-center gap-3 bg-accent border border-primary/20 rounded-lg px-4 py-3">
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
        <div className="space-y-3">
          <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Location & Operations</h3>
          <p className="text-xs text-muted-foreground">
            Operates in: <strong className="text-foreground">{data.areasOfOperation || 'No data'}</strong>
          </p>
          
          {/* Map Placeholder */}
          <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="block relative h-36 rounded-xl bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 border border-border overflow-hidden group">
            <div className="absolute inset-0 opacity-30">
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="grid-mobile" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-primary/30" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid-mobile)" />
              </svg>
            </div>
            
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping" />
                <div className="relative h-10 w-10 rounded-full bg-primary flex items-center justify-center shadow-lg">
                  <MapPin className="h-5 w-5 text-primary-foreground" />
                </div>
              </div>
            </div>

            <div className="absolute bottom-3 left-3 right-3 bg-card/90 backdrop-blur-sm rounded-lg px-3 py-2 flex items-center justify-between">
              <span className="text-xs font-medium text-foreground">View on Google Maps</span>
              <Navigation className="h-4 w-4 text-primary" />
            </div>
          </a>

          {/* Address Details */}
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground">Street Address</p>
                <p className="text-sm text-foreground">{fullAddress || 'No data available'}</p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <Mail className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground">Postal Address</p>
                <p className="text-sm text-foreground">{data.postalAddress || 'No data available'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </details>;
};