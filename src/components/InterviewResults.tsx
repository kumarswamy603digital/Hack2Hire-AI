import { InterviewState } from "@/types/interview";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Trophy, 
  Target, 
  Clock, 
  TrendingUp,
  CheckCircle2,
  XCircle,
  RotateCcw
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface InterviewResultsProps {
  state: InterviewState;
  finalScore: number;
  onRestart: () => void;
}

export const InterviewResults = ({ state, finalScore, onRestart }: InterviewResultsProps) => {
  const getGrade = (score: number) => {
    if (score >= 90) return { grade: "A+", label: "Exceptional", color: "text-success" };
    if (score >= 80) return { grade: "A", label: "Excellent", color: "text-success" };
    if (score >= 70) return { grade: "B", label: "Good", color: "text-primary" };
    if (score >= 60) return { grade: "C", label: "Satisfactory", color: "text-warning" };
    if (score >= 50) return { grade: "D", label: "Needs Improvement", color: "text-warning" };
    return { grade: "F", label: "Unsatisfactory", color: "text-destructive" };
  };

  const gradeInfo = getGrade(finalScore);
  const totalTime = state.answers.reduce((sum, a) => sum + a.timeSpent, 0);
  const avgScore = finalScore;
  
  const difficultyProgression = state.answers.map(a => a.question.difficulty);
  const reachedHard = difficultyProgression.includes("hard");
  const reachedMedium = difficultyProgression.includes("medium");

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container px-4 md:px-6 max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full gradient-hero mb-6">
            <Trophy className="w-10 h-10 text-primary-foreground" />
          </div>
          <h1 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-2">
            Interview {state.status === "completed" ? "Complete" : "Ended"}
          </h1>
          <p className="text-muted-foreground">
            {state.status === "terminated" 
              ? "The interview was ended early based on performance." 
              : "Here's your performance summary."}
          </p>
        </div>

        {/* Final Score Card */}
        <div className="glass-card rounded-3xl p-8 text-center mb-8 animate-scale-in">
          <div className={cn("font-display font-bold text-8xl mb-2", gradeInfo.color)}>
            {gradeInfo.grade}
          </div>
          <p className="text-xl text-muted-foreground mb-4">{gradeInfo.label}</p>
          <div className="flex items-center justify-center gap-2">
            <span className="text-4xl font-bold text-foreground">{finalScore}</span>
            <span className="text-xl text-muted-foreground">/ 100</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          <div className="glass-card rounded-xl p-5 text-center">
            <Target className="w-6 h-6 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">
              {state.answers.length}
            </div>
            <div className="text-sm text-muted-foreground">Questions Answered</div>
          </div>
          
          <div className="glass-card rounded-xl p-5 text-center">
            <Clock className="w-6 h-6 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">
              {Math.floor(totalTime / 60)}:{(totalTime % 60).toString().padStart(2, "0")}
            </div>
            <div className="text-sm text-muted-foreground">Total Time</div>
          </div>
          
          <div className="glass-card rounded-xl p-5 text-center">
            <TrendingUp className="w-6 h-6 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground capitalize">
              {reachedHard ? "Hard" : reachedMedium ? "Medium" : "Easy"}
            </div>
            <div className="text-sm text-muted-foreground">Max Difficulty</div>
          </div>
        </div>

        {/* Question-by-Question Breakdown */}
        <div className="glass-card rounded-2xl p-6 mb-8">
          <h3 className="font-display font-semibold text-lg text-foreground mb-6">
            Question Breakdown
          </h3>
          <div className="space-y-4">
            {state.answers.map((record, index) => (
              <div key={index} className="bg-secondary/50 rounded-xl p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center",
                      record.evaluation.score >= 70 ? "bg-success/20" : 
                      record.evaluation.score >= 50 ? "bg-warning/20" : "bg-destructive/20"
                    )}>
                      {record.evaluation.score >= 70 ? (
                        <CheckCircle2 className="w-4 h-4 text-success" />
                      ) : (
                        <XCircle className="w-4 h-4 text-destructive" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-foreground text-sm">
                        Q{index + 1}: {record.question.topic}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs capitalize">
                          {record.question.difficulty}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {record.timeSpent}s / {record.question.expected_time_seconds}s
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className={cn(
                    "text-2xl font-bold",
                    record.evaluation.score >= 70 ? "text-success" : 
                    record.evaluation.score >= 50 ? "text-warning" : "text-destructive"
                  )}>
                    {record.evaluation.score}
                  </div>
                </div>
                <Progress 
                  value={record.evaluation.score} 
                  className="h-1.5"
                />
              </div>
            ))}
          </div>
        </div>

        {/* JSON Output */}
        <div className="glass-card rounded-xl p-6 mb-8">
          <h3 className="font-display font-semibold text-foreground mb-3">
            Assessment Data
          </h3>
          <pre className="bg-secondary rounded-lg p-4 overflow-x-auto text-sm text-foreground">
            <code>
              {JSON.stringify({
                final_score: finalScore,
                grade: gradeInfo.grade,
                questions_answered: state.answers.length,
                status: state.status,
                difficulty_progression: difficultyProgression,
                scores: state.answers.map(a => ({
                  topic: a.question.topic,
                  difficulty: a.question.difficulty,
                  score: a.evaluation.score
                }))
              }, null, 2)}
            </code>
          </pre>
        </div>

        {/* Restart Button */}
        <div className="text-center">
          <Button variant="hero" size="xl" onClick={onRestart}>
            <RotateCcw className="w-5 h-5" />
            Start New Interview
          </Button>
        </div>
      </div>
    </div>
  );
};
