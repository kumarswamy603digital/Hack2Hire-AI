import { Sparkles } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="py-16 border-t border-border">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-hero flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-lg text-foreground">
              AssessAI
            </span>
          </div>
          
          {/* Links */}
          <nav className="flex items-center gap-8">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Privacy
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Terms
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Contact
            </a>
          </nav>
          
          {/* Copyright */}
          <p className="text-sm text-muted-foreground">
            © 2026 AssessAI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
