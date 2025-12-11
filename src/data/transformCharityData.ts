import { TestOverviewCharityData, TestFinancialCharityData, CharityData } from "./charityData";

type FinancialRecord = (typeof TestFinancialCharityData.d)[0];
type OverviewRecord = (typeof TestOverviewCharityData.d)[0];

// Get the latest financial record (most recent year)
const getLatestFinancialRecord = (records: FinancialRecord[]): FinancialRecord => {
  return records.reduce((latest, record) => {
    const latestDate = new Date(latest.YearEnded);
    const recordDate = new Date(record.YearEnded);
    return recordDate > latestDate ? record : latest;
  });
};

// Sort financial records by year and get last 5 years
const getFinancialHistory = (records: FinancialRecord[]) => {
  const sorted = [...records].sort((a, b) => 
    new Date(a.YearEnded).getTime() - new Date(b.YearEnded).getTime()
  );
  
  return sorted.slice(-5).map(record => ({
    year: new Date(record.YearEnded).getFullYear(),
    income: record.TotalGrossIncome || 0,
    expenses: record.TotalExpenditure || 0,
    surplus: record.NetSurplusDeficitForTheYear || (record.TotalGrossIncome - record.TotalExpenditure) || 0,
  }));
};

// Parse sectors from comma-separated string
const parseSectors = (sectors: string | null): string[] => {
  if (!sectors) return [];
  return sectors.split(",").map(s => s.trim()).filter(Boolean);
};

// Parse beneficiaries from comma-separated string
const parseBeneficiaries = (beneficiaries: string | null): string[] => {
  if (!beneficiaries) return [];
  return beneficiaries.split(",").map(s => s.trim()).slice(0, 3).filter(Boolean);
};

// Parse activities from comma-separated string
const parseActivities = (activities: string | null): string[] => {
  if (!activities) return [];
  return activities.split(",").map(s => s.trim()).slice(0, 4).filter(Boolean);
};

// Parse sources of funds
const parseSourcesOfFunds = (sources: string | null): string[] => {
  if (!sources) return [];
  return sources.split(",").map(s => s.trim()).filter(Boolean);
};

export const transformCharityData = (
  overview: typeof TestOverviewCharityData,
  financial: typeof TestFinancialCharityData
): CharityData => {
  const overviewData = overview.d[0];
  const financialRecords = financial.d;
  const latestFinancial = getLatestFinancialRecord(financialRecords);
  const financialHistory = getFinancialHistory(financialRecords);

  // Calculate revenue breakdown from latest record
  const govGrants = latestFinancial.GovtGrantsContracts || 0;
  const donations = latestFinancial.DonationsKoha || 0;
  const tradingServices = latestFinancial.ServiceTradingIncome || 0;
  const investments = (latestFinancial.NewZealandDividends || 0) + (latestFinancial.AllOtherIncome || 0);
  const otherGrants = latestFinancial.AllOtherGrantsAndSponsorship || 0;

  // Calculate expense breakdown
  const salaries = latestFinancial.SalariesAndWages || 0;
  const programCosts = (latestFinancial.CostOfServiceProvision || 0) + salaries * 0.7; // Rough estimate
  const adminCosts = salaries * 0.3;
  const depreciation = latestFinancial.Depreciation || 0;
  const otherExpenses = latestFinancial.AllOtherExpenditure || 0;
  
  // Adjust to match total expenses
  const totalExpenses = latestFinancial.TotalExpenditure || 0;
  const calculatedExpenses = programCosts + adminCosts + depreciation + otherExpenses;
  const scaleFactor = calculatedExpenses > 0 ? totalExpenses / calculatedExpenses : 1;

  return {
    // Section 1: Hero Header
    name: overviewData.Name,
    registrationStatus: overviewData.RegistrationStatus,
    charityRegistrationNumber: overviewData.CharityRegistrationNumber,
    dateRegistered: new Date(overviewData.DateRegistered).getFullYear(),
    websiteURL: overviewData.WebSiteURL || "",
    charityEmailAddress: overviewData.CharityEmailAddress || "",

    // Section 2: Mission & Identity
    charitablePurpose: overviewData.CharitablePurpose || "",
    mainSectorName: overviewData.MainSectorName || "",
    sectors: parseSectors(overviewData.Sectors),
    beneficiaries: parseBeneficiaries(overviewData.Beneficiaries),
    activities: parseActivities(overviewData.Activities),

    // Section 3: Cultural Classification
    kaupapaMaoriCharity: overviewData.KaupapaMaoriCharity || false,
    maoriTrustBoard: overviewData.MaoriTrustBoard || false,
    kaupapaMaoriCharityAffiliationWithIwiAndOrHapu: overviewData.KaupapaMaoriCharityAffiliationWithIwiAndOrHapu || false,
    pasifikaCharity: overviewData.PasifikaCharity || false,

    // Section 4: Location & Operations
    streetAddress: overviewData.StreetAddressLine1 || "",
    suburb: overviewData.StreetAddressSuburb || "",
    city: overviewData.StreetAddressCity || "",
    postcode: overviewData.StreetAddressPostcode || "",
    areasOfOperation: overviewData.AreasOfOperation || "",
    postalAddress: `${overviewData.PostalAddressLine1 || ""}, ${overviewData.PostalAddressLine2 || ""}, ${overviewData.PostalAddressCity || ""} ${overviewData.PostalAddressPostcode || ""}`.trim(),

    // Section 5: Legal & Structure
    nzbnNumber: overviewData.NZBNNumber || "",
    legalStructure: overviewData.LegalStructure || "",
    groupType: overviewData.GroupType || 0,
    sourcesOfFunds: parseSourcesOfFunds(overviewData.SourcesOfFunds),

    // Financial Data (5 years)
    financialHistory,

    // Current Year Financial Details
    currentFinancials: {
      totalIncome: latestFinancial.TotalGrossIncome || 0,
      totalExpenses: latestFinancial.TotalExpenditure || 0,
      netSurplus: latestFinancial.NetSurplusDeficitForTheYear || 
        ((latestFinancial.TotalGrossIncome || 0) - (latestFinancial.TotalExpenditure || 0)),
      totalAssets: latestFinancial.TotalAssets || 0,
      totalLiabilities: latestFinancial.TotalLiabilities || 0,
      totalEquity: latestFinancial.TotalEquity || 0,
      cashOnHand: latestFinancial.CashAndBankBalances || 0,
      employees: (latestFinancial.NumberOfFulltimeEmployees || 0) + (latestFinancial.NumberOfParttimeEmployees || 0),
    },

    // Revenue Breakdown
    revenueBreakdown: {
      governmentGrants: govGrants + otherGrants,
      donations: donations,
      tradingServices: tradingServices,
      investments: investments,
    },

    // Expense Breakdown (estimated)
    expenseBreakdown: {
      programCosts: Math.round(programCosts * scaleFactor),
      adminCosts: Math.round(adminCosts * scaleFactor),
      fundraisingCosts: Math.round(depreciation * scaleFactor),
      otherCosts: Math.round(otherExpenses * scaleFactor),
    },
  };
};

// Export the transformed data
export const transformedCharityData = transformCharityData(
  TestOverviewCharityData,
  TestFinancialCharityData
);
