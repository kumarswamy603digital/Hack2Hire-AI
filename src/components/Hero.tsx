import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute inset-0 gradient-glow opacity-60" />
      <div className="absolute top-20 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "2s" }} />
      
      <div className="container relative z-10 px-4 md:px-6 py-20">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-8 opacity-0 animate-fade-in" style={{ animationDelay: "100ms" }}>
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            AI-Powered Interview Assessment
          </div>
          
          {/* Main headline */}
          <h1 className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-foreground leading-tight mb-6 opacity-0 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
            Smart Hiring Starts with{" "}
            <span className="text-gradient">Intelligent</span>{" "}
            Assessment
          </h1>
          
          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 opacity-0 animate-fade-in-up" style={{ animationDelay: "400ms" }}>
            Evaluate candidates with AI-driven resume analysis, adaptive questioning, 
            and real-time scoring. Make data-backed hiring decisions in minutes.
          </p>
          
          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 animate-fade-in-up" style={{ animationDelay: "600ms" }}>
            <Button variant="hero" size="xl" asChild>
              <Link to="/analyze">
                Start Assessment
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg">
              <Play className="w-4 h-4" />
              Watch Demo
            </Button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto mt-16 opacity-0 animate-fade-in-up" style={{ animationDelay: "800ms" }}>
            <div className="text-center">
              <div className="font-display font-bold text-3xl md:text-4xl text-foreground">95%</div>
              <div className="text-sm text-muted-foreground mt-1">Accuracy Rate</div>
            </div>
            <div className="text-center">
              <div className="font-display font-bold text-3xl md:text-4xl text-foreground">10k+</div>
              <div className="text-sm text-muted-foreground mt-1">Assessments</div>
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
