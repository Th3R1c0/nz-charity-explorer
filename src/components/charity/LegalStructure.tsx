import { Copy, ExternalLink, Info, ChevronDown } from "lucide-react";
import { CharityData } from "@/data/charityData";
import { toast } from "@/hooks/use-toast";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface LegalStructureProps {
  data: CharityData;
}

const groupTypeDescriptions: Record<number, string> = {
  1: "Large charity (Tier 1) - Highest reporting requirements",
  2: "Medium-large charity (Tier 2) - Standard reporting requirements",
  3: "Medium charity (Tier 3) - Simplified reporting requirements",
  4: "Small charity (Tier 4) - Minimal reporting requirements",
};

export const LegalStructure = ({ data }: LegalStructureProps) => {
  const copyNZBN = () => {
    navigator.clipboard.writeText(data.nzbnNumber);
    toast({
      title: "Copied!",
      description: "NZBN copied to clipboard",
    });
  };

  return (
    <section 
      className="glass-card rounded-2xl overflow-hidden animate-fade-in"
      style={{ animationDelay: "0.4s" }}
    >
      <Accordion type="single" collapsible>
        <AccordionItem value="legal" className="border-none">
          <AccordionTrigger className="px-8 py-6 hover:no-underline hover:bg-muted/50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-muted flex items-center justify-center">
                <Info className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="text-left">
                <h2 className="text-lg font-semibold text-foreground">Legal & Structure</h2>
                <p className="text-sm text-muted-foreground">Registration details and fine print</p>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="px-8 pb-8 space-y-6">
              {/* NZBN */}
              <div className="flex items-center justify-between p-4 bg-muted/50 rounded-xl">
                <div>
                  <p className="text-sm text-muted-foreground">NZBN (New Zealand Business Number)</p>
                  <p className="font-mono text-foreground">{data.nzbnNumber}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={copyNZBN}
                    className="h-9 w-9 rounded-lg hover:bg-muted flex items-center justify-center transition-colors"
                  >
                    <Copy className="h-4 w-4 text-muted-foreground" />
                  </button>
                  <a
                    href={`https://www.nzbn.govt.nz/mynzbn/search/${data.nzbnNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-9 w-9 rounded-lg hover:bg-muted flex items-center justify-center transition-colors"
                  >
                    <ExternalLink className="h-4 w-4 text-muted-foreground" />
                  </a>
                </div>
              </div>

              {/* Structure & Group Type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-muted/50 rounded-xl">
                  <p className="text-sm text-muted-foreground">Legal Structure</p>
                  <p className="text-foreground font-medium">{data.legalStructure}</p>
                </div>

                <div className="p-4 bg-muted/50 rounded-xl">
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-muted-foreground">Group Type</p>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-3.5 w-3.5 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        <p>{groupTypeDescriptions[data.groupType]}</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <p className="text-foreground font-medium">Tier {data.groupType}</p>
                </div>
              </div>

              {/* Sources of Funds */}
              <div>
                <p className="text-sm text-muted-foreground mb-3">Sources of Funds</p>
                <ul className="space-y-2">
                  {data.sourcesOfFunds.map((source) => (
                    <li key={source} className="flex items-center gap-2 text-foreground">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                      {source}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
};
