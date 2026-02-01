import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X, ChevronRight, ChevronLeft, FileText, Mic, Code, BarChart3, Sparkles } from "lucide-react";

interface TourStep {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  targetRoute: string;
}

const tourSteps: TourStep[] = [
  {
    id: 1,
    title: "Resume Analysis",
    description: "Upload your resume and get AI-powered feedback on skills, formatting, and improvements to stand out to recruiters.",
    icon: <FileText className="w-8 h-8" />,
    targetRoute: "/analyze",
  },
  {
    id: 2,
    title: "Voice Interview",
    description: "Practice with realistic AI voice interviews. Speak naturally and receive real-time transcription and evaluation.",
    icon: <Mic className="w-8 h-8" />,
    targetRoute: "/voice-interview",
  },
  {
    id: 3,
    title: "Coding Challenges",
    description: "Solve coding problems in an interactive editor with AI-powered hints and automated code evaluation.",
    icon: <Code className="w-8 h-8" />,
    targetRoute: "/coding",
  },
  {
    id: 4,
    title: "Practice Mode",
    description: "Choose specific topics and difficulty levels. Get unlimited practice with instant feedback and coaching.",
    icon: <Sparkles className="w-8 h-8" />,
    targetRoute: "/practice",
  },
  {
    id: 5,
    title: "Analytics Dashboard",
    description: "Track your progress over time. Compare scores against industry benchmarks and identify improvement areas.",
    icon: <BarChart3 className="w-8 h-8" />,
    targetRoute: "/analytics",
  },
];

interface OnboardingTourProps {
  onComplete?: () => void;
}

export const OnboardingTour = ({ onComplete }: OnboardingTourProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [hasSeenTour, setHasSeenTour] = useState(false);

  useEffect(() => {
    const seen = localStorage.getItem("hack2hire-tour-completed");
    if (!seen) {
      // Auto-open tour for first-time visitors after a short delay
      const timer = setTimeout(() => setIsOpen(true), 1500);
      return () => clearTimeout(timer);
    } else {
      setHasSeenTour(true);
    }
  }, []);

  const handleNext = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    localStorage.setItem("hack2hire-tour-completed", "true");
    setIsOpen(false);
    setHasSeenTour(true);
    onComplete?.();
  };

  const handleSkip = () => {
    localStorage.setItem("hack2hire-tour-completed", "true");
    setIsOpen(false);
    setHasSeenTour(true);
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setIsOpen(true);
  };

  const step = tourSteps[currentStep];

  return (
    <>
      {/* Tour Trigger Button - shown after tour is completed */}
      {hasSeenTour && !isOpen && (
        <Button
          onClick={handleRestart}
          variant="outline"
          size="sm"
          className="fixed bottom-6 right-6 z-50 gap-2 shadow-lg bg-background/80 backdrop-blur-sm border-primary/20 hover:border-primary/40"
        >
          <Sparkles className="w-4 h-4 text-primary" />
          Tour
        </Button>
      )}

      {/* Tour Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={handleSkip}
          />

          {/* Tour Card */}
          <Card className="relative z-10 w-full max-w-md mx-4 p-6 bg-card border-border/50 shadow-2xl animate-fade-in-up">
            {/* Close button */}
            <button
              onClick={handleSkip}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Progress dots */}
            <div className="flex justify-center gap-2 mb-6">
              {tourSteps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentStep(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentStep
                      ? "bg-primary w-6"
                      : index < currentStep
                      ? "bg-primary/50"
                      : "bg-muted"
                  }`}
                />
              ))}
            </div>

            {/* Step content */}
            <div className="text-center">
              {/* Icon */}
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary mb-4">
                {step.icon}
              </div>

              {/* Title */}
              <h3 className="font-display font-bold text-xl text-foreground mb-2">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                {step.description}
              </p>

              {/* Step counter */}
              <p className="text-xs text-muted-foreground mb-4">
                Step {currentStep + 1} of {tourSteps.length}
              </p>
            </div>

            {/* Navigation buttons */}
            <div className="flex items-center justify-between gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={handlePrev}
                disabled={currentStep === 0}
                className="gap-1"
              >
                <ChevronLeft className="w-4 h-4" />
                Back
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={handleSkip}
                className="text-muted-foreground"
              >
                Skip Tour
              </Button>

              <Button
                variant="default"
                size="sm"
                onClick={handleNext}
                className="gap-1"
              >
                {currentStep === tourSteps.length - 1 ? "Get Started" : "Next"}
                {currentStep < tourSteps.length - 1 && <ChevronRight className="w-4 h-4" />}
              </Button>
            </div>
          </Card>
        </div>
      )}
    </>
  );
};
