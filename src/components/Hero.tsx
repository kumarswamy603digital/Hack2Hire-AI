import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { Link } from "react-router-dom";
import hack2hireLogo from "@/assets/hack2hire-logo.png";

export const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute inset-0 gradient-glow opacity-60" />
      <div className="absolute top-20 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "2s" }} />
      
      <div className="container relative z-10 px-4 md:px-6 py-20">
        <div className="text-center max-w-4xl mx-auto">
          {/* Hero Logo */}
          <div className="flex justify-center mb-8 opacity-0 animate-fade-in" style={{ animationDelay: "100ms" }}>
            <img 
              src={hack2hireLogo} 
              alt="Hack2Hire AI" 
              className="h-24 md:h-32 w-auto object-contain"
            />
          </div>
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-8 opacity-0 animate-fade-in" style={{ animationDelay: "200ms" }}>
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            AI-Powered Mock Interview Platform
          </div>
          
          {/* Main headline */}
          <h1 className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-foreground leading-[1.1] mb-8 opacity-0 animate-fade-in-up" style={{ animationDelay: "300ms" }}>
            <span className="block">Ace Your Next Interview with</span>
            <span className="inline-block bg-gradient-to-r from-[hsl(195,100%,45%)] via-[hsl(175,100%,42%)] to-[hsl(165,100%,40%)] bg-clip-text text-transparent">AI-Powered</span>{" "}
            <span>Practice</span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground/90 max-w-2xl mx-auto mb-10 leading-relaxed opacity-0 animate-fade-in-up" style={{ animationDelay: "500ms" }}>
            Practice with AI-driven mock interviews, get real-time feedback, 
            and land your dream job. From resume analysis to voice interviews—we've got you covered.
          </p>
          
          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 animate-fade-in-up" style={{ animationDelay: "700ms" }}>
            <Button variant="hero" size="xl" asChild>
              <Link to="/analyze">
                Start Practicing
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/voice-interview">
                <Play className="w-4 h-4" />
                Try Voice Interview
              </Link>
            </Button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto mt-16 opacity-0 animate-fade-in-up" style={{ animationDelay: "900ms" }}>
            <div className="text-center">
              <div className="font-display font-bold text-3xl md:text-4xl text-foreground">95%</div>
              <div className="text-sm text-muted-foreground mt-1">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="font-display font-bold text-3xl md:text-4xl text-foreground">10k+</div>
              <div className="text-sm text-muted-foreground mt-1">Interviews</div>
            </div>
            <div className="text-center">
              <div className="font-display font-bold text-3xl md:text-4xl text-foreground">50%</div>
              <div className="text-sm text-muted-foreground mt-1">Time Saved</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
