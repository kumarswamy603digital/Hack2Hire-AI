import { AnswerEvaluation } from "@/types/interview";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  CheckCircle2, 
  TrendingUp, 
  TrendingDown,
  Minus,
  Clock,
  Target,
  MessageSquare,
  Lightbulb,
  AlertTriangle,
  Zap,
  Eye,
  Layers,
  Search
} from "lucide-react";
import { cn } from "@/lib/utils";

interface EvaluationFeedbackProps {
  evaluation: AnswerEvaluation;
  onContinue: () => void;
}

const ScoreDimension = ({ 
  label, 
  value, 
  icon: Icon 
}: { 
  label: string; 
  value: number; 
  icon: React.ComponentType<{ className?: string }>;
}) => {
  const getColor = (score: number) => {
    if (score >= 70) return "text-success";
    if (score >= 50) return "text-warning";
    return "text-destructive";
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">{label}</span>
        </div>
        <span className={cn("font-semibold", getColor(value))}>{value}</span>
      </div>
      <Progress value={value} className="h-2" />
    </div>
  );
};

export const EvaluationFeedback = ({ evaluation, onContinue }: EvaluationFeedbackProps) => {
  const getVerdictStyle = (verdict: string) => {
    switch (verdict) {
      case "strong":
        return "bg-success/10 text-success border-success/20";
      case "average":
        return "bg-warning/10 text-warning border-warning/20";
      case "weak":
        return "bg-destructive/10 text-destructive border-destructive/20";
      default:
        return "";
    }
  };

  const getOverallColor = (score: number) => {
    if (score >= 70) return "text-success";
    if (score >= 50) return "text-warning";
    return "text-destructive";
  };

  const getDifficultyTrend = () => {
    if (evaluation.overall_score >= 70) {
      return { icon: TrendingUp, text: "Difficulty increasing", color: "text-success" };
    }
    if (evaluation.overall_score < 50) {
      return { icon: TrendingDown, text: "Difficulty stable/decreasing", color: "text-warning" };
    }
    return { icon: Minus, text: "Difficulty maintained", color: "text-muted-foreground" };
  };

  const trend = getDifficultyTrend();
  const TrendIcon = trend.icon;

  return (
    <div className="space-y-4 animate-fade-in-up">
      {/* Score Header with Verdict */}
      <div className="glass-card rounded-2xl p-6 text-center">
        <Badge 
          variant="outline" 
          className={cn("mb-4 text-sm font-semibold capitalize", getVerdictStyle(evaluation.verdict))}
        >
          {evaluation.verdict} Performance
        </Badge>
        <div className={cn("font-display font-bold text-6xl mb-2", getOverallColor(evaluation.overall_score))}>
          {Math.round(evaluation.overall_score)}
        </div>
        <p className="text-muted-foreground">Overall Score</p>
        
        {evaluation.overtime_seconds > 0 && (
          <div className="flex items-center justify-center gap-2 mt-3 text-destructive text-sm">
            <Clock className="w-4 h-4" />
            <span>+{evaluation.overtime_seconds}s overtime</span>
          </div>
        )}
      </div>

      {/* Detailed Score Breakdown */}
      <div className="glass-card rounded-xl p-5">
        <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
          <Target className="w-5 h-5 text-primary" />
          Score Dimensions
        </h4>
        <div className="space-y-4">
          <ScoreDimension label="Accuracy" value={evaluation.accuracy} icon={CheckCircle2} />
          <ScoreDimension label="Clarity" value={evaluation.clarity} icon={Eye} />
          <ScoreDimension label="Depth" value={evaluation.depth} icon={Layers} />
          <ScoreDimension label="Relevance" value={evaluation.relevance} icon={Search} />
          <ScoreDimension label="Time Efficiency" value={evaluation.time_efficiency} icon={Zap} />
        </div>
      </div>

      {/* Penalties Applied */}
      {evaluation.penalties_applied && evaluation.penalties_applied.length > 0 && (
        <div className="glass-card rounded-xl p-4 border-destructive/20">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-4 h-4 text-destructive" />
            <h5 className="font-medium text-destructive text-sm">Penalties Applied</h5>
          </div>
          <ul className="space-y-1">
            {evaluation.penalties_applied.map((penalty, i) => (
              <li key={i} className="text-xs text-destructive/80 flex items-start gap-2">
                <span className="mt-0.5">•</span>
                {penalty}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Feedback */}
      <div className="glass-card rounded-xl p-5">
        <div className="flex items-center gap-2 mb-3">
          <MessageSquare className="w-5 h-5 text-primary" />
          <h4 className="font-semibold text-foreground">Feedback</h4>
        </div>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {evaluation.feedback}
        </p>
      </div>

      {/* Strengths & Improvements */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="glass-card rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle2 className="w-4 h-4 text-success" />
            <h5 className="font-medium text-foreground text-sm">Strengths</h5>
          </div>
          <ul className="space-y-1.5">
            {evaluation.strengths.map((s, i) => (
              <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                <span className="text-success mt-0.5">•</span>
                {s}
              </li>
            ))}
          </ul>
        </div>
        
        <div className="glass-card rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb className="w-4 h-4 text-warning" />
            <h5 className="font-medium text-foreground text-sm">Improvements</h5>
          </div>
          <ul className="space-y-1.5">
            {evaluation.improvements.map((s, i) => (
              <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                <span className="text-warning mt-0.5">•</span>
                {s}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Next Difficulty */}
      {evaluation.should_continue && (
        <div className="glass-card rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendIcon className={cn("w-5 h-5", trend.color)} />
              <span className="text-sm text-muted-foreground">{trend.text}</span>
            </div>
            <Badge variant="outline" className="capitalize">
              Next: {evaluation.next_difficulty}
            </Badge>
          </div>
        </div>
      )}

      {/* Continue Button */}
      <button
        onClick={onContinue}
        className="w-full py-4 rounded-xl gradient-hero text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
      >
        {evaluation.should_continue ? "Next Question" : "View Results"}
      </button>
    </div>
  );
};
