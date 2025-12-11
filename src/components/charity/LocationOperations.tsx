import { MapPin, Navigation, Mail } from "lucide-react";
import { CharityData } from "@/data/charityData";

interface LocationOperationsProps {
  data: CharityData;
}

export const LocationOperations = ({ data }: LocationOperationsProps) => {
  const fullAddress = `${data.streetAddress}, ${data.suburb}, ${data.city}, ${data.postcode}`;
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`;

  return (
    <section 
      className="glass-card rounded-2xl p-8 space-y-6 animate-fade-in"
      style={{ animationDelay: "0.3s" }}
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
          <MapPin className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground">Location & Operations</h2>
          <p className="text-sm text-muted-foreground">Operates in: <strong className="text-foreground">{data.areasOfOperation}</strong></p>
        </div>
      </div>

      {/* Map Placeholder */}
      <a
        href={mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block relative h-48 rounded-xl bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 border border-border overflow-hidden group hover:border-primary/30 transition-colors"
      >
        {/* Map Grid Pattern */}
        <div className="absolute inset-0 opacity-30">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-primary/30" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        
        {/* Pin */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping" />
            <div className="relative h-12 w-12 rounded-full bg-primary flex items-center justify-center shadow-lg">
              <MapPin className="h-6 w-6 text-primary-foreground" />
            </div>
          </div>
        </div>

        {/* Hover Label */}
        <div className="absolute bottom-4 left-4 right-4 bg-card/90 backdrop-blur-sm rounded-lg px-4 py-3 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="text-sm font-medium text-foreground">View on Google Maps</span>
          <Navigation className="h-4 w-4 text-primary" />
        </div>
      </a>

      {/* Address Details */}
      <div className="space-y-3">
        <div className="flex items-start gap-3">
          <MapPin className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm text-muted-foreground">Street Address</p>
            <p className="text-foreground">{fullAddress}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Mail className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm text-muted-foreground">Postal Address</p>
            <p className="text-foreground">{data.postalAddress}</p>
          </div>
        </div>
      </div>
    </section>
  );
};
