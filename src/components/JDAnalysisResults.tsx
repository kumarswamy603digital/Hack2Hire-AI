import { JDAnalysis, SkillItem } from "@/types/jobDescription";
import { Badge } from "@/components/ui/badge";
import { 
  Briefcase, 
  Code, 
  Lightbulb, 
  Users, 
  CheckCircle2,
  Star,
  Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";

interface JDAnalysisResultsProps {
  analysis: JDAnalysis;
}

const categoryIcons = {
  technical: Code,
  conceptual: Lightbulb,
  behavioral: Users,
};

const categoryColors = {
  technical: "bg-primary/10 text-primary border-primary/20",
  conceptual: "bg-accent/10 text-accent border-accent/20",
  behavioral: "bg-warning/10 text-warning border-warning/20",
};

const SkillBadge = ({ item }: { item: SkillItem }) => {
  const Icon = categoryIcons[item.category];
  return (
    <Badge 
      variant="outline"
      className={cn("text-sm gap-1.5 py-1.5 px-3", categoryColors[item.category])}
    >
      <Icon className="w-3.5 h-3.5" />
      {item.skill}
    </Badge>
  );
};

export const JDAnalysisResults = ({ analysis }: JDAnalysisResultsProps) => {
  const levelColors = {
    junior: "bg-success/10 text-success",
    mid: "bg-primary/10 text-primary",
    senior: "bg-destructive/10 text-destructive",
  };

  const levelLabels = {
    junior: "Junior Level",
    mid: "Mid Level",
    senior: "Senior Level",
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Summary Card */}
      <div className="glass-card rounded-2xl p-6">
        <div className="flex items-start gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl gradient-hero flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h3 className="font-display font-semibold text-lg text-foreground">
              Role Overview
            </h3>
            <p className="text-muted-foreground text-sm mt-1">
              {analysis.summary}
            </p>
          </div>
        </div>
        
        {/* Role Level Badge */}
        <div className="flex items-center gap-2 mt-4">
          <Briefcase className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Experience Required:</span>
          <Badge className={cn("capitalize font-semibold", levelColors[analysis.role_level])}>
            {levelLabels[analysis.role_level]}
          </Badge>
        </div>
      </div>

      {/* Must-Have Skills */}
      <div className="glass-card rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <CheckCircle2 className="w-5 h-5 text-success" />
          <h3 className="font-display font-semibold text-foreground">
            Must-Have Skills
          </h3>
          <Badge variant="secondary" className="ml-auto">
            {analysis.must_have.length} required
          </Badge>
        </div>
        <div className="flex flex-wrap gap-2">
          {analysis.must_have.map((item, index) => (
            <SkillBadge key={index} item={item} />
          ))}
        </div>
      </div>

      {/* Nice-to-Have Skills */}
      <div className="glass-card rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Star className="w-5 h-5 text-warning" />
          <h3 className="font-display font-semibold text-foreground">
            Nice-to-Have Skills
          </h3>
          <Badge variant="secondary" className="ml-auto">
            {analysis.nice_to_have.length} preferred
          </Badge>
        </div>
        <div className="flex flex-wrap gap-2">
          {analysis.nice_to_have.map((item, index) => (
            <SkillBadge key={index} item={item} />
          ))}
        </div>
      </div>

      {/* Category Legend */}
      <div className="glass-card rounded-xl p-4">
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <Code className="w-4 h-4 text-primary" />
            <span className="text-muted-foreground">Technical</span>
          </div>
          <div className="flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-accent" />
            <span className="text-muted-foreground">Conceptual</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-warning" />
            <span className="text-muted-foreground">Behavioral</span>
          </div>
        </div>
      </div>

      {/* JSON Output */}
      <div className="glass-card rounded-xl p-6">
        <h3 className="font-display font-semibold text-foreground mb-3">Structured Output</h3>
        <pre className="bg-secondary rounded-lg p-4 overflow-x-auto text-sm text-foreground">
          <code>
            {JSON.stringify({
              must_have: analysis.must_have.map(s => s.skill),
              nice_to_have: analysis.nice_to_have.map(s => s.skill),
              role_level: analysis.role_level,
            }, null, 2)}
          </code>
        </pre>
      </div>
    </div>
  );
};
