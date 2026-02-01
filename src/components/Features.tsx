import { FeatureCard } from "./FeatureCard";
import { 
  FileText, 
  Brain, 
  MessageSquare, 
  BarChart3, 
  Shield, 
  Zap 
} from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "Resume Analysis",
    description: "Extract key skills, experience, and qualifications automatically with our advanced parsing engine.",
  },
  {
    icon: Brain,
    title: "AI-Powered Matching",
    description: "Compare candidate profiles against job requirements using semantic understanding.",
  },
  {
    icon: MessageSquare,
    title: "Adaptive Questions",
    description: "Dynamic difficulty adjustment from easy to hard based on candidate responses.",
  },
  {
    icon: BarChart3,
    title: "Real-time Scoring",
    description: "Instant evaluation metrics with detailed breakdowns and performance insights.",
  },
  {
    icon: Shield,
    title: "Fair Assessment",
    description: "Bias-free evaluation criteria ensuring equal opportunity for all candidates.",
  },
  {
    icon: Zap,
    title: "Instant Results",
    description: "Get comprehensive assessment reports in minutes, not days.",
  },
];

export const Features = () => {
  return (
    <section className="py-24 bg-secondary/30 relative">
      <div className="absolute inset-0 gradient-glow opacity-30" />
      
      <div className="container px-4 md:px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            Features
          </span>
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-foreground mt-4 mb-6">
            Everything You Need for{" "}
            <span className="text-gradient">Smart Hiring</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            A comprehensive suite of tools designed to streamline your 
            interview process and find the perfect candidates.
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard 
              key={feature.title} 
              {...feature} 
              delay={100 + index * 100}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
