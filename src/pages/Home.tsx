import { Header } from "@/components/home/Header";
import { SearchBar } from "@/components/home/SearchBar";

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <main className="pt-24 pb-16">
        <div className="max-w-5xl mx-auto px-6 text-center">
          {/* Hero Text */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
              See the full picture behind{" "}
              <span className="text-primary">every charity</span>{" "}
              in Aotearoa.
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Go beyond the brochure. Access detailed financials, government funding analysis, 
              and impact reports for over 28,000 registered NZ charities.
            </p>
          </div>

          {/* Search Bar */}
          <SearchBar />

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
