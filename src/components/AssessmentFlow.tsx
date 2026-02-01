import { AssessmentStage } from "./AssessmentStage";

const stages = [
  {
    number: 1,
    title: "Initialization",
    description: "System setup and candidate verification",
    status: "complete" as const,
  },
  {
    number: 2,
    title: "Resume Analysis",
    description: "AI-powered extraction of skills, experience, and qualifications",
    status: "complete" as const,
  },
  {
    number: 3,
    title: "Job Description Match",
    description: "Compare candidate profile against role requirements",
    status: "active" as const,
  },
  {
    number: 4,
    title: "Adaptive Questions",
    description: "Easy → Medium → Hard progression based on responses",
    status: "pending" as const,
  },
  {
    number: 5,
    title: "Evaluation",
    description: "Comprehensive scoring and feedback generation",
    status: "pending" as const,
  },
  {
    number: 6,
    title: "Final Score",
    description: "Overall assessment report with recommendations",
    status: "pending" as const,
  },
];

export const AssessmentFlow = () => {
  return (
    <section className="py-24 relative">
      <div className="container px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Text */}
          <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: "100ms" }}>
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">
              How It Works
            </span>
            <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-foreground mt-4 mb-6">
              A Complete Assessment{" "}
              <span className="text-gradient">Pipeline</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-lg">
              Our intelligent system guides candidates through a structured 
              evaluation process, adapting in real-time to their responses 
              for the most accurate assessment.
            </p>
            
            {/* Progress cards */}
            <div className="grid grid-cols-3 gap-4">
              <div className="glass-card rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-success">3</div>
                <div className="text-xs text-muted-foreground">Completed</div>
              </div>
              <div className="glass-card rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-primary">1</div>
                <div className="text-xs text-muted-foreground">In Progress</div>
              </div>
              <div className="glass-card rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-muted-foreground">3</div>
                <div className="text-xs text-muted-foreground">Remaining</div>
              </div>
            </div>
          </div>
          
          {/* Right side - Flow diagram */}
          <div className="glass-card rounded-3xl p-8 opacity-0 animate-slide-in-right" style={{ animationDelay: "300ms" }}>
            <div className="space-y-2">
              {stages.map((stage, index) => (
                <AssessmentStage
                  key={stage.number}
                  {...stage}
                  isLast={index === stages.length - 1}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
