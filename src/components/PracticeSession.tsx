import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { usePractice } from "@/hooks/usePractice";
import { QuestionCategory } from "@/types/interview";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  GraduationCap,
  Loader2,
  Send,
  Clock,
  Lightbulb,
  CheckCircle2,
  XCircle,
  ArrowRight,
  RotateCcw,
  BookOpen,
  Target,
  TrendingUp,
  Code,
  Users,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

const SKILL_OPTIONS = [
  "JavaScript", "TypeScript", "React", "Node.js", "Python",
  "SQL", "REST APIs", "System Design", "Data Structures",
  "Algorithms", "CSS", "Git", "Docker", "AWS", "Testing"
];

const CATEGORY_OPTIONS: { value: QuestionCategory; label: string; icon: typeof Code }[] = [
  { value: "technical", label: "Technical", icon: Code },
  { value: "conceptual", label: "Conceptual", icon: Lightbulb },
  { value: "behavioral", label: "Behavioral", icon: Users },
];

export const PracticeSession = () => {
  const {
    state,
    isLoading,
    generateQuestion,
    submitPracticeAnswer,
    practiceAgain,
    tryAnotherQuestion,
    resetPractice,
    getAverageScore,
  } = usePractice();

  const [answer, setAnswer] = useState("");
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [selectedSkill, setSelectedSkill] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState<"easy" | "medium" | "hard">("easy");
  const [selectedCategory, setSelectedCategory] = useState<QuestionCategory>("technical");
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Timer effect
  useEffect(() => {
    if (state.status === "practicing" && state.currentQuestion) {
      timerRef.current = setInterval(() => {
        setElapsedSeconds(prev => prev + 1);
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [state.status, state.currentQuestion]);

  const handleStart = () => {
    if (!selectedSkill) return;
    setElapsedSeconds(0);
    setAnswer("");
    generateQuestion(selectedSkill, selectedDifficulty, selectedCategory);
  };

  const handleSubmit = async () => {
    if (!answer.trim() || isLoading) return;

    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    await submitPracticeAnswer(answer, elapsedSeconds);
  };

  const handleTryAnother = () => {
    setElapsedSeconds(0);
    setAnswer("");
    tryAnotherQuestion();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Setup Screen
  if (state.status === "setup") {
    return (
      <div className="min-h-screen bg-background py-12">
        <div className="container px-4 md:px-6 max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
              <GraduationCap className="w-4 h-4" />
              Practice Mode
            </div>
            <h1 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
              Practice <span className="text-gradient">Interview</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Get AI coaching, instant feedback, and model answers to improve your skills.
            </p>
          </div>

          {/* Practice Stats */}
          {state.history.length > 0 && (
            <div className="glass-card rounded-xl p-4 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{state.history.length}</div>
                    <div className="text-xs text-muted-foreground">Questions</div>
                  </div>
                  <div className="h-8 w-px bg-border" />
                  <div className="text-center">
                    <div className="text-2xl font-bold text-foreground">{getAverageScore()}</div>
                    <div className="text-xs text-muted-foreground">Avg Score</div>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={resetPractice}>
                  <RotateCcw className="w-4 h-4 mr-1" />
                  Reset
                </Button>
              </div>
            </div>
          )}

          <div className="glass-card rounded-2xl p-6">
            <h3 className="font-display font-semibold text-lg text-foreground mb-6">
              Configure Your Practice
            </h3>

            {/* Skill Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-foreground mb-2">
                Skill to Practice
              </label>
              <Select value={selectedSkill} onValueChange={setSelectedSkill}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a skill..." />
                </SelectTrigger>
                <SelectContent>
                  {SKILL_OPTIONS.map(skill => (
                    <SelectItem key={skill} value={skill}>{skill}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Category Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-foreground mb-2">
                Question Category
              </label>
              <div className="grid grid-cols-3 gap-2">
                {CATEGORY_OPTIONS.map(({ value, label, icon: Icon }) => (
                  <button
                    key={value}
                    onClick={() => setSelectedCategory(value)}
                    className={cn(
                      "flex flex-col items-center gap-2 p-4 rounded-xl border transition-all",
                      selectedCategory === value
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border bg-secondary/50 text-muted-foreground hover:border-primary/50"
                    )}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-sm font-medium">{label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Difficulty Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-foreground mb-2">
                Difficulty Level
              </label>
              <div className="grid grid-cols-3 gap-2">
                {["easy", "medium", "hard"].map(diff => (
                  <button
                    key={diff}
                    onClick={() => setSelectedDifficulty(diff as "easy" | "medium" | "hard")}
                    className={cn(
                      "py-3 px-4 rounded-xl border transition-all capitalize",
                      selectedDifficulty === diff
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border bg-secondary/50 text-muted-foreground hover:border-primary/50"
                    )}
                  >
                    {diff}
                  </button>
                ))}
              </div>
            </div>

            <Button
              variant="hero"
              size="xl"
              className="w-full"
              onClick={handleStart}
              disabled={isLoading || !selectedSkill}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Generating Question...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Start Practice
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Practicing Screen
  if (state.status === "practicing" && state.currentQuestion) {
    const isOvertime = elapsedSeconds > state.currentQuestion.expected_time_seconds;

    return (
      <div className="min-h-screen bg-background py-8">
        <div className="container px-4 md:px-6 max-w-3xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="capitalize">
                {state.currentQuestion.difficulty}
              </Badge>
              <Badge variant="outline" className="capitalize">
                {state.currentQuestion.category}
              </Badge>
            </div>
            <Button variant="ghost" size="sm" onClick={practiceAgain}>
              Back to Setup
            </Button>
          </div>

          {/* Question */}
          <div className="glass-card rounded-2xl p-6 mb-6">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl gradient-hero flex items-center justify-center shrink-0">
                <Target className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-foreground mb-1">
                  {state.currentQuestion.topic}
                </h3>
                <p className="text-sm text-muted-foreground">
                  Expected time: {formatTime(state.currentQuestion.expected_time_seconds)}
                </p>
              </div>
            </div>
            <p className="text-foreground text-lg leading-relaxed">
              {state.currentQuestion.question}
            </p>
          </div>

          {/* Timer */}
          <div className={cn(
            "glass-card rounded-xl p-4 mb-6 transition-colors",
            isOvertime && "border-destructive/50 bg-destructive/5"
          )}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className={cn("w-5 h-5", isOvertime ? "text-destructive" : "text-primary")} />
                <span className={cn(
                  "font-mono font-bold text-2xl",
                  isOvertime ? "text-destructive" : "text-foreground"
                )}>
                  {formatTime(elapsedSeconds)}
                </span>
              </div>
              {isOvertime && (
                <span className="text-sm text-destructive">Over expected time</span>
              )}
            </div>
          </div>

          {/* Answer Input */}
          <div className="glass-card rounded-2xl p-6">
            <Textarea
              placeholder="Type your answer here... Take your time to think through your response."
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
                  Getting AI Feedback...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Submit & Get Feedback
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Reviewing Screen
  if (state.status === "reviewing" && state.currentEvaluation) {
    const evaluation = state.currentEvaluation;
    const lastRecord = state.history[state.history.length - 1];

    return (
      <div className="min-h-screen bg-background py-8">
        <div className="container px-4 md:px-6 max-w-3xl mx-auto">
          {/* Score Header */}
          <div className="glass-card rounded-2xl p-8 text-center mb-8">
            <div className={cn(
              "inline-flex items-center justify-center w-20 h-20 rounded-full mb-4",
              evaluation.score >= 70 ? "bg-success/20" :
                evaluation.score >= 50 ? "bg-warning/20" : "bg-destructive/20"
            )}>
              <span className={cn(
                "text-4xl font-bold",
                evaluation.score >= 70 ? "text-success" :
                  evaluation.score >= 50 ? "text-warning" : "text-destructive"
              )}>
                {evaluation.score}
              </span>
            </div>
            <h2 className="font-display font-bold text-2xl text-foreground mb-2">
              {evaluation.score >= 70 ? "Great Job!" :
                evaluation.score >= 50 ? "Good Effort!" : "Keep Practicing!"}
            </h2>
            <p className="text-muted-foreground">
              Here's your personalized feedback and coaching
            </p>
          </div>

          {/* Strengths & Improvements */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="glass-card rounded-xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle2 className="w-5 h-5 text-success" />
                <h3 className="font-semibold text-foreground">Strengths</h3>
              </div>
              <ul className="space-y-2">
                {evaluation.strengths.map((s, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="text-success mt-1">•</span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass-card rounded-xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-warning" />
                <h3 className="font-semibold text-foreground">To Improve</h3>
              </div>
              <ul className="space-y-2">
                {evaluation.improvements.map((s, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="text-warning mt-1">•</span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Model Answer */}
          <div className="glass-card rounded-xl p-6 mb-8">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-foreground">Model Answer</h3>
            </div>
            <p className="text-foreground leading-relaxed whitespace-pre-wrap">
              {evaluation.model_answer}
            </p>
          </div>

          {/* Coaching Tips */}
          <div className="glass-card rounded-xl p-6 mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-foreground">Coaching Tips</h3>
            </div>
            <ul className="space-y-3">
              {evaluation.coaching_tips.map((tip, i) => (
                <li key={i} className="flex items-start gap-3 text-sm">
                  <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 text-xs font-bold">
                    {i + 1}
                  </span>
                  <span className="text-muted-foreground">{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Next Steps */}
          <div className="glass-card rounded-xl p-5 mb-8 border-primary/30">
            <div className="flex items-center gap-3">
              <ArrowRight className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Suggested next topic:</p>
                <p className="font-medium text-foreground">{evaluation.next_topic_suggestion}</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <Button
              variant="outline"
              size="lg"
              className="flex-1"
              onClick={practiceAgain}
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              New Topic
            </Button>
            <Button
              variant="hero"
              size="lg"
              className="flex-1"
              onClick={handleTryAnother}
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Another Question
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};
