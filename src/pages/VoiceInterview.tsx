import { useState, useCallback } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { VoiceInterviewControls } from "@/components/VoiceInterviewControls";
import { ProctoringOverlay } from "@/components/ProctoringOverlay";
import { usePractice } from "@/hooks/usePractice";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Mic,
  Loader2,
  Sparkles,
  Target,
  Shield,
  Volume2,
  CheckCircle2,
  TrendingUp,
  BookOpen,
  Lightbulb,
  RotateCcw,
  ArrowRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const SKILL_OPTIONS = [
  "JavaScript", "TypeScript", "React", "Node.js", "Python",
  "SQL", "REST APIs", "System Design", "Data Structures",
  "Algorithms", "CSS", "Git", "Docker", "AWS", "Testing"
];

const VoiceInterview = () => {
  const [selectedSkill, setSelectedSkill] = useState("");
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">("medium");
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [proctoringEnabled, setProctoringEnabled] = useState(true);
  const [manualAnswer, setManualAnswer] = useState("");

  const {
    state,
    isLoading,
    generateQuestion,
    submitPracticeAnswer,
    practiceAgain,
    tryAnotherQuestion,
  } = usePractice();

  const handleStart = () => {
    if (!selectedSkill) {
      toast.error("Please select a skill");
      return;
    }
    generateQuestion(selectedSkill, difficulty, "technical");
  };

  const handleVoiceTranscription = useCallback((text: string) => {
    setManualAnswer(text);
  }, []);

  const handleSubmit = async () => {
    if (!manualAnswer.trim()) {
      toast.error("Please provide an answer");
      return;
    }
    await submitPracticeAnswer(manualAnswer, 0);
  };

  const handleTryAnother = () => {
    setManualAnswer("");
    tryAnotherQuestion();
  };

  // Setup Screen
  if (state.status === "setup") {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-16">
          <div className="container px-4 md:px-6 max-w-2xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
                <Mic className="w-4 h-4" />
                Voice Interview Mode
              </div>
              <h1 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
                AI Voice <span className="text-gradient">Interview</span>
              </h1>
              <p className="text-muted-foreground text-lg">
                Practice with realistic voice-based AI interviews. Hear questions and respond naturally.
              </p>
            </div>

            <div className="glass-card rounded-2xl p-6 space-y-6">
              <h3 className="font-display font-semibold text-lg text-foreground">
                Configure Your Session
              </h3>

              {/* Skill Selection */}
              <div>
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

              {/* Difficulty */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Difficulty Level
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(["easy", "medium", "hard"] as const).map(diff => (
                    <button
                      key={diff}
                      onClick={() => setDifficulty(diff)}
                      className={cn(
                        "py-3 px-4 rounded-xl border transition-all capitalize",
                        difficulty === diff
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border bg-secondary/50 text-muted-foreground hover:border-primary/50"
                      )}
                    >
                      {diff}
                    </button>
                  ))}
                </div>
              </div>

              {/* Feature Toggles */}
              <div className="space-y-4 pt-4 border-t border-border">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Volume2 className="w-4 h-4 text-primary" />
                    <Label htmlFor="voice-mode" className="text-sm font-medium">
                      Voice Mode
                    </Label>
                    <Badge variant="outline" className="text-xs">Recommended</Badge>
                  </div>
                  <Switch
                    id="voice-mode"
                    checked={voiceEnabled}
                    onCheckedChange={setVoiceEnabled}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-primary" />
                    <Label htmlFor="proctoring" className="text-sm font-medium">
                      Proctoring
                    </Label>
                    <Badge variant="secondary" className="text-xs">Eye & Posture</Badge>
                  </div>
                  <Switch
                    id="proctoring"
                    checked={proctoringEnabled}
                    onCheckedChange={setProctoringEnabled}
                  />
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
                    Preparing Interview...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Start Voice Interview
                  </>
                )}
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Practicing Screen
  if (state.status === "practicing" && state.currentQuestion) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-16">
          <div className="container px-4 md:px-6 max-w-3xl mx-auto">
            {/* Proctoring Overlay */}
            {proctoringEnabled && (
              <div className="mb-6">
                <ProctoringOverlay enabled={proctoringEnabled} minimal />
              </div>
            )}

            {/* Question Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="capitalize">
                  {state.currentQuestion.difficulty}
                </Badge>
                <Badge variant="outline">
                  {state.currentQuestion.topic}
                </Badge>
              </div>
              <Button variant="ghost" size="sm" onClick={practiceAgain}>
                Exit Interview
              </Button>
            </div>

            {/* Question Card */}
            <div className="glass-card rounded-2xl p-6 mb-6">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl gradient-hero flex items-center justify-center shrink-0">
                  <Target className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-foreground mb-1">
                    Interview Question
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {voiceEnabled ? "Listen to the question and respond verbally" : "Read and answer below"}
                  </p>
                </div>
              </div>
              <p className="text-foreground text-lg leading-relaxed">
                {state.currentQuestion.question}
              </p>
            </div>

            {/* Voice Controls or Text Input */}
            <div className="glass-card rounded-2xl p-6 mb-6">
              {voiceEnabled ? (
                <VoiceInterviewControls
                  question={state.currentQuestion.question}
                  onTranscription={handleVoiceTranscription}
                  disabled={isLoading}
                  autoSpeak={true}
                />
              ) : (
                <Textarea
                  placeholder="Type your answer here..."
                  value={manualAnswer}
                  onChange={(e) => setManualAnswer(e.target.value)}
                  className="min-h-[200px] resize-none bg-background/50"
                  disabled={isLoading}
                />
              )}

              {/* Show transcription as editable if using voice */}
              {voiceEnabled && manualAnswer && (
                <div className="mt-4">
                  <Label className="text-sm text-muted-foreground mb-2 block">
                    Edit your transcribed response:
                  </Label>
                  <Textarea
                    value={manualAnswer}
                    onChange={(e) => setManualAnswer(e.target.value)}
                    className="min-h-[100px] resize-none bg-background/50"
                    disabled={isLoading}
                  />
                </div>
              )}
            </div>

            {/* Submit Button */}
            <Button
              variant="hero"
              size="lg"
              className="w-full"
              onClick={handleSubmit}
              disabled={isLoading || !manualAnswer.trim()}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Evaluating Response...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Submit Answer
                </>
              )}
            </Button>
          </div>
        </main>
      </div>
    );
  }

  // Review Screen
  if (state.status === "reviewing" && state.currentEvaluation) {
    const evaluation = state.currentEvaluation;

    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-16">
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
                Voice interview completed. Here's your feedback.
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
                    <ArrowRight className="w-4 h-4 mr-2" />
                    Next Question
                  </>
                )}
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return null;
};

export default VoiceInterview;
