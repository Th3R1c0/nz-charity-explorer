import { Copy, ExternalLink, Info, Scale, Building2, Wallet } from "lucide-react";
import { CharityData } from "@/data/charityData";
import { toast } from "@/hooks/use-toast";
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

import { useState } from "react";

export const LegalStructure = ({ data }: LegalStructureProps) => {
  const [showAllSources, setShowAllSources] = useState(false);

  const copyNZBN = () => {
    navigator.clipboard.writeText(data.nzbnNumber);
    toast({
      title: "Copied!",
      description: "NZBN copied to clipboard",
    });
  };

  return (
    <section className="glass-card rounded-2xl p-6 md:p-8 animate-fade-in space-y-8">
      <div className="flex items-center gap-3">
        <div className="p-3 bg-slate-500/10 rounded-xl text-slate-500">
          <Scale className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-foreground">Legal & Structure</h2>
          <p className="text-muted-foreground text-sm">Registration details and entity type</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* NZBN Card */}
          <div className="p-4 rounded-xl bg-card border border-border/50 space-y-3">
            <div className="flex items-center gap-2 mb-1">
              <div className="p-2 bg-muted rounded-lg">
                <Building2 className="w-4 h-4 text-muted-foreground" />
              </div>
              <span className="text-sm font-medium text-muted-foreground">NZBN</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-lg md:text-xl font-mono font-bold tracking-tight text-foreground">
                {data.nzbnNumber}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={copyNZBN}
                  className="h-8 w-8 rounded-lg hover:bg-muted flex items-center justify-center transition-colors text-muted-foreground hover:text-foreground"
                  title="Copy NZBN"
                >
                  <Copy className="h-4 w-4" />
                </button>
                <a
                  href={`https://www.nzbn.govt.nz/mynzbn/search/${data.nzbnNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-8 w-8 rounded-lg hover:bg-muted flex items-center justify-center transition-colors text-muted-foreground hover:text-foreground"
                  title="View on NZBN Register"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Entity Type Card */}
          <div className="p-4 rounded-xl bg-card border border-border/50 space-y-3">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-muted rounded-lg">
                  <Info className="w-4 h-4 text-muted-foreground" />
                </div>
                <span className="text-sm font-medium text-muted-foreground">Entity Type</span>
              </div>
              <Tooltip>
                <TooltipTrigger>
                  <span className="text-xs bg-muted px-2 py-1 rounded-full text-muted-foreground hover:text-foreground cursor-help">
                    What is Tier {data.groupType}?
                  </span>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p>{groupTypeDescriptions[data.groupType]}</p>
                </TooltipContent>
              </Tooltip>
            </div>

            <div>
              <p className="text-lg font-bold text-foreground">{data.legalStructure}</p>
              <p className="text-sm text-muted-foreground">Tier {data.groupType} Reporting Entity</p>
            </div>
          </div>
        </div>

        {/* Sources of Funds */}
        <div className="p-5 rounded-xl bg-muted/30 border border-border/50">
          <div className="flex items-center gap-2 mb-4">
            <Wallet className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Registered Funding Sources</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {data.sourcesOfFunds.slice(0, showAllSources ? undefined : 6).map((source) => (
              <span
                key={source}
                className="inline-flex items-center px-3 py-1.5 rounded-lg bg-background border border-border text-sm text-foreground shadow-sm"
              >
                {source}
              </span>
            ))}
            {!showAllSources && data.sourcesOfFunds.length > 6 && (
              <button
                onClick={() => setShowAllSources(true)}
                className="inline-flex items-center px-3 py-1.5 rounded-lg bg-primary/10 border border-transparent text-sm font-medium text-primary hover:bg-primary/20 transition-colors"
              >
                +{data.sourcesOfFunds.length - 6} more
              </button>
            )}
            {showAllSources && data.sourcesOfFunds.length > 6 && (
              <button
                onClick={() => setShowAllSources(false)}
                className="inline-flex items-center px-3 py-1.5 rounded-lg bg-primary/10 border border-transparent text-sm font-medium text-primary hover:bg-primary/20 transition-colors"
              >
                Show less
              </button>
            )}
            {data.sourcesOfFunds.length === 0 && (
              <span className="text-sm text-muted-foreground italic">No specific funding sources listed</span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
