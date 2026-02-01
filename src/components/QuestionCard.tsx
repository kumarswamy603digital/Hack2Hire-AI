import { InterviewQuestion } from "@/types/interview";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Target, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuestionCardProps {
  question: InterviewQuestion;
  questionNumber: number;
  totalQuestions: number;
}

const difficultyColors = {
  easy: "bg-success/10 text-success border-success/20",
  medium: "bg-warning/10 text-warning border-warning/20",
  hard: "bg-destructive/10 text-destructive border-destructive/20",
};

export const QuestionCard = ({ 
  question, 
  questionNumber, 
  totalQuestions 
}: QuestionCardProps) => {
  return (
    <div className="glass-card rounded-2xl p-6 animate-scale-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl gradient-hero flex items-center justify-center">
            <MessageSquare className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <span className="text-sm text-muted-foreground">
              Question {questionNumber} of {totalQuestions}
            </span>
            <div className="flex items-center gap-2 mt-1">
              <Badge 
                variant="outline" 
                className={cn("capitalize", difficultyColors[question.difficulty])}
              >
                {question.difficulty}
              </Badge>
              <Badge variant="secondary" className="gap-1">
                <Target className="w-3 h-3" />
                {question.topic}
              </Badge>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <Clock className="w-4 h-4" />
          <span className="text-sm">
            {Math.floor(question.expected_time_seconds / 60)}:{(question.expected_time_seconds % 60).toString().padStart(2, "0")}
          </span>
        </div>
      </div>
      
      {/* Question */}
      <div className="bg-secondary/50 rounded-xl p-5">
        <p className="text-lg text-foreground leading-relaxed">
          {question.question}
        </p>
      </div>
    </div>
  );
};
