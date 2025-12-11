import { Header } from "@/components/home/Header";
import { SearchBar } from "@/components/home/SearchBar";

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <main className="pt-24 pb-16 flex items-center justify-center min-h-[calc(100vh-6rem)]">
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

          {/* Subtle hint */}
          <p className="mt-6 text-sm text-muted-foreground/60">
            Try searching "Heart" or "Health" to see results
          </p>
        </div>
      </main>
    </div>
  );
};

export default Home;
