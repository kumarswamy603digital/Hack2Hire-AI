import { useState, useEffect, useRef } from "react";
import Editor from "@monaco-editor/react";
import { useCodingChallenge } from "@/hooks/useCodingChallenge";
import { CodingChallenge, SupportedLanguage } from "@/types/coding";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Code2,
  Play,
  RotateCcw,
  Clock,
  CheckCircle2,
  XCircle,
  Lightbulb,
  ArrowLeft,
  Loader2,
  Trophy,
  Target,
  Zap,
  Eye,
  EyeOff,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const CodingSandbox = () => {
  const {
    state,
    isLoading,
    hintsRevealed,
    challenges,
    selectChallenge,
    updateCode,
    changeLanguage,
    revealHint,
    submitCode,
    resetChallenge,
    goToSelection,
    getElapsedTime,
  } = useCodingChallenge();

  const [elapsedTime, setElapsedTime] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Timer effect
  useEffect(() => {
    if (state.status === "coding" && state.startTime) {
      timerRef.current = setInterval(() => {
        setElapsedTime(getElapsedTime());
      }, 1000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [state.status, state.startTime, getElapsedTime]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "text-success bg-success/10 border-success/30";
      case "medium":
        return "text-warning bg-warning/10 border-warning/30";
      case "hard":
        return "text-destructive bg-destructive/10 border-destructive/30";
      default:
        return "";
    }
  };

  // Challenge Selection Screen
  if (state.status === "selecting") {
    return (
      <div className="min-h-screen bg-background py-12">
        <div className="container px-4 md:px-6 max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
              <Code2 className="w-4 h-4" />
              Live Coding Sandbox
            </div>
            <h1 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
              Coding <span className="text-gradient">Challenges</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Solve real coding problems with our Monaco-powered editor. Your code is analyzed by AI.
            </p>
          </div>

          <div className="grid gap-4">
            {challenges.map((challenge) => (
              <button
                key={challenge.id}
                onClick={() => selectChallenge(challenge)}
                className="glass-card rounded-xl p-6 text-left hover:border-primary/50 transition-all group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-display font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                      {challenge.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className={cn("capitalize", getDifficultyColor(challenge.difficulty))}>
                        {challenge.difficulty}
                      </Badge>
                      <Badge variant="outline">{challenge.category}</Badge>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {challenge.expectedTimeMinutes} min
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-primary">
                    <Trophy className="w-4 h-4" />
                    <span className="font-bold">{challenge.points}</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {challenge.description.split("\n")[0]}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Results Screen
  if (state.status === "reviewing" && state.evaluation) {
    const { evaluation, currentChallenge } = state;

    return (
      <div className="min-h-screen bg-background py-8">
        <div className="container px-4 md:px-6 max-w-4xl mx-auto">
          {/* Score Header */}
          <div className="glass-card rounded-2xl p-8 text-center mb-8">
            <div className={cn(
              "inline-flex items-center justify-center w-20 h-20 rounded-full mb-4",
              evaluation.score >= 80 ? "bg-success/20" :
                evaluation.score >= 60 ? "bg-warning/20" : "bg-destructive/20"
            )}>
              <span className={cn(
                "text-4xl font-bold",
                evaluation.score >= 80 ? "text-success" :
                  evaluation.score >= 60 ? "text-warning" : "text-destructive"
              )}>
                {evaluation.score}
              </span>
            </div>
            <h2 className="font-display font-bold text-2xl text-foreground mb-2">
              {evaluation.score >= 80 ? "Excellent Work!" :
                evaluation.score >= 60 ? "Good Job!" : "Keep Practicing!"}
            </h2>
            <p className="text-muted-foreground">
              {currentChallenge?.title} - {evaluation.passedCount}/{evaluation.totalCount} tests passed
            </p>
          </div>

          {/* Test Results */}
          <div className="glass-card rounded-xl p-6 mb-6">
            <h3 className="font-display font-semibold text-lg text-foreground mb-4">
              Test Results
            </h3>
            <div className="space-y-3">
              {evaluation.testResults.map((result, i) => (
                <div
                  key={result.testCaseId}
                  className={cn(
                    "flex items-center justify-between p-3 rounded-lg",
                    result.passed ? "bg-success/10" : "bg-destructive/10"
                  )}
                >
                  <div className="flex items-center gap-3">
                    {result.passed ? (
                      <CheckCircle2 className="w-5 h-5 text-success" />
                    ) : (
                      <XCircle className="w-5 h-5 text-destructive" />
                    )}
                    <span className="font-medium text-foreground">Test {i + 1}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-muted-foreground">
                      {result.executionTimeMs}ms
                    </span>
                    <Badge variant={result.passed ? "default" : "destructive"}>
                      {result.passed ? "PASSED" : "FAILED"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Code Quality */}
          <div className="glass-card rounded-xl p-6 mb-6">
            <h3 className="font-display font-semibold text-lg text-foreground mb-4">
              Code Quality
            </h3>
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: "Correctness", value: evaluation.codeQuality.correctness, icon: Target },
                { label: "Efficiency", value: evaluation.codeQuality.efficiency, icon: Zap },
                { label: "Readability", value: evaluation.codeQuality.readability, icon: Eye },
              ].map(({ label, value, icon: Icon }) => (
                <div key={label} className="text-center">
                  <Icon className="w-5 h-5 text-primary mx-auto mb-2" />
                  <div className={cn(
                    "text-2xl font-bold mb-1",
                    value >= 70 ? "text-success" : value >= 50 ? "text-warning" : "text-destructive"
                  )}>
                    {value}
                  </div>
                  <div className="text-xs text-muted-foreground">{label}</div>
                  <Progress value={value} className="h-1.5 mt-2" />
                </div>
              ))}
            </div>
          </div>

          {/* Feedback */}
          <div className="glass-card rounded-xl p-6 mb-6">
            <h3 className="font-display font-semibold text-lg text-foreground mb-4">
              Feedback
            </h3>
            <p className="text-muted-foreground mb-4">{evaluation.feedback}</p>
            {evaluation.suggestions.length > 0 && (
              <div>
                <h4 className="font-medium text-foreground mb-2">Suggestions:</h4>
                <ul className="space-y-2">
                  {evaluation.suggestions.map((suggestion, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Lightbulb className="w-4 h-4 text-warning shrink-0 mt-0.5" />
                      {suggestion}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <Button variant="outline" size="lg" className="flex-1" onClick={goToSelection}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Challenges
            </Button>
            <Button variant="hero" size="lg" className="flex-1" onClick={resetChallenge}>
              <RotateCcw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Coding Screen
  const challenge = state.currentChallenge!;
  const expectedTimeSeconds = challenge.expectedTimeMinutes * 60;
  const isOvertime = elapsedTime > expectedTimeSeconds;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="border-b border-border bg-background/80 backdrop-blur-xl sticky top-0 z-10">
        <div className="container px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={goToSelection}>
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back
            </Button>
            <div>
              <h1 className="font-display font-semibold text-foreground">
                {challenge.title}
              </h1>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className={cn("capitalize text-xs", getDifficultyColor(challenge.difficulty))}>
                  {challenge.difficulty}
                </Badge>
                <Badge variant="outline" className="text-xs">{challenge.category}</Badge>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Timer */}
            <div className={cn(
              "flex items-center gap-2 px-3 py-1.5 rounded-lg",
              isOvertime ? "bg-destructive/10 text-destructive" : "bg-secondary text-foreground"
            )}>
              <Clock className="w-4 h-4" />
              <span className="font-mono font-bold">{formatTime(elapsedTime)}</span>
              <span className="text-xs text-muted-foreground">/ {formatTime(expectedTimeSeconds)}</span>
            </div>

            {/* Language Selector */}
            <Select value={state.language} onValueChange={(v) => changeLanguage(v as SupportedLanguage)}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="javascript">JavaScript</SelectItem>
                <SelectItem value="typescript">TypeScript</SelectItem>
                <SelectItem value="python">Python</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" size="sm" onClick={resetChallenge}>
              <RotateCcw className="w-4 h-4" />
            </Button>

            <Button
              variant="hero"
              size="sm"
              onClick={submitCode}
              disabled={isLoading || state.status === "submitting"}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Evaluating...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  Submit
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Problem Description */}
        <div className="w-1/2 border-r border-border overflow-auto p-6">
          <div className="prose prose-sm dark:prose-invert max-w-none">
            <h2 className="font-display text-xl font-bold text-foreground mb-4">
              Problem Description
            </h2>
            <div className="whitespace-pre-wrap text-muted-foreground text-sm leading-relaxed">
              {challenge.description}
            </div>

            {/* Test Cases */}
            <div className="mt-8">
              <h3 className="font-display font-semibold text-foreground mb-3">
                Test Cases
              </h3>
              <div className="space-y-3">
                {challenge.testCases.filter(tc => !tc.isHidden).map((tc, i) => (
                  <div key={tc.id} className="bg-secondary/50 rounded-lg p-3">
                    <div className="text-xs text-muted-foreground mb-1">Test {i + 1}</div>
                    <div className="font-mono text-sm">
                      <div><span className="text-muted-foreground">Input:</span> {tc.input}</div>
                      <div><span className="text-muted-foreground">Output:</span> {tc.expectedOutput}</div>
                    </div>
                  </div>
                ))}
                {challenge.testCases.some(tc => tc.isHidden) && (
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <EyeOff className="w-3 h-3" />
                    + {challenge.testCases.filter(tc => tc.isHidden).length} hidden test cases
                  </div>
                )}
              </div>
            </div>

            {/* Hints */}
            {challenge.hints.length > 0 && (
              <div className="mt-8">
                <h3 className="font-display font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-warning" />
                  Hints
                </h3>
                <div className="space-y-2">
                  {challenge.hints.map((hint, i) => (
                    <div key={i}>
                      {hintsRevealed.includes(i) ? (
                        <div className="bg-warning/10 border border-warning/30 rounded-lg p-3 text-sm">
                          {hint}
                        </div>
                      ) : (
                        <button
                          onClick={() => revealHint(i)}
                          className="w-full text-left bg-secondary/50 hover:bg-secondary rounded-lg p-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                          Click to reveal hint {i + 1}
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Code Editor */}
        <div className="w-1/2 flex flex-col">
          <Editor
            height="100%"
            language={state.language === "python" ? "python" : state.language}
            theme="vs-dark"
            value={state.code}
            onChange={(value) => updateCode(value || "")}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              lineNumbers: "on",
              roundedSelection: false,
              scrollBeyondLastLine: false,
              automaticLayout: true,
              padding: { top: 16 },
            }}
          />
        </div>
      </div>
    </div>
  );
};
