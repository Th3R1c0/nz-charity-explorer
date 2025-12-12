import { Link } from "react-router-dom";
import { Moon, Globe } from "lucide-react";
import logo from "@/assets/logo.webp";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="CharityNZ Logo" className="w-8 h-8" />
          <span className="font-semibold text-lg text-foreground">CharityNZ</span>
        </Link>
        
        <div className="flex items-center gap-2">
          {/* Dark Mode Toggle - disabled */}
          <Button 
            variant="ghost" 
            size="icon" 
            disabled 
            className="opacity-50 cursor-not-allowed"
            title="Coming soon"
          >
            <Moon className="w-5 h-5" />
          </Button>

          {/* Language Selector - disabled */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                disabled 
                className="opacity-50 cursor-not-allowed"
                title="Coming soon"
              >
                <Globe className="w-5 h-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-popover">
              <DropdownMenuItem disabled>English</DropdownMenuItem>
              <DropdownMenuItem disabled>Te Reo Māori</DropdownMenuItem>
              <DropdownMenuItem disabled>日本語</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};
