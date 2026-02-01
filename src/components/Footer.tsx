import hack2hireLogo from "@/assets/hack2hire-logo.png";

export const Footer = () => {
  return (
    <footer className="py-16 border-t border-border">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <img 
              src={hack2hireLogo} 
              alt="Hack2Hire AI" 
              className="h-8 w-auto object-contain"
            />
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
            © 2026 Hack2Hire AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
