import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
      <div className="container px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg gradient-hero flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-xl text-foreground">
              AssessAI
            </span>
          </Link>
          
          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/analyze" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Resume
            </Link>
            <Link to="/jd-analysis" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              JD Analysis
            </Link>
            <Link to="/interview" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Interview
            </Link>
          </nav>
          
          {/* Actions */}
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm">
              Sign In
            </Button>
            <Button variant="default" size="sm">
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
