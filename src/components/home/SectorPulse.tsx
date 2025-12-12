import { Building2, DollarSign, Users, Heart } from "lucide-react";

// Random placeholder data for now
const PULSE_DATA = {
  totalEntities: 28342,
  totalRevenue: 24.5, // billions
  totalWorkforce: 185420,
  volunteerContribution: 3.2, // billions (hours * $26)
};

const formatBillions = (value: number) => `$${value.toFixed(1)}B`;
const formatNumber = (value: number) => value.toLocaleString();

export const SectorPulse = () => {
  const stats = [
    {
      label: "TOTAL ENTITIES",
      value: formatNumber(PULSE_DATA.totalEntities),
      icon: Building2,
    },
    {
      label: "TOTAL SECTOR REVENUE",
      value: formatBillions(PULSE_DATA.totalRevenue),
      icon: DollarSign,
    },
    {
      label: "TOTAL WORKFORCE",
      value: formatNumber(PULSE_DATA.totalWorkforce),
      icon: Users,
    },
    {
      label: "VOLUNTEER CONTRIBUTION",
      value: formatBillions(PULSE_DATA.volunteerContribution),
      icon: Heart,
    },
  ];

  return (
    <section className="bg-muted/30 border-b border-border">
      {/* Desktop: Horizontal strip */}
      <div className="hidden md:block max-w-7xl mx-auto">
        <div className="grid grid-cols-4 divide-x divide-border">
          {stats.map((stat, index) => (
            <div 
              key={stat.label}
              className="relative py-8 px-6 flex items-center gap-4 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Large semi-transparent icon */}
              <stat.icon className="w-12 h-12 text-primary/15 absolute left-4" strokeWidth={1.5} />
              
              <div className="pl-12">
                <p className="text-xs font-medium text-muted-foreground tracking-wider uppercase mb-1">
                  {stat.label}
                </p>
                <p className="text-2xl font-bold text-foreground">
                  {stat.value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile: 2x2 Grid */}
      <div className="md:hidden">
        <div className="grid grid-cols-2">
          {stats.map((stat, index) => (
            <div 
              key={stat.label}
              className={`py-6 px-4 text-center animate-fade-in ${
                index < 2 ? "border-b border-border" : ""
              } ${index % 2 === 0 ? "border-r border-border" : ""}`}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <p className="text-xs font-medium text-muted-foreground tracking-wide uppercase mb-1">
                {stat.label}
              </p>
              <p className="text-xl font-bold text-foreground">
                {stat.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
