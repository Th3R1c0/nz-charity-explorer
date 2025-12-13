import { Check, ExternalLink, Calendar, Copy } from "lucide-react";
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
    <section className="glass-card rounded-2xl md:rounded-3xl p-4 md:p-10 animate-fade-in relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

      <div className="relative">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 lg:gap-6">
          {/* Identity Section */}
          <div className="flex-1 space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase ${data.registrationStatus === 'Registered'
                  ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                  : 'bg-red-500/10 text-red-500 border border-red-500/20'
                  }`}>
                  {data.registrationStatus || "Unknown Status"}
                </span>
                <span className="text-xs text-muted-foreground font-mono">
                  {data.charityRegistrationNumber || "No Reg #"}
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70 tracking-tight leading-tight">
                {data.name || "Charity Name Not Available"}
              </h1>
            </div>

            <div className="flex flex-row items-center gap-2 text-sm text-muted-foreground overflow-hidden">
              {data.dateRegistered ? (
                <div className="flex shrink-0 items-center gap-1.5 bg-muted/50 px-3 py-1.5 rounded-lg border border-border/50">
                  <Calendar className="w-4 h-4" />
                  <span>Registered {data.dateRegistered}</span>
                </div>
              ) : null}

              {data.websiteURL && (
                <a
                  href={data.websiteURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-primary transition-colors bg-muted/50 px-3 py-1.5 rounded-lg border border-border/50 hover:border-primary/50 min-w-0"
                >
                  <ExternalLink className="w-4 h-4 shrink-0" />
                  <span className="truncate max-w-[150px] md:max-w-[200px]">
                    <span className="md:hidden">{data.websiteURL.replace(/^https?:\/\/(www\.)?/, '')}</span>
                    <span className="hidden md:inline">{data.websiteURL.replace(/^https?:\/\//, '')}</span>
                  </span>
                  <ExternalLink className="w-3 h-3 opacity-50 shrink-0" />
                </a>
              )}
            </div>
          </div>

          {/* Actions Section */}
          <div className="flex flex-wrap items-center gap-2 md:gap-3 lg:self-start pt-2">
            <Button size="sm" className="h-9 px-4 md:h-10 md:px-8 gap-2 shadow-lg hover:shadow-xl transition-all order-1 md:order-2 flex-1 md:flex-none bg-emerald-600 hover:bg-emerald-700 text-white border-none" asChild>
              <a href={data.charityRegisterURL} target="_blank" rel="noopener noreferrer">
                View on Charity Register
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
