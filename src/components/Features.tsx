import { FeatureCard } from "./FeatureCard";
import { 
  FileText, 
  Brain, 
  MessageSquare, 
  BarChart3, 
  Shield, 
  Zap,
  Mic,
  Camera,
  Download,
  History,
  TrendingUp,
  Lightbulb
} from "lucide-react";

const features = [
  {
    icon: Mic,
    title: "AI Voice Interview",
    description: "Practice with realistic voice-based AI interviews. Hear questions and respond naturally.",
  },
  {
    icon: Camera,
    title: "Smart Proctoring",
    description: "Webcam eye-contact & posture analysis for realistic interview simulation.",
  },
  {
    icon: FileText,
    title: "PDF Resume Parser",
    description: "Upload PDF resumes for instant AI-powered skill extraction and analysis.",
  },
  {
    icon: Brain,
    title: "AI-Powered Matching",
    description: "Compare candidate profiles against job requirements using semantic understanding.",
  },
  {
    icon: MessageSquare,
    title: "Adaptive Questions",
    description: "AI asks clarifying follow-ups based on weak answers for deeper assessment.",
  },
  {
    icon: TrendingUp,
    title: "Industry Benchmarking",
    description: "Compare scores against role/industry averages with percentile rankings.",
  },
  {
    icon: History,
    title: "Progress History",
    description: "Track progress over multiple sessions and identify improvement trends.",
  },
  {
    icon: Download,
    title: "PDF Export",
    description: "Download professional assessment reports with scores and recommendations.",
  },
  {
    icon: Lightbulb,
    title: "Coaching & Hints",
    description: "Optional coaching mode with hints and tips during answer preparation.",
  },
  {
    icon: BarChart3,
    title: "Real-time Scoring",
    description: "Instant evaluation metrics with detailed breakdowns and insights.",
  },
  {
    icon: Shield,
    title: "Fair Assessment",
    description: "Bias-free evaluation criteria ensuring equal opportunity for all.",
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
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard 
              key={feature.title} 
              {...feature} 
              delay={100 + index * 50}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
