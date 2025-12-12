import { useState } from "react";
import { Link } from "react-router-dom";
import { Moon, Sun, Globe, Check } from "lucide-react";
import { useTheme } from "next-themes";
import logo from "@/assets/logo.webp";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Language = "en" | "mi" | "ja";

const languages = [
  { code: "en" as Language, label: "English", flag: "🇬🇧", enabled: true },
  { code: "mi" as Language, label: "Te Reo Māori", flag: "🇳🇿", enabled: false },
  { code: "ja" as Language, label: "日本語", flag: "🇯🇵", enabled: false },
];

export const Header = () => {
  const { theme, setTheme } = useTheme();
  const [language, setLanguage] = useState<Language>("en");

  const currentLanguage = languages.find(l => l.code === language);

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="CharityNZ Logo" className="w-8 h-8" />
          <span className="font-semibold text-lg text-foreground">CharityNZ</span>
        </Link>
        
        <div className="flex items-center gap-2">
          {/* Dark Mode Toggle */}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="hover:bg-muted"
          >
            {theme === "dark" ? (
              <Sun className="w-5 h-5 text-foreground" />
            ) : (
              <Moon className="w-5 h-5 text-foreground" />
            )}
          </Button>

          {/* Language Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm"
                className="gap-2 hover:bg-muted"
              >
                <Globe className="w-4 h-4" />
                <span className="hidden sm:inline">{currentLanguage?.flag} {currentLanguage?.label}</span>
                <span className="sm:hidden">{currentLanguage?.flag}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-popover border border-border z-50">
              {languages.map((lang) => (
                <DropdownMenuItem 
                  key={lang.code}
                  disabled={!lang.enabled}
                  onClick={() => lang.enabled && setLanguage(lang.code)}
                  className={`flex items-center justify-between gap-3 ${
                    !lang.enabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span>{lang.flag}</span>
                    <span>{lang.label}</span>
                  </span>
                  {language === lang.code && <Check className="w-4 h-4 text-primary" />}
                  {!lang.enabled && <span className="text-xs text-muted-foreground">Coming soon</span>}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};
