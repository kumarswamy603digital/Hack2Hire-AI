import { AnswerEvaluation } from "@/types/interview";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  CheckCircle2, 
  XCircle, 
  TrendingUp, 
  TrendingDown,
  Minus,
  Clock,
  Target,
  MessageSquare,
  Lightbulb
} from "lucide-react";
import { cn } from "@/lib/utils";

interface EvaluationFeedbackProps {
  evaluation: AnswerEvaluation;
  onContinue: () => void;
}

export const EvaluationFeedback = ({ evaluation, onContinue }: EvaluationFeedbackProps) => {
  const getScoreColor = (score: number) => {
    if (score >= 70) return "text-success";
    if (score >= 50) return "text-warning";
    return "text-destructive";
  };

  const getDifficultyTrend = () => {
    const currentDifficulties = ["easy", "medium", "hard"];
    const nextIndex = currentDifficulties.indexOf(evaluation.next_difficulty);
    
    if (evaluation.score >= 70) {
      return { icon: TrendingUp, text: "Difficulty increasing", color: "text-success" };
    }
    if (evaluation.score < 50) {
      return { icon: TrendingDown, text: "Difficulty stable/decreasing", color: "text-warning" };
    }
    return { icon: Minus, text: "Difficulty maintained", color: "text-muted-foreground" };
  };

  const trend = getDifficultyTrend();
  const TrendIcon = trend.icon;

  return (
    <div className="space-y-4 animate-fade-in-up">
      {/* Score Header */}
      <div className="glass-card rounded-2xl p-6 text-center">
        <div className={cn("font-display font-bold text-6xl mb-2", getScoreColor(evaluation.score))}>
          {evaluation.score}
        </div>
        <p className="text-muted-foreground">Points earned</p>
        
        {evaluation.time_penalty > 0 && (
          <div className="flex items-center justify-center gap-2 mt-3 text-destructive text-sm">
            <Clock className="w-4 h-4" />
            <span>-{evaluation.time_penalty} points (time penalty)</span>
          </div>
        )}
      </div>

      {/* Score Breakdown */}
      <div className="glass-card rounded-xl p-5">
        <h4 className="font-semibold text-foreground mb-4">Score Breakdown</h4>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-muted-foreground">Technical Accuracy</span>
              <span className="font-medium">{evaluation.technical_accuracy}%</span>
            </div>
            <Progress value={evaluation.technical_accuracy} className="h-2" />
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-muted-foreground">Completeness</span>
              <span className="font-medium">{evaluation.completeness}%</span>
            </div>
            <Progress value={evaluation.completeness} className="h-2" />
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-muted-foreground">Clarity</span>
              <span className="font-medium">{evaluation.clarity}%</span>
            </div>
            <Progress value={evaluation.clarity} className="h-2" />
          </div>
        </div>
      </div>

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
