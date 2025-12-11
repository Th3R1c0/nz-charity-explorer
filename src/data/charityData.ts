export const charityData = {
  // Section 1: Hero Header
  name: "Ngati Whatua Orakei Health Limited",
  registrationStatus: "Registered",
  charityRegistrationNumber: "CC27019",
  dateRegistered: 2008,
  websiteURL: "www.orakeihealth.co.nz",
  charityEmailAddress: "accounts@nwo.iwi.nz",

  // Section 2: Mission & Identity
  charitablePurpose: "To provide general health services to the community, focusing on accessible and culturally appropriate healthcare for all members of the Orakei community.",
  mainSectorName: "Health",
  sectors: ["Health", "Social services"],
  beneficiaries: ["Children", "Family", "Migrants"],
  activities: ["Provides advice", "Provides buildings", "Provides services", "Runs programs"],

  // Section 3: Cultural Classification
  kaupapaMaoriCharity: true,
  maoriTrustBoard: true,
  kaupapaMaoriCharityAffiliationWithIwiAndOrHapu: true,
  pasifikaCharity: false,

  // Section 4: Location & Operations
  streetAddress: "230 Kupe Street",
  suburb: "Orakei",
  city: "Auckland",
  postcode: "1071",
  areasOfOperation: "Auckland",
  postalAddress: "PO Box 42183, Orakei, Auckland 1745",

  // Section 5: Legal & Structure
  nzbnNumber: "9429038455483",
  legalStructure: "Company",
  groupType: 4,
  sourcesOfFunds: ["Government grants", "Service provision", "Donations", "Investment income"],

  // Financial Data (5 years)
  financialHistory: [
    { year: 2021, income: 2850000, expenses: 2650000, surplus: 200000 },
    { year: 2022, income: 3120000, expenses: 2890000, surplus: 230000 },
    { year: 2023, income: 3450000, expenses: 3200000, surplus: 250000 },
    { year: 2024, income: 3680000, expenses: 3550000, surplus: 130000 },
    { year: 2025, income: 3920000, expenses: 3710000, surplus: 210000 },
  ],

  // Current Year Financial Details
  currentFinancials: {
    totalIncome: 3920000,
    totalExpenses: 3710000,
    netSurplus: 210000,
    totalAssets: 4850000,
    totalLiabilities: 1200000,
    totalEquity: 3650000,
    cashOnHand: 890000,
    employees: 42,
  },

  // Revenue Breakdown
  revenueBreakdown: {
    governmentGrants: 2350000,
    donations: 480000,
    tradingServices: 850000,
    investments: 240000,
  },

  // Expense Breakdown
  expenseBreakdown: {
    programCosts: 2780000,
    adminCosts: 620000,
    fundraisingCosts: 180000,
    otherCosts: 130000,
  },
};

export type CharityData = typeof charityData;
