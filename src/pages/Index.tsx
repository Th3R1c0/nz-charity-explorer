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
        <div className="container max-w-7xl mx-auto px-4 py-3 md:py-4">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="h-8 w-8 md:h-10 md:w-10 rounded-lg md:rounded-xl bg-primary flex items-center justify-center">
              <Shield className="h-4 w-4 md:h-5 md:w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-semibold text-foreground text-sm md:text-base">Charity Transparency</h1>
              <p className="text-[10px] md:text-xs text-muted-foreground">Financial Insights Dashboard</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-8 space-y-0 md:space-y-8">
        {/* Section 1: Hero Header */}
        <div className="mobile-section">
          <HeroHeader data={charityData} />
        </div>

        {/* Section 2 & 3: Mission & Cultural Identity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 md:gap-6">
          <div className="mobile-section">
            <MissionIdentity data={charityData} />
          </div>
          <div className="space-y-0 md:space-y-6">
            <div className="mobile-section">
              <CulturalClassification data={charityData} />
            </div>
            <div className="mobile-section">
              <LocationOperations data={charityData} />
            </div>
          </div>
        </div>

        {/* Section 5: Legal Structure (Collapsible) */}
        <div className="mobile-section">
          <LegalStructure data={charityData} />
        </div>

        {/* Divider with Label */}
        <div className="relative py-6 md:py-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center">
            <div className="bg-background px-4 md:px-6 py-2 flex items-center gap-2">
              <BarChart3 className="h-4 w-4 md:h-5 md:w-5 text-primary" />
              <span className="text-base md:text-lg font-semibold text-foreground">Financial Statements</span>
            </div>
          </div>
        </div>

        {/* Financial Section: Stat Cards */}
        <div className="mobile-section md:border-b-0">
          <StatCards data={charityData} />
        </div>

        {/* Financial Section: Overview Chart */}
        <div className="mobile-section md:border-b-0">
          <FinancialOverviewChart data={charityData} />
        </div>

        {/* Financial Section: Key Metrics Grid */}
        <div className="space-y-0 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-6">
          <div className="mobile-section md:border-b-0">
            <RevenueDonutChart data={charityData} />
          </div>
          <div className="mobile-section md:border-b-0">
            <GovernmentDependencyGauge data={charityData} />
          </div>
          <div className="mobile-section md:border-b-0 md:col-span-2 lg:col-span-1">
            <MissionEfficiencyRing data={charityData} />
          </div>
        </div>

        {/* Financial Section: Risk & Balance */}
        <div className="space-y-0 md:space-y-0 md:grid lg:grid-cols-2 md:gap-6">
          <div className="mobile-section md:border-b-0">
            <CashRunwayBar data={charityData} />
          </div>
          <div className="mobile-section md:border-b-0">
            <BalanceSheetBar data={charityData} />
          </div>
        </div>

        {/* Financial Section: Interactive Stress Test */}
        <div className="pt-4 md:pt-0">
          <StressTestSlider data={charityData} />
        </div>

        {/* Footer */}
        <footer className="pt-8 md:pt-12 pb-6 md:pb-8 text-center text-xs md:text-sm text-muted-foreground">
          <p>Data sourced from the New Zealand Charities Register</p>
          <p className="mt-1">Last updated: December 2024</p>
        </footer>
      </main>
    </div>
  );
};

export default Index;
