import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useInterview } from "@/hooks/useInterview";
import { QuestionCard } from "./QuestionCard";
import { EvaluationFeedback } from "./EvaluationFeedback";
import { InterviewResults } from "./InterviewResults";
import { 
  Play, 
  Loader2, 
  Send,
  Sparkles,
  Clock,
  AlertTriangle,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";
import { AnswerEvaluation } from "@/types/interview";

const SAMPLE_SKILLS = [
  "JavaScript", "TypeScript", "React", "Node.js", "PostgreSQL", "REST APIs"
];

export const InterviewSession = () => {
  const { state, isLoading, startInterview, submitAnswer, resetInterview, calculateFinalScore } = useInterview();
  const [answer, setAnswer] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>(SAMPLE_SKILLS);
  const [customSkill, setCustomSkill] = useState("");
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [showEvaluation, setShowEvaluation] = useState(false);
  const [currentEvaluation, setCurrentEvaluation] = useState<AnswerEvaluation | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Timer effect
  useEffect(() => {
    if (state.status === "in_progress" && state.currentQuestion && !showEvaluation) {
      timerRef.current = setInterval(() => {
        setElapsedSeconds(prev => prev + 1);
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [state.status, state.currentQuestion, showEvaluation]);

  // Reset timer on new question
  useEffect(() => {
    setElapsedSeconds(0);
    setAnswer("");
    setShowEvaluation(false);
    setCurrentEvaluation(null);
  }, [state.questionNumber]);

  const handleStart = () => {
    if (selectedSkills.length === 0) return;
    startInterview(selectedSkills);
  };

  const handleSubmit = async () => {
    if (!answer.trim() || isLoading) return;
    
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    const evaluation = await submitAnswer(answer, elapsedSeconds);
    if (evaluation) {
      setCurrentEvaluation(evaluation);
      setShowEvaluation(true);
    }
  };

  const handleContinue = () => {
    setShowEvaluation(false);
    setCurrentEvaluation(null);
    setAnswer("");
    setElapsedSeconds(0);
  };

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev => 
      prev.includes(skill) 
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const addCustomSkill = () => {
    if (customSkill.trim() && !selectedSkills.includes(customSkill.trim())) {
      setSelectedSkills(prev => [...prev, customSkill.trim()]);
      setCustomSkill("");
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Render Results
  if (state.status === "completed" || state.status === "terminated") {
    return (
      <InterviewResults 
        state={state} 
        finalScore={calculateFinalScore()} 
        onRestart={resetInterview}
      />
    );
  }

  // Render Setup
  if (state.status === "setup") {
    return (
      <div className="min-h-screen bg-background py-12">
        <div className="container px-4 md:px-6 max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              AI Interview Simulator
            </div>
            <h1 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
              Technical <span className="text-gradient">Interview</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Adaptive AI interviewer with real-time evaluation. Questions progress from easy to hard based on your performance.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-6">
            <h3 className="font-display font-semibold text-lg text-foreground mb-4">
              Select Your Skills
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Choose skills you want to be tested on:
            </p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {SAMPLE_SKILLS.map(skill => (
                <Badge
                  key={skill}
                  variant={selectedSkills.includes(skill) ? "default" : "outline"}
                  className="cursor-pointer transition-all hover:scale-105"
                  onClick={() => toggleSkill(skill)}
                >
                  {skill}
                  {selectedSkills.includes(skill) && (
                    <X className="w-3 h-3 ml-1" />
                  )}
                </Badge>
              ))}
            </div>

            <div className="flex gap-2 mb-6">
              <input
                type="text"
                placeholder="Add custom skill..."
                value={customSkill}
                onChange={(e) => setCustomSkill(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addCustomSkill()}
                className="flex-1 px-3 py-2 rounded-lg bg-background border border-border text-sm"
              />
              <Button variant="outline" size="sm" onClick={addCustomSkill}>
                Add
              </Button>
            </div>

            <div className="bg-secondary/50 rounded-xl p-4 mb-6">
              <h4 className="font-medium text-foreground text-sm mb-2">Interview Rules:</h4>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• 6 questions total, one at a time</li>
                <li>• Difficulty adapts based on your scores</li>
                <li>• Score ≥70: Difficulty increases</li>
                <li>• Score {"<"}50: Difficulty stabilizes</li>
                <li>• Time penalties apply for late answers</li>
                <li>• Interview may end early if performance is poor</li>
              </ul>
            </div>

            <Button
              variant="hero"
              size="xl"
              className="w-full"
              onClick={handleStart}
              disabled={isLoading || selectedSkills.length === 0}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Preparing Interview...
                </>
              ) : (
                <>
                  <Play className="w-5 h-5" />
                  Start Interview
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Render Interview In Progress
  const isOvertime = state.currentQuestion && elapsedSeconds > state.currentQuestion.expected_time_seconds;

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container px-4 md:px-6 max-w-3xl mx-auto">
        {/* Progress Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="capitalize">
              {state.currentDifficulty} Difficulty
            </Badge>
            <span className="text-sm text-muted-foreground">
              Question {state.questionNumber} / {state.totalQuestions}
            </span>
          </div>
          <Button variant="ghost" size="sm" onClick={resetInterview}>
            End Interview
          </Button>
        </div>

        {state.currentQuestion && !showEvaluation && (
          <>
            {/* Question */}
            <QuestionCard
              question={state.currentQuestion}
              questionNumber={state.questionNumber}
              totalQuestions={state.totalQuestions}
            />

            {/* Timer */}
            <div className="glass-card rounded-xl p-4 my-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {isOvertime ? (
                    <AlertTriangle className="w-5 h-5 text-destructive animate-pulse" />
                  ) : (
                    <Clock className="w-5 h-5 text-primary" />
                  )}
                  <span className={cn(
                    "font-mono font-bold text-2xl",
                    isOvertime ? "text-destructive" : "text-foreground"
                  )}>
                    {formatTime(elapsedSeconds)}
                  </span>
                </div>
                <span className="text-sm text-muted-foreground">
                  Expected: {formatTime(state.currentQuestion.expected_time_seconds)}
                </span>
              </div>
            </div>

            {/* Answer Input */}
            <div className="glass-card rounded-2xl p-6">
              <Textarea
                ref={textareaRef}
                placeholder="Type your answer here..."
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                className="min-h-[200px] resize-none bg-background/50 mb-4"
                disabled={isLoading}
              />
              
              <Button
                variant="hero"
                size="lg"
                className="w-full"
                onClick={handleSubmit}
                disabled={isLoading || !answer.trim()}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Evaluating...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Submit Answer
                  </>
                )}
              </Button>
            </div>
          </>
        )}

        {/* Evaluation Feedback */}
        {showEvaluation && currentEvaluation && (
          <EvaluationFeedback 
            evaluation={currentEvaluation} 
            onContinue={handleContinue}
          />
        )}
      </div>
    </div>
  );
};
