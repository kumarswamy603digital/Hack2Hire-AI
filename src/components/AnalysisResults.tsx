import { ResumeAnalysis } from "@/types/resume";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Briefcase, 
  Code, 
  Layers, 
  Target, 
  Sparkles,
  CheckCircle2 
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AnalysisResultsProps {
  analysis: ResumeAnalysis;
}

export const AnalysisResults = ({ analysis }: AnalysisResultsProps) => {
  const complexityColors = {
    low: "bg-muted text-muted-foreground",
    medium: "bg-warning/10 text-warning",
    high: "bg-success/10 text-success",
  };

  const relevancePercentage = Math.round(analysis.role_relevance * 100);

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
              Profile Summary
            </h3>
            <p className="text-muted-foreground text-sm mt-1">
              {analysis.summary}
            </p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-3 gap-4">
        {/* Experience */}
        <div className="glass-card rounded-xl p-5">
          <div className="flex items-center gap-2 mb-2">
            <Briefcase className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">Experience</span>
          </div>
          <div className="font-display font-bold text-2xl text-foreground">
            {analysis.experience_years}
            <span className="text-base font-normal text-muted-foreground ml-1">years</span>
          </div>
        </div>

        {/* Project Complexity */}
        <div className="glass-card rounded-xl p-5">
          <div className="flex items-center gap-2 mb-2">
            <Layers className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">Complexity</span>
          </div>
          <Badge 
            className={cn(
              "text-sm font-semibold capitalize",
              complexityColors[analysis.project_complexity]
            )}
          >
            {analysis.project_complexity}
          </Badge>
        </div>

        {/* Role Relevance */}
        <div className="glass-card rounded-xl p-5">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">Role Fit</span>
          </div>
          <div className="space-y-2">
            <div className="font-display font-bold text-2xl text-foreground">
              {relevancePercentage}%
            </div>
            <Progress value={relevancePercentage} className="h-2" />
          </div>
        </div>
      </div>

      {/* Skills */}
      <div className="glass-card rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <CheckCircle2 className="w-5 h-5 text-primary" />
          <h3 className="font-display font-semibold text-foreground">Core Skills</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {analysis.skills.map((skill, index) => (
            <Badge 
              key={index} 
              variant="secondary"
              className="text-sm"
            >
              {skill}
            </Badge>
          ))}
        </div>
      </div>

      {/* Tools & Technologies */}
      <div className="glass-card rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Code className="w-5 h-5 text-primary" />
          <h3 className="font-display font-semibold text-foreground">Tools & Technologies</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {analysis.tools_technologies.map((tech, index) => (
            <Badge 
              key={index} 
              className="text-sm gradient-hero text-primary-foreground"
            >
              {tech}
            </Badge>
          ))}
        </div>
      </div>

      {/* JSON Output */}
      <div className="glass-card rounded-xl p-6">
        <h3 className="font-display font-semibold text-foreground mb-3">Structured Output</h3>
        <pre className="bg-secondary rounded-lg p-4 overflow-x-auto text-sm text-foreground">
          <code>
            {JSON.stringify({
              skills: analysis.skills,
              experience_years: analysis.experience_years,
              project_complexity: analysis.project_complexity,
              role_relevance: analysis.role_relevance,
            }, null, 2)}
          </code>
        </pre>
      </div>
    </div>
  );
};
