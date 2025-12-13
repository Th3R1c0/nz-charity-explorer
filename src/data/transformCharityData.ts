import { TestOverviewCharityData, TestFinancialCharityData, CharityMembersTestData, CharityData, Officer } from "./charityData";

type FinancialRecord = (typeof TestFinancialCharityData.d)[0];
type OverviewRecord = (typeof TestOverviewCharityData.d)[0];
type OfficerRecord = (typeof CharityMembersTestData.d)[0];

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
  financial: typeof TestFinancialCharityData,
  officers: typeof CharityMembersTestData
): CharityData => {
  const overviewData = overview.d[0];
  const financialRecords = financial.d;
  const latestFinancial = getLatestFinancialRecord(financialRecords);
  const financialHistory = getFinancialHistory(financialRecords);

  // Map officers
  const mappedOfficers: Officer[] = officers.d.map((o: any) => ({
    FullName: o.FullName,
    OfficerStatus: o.OfficerStatus,
    PositionAppointmentDate: o.PositionAppointmentDate,
    LastDateAsAnOfficer: o.LastDateAsAnOfficer,
    PositioninOrganisation: o.PositioninOrganisation,
    CharityRegistrationNumber: o.CharityRegistrationNumber
  }));

  // Calculate revenue breakdown from latest record
  const govGrants = latestFinancial.GovtGrantsContracts ?? 0;
  const donations = latestFinancial.DonationsKoha ?? 0;
  const tradingServices = latestFinancial.ServiceTradingIncome ?? 0;
  const investments = (latestFinancial.NewZealandDividends ?? 0) + (latestFinancial.AllOtherIncome ?? 0);
  const otherGrants = latestFinancial.AllOtherGrantsAndSponsorship ?? 0;

  // Calculate total from known sources
  const knownRevenue = govGrants + donations + tradingServices + investments + otherGrants;
  const totalIncome = latestFinancial.TotalGrossIncome ?? 0;
  const otherIncome = Math.max(0, totalIncome - knownRevenue);

  // Calculate expense breakdown
  const salaries = latestFinancial.SalariesAndWages ?? 0;
  const costOfService = latestFinancial.CostOfServiceProvision ?? 0;
  const depreciation = latestFinancial.Depreciation ?? 0;
  const otherExpenses = latestFinancial.AllOtherExpenditure ?? 0;
  const costOfTrading = latestFinancial.CostOfTradingOperations ?? 0;

  // Calculate totals for expense breakdown
  const totalExpenses = latestFinancial.TotalExpenditure ?? 0;
  const knownExpenses = salaries + costOfService + depreciation + otherExpenses + costOfTrading;

  // If we have detailed breakdown, use it; otherwise estimate from total
  const hasDetailedExpenses = knownExpenses > 0;
  const programCosts = hasDetailedExpenses
    ? costOfService + costOfTrading + (salaries * 0.7)
    : totalExpenses * 0.7;
  const adminCosts = hasDetailedExpenses
    ? (salaries * 0.3) + (otherExpenses * 0.3)
    : totalExpenses * 0.2;
  const fundraisingCosts = depreciation;
  const remainingCosts = hasDetailedExpenses
    ? otherExpenses * 0.7
    : totalExpenses * 0.1;

  return {
    // Section 0: Officers
    officers: mappedOfficers,

    // Section 1: Hero Header
    name: overviewData.Name,
    registrationStatus: overviewData.RegistrationStatus,
    charityRegistrationNumber: overviewData.CharityRegistrationNumber,
    dateRegistered: new Date(overviewData.DateRegistered).getFullYear(),
    websiteURL: overviewData.WebSiteURL || "",
    charityEmailAddress: overviewData.CharityEmailAddress || "",
    charityRegisterURL: overviewData.CharitySummaryURL || "",

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
    // Financial Health & Sustainability
    financialHealth: {
      totalAssets: latestFinancial.TotalAssets ?? 0,
      netEquity: latestFinancial.TotalEquity ?? 0,
      operatingSurplus: latestFinancial.SurplusDeficit ?? (latestFinancial.NetSurplusDeficitForTheYear ?? 0),
      totalLiabilities: latestFinancial.TotalLiabilities ?? 0,
      liquidity: latestFinancial.CashAndBankBalances ?? 0,
      debtToAssetRatio: (latestFinancial.TotalLiabilities && latestFinancial.TotalAssets)
        ? (latestFinancial.TotalLiabilities / latestFinancial.TotalAssets)
        : 0,
      investmentValue: latestFinancial.Investments ?? 0,
    },

    // Income & Revenue Sources
    incomeSources: {
      totalGrossIncome: latestFinancial.TotalGrossIncome ?? 0,
      serviceIncome: latestFinancial.ServiceTradingIncome ?? 0,
      govtGrants: (latestFinancial.GrantsRevenueFromLocalOrCentralGovernment ?? 0) + (latestFinancial.GovtGrantsContracts ?? 0),
      donationIncome: latestFinancial.DonationsKoha ?? 0,
      investmentIncome: (latestFinancial.NewZealandDividends ?? 0) + (latestFinancial.InterestOfDividendsReceived ?? 0),
    },

    // Operational Efficiency & Spending
    operationalEfficiency: {
      totalExpenditure: latestFinancial.TotalExpenditure ?? 0,
      employeeCosts: latestFinancial.EmployeeRemunerationAndOtherRelatedExpenses ?? (latestFinancial.SalariesAndWages ?? 0),
      fundraisingExpenses: latestFinancial.FundRaisingExpenses ?? 0,
      assetDepreciation: latestFinancial.Depreciation ?? 0,
    },

    // Staffing & People
    people: {
      totalStaff: (latestFinancial.NumberOfFulltimeEmployees ?? 0) + (latestFinancial.NumberOfParttimeEmployees ?? 0),
      fullTimeCount: latestFinancial.NumberOfFulltimeEmployees ?? 0,
      partTimeCount: latestFinancial.NumberOfParttimeEmployees ?? 0,
      volunteerCount: latestFinancial.AvgNoVolunteersPerWeek ?? 0,
      volunteerHours: latestFinancial.AvgAllVolunteerHoursPerWeek ?? 0,
    },
  };
};

// Export the transformed data
export const transformedCharityData = transformCharityData(
  TestOverviewCharityData,
  TestFinancialCharityData,
  CharityMembersTestData
);
