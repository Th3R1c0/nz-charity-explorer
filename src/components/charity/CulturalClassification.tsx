import { CharityData } from "@/data/charityData";

interface CulturalClassificationProps {
  data: CharityData;
}

// Koru SVG Pattern Component
const KoruIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 100 100"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
  >
    <path
      d="M50 85 C30 85 15 70 15 50 C15 30 30 15 50 15 C65 15 75 25 75 40 C75 52 67 60 55 60 C47 60 42 55 42 47 C42 41 46 37 52 37"
      strokeLinecap="round"
    />
  </svg>
);

export const CulturalClassification = ({ data }: CulturalClassificationProps) => {
  if (!data.kaupapaMaoriCharity && !data.pasifikaCharity) {
    return null;
  }

  return (
    <section 
      className="relative glass-card md:rounded-2xl p-0 md:p-8 overflow-hidden animate-fade-in md:koru-pattern"
      style={{ animationDelay: "0.2s" }}
    >
      <div className="relative space-y-4 md:space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 md:h-12 md:w-12 rounded-lg md:rounded-xl bg-primary/10 flex items-center justify-center">
            <KoruIcon className="h-5 w-5 md:h-7 md:w-7 text-primary" />
          </div>
          <div>
            <h2 className="text-lg md:text-xl font-semibold text-foreground">Cultural Identity</h2>
            <p className="text-xs md:text-sm text-muted-foreground">Te Ao Māori Classification</p>
          </div>
        </div>

        {/* Badges */}
        <div className="flex flex-col md:flex-row md:flex-wrap gap-3 md:gap-4">
          {data.kaupapaMaoriCharity && (
            <div className="flex items-center gap-3 bg-primary/5 border border-primary/20 rounded-lg md:rounded-xl px-4 py-3 md:px-5 md:py-4">
              <KoruIcon className="h-6 w-6 md:h-8 md:w-8 text-primary" />
              <div>
                <p className="font-semibold text-sm md:text-base text-foreground">Kaupapa Māori</p>
                <p className="text-xs md:text-sm text-muted-foreground">Māori Values Guided</p>
              </div>
            </div>
          )}

          {data.maoriTrustBoard && (
            <div className="flex items-center gap-3 bg-accent border border-primary/20 rounded-lg md:rounded-xl px-4 py-3 md:px-5 md:py-4">
              <div className="h-6 w-6 md:h-8 md:w-8 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-primary font-bold text-xs md:text-sm">TB</span>
              </div>
              <div>
                <p className="font-semibold text-sm md:text-base text-foreground">Māori Trust Board</p>
                <p className="text-xs md:text-sm text-muted-foreground">Registered Entity</p>
              </div>
            </div>
          )}

          {data.kaupapaMaoriCharityAffiliationWithIwiAndOrHapu && (
            <div className="flex items-center gap-3 bg-secondary border border-border rounded-lg md:rounded-xl px-4 py-3 md:px-5 md:py-4">
              <div className="h-6 w-6 md:h-8 md:w-8 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-primary font-bold text-xs md:text-sm">Iwi</span>
              </div>
              <div>
                <p className="font-semibold text-sm md:text-base text-foreground">Iwi Affiliated</p>
                <p className="text-xs md:text-sm text-muted-foreground">Ngāti Whātua Ōrākei</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
