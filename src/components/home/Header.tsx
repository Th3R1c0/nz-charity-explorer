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
  { code: "en" as Language, label: "English", enabled: true },
  { code: "mi" as Language, label: "Te Reo Māori", enabled: false },
  { code: "ja" as Language, label: "日本語", enabled: false },
];

export const Header = () => {
  const { theme, setTheme } = useTheme();
  const [language, setLanguage] = useState<Language>("en");

  const currentLanguage = languages.find(l => l.code === language);

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="nzcharityexplorer Logo" className="w-8 h-8 rounded-full" />

          <span className="font-semibold text-lg text-foreground">nzcharityexplorer</span>

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
                size="icon"
                className="hover:bg-muted sm:w-auto sm:px-3 sm:gap-2"
              >
                <Globe className="w-5 h-5 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">{currentLanguage?.label}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-popover border border-border z-50">
              {languages.map((lang) => (
                <DropdownMenuItem
                  key={lang.code}
                  disabled={!lang.enabled}
                  onClick={() => lang.enabled && setLanguage(lang.code)}
                  className={`flex items-center justify-between gap-3 ${!lang.enabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                    }`}
                >
                  <span>{lang.label}</span>
                  {language === lang.code && <Check className="w-4 h-4 text-primary" />}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};
