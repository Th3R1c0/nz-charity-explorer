import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Header } from "@/components/home/Header";
import { HeroHeader } from "@/components/charity/HeroHeader";
import { MissionIdentity } from "@/components/charity/MissionIdentity";
import { Officers } from "@/components/charity/Officers";
import { MissionOverview } from "@/components/charity/MissionOverview";
import { LegalStructure } from "@/components/charity/LegalStructure";
import { FinancialHealth } from "@/components/charity/FinancialHealth";
import { IncomeRevenue } from "@/components/charity/IncomeRevenue";
import { OperationalEfficiency } from "@/components/charity/OperationalEfficiency";
import { PeopleStats } from "@/components/charity/PeopleStats";

import { MobileDetailedInfo } from "@/components/charity/MobileDetailedInfo";
import { transformCharityData } from "@/data/transformCharityData";
import { CharityData, TestFinancialCharityData } from "@/data/charityData";
import { BarChart3, Loader2, Frown } from "lucide-react";
const Index = () => {
  const {
    charitySlug
  } = useParams<{
    charitySlug: string;
  }>();
  const navigate = useNavigate();
  const [charityData, setCharityData] = useState<CharityData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchCharityData = async () => {
      if (!charitySlug) {
        navigate("/home");
        return;
      }

      // Extract CC number from the end of the slug
      const matches = charitySlug.match(/(CC\d+)$/i);
      const reg = matches ? matches[0] : charitySlug; // Fallback to full string if no match (legacy support)

      setIsLoading(true);
      setError(null);
      try {
        const profileUrl = `/api/charities/vOrganisations?$filter=CharityRegistrationNumber eq '${reg}'&$format=json`;
        const financialsUrl = `/api/charities/GrpOrgAllReturns?$filter=CharityRegistrationNumber eq '${reg}'&$select=Name,CharityRegistrationNumber,YearEnded,EndOfYearMonth,EndOfYearDayofMonth,TotalGrossIncome,TotalExpenditure,TotalAssets,TotalLiabilities,TotalEquity,NetSurplusDeficitForTheYear,GovtGrantsContracts,AllOtherGrantsAndSponsorship,DonationsKoha,ServiceTradingIncome,NewZealandDividends,AllOtherIncome,SalariesAndWages,CostOfServiceProvision,CostOfTradingOperations,Depreciation,AllOtherExpenditure,CashAndBankBalances,Investments,Buildings,AllOtherFixedAssets,PercentageSpentOverseas,NumberOfFulltimeEmployees,NumberOfParttimeEmployees,AvgAllPaidHoursPerWeek,AvgAllVolunteerHoursPerWeek,AvgNoVolunteersPerWeek,TotalAssetsLessTotalLiabilities,SurplusDeficit,GrantsRevenueFromLocalOrCentralGovernment,InterestOfDividendsReceived,EmployeeRemunerationAndOtherRelatedExpenses,FundRaisingExpenses,ReceivablesFromExchangeTransactionsAndRecoverableFromNonExchange,Inventory,PropertyPlantAndEquipmment,ReportingCurrency,PlanToUseAccumulatedFundsInTheFuture&$orderby=YearEnded desc&$format=json`;
        const officersUrl = `/api/charities/vOfficerOrganisations?$select=FullName,OfficerStatus,PositioninOrganisation,PositionAppointmentDate,LastDateAsAnOfficer,CharityRegistrationNumber&$filter=CharityRegistrationNumber eq '${reg}'&$format=json`;
        const [profileRes, financialsRes, officersRes] = await Promise.all([
          fetch(profileUrl),
          fetch(financialsUrl),
          fetch(officersUrl)
        ]);
        const profileData = await profileRes.json();
        const officersData = await officersRes.json();

        const USE_TEST_FINANCIALS = false;
        const financialsData = USE_TEST_FINANCIALS ? TestFinancialCharityData : await financialsRes.json();
        if (!profileData.d || profileData.d.length === 0) {
          setError("Charity not found");
          return;
        }
        const transformed = transformCharityData(
          { d: profileData.d },
          { d: financialsData.d || [] },
          { d: officersData.d || [] }
        );
        setCharityData(transformed);
      } catch (err) {
        console.error("Error fetching charity data:", err);
        setError("Failed to load charity data");
      } finally {
        setIsLoading(false);
      }
    };
    fetchCharityData();
  }, [charitySlug, navigate]);
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
      <div className="text-center px-4">
        <Frown className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
        <p className="text-foreground text-lg font-medium mb-2">No data for this charity is publicly available</p>
        <p className="text-muted-foreground text-sm mb-6">The information you're looking for may not be on the public register.</p>
        <button onClick={() => navigate("/home")} className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
          Back to Search
        </button>
      </div>
    </div>;
  }
  return <div className="min-h-screen bg-background">
    <Header />

    <main className="container max-w-7xl mx-auto px-3 md:px-6 py-4 md:py-8 space-y-0 md:space-y-8">
      {/* Section 1: Hero Header */}
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



      {/* NEW: Financial Health Section */}
      <div className="mobile-section md:border-b-0">
        <FinancialHealth data={charityData} />
      </div>

      {/* NEW: Income & Revenue Section */}
      <div className="mobile-section md:border-b-0">
        <IncomeRevenue data={charityData} />
      </div>

      {/* NEW: Operational Efficiency Section */}
      <div className="mobile-section md:border-b-0">
        <OperationalEfficiency data={charityData} />
      </div>

      {/* NEW: People Stats Section */}
      <div className="mobile-section md:border-b-0">
        <PeopleStats data={charityData} />
      </div>

      <div className="mobile-section">
        <LegalStructure data={charityData} />
      </div>

      <div className="mobile-section">
        <Officers data={charityData} />
      </div>

      <footer className="pt-8 md:pt-12 pb-6 md:pb-8 text-center text-xs md:text-sm text-muted-foreground flex flex-col items-center gap-2">
        <p>Data sourced from the New Zealand Charities Register</p>
        <p>Last updated: December 2024</p>
        <a href="https://discord.gg/r4fwAJC4pu" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors underline decoration-dotted underline-offset-4">
          Join our Discord
        </a>
      </footer>
    </main>
  </div>;
};
export default Index;