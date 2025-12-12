import { Header } from "@/components/home/Header";
import { SearchBar } from "@/components/home/SearchBar";
import { SectorPulse } from "@/components/home/SectorPulse";
import { SectorRankings } from "@/components/home/SectorRankings";

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <main className="h-screen flex items-center justify-center">
        <div className="w-full max-w-5xl mx-auto px-4 md:px-6 text-center flex flex-col items-center">
          {/* Hero Text */}
          <div className="mb-8 md:mb-12">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-4 md:mb-6">
              See the full picture behind{" "}
              <span className="text-primary">every charity</span>{" "}
              in Aotearoa.
            </h1>
            <p className="text-base md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-2">
              Go beyond the brochure. Access detailed financials, government funding analysis, 
              and impact reports for over{" "}
              <span className="relative inline-block">
                <span className="font-semibold text-foreground">28,000</span>
                <svg 
                  className="absolute -bottom-1 left-0 w-full h-2 text-primary" 
                  viewBox="0 0 100 8" 
                  preserveAspectRatio="none"
                >
                  <path 
                    d="M0 5 Q 10 2, 20 5 T 40 5 T 60 5 T 80 5 T 100 5" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>
              </span>{" "}
              registered NZ charities.
            </p>
          </div>

          {/* Search Bar */}
          <div className="w-full">
            <SearchBar />
          </div>

          {/* Scroll hint */}
          <div className="mt-6 flex flex-col items-center">
            <p className="text-sm text-muted-foreground/60">
              scroll to see the numbers for 2025
            </p>
            <svg 
              className="w-8 h-8 mt-2 text-primary animate-bounce" 
              viewBox="0 0 24 24" 
              fill="none"
            >
              <path 
                d="M12 4C12 4 8 8 6 12C4 16 8 20 12 20C16 20 20 16 18 12C16 8 12 4 12 4Z" 
                stroke="currentColor" 
                strokeWidth="2" 
                fill="none"
              />
              <path 
                d="M12 12V18M12 18L9 15M12 18L15 15" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </main>

      {/* Sector Pulse - Executive Summary */}
      <SectorPulse />

      {/* Sector Rankings Section */}
      <SectorRankings />

      {/* Footer */}
      <footer className="py-6 border-t border-border bg-background">
        <div className="max-w-7xl mx-auto px-4 md:px-6 text-center">
          <p className="text-sm text-muted-foreground">
            made in 🇳🇿 by{" "}
            <a 
              href="https://github.com/Th3R1c0" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              rico
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
