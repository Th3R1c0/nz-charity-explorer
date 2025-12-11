import { Check, ExternalLink, Mail, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { CharityData } from "@/data/charityData";

interface HeroHeaderProps {
  data: CharityData;
}

export const HeroHeader = ({ data }: HeroHeaderProps) => {
  const currentYear = new Date().getFullYear();
  const yearsOperating = currentYear - data.dateRegistered;

  const copyRegistrationNumber = () => {
    navigator.clipboard.writeText(data.charityRegistrationNumber);
    toast({
      title: "Copied!",
      description: "Registration number copied to clipboard",
    });
  };

  return (
    <section className="relative overflow-hidden glass-card md:rounded-2xl p-0 md:p-8 animate-fade-in">
      {/* Background Pattern - hidden on mobile */}
      <div className="hidden md:block absolute inset-0 opacity-5 bg-gradient-to-br from-primary via-transparent to-primary/50" />
      
      <div className="relative flex flex-col gap-4 md:gap-6 lg:flex-row lg:items-center lg:justify-between">
        {/* Left: Identity */}
        <div className="space-y-2 min-w-0">
          <h1 className="text-lg md:text-2xl lg:text-3xl font-bold text-foreground tracking-tight leading-tight">
            {data.name}
          </h1>
          
          <div className="flex flex-wrap items-center gap-2 md:gap-3">
            {/* Status Badge */}
            <Badge 
              variant={data.registrationStatus === "Registered" ? "default" : "destructive"}
              className="gap-1 md:gap-1.5 px-2 md:px-3 py-0.5 md:py-1 text-xs md:text-sm"
            >
              <Check className="h-3 w-3 md:h-3.5 md:w-3.5" />
              {data.registrationStatus}
            </Badge>
            
            {/* Registration Number */}
            <button
              onClick={copyRegistrationNumber}
              className="flex items-center gap-1 md:gap-1.5 text-xs md:text-sm text-muted-foreground hover:text-foreground transition-colors group"
            >
              <span className="font-mono">{data.charityRegistrationNumber}</span>
              <Copy className="h-3 w-3 md:h-3.5 md:w-3.5 opacity-50 md:opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          </div>
        </div>

        {/* Right: Action Buttons */}
        <div className="flex items-center gap-2 md:gap-3">
          <Button
            variant="outline"
            size="default"
            className="gap-1.5 md:gap-2 flex-1 md:flex-none text-sm"
            asChild
          >
            <a href={`mailto:${data.charityEmailAddress}`}>
              <Mail className="h-4 w-4" />
              Contact
            </a>
          </Button>
          
          <Button
            size="default"
            className="gap-1.5 md:gap-2 flex-1 md:flex-none text-sm"
            asChild
          >
            <a href={`https://${data.websiteURL}`} target="_blank" rel="noopener noreferrer">
              Visit Website
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};
