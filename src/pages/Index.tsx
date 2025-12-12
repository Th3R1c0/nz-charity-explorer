import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Header } from "@/components/home/Header";
import { HeroHeader } from "@/components/charity/HeroHeader";
import { MissionIdentity } from "@/components/charity/MissionIdentity";
import { MissionOverview } from "@/components/charity/MissionOverview";
import { LegalStructure } from "@/components/charity/LegalStructure";
import { FinancialOverviewChart } from "@/components/charity/FinancialOverviewChart";
import { StatCards } from "@/components/charity/StatCards";
import { RevenueDonutChart } from "@/components/charity/RevenueDonutChart";
import { GovernmentDependencyGauge } from "@/components/charity/GovernmentDependencyGauge";
import { MissionEfficiencyRing } from "@/components/charity/MissionEfficiencyRing";
import { CashRunwayBar } from "@/components/charity/CashRunwayBar";
import { BalanceSheetBar } from "@/components/charity/BalanceSheetBar";
import { StressTestSlider } from "@/components/charity/StressTestSlider";
import { MobileDetailedInfo } from "@/components/charity/MobileDetailedInfo";
import { transformCharityData } from "@/data/transformCharityData";
import { CharityData } from "@/data/charityData";
import { BarChart3, Loader2 } from "lucide-react";
const Index = () => {
  const {
    charityId
  } = useParams<{
    charityId: string;
  }>();
  const navigate = useNavigate();
  const [charityData, setCharityData] = useState<CharityData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchCharityData = async () => {
      if (!charityId) {
        navigate("/home");
        return;
      }
      setIsLoading(true);
      setError(null);
      try {
        const reg = decodeURIComponent(charityId);
        const profileUrl = `http://www.odata.charities.govt.nz/vOrganisations?$filter=CharityRegistrationNumber eq '${reg}'&$format=json`;
        const financialsUrl = `http://www.odata.charities.govt.nz/GrpOrgAllReturns?$filter=CharityRegistrationNumber eq '${reg}'&$select=Name,CharityRegistrationNumber,YearEnded,EndOfYearMonth,EndOfYearDayofMonth,TotalGrossIncome,TotalExpenditure,TotalAssets,TotalLiabilities,TotalEquity,NetSurplusDeficitForTheYear,GovtGrantsContracts,AllOtherGrantsAndSponsorship,DonationsKoha,ServiceTradingIncome,NewZealandDividends,AllOtherIncome,SalariesAndWages,CostOfServiceProvision,CostOfTradingOperations,Depreciation,AllOtherExpenditure,CashAndBankBalances,Investments,Buildings,AllOtherFixedAssets,PercentageSpentOverseas,NumberOfFulltimeEmployees,NumberOfParttimeEmployees,AvgAllPaidHoursPerWeek,AvgAllVolunteerHoursPerWeek,AvgNoVolunteersPerWeek&$orderby=YearEnded desc&$format=json`;
        const proxyBase = "https://corsproxy.io/?";
        const [profileRes, financialsRes] = await Promise.all([fetch(proxyBase + encodeURIComponent(profileUrl)), fetch(proxyBase + encodeURIComponent(financialsUrl))]);
        const profileData = await profileRes.json();
        const financialsData = await financialsRes.json();
        if (!profileData.d || profileData.d.length === 0) {
          setError("Charity not found");
          return;
        }
        const transformed = transformCharityData({
          d: profileData.d
        }, {
          d: financialsData.d || []
        });
        setCharityData(transformed);
      } catch (err) {
        console.error("Error fetching charity data:", err);
        setError("Failed to load charity data");
      } finally {
        setIsLoading(false);
      }
    };
    fetchCharityData();
  }, [charityId, navigate]);
  if (isLoading) {
    return <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
          <p className="mt-4 text-muted-foreground">Loading charity data...</p>
        </div>
      </div>;
  }
  if (error || !charityData) {
    return <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-destructive text-lg">{error || "Something went wrong"}</p>
          <button onClick={() => navigate("/home")} className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-lg">
            Back to Search
          </button>
        </div>
      </div>;
  }
  return <div className="min-h-screen bg-background">
      <Header />

      <main className="container max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-8 space-y-0 md:space-y-8">
        {/* Section 1: Hero Header */}
        <div className="mobile-section">
          <HeroHeader data={charityData} />
        </div>

        {/* Desktop: Combined Mission Overview Card */}
        <div className="hidden md:block">
          <MissionOverview data={charityData} />
        </div>

        {/* Mobile: Original Mission Identity */}
        <div className="mobile-section md:hidden">
          <MissionIdentity data={charityData} />
        </div>

        {/* Mobile: Detailed Information Dropdown */}
        <div className="mobile-section md:hidden">
          <MobileDetailedInfo data={charityData} />
        </div>

        {/* Divider with Label */}
        <div className="md:relative md:py-0">
          <div className="hidden md:block absolute inset-0 flex items-center">
            <div className="w-full border-t border-border" />
          </div>
          <div className="hidden md:flex relative justify-center">
            <div className="bg-background px-6 py-2 flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              <span className="text-lg font-semibold text-foreground">Financial Statements</span>
            </div>
          </div>
          <div className="flex md:hidden items-center justify-center gap-3 py-4">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <BarChart3 className="h-5 w-5 text-primary" />
            </div>
            <div className="text-center">
              <h2 className="text-lg font-semibold text-foreground">Financial Statements</h2>
            </div>
          </div>
        </div>

        {/* Financial Sections */}
        <div className="mobile-section md:border-b-0">
          <StatCards data={charityData} />
        </div>

        <div className="mobile-section md:border-b-0">
          <FinancialOverviewChart data={charityData} />
        </div>

        <div className="space-y-0 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-6">
          <div className="mobile-section md:border-b-0 md:h-full">
            <RevenueDonutChart data={charityData} />
          </div>
          <div className="mobile-section md:border-b-0 md:h-full">
            <GovernmentDependencyGauge data={charityData} />
          </div>
          <div className="mobile-section md:border-b-0 md:col-span-2 lg:col-span-1 md:h-full">
            <MissionEfficiencyRing data={charityData} />
          </div>
        </div>

        <div className="space-y-0 md:space-y-0 md:grid lg:grid-cols-2 md:gap-6">
          <div className="mobile-section md:border-b-0 md:h-full">
            <BalanceSheetBar data={charityData} />
          </div>
          <div className="mobile-section md:border-b-0 md:h-full">
            <CashRunwayBar data={charityData} />
          </div>
        </div>

        <div className="pt-4 md:pt-0">
          <StressTestSlider data={charityData} />
        </div>

        <div className="mobile-section">
          <LegalStructure data={charityData} />
        </div>

        <footer className="pt-8 md:pt-12 pb-6 md:pb-8 text-center text-xs md:text-sm text-muted-foreground">
          <p>Data sourced from the New Zealand Charities Register</p>
          <p className="mt-1">Last updated: December 2024</p>
        </footer>
      </main>
    </div>;
};
export default Index;