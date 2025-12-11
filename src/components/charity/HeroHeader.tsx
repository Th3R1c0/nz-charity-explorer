import { Check, ExternalLink, Mail, Copy, Clock, Building2 } from "lucide-react";
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
    <section className="relative overflow-hidden rounded-2xl glass-card p-8 animate-fade-in">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 bg-gradient-to-br from-primary via-transparent to-primary/50" />
      
      <div className="relative flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        {/* Left: Logo & Identity */}
        <div className="flex items-center gap-6">
          <div className="h-20 w-20 rounded-2xl bg-primary/10 flex items-center justify-center stat-glow">
            <Building2 className="h-10 w-10 text-primary" />
          </div>
          
          <div className="space-y-2">
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground tracking-tight">
              {data.name}
            </h1>
            
            <div className="flex flex-wrap items-center gap-3">
              {/* Status Badge */}
              <Badge 
                variant={data.registrationStatus === "Registered" ? "default" : "destructive"}
                className="gap-1.5 px-3 py-1"
              >
                <Check className="h-3.5 w-3.5" />
                {data.registrationStatus}
              </Badge>
              
              {/* Registration Number */}
              <button
                onClick={copyRegistrationNumber}
                className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors group"
              >
                <span className="font-mono">{data.charityRegistrationNumber}</span>
                <Copy className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
              
              {/* Years Operating */}
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Clock className="h-3.5 w-3.5" />
                <span>Operating for <strong className="text-foreground">{yearsOperating} Years</strong></span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Action Buttons */}
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="lg"
            className="gap-2"
            asChild
          >
            <a href={`mailto:${data.charityEmailAddress}`}>
              <Mail className="h-4 w-4" />
              Contact
            </a>
          </Button>
          
          <Button
            size="lg"
            className="gap-2"
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
