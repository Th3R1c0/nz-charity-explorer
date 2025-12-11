import { HeroHeader } from "@/components/charity/HeroHeader";
import { MissionIdentity } from "@/components/charity/MissionIdentity";
import { CulturalClassification } from "@/components/charity/CulturalClassification";
import { LocationOperations } from "@/components/charity/LocationOperations";
import { LegalStructure } from "@/components/charity/LegalStructure";
import { FinancialOverviewChart } from "@/components/charity/FinancialOverviewChart";
import { StatCards } from "@/components/charity/StatCards";
import { RevenueDonutChart } from "@/components/charity/RevenueDonutChart";
import { GovernmentDependencyGauge } from "@/components/charity/GovernmentDependencyGauge";
import { MissionEfficiencyRing } from "@/components/charity/MissionEfficiencyRing";
import { CashRunwayBar } from "@/components/charity/CashRunwayBar";
import { BalanceSheetBar } from "@/components/charity/BalanceSheetBar";
import { StressTestSlider } from "@/components/charity/StressTestSlider";
import { charityData } from "@/data/charityData";
import { Shield, BarChart3 } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center">
              <Shield className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-semibold text-foreground">Charity Transparency</h1>
              <p className="text-xs text-muted-foreground">Financial Insights Dashboard</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* Section 1: Hero Header */}
        <HeroHeader data={charityData} />

        {/* Section 2 & 3: Mission & Cultural Identity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <MissionIdentity data={charityData} />
          <div className="space-y-6">
            <CulturalClassification data={charityData} />
            <LocationOperations data={charityData} />
          </div>
        </div>

        {/* Section 5: Legal Structure (Collapsible) */}
        <LegalStructure data={charityData} />

        {/* Divider with Label */}
        <div className="relative py-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center">
            <div className="bg-background px-6 py-2 flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              <span className="text-lg font-semibold text-foreground">Financial Statements</span>
            </div>
          </div>
        </div>

        {/* Financial Section: Stat Cards */}
        <StatCards data={charityData} />

        {/* Financial Section: Overview Chart */}
        <FinancialOverviewChart data={charityData} />

        {/* Financial Section: Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <RevenueDonutChart data={charityData} />
          <GovernmentDependencyGauge data={charityData} />
          <MissionEfficiencyRing data={charityData} />
        </div>

        {/* Financial Section: Risk & Balance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CashRunwayBar data={charityData} />
          <BalanceSheetBar data={charityData} />
        </div>

        {/* Financial Section: Interactive Stress Test */}
        <StressTestSlider data={charityData} />

        {/* Footer */}
        <footer className="pt-12 pb-8 text-center text-sm text-muted-foreground">
          <p>Data sourced from the New Zealand Charities Register</p>
          <p className="mt-1">Last updated: December 2024</p>
        </footer>
      </main>
    </div>
  );
};

export default Index;
